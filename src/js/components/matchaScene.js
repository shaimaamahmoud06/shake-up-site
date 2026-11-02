/* components/matchaScene.js — sketch Page 6: the coffee & matcha moment that opens the Drinks world.
   The matcha pour on the left (plays each time its page is reached, like the milkshake pour: motion/videos.js), the
   heading «قهوة» (chocolate) + «وماتشا» (matcha green — the ONLY green word on the site) on the right.
   Laid out left-to-right in both languages, like the pour scene; the heading carries its own language.
   The scene is built ONCE and re-used on every redraw, so a size or language switch never restarts
   or resets the video; render() only changes the words. */
(function (SU) {
  'use strict';

  /* The scene's media — the ONLY place these paths live (also listed in assets/MANIFEST.md). */
  var VIDEO = 'assets/video/matcha_pour_1080x1350.mp4';
  var POSTER_FIRST = 'assets/img/matcha_pour_poster_first.webp';   // empty cup, before it pours
  var POSTER_LAST = 'assets/img/matcha_pour_poster_last.webp';     // finished drink: default + reduced motion

  var scene = null;

  function build() {
    return SU.h('section', { 'class': 'su-matcha', id: 'matcha', dir: 'ltr' }, [
      SU.h('div', { 'class': 'su-matcha__media' }, [
        SU.h('video', { 'class': 'su-matcha__video', 'data-play-in-view': '', muted: '', playsinline: '', preload: 'none',
          'aria-hidden': 'true', width: '1080', height: '1350', src: VIDEO, poster: POSTER_LAST, 'data-poster-first': POSTER_FIRST })
      ]),
      SU.h('h2', { 'class': 'su-matcha__heading' }, [
        SU.h('span', { 'class': 'su-matcha__coffee' }),
        SU.h('span', { 'class': 'su-matcha__matcha' })
      ])
    ]);
  }

  SU.matchaScene = {
    render: function () {
      if (!scene) scene = build();
      var h = scene.querySelector('.su-matcha__heading');
      h.setAttribute('lang', SU.state.lang);
      h.setAttribute('dir', SU.state.lang === 'ar' ? 'rtl' : 'ltr');
      h.querySelector('.su-matcha__coffee').textContent = SU.t('matchaCoffee');
      h.querySelector('.su-matcha__matcha').textContent = SU.t('matchaMatcha');
      return scene;
    }
  };
})(window.SU = window.SU || {});
