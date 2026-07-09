export const CSS = `
  .base-shell { height: 100dvh; }
  .base-brand { margin-bottom: 1.8em; }
  .base-brand a { color: var(--ae-ink); text-decoration: none; }
  .base-rail-nav { display: grid; gap: .1em; }
  .base-rail-nav a { min-height: 32px; display: flex; align-items: center; gap: .65em; }
  .base-active { color: var(--ae-ink) !important; font-weight: var(--ae-w-medium); }
  .base-active::before { content: ''; width: 2px; height: 1em; background: var(--ae-ink); }
  .base-desk-head { display: flex; align-items: center; justify-content: space-between; gap: 1em; margin-bottom: 1.6em; }
  @media (max-width: 48rem) {
    .base-brand, .base-rail .base-meta { display: none; }
    .base-rail-nav { display: flex; gap: 1.4em; }
    .base-active::before { width: 1em; height: 2px; }
    .base-desk-head { align-items: flex-start; }
  }
`;

export const SPECS = {
  'BASE-1': {
    id: 'BASE-1',
    title: 'Shipped shell',
    move: 'Persistent desktop place rail becomes horizontally scrolling bottom chrome on phone.',
    render(ctx) {
      return `<div class="ae-shell base-shell">
        <aside class="ae-rail base-rail">
          <div class="base-brand">${ctx.brand()}</div>
          <nav class="base-rail-nav" aria-label="Primary">
            <a class="base-active" href="#0" aria-current="page">${ctx.icon('grid')}<span>${ctx.app === 'crucible' ? 'Evals' : 'Queue'}</span></a>
            <a href="#0">${ctx.icon('receipt')}<span>${ctx.app === 'crucible' ? 'Receipts' : 'Runs'}</span></a>
            <a href="#0">${ctx.icon('settings')}<span>Settings</span></a>
          </nav>
          <div class="ae-rail-foot base-meta"><p class="ae-chrome">v0.24.0</p></div>
        </aside>
        <main class="ae-desk"><header class="base-desk-head"><span class="ae-chrome">CURRENT SHIPPED STATE</span>${ctx.command()}</header>${ctx.content()}</main>
      </div>`;
    },
  },
};
