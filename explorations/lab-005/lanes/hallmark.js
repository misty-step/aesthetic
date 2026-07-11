/* Hallmark · pre-emit critique: P5 H5 E4 S5 R5 V4 */
export default {
  id: 'PGH-1',
  title: 'Civic Register',
  family: 'Hallmark',
  move: 'A quiet public record: an anchored masthead, a broad reading field, and statuses drawn as incomplete square corners.',
  essence:
    'Quiet Register discipline with Civic Folio openness. The page behaves like a maintained record, not a marketing shell.',
  layout: 'register',
  statusStyle: 'corner-mark',
  statusNote:
    'Each state is a four-corner construction. Healthy resolves opposing corners; attention leaves the upper edge open; failed breaks the lower corner; pending holds a single diagonal register; unknown is an empty offset pair. Hue belongs only to the strokes.',
  tokens: {
    light: {
      canvas: '#f4f3ef',
      surface: '#fbfaf6',
      wash: '#eceae4',
      ink: '#161817',
      muted: '#686b67',
      line: '#c8c8c1',
      accent: '#294db8',
      success: '#23735a',
      warning: '#a86710',
      danger: '#a43d37',
    },
    dark: {
      canvas: '#121413',
      surface: '#181a19',
      wash: '#202321',
      ink: '#edeee9',
      muted: '#999e98',
      line: '#3b403c',
      accent: '#89a5ff',
      success: '#68b99a',
      warning: '#d6a85b',
      danger: '#dc827b',
    },
  },
  css: `
    /* Hallmark · macrostructure: Long Document · tone: civic-austere · anchor hue: ultramarine */
    .site {
      --gutter: clamp(20px, 3vw, 44px);
      --measure: 66ch;
      background: var(--canvas);
      color: var(--ink);
      font-family: var(--font-geist), Geist, ui-sans-serif, system-ui, sans-serif;
      overflow-x: clip;
    }

    .site-header {
      min-height: 72px;
      padding: 0 var(--gutter);
      border-bottom: 1px solid var(--line);
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: stretch;
      gap: 24px;
    }

    .brand {
      align-self: center;
      color: var(--ink);
      font-weight: 800;
      letter-spacing: -0.035em;
      text-decoration: none;
      white-space: nowrap;
    }

    .view-nav {
      display: flex;
      align-items: stretch;
      border-left: 1px solid var(--line);
    }

    .view-nav button,
    .view-nav a {
      min-height: 44px;
      padding: 0 12px;
      border: 0;
      border-right: 1px solid var(--line);
      background: transparent;
      color: var(--muted);
      font: 550 12px/1 var(--font-geist-mono), Geist Mono, ui-monospace, monospace;
      letter-spacing: 0.02em;
      text-decoration: none;
      white-space: nowrap;
      transition: background-color 120ms cubic-bezier(.2,.7,.2,1), color 120ms cubic-bezier(.2,.7,.2,1);
    }

    .view-nav button:hover,
    .view-nav a:hover,
    .view-nav [aria-current='page'],
    .view-nav [aria-selected='true'] {
      background: var(--surface);
      color: var(--ink);
    }

    .view-nav button:focus-visible,
    .view-nav a:focus-visible,
    .action:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: -2px;
    }

    .view-nav button:disabled,
    .view-nav [aria-disabled='true'],
    .action:disabled,
    .action[aria-disabled='true'] {
      color: var(--muted);
      cursor: not-allowed;
      opacity: .55;
    }

    .page {
      min-height: calc(100dvh - 112px);
      padding: clamp(34px, 6vh, 72px) var(--gutter) 32px;
    }

    .studio {
      min-height: calc(100dvh - 184px);
      display: grid;
      grid-template-columns: minmax(220px, .72fr) minmax(0, 1.28fr);
      grid-template-rows: auto 1fr auto;
      column-gap: clamp(40px, 8vw, 132px);
      align-items: start;
    }

    .offer {
      grid-column: 2;
      max-width: 18ch;
      margin: 0;
      color: var(--ink);
      font-size: clamp(34px, 5.2vw, 78px);
      font-weight: 800;
      line-height: .96;
      letter-spacing: -0.065em;
      overflow-wrap: anywhere;
      min-width: 0;
    }

    .lede {
      grid-column: 2;
      align-self: end;
      max-width: var(--measure);
      margin: clamp(32px, 8vh, 96px) 0 0;
      color: var(--muted);
      font-size: clamp(15px, 1.25vw, 19px);
      font-weight: 400;
      line-height: 1.55;
      letter-spacing: -0.015em;
    }

    .action {
      grid-column: 1;
      grid-row: 1 / span 2;
      align-self: end;
      width: fit-content;
      min-height: 44px;
      padding: 0 0 7px;
      border: 0;
      border-bottom: 2px solid var(--accent);
      border-radius: 0;
      background: transparent;
      color: var(--ink);
      font: 700 14px/1 var(--font-geist), Geist, ui-sans-serif, sans-serif;
      text-decoration: none;
      white-space: nowrap;
      transition: transform 100ms cubic-bezier(.2,.7,.2,1), color 100ms cubic-bezier(.2,.7,.2,1);
    }

    .action:hover { color: var(--accent); }
    .action:active { transform: translateY(1px); }
    .action[data-state='loading'] { color: var(--muted); cursor: progress; }
    .action[data-state='error'] { color: var(--danger); border-color: var(--danger); }
    .action[data-state='success'] { color: var(--success); border-color: var(--success); }

    .work {
      display: grid;
      grid-template-columns: minmax(180px, .55fr) minmax(0, 1.45fr);
      gap: clamp(28px, 7vw, 112px);
      align-items: start;
    }

    .work > h1,
    .work > h2 {
      position: sticky;
      top: 24px;
      margin: 0;
      font-size: clamp(30px, 4.1vw, 58px);
      font-weight: 800;
      line-height: 1;
      letter-spacing: -0.055em;
      overflow-wrap: anywhere;
    }

    .work-list {
      border-top: 1px solid var(--ink);
    }

    .work-row {
      min-height: 88px;
      padding: 16px 0;
      border-bottom: 1px solid var(--line);
      display: grid;
      grid-template-columns: 20px minmax(0, 1fr) minmax(88px, auto);
      gap: 12px;
      align-items: center;
    }

    .work-row:hover { background: var(--surface); }

    .work-mark,
    .status-mark {
      position: relative;
      width: 14px;
      height: 14px;
      color: var(--muted);
      background: none !important;
      border: 0 !important;
      border-radius: 0 !important;
      font-size: 0 !important;
    }

    .work-mark::before,
    .work-mark::after,
    .status-mark::before,
    .status-mark::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .work-mark::before,
    .status-mark::before {
      border-top: 2px solid currentColor;
      border-left: 2px solid currentColor;
      clip-path: polygon(0 0, 70% 0, 70% 16%, 16% 16%, 16% 70%, 0 70%);
    }

    .work-mark::after,
    .status-mark::after {
      border-right: 2px solid currentColor;
      border-bottom: 2px solid currentColor;
      clip-path: polygon(84% 30%, 100% 30%, 100% 100%, 30% 100%, 30% 84%, 84% 84%);
    }

    .work-row:nth-child(1) .work-mark,
    .status-item:nth-child(1) .status-mark { color: var(--success); }

    .work-row:nth-child(2) .work-mark,
    .status-item:nth-child(2) .status-mark { color: var(--warning); }

    .work-row:nth-child(3) .work-mark,
    .status-item:nth-child(3) .status-mark { color: var(--danger); }

    .work-row:nth-child(4) .work-mark,
    .status-item:nth-child(4) .status-mark { color: var(--accent); }

    .work-row:nth-child(4) .work-mark::after,
    .status-item:nth-child(4) .status-mark::after {
      inset: 3px;
      border: 0;
      border-top: 2px solid currentColor;
      transform: rotate(-35deg);
      clip-path: none;
    }

    .work-row:nth-child(5) .work-mark,
    .status-item:nth-child(5) .status-mark { color: var(--muted); }

    .work-row:nth-child(5) .work-mark::before,
    .status-item:nth-child(5) .status-mark::before { opacity: .58; }

    .work-row:nth-child(5) .work-mark::after,
    .status-item:nth-child(5) .status-mark::after { opacity: 0; }

    .status-plate {
      margin-top: clamp(28px, 5vh, 56px);
      padding: 0;
      border-top: 1px solid var(--ink);
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }

    .status-item {
      min-width: 0;
      min-height: 72px;
      padding: 12px;
      border-right: 1px solid var(--line);
      display: grid;
      grid-template-columns: 16px minmax(0, 1fr);
      gap: 12px;
      align-content: center;
      color: var(--ink);
      font: 550 12px/1.3 var(--font-geist-mono), Geist Mono, ui-monospace, monospace;
    }

    .status-item:last-child { border-right: 0; }

    .site-footer {
      min-height: 40px;
      padding: 0 var(--gutter);
      border-top: 1px solid var(--line);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      color: var(--muted);
      font: 500 11px/1 var(--font-geist-mono), Geist Mono, ui-monospace, monospace;
    }

    @media (max-width: 680px) {
      .site-header {
        min-height: 60px;
        grid-template-columns: 1fr;
        gap: 0;
      }

      .brand { min-height: 52px; display: flex; align-items: center; }
      .view-nav { margin: 0 calc(var(--gutter) * -1); border-top: 1px solid var(--line); border-left: 0; }
      .view-nav button, .view-nav a { flex: 1; padding-inline: 8px; }
      .page { padding-top: 28px; }

      .studio,
      .work {
        min-height: calc(100dvh - 152px);
        grid-template-columns: minmax(0, 1fr);
        gap: 28px;
      }

      .offer,
      .lede,
      .action { grid-column: 1; }

      .offer { font-size: clamp(34px, 12vw, 50px); }
      .lede { grid-row: 2; align-self: start; margin-top: 16px; }
      .action { grid-row: 3; align-self: end; }
      .work > h1, .work > h2 { position: static; font-size: 36px; }
      .work-row { min-height: 76px; grid-template-columns: 18px minmax(0, 1fr); }
      .work-row > :last-child { grid-column: 2; }

      .status-plate { grid-template-columns: 1fr; }
      .status-item { min-height: 52px; border-right: 0; border-bottom: 1px solid var(--line); }
      .status-item:last-child { border-bottom: 0; }
      .site-footer { align-items: flex-start; padding-block: 14px; flex-direction: column; }
    }

    @media (prefers-reduced-motion: reduce) {
      .view-nav button,
      .view-nav a,
      .action { transition-duration: 0.01ms; }
    }
  `,
};
