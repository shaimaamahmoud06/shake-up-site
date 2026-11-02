/* components/stickers.js — the owner's three stickers, each twice, small, in the page's empty space
   (owner, 2 Nov 2026). On phones each sits in the gap above a section, at one side, overlapping the
   cards around it only a little; on wide screens it moves out into the empty margin beside the menu
   (stickers.css). They float gently (90-motion.css). Pure decoration: hidden from screen readers,
   never in the way of a tap. Re-placed after every redraw, since render() rebuilds the menu. */
(function (SU) {
  'use strict';

  /* The stickers' files — the ONLY place these paths live (also listed in assets/MANIFEST.md). */
  var SRC = {
    cupcake: 'assets/img/stickers/sticker-cupcake.webp',
    brain: 'assets/img/stickers/sticker-brain.webp',
    car: 'assets/img/stickers/sticker-car-guy.webp'
  };

  /* Where each goes, top to bottom: the section it sits above, which side (start / end of the
     reading direction), its tilt, and how long one float takes (so no two move in step). */
  var SPOTS = [
    { at: 'cat-nut',   sticker: 'cupcake', side: 'end',   tilt: -8, dur: 6.0 },
    { at: 'cat-hot',   sticker: 'brain',   side: 'start', tilt: 7,  dur: 7.2 },
    { at: 'cat-cloud', sticker: 'car',     side: 'end',   tilt: -5, dur: 6.6 },
    { at: 'cat-smo',   sticker: 'cupcake', side: 'start', tilt: 9,  dur: 7.6 },
    { at: 'cat-par',   sticker: 'brain',   side: 'end',   tilt: -6, dur: 6.3 },
    { at: 'visit',     sticker: 'car',     side: 'end',   tilt: 6,  dur: 7.0 }
  ];

  SU.stickers = {
    render: function () {
      SPOTS.forEach(function (s, n) {
        var host = document.getElementById(s.at);
        if (!host || host.querySelector(':scope > .su-sticker')) return;
        host.classList.add('su-sticker-host');
        host.appendChild(SU.h('img', {
          'class': 'su-sticker su-sticker--' + s.sticker, 'data-side': s.side,
          src: SRC[s.sticker], alt: '', 'aria-hidden': 'true', decoding: 'async', loading: 'lazy',
          style: '--tilt:' + s.tilt + 'deg;--float:' + s.dur + 's;--delay:' + (-n * 1.3) + 's'
        }));
      });
    }
  };
})(window.SU = window.SU || {});
