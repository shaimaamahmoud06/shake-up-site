/* features/detailSheet.js — opens the detail sheet from any flavour row and closes it again.
   The sheet is a native <dialog> in index.html, closed by default: if this script fails it simply
   never opens, so nothing is covered and the page never stops scrolling.
   Closes by: backdrop tap · swipe down · ✕ · Esc · any jump-link (#…) navigation.
   Focus goes back to the row that opened it. The page behind is locked only while it is open
   (CSS: html:has(.su-detail-sheet[open]) in detail-sheet.css). */
(function (SU) {
  'use strict';

  var D = window.MENU_DATA;
  var SWIPE_CLOSE = 0.2;   // swipe down further than 20% of the sheet's height = close
  var sheet, opener = null, startY = null;

  function itemById(id) { return D.ITEMS.filter(function (i) { return i.id === id; })[0]; }

  function open(item, from) {
    opener = from;
    sheet.textContent = '';
    sheet.appendChild(SU.detailSheet.render(item));
    sheet.scrollTop = 0;
    sheet.showModal();
  }
  function close() { if (sheet.open) sheet.close(); }

  SU.detailSheetFeature = {
    open: function (item, from) { if (sheet && sheet.showModal) open(item, from); },   // search results use this too
    init: function () {
      sheet = document.getElementById('detail-sheet');
      if (!sheet || !sheet.showModal) return;   // very old browser: rows simply do nothing

      /* any flavour row (rows are re-rendered, so listen once on the menu) */
      document.getElementById('menu').addEventListener('click', function (e) {
        var tap = e.target.closest('.su-flavor-stack__tap');
        var row = tap && tap.closest('[data-item]');
        var item = row && itemById(row.getAttribute('data-item'));
        if (item) open(item, tap);
      });

      /* ✕, and a tap on the backdrop (the panel fills the dialog, so a click ON the dialog = backdrop) */
      sheet.addEventListener('click', function (e) {
        if (e.target === sheet || e.target.closest('.su-detail-sheet__close')) close();
      });
      /* Esc is handled by <dialog> itself (it fires "close"). */
      sheet.addEventListener('close', function () {
        if (opener && opener.isConnected) opener.focus();
        opener = null;
      });

      /* swipe down — only when the sheet is scrolled to its top, so scrolling up inside it still works */
      sheet.addEventListener('touchstart', function (e) {
        startY = sheet.scrollTop <= 0 ? e.touches[0].clientY : null;
      }, { passive: true });
      sheet.addEventListener('touchend', function (e) {
        if (startY === null) return;
        var dy = e.changedTouches[0].clientY - startY;
        startY = null;
        if (dy > sheet.offsetHeight * SWIPE_CLOSE) close();
      }, { passive: true });

      /* a jump link (#footer, #world-shakes, back button to an #anchor…) closes it */
      window.addEventListener('hashchange', close);
    }
  };
})(window.SU = window.SU || {});
