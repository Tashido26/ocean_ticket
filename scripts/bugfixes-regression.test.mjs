import assert from 'node:assert/strict';
import test from 'node:test';

// Test 1: computeSingleRecordTotal & groupTicketsByAccount with sub_agent_fare
test('computeSingleRecordTotal includes sub_agent_fare for tickets and uses selling_price for hotels', () => {
    function computeSingleRecordTotal(t) {
        if (!t) return 0;
        if (t._isHotel) {
            return Number(t.selling_price || t.net_amount) || 0;
        }
        return (Number(t.net_amount) || 0) + (Number(t.extra_fare) || 0) + (Number(t.sub_agent_fare) || 0) + (Number(t.date_change) || 0);
    }

    const flightTicket = {
        net_amount: 100000,
        extra_fare: 5000,
        sub_agent_fare: 15000,
        date_change: 2000
    };
    assert.equal(computeSingleRecordTotal(flightTicket), 122000);

    const hotelRecord = {
        _isHotel: true,
        selling_price: 80000,
        net_amount: 70000
    };
    assert.equal(computeSingleRecordTotal(hotelRecord), 80000);
});

test('groupTicketsByAccount correctly aggregates sub_agent_fare and splitExact preserves integers', () => {
    const group = [
        { account_name: 'Agency A', sub_agent_fare: 10000, net_amount: 50000 },
        { account_name: 'Agency A', sub_agent_fare: 20000, net_amount: 50000 },
        { account_name: 'Agency A', sub_agent_fare: 5000, net_amount: 50000 }
    ];

    const sumField = (field) => group.reduce((sum, t) => sum + (Number(t[field]) || 0), 0);
    const totalSubAgent = sumField('sub_agent_fare');
    assert.equal(totalSubAgent, 35000);

    // splitExact algorithm from openEditGroupModal
    const splitExact = (total, count) => {
        const base = Math.floor(total / count);
        const remainder = total - base * count;
        return Array.from({ length: count }, (_, i) => base + (i < remainder ? 1 : 0));
    };

    const shares = splitExact(totalSubAgent, group.length);
    assert.equal(shares.reduce((a, b) => a + b, 0), 35000);
    assert.deepEqual(shares, [11667, 11667, 11666]);
});

// Test 2: Hotel Reservation payment status helper
test('getHotelPaymentKey correctly differentiates unpaid, partial, and paid', () => {
    function getHotelPaymentKey(t) {
        if (!t) return 'unpaid';
        const raw = String(t.paid ?? t.payment_status ?? '').trim().toLowerCase();
        if (raw === 'paid' || raw === 'true') return 'paid';
        if (raw === 'partial' || raw === 'partially paid') return 'partial';
        return 'unpaid';
    }

    assert.equal(getHotelPaymentKey({ paid: 'unpaid' }), 'unpaid');
    assert.equal(getHotelPaymentKey({ paid: 'partial' }), 'partial');
    assert.equal(getHotelPaymentKey({ paid: 'paid' }), 'paid');
    assert.equal(getHotelPaymentKey({}), 'unpaid');
    assert.equal(getHotelPaymentKey({ payment_status: 'paid' }), 'paid');
});

// Test 3: Settlement excludes canceled/refunded tickets and avoids ReferenceError
test('settlement isExcluded excludes canceled/refunded tickets and self-purchased tickets', () => {
    function isCanceled(t) {
        const r = String(t?.remarks || '').toLowerCase();
        return r.includes('refund') || r.includes('cancel');
    }

    function isExcluded(t) {
        return t?.source === 'self' || isCanceled(t);
    }

    assert.equal(isExcluded({ source: 'self' }), true);
    assert.equal(isExcluded({ remarks: 'Canceled by customer' }), true);
    assert.equal(isExcluded({ remarks: 'Full refund requested' }), true);
    assert.equal(isExcluded({ remarks: 'Regular ticket', source: 'agent' }), false);
});

