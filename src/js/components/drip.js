/* components/drip.js — sketch Page 6: the melted-chocolate edge at the end of the Shakes world, the
   line the page "peels" off before Drinks. The owner's painted layer (assets/img/choc-drip.png),
   full width at its natural shape; cream shows below the drips. Decoration only. */
(function (SU) {
  'use strict';

  SU.drip = {
    render: function () {
      return SU.h('div', { 'class': 'su-drip', 'aria-hidden': 'true' }, [
        SU.h('img', { 'class': 'su-drip__art', src: 'assets/img/choc-drip.png', alt: '', width: '3240', height: '4050', decoding: 'async', loading: 'lazy' })
      ]);
    }
  };
})(window.SU = window.SU || {});
