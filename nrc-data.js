// Myanmar NRC (National Registration Card) Datasets and Lookup Helpers
// Merged & verified from chuuhtetnaing/myanmar-nrc-format-dataset, wai-lin/mm-nrc, and htetoozin/Myanmar-NRC

export const NRC_STATES = [
  {
    "number": "1",
    "numberMm": "၁",
    "nameEn": "KACHIN",
    "nameMm": "ကချင်ပြည်နယ်"
  },
  {
    "number": "2",
    "numberMm": "၂",
    "nameEn": "KAYAH",
    "nameMm": "ကယားပြည်နယ်"
  },
  {
    "number": "3",
    "numberMm": "၃",
    "nameEn": "KAYIN",
    "nameMm": "ကရင်ပြည်နယ်"
  },
  {
    "number": "4",
    "numberMm": "၄",
    "nameEn": "CHIN",
    "nameMm": "ချင်းပြည်နယ်"
  },
  {
    "number": "5",
    "numberMm": "၅",
    "nameEn": "SAGAING",
    "nameMm": "စစ်ကိုင်းတိုင်း"
  },
  {
    "number": "6",
    "numberMm": "၆",
    "nameEn": "TANINTHARYI",
    "nameMm": "တနင်္သာရီတိုင်း"
  },
  {
    "number": "7",
    "numberMm": "၇",
    "nameEn": "BAGO",
    "nameMm": "ပဲခူးတိုင်း"
  },
  {
    "number": "8",
    "numberMm": "၈",
    "nameEn": "MAGWAY",
    "nameMm": "မကွေးတိုင်း"
  },
  {
    "number": "9",
    "numberMm": "၉",
    "nameEn": "MANDALAY",
    "nameMm": "မန္တလေးတိုင်း"
  },
  {
    "number": "10",
    "numberMm": "၁၀",
    "nameEn": "MON",
    "nameMm": "မွန်ပြည်နယ်"
  },
  {
    "number": "11",
    "numberMm": "၁၁",
    "nameEn": "RAKHINE",
    "nameMm": "ရခိုင်ပြည်နယ်"
  },
  {
    "number": "12",
    "numberMm": "၁၂",
    "nameEn": "YANGON",
    "nameMm": "ရန်ကုန်တိုင်း"
  },
  {
    "number": "13",
    "numberMm": "၁၃",
    "nameEn": "SHAN",
    "nameMm": "ရှမ်းပြည်နယ်"
  },
  {
    "number": "14",
    "numberMm": "၁၄",
    "nameEn": "AYEYARWADY",
    "nameMm": "ဧရာဝတီတိုင်း"
  },
  {
    "number": "9*",
    "numberMm": "၉*",
    "nameEn": "NAYPYITAW",
    "nameMm": "နေပြည်တော်"
  }
];

