/* input anticipation (the combined warming): the nearest field's
   label and line warm toward ink as the pointer approaches.
   Mouse-only, color-only, capped below the committed state, off under
   reduced motion; focus always snaps to the committed state. Opt in
   with data-ae-anticipate on the form. */
(() => {
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const reducedAnt = matchMedia('(prefers-reduced-motion: reduce)');
  const forms = document.querySelectorAll('[data-ae-anticipate]');
  if (!forms.length || !fine.matches || reducedAnt.matches) return;

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
})();
