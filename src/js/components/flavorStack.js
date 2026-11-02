/* components/flavorStack.js — THE STAPLE, part 2: the stacked flavour card (Apple-notification style).
   The front card shows the first 3 flavours in data order. When 2 or more more would be hidden, the
   edges of the cards behind peek out (pure CSS) and «+ N نكهة أخرى» opens ALL the rest in place.
   A native <details>: works without JS, never opens by itself. Same code for all 16 categories. */
(function (SU) {
  'use strict';

  var SHOWN = 3;   // rows on the front card

  function row(item) {
    return SU.h('li', { 'class': 'su-flavor-stack__row', 'data-item': item.id }, [
      SU.h('span', { 'class': 'su-flavor-stack__text' }, [
        SU.textEl('span', 'su-flavor-stack__name', item.name),
        item.desc ? SU.textEl('span', 'su-flavor-stack__desc', item.desc) : null
      ]),
      SU.h('span', { 'class': 'su-flavor-stack__price', text: SU.priceText(item) }),
      /* the whole row is the tap target for the detail sheet (features/detailSheet.js) */
      SU.h('button', { type: 'button', 'class': 'su-flavor-stack__tap', 'aria-haspopup': 'dialog', 'aria-label': item.name, lang: 'ar' })
    ]);
  }
  function rows(items) { return SU.h('ul', { 'class': 'su-flavor-stack__rows' }, items.map(row)); }

  SU.flavorStack = {
    render: function (items) {
      /* Collapse only when it hides 2+ flavours: a "+ 1" control isn't worth a tap. */
      var collapse = items.length - SHOWN >= 2;
      var shown = collapse ? items.slice(0, SHOWN) : items;
      var card = SU.h('div', { 'class': 'su-flavor-stack__card' }, [rows(shown)]);
      if (collapse) {
        var hidden = items.slice(SHOWN);
        card.appendChild(SU.h('details', { 'class': 'su-flavor-stack__more' }, [
          SU.h('summary', { 'class': 'su-flavor-stack__toggle' }, [
            SU.h('span', { 'class': 'su-flavor-stack__open', text: SU.t('moreFlavors', { n: hidden.length }) }),
            SU.h('span', { 'class': 'su-flavor-stack__close', text: SU.t('showLess') })
          ]),
          rows(hidden)
        ]));
      }
      /* wrapper (no background) = the two peeking cards behind; the white card sits in front */
      return SU.h('div', { 'class': 'su-flavor-stack', 'data-stacked': String(collapse) }, [card]);
    }
  };
})(window.SU = window.SU || {});
