// ============================================================================
//  SHAKE UP — MENU DATA (single source of truth)
//  Source: the cafe's three menu boards, transcribed 16 Oct 2026.
//  Currency: Libyan dinars (LYD).
//  Loaded by index.html as a plain script; the last lines expose it as window.MENU_DATA.
//
//  HOW TO EDIT THIS FILE (the only rules you need):
//  1. PRICE CHANGE  -> find the item, change ONLY its price number.
//     Never touch anything else. The new price shows up everywhere at once
//     because the site reads from here and nowhere else.
//  2. NEW ITEM      -> copy any item block inside the right category section,
//     paste it at the end of that section, give it a NEW id that no other
//     item uses, and set its name and prices. Done. Nothing else to update.
//  3. REMOVE ITEM   -> delete its whole block (from { to },). Nothing else
//     breaks, because nothing else references items by position.
//  4. NEVER reuse an id. Ids are permanent labels: if an item is removed,
//     its id retires with it. This keeps favorites and links from ever
//     pointing at the wrong product later.
//  5. A price of null means "no price on the board" — do NOT invent one.
//     Ask the cafe first, then replace null with the real number.
//  6. Order inside a category = order on the site. To move an item, move
//     its whole block up or down inside its section.
//
//  WHAT THE FIELDS MEAN:
//  - id:       a permanent, unique label (never shown to customers).
//              Format: <category>-<name>, so ids can never collide even
//              when two categories have the same flavor (e.g. مارس exists
//              as both a cold shake and a hot shake).
//  - category: which CATEGORIES entry this item belongs to.
//  - name:     the exact name from the board, shown to customers.
//  - prices:   size1 = first price column on the board,
//              size2 = second price column on the board.
//              We do NOT call them small/large yet — the boards show two
//              cup icons with no labels, and which is which is unconfirmed.
//              Do not rename them until the cafe confirms.
//  - desc:     only present when the board itself prints a description.
//  - note:     only present for open questions (missing price, unclear text).
//  - ADDONS have price: null because no add-on prices appear on the boards.
//
//  WHAT IS DELIBERATELY NOT IN THIS FILE:
//  - No featured picks, no colors, no layout. Those live in the site code.
//    Editing this file can never break the design, and editing the design
//    can never corrupt a price.
// ============================================================================

const CURRENCY = "د.ل";

// --- Worlds: the three top-level tabs ---------------------------------------
const WORLDS = [
  { id: "shakes", name: "شيكات" },
  { id: "drinks", name: "مشروبات" },
  { id: "desserts", name: "حلويات" },
];

// --- Categories: each belongs to exactly one world --------------------------
const CATEGORIES = [
  { id: "choc", world: "shakes", name: "ميلك شيك شوكولاطة" },
  { id: "nut", world: "shakes", name: "ميلك شيك مكسرات" },
  { id: "fruit", world: "shakes", name: "ميلك شيك فواكه" },
  { id: "mix", world: "shakes", name: "مكسيات" },
  { id: "hot", world: "shakes", name: "هوت شيك" },
  { id: "ref", world: "drinks", name: "ريفريشر" },
  { id: "ice", world: "drinks", name: "آيس كوفي" },
  { id: "cloud", world: "drinks", name: "كلاود فوم كوفي" },
  { id: "matcha", world: "drinks", name: "ماتشا" },
  { id: "smo", world: "drinks", name: "سموزي" },
  { id: "chim", world: "desserts", name: "تشيمني كيك" },
  { id: "spec", world: "desserts", name: "سبيشل (تشيمني كيك)" },
  { id: "par", world: "desserts", name: "برادايس" },
  { id: "cake", world: "desserts", name: "كيكات" },
  { id: "scoop", world: "desserts", name: "سكوب كيك" },
  { id: "spot", world: "desserts", name: "بطاطا حلوة" },
];

