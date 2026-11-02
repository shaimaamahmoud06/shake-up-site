/* components/categoryHeader.js — THE STAPLE, part 1: one image card per category (never a photo per
   item): photo (placeholder until real), category name, item count, «تبدأ من» chip.
   Count and chip are computed from the category's items in data/menu-data.js. */
(function (SU) {
  'use strict';

  /* Category photos — the ONLY place these paths live (also listed in assets/MANIFEST.md).
     src = delivered, shown full-bleed behind the words; pending = named by the spec, not delivered yet:
     the header shows the «صورة قريبًا» placeholder until the file exists. */
  var PHOTOS = {
    choc:  { pending: 'choc.jpg' },
    fruit: { pending: 'fruit.jpg' },
    nut:   { pending: 'nut.jpg' },
    chim:  { src: 'assets/img/chim.webp' }   // chocolate-dipped chimney cake (owner, 1 Nov)
  };

  function photo(cat) {
    var p = PHOTOS[cat.id] || {};
    if (p.src) return SU.h('img', { 'class': 'su-category-header__img', src: p.src, alt: '', decoding: 'async', loading: 'lazy' });
    return SU.h('span', { 'class': 'su-category-header__photo', 'aria-hidden': 'true', 'data-asset-pending': p.pending || '', text: SU.t('photoSoon') });
  }

  SU.categoryHeader = {
    render: function (cat, items) {
      var low = SU.lowestPrice(items);
      var hasPhoto = !!(PHOTOS[cat.id] || {}).src;
      /* still frame + one inner layer (the only part the settle-in moves, motion/settle.js) */
      return SU.h('header', { 'class': 'su-category-header', 'data-world': cat.world, 'data-photo': String(hasPhoto) }, [SU.h('div', { 'class': 'su-category-header__inner su-settle' }, [
        photo(cat),
        low === null ? null : SU.h('span', { 'class': 'su-category-header__chip', text: SU.t('startsFrom', { p: SU.money(low) }) }),
        SU.h('div', { 'class': 'su-category-header__foot' }, [
          SU.h('h3', { 'class': 'su-category-header__name', text: SU.catName(cat) }),
          SU.h('span', { 'class': 'su-category-header__count', text: SU.t('itemsN', { n: items.length }) })
        ])
      ])]);
    }
  };
})(window.SU = window.SU || {});
