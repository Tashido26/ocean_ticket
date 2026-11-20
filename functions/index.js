/**
 * @fileoverview Firebase Cloud Function — passport OCR via Google Cloud Document AI.
 *
 * The browser sends a base64 image; this function relays it to Document AI
 * using the runtime service-account credentials, then returns the recognised
 * text + structured entities.
 *
 * IMPORTANT — auth model:
 *   Production:  Uses Application Default Credentials (the Cloud Functions
 *                runtime service account). NO JSON key is shipped in the
 *                deployment. You must grant that service account the
 *                "Document AI API User" role in your GCP project.
 *   Local emul.: Set GOOGLE_APPLICATION_CREDENTIALS to the path of your
 *                downloaded JSON key (see functions/README.md).
 */

const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { onSchedule } = require('firebase-functions/v2/scheduler');
const { setGlobalOptions } = require('firebase-functions/v2');
const { defineString } = require('firebase-functions/params');
const admin = require('firebase-admin');
const { DocumentProcessorServiceClient } = require('@google-cloud/documentai').v1;

admin.initializeApp();

// Configurable parameters — set via firebase deploy or .env file.
// You can also hard-code these values below if you prefer.
const PARAM_PROJECT_ID = defineString('GCP_PROJECT_ID', {
    default: 'ocean-ticket-bf235',
    description: 'Google Cloud project ID where the Document AI processor lives.'
});
const PARAM_LOCATION = defineString('DOCAI_LOCATION', {
    default: 'us',
    description: 'Document AI processor location, e.g. "us" or "eu".'
});
const PARAM_PROCESSOR_ID = defineString('DOCAI_PROCESSOR_ID', {
    default: '',
    description: 'Document AI processor ID. REQUIRED — set before deploy.'
});
const PARAM_SERVICE_ACCOUNT = defineString('DOCAI_SERVICE_ACCOUNT', {
    default: 'ocean-travel@ocean-ticket-bf235.iam.gserviceaccount.com',
    description: 'Runtime service account that has the Document AI API User role.'
});
const PARAM_TELEGRAM_BOT_TOKEN = defineString('TELEGRAM_BOT_TOKEN', {
    default: '',
    description: 'Telegram Bot Token for ticketing deadline alerts.'
});
const PARAM_TELEGRAM_CHAT_ID = defineString('TELEGRAM_CHAT_ID', {
    default: '1101682157',
    description: 'Telegram Chat ID where deadline alerts are sent.'
});

setGlobalOptions({
    region: 'us-central1',
    memory: '512MiB',
    timeoutSeconds: 60,
    maxInstances: 10
});

// Re-use the client across invocations (faster cold start of subsequent calls).
const docaiClients = new Map();
function getClient(location) {
    if (!docaiClients.has(location)) {
        // Document AI requires a regional endpoint, e.g. us-documentai.googleapis.com
        const apiEndpoint = `${location}-documentai.googleapis.com`;
        docaiClients.set(location, new DocumentProcessorServiceClient({ apiEndpoint }));
    }
    return docaiClients.get(location);
}

/**
 * HTTPS callable: ocrPassport
 *   Request:  { imageBase64: string, mimeType?: string }
 *   Response: { text: string, entities: Array<{type, value, confidence}>,
 *               processorType: string, pageCount: number }
 *
 * Client uses Firebase Auth automatically; reject anonymous calls.
 */
