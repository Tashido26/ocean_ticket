const crypto = require('node:crypto');
const { GoogleGenAI } = require('@google/genai');

const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'ocean-ticket-bf235';
const GOOGLE_CERTS_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';
const MAX_BASE64_LENGTH = 14 * 1024 * 1024; // ~10 MB raw file
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;

let cachedCerts = null;
let cachedCertsExpiresAt = 0;
const rateLimitBuckets = new Map();

const ALLOWED_EXACT_ORIGINS = new Set([
  'https://oceanticket.netlify.app',
  'https://traveldocsgen.netlify.app',
]);

function resolveAllowedOrigin(headers = {}) {
  const origin = String(headers.origin || headers.Origin || '').trim();
  if (!origin) return '*';
  try {
    const url = new URL(origin);
    const host = url.hostname.toLowerCase();
    if (
      ALLOWED_EXACT_ORIGINS.has(origin) ||
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host.endsWith('--oceanticket.netlify.app') ||
      host.endsWith('--traveldocsgen.netlify.app')
    ) {
      return origin;
    }
  } catch {
    return null;
  }
  return null;
}

function isTravelDocsOrigin(headers = {}) {
  const origin = String(headers.origin || headers.Origin || headers.referer || headers.Referer || '').trim();
  if (!origin) return false;
  try {
    const host = new URL(origin).hostname.toLowerCase();
    return host === 'traveldocsgen.netlify.app' || host.endsWith('--traveldocsgen.netlify.app');
  } catch {
    return false;
  }
}

async function getFirebasePublicCerts() {
  const now = Date.now();
  if (cachedCerts && now < cachedCertsExpiresAt) return cachedCerts;
  const res = await fetch(GOOGLE_CERTS_URL);
  if (!res.ok) throw new Error(`Failed to fetch Firebase public certs (${res.status})`);
  const cacheControl = res.headers.get('cache-control') || '';
  const maxAgeMatch = cacheControl.match(/max-age=(\d+)/);
  const ttlMs = maxAgeMatch ? Number(maxAgeMatch[1]) * 1000 : 3600 * 1000;
  cachedCerts = await res.json();
  cachedCertsExpiresAt = now + ttlMs;
  return cachedCerts;
}

function decodeBase64UrlJson(segment) {
  return JSON.parse(Buffer.from(segment, 'base64url').toString('utf8'));
}

async function verifyFirebaseIdToken(idToken) {
  if (!idToken || typeof idToken !== 'string') throw new Error('Missing Firebase ID token');
  const parts = idToken.split('.');
  if (parts.length !== 3) throw new Error('Malformed Firebase ID token');
  const [rawHeader, rawPayload, rawSignature] = parts;
  const header = decodeBase64UrlJson(rawHeader);
  const payload = decodeBase64UrlJson(rawPayload);
  if (header.alg !== 'RS256' || !header.kid) throw new Error('Invalid token algorithm or key ID');
  const nowSec = Math.floor(Date.now() / 1000);
  if (payload.aud !== FIREBASE_PROJECT_ID) throw new Error('Invalid token audience');
  if (payload.iss !== `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`) throw new Error('Invalid token issuer');
  if (!payload.sub || typeof payload.sub !== 'string') throw new Error('Invalid token subject');
  if (typeof payload.exp !== 'number' || payload.exp <= nowSec) throw new Error('Firebase ID token has expired');
  const certs = await getFirebasePublicCerts();
  const cert = certs[header.kid];
  if (!cert) throw new Error('Signing certificate not found');
  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(`${rawHeader}.${rawPayload}`);
  verifier.end();
  if (!verifier.verify(cert, Buffer.from(rawSignature, 'base64url'))) {
    throw new Error('Invalid Firebase ID token signature');
  }
  return payload;
}

function checkRateLimit(key) {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(key);
  if (!bucket || now - bucket.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitBuckets.set(key, { windowStart: now, count: 1 });
    return true;
  }
  bucket.count += 1;
  return bucket.count <= RATE_LIMIT_MAX_REQUESTS;
}

