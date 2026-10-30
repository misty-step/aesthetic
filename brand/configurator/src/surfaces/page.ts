// /surfaces.html: the spine in three faces (issue #36). A component sheet with one column per face, then three real
// screens, each framed at 1440 (scaled) and 390 from its own screen route. Theme and Faces travel in the URL:
//   /surfaces.html?theme=light|dark&faces=own|locked
// The page wears the studio face; each sheet column wears its own.
import './components.css';
import './page.css';
import { INSTALL_HARNESSES, TRIAL } from '../content/facts';
import { esc } from '../html';
import { setInvalid, toast, wire } from './behaviour';
import * as P from './content/poppycock';
import { openingTheme, useFaces, type LoadedFace } from './face';
import { FACE_IDS, FACES, type FaceId } from './faces';
import { icon, statusIcon } from './icons';
import { SCREEN_IDS, SCREENS, screenHref } from './screens';
import type { Theme } from './spine';

const params = new URLSearchParams(location.search);
const root = document.documentElement;
const REPO = 'https://github.com/misty-step/aesthetic';
const view = { theme: openingTheme(params), locked: params.get('faces') === 'locked' };
// The canonical markup's settings rows (site/primitives.html).
const SETTINGS: [string, string[]][] = [['Theme', ['system', 'light', 'dark']], ['Region', ['us-east', 'eu-west', 'ap-south']]];

