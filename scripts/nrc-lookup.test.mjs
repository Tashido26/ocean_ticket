import test from 'node:test';
import assert from 'node:assert/strict';
import { NRC_STATES, NRC_TOWNSHIPS, getTownshipsByState, findTownshipSuggestions } from '../nrc-data.js';

test('NRC dataset contains complete states and verified townships without any hyphen placeholders', () => {
    assert.equal(NRC_STATES.length, 15);
    assert.ok(NRC_TOWNSHIPS.length >= 450);

    // Ensure zero '-' or non-alphabetical shortEn codes exist
    const invalidCodes = NRC_TOWNSHIPS.filter(t => !/^[A-Z]+$/.test(t.shortEn));
    assert.equal(invalidCodes.length, 0);

    // Ensure Bagan in State 9 has proper code (BAGANA / PAGANA), never '-'
    const bagan9 = NRC_TOWNSHIPS.filter(t => t.stateCode === '9' && t.nameMm === 'ပုဂံ');
    assert.ok(bagan9.length >= 1);
    assert.ok(bagan9.some(t => t.shortEn === 'BAGANA' || t.shortEn === 'PAGANA'));

    const state6 = NRC_STATES.find(s => s.number === '6');
    assert.ok(state6);
    assert.equal(state6.nameMm, 'တနင်္သာရီတိုင်း');
});

test('findTownshipSuggestions returns BAMANA first when typing 1 and B (Sell Ticket user scenario)', () => {
    const suggestions = findTownshipSuggestions('1', 'B');
    assert.ok(suggestions.length > 0);
    assert.equal(suggestions[0].shortEn, 'BAMANA');
    assert.equal(suggestions[0].nameMm, 'ဗန်းမော်');
    assert.equal(suggestions[0].stateCode, '1');
});

test('getTownshipsByState and findTownshipSuggestions return full lists for State 6, State 9, and State 12 without truncation', () => {
    const t6 = getTownshipsByState('6');
    assert.equal(t6.length, 19);
    const codes = t6.map(t => t.shortEn);
    assert.ok(codes.includes('HTAWANA')); // Dawei (ထားဝယ်)
    assert.ok(codes.includes('MAMANA'));  // Myeik (မြိတ်)
    assert.ok(codes.includes('KATHANA')); // Kawthaung (ကော့သောင်း)
    assert.ok(codes.includes('KASANA'));  // Kyunsu (ကျွန်းစု)
    assert.ok(codes.includes('PALANA'));  // Palaw (ပုလော)

    const s12 = findTownshipSuggestions('12', '');
    assert.ok(s12.length >= 45);
    assert.ok(s12.some(t => t.shortEn === 'AHLANA'));
    assert.ok(s12.some(t => t.shortEn === 'YAPATHA'));

    const s9 = findTownshipSuggestions('9', '');
    assert.ok(s9.length >= 45);
    assert.ok(s9.some(t => t.shortEn === 'AHMAYA'));
    assert.ok(s9.some(t => t.shortEn === 'ZAYATHA'));
});

test('findTownshipSuggestions supports Myanmar script queries and prefix sorting', () => {
    const dawei = findTownshipSuggestions('6', 'ထားဝယ်');
    assert.equal(dawei.length, 1);
    assert.equal(dawei[0].shortEn, 'HTAWANA');

    const myeik = findTownshipSuggestions('6', 'မြိတ်');
    assert.equal(myeik.length, 3);
    assert.ok(myeik.some(t => t.shortEn === 'MAMANA'));

    const bhamoMm = findTownshipSuggestions('1', 'ဗန်းမော်');
    assert.equal(bhamoMm.length, 1);
    assert.equal(bhamoMm[0].shortEn, 'BAMANA');
});

test('findTownshipSuggestions without query sorts A to Z by English code', () => {
    const state5 = findTownshipSuggestions('5', '');
    assert.ok(state5.length > 30);
    assert.equal(state5[0].shortEn, 'AHTANA');
    assert.equal(state5[1].shortEn, 'AHYATA');
    for (let i = 1; i < state5.length; i++) {
        assert.ok(state5[i - 1].shortEn.localeCompare(state5[i].shortEn) <= 0);
    }
});

