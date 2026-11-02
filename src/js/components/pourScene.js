/* components/pourScene.js — the words beside the pour (title + line) and the copy column's language.
   The video itself is plain markup in index.html; motion/videos.js plays it once. */
(function (SU) {
  'use strict';

  SU.pourScene = {
    render: function () {
      var copy = document.getElementById('pour-copy');
      copy.setAttribute('lang', SU.state.lang);
      copy.setAttribute('dir', SU.state.lang === 'ar' ? 'rtl' : 'ltr');
      SU.setText('pour-title', SU.t('pourTitle'));
      SU.setText('pour-line', SU.t('pourLine'));
    }
  };
})(window.SU = window.SU || {});