function column(l: LoadedFace): string {
  const f = l.face.id, F = l.face, R = P.ROOM;
  const harnesses = INSTALL_HARNESSES.filter(h => h.lines.length);
  const links = F.sources.map(s => `<a class="sp-link" href="${s.href}">${esc(s.label)}</a>`).join(' · ');
  const menu = [['share-2', R.invite], ['circle-question-mark', P.HOW_TO_PLAY]] as const;
  return `<section class="sf-col" data-face="${f}" data-theme="${view.theme}" aria-labelledby="${f}-title">
  <header class="sf-col-head">
    <h3 id="${f}-title">${esc(F.name)}</h3>
    <p>${esc(F.summary)}</p>
    <p class="sf-meta">Type: ${esc(l.type.label)} · Colour: ${esc(l.color.label)}</p>
    <p class="sf-meta">${links}</p>
    ${F.proposals.length ? `<div class="sf-proposals"><h4>Proposals</h4><ul>${F.proposals.map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>` : ''}
  </header>
  <div class="sf-specimen"><h4>Link and buttons</h4>
    <p><a class="sp-link" href="https://landmark.mistystep.io/changelog.html">Release notes</a></p>
    <div class="sf-row"><button class="sp-button" type="button">${esc(P.ENTRANCE.create)}</button><button class="sp-button sp-quiet" type="button">${icon('copy')}${esc(R.copy)}</button><button class="sp-button" type="button" disabled>${esc(R.start)}</button></div>
  </div>
  <div class="sf-specimen"><h4>Text field</h4>
    <form class="sf-form" novalidate data-sheet-form>
      <div class="sp-field"><label class="sp-label" for="${f}-name">${esc(P.ENTRANCE.name)}</label><input class="sp-input" id="${f}-name" name="displayName" autocomplete="nickname" aria-describedby="${f}-name-help"><p class="sp-hint" id="${f}-name-help">${esc(P.ENTRANCE.nameHelp)}</p><p class="sp-field-note" id="${f}-name-error" hidden></p></div>
      <div class="sp-field"><label class="sp-label" for="${f}-code">${esc(P.ENTRANCE.code)}</label><input class="sp-input" id="${f}-code" name="roomCode" value="PQ" autocapitalize="characters" autocomplete="off" spellcheck="false" aria-describedby="${f}-code-help"><p class="sp-hint" id="${f}-code-help">${esc(P.ENTRANCE.codeHelp)}</p><p class="sp-field-note" id="${f}-code-error" hidden></p></div>
      <div class="sf-row"><button class="sp-button sp-quiet" type="submit">${esc(P.ENTRANCE.join)}</button></div>
    </form>
  </div>
  <div class="sf-specimen"><h4>Choices</h4>
    <fieldset class="sp-choices"><legend>Notifications</legend>
      <label class="sp-choice"><input class="sp-check" type="checkbox" checked>Email me on deploy</label>
      <label class="sp-choice"><input class="sp-check" type="checkbox">Email me on failure only</label>
    </fieldset>
    <fieldset class="sp-choices"><legend>Visibility</legend>
      <label class="sp-choice"><input class="sp-radio" type="radio" name="${f}-visibility" checked>Public</label>
      <label class="sp-choice"><input class="sp-radio" type="radio" name="${f}-visibility">Internal</label>
    </fieldset>
    <label class="sp-choice"><input class="sp-switch" type="checkbox" role="switch" checked>Auto-deploy</label>
  </div>
  <div class="sf-specimen"><h4>Settings row</h4>
    <div class="sp-settings">${SETTINGS.map(([label, values]) => `
      <button class="sp-setting" type="button" aria-expanded="false" aria-controls="${f}-${label.toLowerCase()}">${esc(label)} <span class="sp-setting-value">${esc(values[0])}</span></button>
      <div class="sp-chooser" id="${f}-${label.toLowerCase()}"><div><div class="sp-menu" role="menu" aria-label="${esc(label)}">${values.map((v, i) => `<button class="sp-menu-item" type="button" role="menuitemradio" aria-checked="${i === 0}">${esc(v)}</button>`).join('')}</div></div></div>`).join('')}
    </div>
  </div>
  <div class="sf-specimen"><h4>Dialog</h4>
    <div class="sf-row"><button class="sp-button sp-quiet" type="button" data-sp-dialog="#${f}-leave">${icon('log-out', 'sp-err')}${esc(R.leave)}</button></div>
    <dialog class="sp-dialog" id="${f}-leave" aria-labelledby="${f}-leave-title">
      <h2 class="sp-dialog-title" id="${f}-leave-title">${esc(P.LEAVE_DIALOG.title)}</h2>
      <div class="sp-dialog-body"><p>${esc(P.LEAVE_DIALOG.lastPlayer)}</p></div>
      <div class="sp-dialog-actions"><button class="sp-button sp-quiet" type="button" data-sp-close>${esc(P.LEAVE_DIALOG.cancel)}</button><button class="sp-button" type="button" data-sp-close="leave">${esc(P.LEAVE_DIALOG.confirm)}</button></div>
    </dialog>
  </div>
  <div class="sf-specimen"><h4>Menu</h4>
    <div class="sf-row"><button class="sp-button sp-quiet" type="button" popovertarget="${f}-options" aria-haspopup="menu" aria-expanded="false">${icon('ellipsis')}${esc(R.options)}</button></div>
    <div class="sp-pop" id="${f}-options" popover><div class="sp-menu" role="menu" aria-label="${esc(R.options)}">
      ${menu.map(([name, label]) => `<button class="sp-menu-item" type="button" role="menuitem">${icon(name)}${esc(label)}</button>`).join('')}
      <hr class="sp-menu-sep" role="separator">
      <button class="sp-menu-item" type="button" role="menuitem">${icon('log-out', 'sp-err')}${esc(R.leave)}</button>
    </div></div>
  </div>
  <div class="sf-specimen"><h4>Toast</h4>
    <div class="sf-row"><button class="sp-button sp-quiet" type="button" data-sheet-toast>${icon('copy')}${esc(R.copy)}</button></div>
    <div class="sp-toasts sf-toasts" data-tray></div>
  </div>
  <div class="sf-specimen"><h4>Tabs and code</h4>
    <div class="sp-tabs" role="tablist" aria-label="Choose your harness">${harnesses.map((h, i) => `<button class="sp-tab" type="button" role="tab" id="${f}-tab-${h.id}" aria-controls="${f}-panel-${h.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(h.name)}</button>`).join('')}</div>
    ${harnesses.map((h, i) => `<div class="sp-tabpanel" role="tabpanel" id="${f}-panel-${h.id}" aria-labelledby="${f}-tab-${h.id}"${i ? ' hidden' : ''}><pre class="sp-code" tabindex="0"><code>${h.lines.map(esc).join('\n')}</code></pre><p class="sp-hint">${esc(h.note)}</p></div>`).join('')}
  </div>
  <div class="sf-specimen"><h4>Table</h4>
    <figure class="sp-plate">
      <table class="sp-table"><caption>${esc(TRIAL.title)}</caption>
        <thead><tr><th scope="col">Arm</th><th scope="col" class="num">Passed</th><th scope="col" class="num">Tasks</th></tr></thead>
        <tbody>${TRIAL.rows.map(r => `<tr><th scope="row">${esc(r.label)}</th><td class="num">${r.passed}</td><td class="num">${r.total}</td></tr>`).join('')}</tbody>
      </table>
      <figcaption class="sp-hint">${esc(TRIAL.limits[0])}</figcaption>
    </figure>
  </div>
  <div class="sf-specimen"><h4>Status line</h4>
    <p class="sp-status">${statusIcon('ok')}<span>Answer submitted</span></p>
    <p class="sp-status">${statusIcon('warn')}<span>Reconnecting. Keep this page open; your submitted answers and votes are saved.</span></p>
    <p class="sp-status">${statusIcon('err')}<span>Reconnect before leaving the table.</span></p>
  </div>
  <div class="sf-specimen"><h4>Empty and loading</h4>
    <div class="sf-loading"><p class="sp-skeleton">loading title</p><p class="sp-skeleton sf-short">loading meta</p><p class="sp-hint" role="status">loading projects…</p></div>
    <div class="sp-empty"><p class="sp-empty-title">No projects yet.</p><p class="sp-empty-note">The first one you archive lands here.</p><button class="sp-button sp-quiet" type="button">New project</button></div>
  </div>
</section>`;
}

function screens(): string {
  return SCREEN_IDS.map(id => {
    const s = SCREENS[id];
    const steps = s.steps ?? [{ id: '', name: '' }];
    return `<article class="sf-screen" data-screen="${id}" aria-labelledby="screen-${id}">
  <header class="sf-screen-head">
    <h3 id="screen-${id}">${esc(s.name)}</h3>
    <p class="sf-meta"><span data-face-label></span> · <a class="sp-link" href="${s.page}">Live page</a> · ${s.sources.map(src => `<a class="sp-link" href="${src.href}">${esc(src.label)}</a>`).join(' · ')}</p>
    <p class="sf-note" data-proposal hidden>Poppycock ships a light theme only. This dark theme is a proposal.</p>
  </header>
  ${steps.map(step => `<div class="sf-step">${step.name ? `<h4>${esc(step.name)}</h4>` : ''}<div class="sf-frames">
    ${[['desktop', 1440, 900], ['phone', 390, 844]].map(([kind, w, h]) => `<figure class="sf-frame sf-${kind}"><div class="sf-window" data-w="${w}" data-h="${h}"><iframe width="${w}" height="${h}" data-step="${step.id}" data-kind="${kind}"></iframe></div><figcaption>${kind === 'desktop' ? 'Desktop' : 'Phone'}, ${w} pixels · <a class="sp-link" data-open target="_blank" rel="noopener">Open at actual size</a></figcaption></figure>`).join('')}
  </div></div>`).join('')}
</article>`;
  }).join('\n');
}

function sizeFrames() {
  for (const win of document.querySelectorAll<HTMLElement>('.sf-window')) {
    const k = Math.min(1, win.clientWidth / Number(win.dataset.w));
    win.querySelector('iframe')!.style.transform = `scale(${k})`;
    win.style.height = `${Math.round(Number(win.dataset.h) * k)}px`;
  }
}

function apply() {
  const theme: Theme = view.theme;
  root.dataset.theme = theme;
  document.querySelectorAll<HTMLElement>('.sf-col').forEach(col => { col.dataset.theme = theme; });
  for (const article of document.querySelectorAll<HTMLElement>('.sf-screen')) {
    const s = SCREENS[article.dataset.screen as keyof typeof SCREENS];
    const face: FaceId = view.locked ? 'studio' : s.own;
    article.querySelector('[data-face-label]')!.textContent = `${FACES[face].name} face${view.locked && face !== s.own ? ', Locked everywhere' : ''}`;
    article.querySelector<HTMLElement>('[data-proposal]')!.hidden = !(face === 'poppycock' && theme === 'dark');
    for (const frame of article.querySelectorAll<HTMLIFrameElement>('iframe')) {
      const href = screenHref(s.id, face, theme, frame.dataset.step || undefined);
      if (frame.getAttribute('src') !== href) frame.setAttribute('src', href);
      frame.title = `${s.name}${frame.dataset.step ? `, ${s.steps!.find(x => x.id === frame.dataset.step)!.name}` : ''}, ${FACES[face].name.toLowerCase()} face, ${frame.dataset.kind === 'desktop' ? 1440 : 390} pixels wide`;
      frame.closest('figure')!.querySelector<HTMLAnchorElement>('[data-open]')!.href = href;
    }
  }
  document.querySelector<HTMLElement>('[data-locked-note]')!.hidden = !view.locked;
  document.querySelectorAll<HTMLInputElement>('input[name="sf-theme"]').forEach(r => { r.checked = r.value === theme; });
  document.querySelectorAll<HTMLInputElement>('input[name="sf-faces"]').forEach(r => { r.checked = r.value === (view.locked ? 'locked' : 'own'); });
  history.replaceState(null, '', `?${new URLSearchParams({ theme, faces: view.locked ? 'locked' : 'own' })}`);
}

async function main() {
  Object.assign(root.dataset, { face: 'studio', theme: view.theme, page: 'surfaces' });
  const loaded = await useFaces(FACE_IDS);
  document.body.innerHTML = `<div class="sf">
<a class="sp-skip" href="#main">Skip to content</a>
<header class="sf-head">
  <h1>Surfaces</h1>
  <p class="sf-lede">One spine, a face for each product. Every component and three real screens, each in its product's own face, so the decision of 30 October can be judged on real pages and its details chosen.</p>
  <p class="sf-meta"><a class="sp-link" href="${REPO}/issues/36">Issue #36</a> · <a class="sp-link" href="${REPO}/blob/master/brand/configurator/src/surfaces/spine.ts">Spine contract</a> · <a class="sp-link" href="${REPO}/blob/master/brand/configurator/src/surfaces/faces.ts">Faces</a></p>
  <div class="sf-controls">
    <fieldset class="sp-choices sf-switch"><legend>Theme</legend>${(['light', 'dark'] as const).map(t => `<label class="sp-choice"><input class="sp-radio" type="radio" name="sf-theme" value="${t}">${t === 'light' ? 'Light' : 'Dark'}</label>`).join('')}</fieldset>
    <fieldset class="sp-choices sf-switch"><legend>Faces</legend><label class="sp-choice"><input class="sp-radio" type="radio" name="sf-faces" value="own">Own faces</label><label class="sp-choice"><input class="sp-radio" type="radio" name="sf-faces" value="locked">Locked everywhere</label></fieldset>
  </div>
  <p class="sf-note" data-locked-note hidden>Locked everywhere is the house-style model Phaedrus rejected on 30 October: every screen in the studio face, kept for comparison.</p>
</header>
<main id="main" tabindex="-1">
  <section class="sf-section" aria-labelledby="components-title">
    <h2 id="components-title">Components</h2>
    <p class="sf-intro">The same markup and behaviour in every face; only the tokens change.</p>
    <div class="sf-sheet">${FACE_IDS.map(id => column(loaded[id])).join('')}</div>
  </section>
  <section class="sf-section" aria-labelledby="screens-title">
    <h2 id="screens-title">Screens</h2>
    <p class="sf-intro">Each frame is the screen's own page at its width: 1440 pixels scaled to fit, and 390. Own faces shows each product in its face; Locked everywhere shows all three in the studio face.</p>
    ${screens()}
  </section>
</main>
</div>`;
  wire();
  for (const tray of document.querySelectorAll<HTMLElement>('[data-tray]')) toast(tray, P.ROOM.copiedStatus, 'ok');
  for (const form of document.querySelectorAll<HTMLFormElement>('[data-sheet-form]')) setInvalid(form.querySelector('input[name="roomCode"]')!, P.ENTRANCE.codeInstruction);

  document.addEventListener('change', event => {
    const input = event.target as HTMLInputElement;
    if (input.name === 'sf-theme') view.theme = input.value as Theme;
    else if (input.name === 'sf-faces') view.locked = input.value === 'locked';
    else return;
    apply();
  });
  document.addEventListener('click', event => {
    const button = (event.target as Element).closest('[data-sheet-toast]');
    if (button) toast(button.closest('.sf-specimen')!.querySelector<HTMLElement>('[data-tray]')!, P.ROOM.copiedStatus, 'ok');
  });
  document.addEventListener('input', event => {
    const input = event.target as HTMLInputElement;
    if (!input.closest('[data-sheet-form]')) return;
    if (input.name === 'roomCode') input.value = input.value.toUpperCase().replace(/\s/g, '').slice(0, P.ROOM_CODE_LENGTH);
    setInvalid(input, null);
  });
  document.addEventListener('submit', event => {
    const form = (event.target as Element).closest<HTMLFormElement>('[data-sheet-form]');
    if (!form) return;
    event.preventDefault();
    const name = form.querySelector<HTMLInputElement>('input[name="displayName"]')!, code = form.querySelector<HTMLInputElement>('input[name="roomCode"]')!;
    const nameOk = P.displayName(name.value) !== null;
    setInvalid(name, nameOk ? null : P.ENTRANCE.nameInstruction);
    setInvalid(code, P.ROOM_CODE.test(code.value) ? P.ROOM_NOT_FOUND : P.ENTRANCE.codeInstruction);
    (nameOk ? code : name).focus();
  });
  addEventListener('resize', sizeFrames);
  apply();
  sizeFrames();
  await document.fonts.ready;
  sizeFrames();
  Object.assign(window, { __SURFACES__: { ready: true } });
}

void main().catch(error => {
  console.error(error);
  document.body.textContent = `The Surfaces page could not load: ${String(error)}`;
});
