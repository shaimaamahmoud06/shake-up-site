/* motion/reveals.js — a soft fade-in as a category (or a branch card) first comes on screen.
   The only thing it does is add the class `su-reveal` (the animation is in 90-motion.css). Content
   is ALWAYS visible without it: nothing starts hidden. Things already on screen or above it are left
   alone, so a redraw (size or language switch) never makes what you are reading flash.
   Delete this file and the page simply has no reveals. */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  var SEL = '.category, .su-visit__branch';

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      e.target.classList.add('su-reveal');
    });
  });

  /* Watch only what is still below the screen. Runs at start and after every redraw. */
  function scan() {
    [].forEach.call(document.querySelectorAll(SEL), function (el) {
      if (el.hasAttribute('data-reveal-seen')) return;
      el.setAttribute('data-reveal-seen', '');
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      io.observe(el);
    });
  }

  scan();
  var mo = new MutationObserver(scan);
  ['menu', 'visit'].forEach(function (id) {
    var root = document.getElementById(id);
    if (root) mo.observe(root, { childList: true });
  });
})();
