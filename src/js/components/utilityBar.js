/* components/utilityBar.js — words and pressed-state of the size toggle, the search field and the
   language button, and the search results list. Clicking is wired in features/size.js,
   features/language.js and features/search.js. */
(function (SU) {
  'use strict';

  SU.utilityBar = {
    render: function () {
      SU.setText('lang-btn', SU.t('langButton'));
      document.getElementById('lang-btn').setAttribute('aria-label', SU.t('langName'));
      document.getElementById('lang-btn').setAttribute('lang', SU.state.lang === 'ar' ? 'en' : 'ar');   // it names the OTHER language
      SU.setText('size-label', SU.t('sizeLabel'));
      SU.setText('size-1', SU.t('size1'));
      SU.setText('size-2', SU.t('size2'));
      document.getElementById('size-1').setAttribute('aria-pressed', String(SU.state.size === 1));
      document.getElementById('size-2').setAttribute('aria-pressed', String(SU.state.size === 2));
      SU.setText('search-label', SU.t('searchLabel'));
      document.getElementById('search').setAttribute('placeholder', SU.t('searchPlaceholder'));
      if (SU.search) SU.search.refresh();   // open results follow the new size / language
    },

    /* The search results under the bar: a count, then one button per item (board name, category,
       price for the current size). Tapping one opens the detail sheet (features/search.js). */
    results: function (items, catOf) {
      var count = SU.h('p', { 'class': 'su-utility-bar__results-count', role: 'status',
        text: items.length ? SU.t('resultsN', { n: items.length }) : SU.t('noResults') });
      var list = SU.h('ul', { 'class': 'su-utility-bar__results-list' }, items.map(function (item) {
        var cat = catOf(item);
        return SU.h('li', {}, [
          SU.h('button', { type: 'button', 'class': 'su-utility-bar__result', 'data-result': item.id, 'aria-haspopup': 'dialog' }, [
            SU.h('span', { 'class': 'su-utility-bar__result-text' }, [
              SU.textEl('span', 'su-utility-bar__result-name', item.name),
              cat ? SU.h('span', { 'class': 'su-utility-bar__result-cat', text: SU.catName(cat) }) : null
            ]),
            SU.h('span', { 'class': 'su-utility-bar__result-price', text: SU.priceText(item) })
          ])
        ]);
      }));
      var frag = document.createDocumentFragment();
      frag.appendChild(count);
      frag.appendChild(list);
      return frag;
    }
  };
})(window.SU = window.SU || {});
