export default [
  {
    id: 'PGI-1',
    title: 'Civic Register',
    family: 'Impeccable',
    move: 'Turn the current single-size Aesthetic register into a precise public index, with one deliberate display exception for the page proposition.',
    essence:
      'Misty Step as an assured technical studio: quiet in posture, exact in detail, and legible before it is expressive.',
    layout: 'register',
    statusStyle: 'signal-cell',
    statusNote:
      'A two-by-two signal cell encodes state through occupied coordinates and interruption, avoiding verdict pictograms while remaining scannable at label size.',
    tokens: {
      light: {
        canvas: '#f4f5f7',
        surface: '#fcfcfd',
        wash: '#eef0f3',
        ink: '#12151a',
        muted: '#555d69',
        line: '#cbd0d8',
        accent: '#315bd8',
        success: '#197046',
        warning: '#8a5800',
        danger: '#a22b36',
      },
      dark: {
        canvas: '#0b0d11',
        surface: '#111419',
        wash: '#191d24',
        ink: '#f3f5f8',
        muted: '#adb5c1',
        line: '#39404b',
        accent: '#86a5ff',
        success: '#64c795',
        warning: '#e7b763',
        danger: '#f0808c',
      },
    },
    css: `
      .site {
        grid-template-rows: 3.75rem minmax(0, 1fr) 2.75rem;
      }

      .site-header {
        padding-inline: clamp(1rem, 2.4vw, 2.25rem);
      }

      .brand {
        font-weight: 800;
        letter-spacing: .32em;
      }

      .brand svg {
        color: var(--accent);
      }

      .view-nav {
        gap: 1.4rem;
      }

      .view-nav button {
        min-height: 2rem;
        color: var(--muted);
        font-weight: 550;
      }

      .view-nav button[aria-current] {
        border-bottom-color: var(--accent);
        color: var(--ink);
      }

      .page {
        grid-template-rows: minmax(0, 1fr) auto;
      }

      .offer {
        justify-content: end;
        padding: clamp(1.25rem, 5.4vw, 5.5rem);
        padding-bottom: clamp(2rem, 8vh, 6.5rem);
      }

      .offer::after {
        inset: 0 0 0 58%;
        border-left: 1px solid var(--line);
        opacity: .1;
      }

      .kicker {
        margin-bottom: 1.2rem;
        color: var(--muted);
        font-weight: 550;
        letter-spacing: .06em;
        text-transform: none;
      }

      .offer h1,
      .work-head h1 {
        color: var(--ink);
        font-weight: 800;
        letter-spacing: -.035em;
        line-height: .98;
        text-wrap: balance;
      }

      .offer h1 {
        max-width: 17ch;
        margin-bottom: 1.25rem;
        font-size: clamp(2.75rem, 6vw, 5.75rem);
      }

      .lede {
        max-width: 66ch;
        color: var(--muted);
        font-size: clamp(1rem, 1.25vw, 1.18rem);
        line-height: 1.62;
        text-wrap: pretty;
      }

      .action {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: .8rem;
        min-height: 2.65rem;
        margin-top: 1.75rem;
        padding-inline: .9rem;
        border-color: var(--ink);
        background: transparent;
        color: var(--ink);
        font-size: .82rem;
        font-weight: 700;
        transition: background-color 180ms cubic-bezier(.22, 1, .36, 1), color 180ms cubic-bezier(.22, 1, .36, 1);
      }

      .action::after {
        content: '→';
        font-family: var(--mono);
        font-weight: 400;
      }

      .action:hover,
      .action:focus-visible {
        background: var(--ink);
        color: var(--surface);
      }

      .action:focus-visible {
        outline: 2px solid var(--accent);
        outline-offset: 3px;
      }

      .work-head {
        align-items: end;
        padding: clamp(1.5rem, 4vw, 3.5rem) clamp(1rem, 2.4vw, 2.25rem) 1.5rem;
      }

      .work-head h1 {
        font-size: clamp(2.35rem, 4vw, 4.25rem);
      }

      .work-head > p {
        max-width: 43ch;
        color: var(--muted);
        text-wrap: pretty;
      }

      .work-row {
        grid-template-columns: 2.25rem minmax(7rem, .32fr) minmax(0, 1fr);
        gap: clamp(.75rem, 2vw, 1.8rem);
        min-height: 4.15rem;
        padding-inline: clamp(1rem, 2.4vw, 2.25rem);
        transition: background-color 160ms cubic-bezier(.22, 1, .36, 1);
      }

      .work-row:hover,
      .work-row:focus-visible {
        background: var(--wash);
      }

      .work-row:focus-visible {
        outline: 2px solid var(--accent);
        outline-offset: -2px;
      }

      .work-mark {
        width: 1.45rem;
        height: 1.45rem;
        border: 1px solid var(--line);
        color: var(--muted);
        font-size: 8px;
      }

      .work-row b {
        font-weight: 750;
      }

      .status-plate {
        grid-template-columns: repeat(5, minmax(7.5rem, 1fr));
        background: var(--surface);
      }

      .status-item {
        min-height: 3.35rem;
        padding-inline: clamp(.65rem, 1.6vw, 1.25rem);
        color: var(--ink);
        font-weight: 550;
        letter-spacing: .01em;
        text-transform: none;
      }

      .status-mark {
        width: 1.08rem;
        height: 1.08rem;
      }

      .status-mark svg {
        stroke-width: 1.4;
        stroke-linecap: square;
        stroke-linejoin: miter;
      }

      .status-item[data-state='unknown'] .status-mark {
        color: var(--muted);
      }

      .site-footer {
        padding-inline: clamp(1rem, 2.4vw, 2.25rem);
      }

      @media (max-width: 620px) {
        .site {
          grid-template-rows: auto minmax(0, 1fr) 2.6rem;
        }

        .site-header {
          min-height: 4rem;
          align-items: center;
        }

        .offer {
          justify-content: center;
          padding: 1.1rem;
          padding-bottom: 1.5rem;
        }

        .offer::after {
          inset: 58% 0 0;
          border-top: 1px solid var(--line);
          border-left: 0;
        }

        .offer h1 {
          max-width: 12ch;
          font-size: clamp(2.7rem, 13vw, 4rem);
          letter-spacing: -.035em;
        }

        .lede {
          max-width: 100%;
          font-size: .98rem;
          line-height: 1.52;
        }

        .action {
          margin-top: 1.3rem;
        }

        .work-head {
          padding: 1.1rem;
        }

        .work-head h1 {
          font-size: 2.65rem;
        }

        .work-row {
          grid-template-columns: 1.5rem 6.5rem minmax(0, 1fr);
          min-height: 3.65rem;
          padding-inline: .8rem;
        }

        .work-row span:last-child {
          font-size: .82rem;
          line-height: 1.35;
        }

        .status-plate {
          grid-template-columns: repeat(5, 7.4rem);
        }

        .status-item {
          min-height: 3rem;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .action,
        .work-row {
          transition: none;
        }
      }
    `,
  },
];
