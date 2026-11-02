/* components/hero.js — puts the hero media into the full-screen frame from index.html. There are two
   cuts of the same render: a 9:16 one for phones and a 16:9 one for wide screens (WIDE below), so the
   frame crops as little as possible. The choice is made once, when the page loads.
   - Scroll-driven (owner, 2 Nov 2026): the hero is a tall track (data-scrub, hero.css) in which the
     frame stays pinned while the clip runs forward as you scroll down and backward as you scroll up
     (outside → the cafe interior); then the page carries on. It never plays by itself.
     The clip loads straight from its file and the browser jumps through it natively (the hosting
     serves byte ranges); both cuts are encoded with a keyframe on every frame, so each step is one
     quick decode. Until it paints, the first-frame still (the outside) shows as a plain picture.
   - Reduced motion: the last-frame still only (the interior), no video, no tall track.
   - Video fails to load: swapped for the last-frame still, no tall track.
   - Its one line (index.html) shows once the clip is 3 s in; with no video it simply shows.
   - The «scroll down» cue at the bottom goes once you start scrolling (data-moved).
   - While the hero is the page you are on (its frame mostly on screen), <html data-at-hero>:
     the top bar is away and the small hero logo stands in for it (top-bar.css, hero.css).
   render() only sets the cue's words (language switch); everything else is set up once, on load. */
(function (SU) {
  'use strict';

  /* The hero's media — the ONLY place these paths live (also listed in assets/MANIFEST.md).
     null = not delivered yet: the labelled placeholder in index.html stays. */
  var MEDIA = {
    phone: {
      video: 'assets/video/hero-mobile.mp4',       // 720×1280, 10 s, every frame a keyframe
      first: 'assets/img/hero-mobile-first.webp',  // its first frame (outside), shown until it loads
      poster: 'assets/img/hero-mobile-last.webp'   // its last frame (the cafe interior): reduced motion / error
    },
    wide: {
      video: 'assets/video/hero-desktop.mp4',      // 1280×720, 10 s, every frame a keyframe
      first: 'assets/img/hero-desktop-first.webp',
      poster: 'assets/img/hero-desktop-last.webp'
    }
  };
  var WIDE = '(min-width: 40rem) and (orientation: landscape)';
  var LINE_AT = 3;   // seconds into the clip when its line comes in

  var hero = document.getElementById('hero');

  /* The line shows from LINE_AT on, in both directions of scrolling. */
  function timeLine(video) {
    function sync() {
      if (video.currentTime >= LINE_AT) hero.removeAttribute('data-line');
      else hero.setAttribute('data-line', 'wait');
    }
    hero.setAttribute('data-line', 'wait');
    ['seeked', 'timeupdate'].forEach(function (ev) { video.addEventListener(ev, sync); });
  }

  /* How far through the tall track the page is, 0 (top) … 1 (the frame is about to scroll away). */
  function progress() {
    var r = hero.getBoundingClientRect(), run = r.height - window.innerHeight;
    return run > 0 ? Math.min(1, Math.max(0, -r.top / run)) : 0;
  }

  /* Scroll → clip time. One frame request per scroll burst; the shown time eases toward the target so
     a flick still steps through the frames instead of jumping. A new seek is only asked for once the
     last one has landed, so seeks never pile up. */
  function scrub(video) {
    var shown = -1, raf = 0;
    function step() {
      raf = 0;
      var p = progress();
      if (p > 0.02) hero.setAttribute('data-moved', ''); else hero.removeAttribute('data-moved');
      if (!video.duration) return;
      var target = p * (video.duration - 0.05);
      var next = shown < 0 ? target : shown + (target - shown) * 0.35;
      if (Math.abs(target - next) < 0.02) next = target;
      if (!video.seeking && next !== shown) { video.currentTime = next; shown = next; }
      if (shown !== target) raf = requestAnimationFrame(step);
    }
    function ask() { if (!raf) raf = requestAnimationFrame(step); }
    window.addEventListener('scroll', ask, { passive: true });
    window.addEventListener('resize', ask);
    video.addEventListener('loadedmetadata', ask);
    video.addEventListener('seeked', ask);
    ask();
  }

  /* Page 1 or not: the hero's frame mostly on screen (it stays pinned while the clip runs). */
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
    if (!media.video && !media.poster) return;            // nothing delivered: keep the placeholder
    var ph = frame.querySelector('.su-hero__placeholder');
    if (ph) ph.remove();
    function still() { frame.insertBefore(posterImage(media.poster), frame.firstChild); }
    if (reduced || !media.video) { if (media.poster) still(); return; }

    /* The first frame as a plain picture under the video, from the first moment: the frame is
       never blank while the clip loads, and if the clip cannot play this is what stays. */
    var under = null;
    if (media.first) { under = posterImage(media.first); frame.insertBefore(under, frame.firstChild); }
    var video = SU.h('video', { 'class': 'su-hero__media', playsinline: '', muted: '', preload: 'auto', 'aria-hidden': 'true' });
    if (media.first) video.setAttribute('poster', media.first);
    video.muted = true;
    video.addEventListener('error', function () {          // blocked / missing / unsupported → the still
      if (!video.parentNode) return;
      video.remove();
      if (under) under.remove();
      hero.removeAttribute('data-scrub');
      hero.removeAttribute('data-line');
      if (media.poster) still();
    });
    frame.insertBefore(video, under ? under.nextSibling : frame.firstChild);
    hero.setAttribute('data-scrub', '');
    timeLine(video);
    scrub(video);
    /* The clip loads straight from its file: the hosting serves byte ranges, so the browser can
       jump to any moment natively. (An earlier version fetched the whole file into a blob first;
       iOS Safari left the frame blank on that path, so it was removed — 2 Nov 2026.) */
    video.src = media.video;
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
