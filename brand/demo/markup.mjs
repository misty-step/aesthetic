// The demo's pages as HTML, built from the package's own exports, which the caller passes in as `pkg`:
// { version, tokens, lockup, MARK_SVG, icon, statusIcon, asset(path), links: { sheet, studio?, stack? } }.
// demo/build.mjs resolves them through the package's exports map and writes static pages; the brand lab
// (configurator/) imports the installed package and renders the identity sheet in the browser. Nothing here
// reaches into brand/src or the generator: a page that renders here renders for any consumer.

const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
/** A headline whose final full stop takes Indigo. */
const stop = text => text.endsWith('.') ? `${esc(text.slice(0, -1))}<span class="ms-stop">.</span>` : esc(text);
const release = version => `https://github.com/misty-step/aesthetic/releases/download/brand-v${version}/misty-step-brand-${version}.tgz`;

/** The skip link, then the nav: the lockup, section links, the theme toggle and one primary action. */
function header(pkg, { name, href, links, action }) {
  return `<a class="sp-skip" href="#main">Skip to content</a>
<header class="demo-nav">
  ${pkg.lockup(name, { href })}
  <nav class="demo-links" aria-label="Primary">${links.map(([to, label]) => `<a href="${esc(to)}">${esc(label)}</a>`).join('')}</nav>
  <div class="demo-actions">
    <button class="sp-ghost sp-icon-only" type="button" data-theme-toggle aria-pressed="false" aria-label="Dark theme">${pkg.icon('moon')}</button>
    <a class="sp-button" href="${esc(action[0])}">${esc(action[1])}</a>
  </div>
</header>`;
}

function footer(pkg) {
  const pages = [[pkg.links.sheet, 'Identity sheet'], [pkg.links.studio, 'Misty Step home'], [pkg.links.stack, 'mistystack home']].filter(([to]) => to);
  return `<footer class="demo-foot">
  ${pkg.lockup('Misty Step', { variant: 'mono' })}
  ${pages.length > 1 ? `<nav class="demo-links" aria-label="Demo pages">${pages.map(([to, label]) => `<a href="${esc(to)}">${esc(label)}</a>`).join('')}</nav>` : ''}
  <p>@misty-step/brand <span class="demo-meta">${esc(pkg.version)}</span>. Code MIT. Hedvig Letters Serif, Uncut Sans and Commit Mono under the SIL Open Font License 1.1. Glyphs from Lucide (ISC).</p>
</footer>
<div class="sp-toasts" data-tray></div>`;
}

/** A command on one line with its copy button; the copying is the page's own script (demo/app.js). */
const command = (pkg, text) => `<div class="sp-command"><code>${esc(text)}</code><button class="sp-ghost sp-icon-only" type="button" data-copy="${esc(text)}" aria-label="Copy ${esc(text)}">${pkg.icon('copy')}</button></div>`;

/** Ranked results: name, closeness bar and percent, one line of description, source tag and copyable command. */
function ranked(pkg, rows) {
  return `<ol class="sp-ranked">${rows.map(([name, score, description, source]) => `
  <li class="sp-ranked-result">
    <h3 class="sp-ranked-name">${esc(name)}</h3>
    <p class="sp-closeness"><meter min="0" max="1" value="${score}" aria-hidden="true"></meter><span>${Math.round(score * 100)}%</span></p>
    <p class="sp-ranked-description">${esc(description)}</p>
    <div class="sp-ranked-source"><span class="sp-tag">${esc(source)}</span>${command(pkg, `/skill:${name}`)}</div>
  </li>`).join('')}
</ol>`;
}

