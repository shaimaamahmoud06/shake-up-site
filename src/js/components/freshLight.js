/* components/freshLight.js — «أخفّ وفريش» / Fresh & Light: a collection that cuts across the worlds,
   NOT a fourth world. Its members are a list of ids in data/menu-meta.js (MENU_META.fresh); every row
   is the item itself from data/menu-data.js, so a price can only ever change in one place, and each
   item stays in its home category too.
   scene() is its own calm teal scene right after Smoothies (the last Drinks category), built with the
   staple (header card + stacked flavour card) plus an unpriced add-ons strip. (The owner removed the
   entry card at the top of the menu, 1 Nov.) Every row opens the normal detail sheet. Count and
   «تبدأ من» are computed from the data. */
(function (SU) {
  'use strict';

  var D = window.MENU_DATA, FRESH = window.MENU_META.fresh;

  function byId(list, id) { return list.filter(function (x) { return x.id === id; })[0]; }
  function items() { return FRESH.items.map(function (id) { return byId(D.ITEMS, id); }).filter(Boolean); }
  function chip(cls, its) {
    var low = SU.lowestPrice(its);
    return low === null ? null : SU.h('span', { 'class': cls, text: SU.t('startsFrom', { p: SU.money(low) }) });
  }

  SU.freshLight = {
    scene: function () {
      var its = items();
      var addOns = FRESH.addOns.map(function (id) { return byId(D.ADDONS, id); }).filter(Boolean);
      return SU.h('section', { 'class': 'su-fresh', id: 'fresh-light', 'aria-labelledby': 'fresh-light-name' }, [
        /* the staple's header card, without a photo */
        SU.h('header', { 'class': 'su-category-header su-fresh__header' }, [
          chip('su-category-header__chip', its),
          SU.h('div', { 'class': 'su-category-header__foot' }, [
            SU.h('h3', { 'class': 'su-category-header__name', id: 'fresh-light-name', text: SU.t('freshLabel') }),
            SU.h('span', { 'class': 'su-category-header__count', text: SU.t('itemsN', { n: its.length }) })
          ])
        ]),
        SU.flavorStack.render(its),
        SU.h('section', { 'class': 'su-fresh__addons', 'aria-labelledby': 'fresh-light-addons' }, [
          SU.h('h4', { 'class': 'su-fresh__addons-title', id: 'fresh-light-addons', text: SU.t('addOnsTitle') }),
          SU.h('ul', { 'class': 'su-fresh__addon-list' }, addOns.map(function (a) {
            return SU.textEl('li', 'su-fresh__addon', a.name);
          })),
          SU.h('p', { 'class': 'su-fresh__addons-ask', text: SU.t('priceAsk') })
        ])
      ]);
    }
  };
})(window.SU = window.SU || {});
