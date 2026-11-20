// Application settings (Firebase config is in firebase-config.js)
export const CONFIG = {
    COLLECTIONS: {
        TICKETS: 'tickets',
        BOOKINGS: 'bookings',
        HISTORY: 'history',
        SETTLEMENTS: 'settlements'
    }
};

// City data for flight type toggle
export const CITIES = {
    DOMESTIC: [
        "Ann (VBA)", "Anni Sakhan (VBK)", "Bassein (BSX)", "Bhamo (BMO)", "Bokpyin (VBP)",
        "Coco Islands (VCC)", "Dawei (TVY)", "Heho (HEH)", "Hommalinn (HOX)", "Kalemyo (KMV)",
        "Kawthaung (KAW)", "Kengtung (KET)", "Khamti (KHM)", "Kyaukpyu (KYP)", "Lashio (LSH)",
        "Loikaw (LIW)", "Manaung (MGU)", "Mandalay (MDL)", "Mawlamyaing (MNU)", "Monghsat (MOG)",
        "Monywa (NYW)", "Myeik (MGZ)", "Myitkyina (MYT)", "Namsang (NMS)", "Nay Pyi Taw (NYT)",
        "Nyaung U (NYU)", "Putao (PBU)", "Sittwe (AKY)", "Surbung (SRU)", "Tachilek (THL)",
        "Thandwe (SNW)", "Yangon (RGN)"
    ],
    INTERNATIONAL: [
        "Mandalay (MDL)", "Yangon (RGN)", "Auckland (AKL)", "Bangalore (BLR)", "Bangkok (BKK)",
        "Brisbane (BNE)", "Busan (PUS)", "Chengdu (CTU)", "Chiang Mai (CNX)", "Chiang Rai (CEI)",
        "Colombo (CMB)", "Cox's Bazar (CXB)", "Da Nang (DAD)", "Denpasar (DPS)", "Dhaka (DAC)",
        "Don Mueang (DMK)", "Dubai (DXB)", "Fukuoka (FUK)", "Gaya (GAY)", "Guangzhou (CAN)",
        "Haikou (HAK)", "Hanoi (HAN)", "Ho Chi Minh City (SGN)", "Hong Kong (HKG)", "Jakarta (CGK)",
        "Kolkata (CCU)", "Krabi (KBV)", "Kuala Lumpur (KUL)", "Kunming (KMG)", "Macau (MFM)",
        "Mae Sot (MAQ)", "Mangshi (LUM)", "Manila (MNL)", "Melbourne (MEL)", "Mumbai (BOM)",
        "Nagoya (NGO)", "Nanning (NNG)", "New Delhi (DEL)", "Penang (PEN)", "Phu Quoc (PQC)",
        "Phuket (HKT)", "Seoul - Incheon (ICN)", "Siem Reap (SAI)", "Singapore (SIN)", "Subang (SZB)",
        "Sydney (SYD)", "Taipei (TPE)", "Tokyo - Haneda (HND)", "Tokyo - Narita (NRT)",
        "Vientiane (VTE)", "Xiamen (XMN)"
    ]
};