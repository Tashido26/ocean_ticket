# Changelog

All notable changes to **Ocean Travel Management System** (`oceanticket.netlify.app`) and **Travel Docs Generator** (`traveldocsgen.netlify.app`) are documented in this file.

---

## [2026-11-25]

### Added
- **19 New Verified Asian Hotel Presets** (synced across both **Ocean Ticket** & **traveldocsgen** — now **31 hotels across 26 cities**):
  - **Vientiane** — *Landmark Vientiane Life Center*
  - **Kunming** — *Ibis Styles Hotel (Kunming Nanping Pedestrian Street)*
  - **Chiang Mai - R2** — *R2 Hotel Chiangmai*
  - **Bangkok - City Park** — *City Park Hotel Bangkok Pratunam by Pcl*
  - **15 Major Asian Cities**: Bali, Beijing, Chengdu, Dubai, Hong Kong, New Delhi, Osaka, Pattaya, Penang, Phnom Penh, Phuket, Seoul, Shanghai, Taipei, Tokyo — all with verified addresses, international phone numbers, and PDF/Text auto-detection rules.
- **Selective PNR & Item Picker in Payment Reminder Card**:
  - Added 1-click PNR toggle pills and a collapsible item-by-item checklist (`Pick Items`) inside the Payment Reminder Card modal.
  - Dynamically recalculates `Sub Total`, scoped `Agent Fare`, `Paid / Deposit`, and `BALANCE DUE` for selected subsets only, and syncs with `Copy Text (MM)`, `Download PDF (A4)`, and `Download PNG`.
- **Project Documentation**:
  - Added comprehensive `README.md` and migrated GitHub remote to `https://github.com/Tashido26/ocean_ticket`.

### Fixed
- **Clean Multi-Page PDF Pagination (`computeCleanPageSlices`)**:
  - Replaced naive fixed-height PDF slicing with block-aware DOM measurement so multi-page Payment Reminder PDFs never slice through table rows, totals boxes, `PAYMENT METHODS`, or footers across page breaks.

### Changed
- **Tasks & Reminders Visual Highlight**:
  - Updated urgent reminder cards (`Booking Deadlines`, `Visa Collections`, `Expiring Passports`) from light yellow to a refined soft rose red palette (`#FFF1F2` / `#FECDD3` / `#E11D48`) in both Light Mode and Dark Mode.

---

## [2026-11-24]

### Fixed
- **Payment Reminder Card Paid Amount & Settled Rows**:
  - Excluded fully-paid, zero-due historical ticket rows from unpaid PNR line items and summary totals so only active unpaid receivables (and genuine partial deposits) appear on reminder cards.
- **Payment Reminder Layout & Route Display**:
  - Prevented duplicate route strings, fixed column text overlap on dense reminder cards, and added proportional single-page A4 auto-fit for slightly overflowing sheets.

---

## [2026-11-23]

### Fixed
- **Open-Jaw & Multi-City PNR Routes**:
  - Stopped synthesizing inverted return sectors on open-jaw bookings (e.g. `Mandalay → Bangkok / Bangkok → Yangon`), preserving exact booked sectors.

---

## [2026-11-21]

### Added
- **Bulk Pay All (By Account)**: Added 1-click Bulk Pay modal per social media account with Mobile Banking bank selector and datepicker.
- **Standalone PWA Clean UI**: Embedded Netlify Shadow DOM badge hiding script in `index.html` for both Ocean Ticket and traveldocsgen.

### Fixed
- **Client Profile Merging**: Preserved full passenger identity on date-change fee rows and merged legacy split `(Fees)` profiles.

---

## Complete Hotel Preset Directory (31 Hotels · 26 Cities)

All presets below are available in both **Ocean Ticket** (`Service → Hotel Confirmation`) and **traveldocsgen**, including Quick Destination dropdowns, Modal Presets, and automatic PDF/Text voucher detection.

