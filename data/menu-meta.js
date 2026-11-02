/* menu-meta.js — site-layer facts that are NOT on the cafe's boards, keyed by the ids in menu-data.js.
   Nothing here is a price or an item. Editing it can never corrupt menu-data.js.
   - accent: colour family of a world (pink / teal / orange)
   - order: the order a world's categories are SHOWN in, when it differs from the boards' order
     (ids only; menu-data.js keeps the boards' order)
   - en: English label for worlds and categories (item names stay as the board prints them)
   - hero: item id shown on the big card (default = first item of the category)
   - addOns: which add-on group applies ('flavor' | 'protein' in ADDONS)
   - fresh: the Fresh & Light collection (spec 04, decision D6) — a LIST OF IDS, never copies of items.
     Every member stays in its home category too. The words «أخفّ وفريش» / "Fresh & Light" mean
     "lighter, fresher picks on this menu" — never "healthy" or "diet" (the boards give no recipes). */
window.MENU_META = {
  worlds: {
    shakes:   { accent: 'pink',   en: 'Shakes' },
    /* coffee & matcha straight under the «قهوة وماتشا» scene, then the rest (owner, 2 Nov 2026) */
    drinks:   { accent: 'teal',   en: 'Sips', order: ['ice', 'cloud', 'matcha', 'ref', 'smo'] },
    desserts: { accent: 'orange', en: 'Bites' }
  },

  categories: {
    choc:   { en: 'Chocolate milkshakes', hero: 'choc-kinder-bueno',         addOns: 'flavor' },
    nut:    { en: 'Nut milkshakes',       hero: 'nut-pistachio-cream',       addOns: 'flavor' },
    fruit:  { en: 'Fruit milkshakes',     hero: 'fruit-strawberry',          addOns: 'flavor' },
    mix:    { en: 'Mixes',                hero: 'mix-oreo-nutella',          addOns: 'flavor' },
    hot:    { en: 'Hot shakes',           hero: 'hot-brownies' },
    ref:    { en: 'Refreshers',           hero: 'ref-grape-pomegranate' },
    ice:    { en: 'Iced coffee' },
    cloud:  { en: 'Cloud foam coffee',    hero: 'cloud-pistachio' },
    matcha: { en: 'Matcha',               hero: 'matcha-strawberry' },
    smo:    { en: 'Smoothies',            hero: 'smo-sunrise',               addOns: 'protein' },
    chim:   { en: 'Chimney cake',         hero: 'chim-classic' },
    spec:   { en: 'Chehi specials',       hero: 'spec-brownies' },
    par:    { en: 'Paradise',             hero: 'par-classic' },
    cake:   { en: 'Cakes',                hero: 'cake-brownies' },
    scoop:  { en: 'Scoop cake' },
    spot:   { en: 'Sweet potato',         hero: 'spot-lotus' }
  },

  fresh: {
    items: [
      'ref-peach', 'ref-grape-pomegranate', 'ref-blueberry-pomegranate',
      'matcha-mango', 'matcha-strawberry',
      'smo-mix', 'smo-sunrise', 'smo-wild-free', 'smo-sunshine', 'smo-pina-classic', 'smo-pina-mango',
      'spot-classic'
    ],
    /* the unpriced add-ons strip: whey protein (all three) + yogurt + fruits, from ADDONS */
    addOns: ['addon-protein-vanilla', 'addon-protein-strawberry', 'addon-protein-chocolate', 'addon-yogurt', 'addon-fruits']
  },

  branches: [
    { id: 'jaraba',   name: { ar: 'جرابة',        en: 'Jaraba' },        map: 'https://www.google.com/maps/search/?api=1&query=Shake%20Up%20Jaraba%20Tripoli' },
    { id: 'ain-zara', name: { ar: 'عين زارة مول', en: 'Ain Zara Mall' }, map: 'https://www.google.com/maps/search/?api=1&query=Shake%20Up%20Ain%20Zara%20Mall%20Tripoli' }
  ],

  socials: [
    { id: 'instagram', label: 'Instagram', handle: '@shakeuply',         url: 'https://www.instagram.com/shakeuply/' },
    { id: 'facebook',  label: 'Facebook',  handle: 'Shake up | Tripoli', url: 'https://www.facebook.com/ShakeupLy/' }
  ]
};
