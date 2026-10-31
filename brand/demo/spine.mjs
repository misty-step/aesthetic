// The spine demo page: an inner page written the way a site writes one on the package alone. The frame (nav,
// sections, limits list, footer) is brand.css, plus the two layout rules every site keeps for itself (a form's
// field gap, room under the last section); every component is spine.css, its behaviour spine.js (wired in
// demo/spine-app.js), and its glyphs come from the spine module. The words come from the Locked copy, except the
// request form's labels; its email placeholder and message prompt are mistystep.io's booking form
// (misty-step/misty-step@3981260, components/booking/booking-form.tsx).
import { HTML_ATTRS } from '@misty-step/brand/attrs';
import { lockup } from '@misty-step/brand/mark';
import { icon } from '@misty-step/brand/spine';
import { esc, link, THEME_ICON } from './markup.mjs';

function section(pages, page, type) {
  const found = pages[page].sections.find(s => s.type === type);
  if (!found) throw new Error(`The Locked copy's ${page} page has no ${type} section`);
  return found;
}

// A field with its hint; a field the page validates also carries the note setInvalid() writes (#<id>-error).
const field = ({ id, label, hint, control, note = false }) => `<div class="sp-field"><label class="sp-label" for="${id}">${label}</label>${control}<p class="sp-hint" id="${id}-hint">${hint}</p>${note ? `<p class="sp-field-note" id="${id}-error" hidden></p>` : ''}</div>`;

function request(contact) {
  const times = ['Morning', 'Afternoon', 'Either'];
  return `<section class="s" id="request" aria-labelledby="request-title">
    <div class="s-head"><h1 class="s-title" id="request-title">${esc(contact.title)}</h1><p class="s-intro">${esc(contact.body)}</p></div>
    <form class="form sp-panel sp-panel-feature" novalidate data-request aria-labelledby="request-title">
      ${field({ id: 'request-name', label: 'Your name', hint: 'Optional.', control: '<input class="sp-input" id="request-name" name="name" autocomplete="name" aria-describedby="request-name-hint">' })}
      ${field({ id: 'request-email', label: 'Your email', hint: 'We confirm the time by email. Nothing is booked until then.', note: true, control: '<input class="sp-input" id="request-email" name="email" type="email" autocomplete="email" placeholder="you@company.com" required aria-describedby="request-email-hint">' })}
      <fieldset class="sp-choices"><legend>Preferred time</legend>${times.map(time => `<label class="sp-choice"><input class="sp-radio" type="radio" name="time" value="${time.toLowerCase()}"${time === 'Either' ? ' checked' : ''}>${time}</label>`).join('')}</fieldset>
      ${field({ id: 'request-message', label: 'What would you like to talk about?', hint: 'Optional.', control: '<textarea class="sp-input" id="request-message" name="message" rows="4" placeholder="A sentence about the work that repeats is plenty." aria-describedby="request-message-hint"></textarea>' })}
      <label class="sp-choice"><input class="sp-check" type="checkbox" name="copy" checked>Email me a copy of this request</label>
      <div class="actions"><button class="sp-button" type="submit">Send request</button><button class="sp-button sp-quiet" type="button" data-sp-dialog="#start-over">Start over</button></div>
    </form>
  </section>`;
}

