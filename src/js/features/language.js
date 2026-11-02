/* features/language.js — the language button flips Arabic <-> English and redraws. */
(function (SU) {
  'use strict';

  SU.language = {
    init: function () {
      document.getElementById('lang-btn').addEventListener('click', function () {
        SU.state.lang = SU.state.lang === 'ar' ? 'en' : 'ar';
        SU.saveState();
        SU.render();
      });
    }
  };
})(window.SU = window.SU || {});
