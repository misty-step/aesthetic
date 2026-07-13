/* the nav indicator: position the sliding ink underline under the
   active item on activation, resize, and font load (metrics shift
   when Geist arrives). Exposes window.aePlaceInds for page scripts
   that swap views and need the indicator re-placed after a display
   change. Works for .ae-nav and .ae-tabs alike. The same placement pass
   reveals the current item in a horizontally scrolling .ae-rail-nav. */
(() => {
  if (window.aePlaceInds) return;
  const placeInd = (nav) => {
    const active = nav.querySelector(
      '[aria-current], [aria-selected="true"], .is-active',
    );
    const ind = nav.querySelector('.ae-nav-ind');
    if (!active || !ind || !nav.offsetWidth) return;
    ind.style.left = active.offsetLeft + 'px';
    ind.style.width = active.offsetWidth + 'px';
  };
  const placeAllInds = () =>
    document.querySelectorAll('.ae-nav, .ae-tabs').forEach(placeInd);
  const revealRailCurrent = (nav) => {
    const active = nav.querySelector(
      '[aria-current], [aria-selected="true"], .is-active',
    );
    if (!active || !nav.offsetWidth) return;
    active.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };
  const placeAll = () => {
    placeAllInds();
    document.querySelectorAll('.ae-rail-nav').forEach(revealRailCurrent);
  };

  document.querySelectorAll('.ae-nav, .ae-tabs').forEach((nav) => {
    nav.querySelectorAll('a, button').forEach((item) => {
      item.addEventListener('click', () => {
        nav
          .querySelectorAll('a, button')
          .forEach((b) => b.classList.remove('is-active'));
        item.classList.add('is-active');
        placeInd(nav);
      });
    });
  });
  document.querySelectorAll('.ae-rail-nav').forEach((nav) => {
    nav.querySelectorAll('a, button').forEach((item) => {
      item.addEventListener('click', () => revealRailCurrent(nav));
    });
  });
  addEventListener('resize', placeAll);
  if (document.fonts) document.fonts.ready.then(placeAll);
  placeAll();

  window.aePlaceInds = placeAll;
})();
