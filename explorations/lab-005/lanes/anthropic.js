export default {
  id: 'PGA-1',
  title: 'Misty Register',
  family: 'close-family instrument register',
  move: 'Keep Aesthetic quiet and square, then give every page a narrow calibrated margin that makes navigation, project state, and page position read like one coherent instrument.',
  essence:
    'A precise, full-viewport working sheet: unmistakably Misty Step, but with a more ownable system of margin notation and status cuts.',
  layout: 'register',
  statusStyle: 'register-tick',
  statusNote:
    'Five asymmetric drafting cuts occupy the same two-rail register. Healthy joins both rails; attention opens the upper rail; failed breaks the center; pending advances one rail; unknown leaves only the datum. The silhouettes remain legible without color.',
  tokens: {
    light: {
      canvas: '#f3f4f2',
      surface: '#fbfcfa',
      wash: '#eef0ed',
      ink: '#171a18',
      muted: '#5e6660',
      line: '#cdd2cd',
      accent: '#2456d6',
      success: '#21845a',
      warning: '#99610a',
      danger: '#b83842',
    },
    dark: {
      canvas: '#101311',
      surface: '#151917',
      wash: '#1c211e',
      ink: '#f1f4f1',
      muted: '#aab3ac',
      line: '#343b36',
      accent: '#7da2ff',
      success: '#5bc895',
      warning: '#e5ad52',
      danger: '#ff7c82',
    },
  },
  css: `
.site {
  --register: clamp(2.75rem, 5vw, 4.5rem);
  letter-spacing: -0.006em;
}

.site-header,
.site-footer {
  padding-left: var(--register);
}

.site-header::before,
.site-footer::before {
  content: "";
  position: absolute;
  left: calc(var(--register) - 1rem);
  width: 1px;
  height: 1.25rem;
  background: var(--accent);
}

.site-header,
.site-footer,
.page {
  position: relative;
}

.brand {
  font-weight: 800;
  letter-spacing: 0.24em;
}

.view-nav button {
  min-height: 2rem;
  padding-inline: 0.15rem;
  letter-spacing: 0.025em;
}

.view-nav button[aria-current] {
  border-bottom-color: var(--accent);
}

.page::before {
  content: "";
  position: absolute;
  z-index: 3;
  inset: 0 auto 0 calc(var(--register) - 1rem);
  width: 1px;
  background: var(--line);
  pointer-events: none;
}

.offer {
  padding-left: calc(var(--register) + clamp(1.5rem, 4vw, 4rem));
  padding-right: clamp(1.25rem, 9vw, 9rem);
}

.offer::before {
  content: "STUDIO / 01";
  position: absolute;
  z-index: 2;
  left: calc(var(--register) - 0.72rem);
  top: 50%;
  color: var(--muted);
  font: 700 9px/1 var(--mono);
  letter-spacing: 0.14em;
  writing-mode: vertical-rl;
  transform: translateY(-50%) rotate(180deg);
}

.offer::after {
  inset: 10% 0 10% 54%;
  background-position: left center;
  background-size: auto 100%;
  opacity: 0.095;
}

.kicker {
  margin-bottom: clamp(1.5rem, 5vh, 3.5rem);
  color: var(--ink);
  letter-spacing: 0.16em;
}

.kicker::before {
  content: "";
  display: inline-block;
  width: 1.5rem;
  height: 1px;
  margin: 0 0.65rem 0.25rem 0;
  background: var(--accent);
}

.offer h1 {
  max-width: 17ch;
  margin-bottom: 1.25rem;
  font-size: clamp(2.7rem, 6.7vw, 6.8rem);
  line-height: 0.91;
  letter-spacing: -0.07em;
}

.lede {
  max-width: 47rem;
  line-height: 1.55;
}

.action {
  position: relative;
  min-width: 8rem;
  min-height: 2.8rem;
  padding: 0 2.2rem 0 0.95rem;
  border-color: var(--ink);
  background: var(--ink);
  color: var(--surface);
  text-align: left;
  transition: background-color 140ms ease, color 140ms ease;
}

.action::after {
  content: "→";
  position: absolute;
  right: 0.85rem;
  font-family: var(--mono);
}

.action:hover {
  background: var(--accent);
  border-color: var(--accent);
}

.action:focus-visible,
.view-nav button:focus-visible,
.work-row:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

.work-head {
  min-height: 10rem;
  padding: 1.5rem 1rem 1.5rem calc(var(--register) + 2rem);
  align-items: center;
}

.work-head::before {
  content: "WORK / 02";
  position: absolute;
  left: calc(var(--register) - 0.72rem);
  color: var(--muted);
  font: 700 9px/1 var(--mono);
  letter-spacing: 0.14em;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

.work-head h1 {
  font-size: clamp(2.8rem, 5.5vw, 5.8rem);
  line-height: 0.9;
  letter-spacing: -0.07em;
}

.work-head p {
  padding-left: 1rem;
  border-left: 1px solid var(--line);
}

.work-list {
  padding-left: calc(var(--register) - 1rem);
}

.work-row {
  min-height: 4.25rem;
  grid-template-columns: 2.5rem minmax(8rem, 0.32fr) minmax(0, 1fr);
  padding: 0.9rem 1rem;
}

.work-row:hover {
  background: var(--wash);
}

.work-row:hover b {
  text-decoration: underline;
  text-decoration-color: var(--accent);
  text-underline-offset: 0.28em;
}

.work-mark {
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  border-left: 1px solid var(--line);
  color: var(--ink);
}

.work-mark::after {
  content: "";
  position: absolute;
  left: -1px;
  bottom: 0;
  width: 0.55rem;
  height: 1px;
  background: var(--accent);
}

.status-plate {
  padding-left: calc(var(--register) - 1rem);
  background: var(--surface);
}

.status-item {
  min-height: 3.5rem;
  padding: 0.75rem 0.8rem;
  color: var(--ink);
  letter-spacing: 0.04em;
}

.status-mark {
  position: relative;
  width: 1.15rem;
  height: 1.15rem;
  border-left: 1px solid currentColor;
  border-right: 1px solid currentColor;
}

.status-mark svg {
  display: none;
}

.status-mark::before,
.status-mark::after {
  content: "";
  position: absolute;
  left: -1px;
  height: 1px;
  background: currentColor;
}

.status-mark::before {
  top: 0;
  width: 0.72rem;
}

.status-mark::after {
  bottom: 0;
  width: 1.15rem;
}

.status-item[data-state="attention"] .status-mark {
  border-right-color: transparent;
}

.status-item[data-state="attention"] .status-mark::before {
  left: 0.42rem;
}

.status-item[data-state="failed"] .status-mark {
  border-left-color: transparent;
}

.status-item[data-state="failed"] .status-mark::before {
  top: 0.53rem;
  left: -0.08rem;
  width: 1.3rem;
  transform: rotate(-24deg);
}

.status-item[data-state="failed"] .status-mark::after {
  bottom: 0.53rem;
  left: -0.08rem;
  width: 1.3rem;
  transform: rotate(24deg);
}

.status-item[data-state="pending"] .status-mark {
  border-right-color: transparent;
}

.status-item[data-state="pending"] .status-mark::before {
  width: 0.35rem;
}

.status-item[data-state="pending"] .status-mark::after {
  left: 0.4rem;
  width: 0.72rem;
}

.status-item[data-state="unknown"] .status-mark {
  border-left-color: transparent;
  border-right-color: transparent;
}

.status-item[data-state="unknown"] .status-mark::before {
  top: 0.53rem;
  width: 1.15rem;
}

.status-item[data-state="unknown"] .status-mark::after {
  display: none;
}

.site-footer {
  letter-spacing: 0.04em;
}

@media (max-width: 620px) {
  .site {
    --register: 2.25rem;
  }

  .site-header {
    min-height: 4.25rem;
    padding-left: 1rem;
  }

  .site-header::before {
    display: none;
  }

  .brand {
    letter-spacing: 0.15em;
  }

  .page::before {
    left: var(--register);
  }

  .offer {
    padding: 1.25rem 1rem 1.25rem calc(var(--register) + 1rem);
  }

  .offer::before,
  .work-head::before {
    left: 0.72rem;
  }

  .offer::after {
    inset: 42% 0 0 25%;
  }

  .offer h1 {
    font-size: clamp(2.75rem, 13vw, 4rem);
  }

  .lede {
    font-size: 0.96rem;
  }

  .work-head {
    min-height: auto;
    padding: 1rem 1rem 1rem calc(var(--register) + 1rem);
  }

  .work-head p {
    padding-left: 0;
    border-left: 0;
  }

  .work-list,
  .status-plate {
    padding-left: var(--register);
  }

  .work-row {
    min-height: 4.6rem;
    grid-template-columns: 1.2rem 6.2rem minmax(0, 1fr);
    gap: 0.6rem;
    padding: 0.65rem;
  }

  .work-row span:last-child {
    font-size: 0.82rem;
    line-height: 1.35;
  }

  .status-plate {
    grid-template-columns: repeat(5, 7.8rem);
  }

  .site-footer {
    padding-left: 1rem;
  }

  .site-footer::before {
    display: none;
  }
}
`,
};
