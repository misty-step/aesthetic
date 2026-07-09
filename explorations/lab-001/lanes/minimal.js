export const CSS = `
.min-ledger,
.min-folio {
  height: 100dvh;
  min-width: 0;
  overflow: hidden;
  background: var(--ae-surface);
  color: var(--ae-ink);
  font-family: var(--ae-font);
  font-size: 16px;
  line-height: 1.8;
}

.min-ledger {
  display: grid;
  grid-template-columns: minmax(12rem, 15rem) minmax(0, 1fr);
}

.min-ledger-rail {
  min-width: 0;
  border-right: 1px solid var(--ae-line);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-size: 13px;
  color: var(--ae-ink-muted);
}

.min-ledger-brand,
.min-ledger-foot {
  padding: var(--ae-space-5);
}

.min-ledger-brand {
  border-bottom: 1px solid var(--ae-line);
}

.min-ledger-index {
  min-height: 0;
  overflow-y: auto;
  padding: var(--ae-space-4) var(--ae-space-5);
}

.min-ledger-group + .min-ledger-group {
  margin-top: var(--ae-space-5);
  padding-top: var(--ae-space-4);
  border-top: 1px solid var(--ae-line);
}

.min-ledger-label {
  margin: 0 0 var(--ae-space-2);
  color: var(--ae-ink-faint);
  font-family: var(--ae-font-mono);
  font-weight: var(--ae-w-medium);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.min-ledger-link {
  display: grid;
  grid-template-columns: 1.4em minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--ae-space-3);
  min-width: 0;
  padding: var(--ae-space-2) 0;
  border-bottom: 1px solid transparent;
  color: var(--ae-ink-muted);
  font-weight: var(--ae-w-regular);
  text-decoration: none;
  transition:
    color var(--ae-quick) var(--ae-ease),
    border-color var(--ae-quick) var(--ae-ease);
}

.min-ledger-link:hover {
  color: var(--ae-ink);
  border-color: var(--ae-line);
}

.min-ledger-link[aria-current='page'] {
  color: var(--ae-ink);
  border-color: var(--ae-accent);
  font-weight: var(--ae-w-medium);
}

.min-ledger-link > svg,
.min-folio-key > svg {
  width: 1.15em;
  height: 1.15em;
  flex: none;
}

.min-ledger-link[aria-current='page'] > svg,
.min-folio-key[aria-current='page'] > svg {
  color: var(--ae-accent);
}

.min-ledger-seq {
  color: var(--ae-ink-faint);
  font-family: var(--ae-font-mono);
}

.min-ledger-foot {
  margin-top: auto;
  border-top: 1px solid var(--ae-line);
}

.min-ledger-desk,
.min-folio-desk {
  min-width: 0;
  min-height: 0;
  overflow-y: auto;
}

.min-ledger-desk {
  padding: var(--ae-space-6) var(--ae-space-7);
}

.min-ledger-content,
.min-folio-content {
  width: min(100%, var(--ae-measure-wide));
  margin-inline: auto;
}

.min-folio {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 5.25rem;
}

.min-folio-frame {
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
}

.min-folio-head {
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--ae-space-4);
  padding: var(--ae-space-4) var(--ae-space-6);
  border-bottom: 1px solid var(--ae-line);
  font-size: 13px;
  color: var(--ae-ink-muted);
}

.min-folio-head > * {
  min-width: 0;
}

.min-folio-desk {
  padding: var(--ae-space-6);
}

.min-folio-index {
  min-width: 0;
  border-left: 1px solid var(--ae-line);
  display: grid;
  grid-template-rows: repeat(4, minmax(0, 1fr));
  background: var(--ae-wash);
  font-size: 13px;
}

.min-folio-key {
  position: relative;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--ae-space-2);
  padding: var(--ae-space-2);
  border-bottom: 1px solid var(--ae-line);
  color: var(--ae-ink-muted);
  font-family: var(--ae-font-mono);
  font-weight: var(--ae-w-medium);
  text-decoration: none;
  transition:
    color var(--ae-quick) var(--ae-ease),
    background-color var(--ae-quick) var(--ae-ease);
}

.min-folio-key:last-child {
  border-bottom: 0;
}

.min-folio-key::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 2px;
  background: transparent;
}

.min-folio-key:hover {
  color: var(--ae-ink);
  background: var(--ae-surface);
}

.min-folio-key[aria-current='page'] {
  color: var(--ae-ink);
  background: var(--ae-surface);
}

.min-folio-key[aria-current='page']::before {
  background: var(--ae-accent);
}

.min-ledger-link:focus-visible,
.min-folio-key:focus-visible {
  outline: 2px solid var(--ae-accent);
  outline-offset: -2px;
}

@media (max-width: 40rem) {
  .min-ledger {
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(0, 1fr);
  }

  .min-ledger-rail {
    border-right: 0;
    border-bottom: 1px solid var(--ae-line);
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .min-ledger-brand,
  .min-ledger-foot {
    display: flex;
    align-items: center;
    padding: var(--ae-space-3) 1.2rem;
  }

  .min-ledger-brand {
    border-bottom: 0;
  }

  .min-ledger-foot {
    margin-top: 0;
    border-top: 0;
  }

  .min-ledger-index {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    overflow: visible;
    padding: 0 1.2rem var(--ae-space-3);
  }

  .min-ledger-group + .min-ledger-group {
    margin-top: 0;
    padding-top: 0;
    border-top: 0;
  }

  .min-ledger-label {
    display: none;
  }

  .min-ledger-link {
    grid-template-columns: 1.3em minmax(0, 1fr);
    gap: var(--ae-space-2);
    padding: var(--ae-space-1) var(--ae-space-2);
    border-bottom-color: var(--ae-line);
  }

  .min-ledger-link:nth-of-type(2n + 1) {
    border-right: 1px solid var(--ae-line);
  }

  .min-ledger-seq {
    display: none;
  }

  .min-ledger-desk {
    padding: var(--ae-space-5) 1.2rem;
  }

  .min-folio {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr) auto;
  }

  .min-folio-frame {
    grid-row: 1;
  }

  .min-folio-head {
    padding: var(--ae-space-3) 1.2rem;
  }

  .min-folio-desk {
    padding: var(--ae-space-5) 1.2rem;
  }

  .min-folio-index {
    grid-row: 2;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: auto;
    border-left: 0;
    border-top: 1px solid var(--ae-line);
  }

  .min-folio-key {
    min-height: 3.75rem;
    padding: var(--ae-space-2) var(--ae-space-1);
    border-right: 1px solid var(--ae-line);
    border-bottom: 0;
  }

  .min-folio-key:last-child {
    border-right: 0;
  }

  .min-folio-key::before {
    inset: 0 0 auto;
    width: auto;
    height: 2px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .min-ledger-link,
  .min-folio-key {
    transition: none;
  }
}
`;