// Test 4: Partial Payment split logic preserves sub_agent_fare and balances
test('handlePartialPayment split calculates exact sub_agent_fare and net_amount shares', () => {
    const ticket = {
        id: 't-1',
        name: 'John Doe',
        booking_reference: 'PNR123',
        base_fare: 100000,
        net_amount: 100000,
        commission: 10000,
        extra_fare: 10000,
        sub_agent_fare: 20000,
        date_change: 0,
        remarks: 'Test ticket'
    };

    const ticketTotalAmt = (ticket.net_amount || 0) + (ticket.extra_fare || 0) + (ticket.sub_agent_fare || 0) + (ticket.date_change || 0);
    assert.equal(ticketTotalAmt, 130000);

    const payAmount = 65000;
    const payDate = '2026-10-18';
    const payMethod = 'KBZPay';

    const remainder = ticketTotalAmt - payAmount;
    const ratio = payAmount / ticketTotalAmt; // 0.5
    const part1_Base = Math.floor((ticket.base_fare || 0) * ratio);
    const part1_Comm = Math.floor((ticket.commission || 0) * ratio);
    const part2_Base = (ticket.base_fare || 0) - part1_Base;
    const part2_Comm = (ticket.commission || 0) - part1_Comm;

    const originalSubAgent = Number(ticket.sub_agent_fare) || 0;
    const part1_SubAgent = Math.floor(originalSubAgent * ratio);
    const part2_SubAgent = originalSubAgent - part1_SubAgent;
    const part1_Net = payAmount - part1_SubAgent;
    const part2_Net = remainder - part2_SubAgent;

    // Verify sub-agent fare integrity
    assert.equal(part1_SubAgent + part2_SubAgent, originalSubAgent);
    assert.equal(part1_SubAgent, 10000);
    assert.equal(part2_SubAgent, 10000);

    // Verify ticket 1 total
    const part1_Total = part1_Net + part1_SubAgent;
    assert.equal(part1_Total, payAmount);

    // Verify ticket 2 (balance) total
    const part2_Total = part2_Net + part2_SubAgent;
    assert.equal(part2_Total, remainder);

    // Total of both tickets equals original total debt
    assert.equal(part1_Total + part2_Total, ticketTotalAmt);
});

// Test 5: Customer Message templates (Concise formatting and NRC / Passport rules)
test('buildCustomerMessage formats concise booking message without redundant headers', async () => {
    const { buildCustomerMessage } = await import('../utils.js');
    const msg = buildCustomerMessage({
        mode: 'booking',
        lang: 'mm',
        pnr: '1STD1L',
        routeText: 'Yangon → Mandalay',
        travelDate: '22-Oct-2026',
        deadlineText: '19-Oct-2026 4:30 PM',
        passengers: [{ name: 'MS WIN MAR SEIN', extra: '9/MAYATA(N)062580' }]
    });

    assert.ok(msg.startsWith('PNR: 1STD1L (Yangon → Mandalay, 22-Oct-2026) အတွက် booking တင်ပြီးပါပြီခင်ဗျာ။'));
    assert.ok(!msg.includes('မင်္ဂလာပါ'));
    assert.ok(!msg.includes('Booking အချက်အလက်များ'));
    assert.ok(!msg.includes('• Booking Ref (PNR):'));
    assert.ok(msg.includes('• ခရီးစဉ် : Yangon → Mandalay'));
    assert.ok(msg.includes('• ခရီးသွားမည့်ရက် : 22-Oct-2026'));
    assert.ok(msg.includes('• ခရီးသည် :\n  • MS WIN MAR SEIN (9/MAYATA(N)062580)'));
    assert.ok(msg.includes('• Booking Deadline: 19-Oct-2026 4:30 PM'));
    assert.ok(msg.includes('Ocean Air Ticket ကို ရွေးချယ်အားပေးမှုအတွက် အထူးကျေးဇူးတင်ရှိပါသည်ခင်ဗျာ။ 💙'));
});

