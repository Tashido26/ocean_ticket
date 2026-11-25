<div align="center">

<img src="./ocean-travel-logo.png" alt="Ocean Travel Logo" width="220" />

# Ocean Travel — Ticket, Hotel & Visa Management System

**An all-in-one operational, billing, and document-generation web platform built for modern travel agencies.**

[![Live App](https://img.shields.io/badge/Live-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://oceanticket.netlify.app)
[![Firebase](https://img.shields.io/badge/Database-Firebase_Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](#tech-stack)
[![Gemini AI](https://img.shields.io/badge/AI_OCR-Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](#core-features)
[![Tests](https://img.shields.io/badge/Tests-93_Passing-16A34A?style=for-the-badge&logo=node.js&logoColor=white)](#testing)
[![PWA](https://img.shields.io/badge/PWA-Mobile_Ready-0D6E77?style=for-the-badge&logo=pwa&logoColor=white)](#pwa--ux)

</div>

---

## Overview

**Ocean Travel Management System** streamlines the complete daily workflow of a travel agency — from issuing domestic & international air tickets, managing hotel reservations and visa applications, to tracking unpaid receivables, generating branded Payment Reminder Cards & E-Tickets, and reconciling owner/sub-agent settlements in real time.

Built as a fast, zero-framework **Vanilla ES Modules Progressive Web App (PWA)** backed by **Firebase Firestore** and **Netlify Functions**, it runs seamlessly across desktop browsers and iOS/Android Home Screen standalone mode.

---

## Core Features

### 1. Executive Dashboard & Smart Reminders
- **Real-Time KPIs & Analytics**: Live tracking of revenue, net profit, self-purchased margins, ticket volume, and unpaid receivables across customizable date periods.
- **Tasks & Reminders Hub**: Unified alert feed for **Booking Deadlines**, **Visa Collection Dates**, **Expiring Passports (`< 6 months`)** with VIP client filtering, and manual tasks.
- **Upcoming Departures**: Quick-glance trip schedule with PNR detail modals and one-click bilingual (Myanmar / English) customer itinerary messages.

### 2. Ticket Sales, AI Passport OCR & Myanmar NRC Directory
- **Multi-Passenger & Multi-Sector Sales**: Supports Domestic & International, One-Way, Round-Trip, and Open-Jaw itineraries with automatic fare, extra fare, sub-agent fare, and date-change fee calculations.
- **AI Passport OCR**: Extracts passenger name, passport number, DOB, expiry date, and nationality directly from passport photos via a Netlify serverless function powered by `@google/genai`.
- **Myanmar NRC Autocomplete & Lookup**: Complete, verified database of all 14 states/regions with instant prefix suggestions (English & Myanmar script) in the Sell Ticket form and a dedicated Lookup Directory in the Service tab.

### 3. Payment Reminder Cards & Unpaid Receivables
- **Account & PNR Grouping**: Consolidates unpaid tickets, date-change fees, and hotel balances by Social Media Account or individual PNR while cleanly excluding settled zero-due tickets.
- **Selective PNR & Item Picker**: Cherry-pick specific PNRs or individual ticket legs to include on a reminder card, with live recalculation of Sub Total, Agent Fare, Paid/Deposit, and Balance Due.
- **Multi-Format Export**:
  - **A4 PDF** with block-aware pagination (never slices table rows, totals, or payment method cards across page breaks).
  - **High-DPI PNG** card image ready for Viber / Messenger / WhatsApp.
  - **Burmese Text Summary** with 1-click clipboard copy.
- **Bulk Pay**: Settle multiple unpaid bookings for an account in a single audited Firestore batch.

### 4. Hotel Reservations & Visa Management
- **Hotel Bookings**: Track check-in/check-out dates, payment statuses (`paid`, `partial`, `unpaid`), selling prices, and generate Agoda-style hotel confirmation vouchers.
- **Visa Applications**: Manage submission dates, expected collection dates, document checklists, status transitions, and net service fee tracking without polluting airline settlement math.

### 5. Owner Settlement & Audit Trail
- **FIFO & Manual Partial Allocations**: Allocate installment payments across owner-payable tickets with remaining-balance validation and closed-period locking.
- **Structured Activity Logs**: Automatic field-level diff tracking for payments, date changes, cancellations, visa updates, and bulk operations.

### 6. Branded E-Ticket & Invoice Generator
- **Multi-Airline E-Ticket Converters**: Parse itineraries and generate branded HTML/PDF e-tickets for airlines including AirAsia, China Airlines, China Eastern, Vietnam Airlines, Hong Kong Airlines, and HK Express.
- **Smart Invoices & Receipts**: Passenger-level selection, multi-PNR consolidation, and automatic Paid/Unpaid receipt labeling.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Vanilla JavaScript (ES Modules), HTML5, Modular CSS bundled via `esbuild` |
| **Backend / Database** | Firebase Firestore (real-time listeners + batched writes) & Firebase Auth |
| **Serverless Functions** | Netlify Functions (`netlify/functions/gemini-passport-ocr.js`) |
| **AI / OCR** | Google Gemini API (`@google/genai`) |
| **Document Export** | `jsPDF`, `html2canvas` (lazy-loaded on demand) |
| **PWA & Caching** | Custom Service Worker (`sw.js`) with content-hashed asset versioning |
| **Testing** | Node.js built-in test runner (`node --test`) + Playwright verification scripts |

---

## Project Structure

```text
ocean_ticket/
├── index.html                  # Main SPA shell & views
├── main.js                     # App bootstrap, routing, real-time Firestore listeners
├── dashboard.js                # KPIs, unpaid grouping, Payment Reminder Card, reminders
├── tickets.js                  # Ticket sales form, records table, group edits
├── manage.js                   # PNR management, date changes, fees, cancellations
├── search.js                   # Ranked multi-field search (PNR, name, phone, account)
├── settlement.js               # Owner settlement engine (FIFO & manual allocations)
├── hotel.js                    # Hotel reservations & voucher management
├── visa.js                     # Visa processing & collection reminders
├── invoice.js                  # Invoice & receipt PDF/image generator
├── nrc-data.js                 # Complete Myanmar NRC dataset & search helpers
├── utils.js                    # Date, currency, PNR sector, and pagination utilities
├── db.js                       # Firestore CRUD & batch helpers
├── netlify/functions/          # Serverless Gemini Passport OCR endpoint
├── scripts/
│   ├── build-styles.mjs        # CSS bundler/minifier + SW cache-busting versioning
│   └── *.test.mjs              # Automated unit & regression test suite
└── sw.js                       # PWA Service Worker
```

---

## Local Development

### Prerequisites
- **Node.js** 20+
- **Netlify CLI** (for local serverless functions or direct production deploys)

### Install & Build Styles
```bash
npm install
npm run build:styles
```

`npm run build:styles` bundles and minifies all stylesheets into `app-styles.min.css`, updates cache-busting query versions across ES modules, and refreshes the Service Worker cache key in `sw.js`.

### Testing
Run the full unit and regression test suite (93 tests):
```bash
node --test scripts/*.test.mjs
```

### Deployment
Production is hosted on **Netlify**:
```bash
npm run build:styles
netlify deploy --dir . --prod
```

---

<div align="center">
  <sub>Built with care for <strong>Ocean Travel & Tour Co., Ltd.</strong> — Explore. Discover. Experience.</sub>
</div>
