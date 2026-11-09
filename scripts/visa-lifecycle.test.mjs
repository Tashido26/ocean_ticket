import test from 'node:test';
import assert from 'node:assert/strict';
import { parseSheetDate } from '../utils.js';

// Standalone implementation check for getVisaAttentionItems logic
function getVisaAttentionItems(visas = [], referenceDate = new Date()) {
    const todayStart = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate()).getTime();
    const attentionItems = [];

    (visas || []).forEach(v => {
        if (!v) return;
        const st = String(v.status || '').toLowerCase().trim();
        if (st === 'collected' || st === 'withdrawn' || st === 'refused') return;

        let needsAttention = false;
        const reasons = [];
        let urgency = 'normal';

        // 1. Submission due today, tomorrow, or overdue (physical passport drop-off needed)
        if (v.submission_date && (st === 'draft' || st === 'collecting')) {
            const subDate = parseSheetDate(v.submission_date);
            if (subDate && !isNaN(subDate.getTime()) && subDate.getTime() > 0) {
                const subStart = new Date(subDate.getFullYear(), subDate.getMonth(), subDate.getDate()).getTime();
                const diffDays = Math.round((subStart - todayStart) / (24 * 60 * 60 * 1000));
                if (diffDays <= 1) {
                    needsAttention = true;
                    urgency = diffDays <= 0 ? 'high' : 'medium';
                    reasons.push(diffDays < 0 ? `Submission overdue ${Math.abs(diffDays)}d` : diffDays === 0 ? 'Submit to embassy today' : 'Submit to embassy tomorrow');
                }
            }
        }

        // 2. Submitted / Processing but Missing Expected Collection Date
        if ((st === 'submitted' || st === 'processing') && !v.expected_collection_date) {
            needsAttention = true;
            urgency = 'high';
            reasons.push('Return date missing (Set collection date)');
        }

        // 3. Expected Collection Date reached (today, tomorrow, or overdue)
        if (v.expected_collection_date && st !== 'collected') {
            const colDate = parseSheetDate(v.expected_collection_date);
            if (colDate && !isNaN(colDate.getTime()) && colDate.getTime() > 0) {
                const colStart = new Date(colDate.getFullYear(), colDate.getMonth(), colDate.getDate()).getTime();
                const diffDays = Math.round((colStart - todayStart) / (24 * 60 * 60 * 1000));
                if (diffDays <= 1) {
                    needsAttention = true;
                    urgency = diffDays <= 0 ? 'high' : 'medium';
                    reasons.push(diffDays < 0 ? `Collection overdue ${Math.abs(diffDays)}d` : diffDays === 0 ? 'Collection due today' : 'Collection due tomorrow');
                }
            }
        }

        // 4. Approved but not yet collected / handed to client
        if (st === 'approved') {
            needsAttention = true;
            reasons.push('Passport ready for client collection');
        }

        if (needsAttention) {
            attentionItems.push({
                visa: v,
                reasons,
                urgency
            });
        }
    });

    return attentionItems;
}

test('getVisaAttentionItems detects 3 tomorrow submissions (user scenario)', () => {
    // Current date: 2026-11-09
    const refDate = new Date(2026, 10, 9); // Nov 9, 2026

    const userVisas = [
        {
            id: 'VSA-ID1RHY',
            applicant_name: 'AUNG KHIN NYUNT',
            country: 'China',
            status: 'collecting',
            application_date: '10/11/2026',
            submission_date: '10/11/2026' // Tomorrow!
        },
        {
            id: 'VSA-ZB6T6U',
            applicant_name: 'MYINT MYINT WIN',
            country: 'China',
            status: 'collecting',
            application_date: '09/11/2026',
            submission_date: '10/11/2026' // Tomorrow!
        },
        {
            id: 'VSA-4HLIQX',
            applicant_name: 'AIK PANG',
            country: 'China',
            status: 'collecting',
            application_date: '09/11/2026',
            submission_date: '10/11/2026' // Tomorrow!
        }
    ];

    const items = getVisaAttentionItems(userVisas, refDate);
    assert.equal(items.length, 3);
    assert.equal(items[0].reasons[0], 'Submit to embassy tomorrow');
});

test('getVisaAttentionItems detects missing return date when submitted', () => {
    const refDate = new Date(2026, 10, 9);
    const submittedVisas = [
        {
            id: 'VSA-001',
            applicant_name: 'TEST SUBMITTED',
            status: 'submitted',
            submission_date: '09/11/2026',
            expected_collection_date: '' // Missing return date!
        },
        {
            id: 'VSA-002',
            applicant_name: 'TEST COLLECTED',
            status: 'collected',
            submission_date: '01/11/2026',
            expected_collection_date: '08/11/2026',
            collection_date: '08/11/2026'
        }
    ];

    const items = getVisaAttentionItems(submittedVisas, refDate);
    assert.equal(items.length, 1);
    assert.equal(items[0].visa.id, 'VSA-001');
    assert.match(items[0].reasons[0], /Return date missing/);
});
