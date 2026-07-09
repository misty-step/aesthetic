export const CSS = `
.brut-root {
  width: 100%;
  height: 100dvh;
  min-width: 0;
  overflow: hidden;
  background: var(--ae-surface);
  color: var(--ae-ink);
  font-family: var(--ae-font);
  font-size: 16px;
  line-height: 1.45;
}

.brut-root *,
.brut-root *::before,
.brut-root *::after {
  box-sizing: border-box;
  border-radius: 0;
}

.brut-root a,
.brut-root button {
  -webkit-tap-highlight-color: transparent;
}

.brut-root a:focus-visible,
.brut-root button:focus-visible,
.brut-root [tabindex]:focus-visible {
  outline: 2px solid var(--ae-accent);
  outline-offset: -2px;
}

.brut-chrome {
  font-family: var(--ae-font-mono);
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.brut-icon {
  display: inline-grid;
  width: 1.25em;
  height: 1.25em;
  place-items: center;
  flex: none;
}

.brut-icon > svg {
  width: 100%;
  height: 100%;
  stroke-width: 1.5;
}

.brut-index {
  display: grid;
  grid-template-columns: 4rem 11rem minmax(0, 1fr);
  grid-template-rows: 3.5rem minmax(0, 1fr);
}

.brut-index-head {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 15rem minmax(0, 1fr) auto;
  min-width: 0;
  border-bottom: 1px solid var(--ae-line);
}

.brut-index-brand,
.brut-index-coordinate,
.brut-index-command {
  min-width: 0;
  display: flex;
  align-items: center;
  padding-inline: var(--ae-space-4);
}

.brut-index-brand {
  border-right: 1px solid var(--ae-line);
  font-weight: var(--ae-w-black);
}

.brut-index-coordinate {
  color: var(--ae-ink-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.brut-index-command {
  justify-content: flex-end;
  border-left: 1px solid var(--ae-line);
}

.brut-index-numbers {
  grid-column: 1;
  grid-row: 2;
  display: grid;
  grid-template-rows: repeat(4, minmax(0, 1fr));
  min-height: 0;
  border-right: 1px solid var(--ae-line);
}

.brut-index-number {
  display: grid;
  place-items: center;
  color: var(--ae-ink-faint);
  border-bottom: 1px solid var(--ae-line);
  font-weight: var(--ae-w-medium);
}

.brut-index-number:last-child {
  border-bottom: 0;
}

.brut-index-nav {
  grid-column: 2;
  grid-row: 2;
  min-width: 0;
  overflow-y: auto;
  border-right: 1px solid var(--ae-line);
}

.brut-index-link {
  min-height: 25%;
  display: grid;
  grid-template-columns: 1.5em minmax(0, 1fr);
  align-content: center;
  column-gap: var(--ae-space-3);
  padding: var(--ae-space-4);
  border-bottom: 1px solid var(--ae-line);
  color: var(--ae-ink-muted);
  text-decoration: none;
  transition:
    color var(--ae-quick) var(--ae-ease),
    background-color var(--ae-quick) var(--ae-ease);
}

.brut-index-link:last-child {
  border-bottom: 0;
}

.brut-index-link:hover {
  color: var(--ae-ink);
  background: var(--ae-wash);
}

.brut-index-link[aria-current='page'] {
  color: var(--ae-ink);
  font-weight: var(--ae-w-black);
  box-shadow: inset 3px 0 0 var(--ae-accent);
}

.brut-index-link small {
  grid-column: 2;
  color: var(--ae-ink-faint);
  font: inherit;
  letter-spacing: inherit;
}

.brut-index-work {
  grid-column: 3;
  grid-row: 2;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.brut-index-register {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--ae-space-4);
  padding: var(--ae-space-3) var(--ae-space-4);
  border-bottom: 1px solid var(--ae-line);
  color: var(--ae-ink-muted);
}

.brut-index-register strong {
  color: var(--ae-ink);
  font-weight: var(--ae-w-black);
}

.brut-canvas {
  min-width: 0;
  min-height: 0;
  overflow: auto;
  padding: var(--ae-space-5);
}

.brut-conveyor {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: 3.5rem minmax(0, 1fr) 5.75rem;
}

.brut-conveyor-head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  min-width: 0;
  border-bottom: 1px solid var(--ae-line);
}

.brut-conveyor-brand,
.brut-conveyor-command {
  display: flex;
  align-items: center;
  min-width: 0;
  padding-inline: var(--ae-space-4);
}

.brut-conveyor-brand {
  gap: var(--ae-space-3);
  font-weight: var(--ae-w-black);
}

.brut-conveyor-brand::before {
  content: '///';
  color: var(--ae-accent);
  letter-spacing: -0.12em;
}

.brut-conveyor-command {
  justify-content: flex-end;
  border-left: 1px solid var(--ae-line);
}

.brut-conveyor-stage {
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 3rem;
}

.brut-conveyor-canvas {
  min-width: 0;
  min-height: 0;
  overflow: auto;
  padding: var(--ae-space-5);
}

.brut-conveyor-gauge {
  display: grid;
  grid-template-rows: repeat(8, minmax(0, 1fr));
  border-left: 1px solid var(--ae-line);
  background: var(--ae-wash);
}

.brut-conveyor-tick {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--ae-line);
  color: var(--ae-ink-faint);
  writing-mode: vertical-rl;
}

.brut-conveyor-tick:last-child {
  border-bottom: 0;
}

.brut-conveyor-nav {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  min-width: 0;
  border-top: 1px solid var(--ae-line);
}

.brut-conveyor-link {
  position: relative;
  min-width: 0;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--ae-space-3);
  padding: var(--ae-space-3) var(--ae-space-4);
  border-right: 1px solid var(--ae-line);
  color: var(--ae-ink-muted);
  text-decoration: none;
  transition:
    color var(--ae-quick) var(--ae-ease),
    background-color var(--ae-quick) var(--ae-ease);
}

.brut-conveyor-link:last-child {
  border-right: 0;
}

.brut-conveyor-link:hover {
  color: var(--ae-ink);
  background: var(--ae-wash);
}

.brut-conveyor-link[aria-current='page'] {
  color: var(--ae-ink);
  font-weight: var(--ae-w-black);
  box-shadow: inset 0 3px 0 var(--ae-accent);
}

.brut-conveyor-index {
  color: var(--ae-ink-faint);
}

.brut-conveyor-arrow {
  color: var(--ae-ink-faint);
}

@media (max-width: 40rem) {
  .brut-index {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: 3.5rem minmax(0, 1fr) 4.5rem;
  }

  .brut-index-head {
    grid-column: 1;
    grid-row: 1;
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .brut-index-brand {
    border-right: 0;
  }

  .brut-index-coordinate,
  .brut-index-numbers,
  .brut-index-link small {
    display: none;
  }

  .brut-index-command {
    border-left: 1px solid var(--ae-line);
  }

  .brut-index-nav {
    grid-column: 1;
    grid-row: 3;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    overflow: hidden;
    border-top: 1px solid var(--ae-line);
    border-right: 0;
  }

  .brut-index-link {
    min-height: 0;
    grid-template-columns: 1fr;
    justify-items: center;
    align-content: center;
    gap: var(--ae-space-1);
    padding: var(--ae-space-2);
    border-right: 1px solid var(--ae-line);
    border-bottom: 0;
    letter-spacing: 0.04em;
  }

  .brut-index-link:last-child {
    border-right: 0;
  }

  .brut-index-link[aria-current='page'] {
    box-shadow: inset 0 3px 0 var(--ae-accent);
  }

  .brut-index-work {
    grid-column: 1;
    grid-row: 2;
  }

  .brut-index-register {
    padding-inline: var(--ae-space-3);
  }

  .brut-canvas,
  .brut-conveyor-canvas {
    padding: var(--ae-space-3);
  }

  .brut-conveyor {
    grid-template-columns: 4.75rem minmax(0, 1fr);
    grid-template-rows: 3.5rem minmax(0, 1fr);
  }

  .brut-conveyor-head {
    grid-column: 1 / -1;
    grid-row: 1;
  }

  .brut-conveyor-stage {
    grid-column: 2;
    grid-row: 2;
    grid-template-columns: minmax(0, 1fr);
  }

  .brut-conveyor-gauge {
    display: none;
  }

  .brut-conveyor-nav {
    grid-column: 1;
    grid-row: 2;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: repeat(4, minmax(0, 1fr));
    border-top: 0;
    border-right: 1px solid var(--ae-line);
  }

  .brut-conveyor-link {
    grid-template-columns: 1fr;
    justify-items: center;
    align-content: center;
    gap: var(--ae-space-1);
    padding: var(--ae-space-2);
    border-right: 0;
    border-bottom: 1px solid var(--ae-line);
  }

  .brut-conveyor-link:last-child {
    border-bottom: 0;
  }

  .brut-conveyor-link[aria-current='page'] {
    box-shadow: inset 3px 0 0 var(--ae-accent);
  }

  .brut-conveyor-label,
  .brut-conveyor-arrow {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .brut-root *,
  .brut-root *::before,
  .brut-root *::after {
    transition: none !important;
  }
}
`;