exports.ocrPassport = onCall(
    {
        cors: true,
        invoker: 'public',
        serviceAccount: PARAM_SERVICE_ACCOUNT
    },
    async (request) => {
        if (!request.auth) {
            throw new HttpsError(
                'unauthenticated',
                'You must be signed in to scan passports.'
            );
        }

        const projectId = PARAM_PROJECT_ID.value();
        const location = PARAM_LOCATION.value();
        const processorId = PARAM_PROCESSOR_ID.value();

        if (!processorId) {
            throw new HttpsError(
                'failed-precondition',
                'DOCAI_PROCESSOR_ID is not configured. See functions/README.md.'
            );
        }

        const { imageBase64, mimeType = 'image/jpeg' } = request.data || {};
        if (!imageBase64 || typeof imageBase64 !== 'string') {
            throw new HttpsError('invalid-argument', 'imageBase64 is required.');
        }

        // Strip data-URL prefix if present.
        const base64Content = imageBase64.replace(/^data:[^;]+;base64,/, '');

        const client = getClient(location);
        const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

        try {
            const [result] = await client.processDocument({
                name,
                rawDocument: {
                    content: base64Content,
                    mimeType
                }
            });

            const doc = result.document || {};
            const text = doc.text || '';

            // Identity-document processors return entities; OCR processor does not.
            const entities = (doc.entities || []).map(e => {
                const normalized = e.normalizedValue || {};
                const dateValue = normalized.dateValue
                    ? [
                        normalized.dateValue.year,
                        String(normalized.dateValue.month || '').padStart(2, '0'),
                        String(normalized.dateValue.day || '').padStart(2, '0')
                    ].filter(Boolean).join('-')
                    : '';

                return {
                    type: e.type,
                    value: e.mentionText || normalized.text || dateValue || '',
                    confidence: e.confidence || 0
                };
            });

            return {
                text,
                entities,
                processorType: entities.length > 0 ? 'ID_DOCUMENT' : 'OCR',
                pageCount: (doc.pages || []).length
            };
        } catch (err) {
            console.error('Document AI error:', err);
            const code = err.code === 7 || err.code === 'PERMISSION_DENIED'
                ? 'permission-denied'
                : 'internal';
            throw new HttpsError(code, err.message || 'Document AI request failed.');
        }
    }
);

/**
 * Scheduled Function: checkBookingDeadlines
 * Runs every 10 minutes to notify via Telegram when an active booking
 * deadline is near (under 1 hour). (Trigger redeploy to verify IAM permissions)
 */
