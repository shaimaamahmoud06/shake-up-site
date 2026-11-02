/* components/fork.js — words of the two fork rows. Where they lead is in the markup (index.html):
   «تصفح المنيو» → #world-shakes (the شيكات card once P06 builds it), «وين تلقانا؟» → #visit
   (the visit finale). */
(function (SU) {
  'use strict';

  SU.fork = {
    render: function () {
      document.getElementById('fork').setAttribute('aria-label', SU.t('forkLabel'));
      SU.setText('fork-find-text', SU.t('forkFind'));
      SU.setText('fork-menu-text', SU.t('forkMenu'));
    }
  };
})(window.SU = window.SU || {});
