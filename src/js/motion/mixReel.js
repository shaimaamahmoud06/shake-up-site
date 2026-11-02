/* motion/mixReel.js — turns the Mixes reels (components/mixReel.js) on their own, on a loop, while the
   card is on screen: both reels roll gently for one full turn of the 10 mixes and on to the next mix,
   slow down, and stop one after the other (left at 2.6 s, right 0.4 s later), each with a small settle
   onto the payline. The landed mix's name and price then show; after 2.8 s it turns again.
   Off screen (or in a background tab) it finishes its turn and waits. Never tied to scrolling.
   Delete this file and the reels simply rest on one mix (that is also what reduced motion shows). */
(function (SU) {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window) || !Element.prototype.animate) return;

  var SPIN = [2600, 3000];   // left reel, right reel (ms)
  var HOLD = 2800;           // rest on the landed mix before the next turn
  var FIRST = 700;           // pause after the card comes on screen, before its first turn
  var SETTLE = 0.12;         // how far (in rows) a reel runs past the payline before it settles back

  function y(pos, row) { return 'translateY(' + row * (0.5 - pos) + 'px)'; }

  function turn(el) {
    if (!el.isConnected) { io.unobserve(el); return; }
    var n = el.su_items.length, from = +el.getAttribute('data-at'), to = (from + 1) % n;
    var row = el.querySelector('.su-mix-reel__row').offsetHeight;   // layout size: a settle-in zoom must not change it
    var start = SU.mixReel.BASE * n + from, end = start + n + 1;   // one full turn, then the next mix
    el.su_spinning = true;
    el.setAttribute('data-spinning', '');
    var anims = [].map.call(el.querySelectorAll('.su-mix-reel__strip'), function (s, k) {
      return s.animate([
        { transform: y(start, row), easing: 'cubic-bezier(0.45, 0.05, 0.25, 1)' },   // ease in, long ease-out
        { transform: y(end + SETTLE, row), offset: 0.9, easing: 'cubic-bezier(0.4, 0, 0.4, 1)' },
        { transform: y(end, row) }                                                    // snap back onto the line
      ], { duration: SPIN[k], fill: 'forwards' });
    });
    Promise.all(anims.map(function (a) { return a.finished; })).then(function () {
      if (!el.isConnected) return;
      SU.mixReel.land(el, to);   // same picture, one strip-copy up: the reels can turn again forever
      anims.forEach(function (a) { a.cancel(); });
      el.removeAttribute('data-spinning');
      el.su_spinning = false;
      next(el, HOLD);
    }, function () { /* cancelled: the card was redrawn */ });
  }

  function next(el, ms) {
    clearTimeout(el.su_timer);
    el.su_timer = setTimeout(function () {
      if (el.su_on && !document.hidden) turn(el);
      else el.su_waiting = true;   // picks up again when it is back on screen
    }, ms);
  }
  function wake(el) {
    if (el.su_waiting && !el.su_spinning) { el.su_waiting = false; next(el, FIRST); }
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      e.target.su_on = e.isIntersecting && e.intersectionRatio >= 0.5;
      if (e.target.su_on) wake(e.target);
    });
  }, { threshold: [0, 0.5] });

  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) [].forEach.call(document.querySelectorAll('.su-mix-reel'), function (el) { if (el.su_on) wake(el); });
  });

  /* A redraw (language, size) builds a new card, resting on the mix the old one last landed on. */
  function scan() {
    [].forEach.call(document.querySelectorAll('.su-mix-reel'), function (el) {
      if (el.su_watched) return;
      el.su_watched = true;
      el.su_waiting = true;
      io.observe(el);
    });
  }
  scan();
  new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
})(window.SU = window.SU || {});
