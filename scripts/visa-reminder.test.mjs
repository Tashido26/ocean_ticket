import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { parseSheetDate, formatDateForSheet } from '../utils.js';

const dashSource = readFileSync(new URL('../dashboard.js', import.meta.url), 'utf8')
    .replace(/^import\s+[\s\S]*?from\s+['"][^'"]+['"];\s*$/gm, '')
    .replace(/^export\s+/gm, '');

const context = {
    console,
    parseSheetDate,
    formatDateForSheet,
    state: { allVisas: [] },
    window: {},
    document: { getElementById: () => null }
};
vm.createContext(context);
vm.runInContext(dashSource, context);

const { getVisaCollectionReminderRows } = context;

test('Visa Collection Reminders - generates accurate countdown and status tones', () => {
    // Reference date: 2026-11-10
    const refDate = new Date(2026, 10, 10); // Nov 10, 2026

    const mockVisas = [
        {
            id: 'VSA-AAA111',
            applicant_name: 'Overdue Person',
            country: 'China',
            passport_no: 'MD111111',
            status: 'submitted',
            expected_collection_date: '08/11/2026' // 2 days ago
        },
        {
            id: 'VSA-BBB222',
            applicant_name: 'Due Today Person',
            country: 'Thailand',
            passport_no: 'MD222222',
            status: 'processing',
            expected_collection_date: '10/11/2026' // Today
        },
        {
            id: 'VSA-CCC333',
            applicant_name: 'Tomorrow Person',
            country: 'Taiwan',
            passport_no: 'MD333333',
            status: 'collecting',
            expected_collection_date: '11/11/2026' // Tomorrow
        },
        {
            id: 'VSA-DDD444',
            applicant_name: 'Next Week Person',
            country: 'Japan',
            passport_no: 'MD444444',
            status: 'processing',
            expected_collection_date: '15/11/2026' // 5 days
        },
        {
            id: 'VSA-EEE555',
            applicant_name: 'Later Person',
            country: 'Korea',
            passport_no: 'MD555555',
            status: 'processing',
            expected_collection_date: '25/11/2026' // 15 days
        },
        {
            id: 'VSA-COLLECTED',
            applicant_name: 'Already Collected',
            country: 'China',
            status: 'collected',
            expected_collection_date: '05/11/2026'
        },
        {
            id: 'VSA-WITHDRAWN',
            applicant_name: 'Canceled Case',
            country: 'Thailand',
            status: 'withdrawn',
            expected_collection_date: '09/11/2026'
        },
        {
            id: 'VSA-NO-DATE',
            applicant_name: 'No Expected Date',
            country: 'China',
            status: 'processing'
        }
    ];

    const rows = getVisaCollectionReminderRows(mockVisas, refDate);

    // Should filter out collected, withdrawn, and no-date records (5 active remain)
    assert.equal(rows.length, 5);

    // Sorted by date: earliest first
    assert.equal(rows[0].id, 'VSA-AAA111');
    assert.equal(rows[0].tone, 'danger');
    assert.equal(rows[0].label, 'Overdue 2d');
    assert.equal(rows[0].diffDays, -2);

    assert.equal(rows[1].id, 'VSA-BBB222');
    assert.equal(rows[1].tone, 'danger');
    assert.equal(rows[1].label, 'Due today');
    assert.equal(rows[1].diffDays, 0);

    assert.equal(rows[2].id, 'VSA-CCC333');
    assert.equal(rows[2].tone, 'warning');
    assert.equal(rows[2].label, 'Due tomorrow');
    assert.equal(rows[2].diffDays, 1);

    assert.equal(rows[3].id, 'VSA-DDD444');
    assert.equal(rows[3].tone, 'warning');
    assert.equal(rows[3].label, 'In 5d');
    assert.equal(rows[3].diffDays, 5);

    assert.equal(rows[4].id, 'VSA-EEE555');
    assert.equal(rows[4].tone, 'neutral');
    assert.equal(rows[4].label, 'In 15d');
    assert.equal(rows[4].diffDays, 15);
});
