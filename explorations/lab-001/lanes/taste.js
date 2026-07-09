export const CSS = String.raw`
.taste-stage {
  width: 100%;
  height: 100dvh;
  min-height: 100dvh;
  overflow: hidden;
  color: var(--ae-ink);
  background: var(--ae-surface);
  font-family: var(--ae-font);
  font-size: 16px;
  line-height: 1.35;
}

.taste-stage,
.taste-stage * {
  box-sizing: border-box;
  border-radius: 0;
}

.taste-stage a,
.taste-stage button {
  font: inherit;
}

.taste-stage a {
  color: inherit;
  text-decoration: none;
}

.taste-stage a:focus-visible,
.taste-stage button:focus-visible {
  outline: 2px solid var(--ae-accent);
  outline-offset: -2px;
}

.taste-stage svg {
  width: 1em;
  height: 1em;
  flex: 0 0 auto;
  stroke-width: 1.5;
}

.taste-chrome {
  font-size: 13px;
}

.taste-brand {
  min-width: 0;
  font-weight: var(--ae-w-black);
}

.taste-brand > * {
  max-width: 100%;
}

.taste-command {
  min-width: 0;
}

.taste-desk {
  min-width: 0;
  min-height: 0;
  overflow: auto;
  overscroll-behavior: contain;
  scrollbar-gutter: stable;
}

.taste-desk:focus-visible {
  outline: 2px solid var(--ae-accent);
  outline-offset: -2px;
}

.taste-nav-link {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
  min-height: 2.5rem;
  gap: var(--ae-space-3);
  padding: var(--ae-space-2) var(--ae-space-4);
  border: 0;
  background: transparent;
  color: var(--ae-ink-muted);
  font-weight: var(--ae-w-medium);
  cursor: pointer;
  transition:
    color var(--ae-quick) var(--ae-ease),
    background-color var(--ae-quick) var(--ae-ease),
    transform var(--ae-quick) var(--ae-ease);
}

.taste-nav-link:hover {
  color: var(--ae-ink);
  background: var(--ae-wash);
}

.taste-nav-link:active {
  transform: translateY(1px);
}

.taste-nav-link[aria-current='page'] {
  color: var(--ae-ink);
  font-weight: var(--ae-w-black);
}

.taste-nav-link[aria-current='page']::before {
  position: absolute;
  content: '';
  background: var(--ae-accent);
}

.taste-nav-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.taste-kicker {
  color: var(--ae-ink-faint);
  font-family: var(--ae-font-mono);
  font-weight: var(--ae-w-medium);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* TASTE-1: a conventional place rail, made dense enough to act as an index. */
.taste-index {
  display: grid;
  grid-template-columns: 12rem minmax(0, 1fr);
  grid-template-rows: 3rem minmax(0, 1fr);
}

.taste-index-rail {
  grid-row: 1 / -1;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  min-width: 0;
  min-height: 0;
  border-right: 1px solid var(--ae-line);
  background: var(--ae-surface);
}

.taste-index-brand {
  display: flex;
  align-items: center;
  min-height: 3rem;
  padding: var(--ae-space-3) var(--ae-space-4);
  border-bottom: 1px solid var(--ae-line);
}

.taste-index-nav {
  min-height: 0;
  padding-top: var(--ae-space-4);
  overflow: auto;
}

.taste-index-section {
  padding: var(--ae-space-2) var(--ae-space-4);
}

.taste-index .taste-nav-link {
  width: 100%;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
}

.taste-index .taste-nav-link[aria-current='page'] {
  border-color: var(--ae-line);
  background: var(--ae-wash);
}

.taste-index .taste-nav-link[aria-current='page']::before {
  inset: -1px auto -1px 0;
  width: 2px;
}

.taste-index-foot {
  display: grid;
  gap: var(--ae-space-2);
  padding: var(--ae-space-4);
  border-top: 1px solid var(--ae-line);
}

.taste-index-head {
  grid-column: 2;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--ae-space-4);
  min-width: 0;
  padding: 0 var(--ae-space-4);
  border-bottom: 1px solid var(--ae-line);
}

.taste-index-location {
  display: flex;
  align-items: center;
  min-width: 0;
  gap: var(--ae-space-2);
  color: var(--ae-ink-muted);
}

.taste-index-mobile-brand {
  display: none;
}

.taste-index-location .taste-nav-label {
  color: var(--ae-ink);
  font-weight: var(--ae-w-black);
}

.taste-index-desk {
  grid-column: 2;
  padding: var(--ae-space-5);
}

/* TASTE-2: the work stays put; objects, not places, form the right-hand spine. */
.taste-spine {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 15rem;
  grid-template-rows: 3rem minmax(0, 1fr);
}

.taste-spine-head {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--ae-space-4);
  min-width: 0;
  padding: 0 var(--ae-space-4);
  border-bottom: 1px solid var(--ae-line);
}

.taste-spine-brand {
  display: flex;
  align-items: center;
  min-width: 0;
  gap: var(--ae-space-4);
}

.taste-spine-brand .taste-kicker {
  padding-left: var(--ae-space-4);
  border-left: 1px solid var(--ae-line);
}

.taste-spine-desk {
  grid-column: 1;
  grid-row: 2;
  padding: var(--ae-space-5);
}

.taste-spine-nav {
  grid-column: 2;
  grid-row: 2;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  min-width: 0;
  min-height: 0;
  border-left: 1px solid var(--ae-line);
  background: var(--ae-wash);
}

.taste-spine-title {
  display: grid;
  gap: var(--ae-space-1);
  padding: var(--ae-space-4);
  border-bottom: 1px solid var(--ae-line);
}

.taste-spine-title strong {
  font-weight: var(--ae-w-black);
}

.taste-spine-list {
  min-height: 0;
  overflow: auto;
}

.taste-spine .taste-nav-link {
  width: 100%;
  min-height: 3rem;
  border-bottom: 1px solid var(--ae-line);
  background: var(--ae-surface);
}

.taste-spine .taste-nav-link[aria-current='page'] {
  background: var(--ae-surface);
}

.taste-spine .taste-nav-link[aria-current='page']::before {
  inset: 0 0 0 auto;
  width: 3px;
}

.taste-spine-index {
  margin-left: auto;
  color: var(--ae-ink-faint);
  font-family: var(--ae-font-mono);
  font-variant-numeric: tabular-nums;
}

.taste-spine-foot {
  padding: var(--ae-space-3) var(--ae-space-4);
  border-top: 1px solid var(--ae-line);
  color: var(--ae-ink-muted);
}

@media (max-width: 639px) {
  .taste-index {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: 3rem minmax(0, 1fr) 3.75rem;
  }

  .taste-index-rail {
    grid-column: 1;
    grid-row: 3;
    display: block;
    border-top: 1px solid var(--ae-line);
    border-right: 0;
  }

  .taste-index-brand,
  .taste-index-section,
  .taste-index-foot {
    display: none;
  }

  .taste-index-nav {
    height: 100%;
    padding: 0;
    overflow: hidden;
  }

  .taste-index-links {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    height: 100%;
  }

  .taste-index .taste-nav-link {
    display: grid;
    place-items: center;
    align-content: center;
    gap: var(--ae-space-1);
    min-height: 100%;
    padding: var(--ae-space-1);
    border: 0;
    border-left: 1px solid var(--ae-line);
  }

  .taste-index .taste-nav-link:first-child {
    border-left: 0;
  }

  .taste-index .taste-nav-link[aria-current='page']::before {
    inset: 0 0 auto;
    width: auto;
    height: 2px;
  }

  .taste-index-head {
    grid-column: 1;
    grid-row: 1;
  }

  .taste-index-location .taste-kicker,
  .taste-index-location > svg {
    display: none;
  }

  .taste-index-location {
    display: none;
  }

  .taste-index-mobile-brand {
    display: flex;
    align-items: center;
    min-width: 0;
  }

  .taste-index-desk {
    grid-column: 1;
    grid-row: 2;
    padding: var(--ae-space-3);
    scrollbar-gutter: auto;
  }

  .taste-spine {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: 3rem 3.5rem minmax(0, 1fr);
  }

  .taste-spine-head {
    grid-column: 1;
    grid-row: 1;
    padding: 0 var(--ae-space-3);
  }

  .taste-spine-brand .taste-kicker {
    display: none;
  }

  .taste-spine-nav {
    grid-column: 1;
    grid-row: 2;
    display: block;
    border-bottom: 1px solid var(--ae-line);
    border-left: 0;
    overflow-x: auto;
    overflow-y: hidden;
    background: var(--ae-surface);
    scrollbar-width: none;
  }

  .taste-spine-nav::-webkit-scrollbar {
    display: none;
  }

  .taste-spine-title,
  .taste-spine-foot {
    display: none;
  }

  .taste-spine-list {
    display: flex;
    width: max-content;
    min-width: 100%;
    height: 100%;
    overflow: visible;
  }

  .taste-spine .taste-nav-link {
    width: auto;
    min-width: 7.25rem;
    min-height: 100%;
    border-right: 1px solid var(--ae-line);
    border-bottom: 0;
  }

  .taste-spine .taste-nav-link[aria-current='page']::before {
    inset: auto 0 0;
    width: auto;
    height: 2px;
  }

  .taste-spine-index {
    display: none;
  }

  .taste-spine-desk {
    grid-column: 1;
    grid-row: 3;
    padding: var(--ae-space-3);
    scrollbar-gutter: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .taste-stage *,
  .taste-stage *::before,
  .taste-stage *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
`;