export const NRC_TOWNSHIPS = [
  {
    "stateCode": "1",
    "shortEn": "AHGAYA",
    "shortMm": "အဂယ",
    "nameEn": "INJANGYANG",
    "nameMm": "အင်ဂျန်းယန်"
  },
  {
    "stateCode": "1",
    "shortEn": "BAMANA",
    "shortMm": "ဗမန",
    "nameEn": "BHAMO",
    "nameMm": "ဗန်းမော်"
  },
  {
    "stateCode": "1",
    "shortEn": "DAPHAYA",
    "shortMm": "ဒဖယ",
    "nameEn": "DAWTHPONEYAN",
    "nameMm": "ဒေါ့ဖုန်းယန်"
  },
  {
    "stateCode": "1",
    "shortEn": "HAPANA",
    "shortMm": "ဟပန",
    "nameEn": "HOPIN",
    "nameMm": "ဟိုပင်"
  },
  {
    "stateCode": "1",
    "shortEn": "KAMANA",
    "shortMm": "ကမန",
    "nameEn": "KAMAING (HPAKANT)",
    "nameMm": "ကာမိုင်း (ဖားကန့်)"
  },
  {
    "stateCode": "1",
    "shortEn": "KAMATA",
    "shortMm": "ကမတ",
    "nameEn": "KAMAING (SUB-TOWNSHIP)",
    "nameMm": "ကာမိုင်း (မြို့နယ်ခွဲ)"
  },
  {
    "stateCode": "1",
    "shortEn": "KAPATA",
    "shortMm": "ကပတ",
    "nameEn": "KAN YEIK TI",
    "nameMm": "ကန်ပိုက်တီ"
  },
  {
    "stateCode": "1",
    "shortEn": "KHABADA",
    "shortMm": "ခဘဒ",
    "nameEn": "HKAWBUDE",
    "nameMm": "ခေါ်ဘူဒဲ"
  },
  {
    "stateCode": "1",
    "shortEn": "KHALAPHA",
    "shortMm": "ခလဖ",
    "nameEn": "KHAUNGLANHPU",
    "nameMm": "ခေါင်လန်ဖူး"
  },
  {
    "stateCode": "1",
    "shortEn": "KHAPHANA",
    "shortMm": "ခဖန",
    "nameEn": "CHIPWI",
    "nameMm": "ချီဖွေ"
  },
  {
    "stateCode": "1",
    "shortEn": "LAGANA",
    "shortMm": "လဂန",
    "nameEn": "LWE GE",
    "nameMm": "လွယ်ဂျယ်"
  },
  {
    "stateCode": "1",
    "shortEn": "MAKANA",
    "shortMm": "မကန",
    "nameEn": "MYITKYINA",
    "nameMm": "မြစ်ကြီးနား"
  },
  {
    "stateCode": "1",
    "shortEn": "MAKATA",
    "shortMm": "မကတ",
    "nameEn": "MOGAUNG",
    "nameMm": "မိုးကောင်း"
  },
  {
    "stateCode": "1",
    "shortEn": "MAKHABA",
    "shortMm": "မခဘ",
    "nameEn": "MACHANBAW",
    "nameMm": "မချမ်းဘော"
  },
  {
    "stateCode": "1",
    "shortEn": "MALANA",
    "shortMm": "မလန",
    "nameEn": "MYOHLAMYO",
    "nameMm": "မြို့လှ"
  },
  {
    "stateCode": "1",
    "shortEn": "MAMANA",
    "shortMm": "မမန",
    "nameEn": "MOMAUK",
    "nameMm": "မိုးမောက်"
  },
  {
    "stateCode": "1",
    "shortEn": "MANYANA",
    "shortMm": "မညန",
    "nameEn": "MOHNYIN",
    "nameMm": "မိုးညှင်း"
  },
  {
    "stateCode": "1",
    "shortEn": "MASANA",
    "shortMm": "မစန",
    "nameEn": "MANSI",
    "nameMm": "မံစီ"
  },
  {
    "stateCode": "1",
    "shortEn": "NAMANA",
    "shortMm": "နမန",
    "nameEn": "NAWNGMUN",
    "nameMm": "နောင်မွန်း"
  },
  {
    "stateCode": "1",
    "shortEn": "PANADA",
    "shortMm": "ပနဒ",
    "nameEn": "PANNANDIN",
    "nameMm": "ပန်နန်းဒင်"
  },
  {
    "stateCode": "1",
    "shortEn": "PATAAH",
    "shortMm": "ပတအ",
    "nameEn": "PUTA-O",
    "nameMm": "ပူတာအို"
  },
  {
    "stateCode": "1",
    "shortEn": "PAWANA",
    "shortMm": "ပ၀န",
    "nameEn": "PANG WAR",
    "nameMm": "ပန်ဝါ"
  },
  {
    "stateCode": "1",
    "shortEn": "PHAKANA",
    "shortMm": "ဖကန",
    "nameEn": "HPAKANT",
    "nameMm": "ဖားကန့်"
  },
  {
    "stateCode": "1",
    "shortEn": "SABATA",
    "shortMm": "ဆဘန",
    "nameEn": "SINBO",
    "nameMm": "ဆင်ဘို"
  },
  {
    "stateCode": "1",
    "shortEn": "SADANA",
    "shortMm": "ဆဒန",
    "nameEn": "SADUNG",
    "nameMm": "ဆဒုံး"
  },
  {
    "stateCode": "1",
    "shortEn": "SALANA",
    "shortMm": "ဆလန",
    "nameEn": "TSAWLAW",
    "nameMm": "ဆော့လော်"
  },
  {
    "stateCode": "1",
    "shortEn": "SAPABA",
    "shortMm": "ဆပဘ",
    "nameEn": "SUMPRABUM",
    "nameMm": "ဆွမ်ပရာဘွမ်"
  },
  {
    "stateCode": "1",
    "shortEn": "TANANA",
    "shortMm": "တနန",
    "nameEn": "TANAI",
    "nameMm": "တနိုင်း"
  },
  {
    "stateCode": "1",
    "shortEn": "WAMANA",
    "shortMm": "၀မန",
    "nameEn": "WAINGMAW",
    "nameMm": "ဝိုင်းမော်"
  },
  {
    "stateCode": "1",
    "shortEn": "YABAYA",
    "shortMm": "ရဘယ",
    "nameEn": "SHIN BWAY YAN",
    "nameMm": "ရှင်ဗွေယန်"
  },
  {
    "stateCode": "1",
    "shortEn": "YAKANA",
    "shortMm": "ရကန",
    "nameEn": "SHWEGU",
    "nameMm": "ရွှေကူ"
  },
  {
    "stateCode": "2",
    "shortEn": "BALAKHA",
    "shortMm": "ဘလခ",
    "nameEn": "BAW LA KHE",
    "nameMm": "ဘောလခဲ"
  },
  {
    "stateCode": "2",
    "shortEn": "DAMASA",
    "shortMm": "ဒမဆ",
    "nameEn": "DI MAW SO",
    "nameMm": "ဒီးမော့ဆို"
  },
  {
    "stateCode": "2",
    "shortEn": "LAKANA",
    "shortMm": "လကန",
    "nameEn": "LOIKAW",
    "nameMm": "လွိုင်ကော်"
  },
  {
    "stateCode": "2",
    "shortEn": "MASANA",
    "shortMm": "မစန",
    "nameEn": "MEISI",
    "nameMm": "မယ်စဲ"
  },
  {
    "stateCode": "2",
    "shortEn": "PHASANA",
    "shortMm": "ဖဆန",
    "nameEn": "HPASAWNG",
    "nameMm": "ဖားဆောင်း"
  },
  {
    "stateCode": "2",
    "shortEn": "PHAYASA",
    "shortMm": "ဖရဆ",
    "nameEn": "PHRU SO",
    "nameMm": "ဖရူဆို"
  },
  {
    "stateCode": "2",
    "shortEn": "YATANA",
    "shortMm": "ရတန",
    "nameEn": "SHAR DAW",
    "nameMm": "ရှားတော"
  },
  {
    "stateCode": "2",
    "shortEn": "YATHANA",
    "shortMm": "ရသန",
    "nameEn": "YWARTHIT",
    "nameMm": "ရွာသစ်"
  },
  {
    "stateCode": "3",
    "shortEn": "BAAHNA",
    "shortMm": "ဘအန",
    "nameEn": "HPA-AN",
    "nameMm": "ဘားအံ"
  },
  {
    "stateCode": "3",
    "shortEn": "BAGALA",
    "shortMm": "ဘဂလ",
    "nameEn": "BAW GA LI",
    "nameMm": "ဘောဂလိ"
  },
  {
    "stateCode": "3",
    "shortEn": "BATHASA",
    "shortMm": "ဘသဆ",
    "nameEn": "HPAYARTHONESU",
    "nameMm": "ဘုရားသုံးဆူ"
  },
  {
    "stateCode": "3",
    "shortEn": "KADANA",
    "shortMm": "ကဒန",
    "nameEn": "KYONDOE",
    "nameMm": "ကျုံဒိုး"
  },
  {
    "stateCode": "3",
    "shortEn": "KAKAYA",
    "shortMm": "ကကရ",
    "nameEn": "KAWKAREIK",
    "nameMm": "ကော့ကရိတ်"
  },
  {
    "stateCode": "3",
    "shortEn": "KAMAMA",
    "shortMm": "ကမမ",
    "nameEn": "KA MA MAUNG",
    "nameMm": "ကမမောင်း"
  },
  {
    "stateCode": "3",
    "shortEn": "KASAKA",
    "shortMm": "ကဆက",
    "nameEn": "KYAINSEIKGYI",
    "nameMm": "ကြာအင်းဆိပ်ကြီး"
  },
  {
    "stateCode": "3",
    "shortEn": "LABANA",
    "shortMm": "လဘန",
    "nameEn": "HLAINGBWE",
    "nameMm": "လှိုင်းဘွဲ့"
  },
  {
    "stateCode": "3",
    "shortEn": "LATHANA",
    "shortMm": "လသန",
    "nameEn": "LEIK THO",
    "nameMm": "လိပ်သို"
  },
  {
    "stateCode": "3",
    "shortEn": "MAWATA",
    "shortMm": "မဝတ",
    "nameEn": "MYAWADDY",
    "nameMm": "မြဝတီ"
  },
  {
    "stateCode": "3",
    "shortEn": "PAKANA",
    "shortMm": "ပကန",
    "nameEn": "PAING KYON",
    "nameMm": "ပိုင်ကျုံ"
  },
  {
    "stateCode": "3",
    "shortEn": "PHAPANA",
    "shortMm": "ဖပန",
    "nameEn": "HPAPUN",
    "nameMm": "ဖာပွန်"
  },
  {
    "stateCode": "3",
    "shortEn": "SAKALA",
    "shortMm": "စကလ",
    "nameEn": "SU KA LI",
    "nameMm": "စုကလိ"
  },
  {
    "stateCode": "3",
    "shortEn": "THATAKA",
    "shortMm": "သတက",
    "nameEn": "THANDAUNGGYI",
    "nameMm": "သံတောင်ကြီး"
  },
  {
    "stateCode": "3",
    "shortEn": "THATANA",
    "shortMm": "သတန",
    "nameEn": "THANDAUNG",
    "nameMm": "သံတောင်"
  },
  {
    "stateCode": "3",
    "shortEn": "WALAMA",
    "shortMm": "၀လမ",
    "nameEn": "WALE MYAING",
    "nameMm": "ဝေါလေမြိုင် (ဝေါလေ)"
  },
  {
    "stateCode": "3",
    "shortEn": "YAYATHA",
    "shortMm": "ရရသ",
    "nameEn": "SHAN YWAR THIT",
    "nameMm": "ရှမ်းရွာသစ်"
  },
  {
    "stateCode": "4",
    "shortEn": "HAKHANA",
    "shortMm": "ဟခန",
    "nameEn": "HAKHA",
    "nameMm": "ဟားခါး"
  },
  {
    "stateCode": "4",
    "shortEn": "HTATALA",
    "shortMm": "ထတလ",
    "nameEn": "THANTLANG",
    "nameMm": "ထန်တလန်"
  },
  {
    "stateCode": "4",
    "shortEn": "KAKHANA",
    "shortMm": "ကခန",
    "nameEn": "CIKHA",
    "nameMm": "ကျီခါး"
  },
  {
    "stateCode": "4",
    "shortEn": "KAPALA",
    "shortMm": "ကပလ",
    "nameEn": "KANPETLET",
    "nameMm": "ကန်ပက်လက်"
  },
  {
    "stateCode": "4",
    "shortEn": "MATANA",
    "shortMm": "မတန",
    "nameEn": "MINDAT",
    "nameMm": "မင်းတပ်"
  },
  {
    "stateCode": "4",
    "shortEn": "MATAPA",
    "shortMm": "မတပ",
    "nameEn": "MATUPI",
    "nameMm": "မတူပီ"
  },
  {
    "stateCode": "4",
    "shortEn": "PALAWA",
    "shortMm": "ပလဝ",
    "nameEn": "PALETWA",
    "nameMm": "ပလက်ဝ"
  },
  {
    "stateCode": "4",
    "shortEn": "PHALANA",
    "shortMm": "ဖလန",
    "nameEn": "FALAM",
    "nameMm": "ဖလမ်း"
  },
  {
    "stateCode": "4",
    "shortEn": "SAMANA",
    "shortMm": "ဆမန",
    "nameEn": "SAMI",
    "nameMm": "ဆမီး"
  },
  {
    "stateCode": "4",
    "shortEn": "TATANA",
    "shortMm": "တတန",
    "nameEn": "TEDIM",
    "nameMm": "တီးတိန်"
  },
  {
    "stateCode": "4",
    "shortEn": "TAZANA",
    "shortMm": "တဇန",
    "nameEn": "TON ZAUNG",
    "nameMm": "တွန်းဇန်"
  },
  {
    "stateCode": "4",
    "shortEn": "YAKHADA",
    "shortMm": "ရခဒ",
    "nameEn": "RIH KHUA DAL",
    "nameMm": "ရိခေါ်ဒါရ်"
  },
  {
    "stateCode": "4",
    "shortEn": "YAZANA",
    "shortMm": "ရဇန",
    "nameEn": "REZUA",
    "nameMm": "ရေဇွာ"
  },
  {
    "stateCode": "5",
    "shortEn": "AHTANA",
    "shortMm": "အတန",
    "nameEn": "INDAW",
    "nameMm": "အင်းတော်"
  },
  {
    "stateCode": "5",
    "shortEn": "AHYATA",
    "shortMm": "အရတ",
    "nameEn": "AYADAW",
    "nameMm": "အရာတော်"
  },
  {
    "stateCode": "5",
    "shortEn": "BAMANA",
    "shortMm": "ဗမန",
    "nameEn": "BANMAUK",
    "nameMm": "ဗန်းမောက်"
  },
  {
    "stateCode": "5",
    "shortEn": "BATALA",
    "shortMm": "ဘတလ",
    "nameEn": "BUDALIN",
    "nameMm": "ဘုတလင်"
  },
  {
    "stateCode": "5",
    "shortEn": "DAHANA",
    "shortMm": "ဒဟန",
    "nameEn": "DON HEE",
    "nameMm": "ဒုံဟီး"
  },
  {
    "stateCode": "5",
    "shortEn": "DAPAYA",
    "shortMm": "ဒပယ",
    "nameEn": "TABAYIN",
    "nameMm": "ဒီပဲယင်း"
  },
  {
    "stateCode": "5",
    "shortEn": "HAMALA",
    "shortMm": "ဟမလ",
    "nameEn": "HOMALIN",
    "nameMm": "ဟုမ္မလင်း"
  },
  {
    "stateCode": "5",
    "shortEn": "HSAMARA",
    "shortMm": "ဆမရ",
    "nameEn": "SUM MA RAR",
    "nameMm": "ဆွမ္မရာ"
  },
  {
    "stateCode": "5",
    "shortEn": "HTAKHANA",
    "shortMm": "ထခန",
    "nameEn": "TIGYAING",
    "nameMm": "ထီးချိုင့်"
  },
  {
    "stateCode": "5",
    "shortEn": "HTAPAKHA",
    "shortMm": "ထပခ",
    "nameEn": "HTAN PAR KWAY",
    "nameMm": "ထန်ပါခွေ"
  },
  {
    "stateCode": "5",
    "shortEn": "KABALA",
    "shortMm": "ကဘလ",
    "nameEn": "KANBALU",
    "nameMm": "ကန့်ဘလူ"
  },
  {
    "stateCode": "5",
    "shortEn": "KALAHTA",
    "shortMm": "ကလထ",
    "nameEn": "KALE",
    "nameMm": "ကလေး"
  },
  {
    "stateCode": "5",
    "shortEn": "KALANA",
    "shortMm": "ကလန",
    "nameEn": "KYUNHLA",
    "nameMm": "ကျွန်းလှ"
  },
  {
    "stateCode": "5",
    "shortEn": "KALATA",
    "shortMm": "ကလတ",
    "nameEn": "KAWLIN",
    "nameMm": "ကောလင်း"
  },
  {
    "stateCode": "5",
    "shortEn": "KALAWA",
    "shortMm": "ကလ၀",
    "nameEn": "KALEWA",
    "nameMm": "ကလေးဝ"
  },
  {
    "stateCode": "5",
    "shortEn": "KAMANA",
    "shortMm": "ကမန",
    "nameEn": "KYAUK MYAUNG",
    "nameMm": "ကျောက်မြောင်း"
  },
  {
    "stateCode": "5",
    "shortEn": "KANANA",
    "shortMm": "ကနန",
    "nameEn": "KANI",
    "nameMm": "ကနီ"
  },
  {
    "stateCode": "5",
    "shortEn": "KATHANA",
    "shortMm": "ကသန",
    "nameEn": "KATHA",
    "nameMm": "ကသာ"
  },
  {
    "stateCode": "5",
    "shortEn": "KHAOUNA",
    "shortMm": "ခဥန",
    "nameEn": "KHIN-U",
    "nameMm": "ခင်ဦး"
  },
  {
    "stateCode": "5",
    "shortEn": "KHAOUTA",
    "shortMm": "ခဥတ",
    "nameEn": "CHAUNG-U",
    "nameMm": "ချောင်းဦး"
  },
  {
    "stateCode": "5",
    "shortEn": "KHAPANA",
    "shortMm": "ခပန",
    "nameEn": "KHAM PAT",
    "nameMm": "ခါမ်းပါတ်"
  },
  {
    "stateCode": "5",
    "shortEn": "KHATANA",
    "shortMm": "ခတန",
    "nameEn": "HKAMTI",
    "nameMm": "ခန္တီး"
  },
  {
    "stateCode": "5",
    "shortEn": "LAHANA",
    "shortMm": "လဟန",
    "nameEn": "LAHE",
    "nameMm": "လဟယ်"
  },
  {
    "stateCode": "5",
    "shortEn": "LAYANA",
    "shortMm": "လရန",
    "nameEn": "LAY SHI",
    "nameMm": "လေရှီး"
  },
  {
    "stateCode": "5",
    "shortEn": "MAKANA",
    "shortMm": "မကန",
    "nameEn": "MINGIN",
    "nameMm": "မင်းကင်း"
  },
  {
    "stateCode": "5",
    "shortEn": "MALANA",
    "shortMm": "မလန",
    "nameEn": "MAWLAIK",
    "nameMm": "မော်လိုက်"
  },
  {
    "stateCode": "5",
    "shortEn": "MAMANA",
    "shortMm": "မမန",
    "nameEn": "MYAUNG",
    "nameMm": "မြောင်"
  },
  {
    "stateCode": "5",
    "shortEn": "MAMATA",
    "shortMm": "မမတ",
    "nameEn": "MYINMU",
    "nameMm": "မြင်းမူ"
  },
  {
    "stateCode": "5",
    "shortEn": "MAPALA",
    "shortMm": "မပလ",
    "nameEn": "MO PAING LUT",
    "nameMm": "မိုပိုင်းလွတ်"
  },
  {
    "stateCode": "5",
    "shortEn": "MATHANA",
    "shortMm": "မသန",
    "nameEn": "MYOTHIT",
    "nameMm": "မြို့သစ်"
  },
  {
    "stateCode": "5",
    "shortEn": "MAYANA",
    "shortMm": "မရန",
    "nameEn": "MONYWA",
    "nameMm": "မုံရွာ"
  },
  {
    "stateCode": "5",
    "shortEn": "NAYANA",
    "shortMm": "နယန",
    "nameEn": "NANYUN",
    "nameMm": "နန်းယွန်း"
  },
  {
    "stateCode": "5",
    "shortEn": "NGAZANA",
    "shortMm": "ငဇန",
    "nameEn": "NGAN ZUN",
    "nameMm": "ငါန်းဇွန်"
  },
  {
    "stateCode": "5",
    "shortEn": "PALABA",
    "shortMm": "ပလဘ",
    "nameEn": "PIN LE BU",
    "nameMm": "ပင်လည်ဘူး"
  },
  {
    "stateCode": "5",
    "shortEn": "PALANA",
    "shortMm": "ပလန",
    "nameEn": "PALE",
    "nameMm": "ပုလဲ"
  },
  {
    "stateCode": "5",
    "shortEn": "PASANA",
    "shortMm": "ပဆန",
    "nameEn": "PANSAUNG",
    "nameMm": "ပန်ဆောင်"
  },
  {
    "stateCode": "5",
    "shortEn": "PHAPANA",
    "shortMm": "ဖပန",
    "nameEn": "PAUNGBYIN",
    "nameMm": "ဖောင်းပြင်"
  },
  {
    "stateCode": "5",
    "shortEn": "SAKANA",
    "shortMm": "စကန",
    "nameEn": "SAGAING",
    "nameMm": "စစ်ကိုင်း"
  },
  {
    "stateCode": "5",
    "shortEn": "SALAKA",
    "shortMm": "ဆလက",
    "nameEn": "SALINGYI",
    "nameMm": "ဆားလင်းကြီး"
  },
  {
    "stateCode": "5",
    "shortEn": "TAMANA",
    "shortMm": "တမန",
    "nameEn": "TAMU",
    "nameMm": "တမူး"
  },
  {
    "stateCode": "5",
    "shortEn": "TASANA",
    "shortMm": "တဆန",
    "nameEn": "TAZE",
    "nameMm": "တန့်ဆည်"
  },
  {
    "stateCode": "5",
    "shortEn": "WALANA",
    "shortMm": "ဝလန",
    "nameEn": "WETLET",
    "nameMm": "ဝက်လက်"
  },
  {
    "stateCode": "5",
    "shortEn": "WATHANA",
    "shortMm": "ဝသန",
    "nameEn": "WUNTHO",
    "nameMm": "ဝန်းသို"
  },
  {
    "stateCode": "5",
    "shortEn": "YABANA",
    "shortMm": "ရဘန",
    "nameEn": "SHWEBO",
    "nameMm": "ရွှေဘို"
  },
  {
    "stateCode": "5",
    "shortEn": "YAMAPA",
    "shortMm": "ယမပ",
    "nameEn": "YINMARBIN",
    "nameMm": "ယင်းမာပင်"
  },
  {
    "stateCode": "5",
    "shortEn": "YAOUNA",
    "shortMm": "ရဥန",
    "nameEn": "YE-U",
    "nameMm": "ရေဦး"
  },
  {
    "stateCode": "5",
    "shortEn": "YATHAKA",
    "shortMm": "ရသက",
    "nameEn": "YWA THIT GYI",
    "nameMm": "ရွာသစ်ကြီး"
  },
  {
    "stateCode": "6",
    "shortEn": "BAPANA",
    "shortMm": "ဘပန",
    "nameEn": "BOKPYIN",
    "nameMm": "ဘုတ်ပြင်း"
  },
  {
    "stateCode": "6",
    "shortEn": "HTAWANA",
    "shortMm": "ထဝန",
    "nameEn": "DAWEI",
    "nameMm": "ထားဝယ်"
  },
  {
    "stateCode": "6",
    "shortEn": "KALAAH",
    "shortMm": "ကလအ",
    "nameEn": "KALEINAUNG",
    "nameMm": "ကလိန်အောင်"
  },
  {
    "stateCode": "6",
    "shortEn": "KASANA",
    "shortMm": "ကစန",
    "nameEn": "KYUNSU",
    "nameMm": "ကျွန်းစု"
  },
  {
    "stateCode": "6",
    "shortEn": "KATHANA",
    "shortMm": "ကသန",
    "nameEn": "KAWTHOUNG",
    "nameMm": "ကော့သောင်း"
  },
  {
    "stateCode": "6",
    "shortEn": "KAYAYA",
    "shortMm": "ကရရ",
    "nameEn": "KA RA THU RI",
    "nameMm": "ကရသူရိ"
  },
  {
    "stateCode": "6",
    "shortEn": "KHAMAKA",
    "shortMm": "ခမက",
    "nameEn": "KHAMAUKGYI",
    "nameMm": "ခမောက်ကြီး"
  },
  {
    "stateCode": "6",
    "shortEn": "LALANA",
    "shortMm": "လလန",
    "nameEn": "LOUNG LON",
    "nameMm": "လောင်းလုံး"
  },
  {
    "stateCode": "6",
    "shortEn": "MAAHNA",
    "shortMm": "မအန",
    "nameEn": "MYEIK A NOUT",
    "nameMm": "မြိတ်အနောက်"
  },
  {
    "stateCode": "6",
    "shortEn": "MAAHYA",
    "shortMm": "မအရ",
    "nameEn": "MYEIK A SHE",
    "nameMm": "မြိတ်အရှေ့"
  },
  {
    "stateCode": "6",
    "shortEn": "MAMANA",
    "shortMm": "မမန",
    "nameEn": "MYEIK",
    "nameMm": "မြိတ်"
  },
  {
    "stateCode": "6",
    "shortEn": "MATANA",
    "shortMm": "မတန",
    "nameEn": "MYIT TA",
    "nameMm": "မေတ္တာ"
  },
  {
    "stateCode": "6",
    "shortEn": "PAKAMA",
    "shortMm": "ပကမ",
    "nameEn": "PYIGYIMANDAING",
    "nameMm": "ပြည်ကြီးမဏ္ဍိုင်"
  },
  {
    "stateCode": "6",
    "shortEn": "PALANA",
    "shortMm": "ပလန",
    "nameEn": "PALAW",
    "nameMm": "ပုလော"
  },
  {
    "stateCode": "6",
    "shortEn": "PALATA",
    "shortMm": "ပလတ",
    "nameEn": "PALAUK",
    "nameMm": "ပလောက်"
  },
  {
    "stateCode": "6",
    "shortEn": "TANATHA",
    "shortMm": "တနသ",
    "nameEn": "TANINTHARYI",
    "nameMm": "တနင်္သာရီ"
  },
  {
    "stateCode": "6",
    "shortEn": "TATHAYA",
    "shortMm": "တသရ",
    "nameEn": "TANINTHARYI",
    "nameMm": "တနင်္သာရီ"
  },
  {
    "stateCode": "6",
    "shortEn": "THAYAKHA",
    "shortMm": "သရခ",
    "nameEn": "THAYETCHAUNG",
    "nameMm": "သရက်ချောင်း"
  },
  {
    "stateCode": "6",
    "shortEn": "YAPHANA",
    "shortMm": "ရဖန",
    "nameEn": "YEBYU",
    "nameMm": "ရေဖြူ"
  },
  {
    "stateCode": "7",
    "shortEn": "AHPHANA",
    "shortMm": "အဖန",
    "nameEn": "OKPHO",
    "nameMm": "အုတ်ဖို"
  },
  {
    "stateCode": "7",
    "shortEn": "AHTANA",
    "shortMm": "အတန",
    "nameEn": "OKTWIN",
    "nameMm": "အုတ်တွင်း"
  },
  {
    "stateCode": "7",
    "shortEn": "DAOUNA",
    "shortMm": "ဒဥန",
    "nameEn": "DAIK-U",
    "nameMm": "ဒိုက်ဦး"
  },
  {
    "stateCode": "7",
    "shortEn": "HTATAPA",
    "shortMm": "ထတပ",
    "nameEn": "HTANTABIN",
    "nameMm": "ထန်းတပင်"
  },
  {
    "stateCode": "7",
    "shortEn": "KAKANA",
    "shortMm": "ကကန",
    "nameEn": "KYAUKKYI",
    "nameMm": "ကျောက်ကြီး"
  },
  {
    "stateCode": "7",
    "shortEn": "KAPAKA",
    "shortMm": "ကပက",
    "nameEn": "GYOBINGAUK",
    "nameMm": "ကြို့ပင်ကောက်"
  },
  {
    "stateCode": "7",
    "shortEn": "KATAKHA",
    "shortMm": "ကတခ",
    "nameEn": "KYAUKTAGA",
    "nameMm": "ကျောက်တံခါး"
  },
  {
    "stateCode": "7",
    "shortEn": "KATATA",
    "shortMm": "ကတတ",
    "nameEn": "KAYTUMATI",
    "nameMm": "ကေတုမတီ"
  },
  {
    "stateCode": "7",
    "shortEn": "KAWANA",
    "shortMm": "ကဝန",
    "nameEn": "KAWA",
    "nameMm": "ကဝ"
  },
  {
    "stateCode": "7",
    "shortEn": "LAPATA",
    "shortMm": "လပတ",
    "nameEn": "LETPADAN",
    "nameMm": "လက်ပံတန်း"
  },
  {
    "stateCode": "7",
    "shortEn": "MADANA",
    "shortMm": "မဒန",
    "nameEn": "MADAUK",
    "nameMm": "မဒေါက်"
  },
  {
    "stateCode": "7",
    "shortEn": "MALANA",
    "shortMm": "မလန",
    "nameEn": "MINHLA",
    "nameMm": "မင်းလှ"
  },
  {
    "stateCode": "7",
    "shortEn": "MANYANA",
    "shortMm": "မညန",
    "nameEn": "MONYO",
    "nameMm": "မိုးညို"
  },
  {
    "stateCode": "7",
    "shortEn": "NATALA",
    "shortMm": "နတလ",
    "nameEn": "NATTALIN",
    "nameMm": "နတ်တလင်း"
  },
  {
    "stateCode": "7",
    "shortEn": "NYALAPA",
    "shortMm": "ညလပ",
    "nameEn": "NYAUNGLEBIN",
    "nameMm": "ညောင်လေးပင်"
  },
  {
    "stateCode": "7",
    "shortEn": "PAKHANA",
    "shortMm": "ပခန",
    "nameEn": "BAGO",
    "nameMm": "ပဲခူး"
  },
  {
    "stateCode": "7",
    "shortEn": "PAKHATA",
    "shortMm": "ပခတ",
    "nameEn": "PAUKKHAUNG",
    "nameMm": "ပေါက်ခေါင်း"
  },
  {
    "stateCode": "7",
    "shortEn": "PAMANA",
    "shortMm": "ပမန",
    "nameEn": "PYAY",
    "nameMm": "ပြည်"
  },
  {
    "stateCode": "7",
    "shortEn": "PANAKA",
    "shortMm": "ပနက",
    "nameEn": "PENWEGON",
    "nameMm": "ပဲနွယ်ကုန်း"
  },
  {
    "stateCode": "7",
    "shortEn": "PATALA",
    "shortMm": "ပတလ",
    "nameEn": "PAUNGDALE",
    "nameMm": "ပေါင်းတလည်"
  },
  {
    "stateCode": "7",
    "shortEn": "PATANA",
    "shortMm": "ပတန",
    "nameEn": "PADAUNG",
    "nameMm": "ပန်းတောင်း"
  },
  {
    "stateCode": "7",
    "shortEn": "PATASA",
    "shortMm": "ပတဆ",
    "nameEn": "PYUNTASA",
    "nameMm": "ပြွန်တန်ဆာ"
  },
  {
    "stateCode": "7",
    "shortEn": "PATATA",
    "shortMm": "ပတတ",
    "nameEn": "PAUNGDE",
    "nameMm": "ပေါင်းတည်"
  },
  {
    "stateCode": "7",
    "shortEn": "PHAMANA",
    "shortMm": "ဖမန",
    "nameEn": "PHYU",
    "nameMm": "ဖြူး"
  },
  {
    "stateCode": "7",
    "shortEn": "TANGANA",
    "shortMm": "တငန",
    "nameEn": "TAUNGOO",
    "nameMm": "တောင်ငူ"
  },
  {
    "stateCode": "7",
    "shortEn": "THAKANA",
    "shortMm": "သကန",
    "nameEn": "THEGON",
    "nameMm": "သဲကုန်း"
  },
  {
    "stateCode": "7",
    "shortEn": "THANAPA",
    "shortMm": "သနပ",
    "nameEn": "THANATPIN",
    "nameMm": "သနပ်ပင်"
  },
  {
    "stateCode": "7",
    "shortEn": "THASANA",
    "shortMm": "သဆန",
    "nameEn": "THONSE",
    "nameMm": "သုံးဆယ်"
  },
  {
    "stateCode": "7",
    "shortEn": "THAWATA",
    "shortMm": "သဝတ",
    "nameEn": "THAYARWADY",
    "nameMm": "သာယာဝတီ"
  },
  {
    "stateCode": "7",
    "shortEn": "WAMANA",
    "shortMm": "ဝမန",
    "nameEn": "WAW",
    "nameMm": "ဝေါ"
  },
  {
    "stateCode": "7",
    "shortEn": "YAKANA",
    "shortMm": "ရကန",
    "nameEn": "SHWEGYIN",
    "nameMm": "ရွှေကျင်"
  },
  {
    "stateCode": "7",
    "shortEn": "YATANA",
    "shortMm": "ရတန",
    "nameEn": "SHWEDAUNG",
    "nameMm": "ရွှေတောင်"
  },
  {
    "stateCode": "7",
    "shortEn": "YATAYA",
    "shortMm": "ရတရ",
    "nameEn": "YEDASHE",
    "nameMm": "ရေတာရှည်"
  },
  {
    "stateCode": "7",
    "shortEn": "ZAKANA",
    "shortMm": "ဇကန",
    "nameEn": "ZIGON",
    "nameMm": "ဇီးကုန်း"
  },
  {
    "stateCode": "8",
    "shortEn": "AHLANA",
    "shortMm": "အလန",
    "nameEn": "AUNGLAN",
    "nameMm": "အောင်လံ"
  },
  {
    "stateCode": "8",
    "shortEn": "GAGANA",
    "shortMm": "ဂဂန",
    "nameEn": "GANGAW",
    "nameMm": "ဂန့်ဂေါ"
  },
  {
    "stateCode": "8",
    "shortEn": "HTALANA",
    "shortMm": "ထလန",
    "nameEn": "TILIN",
    "nameMm": "ထီးလင်း"
  },
  {
    "stateCode": "8",
    "shortEn": "KAHTANA",
    "shortMm": "ကထန",
    "nameEn": "KYAUKHTU",
    "nameMm": "ကျောက်ထု"
  },
  {
    "stateCode": "8",
    "shortEn": "KAMANA",
    "shortMm": "ကမန",
    "nameEn": "KAMMA",
    "nameMm": "ကံမ"
  },
  {
    "stateCode": "8",
    "shortEn": "KHAMANA",
    "shortMm": "ခမန",
    "nameEn": "CHAUK",
    "nameMm": "ချောက်"
  },
  {
    "stateCode": "8",
    "shortEn": "MABANA",
    "shortMm": "မဘန",
    "nameEn": "MINBU",
    "nameMm": "မင်းဘူး"
  },
  {
    "stateCode": "8",
    "shortEn": "MAHTANA",
    "shortMm": "မထန",
    "nameEn": "MYAY HTAE",
    "nameMm": "မြေထဲ"
  },
  {
    "stateCode": "8",
    "shortEn": "MAKANA",
    "shortMm": "မကန",
    "nameEn": "MAGWAY",
    "nameMm": "မကွေး"
  },
  {
    "stateCode": "8",
    "shortEn": "MALANA",
    "shortMm": "မလန",
    "nameEn": "MINHLA",
    "nameMm": "မင်းလှ"
  },
  {
    "stateCode": "8",
    "shortEn": "MAMANA",
    "shortMm": "မမန",
    "nameEn": "MYAING",
    "nameMm": "မြိုင်"
  },
  {
    "stateCode": "8",
    "shortEn": "MATANA",
    "shortMm": "မတန",
    "nameEn": "MINDON",
    "nameMm": "မင်းတုန်း"
  },
  {
    "stateCode": "8",
    "shortEn": "MATHANA",
    "shortMm": "မသန",
    "nameEn": "MYOTHIT",
    "nameMm": "မြို့သစ်"
  },
  {
    "stateCode": "8",
    "shortEn": "NAMANA",
    "shortMm": "နမန",
    "nameEn": "NATMAUK",
    "nameMm": "နတ်မောက်"
  },
  {
    "stateCode": "8",
    "shortEn": "NGAPHANA",
    "shortMm": "ငဖန",
    "nameEn": "NGAPE",
    "nameMm": "ငဖဲ"
  },
  {
    "stateCode": "8",
    "shortEn": "PAKHAKA",
    "shortMm": "ပခက",
    "nameEn": "PAKOKKU",
    "nameMm": "ပခုက္ကူ"
  },
  {
    "stateCode": "8",
    "shortEn": "PAMANA",
    "shortMm": "ပမန",
    "nameEn": "PAUK",
    "nameMm": "ပေါက်"
  },
  {
    "stateCode": "8",
    "shortEn": "PAPHANA",
    "shortMm": "ပဖန",
    "nameEn": "PWINTBYU",
    "nameMm": "ပွင့်ဖြူ"
  },
  {
    "stateCode": "8",
    "shortEn": "SAKANA",
    "shortMm": "စကန",
    "nameEn": "SAKU",
    "nameMm": "စကု"
  },
  {
    "stateCode": "8",
    "shortEn": "SALANA",
    "shortMm": "စလန",
    "nameEn": "SALIN",
    "nameMm": "စလင်း"
  },
  {
    "stateCode": "8",
    "shortEn": "SAMANA",
    "shortMm": "ဆမန",
    "nameEn": "SAW",
    "nameMm": "ဆော"
  },
  {
    "stateCode": "8",
    "shortEn": "SAPAWA",
    "shortMm": "ဆပ၀",
    "nameEn": "SINBAUNGWE",
    "nameMm": "ဆင်ပေါင်ဝဲ"
  },
  {
    "stateCode": "8",
    "shortEn": "SAPHANA",
    "shortMm": "ဆဖန",
    "nameEn": "SEIKPHYU",
    "nameMm": "ဆိပ်ဖြူ"
  },
  {
    "stateCode": "8",
    "shortEn": "SATAYA",
    "shortMm": "စတရ",
    "nameEn": "SIDOKTAYA",
    "nameMm": "စေတုတ္တရာ"
  },
  {
    "stateCode": "8",
    "shortEn": "TATAKA",
    "shortMm": "တတက",
    "nameEn": "TAUNGDWINGYI",
    "nameMm": "တောင်တွင်းကြီး"
  },
  {
    "stateCode": "8",
    "shortEn": "THAYANA",
    "shortMm": "သရန",
    "nameEn": "THAYET",
    "nameMm": "သရက်"
  },
  {
    "stateCode": "8",
    "shortEn": "YAMANA",
    "shortMm": "ယမန",
    "nameEn": "YAW",
    "nameMm": "ယော"
  },
  {
    "stateCode": "8",
    "shortEn": "YANAKHA",
    "shortMm": "ရနခ",
    "nameEn": "YENANGYAUNG",
    "nameMm": "ရေနံချောင်း"
  },
  {
    "stateCode": "8",
    "shortEn": "YASAKA",
    "shortMm": "ရစက",
    "nameEn": "YESAGYO",
    "nameMm": "ရေစကြို"
  },
  {
    "stateCode": "9",
    "shortEn": "AHMAYA",
    "shortMm": "အမရ",
    "nameEn": "AMARAPURA",
    "nameMm": "အမရပူရ"
  },
  {
    "stateCode": "9",
    "shortEn": "AHMAZA",
    "shortMm": "အမဇ",
    "nameEn": "AUNGMYAYTHAZAN",
    "nameMm": "အောင်မြေသာဇံ"
  },
  {
    "stateCode": "9",
    "shortEn": "AUTATHA",
    "shortMm": "ဥတသ",
    "nameEn": "OKE TA RA THI RI",
    "nameMm": "ဥတ္တရသီရိ"
  },
  {
    "stateCode": "9",
    "shortEn": "BAGANA",
    "shortMm": "ဗဂန",
    "nameEn": "BAGAN",
    "nameMm": "ပုဂံ"
  },
  {
    "stateCode": "9",
    "shortEn": "DAKHATHA",
    "shortMm": "ဒခသ",
    "nameEn": "DET KHI NA THI RI",
    "nameMm": "ဒက္ခိဏသီရိ"
  },
  {
    "stateCode": "9",
    "shortEn": "KAMANA",
    "shortMm": "ကမန",
    "nameEn": "KU ME",
    "nameMm": "ကူမဲ"
  },
  {
    "stateCode": "9",
    "shortEn": "KAPATA",
    "shortMm": "ကပတ",
    "nameEn": "KYAUKPADAUNG",
    "nameMm": "ကျောက်ပန်းတောင်း"
  },
  {
    "stateCode": "9",
    "shortEn": "KASANA",
    "shortMm": "ကဆန",
    "nameEn": "KYAUKSE",
    "nameMm": "ကျောက်ဆည်"
  },
  {
    "stateCode": "9",
    "shortEn": "KHAAHZA",
    "shortMm": "ခအဇ",
    "nameEn": "CHANAYETHAZAN",
    "nameMm": "ချမ်းအေးသာဇံ"
  },
  {
    "stateCode": "9",
    "shortEn": "KHAMASA",
    "shortMm": "ခမစ",
    "nameEn": "CHAN MYA THAR ZI",
    "nameMm": "ချမ်းမြသာစည်"
  },
  {
    "stateCode": "9",
    "shortEn": "LAWANA",
    "shortMm": "လဝန",
    "nameEn": "LEWE",
    "nameMm": "လယ်ဝေး"
  },
  {
    "stateCode": "9",
    "shortEn": "MAHAMA",
    "shortMm": "မဟမ",
    "nameEn": "MAHAAUNGMYAY",
    "nameMm": "မဟာအောင်မြေ"
  },
  {
    "stateCode": "9",
    "shortEn": "MAHTALA",
    "shortMm": "မထလ",
    "nameEn": "MEIKTILA",
    "nameMm": "မိတ္ထီလာ"
  },
  {
    "stateCode": "9",
    "shortEn": "MAKANA",
    "shortMm": "မကန",
    "nameEn": "MOGOKE",
    "nameMm": "မိုးကုတ်"
  },
  {
    "stateCode": "9",
    "shortEn": "MAKHANA",
    "shortMm": "မခန",
    "nameEn": "MYINGYAN",
    "nameMm": "မြင်းခြံ"
  },
  {
    "stateCode": "9",
    "shortEn": "MALANA",
    "shortMm": "မလန",
    "nameEn": "MAHLAING",
    "nameMm": "မလှိုင်"
  },
  {
    "stateCode": "9",
    "shortEn": "MAMANA",
    "shortMm": "မမန",
    "nameEn": "MAY MYO",
    "nameMm": "မေမြို့"
  },
  {
    "stateCode": "9",
    "shortEn": "MANAMA",
    "shortMm": "မနမ",
    "nameEn": "MANN NAUK MYAUK",
    "nameMm": "မန်းနောက်မြောက်"
  },
  {
    "stateCode": "9",
    "shortEn": "MANATA",
    "shortMm": "မနတ",
    "nameEn": "MANN NAUK TAUNG",
    "nameMm": "မန်းနောက်တောင်"
  },
  {
    "stateCode": "9",
    "shortEn": "MATAYA",
    "shortMm": "မတရ",
    "nameEn": "MADAYA",
    "nameMm": "မတ္တရာ"
  },
  {
    "stateCode": "9",
    "shortEn": "MATHANA",
    "shortMm": "မသန",
    "nameEn": "MYITTHA",
    "nameMm": "မြစ်သား"
  },
  {
    "stateCode": "9",
    "shortEn": "MAYAMA",
    "shortMm": "မရမ",
    "nameEn": "MANN SHAE MYAUK",
    "nameMm": "မန်းရှေ့မြောက်"
  },
  {
    "stateCode": "9",
    "shortEn": "MAYATA",
    "shortMm": "မရတ",
    "nameEn": "MANN SHAE TAUNG",
    "nameMm": "မန်းရှေ့တောင်"
  },
  {
    "stateCode": "9",
    "shortEn": "NAHTAKA",
    "shortMm": "နထက",
    "nameEn": "NATOGYI",
    "nameMm": "နွားထိုးကြီး"
  },
  {
    "stateCode": "9",
    "shortEn": "NGATHAYA",
    "shortMm": "ငသရ",
    "nameEn": "NGA THA YAUK",
    "nameMm": "ငါ့သရောက်"
  },
  {
    "stateCode": "9",
    "shortEn": "NGAZANA",
    "shortMm": "ငဇန",
    "nameEn": "NGAZUN",
    "nameMm": "ငါန်းဇွန်"
  },
  {
    "stateCode": "9",
    "shortEn": "NYAOUNA",
    "shortMm": "ညဥန",
    "nameEn": "NYAUNG-U",
    "nameMm": "ညောင်ဦး"
  },
  {
    "stateCode": "9",
    "shortEn": "PABANA",
    "shortMm": "ပဘန",
    "nameEn": "PYAWBWE",
    "nameMm": "ပျော်ဘွယ်"
  },
  {
    "stateCode": "9",
    "shortEn": "PABATHA",
    "shortMm": "ပဗသ",
    "nameEn": "POKE BA THI RITOWN",
    "nameMm": "ပုဗ္ဗသီရိ"
  },
  {
    "stateCode": "9",
    "shortEn": "PAGANA",
    "shortMm": "ပဂန",
    "nameEn": "BAGAN",
    "nameMm": "ပုဂံ"
  },
  {
    "stateCode": "9",
    "shortEn": "PAKAKHA",
    "shortMm": "ပကခ",
    "nameEn": "PYIGYITAGON",
    "nameMm": "ပြည်ကြီးတံခွန်"
  },
  {
    "stateCode": "9",
    "shortEn": "PALANA",
    "shortMm": "ပလန",
    "nameEn": "PALEIK",
    "nameMm": "ပုလိပ်"
  },
  {
    "stateCode": "9",
    "shortEn": "PAMANA",
    "shortMm": "ပမန",
    "nameEn": "PYINMANA",
    "nameMm": "ပျဉ်းမနား"
  },
  {
    "stateCode": "9",
    "shortEn": "PAOULA",
    "shortMm": "ပဥလ",
    "nameEn": "PYIN OO LWIN",
    "nameMm": "ပြင်‌ဦးလွင်‌"
  },
  {
    "stateCode": "9",
    "shortEn": "PATHAKA",
    "shortMm": "ပသက",
    "nameEn": "PATHEINGYI",
    "nameMm": "ပုသိမ်ကြီး"
  },
  {
    "stateCode": "9",
    "shortEn": "SAKANA",
    "shortMm": "စကန",
    "nameEn": "SINGU",
    "nameMm": "စဉ့်ကူး"
  },
  {
    "stateCode": "9",
    "shortEn": "SAKATA",
    "shortMm": "စကတ",
    "nameEn": "SINTGAING",
    "nameMm": "စဉ့်ကိုင်"
  },
  {
    "stateCode": "9",
    "shortEn": "TAKANA",
    "shortMm": "တကန",
    "nameEn": "TATKON",
    "nameMm": "တပ်ကုန်း"
  },
  {
    "stateCode": "9",
    "shortEn": "TAKATA",
    "shortMm": "တကတ",
    "nameEn": "TAKAUNG",
    "nameMm": "တကောင်း"
  },
  {
    "stateCode": "9",
    "shortEn": "TATAOU",
    "shortMm": "တတဥ",
    "nameEn": "TADA-U",
    "nameMm": "တံတားဦး"
  },
  {
    "stateCode": "9",
    "shortEn": "TATHANA",
    "shortMm": "တသန",
    "nameEn": "TAUNGTHA",
    "nameMm": "တောင်သာ"
  },
  {
    "stateCode": "9",
    "shortEn": "THAPAKA",
    "shortMm": "သပက",
    "nameEn": "THABEIKKYIN",
    "nameMm": "သပိတ်ကျင်း"
  },
  {
    "stateCode": "9",
    "shortEn": "THASANA",
    "shortMm": "သစန",
    "nameEn": "THAZI",
    "nameMm": "သာစည်"
  },
  {
    "stateCode": "9",
    "shortEn": "WATANA",
    "shortMm": "ဝတန",
    "nameEn": "WUNDWIN",
    "nameMm": "ဝမ်းတွင်း"
  },
  {
    "stateCode": "9",
    "shortEn": "YAMATHA",
    "shortMm": "ရမသ",
    "nameEn": "YAMETHIN",
    "nameMm": "ရမည်းသင်း"
  },
  {
    "stateCode": "9",
    "shortEn": "ZABATHA",
    "shortMm": "ဇဗသ",
    "nameEn": "ZA BU THI RI",
    "nameMm": "ဇမ္ဗူသီရိ"
  },
  {
    "stateCode": "9",
    "shortEn": "ZAYATHA",
    "shortMm": "ဇယသ",
    "nameEn": "ZAY YAR THI RI",
    "nameMm": "ဇေယျာသီရိ"
  },
  {
    "stateCode": "9*",
    "shortEn": "AUTATHA",
    "shortMm": "ဥတသ",
    "nameEn": "OT TA RA THIRI",
    "nameMm": "ဥတ္တရသီရိ"
  },
  {
    "stateCode": "9*",
    "shortEn": "DAKHATHA",
    "shortMm": "ဒခသ",
    "nameEn": "DEK KHI NA THIRI",
    "nameMm": "ဒက္ခိဏသီရိ"
  },
  {
    "stateCode": "9*",
    "shortEn": "LAWANA",
    "shortMm": "လဝန",
    "nameEn": "LEWE",
    "nameMm": "လယ်ဝေး"
  },
  {
    "stateCode": "9*",
    "shortEn": "PABATHA",
    "shortMm": "ပဗသ",
    "nameEn": "POB BA THIRI",
    "nameMm": "ပုဗ္ဗသီရိ"
  },
  {
    "stateCode": "9*",
    "shortEn": "PAMANA",
    "shortMm": "ပမန",
    "nameEn": "PYIN MA NA",
    "nameMm": "ပျဉ်းမနား"
  },
  {
    "stateCode": "9*",
    "shortEn": "TAKANA",
    "shortMm": "တကန",
    "nameEn": "TATKON",
    "nameMm": "တပ်ကုန်း"
  },
  {
    "stateCode": "9*",
    "shortEn": "ZABATHA",
    "shortMm": "ဇဗသ",
    "nameEn": "ZA BU THIRI",
    "nameMm": "ဇမ္ဗူသီရိ"
  },
  {
    "stateCode": "9*",
    "shortEn": "ZAYATHA",
    "shortMm": "ဇယသ",
    "nameEn": "ZE YAR THIRI",
    "nameMm": "ဇေယျာသီရိ"
  },
  {
    "stateCode": "10",
    "shortEn": "BALANA",
    "shortMm": "ဘလန",
    "nameEn": "BI LIN",
    "nameMm": "ဘီးလင်း"
  },
  {
    "stateCode": "10",
    "shortEn": "KAHTANA",
    "shortMm": "ကထန",
    "nameEn": "KYAIKTO",
    "nameMm": "ကျိုက်ထို"
  },
  {
    "stateCode": "10",
    "shortEn": "KAKHAMA",
    "shortMm": "ကခမ",
    "nameEn": "KYAIK KHA MI",
    "nameMm": "ကျိုက္ခမီ"
  },
  {
    "stateCode": "10",
    "shortEn": "KAMAYA",
    "shortMm": "ကမရ",
    "nameEn": "KYAIKMARAW",
    "nameMm": "ကျိုက်မရော"
  },
  {
    "stateCode": "10",
    "shortEn": "KHASANA",
    "shortMm": "ခဆန",
    "nameEn": "CHAUNGZON",
    "nameMm": "ချောင်းဆုံ"
  },
  {
    "stateCode": "10",
    "shortEn": "KHAZANA",
    "shortMm": "ခဇန",
    "nameEn": "KHAWZAR",
    "nameMm": "ခေါဇာ"
  },
  {
    "stateCode": "10",
    "shortEn": "LAMANA",
    "shortMm": "လမန",
    "nameEn": "LAMAING",
    "nameMm": "လမိုင်း"
  },
  {
    "stateCode": "10",
    "shortEn": "MADANA",
    "shortMm": "မဒန",
    "nameEn": "MUDON",
    "nameMm": "မုဒုံ"
  },
  {
    "stateCode": "10",
    "shortEn": "MALAMA",
    "shortMm": "မလမ",
    "nameEn": "MAWLAMYINE",
    "nameMm": "မော်လမြိုင်"
  },
  {
    "stateCode": "10",
    "shortEn": "PAMANA",
    "shortMm": "ပမန",
    "nameEn": "PAUNG",
    "nameMm": "ပေါင်"
  },
  {
    "stateCode": "10",
    "shortEn": "THAHTANA",
    "shortMm": "သထန",
    "nameEn": "THATON",
    "nameMm": "သထုံ"
  },
  {
    "stateCode": "10",
    "shortEn": "THAPHAYA",
    "shortMm": "သဖရ",
    "nameEn": "THANBYUZAYAT",
    "nameMm": "သံဖြူဇရပ်"
  },
  {
    "stateCode": "10",
    "shortEn": "YAMANA",
    "shortMm": "ရမန",
    "nameEn": "YE",
    "nameMm": "ရေး"
  },
  {
    "stateCode": "11",
    "shortEn": "AHMANA",
    "shortMm": "အမန",
    "nameEn": "ANN",
    "nameMm": "အမ်း"
  },
  {
    "stateCode": "11",
    "shortEn": "BATHATA",
    "shortMm": "ဘသတ",
    "nameEn": "BUTHIDAUNG",
    "nameMm": "ဘူးသီးတောင်"
  },
  {
    "stateCode": "11",
    "shortEn": "GAMANA",
    "shortMm": "ဂမန",
    "nameEn": "GWA",
    "nameMm": "ဂွ"
  },
  {
    "stateCode": "11",
    "shortEn": "KAPHANA",
    "shortMm": "ကဖန",
    "nameEn": "KYAUKPYU",
    "nameMm": "ကျောက်ဖြူ"
  },
  {
    "stateCode": "11",
    "shortEn": "KATALA",
    "shortMm": "ကတလ",
    "nameEn": "KYEINTALI",
    "nameMm": "ကျိန္တလီ"
  },
  {
    "stateCode": "11",
    "shortEn": "KATANA",
    "shortMm": "ကတန",
    "nameEn": "KYAUKTAW",
    "nameMm": "ကျောက်တော်"
  },
  {
    "stateCode": "11",
    "shortEn": "MAAHNA",
    "shortMm": "မအန",
    "nameEn": "MUNAUNG",
    "nameMm": "မာန်အောင်"
  },
  {
    "stateCode": "11",
    "shortEn": "MAAHTA",
    "shortMm": "မအတ",
    "nameEn": "MA-EI",
    "nameMm": "မအီ"
  },
  {
    "stateCode": "11",
    "shortEn": "MAOUNA",
    "shortMm": "မဥန",
    "nameEn": "MRAUK-U",
    "nameMm": "မြောက်ဦး"
  },
  {
    "stateCode": "11",
    "shortEn": "MAPANA",
    "shortMm": "မပန",
    "nameEn": "MINBYA",
    "nameMm": "မင်းပြား"
  },
  {
    "stateCode": "11",
    "shortEn": "MAPATA",
    "shortMm": "မပတ",
    "nameEn": "MYEBON",
    "nameMm": "မြေပုံ"
  },
  {
    "stateCode": "11",
    "shortEn": "MATANA",
    "shortMm": "မတန",
    "nameEn": "MAUNG TAW",
    "nameMm": "မောင်းတော"
  },
  {
    "stateCode": "11",
    "shortEn": "PANAKA",
    "shortMm": "ပဏက",
    "nameEn": "PONNAGYUN",
    "nameMm": "ပုဏ္ဏားကျွန်း"
  },
  {
    "stateCode": "11",
    "shortEn": "PANATA",
    "shortMm": "ပဏတ",
    "nameEn": "PON NA GYUN",
    "nameMm": "ပုဏ္ဏားကျွန်း"
  },
  {
    "stateCode": "11",
    "shortEn": "PATANA",
    "shortMm": "ပတန",
    "nameEn": "PAUKTAW",
    "nameMm": "ပေါက်တော"
  },
  {
    "stateCode": "11",
    "shortEn": "SATANA",
    "shortMm": "စတန",
    "nameEn": "SITTWE",
    "nameMm": "စစ်တွေ"
  },
  {
    "stateCode": "11",
    "shortEn": "TAKANA",
    "shortMm": "တကန",
    "nameEn": "TOUNGUP",
    "nameMm": "တောင်ကုတ်"
  },
  {
    "stateCode": "11",
    "shortEn": "TAPAWA",
    "shortMm": "တပ၀",
    "nameEn": "TAUNG PYO",
    "nameMm": "တောင်ပြိုလက်ဝဲ"
  },
  {
    "stateCode": "11",
    "shortEn": "THATANA",
    "shortMm": "သတန",
    "nameEn": "THANDWE",
    "nameMm": "သံတွဲ"
  },
  {
    "stateCode": "11",
    "shortEn": "YABANA",
    "shortMm": "ရဗန",
    "nameEn": "RAMREE",
    "nameMm": "ရမ်းဗြဲ"
  },
  {
    "stateCode": "11",
    "shortEn": "YATHATA",
    "shortMm": "ရသတ",
    "nameEn": "RATHEDAUNG",
    "nameMm": "ရသေ့တောင်"
  },
  {
    "stateCode": "12",
    "shortEn": "AHLANA",
    "shortMm": "အလန",
    "nameEn": "AHLONE",
    "nameMm": "အလုံ"
  },
  {
    "stateCode": "12",
    "shortEn": "AHSANA",
    "shortMm": "အစန",
    "nameEn": "INSEIN",
    "nameMm": "အင်းစိန်"
  },
  {
    "stateCode": "12",
    "shortEn": "BAHANA",
    "shortMm": "ဗဟန",
    "nameEn": "BAHAN",
    "nameMm": "ဗဟန်း"
  },
  {
    "stateCode": "12",
    "shortEn": "BATAHTA",
    "shortMm": "ဗတထ",
    "nameEn": "BOTAHTAUNG",
    "nameMm": "ဗိုလ်တထောင်"
  },
  {
    "stateCode": "12",
    "shortEn": "DAGAMA",
    "shortMm": "ဒဂမ",
    "nameEn": "NORTH DAGON",
    "nameMm": "ဒဂုံမြို့သစ်(မြောက်ပိုင်း)"
  },
  {
    "stateCode": "12",
    "shortEn": "DAGANA",
    "shortMm": "ဒဂန",
    "nameEn": "DAGON",
    "nameMm": "ဒဂုံ"
  },
  {
    "stateCode": "12",
    "shortEn": "DAGASA",
    "shortMm": "ဒဂဆ",
    "nameEn": "DAGON MYOTHIT(SEIKKAN)",
    "nameMm": "ဒဂုံမြို့သစ် (ဆိပ်ကမ်း)"
  },
  {
    "stateCode": "12",
    "shortEn": "DAGATA",
    "shortMm": "ဒဂတ",
    "nameEn": "SOUTH DAGON",
    "nameMm": "ဒဂုံမြို့သစ်(တောင်ပိုင်း)"
  },
  {
    "stateCode": "12",
    "shortEn": "DAGAYA",
    "shortMm": "ဒဂရ",
    "nameEn": "DAGON MYOTHIT(EAST)",
    "nameMm": "ဒဂုံမြို့သစ် (အရှေ့ပိုင်း)"
  },
  {
    "stateCode": "12",
    "shortEn": "DALANA",
    "shortMm": "ဒလန",
    "nameEn": "DALA",
    "nameMm": "ဒလ"
  },
  {
    "stateCode": "12",
    "shortEn": "DAPANA",
    "shortMm": "ဒပန",
    "nameEn": "DAWBON",
    "nameMm": "ဒေါပုံ"
  },
  {
    "stateCode": "12",
    "shortEn": "DASAKA",
    "shortMm": "ဒဆက",
    "nameEn": "DAGON MYOTHIT (SEIKKAN)",
    "nameMm": "ဒဂုံမြို့သစ် (ဆိပ်ကမ်း)"
  },
  {
    "stateCode": "12",
    "shortEn": "HTATAPA",
    "shortMm": "ထတပ",
    "nameEn": "HTANTABIN",
    "nameMm": "ထန်းတပင်"
  },
  {
    "stateCode": "12",
    "shortEn": "KAKAKA",
    "shortMm": "ကကက",
    "nameEn": "COCOKYUN",
    "nameMm": "ကိုကိုးကျွန်း"
  },
  {
    "stateCode": "12",
    "shortEn": "KAKHAKA",
    "shortMm": "ကခက",
    "nameEn": "KUNGYANGON",
    "nameMm": "ကွမ်းခြံကုန်း"
  },
  {
    "stateCode": "12",
    "shortEn": "KAMANA",
    "shortMm": "ကမန",
    "nameEn": "KAWHMU",
    "nameMm": "ကော့မှူး"
  },
  {
    "stateCode": "12",
    "shortEn": "KAMATA",
    "shortMm": "ကမတ",
    "nameEn": "KYEEMYINDAING",
    "nameMm": "ကြည့်မြင်တိုင်"
  },
  {
    "stateCode": "12",
    "shortEn": "KAMAYA",
    "shortMm": "ကမရ",
    "nameEn": "KAMARYUT",
    "nameMm": "ကမာရွတ်"
  },
  {
    "stateCode": "12",
    "shortEn": "KATANA",
    "shortMm": "ကတန",
    "nameEn": "KYAUKTAN",
    "nameMm": "ကျောက်တန်း"
  },
  {
    "stateCode": "12",
    "shortEn": "KATATA",
    "shortMm": "ကတတ",
    "nameEn": "KYAUKTADA",
    "nameMm": "ကျောက်တံတား"
  },
  {
    "stateCode": "12",
    "shortEn": "KHAYANA",
    "shortMm": "ခရန",
    "nameEn": "KAYAN",
    "nameMm": "ခရမ်း"
  },
  {
    "stateCode": "12",
    "shortEn": "LAKANA",
    "shortMm": "လကန",
    "nameEn": "HLEGU",
    "nameMm": "လှည်းကူး"
  },
  {
    "stateCode": "12",
    "shortEn": "LAMANA",
    "shortMm": "လမန",
    "nameEn": "HLAING",
    "nameMm": "လှိုင်"
  },
  {
    "stateCode": "12",
    "shortEn": "LAMATA",
    "shortMm": "လမတ",
    "nameEn": "LANMADAW",
    "nameMm": "လမ်းမတော်"
  },
  {
    "stateCode": "12",
    "shortEn": "LATHANA",
    "shortMm": "လသန",
    "nameEn": "LATHA",
    "nameMm": "လသာ"
  },
  {
    "stateCode": "12",
    "shortEn": "LATHAYA",
    "shortMm": "လသယ",
    "nameEn": "HLAINGTHARYA",
    "nameMm": "လှိုင်သာယာ"
  },
  {
    "stateCode": "12",
    "shortEn": "MABANA",
    "shortMm": "မဘန",
    "nameEn": "HMAWBI",
    "nameMm": "မှော်ဘီ"
  },
  {
    "stateCode": "12",
    "shortEn": "MAGADA",
    "shortMm": "မဂဒ",
    "nameEn": "MINGALADON",
    "nameMm": "မင်္ဂလာဒုံ"
  },
  {
    "stateCode": "12",
    "shortEn": "MAGATA",
    "shortMm": "မဂတ",
    "nameEn": "MINGALA TAUNG NYUNT",
    "nameMm": "မင်္ဂလာတောင်ညွန့်"
  },
  {
    "stateCode": "12",
    "shortEn": "MAYAKA",
    "shortMm": "မရက",
    "nameEn": "MAYANGONE",
    "nameMm": "မရမ်းကုန်း"
  },
  {
    "stateCode": "12",
    "shortEn": "OUKAMA",
    "shortMm": "ဥကမ",
    "nameEn": "NORTH OKKALAPA",
    "nameMm": "မြောက်ဥက္ကလာပ"
  },
  {
    "stateCode": "12",
    "shortEn": "OUKATA",
    "shortMm": "ဥကတ",
    "nameEn": "SOUTH OKKALAPA",
    "nameMm": "တောင်ဥက္ကလာပ"
  },
  {
    "stateCode": "12",
    "shortEn": "PABATA",
    "shortMm": "ပဘတ",
    "nameEn": "PABEDAN",
    "nameMm": "ပန်းဘဲတန်း"
  },
  {
    "stateCode": "12",
    "shortEn": "PAZADA",
    "shortMm": "ပဇတ",
    "nameEn": "PAZUNDAUNG",
    "nameMm": "ပုဇွန်တောင်"
  },
  {
    "stateCode": "12",
    "shortEn": "PAZATA",
    "shortMm": "ပဇတ",
    "nameEn": "PAZUNDAUNG",
    "nameMm": "ပုဇွန်တောင်"
  },
  {
    "stateCode": "12",
    "shortEn": "SAKAKHA",
    "shortMm": "ဆကခ",
    "nameEn": "SEIKKYI/KHANAUNGTO",
    "nameMm": "ဆိပ်ကြီးခနောင်တို"
  },
  {
    "stateCode": "12",
    "shortEn": "SAKANA",
    "shortMm": "ဆကန",
    "nameEn": "SEIKKAN",
    "nameMm": "ဆိပ်ကမ်း"
  },
  {
    "stateCode": "12",
    "shortEn": "SAKHANA",
    "shortMm": "စခန",
    "nameEn": "SANCHAUNG",
    "nameMm": "စမ်းချောင်း"
  },
  {
    "stateCode": "12",
    "shortEn": "TAKANA",
    "shortMm": "တကန",
    "nameEn": "TAIKKYI",
    "nameMm": "တိုက်ကြီး"
  },
  {
    "stateCode": "12",
    "shortEn": "TAMANA",
    "shortMm": "တမန",
    "nameEn": "TAMWE",
    "nameMm": "တာမွေ"
  },
  {
    "stateCode": "12",
    "shortEn": "TATAHTA",
    "shortMm": "တတထ",
    "nameEn": "TADAR",
    "nameMm": "တံတား"
  },
  {
    "stateCode": "12",
    "shortEn": "TATANA",
    "shortMm": "တတန",
    "nameEn": "TWANTAY",
    "nameMm": "တွံတေး"
  },
  {
    "stateCode": "12",
    "shortEn": "THAGAKA",
    "shortMm": "သဃက",
    "nameEn": "THINGANGYUN",
    "nameMm": "သင်္ဃန်းကျွန်း"
  },
  {
    "stateCode": "12",
    "shortEn": "THAKATA",
    "shortMm": "သကတ",
    "nameEn": "THAKETA",
    "nameMm": "သာကေတ"
  },
  {
    "stateCode": "12",
    "shortEn": "THAKHANA",
    "shortMm": "သခန",
    "nameEn": "THONGWA",
    "nameMm": "သုံးခွ"
  },
  {
    "stateCode": "12",
    "shortEn": "THALANA",
    "shortMm": "သလန",
    "nameEn": "THANLYIN",
    "nameMm": "သန်လျင်"
  },
  {
    "stateCode": "12",
    "shortEn": "YAKANA",
    "shortMm": "ရကန",
    "nameEn": "YANKIN",
    "nameMm": "ရန်ကင်း"
  },
  {
    "stateCode": "12",
    "shortEn": "YAPAKA",
    "shortMm": "ရပက",
    "nameEn": "SHWE PAUK KAN",
    "nameMm": "ရွှေပေါက်ကံ"
  },
  {
    "stateCode": "12",
    "shortEn": "YAPATHA",
    "shortMm": "ရပသ",
    "nameEn": "SHWEPYITHAR",
    "nameMm": "ရွှေပြည်သာ"
  },
  {
    "stateCode": "13",
    "shortEn": "AHPANA",
    "shortMm": "အပန",
    "nameEn": "AUNGPAN",
    "nameMm": "အောင်ပန်း"
  },
  {
    "stateCode": "13",
    "shortEn": "AHTANA",
    "shortMm": "အတန",
    "nameEn": "IN DAW-SHAN",
    "nameMm": "အင်တော"
  },
  {
    "stateCode": "13",
    "shortEn": "AHTHAYA",
    "shortMm": "အသယ",
    "nameEn": "AYETHARYAR",
    "nameMm": "အေးသာယာ"
  },
  {
    "stateCode": "13",
    "shortEn": "HAHANA",
    "shortMm": "ဟဟန",
    "nameEn": "HE HOE",
    "nameMm": "ဟဲဟိုး"
  },
  {
    "stateCode": "13",
    "shortEn": "HAMANA",
    "shortMm": "ဟမန",
    "nameEn": "HOMEIN",
    "nameMm": "ဟိုမိန်း"
  },
  {
    "stateCode": "13",
    "shortEn": "HAPANA",
    "shortMm": "ဟပန",
    "nameEn": "HO PON",
    "nameMm": "ဟိုပုံး"
  },
  {
    "stateCode": "13",
    "shortEn": "HAPATA",
    "shortMm": "ဟပတ",
    "nameEn": "HOPANG",
    "nameMm": "ဟိုပန်"
  },
  {
    "stateCode": "13",
    "shortEn": "KAHANA",
    "shortMm": "ကဟန",
    "nameEn": "KUNHING",
    "nameMm": "ကွန်ဟိန်း"
  },
  {
    "stateCode": "13",
    "shortEn": "KAKANA",
    "shortMm": "ကကန",
    "nameEn": "KON GYAN",
    "nameMm": "ကုန်းကြမ်း"
  },
  {
    "stateCode": "13",
    "shortEn": "KAKHANA",
    "shortMm": "ကခန",
    "nameEn": "KUT KAI",
    "nameMm": "ကွတ်ခိုင်"
  },
  {
    "stateCode": "13",
    "shortEn": "KALADA",
    "shortMm": "ကလဒ",
    "nameEn": "KARLI",
    "nameMm": "ကာလိ"
  },
  {
    "stateCode": "13",
    "shortEn": "KALAHTA",
    "shortMm": "ကလထ",
    "nameEn": "KENGLAT",
    "nameMm": "ကျိုင်းလပ်"
  },
  {
    "stateCode": "13",
    "shortEn": "KALANA",
    "shortMm": "ကလန",
    "nameEn": "KA LAW",
    "nameMm": "ကလော"
  },
  {
    "stateCode": "13",
    "shortEn": "KALATA",
    "shortMm": "ကလတ",
    "nameEn": "KUNLONG",
    "nameMm": "ကွမ်းလုံ"
  },
  {
    "stateCode": "13",
    "shortEn": "KAMANA",
    "shortMm": "ကမန",
    "nameEn": "KYAUKME",
    "nameMm": "ကျောက်မဲ"
  },
  {
    "stateCode": "13",
    "shortEn": "KATALA",
    "shortMm": "ကတလ",
    "nameEn": "KYAUKTALONEGYI",
    "nameMm": "ကျောက်တလုံးကြီး"
  },
  {
    "stateCode": "13",
    "shortEn": "KATANA",
    "shortMm": "ကတန",
    "nameEn": "KENGTUNG",
    "nameMm": "ကျိုင်းတုံ"
  },
  {
    "stateCode": "13",
    "shortEn": "KATATA",
    "shortMm": "ကတတ",
    "nameEn": "KENGTAWNG",
    "nameMm": "ကျိုင်းတောင်း"
  },
  {
    "stateCode": "13",
    "shortEn": "KATHANA",
    "shortMm": "ကသန",
    "nameEn": "KEHSI",
    "nameMm": "ကျေးသီး"
  },
  {
    "stateCode": "13",
    "shortEn": "KHALANA",
    "shortMm": "ခလန",
    "nameEn": "KHO LAN",
    "nameMm": "ခိုလမ်"
  },
  {
    "stateCode": "13",
    "shortEn": "KHAYAHA",
    "shortMm": "ခရဟ",
    "nameEn": "CHINSHWEHAW",
    "nameMm": "ချင်းရွှေဟော်"
  },
  {
    "stateCode": "13",
    "shortEn": "LAKANA",
    "shortMm": "လကန",
    "nameEn": "LAUKKAING",
    "nameMm": "လောက်ကိုင်"
  },
  {
    "stateCode": "13",
    "shortEn": "LAKHANA",
    "shortMm": "လခန",
    "nameEn": "LAIHKA",
    "nameMm": "လဲချား"
  },
  {
    "stateCode": "13",
    "shortEn": "LAKHATA",
    "shortMm": "လခတ",
    "nameEn": "LIN KHE",
    "nameMm": "လင်းခေး"
  },
  {
    "stateCode": "13",
    "shortEn": "LALANA",
    "shortMm": "လလန",
    "nameEn": "LOILEN",
    "nameMm": "လွိုင်လင်"
  },
  {
    "stateCode": "13",
    "shortEn": "LAYANA",
    "shortMm": "လရန",
    "nameEn": "LASHIO",
    "nameMm": "လားရှိုး"
  },
  {
    "stateCode": "13",
    "shortEn": "MABANA",
    "shortMm": "မဘန",
    "nameEn": "MA BANE",
    "nameMm": "မဘိမ်း"
  },
  {
    "stateCode": "13",
    "shortEn": "MAHAYA",
    "shortMm": "မဟရ",
    "nameEn": "MAN HE RO",
    "nameMm": "မန်ဟျိုး (မန်ဟီးရိုး)"
  },
  {
    "stateCode": "13",
    "shortEn": "MAHTANA",
    "shortMm": "မထန",
    "nameEn": "MINE HTONE",
    "nameMm": "မုံးထ"
  },
  {
    "stateCode": "13",
    "shortEn": "MAHTATA",
    "shortMm": "မထတ",
    "nameEn": "MAW HTEIK",
    "nameMm": "မော်ထိုက်"
  },
  {
    "stateCode": "13",
    "shortEn": "MAKAHTA",
    "shortMm": "မကထ",
    "nameEn": "MANKAN",
    "nameMm": "မန်ကန်"
  },
  {
    "stateCode": "13",
    "shortEn": "MAKANA",
    "shortMm": "မကန",
    "nameEn": "MINE KOKE",
    "nameMm": "မိုင်းကာ"
  },
  {
    "stateCode": "13",
    "shortEn": "MAKATA",
    "shortMm": "မကတ",
    "nameEn": "MONEKOE",
    "nameMm": "မုန်းကိုး"
  },
  {
    "stateCode": "13",
    "shortEn": "MAKHANA",
    "shortMm": "မခန",
    "nameEn": "MINE KAT",
    "nameMm": "မိုင်းခတ်"
  },
  {
    "stateCode": "13",
    "shortEn": "MAKHATA",
    "shortMm": "မခတ",
    "nameEn": "MONGKHOKE",
    "nameMm": "မိုင်းခုတ်"
  },
  {
    "stateCode": "13",
    "shortEn": "MALANA",
    "shortMm": "မလန",
    "nameEn": "MONGLA",
    "nameMm": "မိုင်းလား"
  },
  {
    "stateCode": "13",
    "shortEn": "MALATA",
    "shortMm": "မလတ",
    "nameEn": "MONGLON",
    "nameMm": "မိုင်းလုံ"
  },
  {
    "stateCode": "13",
    "shortEn": "MAMAHTA",
    "shortMm": "မမထ",
    "nameEn": "MONG MAOE",
    "nameMm": "မိုင်းမော"
  },
  {
    "stateCode": "13",
    "shortEn": "MAMANA",
    "shortMm": "မမန",
    "nameEn": "MATMAN",
    "nameMm": "မက်မန်း"
  },
  {
    "stateCode": "13",
    "shortEn": "MAMANA",
    "shortMm": "မမန",
    "nameEn": "MAWKMAI",
    "nameMm": "မောက်မယ်"
  },
  {
    "stateCode": "13",
    "shortEn": "MAMATA",
    "shortMm": "မမတ",
    "nameEn": "MONGMIT",
    "nameMm": "မိုးမိတ်"
  },
  {
    "stateCode": "13",
    "shortEn": "MANANA",
    "shortMm": "မနန",
    "nameEn": "MONGNAI",
    "nameMm": "မိုးနဲ"
  },
  {
    "stateCode": "13",
    "shortEn": "MANATA",
    "shortMm": "မနန",
    "nameEn": "MONGNAWNG",
    "nameMm": "မိုင်းနောင်"
  },
  {
    "stateCode": "13",
    "shortEn": "MANGANA",
    "shortMm": "မငန",
    "nameEn": "MINE NGAW",
    "nameMm": "မိုင်းငေါ့"
  },
  {
    "stateCode": "13",
    "shortEn": "MAPAHTA",
    "shortMm": "မပထ",
    "nameEn": "MONG PAWK",
    "nameMm": "မိုင်းပေါက်"
  },
  {
    "stateCode": "13",
    "shortEn": "MAPANA",
    "shortMm": "မပန",
    "nameEn": "MONGPAN",
    "nameMm": "မိုင်းပန်"
  },
  {
    "stateCode": "13",
    "shortEn": "MAPATA",
    "shortMm": "မပတ",
    "nameEn": "MINE PYIN",
    "nameMm": "မိုင်းပျဉ်း"
  },
  {
    "stateCode": "13",
    "shortEn": "MAPHANA",
    "shortMm": "မဖန",
    "nameEn": "MONGHPYAK",
    "nameMm": "မိုင်းဖြတ်"
  },
  {
    "stateCode": "13",
    "shortEn": "MAPHATA",
    "shortMm": "မဖတ",
    "nameEn": "MANHPANT",
    "nameMm": "မန်ဖန့်"
  },
  {
    "stateCode": "13",
    "shortEn": "MARATA",
    "shortMm": "မရတ",
    "nameEn": "MONGYAI",
    "nameMm": "မိုင်းရယ်"
  },
  {
    "stateCode": "13",
    "shortEn": "MASANA",
    "shortMm": "မဆန",
    "nameEn": "MONGHSAT",
    "nameMm": "မိုင်းဆတ်"
  },
  {
    "stateCode": "13",
    "shortEn": "MASATA",
    "shortMm": "မစတ",
    "nameEn": "MINESAN-MONSAN",
    "nameMm": "မိုင်းစံ (မုန်းဆန်း)"
  },
  {
    "stateCode": "13",
    "shortEn": "MASATA",
    "shortMm": "မဆတ",
    "nameEn": "MUSE",
    "nameMm": "မူဆယ်"
  },
  {
    "stateCode": "13",
    "shortEn": "MATANA",
    "shortMm": "မတန",
    "nameEn": "MONGTON",
    "nameMm": "မိုင်းတုံ"
  },
  {
    "stateCode": "13",
    "shortEn": "MATATA",
    "shortMm": "မတတ",
    "nameEn": "MANTON",
    "nameMm": "မန်တုံ"
  },
  {
    "stateCode": "13",
    "shortEn": "MAYAHTA",
    "shortMm": "မယထ",
    "nameEn": "MONGYAWNG",
    "nameMm": "မိုင်းယောင်း"
  },
  {
    "stateCode": "13",
    "shortEn": "MAYANA",
    "shortMm": "မယန",
    "nameEn": "MINE YAN",
    "nameMm": "မိုင်းယန်း"
  },
  {
    "stateCode": "13",
    "shortEn": "MAYANA",
    "shortMm": "မရန",
    "nameEn": "MONGHSU",
    "nameMm": "မိုင်းရှူး"
  },
  {
    "stateCode": "13",
    "shortEn": "MAYANA",
    "shortMm": "မရန",
    "nameEn": "MONGYAI",
    "nameMm": "မိုင်းရယ်"
  },
  {
    "stateCode": "13",
    "shortEn": "MAYATA",
    "shortMm": "မယတ",
    "nameEn": "MONGYAWNG",
    "nameMm": "မိုင်းယောင်း"
  },
  {
    "stateCode": "13",
    "shortEn": "NAHSANA",
    "shortMm": "နဆန",
    "nameEn": "NAMHSAN",
    "nameMm": "နမ့်ဆန်"
  },
  {
    "stateCode": "13",
    "shortEn": "NAKHANA",
    "shortMm": "နခန",
    "nameEn": "NAM KHAM",
    "nameMm": "နမ့်ခမ်း"
  },
  {
    "stateCode": "13",
    "shortEn": "NAKHATA",
    "shortMm": "နခတ",
    "nameEn": "NAWNGHKIO",
    "nameMm": "နောင်ချို"
  },
  {
    "stateCode": "13",
    "shortEn": "NAMATA",
    "shortMm": "နမတ",
    "nameEn": "NAMTU",
    "nameMm": "နမ္မတူ"
  },
  {
    "stateCode": "13",
    "shortEn": "NAPHANA",
    "shortMm": "နဖန",
    "nameEn": "NA PHANG",
    "nameMm": "နားဖန်"
  },
  {
    "stateCode": "13",
    "shortEn": "NASANA",
    "shortMm": "နစန",
    "nameEn": "NANHSAM-SOUTH",
    "nameMm": "နမ့်စန်(တောင်)"
  },
  {
    "stateCode": "13",
    "shortEn": "NATAYA",
    "shortMm": "နတရ",
    "nameEn": "NAUNGTAYAR",
    "nameMm": "နောင်တရား"
  },
  {
    "stateCode": "13",
    "shortEn": "NYAYANA",
    "shortMm": "ညရန",
    "nameEn": "NYAUNGSHWE",
    "nameMm": "ညောင်ရွှေ"
  },
  {
    "stateCode": "13",
    "shortEn": "PALAHTA",
    "shortMm": "ပလထ",
    "nameEn": "PAN LON",
    "nameMm": "ပန်လုံ"
  },
  {
    "stateCode": "13",
    "shortEn": "PALANA",
    "shortMm": "ပလန",
    "nameEn": "PINLON",
    "nameMm": "ပင်လုံ"
  },
  {
    "stateCode": "13",
    "shortEn": "PALATA",
    "shortMm": "ပလတ",
    "nameEn": "PAN LON",
    "nameMm": "ပန်လုံ"
  },
  {
    "stateCode": "13",
    "shortEn": "PALATA",
    "shortMm": "ပလန",
    "nameEn": "PINLAUNG",
    "nameMm": "ပင်လောင်း"
  },
  {
    "stateCode": "13",
    "shortEn": "PAPAKA",
    "shortMm": "ပပက",
    "nameEn": "PON PAR KYIN",
    "nameMm": "ပုံပါကျင်"
  },
  {
    "stateCode": "13",
    "shortEn": "PASANA",
    "shortMm": "ပဆန",
    "nameEn": "PANSAN-PANKHAM",
    "nameMm": "ပန်ဆန်း (ပန်ခမ်း)"
  },
  {
    "stateCode": "13",
    "shortEn": "PASATA",
    "shortMm": "ပဆတ",
    "nameEn": "PANSAI(KYU KUTE)",
    "nameMm": "ပန်ဆိုင်း (ကြူကုတ်)"
  },
  {
    "stateCode": "13",
    "shortEn": "PATAYA",
    "shortMm": "ပတယ",
    "nameEn": "PINDAYA",
    "nameMm": "ပင်းတယ"
  },
  {
    "stateCode": "13",
    "shortEn": "PAWANA",
    "shortMm": "ပဝန",
    "nameEn": "PAN WINE",
    "nameMm": "ပန်ဝိုင်"
  },
  {
    "stateCode": "13",
    "shortEn": "PAYANA",
    "shortMm": "ပယန",
    "nameEn": "PANG YANG",
    "nameMm": "ပန်ယန်း"
  },
  {
    "stateCode": "13",
    "shortEn": "PHAKHANA",
    "shortMm": "ဖခန",
    "nameEn": "PEKON",
    "nameMm": "ဖယ်ခုံ"
  },
  {
    "stateCode": "13",
    "shortEn": "SASANA",
    "shortMm": "ဆဆန",
    "nameEn": "HSIHSENG",
    "nameMm": "ဆီဆိုင်"
  },
  {
    "stateCode": "13",
    "shortEn": "TAKANA",
    "shortMm": "တကန",
    "nameEn": "TAUNGGYI",
    "nameMm": "တောင်ကြီး"
  },
  {
    "stateCode": "13",
    "shortEn": "TAKHALA",
    "shortMm": "တခလ",
    "nameEn": "TACHILEIK",
    "nameMm": "တာချီလိတ်"
  },
  {
    "stateCode": "13",
    "shortEn": "TALANA",
    "shortMm": "တလန",
    "nameEn": "TARLAY",
    "nameMm": "တာလေ"
  },
  {
    "stateCode": "13",
    "shortEn": "TAMANYA",
    "shortMm": "တမည",
    "nameEn": "TARMOENYE",
    "nameMm": "တာမိုးညဲ"
  },
  {
    "stateCode": "13",
    "shortEn": "TATANA",
    "shortMm": "တတန",
    "nameEn": "TONE TAR",
    "nameMm": "တုံတာ"
  },
  {
    "stateCode": "13",
    "shortEn": "TAYANA",
    "shortMm": "တယန",
    "nameEn": "TANGYAN",
    "nameMm": "တန့်ယန်း"
  },
  {
    "stateCode": "13",
    "shortEn": "THANANA",
    "shortMm": "သနန",
    "nameEn": "HSENI",
    "nameMm": "သိန္နီ"
  },
  {
    "stateCode": "13",
    "shortEn": "THAPANA",
    "shortMm": "သပန",
    "nameEn": "HSIPAW",
    "nameMm": "သီပေါ"
  },
  {
    "stateCode": "13",
    "shortEn": "YANGANA",
    "shortMm": "ရငန",
    "nameEn": "YWANGAN",
    "nameMm": "ရွာငံ"
  },
  {
    "stateCode": "13",
    "shortEn": "YANYANA",
    "shortMm": "ရညန",
    "nameEn": "SHWENYAUNG",
    "nameMm": "ရွှေညောင်"
  },
  {
    "stateCode": "13",
    "shortEn": "YASANA",
    "shortMm": "ရစန",
    "nameEn": "YAT SAUK",
    "nameMm": "ရပ်စောက်"
  },
  {
    "stateCode": "14",
    "shortEn": "AHGAPA",
    "shortMm": "အဂပ",
    "nameEn": "INGAPU",
    "nameMm": "အင်္ဂပူ"
  },
  {
    "stateCode": "14",
    "shortEn": "AHMANA",
    "shortMm": "အမန",
    "nameEn": "EINME",
    "nameMm": "အိမ်မဲ"
  },
  {
    "stateCode": "14",
    "shortEn": "AHMATA",
    "shortMm": "အမတ",
    "nameEn": "AHMAR",
    "nameMm": "အမာ"
  },
  {
    "stateCode": "14",
    "shortEn": "BAKALA",
    "shortMm": "ဘကလ",
    "nameEn": "BOGALE",
    "nameMm": "ဘိုကလေး"
  },
  {
    "stateCode": "14",
    "shortEn": "DADAYA",
    "shortMm": "ဒဒရ",
    "nameEn": "DEDAYE",
    "nameMm": "ဒေးဒရဲ"
  },
  {
    "stateCode": "14",
    "shortEn": "DANAPHA",
    "shortMm": "ဓနဖ",
    "nameEn": "DANUBYU",
    "nameMm": "ဓနုဖြူ"
  },
  {
    "stateCode": "14",
    "shortEn": "HAKAKA",
    "shortMm": "ဟကက",
    "nameEn": "HAINGGYIKYUN",
    "nameMm": "ဟိုင်းကြီးကျွန်း"
  },
  {
    "stateCode": "14",
    "shortEn": "HATHATA",
    "shortMm": "ဟသတ",
    "nameEn": "HINTHADA",
    "nameMm": "ဟင်္သာတ"
  },
  {
    "stateCode": "14",
    "shortEn": "KAKAHTA",
    "shortMm": "ကကထ",
    "nameEn": "KANGYIDAUNT",
    "nameMm": "ကန်ကြီးထောင့်"
  },
  {
    "stateCode": "14",
    "shortEn": "KAKANA",
    "shortMm": "ကကန",
    "nameEn": "KYAUNGGON",
    "nameMm": "ကျောင်းကုန်း"
  },
  {
    "stateCode": "14",
    "shortEn": "KAKHANA",
    "shortMm": "ကခန",
    "nameEn": "KYANGIN",
    "nameMm": "ကြံခင်း"
  },
  {
    "stateCode": "14",
    "shortEn": "KALANA",
    "shortMm": "ကလန",
    "nameEn": "KYAIKLAT",
    "nameMm": "ကျိုက်လတ်"
  },
  {
    "stateCode": "14",
    "shortEn": "KAPANA",
    "shortMm": "ကပန",
    "nameEn": "KYONPYAW",
    "nameMm": "ကျုံပျော်"
  },
  {
    "stateCode": "14",
    "shortEn": "LAMANA",
    "shortMm": "လမန",
    "nameEn": "LEMYETHNA",
    "nameMm": "လေးမျက်နှာ"
  },
  {
    "stateCode": "14",
    "shortEn": "LAPATA",
    "shortMm": "လပတ",
    "nameEn": "LA BUT TA",
    "nameMm": "လပွတ္တာ"
  },
  {
    "stateCode": "14",
    "shortEn": "MAAHNA",
    "shortMm": "မအန",
    "nameEn": "MYANAUNG",
    "nameMm": "မြန်အောင်"
  },
  {
    "stateCode": "14",
    "shortEn": "MAAHPA",
    "shortMm": "မအပ",
    "nameEn": "MAUBIN",
    "nameMm": "မအူပင်"
  },
  {
    "stateCode": "14",
    "shortEn": "MAMAKA",
    "shortMm": "မမက",
    "nameEn": "MAWLAMYINEGYUN",
    "nameMm": "မော်လမြိုင်ကျွန်း"
  },
  {
    "stateCode": "14",
    "shortEn": "MAMANA",
    "shortMm": "မမန",
    "nameEn": "MYAUNGMYA",
    "nameMm": "မြောင်းမြ"
  },
  {
    "stateCode": "14",
    "shortEn": "NGAPATA",
    "shortMm": "ငပတ",
    "nameEn": "NGAPUDAW",
    "nameMm": "ငပုတော"
  },
  {
    "stateCode": "14",
    "shortEn": "NGASANA",
    "shortMm": "ငဆန",
    "nameEn": "NGWESAUNG",
    "nameMm": "ငွေဆောင်"
  },
  {
    "stateCode": "14",
    "shortEn": "NGATHAKHA",
    "shortMm": "ငသခ",
    "nameEn": "NGA THAING CHAUNG",
    "nameMm": "ငသိုင်းချောင်း"
  },
  {
    "stateCode": "14",
    "shortEn": "NGAYAKA",
    "shortMm": "ငရက",
    "nameEn": "NGAYOKEKAUNG",
    "nameMm": "ငရုတ်ကောင်း"
  },
  {
    "stateCode": "14",
    "shortEn": "NYATANA",
    "shortMm": "ညတန",
    "nameEn": "NYAUNGDON",
    "nameMm": "ညောင်တုန်း"
  },
  {
    "stateCode": "14",
    "shortEn": "PASALA",
    "shortMm": "ပစလ",
    "nameEn": "PYINSALU",
    "nameMm": "ပြင်စလူ"
  },
  {
    "stateCode": "14",
    "shortEn": "PATANA",
    "shortMm": "ပတန",
    "nameEn": "PANTANAW",
    "nameMm": "ပန်းတနော်"
  },
  {
    "stateCode": "14",
    "shortEn": "PATHAAH",
    "shortMm": "ပသအ",
    "nameEn": "PA THEIN (WEST)",
    "nameMm": "ပုသိမ် (နောက်)"
  },
  {
    "stateCode": "14",
    "shortEn": "PATHANA",
    "shortMm": "ပသန",
    "nameEn": "PATHEIN (WEST)",
    "nameMm": "ပုသိမ် (နောက်)"
  },
  {
    "stateCode": "14",
    "shortEn": "PATHAYA",
    "shortMm": "ပသရ",
    "nameEn": "PATHEIN-EAST",
    "nameMm": "ပုသိမ် (ရှေ)"
  },
  {
    "stateCode": "14",
    "shortEn": "PHAPANA",
    "shortMm": "ဖပန",
    "nameEn": "PYAPON",
    "nameMm": "ဖျာပုံ"
  },
  {
    "stateCode": "14",
    "shortEn": "THAPANA",
    "shortMm": "သပန",
    "nameEn": "THABAUNG",
    "nameMm": "သာပေါင်း"
  },
  {
    "stateCode": "14",
    "shortEn": "WAKHAMA",
    "shortMm": "ဝခမ",
    "nameEn": "WAKEMA",
    "nameMm": "ဝါးခယ်မ"
  },
  {
    "stateCode": "14",
    "shortEn": "YAKANA",
    "shortMm": "ရကန",
    "nameEn": "YEGYI",
    "nameMm": "ရေကြည်"
  },
  {
    "stateCode": "14",
    "shortEn": "YATHAYA",
    "shortMm": "ယသရ",
    "nameEn": "SHWE THAUNG YAN",
    "nameMm": "ရွှေသောင်ယံ"
  },
  {
    "stateCode": "14",
    "shortEn": "ZALANA",
    "shortMm": "ဇလန",
    "nameEn": "ZALUN",
    "nameMm": "ဇလွန်"
  }
];

