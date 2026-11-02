/* components/hero.js — puts the hero media into the full-screen frame from index.html. There are two
   cuts of the same render: a 9:16 one for phones and a 16:9 one for wide screens (WIDE below), so the
   frame crops as little as possible. The choice is made once, when the page loads.
   - Scroll-driven (owner, 2 Nov 2026): the hero is a tall track (data-scrub, hero.css) in which the
     frame stays pinned while the animation runs forward as you scroll down and backward as you
     scroll up (outside → the cafe interior); then the page carries on. It never plays by itself.
   - The animation is a FRAME SEQUENCE, not a video (changed 2 Nov 2026): the 240 rendered frames of
     the Blender one-take (ShakeUp_3D v2 delivery, rendered for scroll-controlled playback) as WebP
     stills, drawn onto a canvas. Phone browsers would not paint a paused video being seeked by
     scroll — iOS Safari showed a blank white frame, mobile Chrome froze on the first frame — while
     stills draw identically everywhere. Frames stream in as the page loads, nearest the position
     being shown first; until a frame arrives, the closest loaded one shows, over the first-frame
     still, so the frame is never blank.
   - Reduced motion: the last-frame still only (the interior), no sequence, no tall track.
   - Frames fail to load: swapped for the last-frame still, no tall track.
   - Its one line (index.html) shows once the animation is 3 s in (frame 72 of 240 at 24 fps);
     with no sequence it simply shows.
   - The «scroll down» cue at the bottom goes once you start scrolling (data-moved).
   - While the hero is the page you are on (its frame mostly on screen), <html data-at-hero>:
     the top bar is away and the small hero logo stands in for it (top-bar.css, hero.css).
   render() only sets the cue's words (language switch); everything else is set up once, on load. */