// --- Items: 75 total. One block per product, grouped by category ------------
//     To add an item, copy a block inside its section and change id + name
//     + prices. To change a price, edit that one number only.
const ITEMS = [
  // ---- ميلك شيك شوكولاطة (16) ----
  { id: "choc-kinder-bueno", category: "choc", name: "كيندر بوينو", prices: { size1: 22, size2: 26 } },
  { id: "choc-nutella", category: "choc", name: "نوتيلا", prices: { size1: 23, size2: 27 } },
  { id: "choc-oreo", category: "choc", name: "أوريو", prices: { size1: 21, size2: 24 } },
  { id: "choc-snickers", category: "choc", name: "سنكريس", prices: { size1: 21, size2: 24 } },
  { id: "choc-mars", category: "choc", name: "مارس", prices: { size1: 21, size2: 24 } },
  { id: "choc-bounty", category: "choc", name: "باونتي", prices: { size1: 21, size2: 24 } },
  { id: "choc-toblerone", category: "choc", name: "توبلرون (بأنواعها)", prices: { size1: 22, size2: 25 } },
  { id: "choc-ferrero", category: "choc", name: "فيريرو", prices: { size1: 29, size2: 32 } },
  { id: "choc-raffaello", category: "choc", name: "رافاييلو ترونكي", prices: { size1: 22, size2: 27 } },
  { id: "choc-dobla", category: "choc", name: "دوبلة", prices: { size1: 26, size2: 29 } },
  { id: "choc-giardina", category: "choc", name: "جردينة (بأنواعها)", prices: { size1: 20, size2: 22 } },
  { id: "choc-cote-dor", category: "choc", name: "كوت دور", prices: { size1: 21, size2: 25 } },
  { id: "choc-kitkat", category: "choc", name: "كيت كات", prices: { size1: 18, size2: 22 } },
  { id: "choc-milka", category: "choc", name: "ميلكا (بأنواعها)", prices: { size1: 27, size2: 30 } },
  { id: "choc-mms", category: "choc", name: "إم أند إمز", prices: { size1: 21, size2: 24 } },
  { id: "choc-lotus", category: "choc", name: "لوتس", prices: { size1: 21, size2: 24 } },

  // ---- ميلك شيك مكسرات (2) ----
  { id: "nut-hazelnut-cream", category: "nut", name: "كريم بندق", prices: { size1: 21, size2: 23 } },
  { id: "nut-pistachio-cream", category: "nut", name: "كريم فستق (بيستاشيو)", prices: { size1: 23, size2: 25 } },

  // ---- ميلك شيك فواكه (4) ----
  { id: "fruit-banana", category: "fruit", name: "موز", prices: { size1: 16, size2: 18 } },
  { id: "fruit-strawberry", category: "fruit", name: "فراولة", prices: { size1: 19, size2: 22 } },
  { id: "fruit-mango", category: "fruit", name: "مانجا", prices: { size1: 20, size2: 22 } },
  { id: "fruit-peach", category: "fruit", name: "خوخ", prices: { size1: 22, size2: 25 } },

  // ---- مكسيات (10) ----
  { id: "mix-nutella-banana", category: "mix", name: "نوتيلا وموز", prices: { size1: 25, size2: null } },
  { id: "mix-mms-kinder", category: "mix", name: "إم أند إمز وكيندر", prices: { size1: 30, size2: 34 } },
  { id: "mix-nutella-snickers", category: "mix", name: "نوتيلا مع سنكريس", prices: { size1: 27, size2: 30 } },
  { id: "mix-napoli-dates", category: "mix", name: "نابولي مع تمر", prices: { size1: null, size2: null }, note: "لا يوجد سعر في اللوحة — اسأل الكافيه قبل عرض سعر" },
  { id: "mix-oreo-nutella", category: "mix", name: "أوريو مع نوتيلا", prices: { size1: 27, size2: 30 } },
  { id: "mix-bounty-lemon", category: "mix", name: "باونتي مع ليمون", prices: { size1: 23, size2: 26 } },
  { id: "mix-dobla-nutella", category: "mix", name: "دوبلة مع نوتيلا", prices: { size1: 32, size2: 35 } },
  { id: "mix-dobla-hazelnut", category: "mix", name: "دوبلة + كريم بندق", prices: { size1: 32, size2: 35 } },
  { id: "mix-safari", category: "mix", name: "سفاري شيك آب", prices: { size1: null, size2: 37 }, note: "الوصف في اللوحة غير واضح بالكامل — يذكر جوز هند ونوتيلا" },
  { id: "mix-super", category: "mix", name: "سوبر مكس", prices: { size1: null, size2: 52 }, note: "الوصف في اللوحة غير واضح بالكامل — يذكر كوت دور ونوتيلا" },

  // ---- كيكات (4) ----
  { id: "cake-cheesecake", category: "cake", name: "تشيز كيك", prices: { size1: 19, size2: 22 } },
  { id: "cake-brownies", category: "cake", name: "براونيز", prices: { size1: 26, size2: 30 } },
  { id: "cake-cinnamon", category: "cake", name: "سينابون", prices: { size1: 17, size2: 20 } },
  { id: "cake-tiramisu", category: "cake", name: "تيراميسو", prices: { size1: 17, size2: 20 } },

  // ---- هوت شيك (7) ----
  { id: "hot-mars", category: "hot", name: "مارس", prices: { size1: 16, size2: 22 } },
  { id: "hot-snickers", category: "hot", name: "سنكريس", prices: { size1: 16, size2: 22 } },
  { id: "hot-bounty", category: "hot", name: "باونتي", prices: { size1: 16, size2: 22 } },
  { id: "hot-cote-dor", category: "hot", name: "كوت دور", prices: { size1: 19, size2: 28 } },
  { id: "hot-toblerone", category: "hot", name: "توبلرون", prices: { size1: 14, size2: 23 } },
  { id: "hot-milka", category: "hot", name: "ميلكا", prices: { size1: 16, size2: 24 } },
  { id: "hot-brownies", category: "hot", name: "براونيز", prices: { size1: 19, size2: 28 } },

  // ---- ريفريشر (3) ----
  { id: "ref-peach", category: "ref", name: "خوخ", prices: { size1: 11 } },
  { id: "ref-grape-pomegranate", category: "ref", name: "عنب ورمان", prices: { size1: 11 } },
  { id: "ref-blueberry-pomegranate", category: "ref", name: "بلو بيري ورمان", prices: { size1: 20 } },

  // ---- آيس كوفي (1) ----
  { id: "ice-spanish-latte", category: "ice", name: "سبانيش لاتيه", prices: { size1: 16 } },

  // ---- كلاود فوم كوفي (4) ----
  { id: "cloud-caramel", category: "cloud", name: "كراميل", prices: { size1: 19 } },
  { id: "cloud-lotus", category: "cloud", name: "لوتس", prices: { size1: 19 } },
  { id: "cloud-pistachio", category: "cloud", name: "بيستاشيو", prices: { size1: 19 } },
  { id: "cloud-bubblegum", category: "cloud", name: "ببل قم", prices: { size1: 19 } },

  // ---- ماتشا (2) ----
  { id: "matcha-mango", category: "matcha", name: "ماتشا مانجا", prices: { size1: 25 } },
  { id: "matcha-strawberry", category: "matcha", name: "ماتشا فراولة", prices: { size1: 25 } },

  // ---- سموزي (6) ----
  { id: "smo-mix", category: "smo", name: "سموزي مكس", prices: { size1: 26 } },
  { id: "smo-sunrise", category: "smo", name: "SUNRISE", desc: "مانجا مع باشن فروت", prices: { size1: 19 } },
  { id: "smo-wild-free", category: "smo", name: "WILD & FREE", desc: "غلال الغابة", prices: { size1: 19 } },
  { id: "smo-sunshine", category: "smo", name: "SUNSHINE", desc: "مانجا مع أناناس", prices: { size1: 19 } },
  { id: "smo-pina-classic", category: "smo", name: "بيناكولادا كلاسيك", prices: { size1: 19 } },
  { id: "smo-pina-mango", category: "smo", name: "بيناكولادا مانجا", prices: { size1: 19 } },

  // ---- تشيمني كيك (6) ----
  { id: "chim-classic", category: "chim", name: "تشيمني كلاسيك", prices: { size1: 10 } },
  { id: "chim-pistachio-cream", category: "chim", name: "تشيمني كريم فستق", prices: { size1: 20 } },
  { id: "chim-nutella", category: "chim", name: "تشيمني مع نوتيلا", prices: { size1: 15 } },
  { id: "chim-lotus", category: "chim", name: "تشيمني مع لوتس", prices: { size1: 15 } },
  { id: "chim-hazelnut-cream", category: "chim", name: "تشيمني مع كريم البندق", prices: { size1: 15 } },
  { id: "chim-cheese-zaatar", category: "chim", name: "تشيمني مع جبنة وزعتر", prices: { size1: 15 } },

  // ---- برادايس (2) ----
  { id: "par-classic", category: "par", name: "برادايس كلاسيك", prices: { size1: 22, size2: 22 } },
  { id: "par-dubai", category: "par", name: "برادايس دبي", prices: { size1: 22, size2: 22 } },

  // ---- سبيشل (تشيمني كيك) (5) ----
  { id: "spec-brownies", category: "spec", name: "تشيمني براونيز", prices: { size1: 25 } },
  { id: "spec-dubai-cake", category: "spec", name: "تشيمني دبي كيك", prices: { size1: 25 } },
  { id: "spec-cheesecake-mango", category: "spec", name: "تشيمني تشيز كيك مانجا", prices: { size1: 17 } },
  { id: "spec-box", category: "spec", name: "تشيمني بوكس", desc: "5 قطع تشيمني كلاسيك مع 3 إضافات", prices: { size1: 60 } },
  { id: "spec-sandwich", category: "spec", name: "تشيمني ساندوتش", desc: "تشيمني محشوة مكسرات، مع اختيار إضافة: كريم بندق أو كريم فستق أو كراميل", prices: { size1: 30 } },

  // ---- بطاطا حلوة (2) ----
  { id: "spot-classic", category: "spot", name: "بطاطا حلوة كلاسيك", prices: { size1: 5 } },
  { id: "spot-lotus", category: "spot", name: "بطاطا لوتس", desc: "بطاطا حلوة، لوتس وكراميل ملح", prices: { size1: 18 } },

  // ---- سكوب كيك (1) ----
  { id: "scoop-cookies", category: "scoop", name: "كوكيز (موسي)", prices: { size1: 20 } },
];

// --- Add-ons: no prices appear for these on the boards ----------------------
//     price: null means "unconfirmed — ask the cafe before showing a price".
//     group "protein" = واي بروتين add-on; group "flavor" = إضافات مع النكهات.
const ADDONS = [
  { id: "addon-protein-vanilla", group: "protein", name: "واي بروتين فانيليا", price: null },
  { id: "addon-protein-strawberry", group: "protein", name: "واي بروتين فراولة", price: null },
  { id: "addon-protein-chocolate", group: "protein", name: "واي بروتين شوكولاطة", price: null },
  { id: "addon-yogurt", group: "flavor", name: "ياغورت", price: null },
  { id: "addon-marshmallow", group: "flavor", name: "مارشميلو", price: null },
  { id: "addon-nuts", group: "flavor", name: "مكسرات", price: null },
  { id: "addon-gelato", group: "flavor", name: "جيلاطي", price: null },
  { id: "addon-fruits", group: "flavor", name: "فواكه", price: null },
  { id: "addon-chocolate", group: "flavor", name: "شوكولاطة", price: null },
];

window.MENU_DATA = { CURRENCY, WORLDS, CATEGORIES, ITEMS, ADDONS };