exports.checkBookingDeadlines = onSchedule(
    {
        schedule: '*/10 * * * *',
        timeZone: 'Asia/Yangon',
        memory: '256MiB',
    },
    async (event) => {
        const db = admin.firestore();
        const now = new Date();

        try {
            const snapshot = await db.collection('bookings')
                .where('status', '==', 'active')
                .get();

            const bookings = snapshot.docs.map(doc => ({ id: doc.id, ref: doc.ref, ...doc.data() }));

            // Group bookings by PNR if PNR is present and valid,
            // otherwise keep them separate (to prevent grouping different client bookings without PNRs).
            const groups = [];
            const processedIds = new Set();

            for (const b of bookings) {
                if (processedIds.has(b.id)) continue;

                const pnrVal = String(b.pnr || '').trim().toUpperCase();

                if (pnrVal && pnrVal !== 'NO PNR' && pnrVal !== '—' && pnrVal !== '-') {
                    // Find all bookings sharing this PNR
                    const legs = bookings.filter(other => 
                        !processedIds.has(other.id) &&
                        String(other.pnr || '').trim().toUpperCase() === pnrVal
                    );

                    legs.forEach(leg => processedIds.add(leg.id));

                    // Collect unique passenger names (strip gender prefix)
                    const passengerNames = [];
                    legs.forEach(leg => {
                        const cleanName = String(leg.name || '').trim().replace(/^(MR|MS|MSTR|MISS)\s+/i, '');
                        if (cleanName && !passengerNames.includes(cleanName)) {
                            passengerNames.push(cleanName);
                        }
                    });

                    // Collect unique routes/legs to avoid duplicate route listings in the notification
                    const uniqueLegs = [];
                    legs.forEach(leg => {
                        const dep = String(leg.departure || '').trim();
                        const dest = String(leg.destination || '').trim();
                        const date = String(leg.departing_on || '').trim();
                        if (!uniqueLegs.some(l => l.departure === dep && l.destination === dest && l.departing_on === date)) {
                            uniqueLegs.push(leg);
                        }
                    });

                    groups.push({
                        pnr: pnrVal,
                        clientName: passengerNames.join(', '),
                        legs: uniqueLegs,
                        rawLegs: legs, // Keep references to all original Firestore documents
                        deadlineAt: b.deadlineAt,
                        enddate: b.enddate,
                        endtime: b.endtime,
                        notified1hWarning: legs.some(leg => leg.notified1hWarning)
                    });
                } else {
                    processedIds.add(b.id);
                    const cleanName = String(b.name || '').replace(/^(MR|MS|MSTR|MISS)\s+/i, '');
                    groups.push({
                        pnr: '',
                        clientName: cleanName,
                        legs: [b],
                        rawLegs: [b],
                        deadlineAt: b.deadlineAt,
                        enddate: b.enddate,
                        endtime: b.endtime,
                        notified1hWarning: b.notified1hWarning
                    });
                }
            }

            for (const group of groups) {
                if (!group.deadlineAt) continue;

                const deadline = new Date(group.deadlineAt);
                if (Number.isNaN(deadline.getTime())) continue;

                const timeLeftMs = deadline.getTime() - now.getTime();
                const timeLeftMins = Math.round(timeLeftMs / 60000);

                // Format Route & Date Info
                let routeInfo = '';
                if (group.legs.length > 1) {
                    // Sort legs by departing_on date to order them (outbound -> return)
                    const sortedLegs = [...group.legs].sort((x, y) => {
                        const parseDate = (dStr) => {
                            if (!dStr) return 0;
                            const parts = String(dStr).split('/');
                            if (parts.length === 3) {
                                return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime();
                            }
                            return 0;
                        };
                        return parseDate(x.departing_on) - parseDate(y.departing_on);
                    });

                    sortedLegs.forEach((leg, index) => {
                        const label = index === 0 ? 'OB' : (index === 1 ? 'RT' : `Leg ${index + 1}`);
                        routeInfo += `✈️ *Route (${label}):* ${leg.departure || 'N/A'} ➔ ${leg.destination || 'N/A'}\n` +
                                     `📅 *Departure Date (${label}):* ${leg.departing_on || 'N/A'}\n`;
                    });
                } else {
                    const leg = group.legs[0];
                    routeInfo += `✈️ *Route:* ${leg.departure || 'N/A'} ➔ ${leg.destination || 'N/A'}\n` +
                                 `📅 *Departure Date:* ${leg.departing_on || 'N/A'}\n`;
                }

                // Case 1: Deadline has passed (expired)
                if (timeLeftMins <= 0) {
                    const clientLabel = group.clientName.includes(',') ? 'Clients' : 'Client';
                    const message = `❌ *HOLD DEADLINE EXPIRED*\n\n` +
                                    `👤 *${clientLabel}:* ${group.clientName}\n` +
                                    routeInfo +
                                    `🎫 *PNR:* ${group.pnr || 'N/A'}\n` +
                                    `⏰ *Deadline:* ${group.enddate || ''} ${group.endtime || ''}\n\n` +
                                    `🚫 This booking has passed its hold deadline and is now marked as *EXPIRED*.`;

                    await sendTelegramAlert(message);

                    // Update status in Firestore for all legs in the group
                    for (const leg of group.rawLegs) {
                        await db.collection('bookings').doc(leg.id).update({
                            status: 'expired',
                            remark: 'end',
                            expiredAt: now.toISOString()
                        });
                    }
                }
                // Case 2: Deadline is near (under 1 hour left)
                else if (timeLeftMins > 0 && timeLeftMins <= 60 && !group.notified1hWarning) {
                    const clientLabel = group.clientName.includes(',') ? 'Clients' : 'Client';
                    const message = `⚠️ *HOLD DEADLINE WARNING* (Less than 1 hour!)\n\n` +
                                    `👤 *${clientLabel}:* ${group.clientName}\n` +
                                    routeInfo +
                                    `🎫 *PNR:* ${group.pnr || 'N/A'}\n` +
                                    `⏰ *Deadline:* ${group.enddate || ''} ${group.endtime || ''}\n` +
                                    `⏳ *Time Left:* ${timeLeftMins} mins`;

                    await sendTelegramAlert(message);

                    // Mark all legs in the group so we don't send duplicate notifications
                    for (const leg of group.rawLegs) {
                        await db.collection('bookings').doc(leg.id).update({ notified1hWarning: true });
                    }
                }
            }
        } catch (error) {
            console.error('Error in checkBookingDeadlines scheduler:', error);
        }
    }
);

