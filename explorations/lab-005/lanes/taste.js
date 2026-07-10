export default {
  id: 'PGT-1',
  title: 'Proof Register',
  family: 'Misty Step close family',
  move: 'A quiet editorial register whose controls and status marks are assembled from the same one-pixel rule.',
  essence:
    'Keep the current single-size, square, paper-and-ink discipline; improve craft through asymmetric measure, deliberate action anatomy, and status marks that read as pieces of notation rather than interface clip art.',
  layout: 'register',
  statusStyle: 'signal-cell',
  statusNote:
    'A five-cell notation: healthy closes the lower-right corner, attention opens it, failed crosses the register with an offset cut, pending divides the cell, and unknown leaves only opposing corners. Color is confined to the rule itself; the word remains ink.',
  tokens: {
    light: {
      canvas: '#f4f3ef',
      surface: '#fbfaf6',
      wash: '#ebe9e2',
      ink: '#20201e',
      muted: '#706f69',
      line: '#cbc8bf',
      accent: '#315db5',
      success: '#36725a',
      warning: '#a26a19',
      danger: '#a34b42',
    },
    dark: {
      canvas: '#181917',
      surface: '#1e201d',
      wash: '#252722',
      ink: '#ecebe5',
      muted: '#aaa9a1',
      line: '#3d3f39',
      accent: '#86a9ee',
      success: '#77b898',
      warning: '#d6a35a',
      danger: '#d8897e',
    },
  },
  css: `
    .site {
      background: var(--canvas);
      color: var(--ink);
      font-family: Geist, ui-sans-serif, system-ui, sans-serif;
      letter-spacing: -0.012em;
    }

    .site-header {
      display: grid;
      grid-template-columns: minmax(11rem, 0.72fr) minmax(0, 1.28fr);
      align-items: baseline;
      gap: 1.25rem;
      border-bottom: 1px solid var(--line);
      padding: 0.8rem clamp(1rem, 2.6vw, 2.5rem) 0.72rem;
    }

    .brand {
      font-weight: 800;
      color: var(--ink);
      letter-spacing: -0.035em;
    }

    .brand::before {
      content: '';
      display: inline-block;
      width: 0.62em;
      height: 0.62em;
      margin-right: 0.58em;
      border: 1px solid var(--accent);
      border-right-color: transparent;
      vertical-align: -0.02em;
    }

    .view-nav {
      justify-self: end;
      display: flex;
      gap: 1.2rem;
      font-family: 'Geist Mono', ui-monospace, monospace;
      color: var(--muted);
    }

    .view-nav button,
    .view-nav a {
      padding: 0.18rem 0;
      border: 0;
      border-bottom: 1px solid transparent;
      background: transparent;
      color: inherit;
    }

    .view-nav [aria-current='page'],
    .view-nav [aria-selected='true'] {
      border-bottom-color: var(--accent);
      color: var(--ink);
    }

    .page {
      display: grid;
      grid-template-columns: minmax(11rem, 0.72fr) minmax(0, 1.28fr);
      gap: 1.25rem;
      padding: clamp(1.1rem, 3.2vh, 2.2rem) clamp(1rem, 2.6vw, 2.5rem);
    }

    .studio,
    .work {
      grid-column: 2;
      width: min(100%, 51rem);
      align-self: center;
    }

    .offer {
      max-width: 33ch;
      margin: 0 0 1.1rem;
      font-weight: 800;
      letter-spacing: -0.035em;
      text-wrap: balance;
    }

    .lede {
      max-width: 61ch;
      margin: 0;
      color: var(--muted);
      line-height: 1.58;
    }

    .action {
      position: relative;
      display: inline-grid;
      grid-template-columns: auto 2.45rem;
      align-items: stretch;
      min-height: 2.45rem;
      margin-top: 1.55rem;
      padding: 0 2.45rem 0 0.82rem;
      border: 1px solid var(--ink);
      border-radius: 0;
      background: var(--ink);
      color: var(--surface);
      font: 550 1em/1 Geist, ui-sans-serif, system-ui, sans-serif;
      letter-spacing: -0.015em;
      box-shadow: none;
      transition: transform 130ms cubic-bezier(.2,.8,.2,1), background-color 130ms ease, color 130ms ease;
    }

    .action::after {
      content: '→';
      position: absolute;
      inset: -1px -1px -1px auto;
      display: grid;
      width: 2.45rem;
      place-items: center;
      border: 1px solid var(--ink);
      background: var(--surface);
      color: var(--ink);
      font-family: 'Geist Mono', ui-monospace, monospace;
      transition: background-color 130ms ease, color 130ms ease;
    }

    .action:hover {
      background: var(--accent);
      border-color: var(--accent);
    }

    .action:hover::after {
      border-color: var(--accent);
      background: var(--accent);
      color: var(--surface);
    }

    .action:focus-visible {
      outline: 1px solid var(--accent);
      outline-offset: 3px;
    }

    .action:active {
      transform: translateY(1px);
    }

    .work-list {
      border-top: 1px solid var(--ink);
    }

    .work-row {
      display: grid;
      grid-template-columns: 1.2rem minmax(8.5rem, 0.44fr) minmax(0, 1fr);
      gap: 0.8rem;
      align-items: baseline;
      min-height: 3.7rem;
      padding: 0.74rem 0;
      border-bottom: 1px solid var(--line);
      color: var(--ink);
      text-decoration: none;
      transition: border-color 130ms ease, transform 130ms cubic-bezier(.2,.8,.2,1);
    }

    .work-row:hover {
      border-bottom-color: var(--accent);
      transform: translateX(2px);
    }

    .work-mark {
      color: var(--accent);
      font-family: 'Geist Mono', ui-monospace, monospace;
    }

    .status-plate {
      grid-column: 1;
      align-self: end;
      border-top: 1px solid var(--ink);
      padding-top: 0.72rem;
    }

    .status-item {
      display: grid;
      grid-template-columns: 1rem 1fr;
      gap: 0.65rem;
      align-items: center;
      padding: 0.32rem 0;
      color: var(--ink);
      font-family: 'Geist Mono', ui-monospace, monospace;
    }

    .status-mark {
      width: 0.72rem;
      height: 0.72rem;
      border-width: 1px;
      background: transparent;
      box-shadow: none;
    }

    .site-footer {
      display: grid;
      grid-template-columns: minmax(11rem, 0.72fr) minmax(0, 1.28fr);
      gap: 1.25rem;
      border-top: 1px solid var(--line);
      padding: 0.68rem clamp(1rem, 2.6vw, 2.5rem);
      color: var(--muted);
      font-family: 'Geist Mono', ui-monospace, monospace;
    }

    @media (max-width: 767px) {
      .site-header,
      .page,
      .site-footer {
        grid-template-columns: 1fr;
      }

      .site-header {
        gap: 0.58rem;
      }

      .view-nav {
        justify-self: start;
        width: 100%;
        justify-content: space-between;
        gap: 0.5rem;
      }

      .studio,
      .work,
      .status-plate {
        grid-column: 1;
      }

      .page {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .status-plate {
        order: 2;
        width: 100%;
      }

      .work-row {
        grid-template-columns: 1rem minmax(6.8rem, 0.42fr) minmax(0, 1fr);
        gap: 0.52rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .action,
      .action::after,
      .work-row {
        transition: none;
      }
    }
  `,
};