const SKILLS = [
  ['retro', 0.98, 'Conduct a retrospective on a coding session.', 'pocock 4ae2317'],
  ['reflect', 0.84, 'Route learnings from a transcript into skill edits.', 'pstack c742dd6'],
  ['correct', 0.79, 'Make repeated agent mistakes impossible.', 'pstack c742dd6'],
  ['recall', 0.7, 'Rebuild recent working context into a brief.', 'pstack c742dd6'],
];
const APP_ICONS = [['ink', 'Ink', 'Indigo and Violet'], ['indigo', 'Indigo', 'white'], ['black', 'white', 'Ink'], ['white', 'Ink', 'white']];

/** The request form: a field with hint and error note, choices, a switch, the submit, and a dialog to start over. */
function requestForm(pkg) {
  return `<form class="demo-stack" data-request novalidate>
  <div class="sp-field">
    <label class="sp-label" for="request-email">Your email</label>
    <input class="sp-input" id="request-email" name="email" type="email" autocomplete="email" aria-describedby="request-email-hint">
    <p class="sp-hint" id="request-email-hint">We confirm the time by email.</p>
    <p class="sp-field-note" id="request-email-error" hidden></p>
  </div>
  <fieldset class="sp-choices">
    <legend>Preferred time</legend>
    <label class="sp-choice"><input class="sp-radio" type="radio" name="time" value="morning">Morning</label>
    <label class="sp-choice"><input class="sp-radio" type="radio" name="time" value="afternoon" checked>Afternoon</label>
  </fieldset>
  <label class="sp-choice"><input class="sp-check" type="checkbox" name="copy" checked>Email me a copy</label>
  <label class="sp-choice"><input class="sp-switch" type="checkbox" role="switch" name="reminder">Remind me the day before</label>
  <div class="demo-row">
    <button class="sp-button" type="submit">Send request</button>
    <button class="sp-secondary" type="button" data-sp-dialog="#start-over">Start over</button>
  </div>
</form>
<dialog class="sp-dialog" id="start-over" aria-labelledby="start-over-title">
  <button class="sp-close" type="button" data-sp-close aria-label="Close">${pkg.icon('x')}</button>
  <h2 class="sp-dialog-title" id="start-over-title">Start over?</h2>
  <div class="sp-dialog-body"><p>This clears the form.</p></div>
  <div class="sp-dialog-actions">
    <button class="sp-secondary" type="button" data-sp-close>Keep editing</button>
    <button class="sp-button" type="button" data-sp-close="clear">Clear the form</button>
  </div>
</dialog>`;
}

