/* core/labels.js — display names. Worlds and categories have an English label in
   data/menu-meta.js. Item names (and branch names) are shown as the board prints
   them; the board has no English for items. */
(function (SU) {
  'use strict';

  var META = window.MENU_META;

  SU.worldName = function (w) { return SU.state.lang === 'ar' ? w.name : META.worlds[w.id].en; };
  SU.catName = function (c) { return SU.state.lang === 'ar' ? c.name : META.categories[c.id].en; };
  SU.branchName = function (b) { return b.name[SU.state.lang]; };

  /* A world's categories in the order they are shown: the world's `order` in menu-meta.js when it
     has one, else the boards' order in menu-data.js. */
  SU.categoriesOf = function (worldId) {
    var cats = window.MENU_DATA.CATEGORIES.filter(function (c) { return c.world === worldId; });
    var order = META.worlds[worldId].order;
    if (!order) return cats;
    return cats.slice().sort(function (a, b) { return order.indexOf(a.id) - order.indexOf(b.id); });
  };
})(window.SU = window.SU || {});
