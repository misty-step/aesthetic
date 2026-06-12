/* the mode: light and dark, defaulting to the system, with a toggle.

   The boot — read the persisted choice before first paint so the page
   never flashes the wrong mode — must be inlined in <head>:

   <script>
     try {
       var m = localStorage.getItem('ae-mode');
       if (m === 'dark' || m === 'light') {
         document.documentElement.classList.add(m);
         document.documentElement.style.colorScheme = m;
       }
     } catch (e) {}
   </script>

   The toggle below pins the opposite of the effective scheme. Pinning
   color-scheme keeps UA widgets (scrollbars, form controls) on the
   pinned side even when the OS disagrees. The change itself is the
   locked choreography: one soft 700ms view-transition breath, a 480ms
   uniform color ease where unsupported, instant under reduced motion.
   next-themes consumers: keep attribute="class" and skip this file —
   the classes match. */
(() => {
  const root = document.documentElement;

  const isDark = () =>
    root.classList.contains('dark')
      ? true
      : root.classList.contains('light')
        ? false
        : matchMedia('(prefers-color-scheme: dark)').matches;

  const reducedMode = matchMedia('(prefers-reduced-motion: reduce)');

  document.querySelectorAll('.ae-mode').forEach((btn) => {
    btn.addEventListener('click', () => {
      const dark = isDark();
      const flip = () => {
        root.classList.toggle('dark', !dark);
        root.classList.toggle('light', dark);
        root.style.colorScheme = dark ? 'light' : 'dark';
        try {
          localStorage.setItem('ae-mode', dark ? 'light' : 'dark');
        } catch (e) {}
      };
      if (reducedMode.matches) {
        flip();
      } else if (document.startViewTransition) {
        root.classList.add('ae-vt-mode');
        document
          .startViewTransition(flip)
          .finished.finally(() => root.classList.remove('ae-vt-mode'));
      } else {
        root.classList.add('ae-mode-easing');
        flip();
        setTimeout(() => root.classList.remove('ae-mode-easing'), 520);
      }
    });
  });
})();