function json(statusCode, data, corsOrigin = '*') {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': corsOrigin || '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-OCR-Secret',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Vary': 'Origin',
    },
    body: JSON.stringify(data),
  };
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = String(text || '').match(/\{[\s\S]*\}/);
    if (!match) return {};
    try {
      return JSON.parse(match[0]);
    } catch {
      return {};
    }
  }
}

const ETICKET_PROMPT = `You are a travel agency itinerary & e-ticket parser. Extract ALL flight, passenger, e-ticket number, PNR, and baggage details from the attached PDF or image (Trip.com, Agoda, airline receipt, or screenshot).

Return ONLY valid JSON. No markdown fences, no commentary.

JSON schema:
{
  "airline": "One of: AirAsia, VietJet Air, Thai Airways, Singapore Airlines, EVA Air, Scoot, China Airlines, China Eastern, Vietnam Airlines, Cathay Pacific, Hong Kong Airlines, HK Express (choose the exact operating/marketing airline shown; default AirAsia only if genuinely AirAsia)",
  "bookingNo": "OTA Booking No. if present (e.g. 1688903717866172), else PNR",
  "pnr": "Primary 6-char Airline Booking Reference / PNR (e.g. 59IFWU)",
  "pnrs": ["59IFWU"],
  "eTicketNo": "Primary E-ticket number if present (e.g. 297-3944369635). If multiple passengers have different e-ticket numbers, put the first one here AND put each passenger's own e-ticket number in passengers[].eticket. Only return empty string if genuinely no e-ticket number exists on the document.",
  "flightClass": "Economy | Premium Economy | Business | First Class (or with fare code like Economy (Y))",
  "issuedDate": "e.g. 27 Nov 2026 (or empty string if not shown)",
  "passengers": [
    {
      "name": "UPPERCASE FULL NAME without (First name)/(Last name)/(Adults) labels, e.g. SAN WAI CHIN",
      "type": "Adult | Child | Infant",
      "eticket": "Passenger's exact E-ticket number e.g. 297-3944369635 or empty string",
      "passport": "Passport number if shown, else empty string",
      "expiry": "Passport expiry YYYY-MM-DD if shown, else empty string",
      "seat": "Seat number if shown, else empty string"
    }
  ],
  "flights": [
    {
      "flightNo": "Exact airline code + number, e.g. CI851, AK851, FD252, SQ762, TG304, VJ804",
      "airlineName": "Full airline name, e.g. China Airlines, AirAsia Berhad, Thai Airways International",
      "pnr": "Sector PNR if shown, else primary PNR",
      "depTime": "HH:MM (24-hour, e.g. 07:20)",
      "depDateFormatted": "DayName, D MonthName YYYY (e.g. Saturday, 5 December 2026)",
      "depAirport": "Full airport name with IATA code in parentheses, e.g. Taiwan Taoyuan International Airport (TPE)",
      "depTerminal": "e.g. Terminal 1 or empty string",
      "arrTime": "HH:MM (24-hour, e.g. 10:25)",
      "arrDateFormatted": "DayName, D MonthName YYYY (e.g. Saturday, 5 December 2026)",
      "arrAirport": "Full airport name with IATA code in parentheses, e.g. Chiang Mai International Airport (CNX)",
      "arrTerminal": "e.g. Terminal 2 or empty string",
      "route": "City (CODE) - City (CODE), e.g. Taipei (TPE) - Chiang Mai (CNX)",
      "duration": "e.g. 4h 5min, Non-Stop (calculate accurately accounting for timezones if not printed)",
      "aircraft": "Aircraft model if shown, else empty string",
      "flightClass": "Cabin class for this sector"
    }
  ],
  "checkedBaggage": "Exact checked baggage allowance preserving pieces & weight, e.g. '2 pieces per person, 32 kg each\\nDimensions (L+W+H) max 158 cm per piece' OR 'No free baggage allowance' if 0 kg / not included",
  "carryOnBaggage": "Exact carry-on allowance preserving pieces & weight, e.g. '2 pieces per person, 7 kg each\\nMax 56 x 36 x 23 cm per piece'",
  "carryOnWeight": "e.g. 7kg",
  "personalItem": "Exact personal item allowance if shown, e.g. '1 piece per person\\nMax 40 x 30 x 15 cm, fits under the seat in front of you'"
}

Rules:
- Read ALL pages of the PDF carefully so NO passenger or flight leg is missed.
- NEVER return 'To be advised at check-in' if any E-ticket number (like 297-3944369635 or 13-digit number) is printed anywhere on the document.
- Strip '(First name)', '(Last name)', '(Adults)', '(Adult)' from passenger names.
- Always include the IATA 3-letter code in parentheses on depAirport and arrAirport (e.g. Taiwan Taoyuan International Airport (TPE)).
- If checked baggage is 0 kg or says No free baggage allowance / Not included, set checkedBaggage to 'No free baggage allowance'.
- Preserve exact piece counts AND kg weights (e.g. '2 pieces per person, 32 kg each').`;