export function normalizeStateCode(code) {
    if (!code) return '';
    return String(code).replace(/[^0-9*]/g, '').trim();
}

export function getTownshipsByState(stateCode) {
    const norm = normalizeStateCode(stateCode);
    const list = !norm ? [...NRC_TOWNSHIPS] : NRC_TOWNSHIPS.filter(t => t.stateCode === norm);
    return list.sort((a, b) => a.shortEn.localeCompare(b.shortEn) || a.nameEn.localeCompare(b.nameEn));
}

export function findTownshipSuggestions(stateCode, query, limit = 0) {
    const normState = normalizeStateCode(stateCode);
    const q = String(query || '').trim().toUpperCase();
    const qRaw = String(query || '').trim();
    
    let pool = normState ? NRC_TOWNSHIPS.filter(t => t.stateCode === normState) : [...NRC_TOWNSHIPS];
    if (!q) {
        pool.sort((a, b) => a.shortEn.localeCompare(b.shortEn) || a.nameEn.localeCompare(b.nameEn));
        return limit ? pool.slice(0, limit) : pool;
    }

    const results = pool.filter(t => {
        return t.shortEn.startsWith(q) ||
               t.shortEn.includes(q) ||
               t.nameEn.toUpperCase().includes(q) ||
               t.nameMm.includes(qRaw) ||
               t.shortMm.includes(qRaw);
    });

    results.sort((a, b) => {
        const aStart = a.shortEn.startsWith(q) ? 0 : 1;
        const bStart = b.shortEn.startsWith(q) ? 0 : 1;
        if (aStart !== bStart) return aStart - bStart;
        const aMm = a.nameMm.startsWith(qRaw) ? 0 : 1;
        const bMm = b.nameMm.startsWith(qRaw) ? 0 : 1;
        if (aMm !== bMm) return aMm - bMm;
        return a.shortEn.localeCompare(b.shortEn) || a.nameEn.localeCompare(b.nameEn);
    });

    return limit ? results.slice(0, limit) : results;
}