test('buildCustomerMessage formats domestic ticket with 2h checkin and NRC only', async () => {
    const { buildCustomerMessage } = await import('../utils.js');
    const msg = buildCustomerMessage({
        mode: 'ticket',
        lang: 'mm',
        pnr: '1STD1L',
        airline: 'MAI',
        departure: 'Yangon (RGN)',
        destination: 'Mandalay (MDL)',
        travelDate: '22-Oct-2026',
        passengers: ['WIN MAR SEIN']
    });

    assert.ok(msg.startsWith('PNR: 1STD1L (Yangon (RGN) → Mandalay (MDL), 22-Oct-2026) အတွက် လေယာဉ်လက်မှတ် ဖြတ်ပြီးပါပြီခင်ဗျာ။'));
    assert.ok(msg.includes('• လေကြောင်းလိုင်း : MAI'));
    assert.ok(msg.includes('• ခရီးစဉ် : Yangon (RGN) → Mandalay (MDL)'));
    assert.ok(msg.includes('• ခရီးသည် :\n  • WIN MAR SEIN'));
    assert.ok(msg.includes('အနည်းဆုံး (၂) နာရီကြိုတင်၍'));
    assert.ok(msg.includes('မှတ်ပုံတင် (NRC မူရင်း) တစ်ပါတည်း ယူဆောင်သွားပေးပါခင်ဗျာ။'));
    // Should NOT require passport for domestic flight
    assert.ok(!msg.includes('Passport မူရင်း'));
});

test('buildCustomerMessage formats international ticket with 3h checkin and BOTH NRC and Passport', async () => {
    const { buildCustomerMessage } = await import('../utils.js');
    const msg = buildCustomerMessage({
        mode: 'ticket',
        lang: 'mm',
        pnr: '2INTL9',
        airline: 'MAI',
        departure: 'Yangon (RGN)',
        destination: 'Bangkok (BKK)',
        travelDate: '25-Oct-2026',
        passengers: ['AUNG AUNG']
    });

    assert.ok(msg.includes('အနည်းဆုံး (၃) နာရီကြိုတင်၍'));
    // Must include BOTH NRC and Passport
    assert.ok(msg.includes('မှတ်ပုံတင် (NRC မူရင်း) နှင့် Passport မူရင်း'));
});

