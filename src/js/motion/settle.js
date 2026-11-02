/* motion/settle.js — the cards' settle-in: world cards, category image cards and the Mixes reel card
   (the look is in 90-motion.css). A card still below the screen gets data-settle="ready": its inner
   layer is zoomed in a little, clipped by the card's still frame. Once a bit of it is on screen it
   becomes "go" and the inner layer eases down to its natural size, once; then the attribute is
   removed and the card is plain static layout for the rest of the scroll. Only the inner layer's
   transform ever changes; nothing listens to scrolling.
   Cards already on screen or above it are left alone, so a redraw never makes what you see jump.
   Delete this file and the cards simply sit still (that is also what reduced motion shows). */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  var SEL = '.su-world-card, .su-category-header, .su-mix-reel';   // each holds one inner .su-settle layer

  function done(card) { card.removeAttribute('data-settle'); }

  function go(card) {
    card.setAttribute('data-settle', 'go');
    var inner = card.querySelector(':scope > .su-settle');
    var ms = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--dur-settle')) || 1100;
    var t = setTimeout(function () { done(card); }, ms + 200);   // in case transitionend never comes
    inner.addEventListener('transitionend', function end(e) {
      if (e.target !== inner || e.propertyName !== 'transform') return;
      inner.removeEventListener('transitionend', end);
      clearTimeout(t);
      done(card);
    });
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      go(e.target);
    });
  }, { threshold: 0.15 });

  /* Runs at start and after every redraw (a language or size switch builds new cards). */
  function scan() {
    [].forEach.call(document.querySelectorAll(SEL), function (card) {
      if (card.hasAttribute('data-settle-seen')) return;
      card.setAttribute('data-settle-seen', '');
      if (card.getBoundingClientRect().top < window.innerHeight) return;
      card.setAttribute('data-settle', 'ready');
      io.observe(card);
    });
  }
  scan();
  new MutationObserver(scan).observe(document.getElementById('menu'), { childList: true, subtree: true });
})();
