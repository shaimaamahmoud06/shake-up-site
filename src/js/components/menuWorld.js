/* components/menuWorld.js — one world (shakes / drinks / desserts): its intro card, every category in
   it in the order of data/menu-data.js, then (except the last world) its exit card. A world may also
   carry its own scenes (EXTRA below). */
(function (SU) {
  'use strict';

  var D = window.MENU_DATA, META = window.MENU_META;

  /* World-specific scenes (sketch Pages 3–6): Shakes ends on the chocolate drip (its chocolate band
     was removed at the owner's request, 1 Nov 2026). Drinks opens with the coffee & matcha moment and
     has NO intro card of its own: Shakes' exit card «مشروبات» already announces it, and its
     coffee and matcha categories follow the scene directly (owner, 2 Nov 2026). After its categories
     comes the Fresh & Light scene (a collection, not a world: see freshLight.js). Drinks also has no
     exit card: the Desserts intro card follows it directly (owner, 2 Nov 2026). */
  var EXTRA = {
    shakes: { end: function () { return SU.drip.render(); } },
    drinks: { beforeIntro: function () { return SU.matchaScene.render(); }, noIntro: true, noExit: true, afterCategories: function () { return SU.freshLight.scene(); } }
  };

  function worldSection(world, n) {
    var x = EXTRA[world.id] || {};
    var sec = SU.h('section', { 'class': 'world', id: 'world-' + world.id, 'data-accent': META.worlds[world.id].accent }, [
      x.beforeIntro ? x.beforeIntro() : null,
      x.noIntro ? null : SU.worldCard.intro(world),
      x.afterIntro ? x.afterIntro() : null
    ]);
    SU.categoriesOf(world.id).forEach(function (cat) {
      var items = D.ITEMS.filter(function (i) { return i.category === cat.id; });
      if (!items.length) return;
      /* THE STAPLE, same for all 16 categories: header card, then the stacked flavour card. The Mixes
         header is the slot-machine reel (mixReel.js) instead of a photo card. */
      sec.appendChild(SU.h('section', { 'class': 'category', id: 'cat-' + cat.id }, [
        (cat.id === 'mix' ? SU.mixReel : SU.categoryHeader).render(cat, items),
        SU.flavorStack.render(items)
      ]));
    });
    if (x.afterCategories) sec.appendChild(x.afterCategories());
    var next = D.WORLDS[n + 1];
    if (next && !x.noExit) sec.appendChild(SU.worldCard.exit(world, next));
    if (x.end) sec.appendChild(x.end());
    return sec;
  }

  SU.menuWorld = {
    render: function () { SU.swap('menu', D.WORLDS.map(worldSection)); }
  };
})(window.SU = window.SU || {});
