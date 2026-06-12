/* settings rows that open: each .ae-setting button toggles the
   .ae-setting-panel that follows it; choosing an option writes the
   row's value and folds the chooser. One row open at a time; Escape
   folds and returns focus. */
(() => {
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
})();
