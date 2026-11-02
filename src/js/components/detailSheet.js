/* components/detailSheet.js — what the bottom sheet shows for one item (sketch Page 5, step 3):
   photo placeholder, name, the price pills, the board description (never `note`), and the add-ons
   for its category ("ask at the counter" — the boards print no add-on prices).
   Pure: item in, nodes out. Opening / closing lives in features/detailSheet.js. */
(function (SU) {
  'use strict';

  var D = window.MENU_DATA, META = window.MENU_META;

  /* Two numbers: one pill per size, labelled 1 / 2, the toggle's size marked.
     One number: a single pill (the same price on both sizes, so no size label).
     None: one "Ask at the counter" pill. Nothing here ever invents a price. */
  function pills(item) {
    var a = item.prices.size1, b = item.prices.size2;
    var hasA = typeof a === 'number', hasB = typeof b === 'number';
    function pill(label, text, current) {
      return SU.h('li', { 'class': 'su-detail-sheet__pill', 'data-current': String(!!current) }, [
        label ? SU.h('span', { 'class': 'su-detail-sheet__pill-size', text: label }) : null,
        SU.h('span', { 'class': 'su-detail-sheet__pill-price', text: text })
      ]);
    }
    var list;
    if (hasA && hasB) list = [
      pill(SU.t('sizeLabel') + ' ' + SU.t('size1'), SU.money(a), SU.state.size === 1),
      pill(SU.t('sizeLabel') + ' ' + SU.t('size2'), SU.money(b), SU.state.size === 2)
    ];
    else list = [pill(null, hasA || hasB ? SU.money(hasA ? a : b) : SU.t('priceAsk'), false)];
    return SU.h('ul', { 'class': 'su-detail-sheet__pills' }, list);
  }

  function addOns(item) {
    var group = (META.categories[item.category] || {}).addOns;
    var list = D.ADDONS.filter(function (a) { return a.group === group; });
    if (!list.length) return null;
    return SU.h('section', { 'class': 'su-detail-sheet__addons', 'aria-labelledby': 'detail-sheet-addons' }, [
      SU.h('h3', { 'class': 'su-detail-sheet__addons-title', id: 'detail-sheet-addons', text: SU.t('addOnsTitle') }),
      SU.h('ul', { 'class': 'su-detail-sheet__addon-list' }, list.map(function (a) {
        return SU.textEl('li', 'su-detail-sheet__addon', a.name);
      })),
      SU.h('p', { 'class': 'su-detail-sheet__addons-ask', text: SU.t('priceAsk') })
    ]);
  }

  SU.detailSheet = {
    render: function (item) {
      var cat = D.CATEGORIES.filter(function (c) { return c.id === item.category; })[0];
      return SU.h('div', { 'class': 'su-detail-sheet__panel', 'data-world': cat ? cat.world : '' }, [
        SU.h('div', { 'class': 'su-detail-sheet__grip', 'aria-hidden': 'true' }),
        SU.h('button', { type: 'button', 'class': 'su-detail-sheet__close', 'aria-label': SU.t('close') }, [
          SU.h('span', { 'aria-hidden': 'true', text: '✕' })
        ]),
        SU.h('div', { 'class': 'su-detail-sheet__photo' }, [
          SU.h('span', { 'class': 'su-detail-sheet__photo-label', text: SU.t('photoSoon') })
        ]),
        SU.h('div', { 'class': 'su-detail-sheet__body' }, [
          SU.h('h2', { 'class': 'su-detail-sheet__name', id: 'detail-sheet-name', lang: 'ar', dir: 'auto', text: item.name }),
          item.desc ? SU.textEl('p', 'su-detail-sheet__desc', item.desc) : null,
          pills(item),
          addOns(item)
        ])
      ]);
    }
  };
})(window.SU = window.SU || {});
