/* the send moment: resolve once, persist, and say so. Call
   window.aeSend(button, 'Sent') on success — it flips the costume,
   disables the control (success is never rewound), and announces the
   resolved state to assistive tech: the aria-hidden done layer is
   silent on its own, so a live region speaks for it.

   Forms marked data-ae-demo resolve on submit without a network —
   the site's demo hook; real consumers call aeSend from their own
   submit handling. */
(() => {
  const live = document.createElement('span');
  live.className = 'ae-sr';
  live.setAttribute('role', 'status');
  (document.body || document.documentElement).appendChild(live);

  window.aeSend = (btn, done) => {
    if (!btn || btn.classList.contains('is-sent')) return;
    btn.classList.add('is-sent');
    btn.disabled = true;
    live.textContent = '';
    requestAnimationFrame(() => {
      live.textContent =
        done ||
        btn.dataset.aeDone ||
        (btn.querySelector('.ae-send-done') || {}).textContent ||
        'Done';
    });
  };

  document.querySelectorAll('form[data-ae-demo]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      window.aeSend(form.querySelector('.ae-send'));
    });
  });
})();