| # | City | Preset Key | Hotel Name | Address | Phone |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 1 | **Bali** | `Bali` | Mercure Kuta Bali | Jalan Pantai Kuta 10 X, Br. Pande Mas, Kuta, Bali 80361, Indonesia | `+62 361 767 411` |
| 2 | **Bangkok** | `Bangkok` | Grande Centre Point Ratchadamri | 153/2 Mahatlek Luang 1, Ratchadamri Rd, Lumpini, Pathumwan, Bangkok, Thailand | `+66 209 19000` |
| 3 | **Bangkok** | `Bangkok - City Park` | City Park Hotel Bangkok Pratunam by Pcl | 71 Soi Somprasong 3 (Phetchaburi 15), Phayathai, Ratchathewi, Bangkok 10400, Thailand | `+66 2 019 2277` |
| 4 | **Beijing** | `Beijing` | Novotel Beijing Peace | 3 Jinyu Hutong, Dongcheng District, Beijing 100006, China | `+86 10 6512 8833` |
| 5 | **Chengdu** | `Chengdu` | Dorsett Chengdu | 168 Xi Yulong Street, Qingyang District, Chengdu, Sichuan 610041, China | `+86 28 8332 8666` |
| 6 | **Chiang Mai** | `Chiang Mai` | Duangtawan Hotel Chiang Mai | 132 Loi Kroh Rd, Tambon Chang Khlan, Chiang Mai 50100, Thailand | `+66 53 905 000` |
| 7 | **Chiang Mai** | `Chiang Mai - R2` | R2 Hotel Chiangmai | 123 Rimklongcholprathan Rd, Suthep, Mueang Chiang Mai, Chiang Mai 50200, Thailand | `+66 88 138 0523` |
| 8 | **Da Nang** | `Da Nang` | My Khe II Hotel | 260 Võ Nguyên Giáp, Phước Mỹ Ward, Sơn Trà District, Da Nang City, Vietnam | `+84 932 417 277` |
| 9 | **Dubai** | `Dubai` | Rove Downtown | 312 Al Mustaqbal Street, Zabeel 2, Dubai, United Arab Emirates | `+971 4 561 9999` |
| 10 | **Guangzhou** | `Guangzhou` | Grand Park Guangzhou Hotel | 20 Hong Hua Qiao, Wuhua, Guangzhou, China | `+86 871 6538 6688` |
| 11 | **Hanoi** | `Hanoi` | Alley Garden Hotel & Spa | 8 Ngõ 19 P. Nhà Chung, Hoàn Kiếm, Hà Nội 100000, Vietnam | `+84 985 436 518` |
| 12 | **Ho Chi Minh** | `Ho Chi Minh` | Golden Lunar Hotel | 175/24 Phạm Ngũ Lão, District 1, Ho Chi Minh City 700000, Vietnam | `+84 764 964 293` |
| 13 | **Hong Kong** | `Hong Kong` | Park Hotel Hong Kong | 61-65 Chatham Road South, Tsim Sha Tsui, Kowloon, Hong Kong | `+852 2731 2100` |
| 14 | **Kuala Lumpur** | `Kuala Lumpur` | THE FACE Style Hotel | 1020 Jalan Sultan Ismail, Kuala Lumpur, Malaysia | `+60 3216 81688` |
| 15 | **Kunming** | `Kunming` | Ibis Styles Hotel (Kunming Nanping Pedestrian Street) | 418 Qingnian Road, Wuhua District, Kunming, Yunnan 650011, China | `+86 871 6811 9988` |
| 16 | **New Delhi** | `New Delhi` | The Hans, New Delhi | 15 Barakhamba Road, Connaught Place, New Delhi, Delhi 110001, India | `+91 11 2371 3951` |
| 17 | **Osaka** | `Osaka` | Cross Hotel Osaka | 2-5-15 Shinsaibashisuji, Chuo-ku, Osaka 542-0085, Japan | `+81 6 6213 8281` |
| 18 | **Pattaya** | `Pattaya` | Holiday Inn Express Pattaya Central | 293/16 Moo 10, Nongprue, Banglamung, Pattaya, Chonburi 20150, Thailand | `+66 33 265 999` |
| 19 | **Penang** | `Penang` | Cititel Penang | 66 Jalan Penang, 10000 George Town, Pulau Pinang, Malaysia | `+60 4 291 1188` |
| 20 | **Phnom Penh** | `Phnom Penh` | SUN & MOON, Urban Hotel | No. 68, Corner of Street 136 & Street 15, Khan Daun Penh, Phnom Penh, Cambodia | `+855 23 961 888` |
| 21 | **Phuket** | `Phuket` | SLEEP WITH ME HOTEL design hotel @ patong | 187/5 Rat-U-Thit 200 Pee Road, Patong Beach, Kathu, Phuket 83150, Thailand | `+66 76 363 333` |
| 22 | **Seoul** | `Seoul` | L7 Myeongdong | 137 Toegye-ro, Jung-gu, Seoul 04537, South Korea | `+82 2 6310 1000` |
| 23 | **Shanghai** | `Shanghai` | Holiday Inn Shanghai Nanjing Road | 595 Jiujiang Road, Huangpu District, Shanghai 200001, China | `+86 21 3313 4888` |
| 24 | **Singapore** | `Singapore` | Village Hotel Bugis by Far East Hospitality | 390 Victoria Street, Bugis, Singapore 188061 | `+65 6297 2828` |
| 25 | **Taipei** | `Taipei` | Hotel Midtown Richardson | No. 4, Xiushan St., Zhongzheng Dist., Taipei City 100, Taiwan | `+886 2 2375 7777` |
| 26 | **Tokyo** | `Tokyo` | Hotel Gracery Shinjuku | 1-19-1 Kabukicho, Shinjuku-ku, Tokyo 160-8466, Japan | `+81 3 6833 1111` |
| 27 | **Vientiane** | `Vientiane` | Landmark Vientiane Life Center | Khouvieng Road, Nongchan Village, Sisattanak District, Vientiane, Laos | `+856 20 55 155 812` |
| 28 | **Yangon** | `Yangon - Lotte` | Lotte Hotel Yangon | 82 Sin Phyu Shin Avenue, Hlaing Township, Mayangon, Yangon 11051, Myanmar | `+95 1 935 1000` |
| 29 | **Yangon** | `Yangon - Melia` | Melia Yangon | 192 Kaba Aye Pagoda Road, Bahan Township, Yangon 11201, Myanmar | `+95 1 934 5000` |
| 30 | **Yangon** | `Yangon - Sayarsan` | Sayarsan Hotel Yangon | No. 42, Sayarsan Road, Bahan Township, Yangon 11201, Myanmar | `+95 1 860 5722` |
| 31 | **Yangon** | `Yangon - Sedona` | Sedona Hotel Yangon | 1 Kabar Aye Pagoda Rd, Yankin Township, Yangon 11181, Myanmar | `+95 1 860 5377` |
