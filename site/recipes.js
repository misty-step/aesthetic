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

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');

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
      /* the locked choreography: one soft 700ms breath via view
         transitions; a 480ms uniform color ease where unsupported;
         instant under reduced motion */
      if (reduced.matches) {
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

  /* settings rows that open: each .ae-setting button toggles the
     .ae-setting-panel that follows it; choosing an option writes the
     row's value and folds the chooser. One row open at a time. */
  const closeSetting = (btn) => {
    const panel = btn.nextElementSibling;
    if (panel) panel.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  };
  document.querySelectorAll('.ae-setting').forEach((btn) => {
    const panel = btn.nextElementSibling;
    if (!panel || !panel.classList.contains('ae-setting-panel')) return;
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', () => {
      const open = panel.classList.contains('is-open');
      document.querySelectorAll('.ae-setting').forEach(closeSetting);
      if (!open) {
        panel.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
    panel.querySelectorAll('.ae-menu button').forEach((opt) => {
      opt.addEventListener('click', () => {
        panel
          .querySelectorAll('.ae-menu button')
          .forEach((b) => b.classList.toggle('is-sel', b === opt));
        const val = btn.querySelector('.ae-setting-val');
        if (val) val.textContent = opt.dataset.value || opt.textContent.trim();
        closeSetting(btn);
        btn.focus();
      });
    });
    panel.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSetting(btn);
        btn.focus();
      }
    });
  });

  /* input anticipation (the combined warming): the nearest field's
     label and line warm toward ink as the pointer approaches.
     Mouse-only, color-only, off under reduced motion; focus always
     snaps to the committed state. Opt in with data-ae-anticipate. */
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const forms = document.querySelectorAll('[data-ae-anticipate]');
  if (forms.length && fine.matches && !reduced.matches) {
    const fields = [];
    forms.forEach((form) => {
      form.querySelectorAll('.ae-input').forEach((input) => {
        const label = form.querySelector(`label[for="${input.id}"]`);
        fields.push({ input, label, rect: null });
      });
    });
    const measure = () => {
      fields.forEach((f) => {
        f.rect = f.input.getBoundingClientRect();
      });
    };
    let raf = 0;
    let px = 0;
    let py = 0;
    const apply = () => {
      raf = 0;
      let best = null;
      let bestD = Infinity;
      fields.forEach((f) => {
        if (!f.rect) return;
        const dx = Math.max(f.rect.left - px, 0, px - f.rect.right);
        const dy = Math.max(f.rect.top - py, 0, py - f.rect.bottom);
        const d = Math.hypot(dx, dy);
        if (d < bestD) {
          bestD = d;
          best = f;
        }
      });
      fields.forEach((f) => {
        const intent =
          f === best ? Math.min(0.6, Math.max(0, 1 - bestD / 180) ** 2) : 0;
        const v = intent ? intent.toFixed(3) : '';
        f.input.style.setProperty('--ae-intent', v);
        if (f.label) f.label.style.setProperty('--ae-intent', v);
      });
    };
    measure();
    addEventListener(
      'pointermove',
      (e) => {
        px = e.clientX;
        py = e.clientY;
        if (!raf) raf = requestAnimationFrame(apply);
      },
      { passive: true },
    );
    addEventListener('resize', measure);
    addEventListener('scroll', measure, { passive: true });
  }

  /* expose for page scripts that swap views and need the indicator
     re-placed after a display change */
  window.aePlaceInds = placeAllInds;
})();
