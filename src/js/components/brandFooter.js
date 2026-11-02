/* components/brandFooter.js — the outro, the last thing on the page: the page-2 blob's shape again
   (the owner's own painting), in the drinks turquoise with its orange splashes kept (owner, 2 Nov 2026),
   with the painted tagline «حياتك أكثر إبتهاجًا». Nothing is written over it (the name and city line
   was removed at the owner's request, 2 Nov 2026). The three stickers roam freely over it
   (brand-footer.css + 90-motion.css), clipped to the painting's box.
   The picture is assets/img/outro-blob.webp: blob-tagline.png's painting, pink recoloured to #50B1AF
   (--teal), orange and white untouched. The markup shell lives in index.html. */
(function (SU) {
  'use strict';

  var ART = 'assets/img/outro-blob.webp';   // the ONLY place this path lives (also in assets/MANIFEST.md)

  SU.brandFooter = {
    render: function () {
      SU.swap('footer', [
        SU.h('div', { 'class': 'su-brand-footer__art' }, [
          SU.h('img', { 'class': 'su-brand-footer__img', src: ART, alt: window.STRINGS.tagline.ar, lang: 'ar', width: '1527', height: '1366', decoding: 'async', loading: 'lazy' })
        ].concat(['cupcake', 'brain', 'car-guy'].map(function (n) {
          return SU.h('img', { 'class': 'su-brand-footer__sticker su-brand-footer__sticker--' + n, src: 'assets/img/stickers/sticker-' + n + '.webp',
            alt: '', 'aria-hidden': 'true', decoding: 'async', loading: 'lazy' });
        })))
      ]);
    }
  };
})(window.SU = window.SU || {});
