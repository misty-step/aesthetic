/* the popover: geometry for the slip. Native [popover] owns the top
   layer, light dismiss, and Escape; this recipe only places the open
   slip by its invoker — below and start-aligned, stepping above or
   inward when the viewport says so.

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
    },
    true,
  );
})();
