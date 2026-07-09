export const SPECS = {
  'TASTE-1': {
    id: 'TASTE-1',
    title: 'The Indexed Atlas',
    move: 'Turn each taxonomy band into a ruled index row with one lead specimen and a tight supporting field.',
    family: 'editorial atlas',
    thesis:
      'The gallery should read like a technical atlas: the taxonomy is always the first thing the eye meets, a single live plate establishes each family, and the remaining plates form a measured field rather than a wall of equal cards.',
    css: `
      .ae-view[data-route="index"] {
        padding-bottom: 4em;
      }

      .gal-lede {
        display: grid;
        grid-template-columns: minmax(9em, 1fr) minmax(0, 3fr);
        gap: 2em;
        align-items: start;
        padding-bottom: 2.8em;
        margin-bottom: 0;
        border-bottom: 1px solid var(--ae-ink);
      }

      .gal-lede p {
        max-width: 34em;
        margin: 0;
      }

      .gal-groups {
        gap: 0;
      }

      .gal-groups > section {
        display: grid;
        grid-template-columns: minmax(9em, 1fr) minmax(0, 3fr);
        gap: 2em;
        padding: 2.4em 0 3.2em;
        border-bottom: 1px solid var(--ae-line);
      }

      .gal-group-h {
        position: sticky;
        top: 0;
        align-self: start;
        margin: 0;
        padding-top: 0.2em;
        font-family: var(--ae-font-mono);
        font-size: 13px;
        letter-spacing: 0.1em;
        color: var(--ae-ink-muted);
      }

      .gal-cards {
        grid-template-columns: repeat(6, minmax(0, 1fr));
        border-color: var(--ae-line);
      }

      .gal-card {
        grid-column: span 2;
        min-height: 10.2em;
        animation: none;
      }

      .gal-card:first-child {
        grid-column: span 4;
        grid-row: span 2;
      }

      .gal-card:first-child .gal-specimen {
        height: 13.7em;
        padding: 1.8em;
      }

      .gal-card:not(:first-child) .gal-specimen {
        height: 5.9em;
        padding: 0.9em;
      }

      .gal-meta {
        min-height: 2.6em;
        display: flex;
        align-items: baseline;
      }

      .gal-card:hover,
      .gal-card:focus-visible {
        background: var(--ae-wash);
      }

      @media (max-width: 980px) {
        .gal-cards {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .gal-card,
        .gal-card:first-child {
          grid-column: span 2;
          grid-row: auto;
        }

        .gal-card:first-child .gal-specimen,
        .gal-card:not(:first-child) .gal-specimen {
          height: 7.2em;
          padding: 1em;
        }
      }

      @media (max-width: 767px) {
        .gal-lede,
        .gal-groups > section {
          grid-template-columns: 1fr;
          gap: 1.2em;
        }

        .gal-lede {
          padding-bottom: 2em;
        }

        .gal-groups > section {
          padding: 2em 0 2.4em;
        }

        .gal-group-h {
          position: static;
        }

        .gal-cards {
          grid-template-columns: 1fr;
        }

        .gal-card,
        .gal-card:first-child {
          grid-column: 1;
        }

        .gal-card:first-child .gal-specimen,
        .gal-card:not(:first-child) .gal-specimen {
          height: 6.5em;
        }
      }
    `,
  },

  'TASTE-2': {
    id: 'TASTE-2',
    title: 'The Instrument Ledger',
    move: 'Compress the catalog into numbered horizontal specimen records beneath full-width ruled chapter labels.',
    family: 'instrument ledger',
    thesis:
      'Thirty-three primitives are easier to audit as records than cards. A continuous ledger privileges comparison, makes the live render and its canonical name a single scan unit, and gives dense reference work the cadence of a calibrated instrument.',
    css: `
      .ae-view[data-route="index"] {
        max-width: 58rem;
        margin-inline: auto;
        padding-bottom: 4em;
        counter-reset: specimen;
      }

      .gal-lede {
        display: grid;
        grid-template-columns: 8em minmax(0, 1fr);
        gap: 2em;
        align-items: baseline;
        padding: 0 0 2em;
        margin-bottom: 0;
        border-bottom: 1px solid var(--ae-ink);
      }

      .gal-lede p {
        margin: 0;
        max-width: 38em;
      }

      .gal-groups {
        gap: 0;
      }

      .gal-groups > section {
        display: grid;
        grid-template-columns: 8em minmax(0, 1fr);
        gap: 2em;
        padding: 0;
        border-bottom: 1px solid var(--ae-ink);
      }

      .gal-group-h {
        margin: 0;
        padding: 1.2em 0;
        font-family: var(--ae-font-mono);
        font-size: 13px;
        letter-spacing: 0.1em;
        color: var(--ae-ink-muted);
      }

      .gal-cards {
        display: block;
        border: 0;
        border-left: 1px solid var(--ae-line);
      }

      .gal-card {
        counter-increment: specimen;
        display: grid;
        grid-template-columns: 2.6em minmax(9em, 2fr) minmax(8em, 1fr);
        align-items: stretch;
        min-height: 5.4em;
        border: 0;
        border-bottom: 1px solid var(--ae-line);
        animation: none;
      }

      .gal-card:last-child {
        border-bottom: 0;
      }

      .gal-card::before {
        content: counter(specimen, decimal-leading-zero);
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid var(--ae-line);
        font-family: var(--ae-font-mono);
        font-size: 11px;
        color: var(--ae-ink-faint);
      }

      .gal-specimen {
        grid-column: 2;
        grid-row: 1;
        height: auto;
        min-height: 5.4em;
        padding: 0.75em 1.2em;
        justify-content: flex-start;
        border: 0;
      }

      .gal-meta {
        grid-column: 3;
        grid-row: 1;
        min-width: 0;
        margin: 0;
        padding: 0.8em 1em;
        display: flex;
        align-items: center;
        border-top: 0;
        border-left: 1px solid var(--ae-line);
      }

      .gal-card:hover,
      .gal-card:focus-visible {
        background: var(--ae-wash);
      }

      .gal-card:hover .gal-specimen,
      .gal-card:focus-visible .gal-specimen {
        background: transparent;
      }

      @media (max-width: 767px) {
        .gal-lede,
        .gal-groups > section {
          grid-template-columns: 1fr;
          gap: 0;
        }

        .gal-lede {
          padding-bottom: 1.6em;
        }

        .gal-group-h {
          padding: 1.5em 0 0.8em;
        }

        .gal-cards {
          border-top: 1px solid var(--ae-line);
          border-left: 0;
        }

        .gal-card {
          grid-template-columns: 2.4em minmax(0, 1fr);
          grid-template-rows: minmax(5.8em, auto) auto;
        }

        .gal-card::before {
          grid-row: 1 / 3;
        }

        .gal-specimen {
          grid-column: 2;
          grid-row: 1;
          min-height: 5.8em;
          padding: 0.8em;
        }

        .gal-meta {
          grid-column: 2;
          grid-row: 2;
          padding: 0.55em 0.8em;
          border-top: 1px solid var(--ae-line);
          border-left: 0;
        }
      }
    `,
  },

  'TASTE-3': {
    id: 'TASTE-3',
    title: 'The Six Rooms',
    move: 'Stage each family as an alternating exhibition room with a dominant threshold plate and an asymmetric twelve-column wall.',
    family: 'curatorial rooms',
    thesis:
      'A design system deserves discovery as well as lookup. Six spatially distinct rooms create memory through rhythm: headings alternate edges, the first specimen opens each chapter at double measure, and the remaining live plates settle into a deliberately uneven wall.',
    css: `
      .ae-view[data-route="index"] {
        padding-bottom: 5em;
      }

      .gal-lede {
        width: min(38em, 82%);
        padding: 1.2em 0 4.2em;
        margin: 0;
        border-bottom: 1px solid var(--ae-ink);
      }

      .gal-lede h2 {
        margin-bottom: 1.4em;
      }

      .gal-lede p {
        max-width: 31em;
        margin: 0;
      }

      .gal-groups {
        gap: 0;
      }

      .gal-groups > section {
        display: grid;
        grid-template-columns: minmax(7em, 2fr) minmax(0, 10fr);
        gap: 2em;
        padding: 4.5em 0 5.2em;
        border-bottom: 1px solid var(--ae-line);
      }

      .gal-groups > section:nth-child(even) {
        grid-template-columns: minmax(0, 10fr) minmax(7em, 2fr);
      }

      .gal-groups > section:nth-child(even) .gal-group-h {
        grid-column: 2;
        grid-row: 1;
        text-align: right;
      }

      .gal-groups > section:nth-child(even) .gal-cards {
        grid-column: 1;
        grid-row: 1;
      }

      .gal-group-h {
        position: sticky;
        top: 0;
        align-self: start;
        margin: 0;
        padding-top: 0.1em;
        font-family: var(--ae-font-mono);
        font-size: 13px;
        letter-spacing: 0.12em;
        color: var(--ae-ink-muted);
      }

      .gal-cards {
        grid-template-columns: repeat(12, minmax(0, 1fr));
        border: 0;
        gap: 1px;
        background: var(--ae-line);
      }

      .gal-card {
        grid-column: span 4;
        min-height: 10.5em;
        border: 0;
        animation: none;
      }

      .gal-card:first-child {
        grid-column: span 8;
      }

      .gal-card:nth-child(5n + 4) {
        grid-column: span 8;
      }

      .gal-card:nth-child(5n + 5) {
        grid-column: span 4;
      }

      .gal-card:first-child .gal-specimen,
      .gal-card:nth-child(5n + 4) .gal-specimen {
        height: 10em;
      }

      .gal-card:not(:first-child):not(:nth-child(5n + 4)) .gal-specimen {
        height: 7.2em;
      }

      .gal-meta {
        min-height: 2.6em;
      }

      .gal-card:hover,
      .gal-card:focus-visible {
        background: var(--ae-wash);
      }

      @media (max-width: 1020px) {
        .gal-groups > section,
        .gal-groups > section:nth-child(even) {
          grid-template-columns: 1fr;
          gap: 1.4em;
          padding: 3.4em 0 4em;
        }

        .gal-groups > section:nth-child(even) .gal-group-h,
        .gal-groups > section:nth-child(even) .gal-cards {
          grid-column: 1;
          grid-row: auto;
          text-align: left;
        }

        .gal-group-h {
          position: static;
        }
      }

      @media (max-width: 767px) {
        .gal-lede {
          width: 100%;
          padding: 0 0 2.6em;
        }

        .gal-groups > section,
        .gal-groups > section:nth-child(even) {
          padding: 2.6em 0 3em;
        }

        .gal-cards {
          grid-template-columns: 1fr;
        }

        .gal-card,
        .gal-card:first-child,
        .gal-card:nth-child(5n + 4),
        .gal-card:nth-child(5n + 5) {
          grid-column: 1;
        }

        .gal-card:first-child .gal-specimen,
        .gal-card:nth-child(5n + 4) .gal-specimen,
        .gal-card:not(:first-child):not(:nth-child(5n + 4)) .gal-specimen {
          height: 6.5em;
        }
      }
    `,
  },
};