const HOTEL_PROMPT = `You are a travel agency hotel voucher / booking confirmation parser. Extract ALL hotel reservation details from the attached PDF or image (Agoda, Trip.com, Booking.com, Expedia, or hotel confirmation screenshot).

Return ONLY valid JSON. No markdown fences, no commentary.

JSON schema:
{
  "bookingId": "Booking ID (digits/alphanumeric if shown, else empty string)",
  "bookingRefNo": "Hotel / Agoda / OTA Reference Number if shown, else empty string",
  "memberId": "Member ID if shown, else empty string",
  "clientName": "PRIMARY GUEST FULL NAME in UPPERCASE (e.g. AYE AYE LWIN)",
  "countryOfResidence": "Country name (default Myanmar if not shown)",
  "arrivalDate": "Month D, YYYY (e.g. December 5, 2026)",
  "departureDate": "Month D, YYYY (e.g. December 10, 2026)",
  "numRooms": 1,
  "roomType": "Exact room type (e.g. Superior Queen Room, Deluxe Twin Room)",
  "numAdults": 2,
  "numChildren": 0,
  "numExtraBeds": 0,
  "propertyName": "Exact hotel / property name",
  "propertyAddress": "Full street address, city, postal code, country",
  "propertyContact": "International phone number with + country code if shown, else empty string",
  "city": "City name (e.g. Bangkok, Tokyo, Vientiane, Kunming, Chiang Mai, Yangon)",
  "promotion": "Promotion / deal text if shown, else empty string",
  "cancellationPolicy": "Exact cancellation policy text if shown, else empty string",
  "cancellationDate": "Free cancellation deadline in 'Month D, YYYY' format if shown, else empty string",
  "benefits": "Comma-separated included benefits (e.g. Breakfast included, Free WiFi, Express check-in)",
  "remarksSpecial": "Special requests / remarks if shown, else empty string"
}

Rules:
- Extract exact dates and format arrivalDate / departureDate as 'Month D, YYYY' (e.g. 'December 5, 2026').
- numRooms, numAdults, numChildren, numExtraBeds must be integers.
- Never invent a phone number or address if not shown; leave empty string if absent.`;