async function sendTelegramAlert(text) {
    const BOT_TOKEN = (typeof PARAM_TELEGRAM_BOT_TOKEN !== 'undefined' && PARAM_TELEGRAM_BOT_TOKEN.value()) || process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = (typeof PARAM_TELEGRAM_CHAT_ID !== 'undefined' && PARAM_TELEGRAM_CHAT_ID.value()) || process.env.TELEGRAM_CHAT_ID || '1101682157';

    if (!BOT_TOKEN) {
        console.warn('sendTelegramAlert: TELEGRAM_BOT_TOKEN is not configured.');
        return;
    }

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text,
                parse_mode: 'Markdown'
            })
        });

        // If Markdown parsing fails due to special characters in names/notes, retry as plain text
        if (!response.ok && response.status === 400) {
            const cleanText = text.replace(/[*_`\[\]]/g, '');
            response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: cleanText
                })
            });
        }

        if (!response.ok) {
            const errText = await response.text();
            console.error(`Telegram API responded with status ${response.status}: ${errText}`);
            return false;
        }
        return true;
    } catch (error) {
        console.error('Failed to send Telegram notification:', error);
        return false;
    }
}

/* ==========================================================================
   AUTOMATED DAILY DIGEST (08:00 AM Asia/Yangon + On-Demand Callable)
   - Tomorrow & Day-After-Tomorrow Departures
   - Passport Validity < 6 Months Warnings (Upcoming Flights + Active Visas)
   - Visa Submission & Collection Reminders
   ========================================================================== */

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function getYangonDateParts(date = new Date()) {
    const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Yangon',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    const parts = formatter.formatToParts(date);
    const year = Number(parts.find(p => p.type === 'year')?.value || 0);
    const month = Number(parts.find(p => p.type === 'month')?.value || 1);
    const day = Number(parts.find(p => p.type === 'day')?.value || 1);
    return { year, month, day };
}

function toUtcDayMs(year, month, day) {
    return Date.UTC(year, month - 1, day);
}

function formatDayMsDmy(dayMs) {
    const d = new Date(dayMs);
    const dd = String(d.getUTCDate()).padStart(2, '0');
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
    const yyyy = d.getUTCFullYear();
    return `${dd}/${mm}/${yyyy}`;
}

function parseDateToUtcDayMs(raw) {
    if (!raw) return null;
    if (typeof raw === 'object' && typeof raw.toDate === 'function') {
        const d = raw.toDate();
        if (!Number.isNaN(d.getTime())) {
            const p = getYangonDateParts(d);
            return toUtcDayMs(p.year, p.month, p.day);
        }
    }
    const s = String(raw).trim();
    if (!s) return null;

    // YYYY-MM-DD or YYYY/MM/DD
    let m = s.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
    if (m) {
        return toUtcDayMs(Number(m[1]), Number(m[2]), Number(m[3]));
    }
    // DD/MM/YYYY or DD-MM-YYYY
    m = s.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
    if (m) {
        return toUtcDayMs(Number(m[3]), Number(m[2]), Number(m[1]));
    }
    // Fallback JS Date parse (e.g. "21 Nov 2026")
    const parsed = new Date(s);
    if (!Number.isNaN(parsed.getTime())) {
        return toUtcDayMs(parsed.getUTCFullYear(), parsed.getUTCMonth() + 1, parsed.getUTCDate());
    }
    return null;
}

function isCanceledTicketDoc(t) {
    if (!t) return true;
    if (t.deleted === true || t.is_deleted === true) return true;
    const status = String(t.status || '').toLowerCase().trim();
    if (status === 'cancelled' || status === 'canceled' || status === 'refunded' || status === 'void') return true;
    const remarks = String(t.remarks || '').toLowerCase();
    if (/\b(cancel|cancelled|canceled|refund|refunded|void)\b/.test(remarks)) return true;
    return false;
}

function isInternationalTicketDoc(t) {
    if (!t) return false;
    if (t.is_international === true) return true;
    const ft = String(t.flight_type || '').toLowerCase().trim();
    if (ft === 'international' || ft === 'intl') return true;
    return false;
}

function cleanPassengerDisplayName(name) {
    return String(name || '').trim().replace(/^(MR|MS|MRS|MSTR|MISS)\s+/i, '');
}

function computeDailyDigest(tickets, visas, referenceDate = new Date()) {
    const todayParts = getYangonDateParts(referenceDate);
    const todayMs = toUtcDayMs(todayParts.year, todayParts.month, todayParts.day);
    const tomorrowMs = todayMs + MS_PER_DAY;
    const dayAfterMs = todayMs + 2 * MS_PER_DAY;
    const window60dMs = todayMs + 60 * MS_PER_DAY;

    const tomorrowGroupsMap = new Map();
    const dayAfterGroupsMap = new Map();
    const passportWarnings = [];
    const seenPassportKeys = new Set();

    for (const t of (tickets || [])) {
        if (isCanceledTicketDoc(t)) continue;
        const depMs = parseDateToUtcDayMs(t.departing_on);
        if (depMs === null) continue;

        const paxName = cleanPassengerDisplayName(t.name) || 'Unknown';
        const pnr = String(t.booking_reference || '').trim().toUpperCase() || 'NO PNR';
        const dep = String(t.departure || '').trim() || 'N/A';
        const dest = String(t.destination || '').trim() || 'N/A';
        const airline = String(t.airline || '').trim();
        const phone = String(t.phone || '').trim();

        // 1. Tomorrow & Day-After-Tomorrow Flights
        if (depMs === tomorrowMs || depMs === dayAfterMs) {
            const targetMap = depMs === tomorrowMs ? tomorrowGroupsMap : dayAfterGroupsMap;
            const groupKey = pnr !== 'NO PNR'
                ? `${pnr}|${dep}|${dest}`
                : `${t.id || paxName}|${dep}|${dest}`;

            if (!targetMap.has(groupKey)) {
                targetMap.set(groupKey, {
                    pnr,
                    departure: dep,
                    destination: dest,
                    airline,
                    phone,
                    dateStr: formatDayMsDmy(depMs),
                    passengers: []
                });
            }
            const grp = targetMap.get(groupKey);
            if (!grp.passengers.includes(paxName)) grp.passengers.push(paxName);
            if (!grp.phone && phone) grp.phone = phone;
            if (!grp.airline && airline) grp.airline = airline;
        }

        // 2. Passport < 6 Months Warning (for upcoming flights within 60 days)
        if (depMs >= todayMs && depMs <= window60dMs && t.passport_expiry) {
            const expMs = parseDateToUtcDayMs(t.passport_expiry);
            if (expMs !== null) {
                const daysFromTravel = Math.round((expMs - depMs) / MS_PER_DAY);
                const isIntl = isInternationalTicketDoc(t);
                // Flag if expired or < 180 days (~6 months) from travel date
                if (daysFromTravel < 180) {
                    const dedupeKey = `${paxName.toUpperCase()}|${formatDayMsDmy(expMs)}`;
                    if (!seenPassportKeys.has(dedupeKey)) {
                        seenPassportKeys.add(dedupeKey);
                        passportWarnings.push({
                            source: isIntl ? 'Intl Flight' : 'Flight',
                            isIntl,
                            name: paxName,
                            pnr,
                            route: `${dep} ➔ ${dest}`,
                            travelDate: formatDayMsDmy(depMs),
                            passportExpiry: formatDayMsDmy(expMs),
                            daysLeft: daysFromTravel,
                            phone
                        });
                    }
                }
            }
        }
    }

    // 3. Visa Reminders + Active Visa Passport < 6 Months Warnings
    const visaReminders = [];
    for (const v of (visas || [])) {
        if (!v) continue;
        const st = String(v.status || '').toLowerCase().trim();
        if (st === 'collected' || st === 'withdrawn' || st === 'refused') continue;

        const applicant = cleanPassengerDisplayName(v.applicant_name || v.name) || 'Unknown';
        const country = String(v.country || '').trim() || 'Visa';
        const visaRef = String(v.visa_ref || '').trim();
        const reasons = [];
        let urgency = 'normal';

        if (v.submission_date && (st === 'draft' || st === 'collecting')) {
            const subMs = parseDateToUtcDayMs(v.submission_date);
            if (subMs !== null) {
                const diff = Math.round((subMs - todayMs) / MS_PER_DAY);
                if (diff <= 2) {
                    urgency = diff <= 0 ? 'high' : 'medium';
                    reasons.push(
                        diff < 0 ? `Submit overdue ${Math.abs(diff)}d`
                            : diff === 0 ? 'Submit today'
                            : diff === 1 ? 'Submit tomorrow'
                            : 'Submit in 2 days'
                    );
                }
            }
        }

        if ((st === 'submitted' || st === 'processing') && !v.expected_collection_date) {
            urgency = 'high';
            reasons.push('Collection date missing');
        }

        if (v.expected_collection_date) {
            const colMs = parseDateToUtcDayMs(v.expected_collection_date);
            if (colMs !== null) {
                const diff = Math.round((colMs - todayMs) / MS_PER_DAY);
                if (diff <= 2) {
                    urgency = diff <= 0 ? 'high' : 'medium';
                    reasons.push(
                        diff < 0 ? `Collection overdue ${Math.abs(diff)}d`
                            : diff === 0 ? 'Collect today'
                            : diff === 1 ? 'Collect tomorrow'
                            : 'Collect in 2 days'
                    );
                }
            }
        }

        if (reasons.length > 0) {
            visaReminders.push({
                applicant,
                country,
                visaRef,
                status: st || 'draft',
                urgency,
                reasons
            });
        }

        // Also check active visa passport expiry (< 180 days from travel_from or today)
        if (v.passport_expiry) {
            const expMs = parseDateToUtcDayMs(v.passport_expiry);
            const refMs = parseDateToUtcDayMs(v.travel_from) || todayMs;
            if (expMs !== null) {
                const daysLeft = Math.round((expMs - refMs) / MS_PER_DAY);
                if (daysLeft < 180) {
                    const dedupeKey = `${applicant.toUpperCase()}|${formatDayMsDmy(expMs)}`;
                    if (!seenPassportKeys.has(dedupeKey)) {
                        seenPassportKeys.add(dedupeKey);
                        passportWarnings.push({
                            source: `Visa (${country})`,
                            isIntl: true,
                            name: applicant,
                            pnr: visaRef || 'VISA',
                            route: country,
                            travelDate: formatDayMsDmy(refMs),
                            passportExpiry: formatDayMsDmy(expMs),
                            daysLeft,
                            phone: String(v.phone || '').trim()
                        });
                    }
                }
            }
        }
    }

    passportWarnings.sort((a, b) => a.daysLeft - b.daysLeft);
    const urgencyRank = { high: 0, medium: 1, normal: 2 };
    visaReminders.sort((a, b) => (urgencyRank[a.urgency] ?? 2) - (urgencyRank[b.urgency] ?? 2));

    return {
        todayStr: formatDayMsDmy(todayMs),
        tomorrowStr: formatDayMsDmy(tomorrowMs),
        dayAfterStr: formatDayMsDmy(dayAfterMs),
        tomorrowFlights: Array.from(tomorrowGroupsMap.values()),
        dayAfterFlights: Array.from(dayAfterGroupsMap.values()),
        passportWarnings,
        visaReminders
    };
}

function formatDailyDigestTelegramText(digest) {
    const lines = [];
    lines.push(`🌅 *OCEAN TRAVEL — DAILY OPERATIONS DIGEST*`);
    lines.push(`📅 *Date:* ${digest.todayStr} (Myanmar Time)`);
    lines.push('');

    // Section 1: Tomorrow & Day After Flights
    const totalFlights = digest.tomorrowFlights.length + digest.dayAfterFlights.length;
    lines.push(`✈️ *UPCOMING FLIGHTS (မနက်ဖြန် / သဘက်ခါ)* — ${totalFlights} group(s)`);

    if (digest.tomorrowFlights.length > 0) {
        lines.push(`▸ *Tomorrow (${digest.tomorrowStr}):*`);
        digest.tomorrowFlights.forEach((f, idx) => {
            const pax = f.passengers.join(', ');
            const air = f.airline ? ` (${f.airline})` : '';
            const ph = f.phone ? ` · ${f.phone}` : '';
            lines.push(`  ${idx + 1}. \`${f.pnr}\` ${pax} — ${f.departure} ➔ ${f.destination}${air}${ph}`);
        });
    } else {
        lines.push(`▸ *Tomorrow (${digest.tomorrowStr}):* None`);
    }

    if (digest.dayAfterFlights.length > 0) {
        lines.push(`▸ *Day After (${digest.dayAfterStr}):*`);
        digest.dayAfterFlights.forEach((f, idx) => {
            const pax = f.passengers.join(', ');
            const air = f.airline ? ` (${f.airline})` : '';
            const ph = f.phone ? ` · ${f.phone}` : '';
            lines.push(`  ${idx + 1}. \`${f.pnr}\` ${pax} — ${f.departure} ➔ ${f.destination}${air}${ph}`);
        });
    } else {
        lines.push(`▸ *Day After (${digest.dayAfterStr}):* None`);
    }

    lines.push('');

    // Section 2: Passport < 6 Months Warning
    lines.push(`🛂 *PASSPORT < 6 MONTHS WARNING* — ${digest.passportWarnings.length} alert(s)`);
    if (digest.passportWarnings.length > 0) {
        digest.passportWarnings.slice(0, 20).forEach((w, idx) => {
            const badge = w.daysLeft <= 0
                ? `❌ EXPIRED`
                : `⚠️ ${w.daysLeft}d left`;
            lines.push(`  ${idx + 1}. *${w.name}* (${w.source}) — Exp: ${w.passportExpiry} (${badge}) · ${w.route} [${w.pnr}]`);
        });
        if (digest.passportWarnings.length > 20) {
            lines.push(`  … and ${digest.passportWarnings.length - 20} more in Dashboard`);
        }
    } else {
        lines.push(`  ✅ All upcoming passports have 6+ months validity.`);
    }

    lines.push('');

    // Section 3: Visa Reminders
    lines.push(`📋 *VISA SUBMISSION & COLLECTION REMINDERS* — ${digest.visaReminders.length} item(s)`);
    if (digest.visaReminders.length > 0) {
        digest.visaReminders.slice(0, 20).forEach((v, idx) => {
            const icon = v.urgency === 'high' ? '🔴' : '🟡';
            const ref = v.visaRef ? ` [${v.visaRef}]` : '';
            lines.push(`  ${idx + 1}. ${icon} *${v.applicant}* (${v.country})${ref} — ${v.reasons.join(', ')}`);
        });
        if (digest.visaReminders.length > 20) {
            lines.push(`  … and ${digest.visaReminders.length - 20} more in Dashboard`);
        }
    } else {
        lines.push(`  ✅ No urgent visa submissions or collections.`);
    }

    return lines.join('\n');
}

