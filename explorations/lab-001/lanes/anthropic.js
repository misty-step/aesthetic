export const CSS = `
.anth-path,
.anth-command {
  height: 100dvh;
  min-width: 0;
  overflow: hidden;
  background: var(--ae-surface);
  color: var(--ae-ink);
  font: 16px/1.8 var(--ae-font);
}

.anth-path {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
}

.anth-path-ledger {
  width: min(calc(100% - 3rem), var(--ae-measure));
  margin-inline: auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-inline: 1px solid var(--ae-line);
  border-bottom: 1px solid var(--ae-line);
  font-size: 13px;
  font-family: var(--ae-font-mono);
}

.anth-path-step {
  min-width: 0;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: var(--ae-space-2);
  padding: var(--ae-space-3) var(--ae-space-4);
  border-right: 1px solid var(--ae-line);
  color: var(--ae-ink-muted);
  text-decoration: none;
  white-space: nowrap;
}

.anth-path-step:last-child {
  border-right: 0;
}

.anth-path-step[aria-current='page'] {
  color: var(--ae-ink);
  font-weight: var(--ae-w-medium);
}

.anth-path-step svg {
  width: 1em;
  height: 1em;
  color: var(--ae-ink-faint);
}

.anth-path-step[aria-current='page'] svg {
  color: var(--ae-accent);
}

.anth-path-step:focus-visible,
.anth-history-link:focus-visible {
  outline: 2px solid var(--ae-accent);
  outline-offset: -2px;
}

.anth-path-stage,
.anth-command-stage {
  min-width: 0;
  min-height: 0;
  overflow-y: auto;
}

.anth-path-stage {
  padding: var(--ae-space-7) var(--ae-space-6);
}

.anth-path-content,
.anth-command-content {
  width: min(100%, var(--ae-measure-wide));
  margin-inline: auto;
}

.anth-command {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
}

.anth-command-head {
  display: grid;
  grid-template-columns: minmax(8rem, 1fr) minmax(16rem, 32rem) minmax(8rem, 1fr);
  align-items: stretch;
  border-bottom: 1px solid var(--ae-line);
  font-size: 13px;
}

.anth-history {
  display: flex;
  min-width: 0;
}

.anth-history:last-child {
  justify-content: flex-end;
}

.anth-history-link {
  min-width: 0;
  display: inline-flex;
  align-items: center;
  gap: var(--ae-space-2);
  padding: var(--ae-space-4) var(--ae-space-5);
  color: var(--ae-ink-muted);
  font-family: var(--ae-font-mono);
  font-weight: var(--ae-w-medium);
  text-decoration: none;
  transition: color var(--ae-quick) var(--ae-ease);
}

.anth-history-link:hover {
  color: var(--ae-ink);
}

.anth-history-link svg {
  width: 1em;
  height: 1em;
}

.anth-history-next svg {
  transform: rotate(180deg);
}

.anth-command-call {
  display: grid;
  place-items: center;
  padding: var(--ae-space-2);
  border-inline: 1px solid var(--ae-line);
  background: var(--ae-wash);
}

.anth-command-call > * {
  width: 100%;
  justify-content: center;
  border-color: var(--ae-ink);
  color: var(--ae-ink);
}

.anth-command-stage {
  padding: var(--ae-space-6);
}

@media (max-width: 40rem) {
  .anth-path-ledger {
    width: 100%;
    grid-template-columns: 1fr;
    border-inline: 0;
  }

  .anth-path-step {
    min-height: 2.35rem;
    padding: var(--ae-space-1) 1.2rem;
    border-right: 0;
    border-bottom: 1px solid var(--ae-line);
  }

  .anth-path-step:not([aria-current='page']) {
    color: var(--ae-ink-faint);
  }

  .anth-path-stage,
  .anth-command-stage {
    padding: var(--ae-space-5) 1.2rem;
  }

  .anth-command-head {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .anth-command-call {
    grid-column: 1 / -1;
    grid-row: 1;
    padding: var(--ae-space-3) 1.2rem;
    border-inline: 0;
    border-bottom: 1px solid var(--ae-line);
  }

  .anth-history {
    grid-row: 2;
  }

  .anth-history:last-child {
    border-left: 1px solid var(--ae-line);
  }

  .anth-history-link {
    width: 100%;
    padding: var(--ae-space-2) 1.2rem;
  }

  .anth-history:last-child .anth-history-link {
    justify-content: flex-end;
  }
}

@media (prefers-reduced-motion: reduce) {
  .anth-history-link {
    transition: none;
  }
}
`;

export const SPECS = {
  'ANTH-1': {
    id: 'ANTH-1',
    title: 'Object path',
    move: 'Remove global chrome; the selected object is reached through a centered breadcrumb ledger.',
    render(ctx) {
      return `<section class="anth-path">
        <nav class="anth-path-ledger" aria-label="Object path">
          <a class="anth-path-step" href="#index">${ctx.icon('grid')}<span>Index</span></a>
          <a class="anth-path-step" href="#collection">${ctx.icon('receipt')}<span>Collection</span></a>
          <a class="anth-path-step" href="#current" aria-current="page">${ctx.icon('check')}<span>Current object</span></a>
        </nav>
        <main class="anth-path-stage"><div class="anth-path-content">${ctx.content()}</div></main>
      </section>`;
    },
  },
  'ANTH-2': {
    id: 'ANTH-2',
    title: 'Command history',
    move: 'Make command search the only global wayfinding; keep only contextual back and forward history visible.',
    render(ctx) {
      return `<section class="anth-command">
        <header class="anth-command-head">
          <nav class="anth-history" aria-label="Back history"><a class="anth-history-link" href="#back">${ctx.icon('chevron')}<span>Back</span></a></nav>
          <div class="anth-command-call">${ctx.command()}</div>
          <nav class="anth-history" aria-label="Forward history"><a class="anth-history-link anth-history-next" href="#forward"><span>Forward</span>${ctx.icon('chevron')}</a></nav>
        </header>
        <main class="anth-command-stage"><div class="anth-command-content">${ctx.content()}</div></main>
      </section>`;
    },
  },
};