export const SPECS = {
  'TASTE-1': {
    id: 'TASTE-1',
    title: 'Indexed Place Rail',
    move: 'A persistent left index keeps fleet places fixed; on phones the same four destinations become reachable bottom chrome.',
    render(ctx) {
      return `
        <section class="taste-stage taste-index" data-spec="TASTE-1">
          <aside class="taste-index-rail taste-chrome" aria-label="Fleet places">
            <div class="taste-index-brand taste-brand">${ctx.brand()}</div>
            <nav class="taste-index-nav" aria-label="Primary navigation">
              <div class="taste-index-section taste-kicker">Places</div>
              <div class="taste-index-links">
                <a class="taste-nav-link" href="#overview" aria-current="page">
                  ${ctx.icon('grid')}
                  <span class="taste-nav-label">Overview</span>
                </a>
                <a class="taste-nav-link" href="#activity">
                  ${ctx.icon('receipt')}
                  <span class="taste-nav-label">Activity</span>
                </a>
                <a class="taste-nav-link" href="#work">
                  ${ctx.icon('settings')}
                  <span class="taste-nav-label">Work</span>
                </a>
                <a class="taste-nav-link" href="#history">
                  ${ctx.icon('search')}
                  <span class="taste-nav-label">History</span>
                </a>
              </div>
            </nav>
            <div class="taste-index-foot">
              <span class="taste-kicker">Fleet index</span>
            </div>
          </aside>
          <header class="taste-index-head taste-chrome">
            <div class="taste-index-mobile-brand taste-brand">${ctx.brand()}</div>
            <div class="taste-index-location">
              ${ctx.icon('grid')}
              <span class="taste-kicker">Place</span>
              <span class="taste-nav-label">Overview</span>
            </div>
            <div class="taste-command">${ctx.command()}</div>
          </header>
          <main class="taste-desk taste-index-desk" tabindex="-1">${ctx.content()}</main>
        </section>`;
    },
  },
  'TASTE-2': {
    id: 'TASTE-2',
    title: 'Object-First Work Spine',
    move: 'Inverts place-first navigation: the work remains primary while a right-edge object spine becomes a top object strip on phones.',
    render(ctx) {
      return `
        <section class="taste-stage taste-spine" data-spec="TASTE-2">
          <header class="taste-spine-head taste-chrome">
            <div class="taste-spine-brand taste-brand">
              ${ctx.brand()}
              <span class="taste-kicker">Object desk</span>
            </div>
            <div class="taste-command">${ctx.command()}</div>
          </header>
          <main class="taste-desk taste-spine-desk" tabindex="-1">${ctx.content()}</main>
          <aside class="taste-spine-nav taste-chrome" aria-label="Object navigation">
            <div class="taste-spine-title">
              <span class="taste-kicker">Browse by object</span>
              <strong>Work spine</strong>
            </div>
            <nav class="taste-spine-list" aria-label="Object types">
              <a class="taste-nav-link" href="#runs" aria-current="page">
                ${ctx.icon('receipt')}
                <span class="taste-nav-label">Runs</span>
                <span class="taste-spine-index">01</span>
              </a>
              <a class="taste-nav-link" href="#tasks">
                ${ctx.icon('grid')}
                <span class="taste-nav-label">Tasks</span>
                <span class="taste-spine-index">02</span>
              </a>
              <a class="taste-nav-link" href="#events">
                ${ctx.icon('alert')}
                <span class="taste-nav-label">Events</span>
                <span class="taste-spine-index">03</span>
              </a>
              <a class="taste-nav-link" href="#systems">
                ${ctx.icon('settings')}
                <span class="taste-nav-label">Systems</span>
                <span class="taste-spine-index">04</span>
              </a>
            </nav>
            <div class="taste-spine-foot">Select an object class to recut the desk.</div>
          </aside>
        </section>`;
    },
  },
};
