export const SPECS = {
  'SOFT-1': {
    id: 'SOFT-1',
    title: 'The Composed Ledger',
    move: 'Turn the overview into an asymmetric editorial ledger whose category blocks carry deliberately different measures.',
    family: 'editorial-ledger',
    thesis:
      'Agency polish can come from art-directed proportion rather than decoration: unequal ruled fields, exact alignment, and expansive paper create a composed cover while every primitive remains a live instrument.',
    css: `
      html.soft-1 *, html.soft-1 *::before, html.soft-1 *::after { border-radius: 0 !important; }
      html.soft-1 .gal-card { animation: none; }
      html.soft-1 .gal-mid { width: min(76rem, 100% - 2rem); }
      html.soft-1 .ae-desk > .ae-view { max-width: none; }
      html.soft-1 .gal-lede {
        display: grid;
        grid-template-columns: minmax(0, 4fr) minmax(0, 7fr);
        gap: 2rem;
        align-items: baseline;
        padding-bottom: 2.4em;
        border-bottom: 1px solid var(--ae-line);
      }
      html.soft-1 .gal-lede > * { margin: 0; }
      html.soft-1 .gal-groups {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        gap: 4.5em 2rem;
        padding-block: 3em 5em;
      }
      html.soft-1 .gal-groups > section { min-width: 0; }
      html.soft-1 .gal-groups > section:nth-child(1) { grid-column: 1 / span 5; }
      html.soft-1 .gal-groups > section:nth-child(2) { grid-column: 7 / -1; }
      html.soft-1 .gal-groups > section:nth-child(3) { grid-column: 2 / span 7; }
      html.soft-1 .gal-groups > section:nth-child(4) { grid-column: 9 / -1; }
      html.soft-1 .gal-groups > section:nth-child(5) { grid-column: 1 / span 8; }
      html.soft-1 .gal-groups > section:nth-child(6) { grid-column: 5 / -1; }
      html.soft-1 .gal-group-h {
        display: flex;
        align-items: center;
        gap: 1em;
        margin-bottom: 1em;
      }
      html.soft-1 .gal-group-h::after {
        content: '';
        height: 1px;
        flex: 1;
        background: var(--ae-line);
      }
      html.soft-1 .gal-cards {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      html.soft-1 .gal-groups > section:nth-child(4) .gal-cards { grid-template-columns: 1fr; }
      html.soft-1 .gal-groups > section:nth-child(5) .gal-cards { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      html.soft-1 .gal-card:nth-child(3n + 1) .gal-specimen { background: var(--ae-surface); }
      html.soft-1 .gal-card:hover .gal-specimen,
      html.soft-1 .gal-card:focus-visible .gal-specimen { background: var(--ae-wash); }
      html.soft-1 .src-split {
        grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
        gap: 5em;
      }
      html.soft-1 .src-code { border-inline: 0; }
      @media (max-width: 900px) {
        html.soft-1 .gal-groups { gap: 3.5em 1.5rem; }
        html.soft-1 .gal-groups > section:nth-child(n) { grid-column: span 6; }
        html.soft-1 .gal-groups > section:nth-child(5) .gal-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        html.soft-1 .src-split { grid-template-columns: 1fr; gap: 2.5em; }
      }
      @media (max-width: 767px) {
        html.soft-1 .gal-mid { width: calc(100% - 2rem); }
        html.soft-1 .gal-lede { grid-template-columns: 1fr; gap: 0.7em; padding-bottom: 2em; }
        html.soft-1 .gal-groups { display: flex; padding-block: 2.5em 4em; }
        html.soft-1 .gal-cards,
        html.soft-1 .gal-groups > section:nth-child(5) .gal-cards { grid-template-columns: 1fr; }
      }
    `,
    apply(doc) {
      doc.documentElement.classList.add('soft-1');
    },
  },

  'SOFT-2': {
    id: 'SOFT-2',
    title: 'The Instrument Library',
    move: 'Recompose persistent chrome as a desktop library rail and make every category a labelled run of horizontal specimen records.',
    family: 'library-rail',
    thesis:
      'The premium move is navigational confidence: a quiet permanent rail, catalogue-like indexing, and long ruled records make the gallery feel like a working reference library rather than a card showcase.',
    css: `
      html.soft-2 *, html.soft-2 *::before, html.soft-2 *::after { border-radius: 0 !important; }
      html.soft-2 .gal-card { animation: none; }
      html.soft-2 .ae-screen { max-width: none; }
      html.soft-2 .gal-mid { width: 100%; margin: 0; }
      html.soft-2 .ae-desk { padding-inline: 3rem; }
      html.soft-2 .ae-desk > .ae-view { max-width: 70rem; margin-inline: auto; }
      html.soft-2 .gal-lede {
        display: grid;
        grid-template-columns: 9rem minmax(0, 1fr);
        gap: 2rem;
        padding-bottom: 3em;
      }
      html.soft-2 .gal-lede > * { margin: 0; }
      html.soft-2 .gal-groups { gap: 0; border-top: 1px solid var(--ae-line); }
      html.soft-2 .gal-groups > section {
        display: grid;
        grid-template-columns: 9rem minmax(0, 1fr);
        gap: 2rem;
        padding-block: 2.2em;
        border-bottom: 1px solid var(--ae-line);
      }
      html.soft-2 .gal-group-h { margin: 0; }
      html.soft-2 .gal-cards { border: 0; grid-template-columns: 1fr; }
      html.soft-2 .gal-card {
        display: grid;
        grid-template-columns: minmax(12rem, 2fr) minmax(8rem, 1fr);
        border: 0;
        border-top: 1px solid var(--ae-line);
      }
      html.soft-2 .gal-card:last-child { border-bottom: 1px solid var(--ae-line); }
      html.soft-2 .gal-specimen {
        height: 5.4em;
        justify-content: flex-start;
        border-right: 1px solid var(--ae-line);
      }
      html.soft-2 .gal-meta {
        border: 0;
        display: flex;
        align-items: center;
        padding-inline: 1.4em;
      }
      html.soft-2 .src-split { grid-template-columns: minmax(0, 1fr) minmax(24rem, 1fr); gap: 4em; }
      @media (min-width: 901px) {
        html.soft-2 .ae-screen {
          display: grid;
          grid-template-columns: 11rem minmax(0, 1fr);
          grid-template-rows: minmax(0, 1fr) auto;
        }
        html.soft-2 .site-bar {
          grid-column: 1;
          grid-row: 1 / 3;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 2.8em;
          padding: 2rem 1.5rem;
          border-right: 1px solid var(--ae-line);
        }
        html.soft-2 .site-bar .bar-links { flex-direction: column; align-items: flex-start; gap: 0.8em; }
        html.soft-2 .gal-mid { grid-column: 2; grid-row: 1; }
        html.soft-2 .site-footer { grid-column: 2; grid-row: 2; }
      }
      @media (max-width: 900px) {
        html.soft-2 .ae-desk { padding-inline: 1rem; }
        html.soft-2 .src-split { grid-template-columns: 1fr; gap: 2.5em; }
      }
      @media (max-width: 767px) {
        html.soft-2 .gal-lede,
        html.soft-2 .gal-groups > section { grid-template-columns: 1fr; gap: 1em; }
        html.soft-2 .gal-lede { padding-bottom: 2em; }
        html.soft-2 .gal-groups > section { padding-block: 2em; }
        html.soft-2 .gal-card { grid-template-columns: 1fr; }
        html.soft-2 .gal-specimen { border-right: 0; border-bottom: 1px solid var(--ae-line); }
        html.soft-2 .gal-meta { min-height: 3em; }
      }
    `,
    apply(doc) {
      doc.documentElement.classList.add('soft-2');
    },
  },

  'SOFT-3': {
    id: 'SOFT-3',
    title: 'The Precision Mat',
    move: 'Seat the complete gallery in spacious square wash mats, using nested hairlines and exact responsive grids to create soft depth without cropping or ornament.',
    family: 'soft-precision',
    thesis:
      'Premium softness does not require curves, shadows, or spectacle: generous intervals, surface-on-wash layering, calibrated hairlines, and restrained interaction feedback can make an instrument feel exquisitely finished while every canonical specimen remains immediately visible.',
    css: `
      html.soft-3 *, html.soft-3 *::before, html.soft-3 *::after { border-radius: 0 !important; }
      html.soft-3 .gal-card { animation: none; }
      html.soft-3 .gal-mid { width: min(76rem, 100% - 4rem); }
      html.soft-3 .ae-desk > .ae-view { max-width: none; }
      html.soft-3 .gal-lede {
        display: grid;
        grid-template-columns: minmax(10rem, 1fr) minmax(0, 2fr);
        align-items: baseline;
        gap: 3rem;
        max-width: 58rem;
        padding: 2.5em 0 4.5em;
      }
      html.soft-3 .gal-lede > * { margin: 0; }
      html.soft-3 .gal-groups { gap: 4.5em; padding-bottom: 5em; }
      html.soft-3 .gal-groups > section {
        padding: 1.5rem;
        background: var(--ae-wash);
        border: 1px solid var(--ae-line);
      }
      html.soft-3 .gal-group-h {
        display: flex;
        align-items: center;
        gap: 1em;
        margin: 0 0 1.5em;
      }
      html.soft-3 .gal-group-h::after { content: ''; flex: 1; height: 1px; background: var(--ae-line); }
      html.soft-3 .gal-cards {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1px;
        padding: 1px;
        background: var(--ae-line);
        border: 0;
      }
      html.soft-3 .gal-card {
        min-width: 0;
        border: 0;
        background: var(--ae-surface);
        outline: 1px solid transparent;
        outline-offset: -1px;
      }
      html.soft-3 .gal-specimen {
        height: 7.5em;
        margin: 0.65rem 0.65rem 0;
        border: 1px solid var(--ae-line);
        background: var(--ae-wash);
      }
      html.soft-3 .gal-meta { min-height: 3.2em; border-top: 0; padding-inline: 1.5em; }
      html.soft-3 .gal-card:hover,
      html.soft-3 .gal-card:focus-visible { outline-color: var(--ae-accent); }
      html.soft-3 .gal-card:hover .gal-meta-cls,
      html.soft-3 .gal-card:focus-visible .gal-meta-cls { text-decoration: underline; text-underline-offset: 0.3em; }
      html.soft-3 .src-split {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: 1px;
        padding: 1.5rem;
        background: var(--ae-wash);
        border: 1px solid var(--ae-line);
      }
      html.soft-3 .src-split > * {
        min-width: 0;
        box-sizing: border-box;
        background-color: var(--ae-surface);
        border: 1px solid var(--ae-line);
        padding: 1.5rem;
      }
      html.soft-3 .src-split > .src-code { background: var(--ae-surface); }
      html.soft-3 .src-split > .src-codewrap { padding: 0; }
      html.soft-3 .src-split > .src-codewrap .src-code { border: 0; background: var(--ae-surface); }
      @media (max-width: 900px) {
        html.soft-3 .gal-mid { width: calc(100% - 3rem); }
        html.soft-3 .gal-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        html.soft-3 .src-split { grid-template-columns: 1fr; }
      }
      @media (max-width: 767px) {
        html.soft-3 .gal-mid { width: calc(100% - 2rem); }
        html.soft-3 .gal-lede { grid-template-columns: 1fr; gap: 0.8em; padding-block: 1.5em 3em; }
        html.soft-3 .gal-groups { gap: 3em; padding-bottom: 4em; }
        html.soft-3 .gal-groups > section { padding: 0.75rem; }
        html.soft-3 .gal-group-h { margin: 0.5em 0 1.25em; }
        html.soft-3 .gal-cards { grid-template-columns: 1fr; }
        html.soft-3 .gal-specimen { height: 6.5em; }
        html.soft-3 .src-split { padding: 0.75rem; }
        html.soft-3 .src-split > * { padding: 1rem; }
      }
    `,
    apply(doc) {
      doc.documentElement.classList.add('soft-3');
    },
  },
};
