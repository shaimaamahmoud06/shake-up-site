/* components/mixReel.js — the Mixes card: one slot-machine window in place of the photo card.
   Two vertical reels behind one payline: the left reel holds each mix's first flavour, the right reel
   its second. Both reels list all 10 mixes in data/menu-data.js order, so whatever row sits on the
   payline in both reels is one real mix; its name and price show under the window.
   This file draws the STILL look (the reels resting on a mix). motion/mixReel.js turns them.
   Category name, count and «تبدأ من» chip are the same computed labels as every other card. */
(function (SU) {
  'use strict';

  var COPIES = 4;   // each strip repeats the 10 mixes this often, so a turn never runs off its end
  var BASE = 1;     // the copy a resting reel sits in (one copy above it stays in reserve)

  /* A board name split into its two flavours, at «+», «مع» or the last «و». A name with none of these
     (سفاري شيك آب, سوبر مكس) splits after its first word. Words are only ever cut, never added. */
  function halves(name) {
    var m = name.match(/^(.+?)\s*(?:\+|\sمع\s)\s*(.+)$/) || name.match(/^(.+)\sو(.+)$/) || name.match(/^(\S+)\s(.+)$/);
    return m ? [m[1], m[2]] : [name, ''];
  }

  function strip(items, side) {
    var rows = [];
    for (var c = 0; c < COPIES; c++) {
      items.forEach(function (item) {
        rows.push(SU.h('li', { 'class': 'su-mix-reel__row', 'data-mix': item.id, text: halves(item.name)[side] }));
      });
    }
    return SU.h('ul', { 'class': 'su-mix-reel__strip', lang: 'ar' }, rows);
  }

  function reel(items, side) {
    return SU.h('div', { 'class': 'su-mix-reel__reel', 'data-reel': String(side + 1) }, [strip(items, side)]);
  }

  /* Put both reels at rest on mix i (0–9) and show its name and price. Used for the still look and by
     the motion layer once a turn has stopped. */
  function land(el, i) {
    var items = el.su_items;
    [].forEach.call(el.querySelectorAll('.su-mix-reel__strip'), function (s) { s.style.setProperty('--_pos', BASE * items.length + i); });
    el.querySelector('.su-mix-reel__name').textContent = items[i].name;
    el.querySelector('.su-mix-reel__price').textContent = SU.priceText(items[i]);
    el.setAttribute('data-at', String(i));
    SU.mixReel.at = i;
  }

  SU.mixReel = {
    at: 0,          // the mix last landed on: a redraw (language, size) keeps it
    BASE: BASE,
    land: land,
    render: function (cat, items) {
      var low = SU.lowestPrice(items);
      /* still frame + one inner layer (the only part the settle-in moves, motion/settle.js) */
      var el = SU.h('div', { 'class': 'su-mix-reel', 'data-world': cat.world }, [SU.h('div', { 'class': 'su-mix-reel__inner su-settle' }, [
        SU.h('div', { 'class': 'su-mix-reel__head' }, [
          SU.h('h3', { 'class': 'su-mix-reel__title', text: SU.catName(cat) }),
          SU.h('span', { 'class': 'su-mix-reel__count', text: SU.t('itemsN', { n: items.length }) }),
          low === null ? null : SU.h('span', { 'class': 'su-mix-reel__chip', text: SU.t('startsFrom', { p: SU.money(low) }) })
        ]),
        /* left reel = flavour 1 in both languages, as the owner asked */
        SU.h('div', { 'class': 'su-mix-reel__window', dir: 'ltr', 'aria-hidden': 'true' }, [
          reel(items, 0),
          reel(items, 1),
          SU.h('span', { 'class': 'su-mix-reel__payline' })
        ]),
        SU.h('p', { 'class': 'su-mix-reel__result' }, [
          SU.textEl('span', 'su-mix-reel__name', ''),
          SU.h('span', { 'class': 'su-mix-reel__price' })
        ])
      ])]);
      el.su_items = items;
      land(el, SU.mixReel.at < items.length ? SU.mixReel.at : 0);
      return el;
    }
  };
})(window.SU = window.SU || {});
