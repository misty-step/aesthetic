export default {
  id: 'PGM-1',
  title: 'Quiet Index',
  family: 'Premium utilitarian minimalism',
  move: 'Treat Studio as a precise editorial colophon and Work as a compact library index.',
  essence:
    'A warmer, airier sibling of current Aesthetic: the same square register and one-size discipline, with hierarchy carried by weight, rules, and deliberate blank paper.',
  layout: 'index',
  statusStyle: 'signal-cell',
  statusNote:
    'A two-cell signal cut from one square: healthy fills the lower cell, attention the upper, failed splits the diagonal, pending leaves a single edge, and unknown uses two opposing corner cuts. Meaning survives without hue and avoids check, yield, and x shorthand.',
  tokens: {
    light: {
      canvas: '#f4f2ed',
      surface: '#fcfbf8',
      wash: '#ebe8e1',
      ink: '#191a1c',
      muted: '#686967',
      line: '#cfcdc6',
      accent: '#244fbe',
      success: '#29704b',
      warning: '#a56216',
      danger: '#a63b35',
    },
    dark: {
      canvas: '#151617',
      surface: '#1b1c1e',
      wash: '#232529',
      ink: '#eeece6',
      muted: '#a6a5a0',
      line: '#3c3d40',
      accent: '#89a8ff',
      success: '#73bd91',
      warning: '#ddb06c',
      danger: '#e08279',
    },
  },
  css: `
    .site {
      background: var(--canvas);
      color: var(--ink);
      font-family: var(--font-geist), Geist, "Helvetica Neue", sans-serif;
      padding: 14px;
    }

    .site-header,
    .site-footer {
      background: var(--surface);
      border: 1px solid var(--line);
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      min-height: 42px;
      padding: 0 14px;
    }

    .site-header { border-bottom: 0; }
    .site-footer { border-top: 0; }

    .brand {
      align-items: center;
      display: flex;
      font-weight: 800;
      letter-spacing: -.025em;
      min-width: 0;
    }

    .brand::after {
      background: var(--accent);
      content: '';
      height: 7px;
      margin-left: 9px;
      width: 7px;
    }

    .view-nav {
      align-items: stretch;
      display: flex;
      gap: 0;
    }

    .view-nav button {
      background: transparent;
      border: 0;
      border-left: 1px solid var(--line);
      color: var(--muted);
      font: inherit;
      font-weight: 550;
      padding: 0 12px;
    }

    .view-nav button[aria-selected='true'] {
      box-shadow: inset 0 -2px 0 var(--accent);
      color: var(--ink);
    }

    .page {
      background: var(--surface);
      border: 1px solid var(--line);
      min-height: 0;
      overflow: hidden;
    }

    .studio {
      display: grid;
      grid-template-columns: minmax(0, 1.45fr) minmax(230px, .55fr);
      height: 100%;
    }

    .offer {
      align-content: end;
      display: grid;
      padding: clamp(24px, 5vw, 72px);
    }

    .offer h1 {
      font-size: inherit;
      font-weight: 800;
      letter-spacing: -.035em;
      line-height: 1.08;
      margin: 0;
      max-width: 42ch;
    }

    .lede {
      border-left: 1px solid var(--line);
      display: grid;
      grid-template-rows: 1fr auto;
      line-height: 1.6;
      padding: clamp(24px, 4vw, 52px);
    }

    .lede p {
      align-self: center;
      color: var(--muted);
      margin: 0;
      max-width: 38ch;
    }

    .action {
      align-items: center;
      background: var(--ink);
      border: 1px solid var(--ink);
      color: var(--surface);
      display: inline-flex;
      font: inherit;
      font-weight: 800;
      gap: 12px;
      justify-content: space-between;
      min-height: 38px;
      padding: 0 12px;
      text-decoration: none;
      transition: opacity 140ms ease, transform 140ms ease;
    }

    .action::after { content: '↗'; font-family: var(--font-geist-mono), monospace; }
    .action:hover { opacity: .78; }
    .action:active { transform: translateY(1px); }
    .action:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

    .work {
      display: grid;
      grid-template-columns: minmax(150px, .3fr) minmax(0, 1fr);
      height: 100%;
    }

    .work::before {
      align-items: end;
      border-right: 1px solid var(--line);
      color: var(--muted);
      content: 'ACTIVE INDEX';
      display: flex;
      font-family: var(--font-geist-mono), monospace;
      letter-spacing: .08em;
      padding: 18px;
    }

    .work-list {
      align-content: center;
      display: grid;
      margin: 0;
      padding: 0;
    }

    .work-row {
      align-items: center;
      border-bottom: 1px solid var(--line);
      display: grid;
      gap: 14px;
      grid-template-columns: 30px minmax(120px, .35fr) minmax(0, 1fr) auto;
      min-height: 68px;
      padding: 10px 18px;
    }

    .work-row:first-child { border-top: 1px solid var(--line); }
    .work-row:hover { background: var(--wash); }
    .work-row strong { font-weight: 800; letter-spacing: -.015em; }
    .work-row p { color: var(--muted); line-height: 1.45; margin: 0; }

    .work-mark,
    .status-mark {
      color: var(--status-color, currentColor);
      height: 16px;
      position: relative;
      width: 16px;
    }

    .status-plate {
      align-content: center;
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      height: 100%;
      padding: clamp(20px, 5vw, 64px);
    }

    .status-item {
      align-content: space-between;
      border-block: 1px solid var(--line);
      border-left: 1px solid var(--line);
      display: grid;
      min-height: 150px;
      padding: 16px;
    }

    .status-item:last-child { border-right: 1px solid var(--line); }
    .status-item span:not(.status-mark) { color: var(--ink); font-weight: 550; }

    @media (max-width: 680px) {
      .site { padding: 8px; }
      .site-header, .site-footer { padding-inline: 10px; }
      .studio { grid-template-columns: 1fr; }
      .offer { align-content: center; padding: 24px; }
      .lede { border-left: 0; border-top: 1px solid var(--line); padding: 18px 24px; }
      .work { grid-template-columns: 1fr; }
      .work::before { border-bottom: 1px solid var(--line); border-right: 0; min-height: 36px; padding: 8px 12px; }
      .work-row { gap: 10px; grid-template-columns: 24px minmax(90px, .4fr) minmax(0, 1fr); min-height: 72px; padding: 8px 12px; }
      .work-row > :last-child { display: none; }
      .status-plate { grid-template-columns: 1fr; padding: 18px; }
      .status-item { border-bottom: 0; border-right: 1px solid var(--line); min-height: 62px; }
      .status-item:last-child { border-bottom: 1px solid var(--line); }
    }

    @media (prefers-reduced-motion: reduce) {
      .action { transition: none; }
    }
  `,
};
