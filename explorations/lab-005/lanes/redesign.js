export default {
  id: 'PGR-1',
  title: 'Civic Register',
  family: 'close-family page redesign',
  move: 'Turn the existing Studio and Work views into one calm public-service register: a decisive offer, then an exact project index.',
  essence:
    'Misty Step as dependable civic infrastructure. Square, typographic, quiet, and precise, with just enough editorial scale to make the offer unmistakable.',
  layout: 'register',
  statusStyle: 'bracketed',
  statusNote:
    'A paired bracket is the invariant. Healthy closes the pair; attention offsets the right bracket; failed breaks both brackets inward; pending leaves the right bracket open; unknown reduces to two level strokes. Hue only corroborates the geometry.',
  tokens: {
    light: {
      canvas: '#e9e9e5',
      surface: '#f7f7f3',
      wash: '#efefea',
      ink: '#17191c',
      muted: '#666b70',
      line: '#c9cbc8',
      accent: '#214fb5',
      success: '#28714a',
      warning: '#9a650d',
      danger: '#a63d38',
    },
    dark: {
      canvas: '#0d1014',
      surface: '#15191e',
      wash: '#1c2127',
      ink: '#f1f1eb',
      muted: '#a9afb5',
      line: '#383e46',
      accent: '#91adff',
      success: '#79c69a',
      warning: '#e2b564',
      danger: '#ed8f88',
    },
  },
  css: `
    .site {
      grid-template-rows: 4rem minmax(0, 1fr) 3rem;
      background: var(--canvas);
      font-size: 14px;
      letter-spacing: -.006em;
    }

    .site-header {
      padding-inline: clamp(1rem, 3.5vw, 3.5rem);
      border-color: var(--line);
    }

    .brand {
      gap: .75rem;
      letter-spacing: .22em;
    }

    .brand svg {
      width: 1rem;
      height: 1rem;
      stroke-width: 1.25;
    }

    .view-nav {
      gap: clamp(.9rem, 2.4vw, 2rem);
    }

    .view-nav button {
      position: relative;
      padding: .45rem 0;
      border-bottom: 1px solid transparent;
      font-weight: 600;
      letter-spacing: .035em;
      transition: color 150ms ease, border-color 150ms ease;
    }

    .view-nav button:hover {
      color: var(--ink);
    }

    .view-nav button[aria-current] {
      border-bottom-color: var(--accent);
    }

    .view-nav button:focus-visible,
    .action:focus-visible,
    .work-row:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 3px;
    }

    .page {
      margin: clamp(.5rem, 1.2vw, 1rem);
      border: 1px solid var(--line);
    }

    .studio {
      background: var(--surface);
    }

    .offer {
      justify-content: flex-end;
      padding: clamp(1.4rem, 6vw, 6rem);
    }

    .offer:after {
      inset: 0 0 42% 54%;
      background-position: center;
      background-size: cover;
      opacity: .075;
    }

    .kicker {
      display: flex;
      align-items: center;
      gap: .7rem;
      margin-bottom: clamp(1.2rem, 4vh, 3rem);
      color: var(--ink);
      font-weight: 600;
      letter-spacing: .14em;
    }

    .kicker:before {
      content: '';
      width: 1.4rem;
      border-top: 1px solid var(--accent);
    }

    .offer h1 {
      max-width: 15ch;
      margin-bottom: clamp(1rem, 2vh, 1.5rem);
      font-size: clamp(2.65rem, 6.6vw, 6.8rem);
      line-height: .91;
      letter-spacing: -.072em;
      text-wrap: balance;
    }

    .lede {
      max-width: 60ch;
      color: var(--muted);
      font-size: clamp(.98rem, 1.35vw, 1.18rem);
      line-height: 1.55;
      text-wrap: pretty;
    }

    .action {
      min-height: 2.65rem;
      margin-top: clamp(1.5rem, 3vh, 2.5rem);
      padding-inline: 1.1rem;
      border-color: var(--ink);
      background: var(--ink);
      color: var(--surface);
      font: 650 12px var(--mono);
      letter-spacing: .02em;
      transition: background 150ms ease, color 150ms ease, transform 100ms ease;
    }

    .action:hover {
      background: transparent;
      color: var(--ink);
    }

    .action:active {
      transform: translateY(1px);
    }

    .work {
      grid-template-rows: auto minmax(0, 1fr) auto;
      background: var(--surface);
    }

    .work-head {
      align-items: start;
      padding: clamp(1.2rem, 3vw, 2.5rem) clamp(1rem, 3.5vw, 3.5rem);
    }

    .work-head h1 {
      font-size: clamp(2.7rem, 5.8vw, 6rem);
      line-height: .88;
      letter-spacing: -.07em;
    }

    .work-head p {
      max-width: 42ch;
      padding-top: .4rem;
      line-height: 1.55;
    }

    .work-list {
      counter-reset: work;
    }

    .work-row {
      counter-increment: work;
      grid-template-columns: 3rem minmax(8rem, .32fr) minmax(16rem, 1fr);
      min-height: clamp(4rem, 9vh, 5.4rem);
      padding: .8rem clamp(1rem, 3.5vw, 3.5rem);
      transition: background 150ms ease;
    }

    .work-row:before {
      content: '0' counter(work);
      color: var(--muted);
      font: 550 10px var(--mono);
      font-variant-numeric: tabular-nums;
    }

    .work-mark {
      display: none;
    }

    .work-row b {
      font-weight: 700;
      letter-spacing: -.025em;
    }

    .work-row span:last-child {
      max-width: 64ch;
      line-height: 1.45;
    }

    .work-row:hover {
      background: var(--wash);
    }

    .status-plate {
      grid-template-columns: repeat(5, minmax(7rem, 1fr));
      border-color: var(--line);
      background: var(--wash);
    }

    .status-item {
      min-height: 3.15rem;
      gap: .7rem;
      padding: .65rem clamp(.65rem, 1.4vw, 1.1rem);
      border-color: var(--line);
      color: var(--ink);
      font-weight: 600;
      letter-spacing: .055em;
    }

    .status-mark {
      width: 1.35rem;
      height: 1rem;
    }

    .status-mark svg {
      stroke-width: 1.25;
      stroke-linecap: square;
      stroke-linejoin: miter;
    }

    .status-item[data-state='unknown'] .status-mark {
      color: var(--muted);
    }

    .site-footer {
      padding-inline: clamp(1rem, 3.5vw, 3.5rem);
      border-color: var(--line);
      letter-spacing: .025em;
    }

    @media (max-width: 620px) {
      .site {
        grid-template-rows: auto minmax(0, 1fr) 2.75rem;
        font-size: 13px;
      }

      .site-header {
        min-height: 4.4rem;
        padding: .8rem 1rem .65rem;
      }

      .brand {
        margin-top: .28rem;
      }

      .page {
        margin: .45rem;
      }

      .offer {
        padding: 1.15rem;
      }

      .offer:after {
        inset: 3rem -2rem 48% 38%;
      }

      .offer h1 {
        max-width: 10ch;
        font-size: clamp(3rem, 14vw, 4.4rem);
      }

      .lede {
        font-size: .96rem;
      }

      .work-head {
        padding: 1.1rem;
      }

      .work-head h1 {
        font-size: 3.2rem;
      }

      .work-row {
        grid-template-columns: 1.8rem 5.8rem minmax(0, 1fr);
        min-height: 4.3rem;
        gap: .55rem;
        padding: .65rem 1rem;
      }

      .work-row span:last-child {
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .status-plate {
        grid-template-columns: repeat(5, 8.25rem);
      }
    }
  `,
};
