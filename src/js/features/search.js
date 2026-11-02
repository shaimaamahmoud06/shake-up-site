/* features/search.js — the search field in the utility bar. Searches ALL 75 items (also the ones
   folded away inside a stack) by board name, board description and category name (Arabic + English),
   plus the item's id words (choc-oreo → "oreo") so English spellings find Arabic board names without
   inventing an English name. Never searches `note`. Arabic is folded first (core/format.js); English
   is case-insensitive. Tapping a result opens the detail sheet. */
(function (SU) {
  'use strict';

  var D = window.MENU_DATA, META = window.MENU_META;
  var index = null, input, panel;

  function catOf(item) { return D.CATEGORIES.filter(function (c) { return c.id === item.category; })[0]; }

  function buildIndex() {
    index = D.ITEMS.map(function (item) {
      var cat = catOf(item), en = (META.categories[item.category] || {}).en || '';
      var name = item.name, rest = [item.desc || '', cat ? cat.name : '', en, item.id.replace(/-/g, ' ')].join(' ');
      return {
        item: item,
        name: SU.fold(name), all: SU.fold(name + ' ' + rest),
        nameLoose: SU.foldLoose(name), allLoose: SU.foldLoose(name + ' ' + rest)
      };
    });
  }

  /* Every word typed must appear. Name matches come first (starting with the word, then containing
     it), then matches elsewhere; inside each group the menu's own order. */
  function find(q) {
    function run(fold, nameKey, allKey) {
      var words = fold(q).split(' ').filter(Boolean);
      if (!words.length) return [];
      var hits = index.filter(function (e) {
        return words.every(function (w) { return e[allKey].indexOf(w) !== -1; });
      });
      function rank(e) {
        if (e[nameKey].indexOf(words[0]) === 0) return 0;
        return words.every(function (w) { return e[nameKey].indexOf(w) !== -1; }) ? 1 : 2;
      }
      return hits.map(function (e, n) { return { e: e, r: rank(e), n: n }; })
        .sort(function (a, b) { return a.r - b.r || a.n - b.n; })
        .map(function (x) { return x.e.item; });
    }
    var exact = run(SU.fold, 'name', 'all');
    return exact.length ? exact : run(SU.foldLoose, 'nameLoose', 'allLoose');
  }

  function show() {
    var q = input.value;
    if (!SU.fold(q)) { panel.hidden = true; panel.textContent = ''; return; }
    var found = find(q);
    panel.textContent = '';
    panel.appendChild(SU.utilityBar.results(found, catOf));
    panel.hidden = false;
  }

  SU.search = {
    find: function (q) { if (!index) buildIndex(); return find(q); },   // also used by tests/verify.html
    /* redraw the open results (prices / words) after a size or language switch */
    refresh: function () { if (input && !panel.hidden) show(); },
    init: function () {
      input = document.getElementById('search');
      panel = document.getElementById('search-results');
      buildIndex();
      input.addEventListener('input', show);
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { input.value = ''; show(); }
      });
      panel.addEventListener('click', function (e) {
        var b = e.target.closest('[data-result]');
        var item = b && D.ITEMS.filter(function (i) { return i.id === b.getAttribute('data-result'); })[0];
        if (item) SU.detailSheetFeature.open(item, b);
      });
    }
  };
})(window.SU = window.SU || {});