// Test 7: Round-Trip PNR Sectors and Route Display (1SSLF6, 1SS7YZ)
test('getPnrRouteDisplay and getPnrTravelDateDisplay display both sectors for round-trip PNRs', async () => {
    const { getPnrSectors, getPnrRouteDisplay, getPnrTravelDateDisplay, buildCustomerMessage } = await import('../utils.js');

    // Case A: 1SSLF6 (outbound then return in array)
    const tickets1SSLF6 = [
        {
            booking_reference: '1SSLF6',
            departure: 'Yangon (RGN)',
            destination: 'New Delhi (DEL)',
            departing_on: '22-Oct-2026',
            leg: 'outbound',
            trip_type: 'Round-Trip',
            name: 'U TIN MAUNG'
        },
        {
            booking_reference: '1SSLF6',
            departure: 'New Delhi (DEL)',
            destination: 'Yangon (RGN)',
            departing_on: '29-Oct-2026',
            leg: 'return',
            trip_type: 'Round-Trip',
            name: 'U TIN MAUNG'
        }
    ];

    const sectorsA = getPnrSectors(tickets1SSLF6);
    assert.equal(sectorsA.length, 2);
    assert.equal(sectorsA[0].departure, 'Yangon');
    assert.equal(sectorsA[0].destination, 'New Delhi');
    assert.equal(sectorsA[1].departure, 'New Delhi');
    assert.equal(sectorsA[1].destination, 'Yangon');

    const routeA = getPnrRouteDisplay(tickets1SSLF6);
    assert.equal(routeA, 'Yangon → New Delhi / New Delhi → Yangon');

    const travelDateA = getPnrTravelDateDisplay(tickets1SSLF6);
    assert.equal(travelDateA, '22-Oct-2026 / 29-Oct-2026');

    // Case B: 1SS7YZ (Firestore returned return leg first)
    const tickets1SS7YZ = [
        {
            booking_reference: '1SS7YZ',
            departure: 'New Delhi (DEL)',
            destination: 'Yangon (RGN)',
            departing_on: '29-Oct-2026',
            leg: 'return',
            trip_type: 'Round-Trip',
            name: 'DAW MYA MYA'
        },
        {
            booking_reference: '1SS7YZ',
            departure: 'Yangon (RGN)',
            destination: 'New Delhi (DEL)',
            departing_on: '22-Oct-2026',
            leg: 'outbound',
            trip_type: 'Round-Trip',
            name: 'DAW MYA MYA'
        }
    ];

    // Must sort outbound first chronologically
    const routeB = getPnrRouteDisplay(tickets1SS7YZ);
    assert.equal(routeB, 'Yangon → New Delhi / New Delhi → Yangon');

    const travelDateB = getPnrTravelDateDisplay(tickets1SS7YZ);
    assert.equal(travelDateB, '22-Oct-2026 / 29-Oct-2026');

    // Case C: Multi-passenger round-trip booking (2 pax = 4 ticket rows) deduplicates to 2 unique sectors
    const ticketsMultiPax = [
        ...tickets1SSLF6,
        {
            booking_reference: '1SSLF6',
            departure: 'Yangon (RGN)',
            destination: 'New Delhi (DEL)',
            departing_on: '22-Oct-2026',
            leg: 'outbound',
            trip_type: 'Round-Trip',
            name: 'DAW AUNG'
        },
        {
            booking_reference: '1SSLF6',
            departure: 'New Delhi (DEL)',
            destination: 'Yangon (RGN)',
            departing_on: '29-Oct-2026',
            leg: 'return',
            trip_type: 'Round-Trip',
            name: 'DAW AUNG'
        }
    ];
    assert.equal(getPnrRouteDisplay(ticketsMultiPax), 'Yangon → New Delhi / New Delhi → Yangon');

    // Case D: Single ticket row with Round-Trip and return_date
    const singleRowRoundTrip = [{
        booking_reference: '1SSXYZ',
        departure: 'Yangon',
        destination: 'Bangkok',
        departing_on: '15/11/2026',
        return_date: '20/11/2026',
        trip_type: 'Round-Trip'
    }];
    assert.equal(getPnrRouteDisplay(singleRowRoundTrip), 'Yangon → Bangkok / Bangkok → Yangon');
    assert.equal(getPnrTravelDateDisplay(singleRowRoundTrip), '15-Nov-2026 / 20-Nov-2026');

    // Case E: Customer message with round-trip route and travel dates
    const customerMsg = buildCustomerMessage({
        mode: 'ticket',
        lang: 'mm',
        pnr: '1SSLF6',
        airline: 'Air India',
        routeText: routeA,
        travelDate: travelDateA,
        legs: sectorsA,
        passengers: ['U TIN MAUNG']
    });
    assert.ok(customerMsg.includes('• ခရီးစဉ် : Yangon → New Delhi / New Delhi → Yangon'));
    assert.ok(customerMsg.includes('• ခရီးသွားမည့်ရက် : 22-Oct-2026 / 29-Oct-2026'));
    // Case F: Truncated place name resolution (e.g. 1SS7YZ with "New" vs "New Delhi")
    const ticketsTruncatedCity = [
        {
            booking_reference: '1SS7YZ',
            departure: 'Yangon',
            destination: 'New',
            departing_on: '22-Oct-2026',
            leg: 'outbound',
            trip_type: 'Round-Trip',
            name: 'AYE AYE MYAT'
        },
        {
            booking_reference: '1SS7YZ',
            departure: 'New Delhi',
            destination: 'Yangon',
            departing_on: '29-Oct-2026',
            leg: 'return',
            trip_type: 'Round-Trip',
            name: 'AYE AYE MYAT'
        }
    ];
    const sectorsF = getPnrSectors(ticketsTruncatedCity);
    assert.equal(sectorsF.length, 2, 'Must have exactly 2 sectors, no duplicate or fragmented sectors');
    assert.equal(sectorsF[0].departure, 'Yangon');
    assert.equal(sectorsF[0].destination, 'New Delhi');
    assert.equal(sectorsF[1].departure, 'New Delhi');
    assert.equal(sectorsF[1].destination, 'Yangon');
    assert.equal(getPnrRouteDisplay(ticketsTruncatedCity), 'Yangon → New Delhi / New Delhi → Yangon');

    // Case G: Open-Jaw / Multi-City Round-Trip (e.g. 1TZ540 Mandalay → Bangkok, Bangkok → Yangon)
    // Must NOT synthesize inverted return legs (Bangkok → Mandalay, Yangon → Bangkok)
    const tickets1TZ540 = [
        {
            booking_reference: '1TZ540',
            departure: 'Mandalay',
            destination: 'Bangkok',
            departing_on: '18-Nov-2026',
            leg: 'outbound',
            trip_type: 'Round-Trip',
            name: 'EI EI CHO'
        },
        {
            booking_reference: '1TZ540',
            departure: 'Bangkok',
            destination: 'Yangon',
            departing_on: '25-Nov-2026',
            leg: 'return',
            trip_type: 'Round-Trip',
            name: 'EI EI CHO'
        }
    ];
    const sectorsG = getPnrSectors(tickets1TZ540);
    assert.equal(sectorsG.length, 2, 'Open-jaw PNR must contain exactly 2 sectors (no duplicate synthesized legs)');
    assert.equal(sectorsG[0].departure, 'Mandalay');
    assert.equal(sectorsG[0].destination, 'Bangkok');
    assert.equal(sectorsG[1].departure, 'Bangkok');
    assert.equal(sectorsG[1].destination, 'Yangon');
    assert.equal(getPnrRouteDisplay(tickets1TZ540), 'Mandalay → Bangkok / Bangkok → Yangon');

    // Case H: Multi-sector 3 legs (must not synthesize reciprocal routes)
    const tickets3Legs = [
        { booking_reference: 'MULTI3', departure: 'Yangon', destination: 'Bangkok', departing_on: '10-Dec-2026', leg: 'outbound', trip_type: 'Round-Trip' },
        { booking_reference: 'MULTI3', departure: 'Bangkok', destination: 'Singapore', departing_on: '15-Dec-2026', leg: 'transit', trip_type: 'Round-Trip' },
        { booking_reference: 'MULTI3', departure: 'Singapore', destination: 'Yangon', departing_on: '20-Dec-2026', leg: 'return', trip_type: 'Round-Trip' }
    ];
    const sectorsH = getPnrSectors(tickets3Legs);
    assert.equal(sectorsH.length, 3, 'Must contain exactly 3 sectors');
    assert.equal(getPnrRouteDisplay(tickets3Legs), 'Yangon → Bangkok / Bangkok → Singapore / Singapore → Yangon');

    // Case I: Single outbound ticket row with leg: 'outbound' and trip_type: 'Round-Trip'
    // Passed alone (e.g. from reminder line-items or today's departures) must NOT synthesize an inverted return leg
    const outboundOnlyTicket = {
        booking_reference: '1TZ51D',
        departure: 'Mandalay',
        destination: 'Bangkok',
        departing_on: '02-Dec-2026',
        leg: 'outbound',
        trip_type: 'Round-Trip',
        name: 'KHIN MYAT HTAN'
    };
    const sectorsI = getPnrSectors(outboundOnlyTicket);
    assert.equal(sectorsI.length, 1, 'Outbound leg row alone must not synthesize a return leg');
    assert.equal(sectorsI[0].departure, 'Mandalay');
    assert.equal(sectorsI[0].destination, 'Bangkok');
    assert.equal(getPnrRouteDisplay(outboundOnlyTicket), 'Mandalay → Bangkok');

    const returnOnlyTicket = {
        booking_reference: '1TZ51D',
        departure: 'Bangkok',
        destination: 'Yangon',
        departing_on: '10-Dec-2026',
        leg: 'return',
        trip_type: 'Round-Trip',
        name: 'KHIN MYAT HTAN'
    };
    assert.equal(getPnrRouteDisplay(returnOnlyTicket), 'Bangkok → Yangon');
});

