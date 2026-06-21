/* the popover: geometry for the slip + roving tabindex for its menu.
   Native [popover] owns the top layer, light dismiss, and Escape; this
   recipe places the open slip by its invoker and wires arrow-key
   navigation for any .ae-menu inside.

   <button popovertarget="menu">Options</button>
   <div id="menu" popover class="ae-pop">…</div> */
(() => {
  document.addEventListener(
    'toggle',
    (e) => {
      const pop = e.target;
      if (!(pop instanceof HTMLElement)) return;
      if (!pop.classList.contains('ae-pop')) return;
      if (e.newState !== 'open' || !pop.id) return;
      const inv = document.querySelector(`[popovertarget="${pop.id}"]`);
      if (!inv) return;
      const r = inv.getBoundingClientRect();
      const pr = pop.getBoundingClientRect();
      let top = r.bottom + 6;
      if (top + pr.height > innerHeight - 8) top = r.top - pr.height - 6;
      const left = Math.min(r.left, innerWidth - pr.width - 8);
      pop.style.top = `${Math.max(8, top)}px`;
      pop.style.left = `${Math.max(8, left)}px`;

      /* roving tabindex: focus the selected item or the first item on
         open, then arrow-key through the menu */
      const menu = pop.querySelector('.ae-menu');
      if (!menu) return;
      const items = [...menu.querySelectorAll('button')];
      if (items.length === 0) return;
      items.forEach((b) => (b.tabIndex = -1));
      const sel = menu.querySelector('button.is-sel') || items[0];
      sel.tabIndex = 0;
      sel.focus();
    },
    true,
  );

  /* arrow-key roving for .ae-menu inside popovers */
  document.addEventListener('keydown', (e) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
    const menu = e.target.closest('.ae-menu');
    if (!menu) return;
    const items = [...menu.querySelectorAll('button')];
    if (items.length === 0) return;
    const i = items.indexOf(e.target);
    let next;
    if (e.key === 'ArrowDown') next = items[(i + 1) % items.length];
    else if (e.key === 'ArrowUp')
      next = items[(i - 1 + items.length) % items.length];
    else if (e.key === 'Home') next = items[0];
    else if (e.key === 'End') next = items[items.length - 1];
    if (!next) return;
    e.preventDefault();
    items.forEach((b) => (b.tabIndex = -1));
    next.tabIndex = 0;
    next.focus();
  });
})();