function escapeHtmlAttr(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export function initNrcLookupService() {
    const stateSelect = document.getElementById('nrcLookupStateSelect');
    const searchInput = document.getElementById('nrcLookupSearchInput');
    const clearBtn = document.getElementById('nrcLookupClearBtn');
    const countBadge = document.getElementById('nrcLookupCountBadge');
    const container = document.getElementById('nrcLookupResultsContainer');

    if (!stateSelect || !container) return;

    function renderList() {
        const stateVal = stateSelect.value;
        const query = (searchInput.value || '').trim();

        if (clearBtn) {
            clearBtn.style.display = query ? 'inline-flex' : 'none';
        }

        let results = [];
        if (stateVal === 'all') {
            results = query ? findTownshipSuggestions(null, query, 0) : getTownshipsByState(null);
        } else {
            results = query ? findTownshipSuggestions(stateVal, query, 0) : getTownshipsByState(stateVal);
        }

        if (countBadge) {
            countBadge.textContent = `${results.length} မြို့နယ်`;
        }

        if (!results || results.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem 1rem; color: var(--text-secondary); background: var(--surface-soft); border-radius: 10px; border: 1px dashed var(--border-color);">
                    <i class="fa-solid fa-magnifying-glass" style="font-size: 1.25rem; margin-bottom: 0.4rem; opacity: 0.5;"></i>
                    <p style="margin: 0; font-size: 0.88rem;">ကိုက်ညီသော မြို့နယ် ရှာမတွေ့ပါ။ အခြားစာလုံး သို့မဟုတ် တိုင်း/ပြည်နယ် အားလုံးကို ရွေးချယ်ရှာဖွေကြည့်ပါ။</p>
                </div>
            `;
            return;
        }

        const statesMap = {};
        NRC_STATES.forEach(s => { statesMap[s.number] = s; });

        container.innerHTML = `
            <div class="nrc-table-scroll">
                <table class="nrc-list-table">
                    <thead>
                        <tr>
                            <th style="width: 44px; text-align: center;">#</th>
                            <th>NRC Code (EN)</th>
                            <th>မြန်မာကုဒ်</th>
                            <th>မြို့နယ်အမည် (Myanmar)</th>
                            <th>Township (English)</th>
                            <th>ပြည်နယ်/တိုင်း</th>
                            <th style="width: 84px; text-align: right;">Copy</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${results.map((t, index) => {
                            const stateObj = statesMap[t.stateCode] || { nameMm: '', numberMm: t.stateCode };
                            const fullNrcEn = `${t.stateCode}/${t.shortEn}(N)`;
                            const copyNrcEn = `${String(t.stateCode || '').replace(/\*/g, '')}/${t.shortEn}(N)`;
                            const fullNrcMm = `${stateObj.numberMm}/${t.shortMm}(နိုင်)`;
                            return `
                                <tr class="nrc-list-row" data-copy="${escapeHtmlAttr(copyNrcEn)}" title="Click to copy ${escapeHtmlAttr(copyNrcEn)}">
                                    <td class="nrc-col-idx">${index + 1}</td>
                                    <td><span class="nrc-list-code">${escapeHtmlAttr(fullNrcEn)}</span></td>
                                    <td class="nrc-col-mmcode">${escapeHtmlAttr(fullNrcMm)}</td>
                                    <td class="nrc-col-mmname"><strong>${escapeHtmlAttr(t.nameMm)}</strong></td>
                                    <td class="nrc-col-enname">${escapeHtmlAttr(t.nameEn)}</td>
                                    <td class="nrc-col-state">${escapeHtmlAttr(stateObj.nameMm || ('State ' + t.stateCode))}</td>
                                    <td style="text-align: right;">
                                        <button type="button" class="nrc-card-copy-btn" data-copy="${escapeHtmlAttr(copyNrcEn)}">
                                            <i class="fa-regular fa-copy"></i> <span>Copy</span>
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;

        container.querySelectorAll('.nrc-list-row').forEach(row => {
            row.addEventListener('click', () => {
                const textToCopy = row.dataset.copy;
                if (!textToCopy) return;

                const copySuccess = () => {
                    const btn = row.querySelector('.nrc-card-copy-btn span');
                    const icon = row.querySelector('.nrc-card-copy-btn i');
                    if (btn && icon) {
                        btn.textContent = 'Copied!';
                        icon.className = 'fa-solid fa-check';
                        setTimeout(() => {
                            btn.textContent = 'Copy';
                            icon.className = 'fa-regular fa-copy';
                        }, 1500);
                    }
                    if (typeof window.showToast === 'function') {
                        window.showToast(`Copied ${textToCopy} to clipboard`, 'success');
                    }
                };

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(textToCopy).then(copySuccess).catch(() => {
                        const input = document.createElement('input');
                        input.value = textToCopy;
                        document.body.appendChild(input);
                        input.select();
                        document.execCommand('copy');
                        document.body.removeChild(input);
                        copySuccess();
                    });
                } else {
                    const input = document.createElement('input');
                    input.value = textToCopy;
                    document.body.appendChild(input);
                    input.select();
                    document.execCommand('copy');
                    document.body.removeChild(input);
                    copySuccess();
                }
            });
        });
    }

    stateSelect.addEventListener('change', renderList);
    searchInput.addEventListener('input', renderList);
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            renderList();
            searchInput.focus();
        });
    }

    renderList();
}
