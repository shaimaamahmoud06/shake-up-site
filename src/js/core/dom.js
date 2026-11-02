/* core/dom.js — tiny DOM helpers shared by every component. */
(function (SU) {
  'use strict';

  /* Element builder: attrs -> attributes (`text` sets textContent), kids -> children. */
  SU.h = function (tag, attrs, kids) {
    var el = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'text') el.textContent = attrs[k];
      else el.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (kid) { if (kid) el.appendChild(kid); });
    return el;
  };

  /* Arabic board text keeps its own direction and language inside an English page. */
  SU.textEl = function (tag, cls, text) {
    return SU.h(tag, { 'class': cls, lang: 'ar', dir: 'auto', text: text });
  };

  SU.setText = function (id, text) {
    document.getElementById(id).textContent = text;
  };

  /* Replace everything inside #id with the given nodes. */
  SU.swap = function (id, nodes) {
    var el = document.getElementById(id);
    el.textContent = '';
    nodes.forEach(function (n) { el.appendChild(n); });
  };
})(window.SU = window.SU || {});
