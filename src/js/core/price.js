/* core/price.js — price text for the current size.
   Two numbers: the size toggle picks. One number: single size, same on both toggles.
   No number: "Ask at the counter". Nothing here ever invents a price. */
(function (SU) {
  'use strict';

  var D = window.MENU_DATA, STR = window.STRINGS;

  /* A number with the currency of the current language: "22 د.ل" / "22 LD". */
  SU.money = function (n) {
    return n + ' ' + (SU.state.lang === 'ar' ? D.CURRENCY : STR.currency.en);
  };

  /* The cheapest number on the board among `items`, either size — the «تبدأ من» value.
     null when nothing is priced. Always computed, never typed. */
  SU.lowestPrice = function (items) {
    var n = null;
    items.forEach(function (i) {
      ['size1', 'size2'].forEach(function (k) {
        var v = i.prices[k];
        if (typeof v === 'number' && (n === null || v < n)) n = v;
      });
    });
    return n;
  };

  SU.priceText = function (item) {
    var a = item.prices.size1, b = item.prices.size2;
    var hasA = typeof a === 'number', hasB = typeof b === 'number';
    if (!hasA && !hasB) return SU.t('priceAsk');
    return SU.money(hasA && hasB ? (SU.state.size === 1 ? a : b) : (hasA ? a : b));
  };
})(window.SU = window.SU || {});
