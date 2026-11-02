/* components/blob.js — the blob's only moving part is its words. The Arabic tagline is painted into
   the owner's artwork (assets/img/blob-tagline.png), so in Arabic the live line stays hidden (it would
   show the tagline twice) and the image's alt text carries it. In English the live English line shows. */
(function (SU) {
  'use strict';

  SU.blob = {
    render: function () {
      var p = document.getElementById('tagline');
      var en = SU.state.lang === 'en';
      p.hidden = !en;
      p.textContent = en ? SU.t('tagline') : '';
      p.setAttribute('lang', SU.state.lang);
      p.setAttribute('dir', en ? 'ltr' : 'rtl');
      document.getElementById('blob-art').setAttribute('alt', window.STRINGS.tagline.ar);
    }
  };
})(window.SU = window.SU || {});