export const SPECS = {
  'BRUT-1': {
    id: 'BRUT-1',
    title: 'Indexed Place Rail',
    move: 'A numbered place rail makes hierarchy physical, then compacts into a four-cell bottom matrix on phones.',
    render(ctx) {
      return `<div class="brut-root brut-index">
  <header class="brut-index-head brut-chrome">
    <div class="brut-index-brand">${ctx.brand()}</div>
    <div class="brut-index-coordinate" aria-hidden="true">FLEET / CONTROL / ACTIVE SURFACE</div>
    <div class="brut-index-command">${ctx.command()}</div>
  </header>
  <div class="brut-index-numbers brut-chrome" aria-hidden="true">
    <span class="brut-index-number">01</span>
    <span class="brut-index-number">02</span>
    <span class="brut-index-number">03</span>
    <span class="brut-index-number">04</span>
  </div>
  <nav class="brut-index-nav brut-chrome" aria-label="Fleet places">
    <a class="brut-index-link" href="#0" aria-current="page"><span class="brut-icon" aria-hidden="true">${ctx.icon('grid')}</span><span>Control</span><small>Active surface</small></a>
    <a class="brut-index-link" href="#0"><span class="brut-icon" aria-hidden="true">${ctx.icon('chevron')}</span><span>Work</span><small>Queued objects</small></a>
    <a class="brut-index-link" href="#0"><span class="brut-icon" aria-hidden="true">${ctx.icon('receipt')}</span><span>History</span><small>Recorded events</small></a>
    <a class="brut-index-link" href="#0"><span class="brut-icon" aria-hidden="true">${ctx.icon('settings')}</span><span>System</span><small>Fleet controls</small></a>
  </nav>
  <main class="brut-index-work" id="brut-1-control">
    <div class="brut-index-register brut-chrome"><strong>Control / 01</strong><span>Place index</span></div>
    <div class="brut-canvas">${ctx.content()}</div>
  </main>
</div>`;
    },
  },
  'BRUT-2': {
    id: 'BRUT-2',
    title: 'Object Conveyor',
    move: 'A bottom object manifest becomes a left thumb rail on phones, reversing the usual desktop-side/mobile-bottom chrome.',
    render(ctx) {
      return `<div class="brut-root brut-conveyor">
  <header class="brut-conveyor-head brut-chrome">
    <div class="brut-conveyor-brand">${ctx.brand()}</div>
    <div class="brut-conveyor-command">${ctx.command()}</div>
  </header>
  <main class="brut-conveyor-stage">
    <div class="brut-conveyor-canvas">${ctx.content()}</div>
    <div class="brut-conveyor-gauge brut-chrome" aria-hidden="true">
      <span class="brut-conveyor-tick">08</span><span class="brut-conveyor-tick">07</span><span class="brut-conveyor-tick">06</span><span class="brut-conveyor-tick">05</span><span class="brut-conveyor-tick">04</span><span class="brut-conveyor-tick">03</span><span class="brut-conveyor-tick">02</span><span class="brut-conveyor-tick">01</span>
    </div>
  </main>
  <nav class="brut-conveyor-nav brut-chrome" aria-label="Fleet object classes">
    <a class="brut-conveyor-link" href="#0" aria-label="Active objects" aria-current="page"><span class="brut-conveyor-index">01</span><span class="brut-conveyor-label">Active</span><span class="brut-conveyor-arrow" aria-hidden="true">→</span></a>
    <a class="brut-conveyor-link" href="#0" aria-label="Queued objects"><span class="brut-conveyor-index">02</span><span class="brut-conveyor-label">Queued</span><span class="brut-conveyor-arrow" aria-hidden="true">→</span></a>
    <a class="brut-conveyor-link" href="#0" aria-label="Recorded objects"><span class="brut-conveyor-index">03</span><span class="brut-conveyor-label">Recorded</span><span class="brut-conveyor-arrow" aria-hidden="true">→</span></a>
    <a class="brut-conveyor-link" href="#0" aria-label="Defined objects"><span class="brut-conveyor-index">04</span><span class="brut-conveyor-label">Defined</span><span class="brut-conveyor-arrow" aria-hidden="true">→</span></a>
  </nav>
</div>`;
    },
  },
};