/** The identity sheet: both lockups, the mark and its files, the palette, the type roles, every component and the cards. */
export function sheet(pkg) {
  const { tokens } = pkg;
  const file = (path, alt, { size, ink = false } = {}) => `<figure class="demo-file${ink ? ' demo-tile-ink' : ''}"><img src="${esc(pkg.asset(path))}"${size ? ` width="${size}" height="${size}"` : ''} alt="${esc(alt)}"><figcaption class="demo-meta">${esc(path)}</figcaption></figure>`;
  const spec = style => [style.fontFamily, `${parseFloat(style.fontSize)}/${style.lineHeight}`, String(style.fontWeight), style.letterSpacing ? `${Math.round(parseFloat(style.letterSpacing) * 100)}%` : ''].filter(Boolean).join(' · ');
  const fluid = { display: 'clamp(var(--heading-size), 8vw, var(--display-size))', heading: 'clamp(var(--title-size), 4vw, var(--heading-size))' };
  const samples = {
    display: 'Two weeks to see what’s worth building.',
    heading: 'What we build',
    title: 'Shape with grilling',
    body: 'We put AI to work on one key process and price every project against the dollars it should return.',
    label: 'Find skills',
    mono: 'omp plugin install mistystack@mistystack',
  };
  return `${header(pkg, { name: 'Misty Step', href: pkg.links.sheet, links: [['#lockups', 'Lockups'], ['#palette', 'Palette'], ['#type', 'Type'], ['#components', 'Components']], action: ['#install', 'Install'] })}
<main id="main" class="demo" tabindex="-1">
  <section class="demo-hero" id="install">
    <h1>${stop('One identity for the studio and its method.')}</h1>
    <p class="demo-lede">Misty Step and mistystack share one mark, one palette and one type system; only the wordmark changes.</p>
    ${command(pkg, `npm install ${release(pkg.version)}`)}
  </section>

  <section class="demo-section" id="lockups" aria-labelledby="lockups-title">
    <h2 id="lockups-title">Lockups</h2>
    <div class="demo-grid">
      <figure class="demo-tile">${pkg.lockup('Misty Step')}<figcaption class="demo-meta">lockup('Misty Step')</figcaption></figure>
      <figure class="demo-tile">${pkg.lockup('mistystack')}<figcaption class="demo-meta">lockup('mistystack')</figcaption></figure>
      <figure class="demo-tile demo-tile-ink">${pkg.lockup('Misty Step', { variant: 'mono' })}<figcaption class="demo-meta">lockup('Misty Step', { variant: 'mono' })</figcaption></figure>
      <figure class="demo-tile demo-tile-ink">${pkg.lockup('mistystack')}<figcaption class="demo-meta">lockup('mistystack')</figcaption></figure>
    </div>
  </section>

  <section class="demo-section" id="mark" aria-labelledby="mark-title">
    <h2 id="mark-title">Mark</h2>
    <p class="demo-lede">Two sharp parallelograms, sides at 60°, the trailing one a fixed step down and right. Indigo leads and Violet trails; a single-colour mark is Ink or white. Keep one parallelogram’s height clear on every side.</p>
    <div class="demo-grid">
      ${file('marks/mark.svg', 'The step mark in Indigo and Violet')}
      ${file('marks/mark-ink.svg', 'The step mark in Ink')}
      ${file('marks/mark-white.svg', 'The step mark in white', { ink: true })}
    </div>
    <div class="demo-icons">
      ${file('icons/favicon-16.png', 'Favicon, 16 px', { size: 16 })}
      ${file('icons/favicon-32.png', 'Favicon, 32 px', { size: 32 })}
      ${file('icons/favicon.svg', 'Favicon, SVG', { size: 32 })}
      ${APP_ICONS.map(([variant, ground, mark]) => file(`icons/app-180-${variant}.png`, `App icon: ${mark} on ${ground}`, { size: 90 })).join('\n      ')}
    </div>
    <figure class="sp-plate">
      <table class="sp-table">
        <caption>App icons, square and opaque; each platform rounds its own corners</caption>
        <thead><tr><th scope="col">File</th><th scope="col">Ground</th><th scope="col">Mark</th><th scope="col" class="num">Size (px)</th></tr></thead>
        <tbody>${[180, 1024].flatMap(size => APP_ICONS.map(([variant, ground, mark]) => `<tr><th scope="row"><a class="sp-link" href="${esc(pkg.asset(`icons/app-${size}-${variant}.png`))}">icons/app-${size}-${variant}.png</a></th><td>${ground}</td><td>${mark}</td><td class="num">${size}</td></tr>`)).join('')}</tbody>
      </table>
    </figure>
  </section>

  <section class="demo-section" id="palette" aria-labelledby="palette-title">
    <h2 id="palette-title">Palette</h2>
    <ul class="demo-swatches">${Object.entries(tokens.colors).map(([name, value]) => `
      <li><span class="demo-chip" style="background:var(--color-${esc(name)})"></span><span>${esc(name)}</span><span class="demo-meta">${esc(value)}</span></li>`).join('')}
    </ul>
  </section>

  <section class="demo-section" id="type" aria-labelledby="type-title">
    <h2 id="type-title">Type</h2>
    <dl class="demo-type">${Object.entries(tokens.typography).map(([role, style]) => `
      <div><dt><span>${esc(role)}</span><span class="demo-meta">${esc(spec(style))}</span></dt><dd style="font:var(--type-${esc(role)});letter-spacing:var(--${esc(role)}-tracking)${fluid[role] ? `;font-size:${fluid[role]}` : ''}">${role === 'display' ? stop(samples[role]) : esc(samples[role] ?? role)}</dd></div>`).join('')}
    </dl>
  </section>

  <section class="demo-section" id="components" aria-labelledby="components-title">
    <h2 id="components-title">Components</h2>
    <div class="demo-stack">
      <div class="demo-row">
        <button class="sp-button" type="button" data-toast="Built.">Build</button>
        <button class="sp-secondary" type="button" popovertarget="share" aria-haspopup="menu" aria-expanded="false">Share</button>
        <button class="sp-ghost" type="button" data-toast="Nothing more here.">More</button>
        <button class="sp-secondary sp-icon-only" type="button" aria-label="Copy the name" data-copy="Misty Step">${pkg.icon('copy')}</button>
        <button class="sp-button" type="button" disabled>Disabled</button>
      </div>
      <div class="sp-pop" id="share" popover>
        <div class="sp-menu" role="menu" aria-label="Share">
          <button class="sp-menu-item" type="button" role="menuitem" data-toast="Copied a link to this section.">${pkg.icon('copy')}Copy a link to this section</button>
          <hr class="sp-menu-sep">
          <button class="sp-menu-item" type="button" role="menuitem" data-toast="Copied a link to this page.">${pkg.icon('share-2')}Copy a link to this page</button>
        </div>
      </div>
      <div class="demo-row"><span class="sp-tag">AI</span><span class="sp-tag">Agents</span><span class="sp-tag">Tools</span></div>
      <div class="demo-split">
        ${requestForm(pkg)}
        <div class="demo-stack">
          <article class="sp-card">
            <h3>Shape with grilling</h3>
            <p>Turn a task into a clear plan with targeted, high-signal questions.</p>
            <a class="sp-link" href="#components">Find the grilling skill</a>
          </article>
          <pre class="sp-code" tabindex="0"><code>npm ci
npm run identity:check</code></pre>
          <p>Run it in <code class="sp-code-inline">brand/</code>.</p>
          <div class="sp-settings">
            <button class="sp-setting" type="button" aria-expanded="false" aria-controls="theme-chooser">Theme <span class="sp-setting-value" data-theme-value>Light</span></button>
            <div class="sp-chooser" id="theme-chooser"><div><div class="sp-menu" role="menu" aria-label="Theme">
              <button class="sp-menu-item" type="button" role="menuitemradio" aria-checked="true" data-theme-choice="light">Light</button>
              <button class="sp-menu-item" type="button" role="menuitemradio" aria-checked="false" data-theme-choice="dark">Dark</button>
            </div></div></div>
          </div>
          <div class="demo-stack">
            <p class="sp-status">${pkg.statusIcon('ok')}<span>Saved</span></p>
            <p class="sp-status">${pkg.statusIcon('warn')}<span>The release tag is not on master yet</span></p>
            <p class="sp-status">${pkg.statusIcon('err')}<span>identity/ is stale</span></p>
          </div>
        </div>
      </div>
      ${ranked(pkg, SKILLS.slice(0, 3))}
      <div class="demo-split">
        <div class="sp-empty">
          <p class="sp-empty-title">No projects yet.</p>
          <p class="sp-empty-note">The first one you archive lands here.</p>
          <button class="sp-secondary" type="button">New project</button>
        </div>
        <div class="demo-stack">
          <p class="sp-skeleton" aria-hidden="true">Loading the project title</p>
          <p class="sp-skeleton" aria-hidden="true">Loading the project summary, which runs to two lines on most screens</p>
          <p class="sp-hint" role="status">Loading projects</p>
        </div>
      </div>
    </div>
  </section>

  <section class="demo-section" id="cards" aria-labelledby="cards-title">
    <h2 id="cards-title">Social cards</h2>
    <div class="sp-tabs" role="tablist" aria-label="Social cards">
      <button class="sp-tab" type="button" role="tab" id="tab-studio" aria-controls="panel-studio" aria-selected="true" tabindex="0">Misty Step</button>
      <button class="sp-tab" type="button" role="tab" id="tab-stack" aria-controls="panel-stack" aria-selected="false" tabindex="-1">mistystack</button>
    </div>
    <div class="sp-tabpanel" role="tabpanel" id="panel-studio" aria-labelledby="tab-studio">${file('og/studio.png', 'Misty Step: Two weeks to see what’s worth building.')}</div>
    <div class="sp-tabpanel" role="tabpanel" id="panel-stack" aria-labelledby="tab-stack" hidden>${file('og/stack.png', 'mistystack: A method for coding agents.')}</div>
  </section>
</main>
${footer(pkg)}`;
}

