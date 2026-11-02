/* motion/videos.js — plays each <video data-play-in-view> from the start every time its page is reached
   (most of it on screen), and stops it once it has fully left the screen, so the next visit plays it
   again. In between it plays to its end and rests on its last frame. Never scroll-scrubbed.
   Delete this file and the videos simply show their finished-frame poster (that is also what reduced
   motion shows); the hero still plays once on load (hero.js).
   One IntersectionObserver; it only swaps the poster, rewinds, plays and pauses. A MutationObserver
   picks up videos the menu redraws (switching language rebuilds the matcha scene). */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;   // the finished-frame poster stays

  var AT_PAGE = 0.6;   // "at its page": this share of the video (or of the screen, if taller) is showing

  function rewind(v) {
    try { v.currentTime = 0; } catch (e) { /* not seekable yet: it is at the start anyway */ }
  }
  function play(v) {
    rewind(v);
    var p = v.play();
    if (p && p.catch) p.catch(function () { v.setAttribute('poster', v.getAttribute('data-poster-last')); });  // autoplay refused
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var v = e.target;
      var seen = e.intersectionRect.height / Math.min(e.boundingClientRect.height, window.innerHeight);
      if (!v.su_in && e.isIntersecting && seen >= AT_PAGE) { v.su_in = true; play(v); }
      else if (v.su_in && !e.isIntersecting) { v.su_in = false; v.pause(); rewind(v); }   // fully gone: back to its first frame, ready to replay
    });
  }, { threshold: [0, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 1] });

  function watch(v) {
    if (v.su_watched) return;
    v.su_watched = true;
    var first = v.getAttribute('data-poster-first');
    if (!v.hasAttribute('data-poster-last')) v.setAttribute('data-poster-last', v.getAttribute('poster') || '');
    if (first) v.setAttribute('poster', first);   // empty cup until it pours
    v.preload = 'auto';
    v.muted = true;                              // iOS only autoplays muted video
    io.observe(v);
  }

  function scan() { [].forEach.call(document.querySelectorAll('video[data-play-in-view]'), watch); }
  scan();
  new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
})();