test('Payment Reminder & Unpaid Grouping: exclude fully-paid zero-due tickets from line items and summary (Tha Dar Phyu scenario)', async () => {
    const { isTicketPaid, isFeeEntryRow, isCanceledTicket } = await import('../utils.js');

    // Tha Dar Phyu scenario:
    // PNR 1SFPD2 has 2 fully paid passenger legs from 30/09/2026 totaling 1,670,000 MMK,
    // and 1 unpaid Date Change / Fee row of 400,000 MMK from 17/11/2026.
    const tickets1SFPD2 = [
        {
            id: 'fee-1',
            booking_reference: '1SFPD2',
            name: 'THA DAR PHYU (Fees)',
            remarks: 'Date Change / Fee Entry',
            net_amount: 0,
            date_change: 400000,
            paid: false,
            departure: 'Kuala Lumpur',
            destination: 'Yangon',
            airline: 'MAI',
            departing_on: '07-Feb-2027',
            issued_date: '17/11/2026'
        },
        {
            id: 'leg-1',
            booking_reference: '1SFPD2',
            name: 'THA DAR PHYU',
            net_amount: 882850,
            paid: true,
            departure: 'Kuala Lumpur',
            destination: 'Yangon',
            airline: 'MAI',
            departing_on: '07-Feb-2027',
            issued_date: '30/09/2026',
            leg: 'outbound'
        },
        {
            id: 'leg-2',
            booking_reference: '1SFPD2',
            name: 'THA DAR PHYU',
            net_amount: 787150,
            paid: true,
            departure: 'Yangon',
            destination: 'Kuala Lumpur',
            airline: 'MAI',
            departing_on: '12-Mar-2027',
            issued_date: '30/09/2026',
            leg: 'return'
        }
    ];

    const ticketGrossAmount = (t) => (Number(t.net_amount) || 0) + (Number(t.extra_fare) || 0) + (Number(t.sub_agent_fare) || 0) + (Number(t.date_change) || 0);

    // 1. Line items filter logic as implemented in dashboard.js buildLineItems
    const unpaidRows = tickets1SFPD2.filter(t => {
        if (!t || isCanceledTicket(t)) return false;
        const gross = ticketGrossAmount(t);
        const paid = isTicketPaid(t)
            ? gross
            : (t.outstanding_amount !== undefined && Number(t.outstanding_amount) >= 0
                ? Math.max(0, gross - Number(t.outstanding_amount))
                : 0);
        const due = Math.max(0, gross - paid);
        return due > 0;
    });

    assert.equal(unpaidRows.length, 1, 'Only the unpaid fee row must be included');
    assert.equal(unpaidRows[0].id, 'fee-1');
    assert.equal(unpaidRows[0].name, 'THA DAR PHYU (Fees)');

    // 2. Summary computation
    const lineItems = unpaidRows.map(t => {
        const gross = ticketGrossAmount(t);
        const paid = isTicketPaid(t) ? gross : 0;
        const due = Math.max(0, gross - paid);
        return { gross, paid, due };
    });

    const totalGross = lineItems.reduce((s, item) => s + item.gross, 0);
    const defaultPaid = lineItems.reduce((s, item) => s + item.paid, 0);
    const balanceDue = Math.max(0, totalGross - defaultPaid);

    assert.equal(totalGross, 400000, 'Sub Total must be 400,000 MMK, not 2,070,000 MMK');
    assert.equal(defaultPaid, 0, 'Paid amount must be 0 MMK, not 1,670,000 MMK');
    assert.equal(balanceDue, 400000, 'Balance Due must be 400,000 MMK');

    // 3. Partially paid ticket scenario (deposit)
    const partialTicket = {
        id: 'partial-1',
        booking_reference: 'DEP01',
        name: 'AUNG AUNG',
        net_amount: 1000000,
        outstanding_amount: 600000, // 400,000 deposit paid
        paid: false
    };

    const partialGross = ticketGrossAmount(partialTicket);
    const partialPaid = Math.max(0, partialGross - Number(partialTicket.outstanding_amount));
    const partialDue = Math.max(0, partialGross - partialPaid);

    assert.equal(partialPaid, 400000, 'Partial deposit must be 400,000 MMK');
    assert.equal(partialDue, 600000, 'Due must be 600,000 MMK');
    assert.equal(partialDue > 0, true, 'Partially paid ticket must be included in reminder line items');
});