/** The studio's home: one headline, one sentence, one primary action, then the process and the request form. */
export function studio(pkg) {
  return `${header(pkg, { name: 'Misty Step', href: pkg.links.studio, links: [['#process', 'How we work'], ['#request', 'Request a call']], action: ['#request', 'Request a free call'] })}
<main id="main" class="demo" tabindex="-1">
  <section class="demo-hero demo-hero-mark">
    <div class="demo-stack">
      <h1>${stop('Two weeks to see what’s worth building.')}</h1>
      <p class="demo-lede">We put AI to work on one key process. The $4,500 discovery ships a quick win and prices every project in the plan against the dollars it should return.</p>
      <div class="demo-row"><a class="sp-button" href="#request">Request a free call</a><a class="sp-secondary" href="#process">See how we work</a></div>
    </div>
    <div class="demo-hero-art" aria-hidden="true">${pkg.MARK_SVG}</div>
  </section>
  <section class="demo-section" id="process" aria-labelledby="process-title">
    <h2 id="process-title">How we work</h2>
    <ol class="demo-steps">
      <li class="sp-card"><span class="demo-meta">1</span><span>Free call</span><span class="demo-meta">30 minutes</span></li>
      <li class="sp-card"><span class="demo-meta">2</span><span>Discovery</span><span class="demo-meta">two weeks, $4,500</span></li>
      <li class="sp-card"><span class="demo-meta">3</span><span>Build</span><span class="demo-meta">priced by return</span></li>
    </ol>
  </section>
  <section class="demo-section" id="request" aria-labelledby="request-title">
    <h2 id="request-title">Request a free call</h2>
    ${requestForm(pkg)}
  </section>
</main>
${footer(pkg)}`;
}

