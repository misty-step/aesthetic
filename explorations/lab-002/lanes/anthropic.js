export const SPECS = {
  'ANTH-1': {
    id: 'ANTH-1',
    title: 'The focus aperture',
    move: 'Keep the complete gallery in a compact index while a sticky aperture magnifies the specimen under hover or keyboard focus.',
    family: 'focus-and-context atlas',
    thesis:
      'A component gallery should preserve orientation while inviting inspection: the whole system remains visible as context, and one live specimen becomes lucid without opening a route or rearranging the field.',
    css: `
      *, *::before, *::after { border-radius: 0 !important; }
      .gal-card { animation: none !important; }

      .gal-mid {
        width: min(92rem, 100% - 2rem);
      }

      [data-route="index"] {
        max-width: none !important;
        display: grid;
        grid-template-columns: minmax(18rem, 5fr) minmax(0, 7fr);
        gap: 1px 2rem;
        align-items: start;
      }

      [data-route="index"] .gal-lede {
        grid-column: 1 / -1;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 3rem;
        border-bottom: 1px solid var(--ae-line);
        padding-bottom: 1.5rem;
        margin-bottom: 2rem;
      }

      [data-route="index"] .gal-lede p {
        max-width: 42em;
        margin: 0;
        text-align: right;
      }

      .anth-aperture {
        position: sticky;
        top: 0;
        grid-column: 1;
        min-width: 0;
        border: 1px solid var(--ae-line);
        background: var(--ae-surface);
      }

      .anth-aperture .gal-specimen {
        height: min(42vh, 22rem);
        min-height: 14rem;
        padding: 2rem;
        background: var(--ae-wash);
        pointer-events: none;
      }

      .anth-aperture .gal-meta {
        min-height: 3.5rem;
        display: flex;
        align-items: flex-end;
        border-top: 1px solid var(--ae-line);
        padding: .75rem 1rem;
        margin: 0;
      }

      .anth-aperture .gal-meta-cls {
        color: var(--ae-accent);
        font-weight: var(--ae-w-medium);
      }

      [data-route="index"] .gal-groups {
        grid-column: 2;
        gap: 1.5rem;
      }

      [data-route="index"] .gal-groups > section {
        display: grid;
        grid-template-columns: 7rem minmax(0, 1fr);
        gap: 1rem;
        align-items: start;
      }

      [data-route="index"] .gal-group-h {
        margin: 0;
        padding-top: .65rem;
        color: var(--ae-ink-muted);
      }

      [data-route="index"] .gal-cards {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        border-top: 1px solid var(--ae-line);
        border-left: 1px solid var(--ae-line);
      }

      [data-route="index"] .gal-card {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 7.5rem;
        min-height: 5.25rem;
      }

      [data-route="index"] .gal-specimen {
        height: 5.25rem;
        padding: .65rem;
        background: var(--ae-surface);
      }

      [data-route="index"] .gal-meta {
        border-top: 0;
        border-left: 1px solid var(--ae-line);
        display: flex;
        align-items: flex-end;
        padding: .55rem .65rem;
        margin: 0;
        background: var(--ae-wash);
      }

      [data-route="index"] .gal-card:hover .gal-specimen,
      [data-route="index"] .gal-card:focus-visible .gal-specimen {
        background: var(--ae-wash);
      }

      [data-route="index"] .gal-card:hover,
      [data-route="index"] .gal-card:focus-visible {
        outline: 2px solid var(--ae-ink);
        outline-offset: -2px;
        position: relative;
        z-index: 1;
      }

      [data-route="index"] .gal-card:hover .gal-meta-cls,
      [data-route="index"] .gal-card:focus-visible .gal-meta-cls {
        color: var(--ae-accent);
      }

      @media (max-width: 980px) {
        [data-route="index"] {
          grid-template-columns: minmax(15rem, 2fr) minmax(0, 3fr);
        }
        [data-route="index"] .gal-cards { grid-template-columns: 1fr; }
      }

      @media (max-width: 760px) {
        [data-route="index"] { display: block; }
        [data-route="index"] .gal-lede { display: block; margin-bottom: 1.5rem; }
        [data-route="index"] .gal-lede p { margin-top: 1rem; text-align: left; }
        .anth-aperture { display: none; }
        [data-route="index"] .gal-groups > section { grid-template-columns: 1fr; gap: .75rem; }
        [data-route="index"] .gal-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }

      @media (max-width: 480px) {
        .gal-mid { width: calc(100% - 2rem); }
        [data-route="index"] .gal-cards { grid-template-columns: 1fr; }
        [data-route="index"] .gal-card { grid-template-columns: minmax(0, 1fr) 8rem; }
      }
    `,
    apply(doc) {
      const index = doc.querySelector('.ae-view[data-route="index"]');
      if (!index || index.querySelector('.anth-aperture')) return;

      const cards = [...index.querySelectorAll('.gal-card')];
      if (!cards.length) return;

      const aperture = doc.createElement('aside');
      aperture.className = 'anth-aperture';
      aperture.setAttribute('aria-hidden', 'true');

      const show = (card) => {
        const specimen = card.querySelector('.gal-specimen');
        const meta = card.querySelector('.gal-meta');
        if (!specimen || !meta) return;
        aperture.replaceChildren(
          specimen.cloneNode(true),
          meta.cloneNode(true),
        );
      };

      show(cards[0]);
      index
        .querySelector('.gal-lede')
        .insertAdjacentElement('afterend', aperture);

      for (const card of cards) {
        card.addEventListener('pointerenter', () => show(card));
        card.addEventListener('focus', () => show(card));
      }
    },
  },

  'ANTH-2': {
    id: 'ANTH-2',
    title: 'Six specimen drawers',
    move: 'Stand the six canonical families beside one another as narrow, vertically scanned drawers.',
    family: 'comparative cabinet',
    thesis:
      'The gallery should reward comparison across kinds: each family is a persistent drawer, each primitive a compact specimen-and-label unit, and density becomes the navigational aid.',
    css: `
      *, *::before, *::after { border-radius: 0 !important; }
      .gal-card { animation: none !important; }

      .gal-mid {
        width: min(100rem, 100% - 2rem);
      }

      [data-route="index"] {
        max-width: none !important;
      }

      [data-route="index"] .gal-lede {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 3rem;
        border-bottom: 1px solid var(--ae-line);
        padding-bottom: 1.25rem;
        margin-bottom: 1.5rem;
      }

      [data-route="index"] .gal-lede p {
        max-width: 42em;
        margin: 0;
        text-align: right;
      }

      [data-route="index"] .gal-groups {
        display: grid;
        grid-template-columns: repeat(6, minmax(0, 1fr));
        gap: 0;
        border-top: 1px solid var(--ae-line);
        border-left: 1px solid var(--ae-line);
      }

      [data-route="index"] .gal-groups > section {
        min-width: 0;
        border-right: 1px solid var(--ae-line);
        border-bottom: 1px solid var(--ae-line);
      }

      [data-route="index"] .gal-group-h {
        min-height: 3rem;
        margin: 0;
        padding: .8rem .75rem;
        border-bottom: 1px solid var(--ae-line);
        box-sizing: border-box;
        background: var(--ae-surface);
      }

      [data-route="index"] .gal-cards {
        display: flex;
        flex-direction: column;
        border: 0;
      }

      [data-route="index"] .gal-card {
        display: grid;
        grid-template-rows: 5.25rem auto;
        border: 0;
        border-bottom: 1px solid var(--ae-line);
      }

      [data-route="index"] .gal-card:last-child {
        border-bottom: 0;
      }

      [data-route="index"] .gal-specimen {
        height: 5.25rem;
        padding: .7rem;
        background: var(--ae-surface);
      }

      [data-route="index"] .gal-meta {
        border-top: 1px solid var(--ae-line);
        padding: .55rem .75rem .65rem;
        background: var(--ae-wash);
        margin: 0;
      }

      [data-route="index"] .gal-card:hover .gal-meta,
      [data-route="index"] .gal-card:focus-visible .gal-meta {
        background: var(--ae-surface);
      }

      [data-route="index"] .gal-card:hover .gal-meta-cls,
      [data-route="index"] .gal-card:focus-visible .gal-meta-cls {
        color: var(--ae-accent);
      }

      [data-route]:not([data-route="index"]) {
        max-width: 76rem !important;
      }

      [data-route]:not([data-route="index"]) > .ae-group {
        display: grid;
        grid-template-columns: minmax(10rem, 1fr) minmax(0, 3fr);
        gap: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--ae-line);
      }

      [data-route]:not([data-route="index"]) > .ae-group > :not(h2) {
        grid-column: 2;
      }

      [data-route]:not([data-route="index"]) > .ae-group h2 {
        grid-row: 1 / span 3;
      }

      @media (max-width: 1100px) {
        [data-route="index"] .gal-groups { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      }

      @media (max-width: 760px) {
        [data-route="index"] .gal-lede { display: block; }
        [data-route="index"] .gal-lede p { margin-top: 1rem; text-align: left; }
        [data-route="index"] .gal-groups { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        [data-route]:not([data-route="index"]) > .ae-group { grid-template-columns: 1fr; gap: .5rem; }
        [data-route]:not([data-route="index"]) > .ae-group > :not(h2) { grid-column: 1; }
        [data-route]:not([data-route="index"]) > .ae-group h2 { grid-row: auto; }
      }

      @media (max-width: 480px) {
        .gal-mid { width: calc(100% - 2rem); }
        [data-route="index"] .gal-groups { grid-template-columns: 1fr; }
        [data-route="index"] .gal-group-h { min-height: 0; }
        [data-route="index"] .gal-card {
          grid-template-columns: minmax(0, 1fr) 8rem;
          grid-template-rows: 5.75rem;
        }
        [data-route="index"] .gal-specimen { height: 5.75rem; }
        [data-route="index"] .gal-meta {
          border-top: 0;
          border-left: 1px solid var(--ae-line);
          display: flex;
          align-items: flex-end;
        }
      }
    `,
  },

  'ANTH-3': {
    id: 'ANTH-3',
    title: 'The field atlas',
    move: 'Compose the existing families as unequal atlas plates whose spans follow their actual content depth.',
    family: 'asymmetric field atlas',
    thesis:
      'Completeness need not mean uniformity: an atlas makes the breadth of the system visible at once, gives deep families room to breathe, and lets the two content primitives act as a quiet coda.',
    css: `
      *, *::before, *::after { border-radius: 0 !important; }
      .gal-card { animation: none !important; }

      .gal-mid {
        width: min(92rem, 100% - 2rem);
      }

      [data-route="index"] {
        max-width: none !important;
      }

      [data-route="index"] .gal-lede {
        min-height: 8rem;
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        align-content: end;
        gap: 1rem;
        border-left: 1px solid var(--ae-line);
        padding-left: 1rem;
        margin-bottom: 2rem;
      }

      [data-route="index"] .gal-lede h2 { grid-column: 1 / 5; }
      [data-route="index"] .gal-lede p { grid-column: 6 / 13; max-width: 44em; margin: 0; }

      [data-route="index"] .gal-groups {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        gap: 1px;
        background: var(--ae-line);
        border: 1px solid var(--ae-line);
      }

      [data-route="index"] .gal-groups > section {
        min-width: 0;
        background: var(--ae-surface);
        padding: 1rem;
      }

      [data-route="index"] .gal-groups > section:nth-child(1) { grid-column: span 4; }
      [data-route="index"] .gal-groups > section:nth-child(2) { grid-column: span 8; }
      [data-route="index"] .gal-groups > section:nth-child(3) { grid-column: span 7; }
      [data-route="index"] .gal-groups > section:nth-child(4) { grid-column: span 5; }
      [data-route="index"] .gal-groups > section:nth-child(5) { grid-column: span 9; }
      [data-route="index"] .gal-groups > section:nth-child(6) { grid-column: span 3; }

      [data-route="index"] .gal-group-h {
        margin: 0 0 1rem;
        padding-bottom: .75rem;
        border-bottom: 1px solid var(--ae-line);
      }

      [data-route="index"] .gal-cards {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        border: 0;
        gap: 1px;
        background: var(--ae-line);
      }

      [data-route="index"] .gal-groups > section:nth-child(1) .gal-cards,
      [data-route="index"] .gal-groups > section:nth-child(6) .gal-cards {
        grid-template-columns: 1fr;
      }

      [data-route="index"] .gal-groups > section:nth-child(5) .gal-cards {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      [data-route="index"] .gal-card {
        border: 0;
        background: var(--ae-surface);
      }

      [data-route="index"] .gal-specimen {
        height: 6rem;
        background: var(--ae-surface);
      }

      [data-route="index"] .gal-meta {
        margin: 0;
        background: var(--ae-wash);
      }

      [data-route="index"] .gal-card:hover .gal-meta,
      [data-route="index"] .gal-card:focus-visible .gal-meta {
        box-shadow: inset 0 -2px 0 var(--ae-accent);
      }

      [data-route]:not([data-route="index"]) {
        max-width: 78rem !important;
      }

      [data-route]:not([data-route="index"]) .back-link {
        border-bottom: 1px solid var(--ae-line);
        padding-bottom: .8rem;
      }

      [data-route]:not([data-route="index"]) .src-split {
        grid-template-columns: minmax(0, 7fr) minmax(18rem, 5fr);
        gap: 1px;
        background: var(--ae-line);
        border: 1px solid var(--ae-line);
      }

      [data-route]:not([data-route="index"]) .src-split > * {
        background-color: var(--ae-surface);
        min-width: 0;
        padding: 1.5rem;
        box-sizing: border-box;
      }

      [data-route]:not([data-route="index"]) .src-split .src-codewrap {
        padding: 0;
      }

      [data-route]:not([data-route="index"]) .src-split .src-code {
        border: 0;
        min-height: 100%;
        box-sizing: border-box;
      }

      @media (max-width: 980px) {
        [data-route="index"] .gal-groups > section:nth-child(n) { grid-column: span 6; }
        [data-route="index"] .gal-groups > section:nth-child(5) .gal-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }

      @media (max-width: 760px) {
        [data-route="index"] .gal-lede { display: block; min-height: 0; padding-block: 1rem; }
        [data-route="index"] .gal-lede p { margin-top: 1rem; }
        [data-route="index"] .gal-groups > section:nth-child(n) { grid-column: span 12; }
        [data-route]:not([data-route="index"]) .src-split { grid-template-columns: 1fr; }
      }

      @media (max-width: 480px) {
        .gal-mid { width: calc(100% - 2rem); }
        [data-route="index"] .gal-groups > section { padding: .75rem; }
        [data-route="index"] .gal-groups > section:nth-child(n) .gal-cards { grid-template-columns: 1fr; }
        [data-route="index"] .gal-card { display: grid; grid-template-columns: minmax(0, 1fr) 8rem; }
        [data-route="index"] .gal-meta { border-top: 0; border-left: 1px solid var(--ae-line); }
      }
    `,
  },
};
