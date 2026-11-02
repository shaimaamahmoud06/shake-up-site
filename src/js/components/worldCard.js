/* components/worldCard.js — the full-height intro card that opens each world, and the exit card
    that ends every world but the last. Everything on them is computed from
   data/menu-data.js: item counts, category line and the «تبدأ من» price. Nothing is typed by hand.
   The giant name stays Arabic in both languages (it is the art); the English kicker stays English. */
(function (SU) {
  'use strict';

  var D = window.MENU_DATA, META = window.MENU_META;

  /* Card media — the ONLY place these paths live (also listed in assets/MANIFEST.md).
     tone 'light' = cream photo: shown at its natural shape at the top, dark text below it.
     pending = the file the spec names but nobody has delivered yet (a labelled placeholder shows). */
  var MEDIA = {
    shakes:   { src: 'assets/img/shakes-strawberry.jpg' },                             // strawberry shake close-up (owner, 1 Nov)
    drinks:   null,                                                                   // by design: drip + coffee & matcha open this world (P10)
    desserts: { src: null, pending: 'desserts-intro-chimney.jpg' }                    // 1920×1280, not delivered yet
  };

  function categoriesOf(world) { return SU.categoriesOf(world.id); }
  function itemsOf(world) {
    var ids = categoriesOf(world).map(function (c) { return c.id; });
    return D.ITEMS.filter(function (i) { return ids.indexOf(i.category) !== -1; });
  }
  function media(world) {
    var m = MEDIA[world.id];
    if (!m) return null;
    if (m.src) return SU.h('img', { 'class': 'su-world-card__media', src: m.src, alt: '', decoding: 'async' });
    return SU.h('span', { 'class': 'su-world-card__pending', 'aria-hidden': 'true', text: 'photo pending · ' + m.pending });
  }

  /* The card is a still frame (box, colour, corners) holding one inner layer with everything in it.
     Only that inner layer ever moves (the settle-in, motion/settle.js); the frame never does. */
  function inner(kids) { return SU.h('div', { 'class': 'su-world-card__inner su-settle' }, kids); }

  SU.worldCard = {
    /* Intro card: chip on top, kicker / giant name / category line at the bottom. */
    intro: function (world) {
      var items = itemsOf(world), low = SU.lowestPrice(items), m = MEDIA[world.id];
      return SU.h('header', { 'class': 'su-world-card', 'data-world': world.id, 'data-tone': m && m.tone ? m.tone : 'dark' }, [inner([
        media(world),
        low === null ? null : SU.h('span', { 'class': 'su-world-card__chip', text: SU.t('startsFrom', { p: SU.money(low) }) }),
        SU.h('div', { 'class': 'su-world-card__foot' }, [
          SU.h('p', { 'class': 'su-world-card__kicker', lang: 'en', dir: 'ltr', text: META.worlds[world.id].en.toUpperCase() + ' · ' + items.length }),
          SU.h('h2', { 'class': 'su-world-card__name', lang: 'ar', dir: 'rtl', text: world.name }),
          SU.h('p', { 'class': 'su-world-card__cats', text: categoriesOf(world).map(SU.catName).join(' · ') })
        ])
      ])]);
    },

    /* Exit card: solid wash of this world's colour, pointing to the next world. */
    exit: function (world, next) {
      return SU.h('a', { 'class': 'su-world-card su-world-card--exit', 'href': '#world-' + next.id, 'data-world': world.id }, [inner([
        SU.h('span', { 'class': 'su-world-card__name', lang: 'ar', dir: 'rtl', text: next.name }),
        SU.h('span', { 'class': 'su-world-card__cats', text: SU.t('itemsN', { n: itemsOf(next).length }) })
      ])]);
    }
  };
})(window.SU = window.SU || {});