exports.handler = async function (event) {
  const headers = event.headers || {};
  const corsOrigin = resolveAllowedOrigin(headers);

  if (event.httpMethod === 'OPTIONS') {
    if (!corsOrigin) return json(403, { ok: false, error: 'Forbidden origin' }, '');
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-OCR-Secret',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Vary': 'Origin',
      },
      body: '',
    };
  }

  try {
    if (event.httpMethod !== 'POST') {
      return json(405, { ok: false, error: 'Method not allowed' }, corsOrigin || '*');
    }

    if (!corsOrigin) {
      return json(403, { ok: false, error: 'Forbidden origin' }, '');
    }

    // Auth check: Firebase ID token required on Ocean Ticket; TravelDocsGen (standalone) allowed via strict origin + rate limit
    const authHeader = String(headers.authorization || headers.Authorization || '').trim();
    const bearerMatch = authHeader.match(/^Bearer\s+(.+)$/i);
    const internalSecret = process.env.OCR_API_SECRET;
    const providedSecret = headers['x-ocr-secret'] || headers['X-OCR-Secret'];

    let verifiedUser = null;
    if (bearerMatch) {
      try {
        verifiedUser = await verifyFirebaseIdToken(bearerMatch[1].trim());
      } catch (authErr) {
        console.warn('[gemini-travel-ocr] Auth verification failed:', authErr.message);
        return json(401, { ok: false, error: 'Unauthorized: Invalid or expired Firebase Auth token' }, corsOrigin);
      }
    } else if (internalSecret && providedSecret === internalSecret) {
      verifiedUser = { sub: 'internal-secret' };
    } else if (isTravelDocsOrigin(headers) || corsOrigin.startsWith('http://localhost') || corsOrigin.startsWith('http://127.0.0.1')) {
      verifiedUser = { sub: 'traveldocsgen-origin' };
    } else {
      return json(401, { ok: false, error: 'Unauthorized: Authentication required' }, corsOrigin);
    }

    const clientIp = headers['x-nf-client-connection-ip'] || headers['x-forwarded-for'] || 'unknown';
    const rateKey = `${verifiedUser?.sub || 'anon'}:${clientIp}`;
    if (!checkRateLimit(rateKey)) {
      return json(429, { ok: false, error: 'Too many AI scan requests. Please wait a moment.' }, corsOrigin);
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return json(500, { ok: false, error: 'Missing GEMINI_API_KEY' }, corsOrigin);
    }

    const body = JSON.parse(event.body || '{}');
    const { docType = 'eticket', fileBase64, mimeType } = body;

    if (!fileBase64) {
      return json(400, { ok: false, error: 'fileBase64 is required' }, corsOrigin);
    }

    const cleanBase64 = String(fileBase64).replace(/^data:[^;]+;base64,/, '');
    if (cleanBase64.length > MAX_BASE64_LENGTH) {
      return json(413, { ok: false, error: 'File payload too large (max ~10 MB)' }, corsOrigin);
    }

    const prompt = docType === 'hotel' ? HOTEL_PROMPT : ETICKET_PROMPT;
    const resolvedMime = mimeType || 'application/pdf';

    const ai = new GoogleGenAI({ apiKey });
    const candidateModels = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-flash-latest'];
    let response = null;
    let lastError = null;

    for (const model of candidateModels) {
      try {
        const generatePromise = ai.models.generateContent({
          model,
          contents: [
            {
              role: 'user',
              parts: [
                { text: prompt },
                {
                  inlineData: {
                    mimeType: resolvedMime,
                    data: cleanBase64,
                  },
                },
              ],
            },
          ],
          config: {
            responseMimeType: 'application/json',
            temperature: 0,
          },
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`Gemini scan timed out on ${model}`)), 20000)
        );
        response = await Promise.race([generatePromise, timeoutPromise]);
        if (response && response.text) break;
      } catch (err) {
        lastError = err;
        console.warn(`[gemini-travel-ocr] Model ${model} failed:`, err.message);
      }
    }

    if (!response || !response.text) {
      throw lastError || new Error('All Gemini candidate models failed');
    }

    const extracted = safeJsonParse(response.text);
    return json(200, { ok: true, docType, data: extracted }, corsOrigin);
  } catch (error) {
    console.error('[gemini-travel-ocr error]', error);
    return json(500, { ok: false, error: error.message || 'Gemini travel scan failed' }, corsOrigin || '*');
  }
};
