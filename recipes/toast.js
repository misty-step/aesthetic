/* the toast: news arrives at the edge and waits to be read.
   window.aeToast('Saved.', { status: 'ok' }) — ok|warn|err puts the
   hue on the glyph, the words stay ink. Toasts persist until
   dismissed or pushed out (the tray keeps four); pass { timeout: ms }
   to opt into self-dismissal — it is never the default. */
(() => {
  const ICONS = {
    ok: '<path d="M20 6 9 17l-5-5"/>',
    warn: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    err: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  };

  let tray = null;
  const ensureTray = () => {
    if (!tray) {
      tray = document.createElement('div');
      tray.className = 'ae-toasts';
      document.body.appendChild(tray);
    }
    return tray;
  };

  const dismiss = (toast) => {
    if (!toast.isConnected) return;
    toast.classList.add('is-leaving');
    setTimeout(() => toast.remove(), 200);
  };

  window.aeToast = (message, opts) => {
    const { status, timeout } = opts || {};
    const toast = document.createElement('div');
    toast.className = 'ae-toast';
    toast.setAttribute('role', 'status');
    if (status && ICONS[status]) {
      const i = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      i.setAttribute('class', `ae-icon ae-${status}`);
      i.setAttribute('viewBox', '0 0 24 24');
      i.innerHTML = ICONS[status];
      toast.appendChild(i);
    }
    toast.appendChild(document.createTextNode(message));
    const x = document.createElement('button');
    x.className = 'ae-toast-x';
    x.setAttribute('aria-label', 'dismiss');
    x.textContent = '✕';
    x.addEventListener('click', () => dismiss(toast));
    toast.appendChild(x);

    const t = ensureTray();
    t.appendChild(toast);
    while (t.children.length > 4) t.firstElementChild.remove();
    if (timeout) setTimeout(() => dismiss(toast), timeout);
    return toast;
  };
})();
