/* aesthetic recipes — canonical behavior glue for the primitives that
   imply it. The stylesheet ships no JavaScript; copy these patterns.
   (Seed of the recipes layer, backlog 005.)

   The mode boot — read the persisted choice before first paint so the
   page never flashes the wrong mode — must be inlined in <head>:

   <script>
     try {
       var m = localStorage.getItem('ae-mode');
       if (m === 'dark' || m === 'light') {
         document.documentElement.classList.add(m);
         document.documentElement.style.colorScheme = m;
       }
     } catch (e) {}
   </script>
*/
(() => {
  const root = document.documentElement;

  /* the mode toggle: pin the opposite of the effective scheme.
     Pinning color-scheme keeps UA widgets (scrollbars, form controls)
     on the pinned side even when the OS disagrees. */
  const isDark = () =>
    root.classList.contains('dark')
      ? true
      : root.classList.contains('light')
        ? false
        : matchMedia('(prefers-color-scheme: dark)').matches;

  document.querySelectorAll('.ae-mode').forEach((btn) => {
    btn.addEventListener('click', () => {
      const dark = isDark();
      root.classList.toggle('dark', !dark);
      root.classList.toggle('light', dark);
      root.style.colorScheme = dark ? 'light' : 'dark';
      try {
        localStorage.setItem('ae-mode', dark ? 'light' : 'dark');
      } catch (e) {}
    });
  });

  /* the nav indicator: position under the active item on activation,
     resize, and font load (metrics shift when Geist arrives) */
  const placeInd = (nav) => {
    const active = nav.querySelector('[aria-current], .is-active');
    const ind = nav.querySelector('.ae-nav-ind');
    if (!active || !ind || !nav.offsetWidth) return;
    ind.style.left = active.offsetLeft + 'px';
    ind.style.width = active.offsetWidth + 'px';
  };
  const placeAllInds = () =>
    document.querySelectorAll('.ae-nav').forEach(placeInd);

  document.querySelectorAll('.ae-nav').forEach((nav) => {
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

  /* the send moment: resolve once, persist; never rewind */
  document.querySelectorAll('form[data-ae-demo]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.ae-send');
      if (!btn) return;
      btn.classList.add('is-sent');
      btn.disabled = true;
    });
  });

  /* expose for page scripts that swap views and need the indicator
     re-placed after a display change */
  window.aePlaceInds = placeAllInds;
})();
