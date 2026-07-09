export const SPECS = {
  'MIN-1': {
    id: 'MIN-1',
    title: 'The Ruled Catalogue',
    move: 'Turn the overview into a compact bibliographic ledger of live specimens.',
    family: 'editorial ledger',
    thesis:
      'A design system is easiest to trust when it reads like a reference index: category rules establish the rhythm, every primitive occupies one disciplined row, and the live proof is never separated from its name.',
    css: `
      /* MIN-1 — a bibliographic ledger, dense without becoming a data table. */
      .gal-mid {
        width: min(76rem, calc(100% - 5rem));
      }

      .ae-desk > .ae-view[data-route='index'] {
        max-width: none;
      }

      .ae-view[data-route='index'] .gal-lede {
        display: grid;
        grid-template-columns: minmax(9rem, 1fr) minmax(0, 3fr);
        gap: 2rem;
        align-items: baseline;
        padding-bottom: 2rem;
        border-bottom: 1px solid var(--ae-ink);
        margin-bottom: 0;
      }

      .ae-view[data-route='index'] .gal-lede p,
      .ae-view[data-route='index'] .gal-lede h2 {
        margin: 0;
      }

      .ae-view[data-route='index'] .gal-groups {
        gap: 0;
      }

      .ae-view[data-route='index'] .gal-groups > section {
        display: grid;
        grid-template-columns: minmax(9rem, 1fr) minmax(0, 3fr);
        gap: 2rem;
        padding: 1.4rem 0 2.6rem;
        border-bottom: 1px solid var(--ae-line);
      }

      .ae-view[data-route='index'] .gal-group-h {
        position: sticky;
        top: 0;
        align-self: start;
        margin: 0;
        padding: 0.75rem 0;
        background: var(--ae-surface);
        z-index: 1;
      }

      .ae-view[data-route='index'] .gal-cards {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        border: 0;
      }

      .ae-view[data-route='index'] .gal-card {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 8rem;
        min-height: 7.2rem;
        border: 0;
        border-top: 1px solid var(--ae-line);
        background: transparent;
        animation: none;
      }

      .ae-view[data-route='index'] .gal-card:nth-child(odd) {
        border-right: 1px solid var(--ae-line);
      }

      .ae-view[data-route='index'] .gal-card:nth-child(odd) .gal-specimen,
      .ae-view[data-route='index'] .gal-card:nth-child(odd) .gal-meta {
        padding-left: 0;
      }

      .ae-view[data-route='index'] .gal-card:nth-child(even) .gal-specimen,
      .ae-view[data-route='index'] .gal-card:nth-child(even) .gal-meta {
        padding-right: 0;
      }

      .ae-view[data-route='index'] .gal-specimen {
        grid-column: 1;
        grid-row: 1;
        height: auto;
        min-height: 7.2rem;
        justify-content: flex-start;
        padding: 1rem 1.2rem;
        background: transparent;
      }

      .ae-view[data-route='index'] .gal-meta {
        grid-column: 2;
        grid-row: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        text-align: right;
        padding: 1rem 1.2rem;
        border: 0;
        border-left: 1px solid var(--ae-line);
      }

      .ae-view[data-route='index'] .gal-card:hover .gal-meta,
      .ae-view[data-route='index'] .gal-card:focus-visible .gal-meta {
        background: var(--ae-wash);
      }

      @media (max-width: 900px) {
        .gal-mid { width: min(100% - 2rem, 76rem); }

        .ae-view[data-route='index'] .gal-lede,
        .ae-view[data-route='index'] .gal-groups > section {
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .ae-view[data-route='index'] .gal-group-h {
          position: static;
          padding: 0;
        }
      }

      @media (max-width: 620px) {
        .ae-view[data-route='index'] .gal-cards { grid-template-columns: 1fr; }

        .ae-view[data-route='index'] .gal-card:nth-child(odd) {
          border-right: 0;
        }

        .ae-view[data-route='index'] .gal-card {
          grid-template-columns: minmax(0, 1fr) 7rem;
        }

        .ae-view[data-route='index'] .gal-card .gal-specimen {
          padding-left: 0;
        }

        .ae-view[data-route='index'] .gal-card .gal-meta {
          padding-right: 0;
        }
      }
    `,
  },

  'MIN-2': {
    id: 'MIN-2',
    title: 'The Specimen Atlas',
    move: 'Compose each category as an asymmetric field with one anchoring specimen.',
    family: 'flat editorial atlas',
    thesis:
      'A gallery can reward wandering without becoming decorative: one broad anchor establishes each category, smaller proofs cluster around it, and hard hairlines keep the irregular field precise.',
    css: `
      /* MIN-2 — asymmetric, flat, and governed by the existing group order. */
      .gal-mid {
        width: min(82rem, calc(100% - 5rem));
      }

      .ae-desk > .ae-view[data-route='index'] {
        max-width: none;
      }

      .ae-view[data-route='index'] .gal-lede {
        max-width: 48rem;
        margin-bottom: 4rem;
      }

      .ae-view[data-route='index'] .gal-lede h2 {
        padding-bottom: 0.7rem;
        border-bottom: 1px solid var(--ae-ink);
      }

      .ae-view[data-route='index'] .gal-groups {
        gap: 4.5rem;
      }

      .ae-view[data-route='index'] .gal-groups > section {
        display: grid;
        grid-template-columns: minmax(8rem, 1fr) minmax(0, 5fr);
        gap: 2rem;
        align-items: start;
      }

      .ae-view[data-route='index'] .gal-group-h {
        margin: 0;
        padding-top: 0.8rem;
        border-top: 1px solid var(--ae-ink);
      }

      .ae-view[data-route='index'] .gal-cards {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        grid-auto-flow: dense;
        border: 0;
        gap: 1px;
        background: var(--ae-line);
      }

      .ae-view[data-route='index'] .gal-card {
        border: 0;
        min-height: 10rem;
        animation: none;
      }

      .ae-view[data-route='index'] .gal-card:first-child {
        grid-column: span 2;
        grid-row: span 2;
      }

      .ae-view[data-route='index'] .gal-card:first-child .gal-specimen {
        height: 17.5rem;
        padding: 2rem;
      }

      .ae-view[data-route='index'] .gal-card:nth-child(5n + 3):not(:first-child) {
        grid-column: span 2;
      }

      .ae-view[data-route='index'] .gal-specimen {
        height: 7.2rem;
        background: var(--ae-wash);
      }

      .ae-view[data-route='index'] .gal-meta {
        min-height: 2.8rem;
        display: flex;
        align-items: center;
        margin: 0;
      }

      .ae-view[data-route='index'] .gal-card:hover .gal-specimen,
      .ae-view[data-route='index'] .gal-card:focus-visible .gal-specimen {
        background: var(--ae-surface);
      }

      @media (max-width: 900px) {
        .gal-mid { width: min(100% - 2rem, 82rem); }

        .ae-view[data-route='index'] .gal-groups > section {
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .ae-view[data-route='index'] .gal-cards {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 620px) {
        .ae-view[data-route='index'] .gal-lede { margin-bottom: 3rem; }
        .ae-view[data-route='index'] .gal-groups { gap: 3.5rem; }
        .ae-view[data-route='index'] .gal-cards { grid-template-columns: 1fr; }

        .ae-view[data-route='index'] .gal-card:first-child,
        .ae-view[data-route='index'] .gal-card:nth-child(5n + 3):not(:first-child) {
          grid-column: span 1;
          grid-row: span 1;
        }

        .ae-view[data-route='index'] .gal-card:first-child .gal-specimen,
        .ae-view[data-route='index'] .gal-specimen {
          height: 7.5rem;
          padding: 1.1rem;
        }
      }
    `,
    apply(doc) {
      doc
        .querySelectorAll('.gal-groups > section')
        .forEach((section, index) => {
          section.dataset.atlasSection = String(index + 1).padStart(2, '0');
        });
    },
  },

  'MIN-3': {
    id: 'MIN-3',
    title: 'The Indexed Reading Room',
    move: 'Add a derived contents rail and let the canonical groups read as long-form chapters.',
    family: 'reference reading room',
    thesis:
      'The most useful discovery tool is often a calm table of contents: categories stay visible, chapters breathe like a technical manual, and each live specimen becomes a full-width line in a continuous reference.',
    css: `
      /* MIN-3 — a derived contents rail; all labels come from canonical headings. */
      .gal-mid {
        width: min(78rem, calc(100% - 5rem));
      }

      .ae-desk > .ae-view[data-route='index'] {
        max-width: none;
      }

      .min3-layout {
        display: grid;
        grid-template-columns: 11rem minmax(0, 1fr);
        gap: 4rem;
        align-items: start;
      }

      .min3-index {
        position: sticky;
        top: 0;
        border-top: 1px solid var(--ae-ink);
        padding-top: 0.7rem;
      }

      .min3-index button {
        display: block;
        width: 100%;
        padding: 0.45rem 0;
        color: var(--ae-ink-muted);
        background: transparent;
        border: 0;
        border-bottom: 1px solid var(--ae-line);
        font-family: var(--ae-font-mono);
        font-size: 13px;
        text-align: left;
        text-decoration: none;
        cursor: pointer;
      }

      .min3-index button:hover,
      .min3-index button:focus-visible {
        color: var(--ae-accent);
      }

      .min3-content .gal-lede {
        min-height: 12rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 0 2rem;
        margin-bottom: 0;
        border-top: 1px solid var(--ae-ink);
        border-bottom: 1px solid var(--ae-ink);
      }

      .min3-content .gal-lede h2 {
        margin-top: 0.7rem;
      }

      .min3-content .gal-lede p {
        max-width: 38rem;
        margin-bottom: 0;
      }

      .min3-content .gal-groups {
        gap: 0;
      }

      .min3-content .gal-groups > section {
        scroll-margin-top: 1rem;
        padding: 4rem 0;
        border-bottom: 1px solid var(--ae-ink);
      }

      .min3-content .gal-group-h {
        margin-bottom: 1.5rem;
      }

      .min3-content .gal-cards {
        grid-template-columns: 1fr;
        border: 0;
      }

      .min3-content .gal-card {
        display: grid;
        grid-template-columns: minmax(13rem, 2fr) minmax(8rem, 1fr);
        border: 0;
        border-top: 1px solid var(--ae-line);
        animation: none;
      }

      .min3-content .gal-card:last-child {
        border-bottom: 1px solid var(--ae-line);
      }

      .min3-content .gal-specimen {
        height: 8rem;
        justify-content: flex-start;
        padding: 1.3rem 1.5rem 1.3rem 0;
        background: transparent;
      }

      .min3-content .gal-meta {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        text-align: right;
        padding: 1.3rem 0 1.3rem 1.5rem;
        border-top: 0;
        border-left: 1px solid var(--ae-line);
      }

      .min3-content .gal-card:hover .gal-meta,
      .min3-content .gal-card:focus-visible .gal-meta {
        background: var(--ae-wash);
      }

      @media (max-width: 900px) {
        .gal-mid { width: min(100% - 2rem, 78rem); }
        .min3-layout { grid-template-columns: 1fr; gap: 2.5rem; }

        .min3-index {
          position: static;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0 1rem;
        }
      }

      @media (max-width: 620px) {
        .min3-index { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .min3-content .gal-groups > section { padding: 3rem 0; }

        .min3-content .gal-card {
          grid-template-columns: minmax(0, 1fr) 7rem;
        }

        .min3-content .gal-specimen {
          height: 7.2rem;
          padding-right: 1rem;
        }

        .min3-content .gal-meta {
          padding-left: 1rem;
        }
      }
    `,
    apply(doc) {
      const view = doc.querySelector(".ae-view[data-route='index']");
      if (!view || view.querySelector('.min3-layout')) return;

      const lede = view.querySelector('.gal-lede');
      const groups = view.querySelector('.gal-groups');
      if (!lede || !groups) return;

      const layout = doc.createElement('div');
      layout.className = 'min3-layout';
      const index = doc.createElement('nav');
      index.className = 'min3-index';
      index.setAttribute('aria-label', 'Primitive groups');
      const content = doc.createElement('div');
      content.className = 'min3-content';

      groups.querySelectorAll(':scope > section').forEach((section, i) => {
        const heading = section.querySelector('.gal-group-h');
        const id = `min3-group-${i + 1}`;
        section.id = id;
        if (!heading) return;
        const link = doc.createElement('button');
        link.type = 'button';
        link.textContent = heading.textContent;
        link.addEventListener('click', () =>
          section.scrollIntoView({ block: 'start', behavior: 'auto' }),
        );
        index.appendChild(link);
      });

      view.insertBefore(layout, lede);
      layout.append(index, content);
      content.append(lede, groups);
    },
  },
};
