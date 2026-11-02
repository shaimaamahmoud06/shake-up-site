/* core/state.js — the one place that holds the page state ({lang, size}) and
   the one function that turns an interface-word key into text (t). */
(function (SU) {
  'use strict';

  var STR = window.STRINGS;

  SU.state = { lang: 'ar', size: 1 };
  try {
    var saved = JSON.parse(localStorage.getItem('su-state') || '{}');
    if (saved.lang === 'en' || saved.lang === 'ar') SU.state.lang = saved.lang;
    if (saved.size === 2) SU.state.size = 2;
  } catch (e) { /* storage blocked: defaults are fine */ }

  SU.saveState = function () {
    try { localStorage.setItem('su-state', JSON.stringify(SU.state)); } catch (e) { /* ignore */ }
  };

  /* Interface word for the current language; {n}-style placeholders come from vars. */
  SU.t = function (key, vars) {
    var s = STR[key][SU.state.lang];
    Object.keys(vars || {}).forEach(function (k) { s = s.replace('{' + k + '}', vars[k]); });
    return s;
  };
})(window.SU = window.SU || {});
