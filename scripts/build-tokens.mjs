/* build the token reference page: site/tokens.html, generated from
   tokens.json so it can never drift from the source of truth. The page is
   itself in-law — built only with the system, view-source is documentation.
   `--check` verifies the committed page is the exact generated+formatted
   output; CI runs that, the same contract as build-recipes. */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as prettier from 'prettier';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const tokens = JSON.parse(read('tokens.json'));
const { version } = JSON.parse(read('package.json'));

const INK_KEYS = [
  'ink',
  'ink-muted',
  'ink-faint',
  'accent',
  'ok',
  'warn',
  'err',
];

/* contrast integrity: the page claims every ratio is recomputed whenever a
   color changes — make that mechanically true. Derive each WCAG 2.1 ratio
   from tokens.color and fail if it disagrees with tokens.contrast, so an
   edited color with a stale contrast block can never publish wrong numbers. */
const luminance = (hex) => {
  const lin = (c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const n = parseInt(hex.slice(1), 16);
  return (
    0.2126 * lin((n >> 16) & 255) +
    0.7152 * lin((n >> 8) & 255) +
    0.0722 * lin(n & 255)
  );
};
const wcag = (a, b) => {
  const l1 = luminance(a);
  const l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};
const drift = [];
for (const mode of ['light', 'dark']) {
  for (const ground of ['surface', 'wash']) {
    for (const ink of INK_KEYS) {
      const stored = tokens.contrast[mode][ground][ink];
      const got = wcag(tokens.color[mode][ink], tokens.color[mode][ground]);
      if (Math.abs(got - stored.ratio) > 0.01)
        drift.push(
          `${mode}/${ground}/${ink}: tokens.json says ${stored.ratio}, colors compute ${got.toFixed(2)}`,
        );
      if (stored.aa !== got >= 4.5 && Math.abs(got - 4.5) > 0.01)
        drift.push(
          `${mode}/${ground}/${ink}: aa=${stored.aa} but ratio ${got.toFixed(2)}`,
        );
    }
  }
}
if (drift.length) {
  console.error(
    'tokens.json contrast is stale vs tokens.color — recompute it:\n  ' +
      drift.join('\n  '),
  );
  process.exit(1);
}

/* the nine color tokens, in identity order (inks, then the line, then the
   steerable accent and the status triplet) */
const COLOR_ORDER = [
  ['surface', 'the ground'],
  ['wash', 'a quiet band'],
  ['ink', 'body ink'],
  ['ink-muted', 'supporting ink'],
  ['ink-faint', 'decoration only'],
  ['line', 'the hairline'],
  ['accent', 'the consumer’s dial'],
  ['ok', 'success'],
  ['warn', 'warning'],
  ['err', 'danger'],
];

const sw = (hex) => `<span class="tok-sw" style="background: ${hex}"></span>`;

const paletteRows = COLOR_ORDER.map(
  ([key, role]) => `<div class="tok-name">
        <span class="tok-key">${key}</span>
        <span class="tok-role">${role}</span>
      </div>
      <div class="tok-cell">${sw(tokens.color.light[key])}<span class="tok-hex">${tokens.color.light[key]}</span></div>
      <div class="tok-cell">${sw(tokens.color.dark[key])}<span class="tok-hex">${tokens.color.dark[key]}</span></div>`,
).join('\n      ');

/* the three inks by the three weights — the nine registers, live */
const INKS = [
  ['ink', ''],
  ['muted', 'ae-dim'],
  ['faint', 'x-faint'],
];
const WEIGHTS = [
  ['w4', '400'],
  ['w5', '550'],
  ['w8', '800'],
];
const regCells = INKS.map(
  ([label, inkClass]) =>
    `<span class="rh">${label}</span>\n        ` +
    WEIGHTS.map(
      ([w]) =>
        `<span class="${[w, inkClass].filter(Boolean).join(' ')}">Aa</span>`,
    ).join('\n        '),
).join('\n        ');

/* contrast: one plate per mode; the glyph rides the AA verdict */
const cell = (entry) => {
  const r = entry.ratio.toFixed(2);
  if (entry.aa) {
    return `<td class="num">
                <svg class="ae-icon ae-ok"><use href="#i-check" /></svg>${r}
              </td>`;
  }
  // a faint value, never a red ✗: failing here is the documented contract
  // (decoration-only / non-text), not a defect
  return `<td class="num tok-dec">${r}</td>`;
};
const contrastPlate = (mode, n) => {
  const c = tokens.contrast[mode];
  const rows = INK_KEYS.map(
    (k) => `<tr>
              <td class="ae-item">${k}</td>
              ${cell(c.surface[k])}
              ${cell(c.wash[k])}
            </tr>`,
  ).join('\n            ');
  return `<div class="ae-plate">
          <p class="ae-plate-cap">TABLE ${n} · CONTRAST · ${mode.toUpperCase()}</p>
          <table class="ae-table">
            <thead>
              <tr>
                <th>ink</th>
                <th class="num">on surface</th>
                <th class="num">on wash</th>
              </tr>
            </thead>
            <tbody>
            ${rows}
            </tbody>
          </table>
          <p class="ae-plate-note">
            WCAG 2.1 ratios. Faint values are decoration-only by contract —
            placeholders and resting underlines — and fail 4.5:1 intentionally;
            nothing interactive rests there.
          </p>
        </div>`;
};

const body = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>tokens — aesthetic</title>
    <meta
      name="description"
      content="Every value the Misty Step design system resolves from — palette, type, motion, layout, and the contrast table — generated from tokens.json."
    />
    <script>
      try {
        var m = localStorage.getItem('ae-mode');
        if (m === 'dark' || m === 'light') {
          document.documentElement.classList.add(m);
          document.documentElement.style.colorScheme = m;
        }
      } catch (e) {}
    </script>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap"
    />
    <link rel="stylesheet" href="aesthetic.css" />
    <link rel="stylesheet" href="site.css" />
  </head>
  <body>
    <svg style="display: none" xmlns="http://www.w3.org/2000/svg">
      <symbol id="i-sun" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </symbol>
      <symbol id="i-moon" viewBox="0 0 24 24">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </symbol>
      <symbol id="i-check" viewBox="0 0 24 24">
        <path d="M20 6 9 17l-5-5" />
      </symbol>
    </svg>

    <div class="ae-screen ae-wide">
      <header class="ae-bar">
        <a class="ae-name" href="./">AESTHETIC</a>
        <span class="bar-end">
          <span class="ae-chrome bar-links"
            ><a href="./">home</a
            ><a href="primitives.html">primitives</a
            ><a href="https://github.com/misty-step/aesthetic">github</a></span
          >
          <button class="ae-mode" aria-label="toggle color mode">
            <svg class="ae-icon ae-sun"><use href="#i-sun" /></svg>
            <svg class="ae-icon ae-moon"><use href="#i-moon" /></svg>
          </button>
        </span>
      </header>
      <main class="ae-stage ae-stage-scroll">
        <div class="ae-group">
          <p>
            <span class="ae-item">The tokens.</span>
            <span class="ae-dim"
              >Every value the system resolves from. The source of truth is
              <code>tokens.json</code>; this page is generated from it, so it
              cannot drift — what you see is what you ship.</span
            >
          </p>
          <p class="ae-chrome">
            the primitives: <a href="primitives.html">catalog</a> · steering:
            <a href="steering.html">the volume knob</a>
          </p>
        </div>

        <section class="tok-sec">
          <h2 class="ae-h">PALETTE</h2>
          <p class="ae-dim">
            Three inks, the hairline, and the steerable accent + status triplet
            — light and dark, side by side. Identity comes from the ink; the
            accent is yours to steer.
          </p>
          <div class="tok-pal">
            <span class="rh"></span>
            <span class="rh">light</span>
            <span class="rh">dark</span>
            ${paletteRows}
          </div>
        </section>

        <section class="tok-sec">
          <h2 class="ae-h">TYPE · THE REGISTERS</h2>
          <p class="ae-dim">
            One size (${tokens.type.size}); hierarchy is ink and weight, never
            scale. Three inks by three weights — nine registers — in
            ${tokens.type.family} and ${tokens.type.familyMono}.
          </p>
          <div class="reg-grid">
            <span class="rh"></span>
            <span class="rh">400 · regular</span>
            <span class="rh">550 · medium</span>
            <span class="rh">800 · black</span>
            ${regCells}
          </div>
          <dl class="tok-spec">
            <dt>family</dt>
            <dd>${tokens.type.family}</dd>
            <dt>mono</dt>
            <dd>${tokens.type.familyMono}</dd>
            <dt>size</dt>
            <dd>${tokens.type.size}</dd>
            <dt>line-height</dt>
            <dd>${tokens.type.lineHeight}</dd>
          </dl>
        </section>

        <section class="tok-sec">
          <h2 class="ae-h">MOTION</h2>
          <p class="ae-dim">
            Feedback, never decoration: small, brief, eased, and gone under
            reduced motion. State resolutions are gentler and resolve once.
          </p>
          <dl class="tok-spec">
            <dt>ease</dt>
            <dd>${tokens.motion.ease}</dd>
            <dt>quick</dt>
            <dd>${tokens.motion.quick}</dd>
            <dt>soft</dt>
            <dd>${tokens.motion.soft}</dd>
            <dt>gentle</dt>
            <dd>${tokens.motion.gentle}</dd>
          </dl>
        </section>

        <section class="tok-sec">
          <h2 class="ae-h">LAYOUT</h2>
          <p class="ae-dim">
            The measure bounds the line length; radius is 0 everywhere — round
            marks are SVG circles, never a corner.
          </p>
          <dl class="tok-spec">
            <dt>measure</dt>
            <dd>${tokens.layout.measure}</dd>
            <dt>measure-wide</dt>
            <dd>${tokens.layout.measureWide}</dd>
            <dt>radius</dt>
            <dd>${tokens.layout.radius}</dd>
          </dl>
        </section>

        <section class="tok-sec">
          <h2 class="ae-h">CONTRAST</h2>
          <p class="ae-dim">
            Recomputed whenever a color token changes. The glyph rides the AA
            verdict; ink and accent clear 4.5:1 against both grounds, in both
            modes.
          </p>
          <div class="tok-plates">
            ${contrastPlate('light', 1)}
            ${contrastPlate('dark', 2)}
          </div>
        </section>
      </main>
      <footer class="ae-bar">
        <p class="ae-chrome">
          <code>pnpm add github:misty-step/aesthetic#v${version}</code>
        </p>
        <p class="ae-chrome">
          generated from <code>tokens.json</code> ·
          <a href="https://mistystep.io">Misty Step</a>
        </p>
      </footer>
    </div>

    <script src="recipes.js"></script>
  </body>
</html>
`;

const target = join(root, 'site', 'tokens.html');
const formatted = await prettier.format(body, {
  ...(await prettier.resolveConfig(target)),
  parser: 'html',
});

if (process.argv.includes('--check')) {
  const current = read('site/tokens.html');
  if (current !== formatted) {
    console.error(
      'site/tokens.html is out of date — run: npm run build:tokens',
    );
    process.exit(1);
  }
  console.log('site/tokens.html matches tokens.json.');
} else {
  writeFileSync(target, formatted);
  console.log(`site/tokens.html built from tokens.json (v${version}).`);
}