(function (SU) {
  'use strict';

  /* The hero's media — the ONLY place these paths live (also listed in assets/MANIFEST.md).
     dir null = not delivered yet: the labelled placeholder in index.html stays. */
  var MEDIA = {
    phone: {
      dir: 'assets/img/hero-frames-mobile/',       // f000.webp … f239.webp at 900×1600
      w: 900, h: 1600,
      first: 'assets/img/hero-mobile-first.webp',  // frame 0 (outside), under the canvas from the start
      poster: 'assets/img/hero-mobile-last.webp'   // the last frame (the cafe interior): reduced motion / error
    },
    wide: {
      dir: 'assets/img/hero-frames-wide/',         // f000.webp … f239.webp at 1600×900
      w: 1600, h: 900,
      first: 'assets/img/hero-desktop-first.webp',
      poster: 'assets/img/hero-desktop-last.webp'
    }
  };
  var WIDE = '(min-width: 40rem) and (orientation: landscape)';
  var COUNT = 240;     // frames in the one-take (10 s at 24 fps)
  var LINE_AT = 72;    // frame where its line comes in (3 s in)

  var hero = document.getElementById('hero');

  /* How far through the tall track the page is, 0 (top) … 1 (the frame is about to scroll away). */
  function progress() {
    var r = hero.getBoundingClientRect(), run = r.height - window.innerHeight;
    return run > 0 ? Math.min(1, Math.max(0, -r.top / run)) : 0;
  }

  function frameName(i) { return 'f' + ('00' + i).slice(-3) + '.webp'; }

  /* The sequence player. Frames load a few at a time, always the unloaded one nearest the position
     being shown; the shown position eases toward the scroll target, and the closest loaded frame is
     drawn, so a flick still steps through the frames instead of jumping and a slow connection just
     means a coarser step until the sharper frame lands. */
  function sequence(frame, media, under) {
    var canvas = SU.h('canvas', { 'class': 'su-hero__media', 'aria-hidden': 'true' });
    canvas.width = media.w;
    canvas.height = media.h;
    frame.insertBefore(canvas, under ? under.nextSibling : frame.firstChild);
    var ctx = canvas.getContext('2d');
    var imgs = new Array(COUNT), state = new Uint8Array(COUNT);   // 0 unloaded · 1 loading · 2 ready · 3 failed
    var inflight = 0, shown = -1, drawn = -1, raf = 0, dead = false, fails = 0;

    function nearest(i) {
      for (var d = 0; d < COUNT; d++) {
        if (i + d < COUNT && state[i + d] === 2) return i + d;
        if (i - d >= 0 && state[i - d] === 2) return i - d;
      }
      return -1;
    }

    function draw() {
      if (shown < 0) return;
      var i = nearest(Math.round(shown));
      if (i < 0 || i === drawn) return;
      ctx.drawImage(imgs[i], 0, 0, media.w, media.h);
      drawn = i;
    }

    function fail() {          // no frames at all → the still, no tall track (the old video-error path)
      if (dead) return;
      dead = true;
      canvas.remove();
      if (under) under.remove();
      hero.removeAttribute('data-scrub');
      hero.removeAttribute('data-line');
      frame.insertBefore(posterImage(media.poster), frame.firstChild);
    }

    function pump() {
      while (inflight < 6 && !dead) {
        var t = Math.round(shown < 0 ? 0 : shown), i = -1;
        for (var d = 0; d < COUNT; d++) {
          if (t + d < COUNT && state[t + d] === 0) { i = t + d; break; }
          if (t - d >= 0 && state[t - d] === 0) { i = t - d; break; }
        }
        if (i < 0) return;
        state[i] = 1;
        inflight++;
        var im = new Image();
        imgs[i] = im;
        im.onload = (function (n, el) { return function () { state[n] = 2; inflight--; if (imgs[n] === el) { draw(); pump(); } }; })(i, im);
        im.onerror = (function (n, el) { return function () {
          state[n] = 3;
          inflight--;
          fails++;
          if (imgs[n] !== el) return;
          if (fails >= 12 && nearest(0) < 0) { fail(); return; }   // the frames are not there: the still takes over
          pump();
        }; })(i, im);
        im.src = media.dir + frameName(i);
      }
    }

    /* Scroll → frame. One frame request per scroll burst; the shown frame eases toward the target. */
    function step() {
      raf = 0;
      var p = progress();
      if (p > 0.02) hero.setAttribute('data-moved', ''); else hero.removeAttribute('data-moved');
      var target = p * (COUNT - 1);
      if (shown < 0) shown = target;
      shown += (target - shown) * 0.35;
      if (Math.abs(target - shown) < 0.4) shown = target;
      /* The line shows from 3 s (frame 72) on, in both directions of scrolling. */
      if (shown >= LINE_AT) hero.removeAttribute('data-line'); else hero.setAttribute('data-line', 'wait');
      draw();
      pump();
      if (shown !== target) raf = requestAnimationFrame(step);
    }
    function ask() { if (!raf && !dead) raf = requestAnimationFrame(step); }
    window.addEventListener('scroll', ask, { passive: true });
    window.addEventListener('resize', ask);
    hero.setAttribute('data-line', 'wait');
    ask();
  }

  /* Page 1 or not: the hero's frame mostly on screen (it stays pinned while the sequence runs). */
  function watchHero() {
    var frame = document.getElementById('hero-frame'), root = document.documentElement;
    function set(on) { if (on) root.setAttribute('data-at-hero', ''); else root.removeAttribute('data-at-hero'); }
    set(frame.getBoundingClientRect().bottom > window.innerHeight / 2);   // before the first paint: no flash of the bar
    if (!('IntersectionObserver' in window)) { set(false); return; }
    new IntersectionObserver(function (entries) {
      set(entries[0].isIntersecting && entries[0].intersectionRatio > 0.5);
    }, { threshold: [0, 0.5, 1] }).observe(frame);
  }

  function posterImage(src) {
    return SU.h('img', { 'class': 'su-hero__media', src: src, alt: '', decoding: 'async' });
  }

  /* Fill the frame from `media` (its line and cue stay). `reduced` = the visitor asked for less motion. */
  function mount(frame, media, reduced) {
    if (!media.dir && !media.poster) return;            // nothing delivered: keep the placeholder
    var ph = frame.querySelector('.su-hero__placeholder');
    if (ph) ph.remove();
    function still() { frame.insertBefore(posterImage(media.poster), frame.firstChild); }
    if (reduced || !media.dir) { if (media.poster) still(); return; }

    /* The first frame as a plain picture under the canvas, from the first moment: the frame is
       never blank while the frames stream in, and it is what stays if they cannot load. */
    var under = null;
    if (media.first) { under = posterImage(media.first); frame.insertBefore(under, frame.firstChild); }
    hero.setAttribute('data-scrub', '');
    sequence(frame, media, under);
  }

  SU.hero = {
    mount: mount,
    /* the cue's words follow the language */
    render: function () { SU.setText('hero-cue-text', SU.t('scrollDown')); }
  };

  var frame = document.getElementById('hero-frame');
  var mq = function (q) { return !!(window.matchMedia && window.matchMedia(q).matches); };
  var reduced = mq('(prefers-reduced-motion: reduce)');
  if (frame) { mount(frame, mq(WIDE) ? MEDIA.wide : MEDIA.phone, reduced); watchHero(); }
})(window.SU = window.SU || {});
