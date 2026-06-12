/* the nav indicator: position the sliding ink underline under the
   active item on activation, resize, and font load (metrics shift
   when Geist arrives). Exposes window.aePlaceInds for page scripts
   that swap views and need the indicator re-placed after a display
   change. Works for .ae-nav and .ae-tabs alike. */
(() => {
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
  addEventListener('resize', placeAllInds);
  if (document.fonts) document.fonts.ready.then(placeAllInds);
  placeAllInds();

  window.aePlaceInds = placeAllInds;
})();
