/* features/size.js — the size toggle (1 / 2) picks which price column is shown. */
(function (SU) {
  'use strict';

  function pick(size) {
    return function () {
      SU.state.size = size;
      SU.saveState();
      SU.render();
    };
  }

  SU.size = {
    init: function () {
      document.getElementById('size-1').addEventListener('click', pick(1));
      document.getElementById('size-2').addEventListener('click', pick(2));
    }
  };
})(window.SU = window.SU || {});
