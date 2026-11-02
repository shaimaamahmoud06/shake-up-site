/* main.js — starts the page. Draws the whole page from MENU_DATA (data/menu-data.js),
   MENU_META and STRINGS, then wires the controls. Load this script last.
   Skeleton: world tabs, categories, language switch, size toggle. No colour, no motion. */
(function (SU) {
  'use strict';

  /* Redrawing the menu must not lose the customer's place: stacks they opened stay open, and the row
     at the top of the screen stays where it was (Safari on iPhone does not do this by itself). */
  function placeBefore() {
    var line = document.getElementById('utility-bar').getBoundingClientRect().bottom;
    var rows = document.querySelectorAll('#menu [data-item], #menu .category');
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i].getBoundingClientRect();
      /* an item row is found inside its own section: a Fresh & Light row also exists in its home category */
      if (r.height && r.bottom > line) return { sel: rows[i].id ? '#' + rows[i].id : '#' + rows[i].closest('.category, .su-fresh').id + ' [data-item="' + rows[i].getAttribute('data-item') + '"]', top: r.top };
    }
    return null;
  }
  function openStacks() {
    return [].map.call(document.querySelectorAll('#menu details[open]'), function (d) { return d.closest('.category, .su-fresh').id; });
  }
  function restore(place, open) {
    open.forEach(function (id) { var d = document.querySelector('#' + id + ' details'); if (d) d.open = true; });
    var el = place && document.querySelector('#menu ' + place.sel);
    if (el) window.scrollBy(0, el.getBoundingClientRect().top - place.top);
  }

  /* The one render(): redraws everything from SU.state, keeping the customer's place. */
  SU.render = function () {
    var place = placeBefore(), open = openStacks();
    draw();
    restore(place, open);
  };

  function draw() {
    var html = document.documentElement;
    html.lang = SU.state.lang;
    html.dir = SU.state.lang === 'ar' ? 'rtl' : 'ltr';
    document.title = SU.t('brand') + ' — ' + SU.t('city');

    SU.topBar.render();
    SU.hero.render();
    SU.blob.render();
    SU.pourScene.render();
    SU.clock.render();
    SU.fork.render();
    SU.utilityBar.render();
    SU.menuWorld.render();
    SU.finaleVisit.render();
    SU.brandFooter.render();
    SU.stickers.render();
  }

  SU.language.init();
  SU.size.init();
  SU.detailSheetFeature.init();
  SU.search.init();
  SU.render();
  SU.ready = true;   // lets tests/verify.html tell "booted" from "a script failed"
})(window.SU = window.SU || {});