function install(s) {
  const harnesses = s.harnesses.filter(h => h.lines.length);
  return `<section class="s" id="install" aria-labelledby="install-title">
    <div class="s-head"><h2 class="s-title" id="install-title">${esc(s.title)}</h2><p class="s-intro">${esc(s.intro)}</p></div>
    <div>
      <div class="sp-tabs" role="tablist" aria-label="Choose your harness">${harnesses.map((h, i) => `<button class="sp-tab" type="button" role="tab" id="tab-${esc(h.id)}" aria-controls="panel-${esc(h.id)}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(h.name)}</button>`).join('')}</div>
      ${harnesses.map((h, i) => `<div class="sp-tabpanel" role="tabpanel" id="panel-${esc(h.id)}" aria-labelledby="tab-${esc(h.id)}"${i === 0 ? '' : ' hidden'}><pre class="sp-code" tabindex="0"><code>${esc(h.lines.join('\n'))}</code></pre><p class="sp-hint">${esc(h.note)}</p></div>`).join('')}
      <div class="actions"><button class="sp-button sp-quiet" type="button" data-copy-code>${icon('copy')}Copy commands</button><button class="sp-button sp-quiet" type="button" popovertarget="share" aria-haspopup="menu" aria-expanded="false">${icon('share-2')}Share</button></div>
    </div>
  </section>`;
}

function evidence(s) {
  return `<section class="s" id="evidence" aria-labelledby="evidence-title">
    <div class="s-head"><h2 class="s-title" id="evidence-title">${esc(s.title)}</h2><p class="s-intro">${esc(s.intro)}</p></div>
    <figure class="sp-plate">
      <table class="sp-table"><caption>Tasks passed, one run per task</caption>
        <thead><tr><th scope="col">Arm</th><th scope="col" class="num">Passed</th><th scope="col" class="num">Tasks</th></tr></thead>
        <tbody>${s.rows.map(r => `<tr><th scope="row">${esc(r.label)}</th><td class="num">${r.passed}</td><td class="num">${r.total}</td></tr>`).join('')}</tbody>
      </table>
      <figcaption class="sp-hint">${link({ label: 'Read the trial record', href: s.href }, 'sp-link')}</figcaption>
    </figure>
    <ul class="limits">${s.limits.map(l => `<li>${esc(l)}</li>`).join('')}</ul>
  </section>`;
}

const preferences = `<section class="s" id="preferences" aria-labelledby="preferences-title">
    <div class="s-head"><h2 class="s-title" id="preferences-title">Preferences</h2></div>
    <div class="sp-settings">
      <button class="sp-setting" type="button" aria-expanded="false" aria-controls="theme-chooser">Theme <span class="sp-setting-value" data-theme-value>Light</span></button>
      <div class="sp-chooser" id="theme-chooser"><div><div class="sp-menu" role="menu" aria-label="Theme">${['Light', 'Dark'].map((theme, i) => `<button class="sp-menu-item" type="button" role="menuitemradio" aria-checked="${i === 0}" data-theme-choice="${theme.toLowerCase()}">${theme}</button>`).join('')}</div></div></div>
    </div>
  </section>`;

// Top-layer and edge pieces sit outside the editorial sections, whose grid spaces every direct child.
const overlays = `<dialog class="sp-dialog" id="start-over" aria-labelledby="start-over-title">
    <h2 class="sp-dialog-title" id="start-over-title">Start over?</h2>
    <div class="sp-dialog-body"><p>This clears your name, your email, the time and your message.</p></div>
    <div class="sp-dialog-actions"><button class="sp-button sp-quiet" type="button" data-sp-close>Keep editing</button><button class="sp-button" type="button" data-sp-close="clear">Clear the form</button></div>
  </dialog>
  <div class="sp-pop" id="share" popover><div class="sp-menu" role="menu" aria-label="Share">
    <button class="sp-menu-item" type="button" role="menuitem" data-copy-link="#install">${icon('copy')}Copy a link to this section</button>
    <button class="sp-menu-item" type="button" role="menuitem" data-copy-link="">${icon('copy')}Copy a link to this page</button>
  </div></div>
  <div class="sp-toasts" data-tray></div>`;

/** demo/dist/spine.html from the Locked copy's pages: the studio page's call to action, the stack page's install and evidence. */
export function spinePage(pages) {
  const attrs = Object.entries(HTML_ATTRS).map(([name, value]) => `${name}="${esc(value)}"`).join(' ');
  const { brand, footer } = pages.studio;
  const nav = [['Request a call', '#request'], ['Install', '#install'], ['Evidence', '#evidence'], ['Preferences', '#preferences']];
  return `<!doctype html>
<html lang="en" ${attrs}>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(brand)}: spine demo</title>
<link rel="icon" type="image/svg+xml" href="/identity/icons/favicon.svg"><link rel="stylesheet" href="/identity/brand.css"><link rel="stylesheet" href="/identity/spine.css">
<style>/* The page's own layout, as each site keeps it: the spine styles components, never the page around them. */
.form { display: grid; gap: 24px; }
main > .s:last-child { padding-bottom: var(--section-space); }</style>
<script type="module" src="/demo/app.js"></script><script type="module" src="/demo/spine-app.js"></script></head>
<body id="top" data-face="studio">
  <a class="skip" href="#main">Skip to content</a>
  <header class="nav">
    ${lockup(brand.toUpperCase(), { href: '#top' })}
    <nav class="nav-links" aria-label="Primary">${nav.map(([label, href]) => link({ label, href })).join('')}</nav>
    <div class="nav-actions"><button class="theme-toggle" aria-label="Switch colour theme">${THEME_ICON}</button></div>
  </header>
  <main id="main" tabindex="-1">
    ${request(section(pages, 'studio', 'cta'))}
    ${install(section(pages, 'stack', 'install'))}
    ${evidence(section(pages, 'stack', 'evidence'))}
    ${preferences}
  </main>
  <footer class="foot"><p class="foot-line">${esc(footer.line)}</p><nav class="foot-links" aria-label="Footer">${footer.links.map(a => link(a)).join('')}</nav></footer>
  ${overlays}
  <button class="motion-toggle" aria-pressed="false">Pause motion</button>
</body></html>
`;
}