async function sendTelegramChunks(fullText) {
    const MAX_LEN = 3800;
    if (fullText.length <= MAX_LEN) {
        return sendTelegramAlert(fullText);
    }
    const lines = fullText.split('\n');
    let chunk = '';
    let allOk = true;
    for (const line of lines) {
        if ((chunk + '\n' + line).length > MAX_LEN && chunk.length > 0) {
            const ok = await sendTelegramAlert(chunk);
            if (!ok) allOk = false;
            chunk = line;
        } else {
            chunk = chunk ? `${chunk}\n${line}` : line;
        }
    }
    if (chunk) {
        const ok = await sendTelegramAlert(chunk);
        if (!ok) allOk = false;
    }
    return allOk;
}

async function buildAndSendDailyDigest() {
    const db = admin.firestore();
    const [ticketsSnap, visasSnap] = await Promise.all([
        db.collection('tickets').get(),
        db.collection('visaApplications').get()
    ]);

    const tickets = ticketsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const visas = visasSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const digest = computeDailyDigest(tickets, visas, new Date());
    const text = formatDailyDigestTelegramText(digest);
    const sent = await sendTelegramChunks(text);

    return {
        sent,
        counts: {
            tomorrowFlights: digest.tomorrowFlights.length,
            dayAfterFlights: digest.dayAfterFlights.length,
            passportWarnings: digest.passportWarnings.length,
            visaReminders: digest.visaReminders.length
        },
        message: text
    };
}