export const SPECS = {
  'MIN-1': {
    id: 'MIN-1',
    title: 'Ledger rail',
    move: 'Persistent left place hierarchy becomes a compact two-column phone index.',
    render(ctx) {
      return `<section class="min-ledger">
        <aside class="min-ledger-rail" aria-label="Fleet places">
          <div class="min-ledger-brand">${ctx.brand()}</div>
          <nav class="min-ledger-index" aria-label="Primary navigation">
            <div class="min-ledger-group">
              <p class="min-ledger-label">Places</p>
              <a class="min-ledger-link" href="#overview" aria-current="page">${ctx.icon('grid')}<span>Overview</span><span class="min-ledger-seq">01</span></a>
              <a class="min-ledger-link" href="#queue">${ctx.icon('receipt')}<span>Queue</span><span class="min-ledger-seq">02</span></a>
            </div>
            <div class="min-ledger-group">
              <p class="min-ledger-label">Record</p>
              <a class="min-ledger-link" href="#runs">${ctx.icon('settings')}<span>Runs</span><span class="min-ledger-seq">03</span></a>
              <a class="min-ledger-link" href="#evidence">${ctx.icon('check')}<span>Evidence</span><span class="min-ledger-seq">04</span></a>
            </div>
          </nav>
          <div class="min-ledger-foot">${ctx.command()}</div>
        </aside>
        <main class="min-ledger-desk">
          <div class="min-ledger-content">${ctx.content()}</div>
        </main>
      </section>`;
    },
  },
  'MIN-2': {
    id: 'MIN-2',
    title: 'Object folio',
    move: 'Objects replace destinations in a right-edge folio that folds into bottom keys on phones.',
    render(ctx) {
      return `<section class="min-folio">
        <div class="min-folio-frame">
          <header class="min-folio-head">
            <div>${ctx.brand()}</div>
            <div>${ctx.command()}</div>
          </header>
          <main class="min-folio-desk">
            <div class="min-folio-content">${ctx.content()}</div>
          </main>
        </div>
        <nav class="min-folio-index" aria-label="Fleet objects">
          <a class="min-folio-key" href="#cards" aria-current="page">${ctx.icon('grid')}<span>Cards</span></a>
          <a class="min-folio-key" href="#runs">${ctx.icon('receipt')}<span>Runs</span></a>
          <a class="min-folio-key" href="#agents">${ctx.icon('settings')}<span>Agents</span></a>
          <a class="min-folio-key" href="#evidence">${ctx.icon('check')}<span>Proof</span></a>
        </nav>
      </section>`;
    },
  },
};
