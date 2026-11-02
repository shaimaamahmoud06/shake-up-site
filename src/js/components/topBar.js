/* components/topBar.js — logo wordmark + the three world links, and the world tint.
   The tint follows the world in view: one IntersectionObserver sets data-world on the bar.
   With no JS (or no IntersectionObserver) the bar simply stays pink. The markup shell lives in index.html. */
(function (SU) {
  'use strict';

  var D = window.MENU_DATA;
  var current = null;     // world id in view; null until the observer reports one
  var observer = null;

  function worldLinks() {
    return D.WORLDS.map(function (w) {
      var a = SU.h('a', { 'class': 'su-top-bar__world', 'href': '#world-' + w.id, 'data-world': w.id, text: SU.worldName(w) });
      if (w.id === current) a.setAttribute('aria-current', 'true');
      return a;
    });
  }

  function setWorld(id) {
    if (id === current) return;
    current = id;
    var bar = document.getElementById('top-bar');
    bar.setAttribute('data-world', id);
    [].forEach.call(bar.querySelectorAll('.su-top-bar__world'), function (a) {
      if (a.getAttribute('data-world') === id) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  /* A thin line 20% down the screen (just under the sticky bars): the world section crossing it wins.
     Re-attached after every render, because render() replaces the world sections. */
  function watch() {
    if (!('IntersectionObserver' in window)) return;
    if (observer) observer.disconnect();
    var ids = D.WORLDS.map(function (w) { return w.id; });
    /* The observer only says WHEN a world crosses the line; the decision is made from positions:
       the last world whose top has passed the line is in view (above the first world: the first one). */
    observer = new IntersectionObserver(function (entries) {
      var line = entries[0].rootBounds ? entries[0].rootBounds.top : window.innerHeight * 0.2;
      var inView = ids[0];
      ids.forEach(function (id) {
        var section = document.getElementById('world-' + id);
        if (section && section.getBoundingClientRect().top <= line) inView = id;
      });
      setWorld(inView);
    }, { rootMargin: '-20% 0px -79% 0px' });
    D.WORLDS.forEach(function (w) {
      var section = document.getElementById('world-' + w.id);
      if (section) observer.observe(section);
    });
  }

  SU.topBar = {
    render: function () {
      SU.setText('brand-name', SU.t('brand'));
      document.getElementById('worldtabs').setAttribute('aria-label', SU.t('worlds'));
      SU.swap('worldtabs', worldLinks());
      Promise.resolve().then(watch);   // runs once the whole render() has finished
    }
  };
})(window.SU = window.SU || {});