/** mistystack's home: the headline, the install line, then the Find a skill tool, input left and results right. */
export function stack(pkg) {
  return `${header(pkg, { name: 'mistystack', href: pkg.links.stack, links: [['#find', 'Find a skill']], action: ['#install', 'Install'] })}
<main id="main" class="demo" tabindex="-1">
  <section class="demo-hero" id="install">
    <h1>${stop('A method for coding agents.')}</h1>
    <p class="demo-lede">Six always-on lines route every task to 104 skills: shaping, design, delivery, proof and retros.</p>
    ${command(pkg, 'omp plugin install mistystack@mistystack')}
  </section>
  <section class="demo-section demo-split" id="find" aria-labelledby="find-title">
    <form class="sp-card demo-stack" data-find novalidate>
      <h2 id="find-title">Find a skill</h2>
      <div class="sp-field">
        <label class="sp-label" for="find-query">Describe the task</label>
        <textarea class="sp-input" id="find-query" name="query" rows="3">look back on a finished session and decide what to change</textarea>
        <p class="sp-field-note" id="find-query-error" hidden></p>
      </div>
      <button class="sp-button" type="submit">Find skills</button>
      <p class="demo-meta">typesafe/jev-1.14 · $0.0056 · 104 skills ranked</p>
    </form>
    ${ranked(pkg, SKILLS)}
  </section>
</main>
${footer(pkg)}`;
}