/**
 * Scheduled Function: sendDailyDigest
 * Runs every morning at 08:00 AM Myanmar Time (Asia/Yangon)
 * Sends tomorrow/day-after departures, <6-month passport warnings, and visa reminders to Telegram.
 */
exports.sendDailyDigest = onSchedule(
    {
        schedule: '0 8 * * *',
        timeZone: 'Asia/Yangon',
        memory: '256MiB',
    },
    async () => {
        try {
            const result = await buildAndSendDailyDigest();
            console.log('sendDailyDigest completed:', JSON.stringify(result.counts), 'sent:', result.sent);
        } catch (error) {
            console.error('Error in sendDailyDigest scheduler:', error);
        }
    }
);

/**
 * HTTPS Callable: sendDailyDigestNow
 * Allows signed-in Ocean Travel staff to trigger the Daily Digest to Telegram on demand.
 */
exports.sendDailyDigestNow = onCall(
    {
        cors: true,
        invoker: 'public',
        memory: '256MiB',
    },
    async (request) => {
        if (!request.auth) {
            throw new HttpsError('unauthenticated', 'You must be signed in to send the daily digest.');
        }
        try {
            const result = await buildAndSendDailyDigest();
            return {
                ok: Boolean(result.sent),
                counts: result.counts
            };
        } catch (error) {
            console.error('Error in sendDailyDigestNow:', error);
            throw new HttpsError('internal', error.message || 'Failed to send daily digest.');
        }
    }
);

// Export pure helpers for unit testing
exports._dailyDigestHelpers = {
    computeDailyDigest,
    formatDailyDigestTelegramText,
    parseDateToUtcDayMs
};

