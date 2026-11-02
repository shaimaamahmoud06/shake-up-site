/* components/finaleVisit.js — the visit finale (where «وين تلقانا؟ 📍» lands): our branches with their
   Maps links, «تصفح المنيو» back up to the menu and our social accounts, just above the turquoise
   outro (brandFooter.js). The pending wide picture band was removed (owner, 2 Nov 2026). Branches and socials come from data/menu-meta.js. Addresses and
   opening hours are not confirmed by the cafe: they show «؟» — never a guess. */
(function (SU) {
  'use strict';

  var META = window.MENU_META;

  function fact(label) {
    return SU.h('div', { 'class': 'su-visit__fact' }, [
      SU.h('dt', { text: SU.t(label) }),
      SU.h('dd', { 'class': 'su-visit__unknown', text: SU.t('unknown') })
    ]);
  }

  function branch(b) {
    return SU.h('li', { 'class': 'su-visit__branch' }, [
      SU.h('h3', { 'class': 'su-visit__branch-name', text: SU.branchName(b) }),
      SU.h('dl', { 'class': 'su-visit__facts' }, [fact('address'), fact('hours')]),
      SU.h('a', { 'class': 'su-visit__map', href: b.map, target: '_blank', rel: 'noopener' }, [
        SU.h('span', { text: SU.t('openMap') }),
        SU.h('span', { 'aria-hidden': 'true', text: ' 📍' })
      ])
    ]);
  }

  SU.finaleVisit = {
    render: function () {
      SU.swap('visit', [
        SU.h('h2', { 'class': 'su-visit__title', id: 'visit-title', text: SU.t('visitTitle') }),
        SU.h('p', { 'class': 'su-visit__kicker', text: SU.t('branches') }),
        SU.h('ul', { 'class': 'su-visit__branches' }, META.branches.map(branch)),
        /* back to the menu, right under the branches */
        SU.h('a', { 'class': 'su-visit__menu', href: '#world-shakes' }, [
          SU.h('span', { text: SU.t('viewMenu') }),
          SU.h('span', { 'aria-hidden': 'true', text: SU.state.lang === 'ar' ? '←' : '→' })
        ]),
        SU.h('p', { 'class': 'su-visit__kicker', text: SU.t('follow') }),
        SU.h('ul', { 'class': 'su-visit__socials' }, META.socials.map(function (s) {
          return SU.h('li', {}, [
            SU.h('a', { 'class': 'su-visit__social', href: s.url, target: '_blank', rel: 'noopener', lang: 'en', dir: 'ltr' }, [
              SU.h('span', { 'class': 'su-visit__social-label', text: s.label }),
              SU.h('span', { 'class': 'su-visit__social-handle', text: s.handle })
            ])
          ]);
        }))
      ]);
    }
  };
})(window.SU = window.SU || {});
