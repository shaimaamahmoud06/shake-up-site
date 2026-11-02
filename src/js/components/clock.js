/* components/clock.js — the clock's two tiny concept lines. The face is static SVG in index.html;
   its motion (if any) is in 90-motion.css. */
(function (SU) {
  'use strict';

  SU.clock = {
    render: function () {
      SU.setText('clock-line-1', SU.t('clockLine1'));
      SU.setText('clock-line-2', SU.t('clockLine2'));
    }
  };
})(window.SU = window.SU || {});
