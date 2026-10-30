// Lobby: Poppycock's entrance and, once a table exists, its waiting room, with the app's own strings and behaviour:
// create and join are a tab set, the name is 1 to 24 characters, a room code is four characters from Parlor's
// alphabet, and the host needs three players to start. There is no server here, so creating a table opens a waiting
// room for this browser alone and joining any code meets the app's "no table" error. Players are neutral stand-ins.
import { esc } from '../../html';
import { setInvalid } from '../behaviour';
import * as P from '../content/poppycock';
import { icon } from '../icons';

type Step = 'entrance' | 'table';
const state = { step: 'entrance' as Step, name: '', code: '' };
const joinUrl = () => `${P.PAGE_URL}?join=${state.code}`;

// Neutral pixel portraits drawn for this lab on an 8 x 8 grid, never Poppycock's illustrated characters.
const FACES = [
  ['..####..', '.######.', '##.##.##', '########', '########', '#.####.#', '##....##', '.######.'],
  ['..####..', '.######.', '#..##..#', '#..##..#', '########', '###..###', '########', '.######.'],
  ['.#....#.', '.######.', '##.##.##', '########', '##....##', '###..###', '.######.', '..####..'],
].map(rows => `<svg viewBox="0 0 8 8" shape-rendering="crispEdges" aria-hidden="true">${rows.flatMap((row, y) => [...row].map((c, x) => c === '#' ? `<rect x="${x}" y="${y}" width="1" height="1" fill="currentColor"/>` : '')).join('')}</svg>`);

function field(id: string, label: string, help: string, attrs: string) {
  return `<div class="sp-field"><label class="sp-label" for="${id}">${esc(label)}</label><input class="sp-input" id="${id}" ${attrs} aria-describedby="${id}-help"><p class="sp-hint" id="${id}-help">${esc(help)}</p><p class="sp-field-note" id="${id}-error" hidden></p></div>`;
}

function form(mode: 'create' | 'join') {
  const E = P.ENTRANCE, label = mode === 'create' ? E.create : E.join;
  return `<form class="lobby-form" novalidate aria-label="${esc(label)}" data-mode="${mode}">
    ${field(`name-${mode}`, E.name, E.nameHelp, `name="displayName" autocomplete="nickname" required value="${esc(state.name)}"`)}
    ${mode === 'join' ? field('code', E.code, E.codeHelp, `name="roomCode" autocapitalize="characters" autocomplete="off" spellcheck="false" required minlength="4" maxlength="4"`) : ''}
    <button class="sp-button" type="submit">${esc(label)}</button>
  </form>`;
}

function invitation(where: string) {
  const R = P.ROOM;
  return `<div class="lobby-invitation">
    <div><p class="lobby-muted">${esc(R.roomCode)}</p><strong class="lobby-code">${esc(state.code)}</strong></div>
    <button class="sp-button sp-quiet" type="button" data-copy>${icon('copy')}<span>${esc(R.copy)}</span></button>
    <p class="sp-sr" role="status" data-copy-status></p>
    <div class="sp-field" data-manual hidden><label class="sp-label" for="link-${where}">${esc(R.manualLabel)}</label><input class="sp-input" id="link-${where}" readonly value="${esc(joinUrl())}"></div>
  </div>`;
}

function controls() {
  const R = P.ROOM;
  if (state.step === 'entrance') return `<button class="sp-button sp-quiet" type="button" data-sp-dialog="#rules-dialog">${icon('circle-question-mark')}${esc(P.HOW_TO_PLAY)}</button>`;
  return `<nav class="lobby-controls" aria-label="${esc(R.controls)}">
    <button class="sp-button sp-quiet" type="button" data-sp-dialog="#invite-dialog" aria-haspopup="dialog" aria-label="${esc(R.roomLabel(state.code))}"><span class="lobby-room-word">${esc(R.room)}</span><strong>${esc(state.code)}</strong></button>
    <button class="sp-button sp-quiet sp-icon-only" type="button" popovertarget="table-options" aria-haspopup="menu" aria-expanded="false" aria-label="${esc(R.options)}">${icon('ellipsis')}</button>
    <div class="sp-pop" id="table-options" popover><div class="sp-menu" role="menu" aria-label="${esc(R.options)}">
      <button class="sp-menu-item" type="button" role="menuitem" data-sp-dialog="#invite-dialog">${icon('share-2')}${esc(R.invite)}</button>
      <button class="sp-menu-item" type="button" role="menuitem" data-sp-dialog="#rules-dialog">${icon('circle-question-mark')}${esc(P.HOW_TO_PLAY)}</button>
      <hr class="sp-menu-sep" role="separator">
      <button class="sp-menu-item" type="button" role="menuitem" data-sp-dialog="#leave-dialog">${icon('log-out', 'sp-err')}${esc(R.leave)}</button>
    </div></div>
  </nav>`;
}

function main() {
  const E = P.ENTRANCE, R = P.ROOM;
  if (state.step === 'entrance') return `<section class="lobby-entrance" aria-labelledby="entrance-title">
    <div class="lobby-intro"><h1 id="entrance-title" tabindex="-1">${esc(E.title)}</h1><p>${esc(E.intro)}</p></div>
    <div class="lobby-ticket sp-panel sp-panel-feature">
      <div class="lobby-ticket-head"><h2>${esc(E.panelTitle)}</h2><p>${esc(E.panelIntro)}</p></div>
      <div class="sp-tabs" role="tablist" aria-label="${esc(E.modes)}">
        <button class="sp-tab" type="button" role="tab" id="mode-create" aria-controls="panel-create" aria-selected="true" tabindex="0">${esc(E.create)}</button>
        <button class="sp-tab" type="button" role="tab" id="mode-join" aria-controls="panel-join" aria-selected="false" tabindex="-1">${esc(E.join)}</button>
      </div>
      <div class="sp-tabpanel" role="tabpanel" id="panel-create" aria-labelledby="mode-create">${form('create')}</div>
      <div class="sp-tabpanel" role="tabpanel" id="panel-join" aria-labelledby="mode-join" hidden>${form('join')}</div>
    </div>
    <figure class="lobby-bluff">
      <figcaption class="lobby-bubble"><p>${esc(E.bluffFor)}</p><blockquote>${esc(E.bluff)}</blockquote></figcaption>
      <div class="lobby-cast" aria-hidden="true">${FACES.map(svg => `<span class="sp-portrait">${svg}</span>`).join('')}</div>
    </figure>
  </section>`;
  const present = 1;
  return `<section class="lobby-room-heading"><h1 id="room-title" tabindex="-1">${esc(R.title)}</h1><p>${esc(R.intro)}</p></section>
  <div class="lobby-grid">
    <aside class="lobby-invite sp-panel sp-panel-aside" aria-labelledby="invite-title"><h2 id="invite-title">${esc(R.inviteTitle)}</h2><p>${esc(R.inviteIntro)}</p>${invitation('board')}</aside>
    <section class="lobby-roster sp-panel" aria-labelledby="roster-title">
      <div class="lobby-roster-head"><h2 id="roster-title">${esc(R.rosterTitle)}</h2><p>${esc(R.count(present))}</p></div>
      <ul><li class="lobby-player"><span class="sp-portrait" aria-hidden="true">${esc([...state.name][0] ?? '')}</span><div><strong>${esc(state.name)}<span>${esc(R.you)}</span></strong><small>${esc(R.host)}</small></div></li></ul>
      <div class="lobby-start"><button class="sp-button" type="button" disabled>${esc(R.start)}</button><p role="status">${esc(present < 3 ? R.needMore(3 - present) : R.ready)}</p></div>
    </section>
  </div>`;
}

const dialogs = () => `
<dialog class="sp-dialog" id="rules-dialog" aria-labelledby="rules-title">
  <button class="sp-close" type="button" data-sp-close aria-label="Close">${icon('x')}</button>
  <h2 class="sp-dialog-title" id="rules-title">${esc(P.RULES_DIALOG.title)}</h2>
  <div class="sp-dialog-body">
    <p>${esc(P.RULES_DIALOG.description)}</p>
    <ol class="lobby-rules">${P.RULES_DIALOG.steps.map(([title, body], i) => `<li><span aria-hidden="true">${i + 1}</span><div><h3>${esc(title)}</h3><p>${esc(body)}</p></div></li>`).join('')}</ol>
    <div class="lobby-scoring"><h3>${esc(P.RULES_DIALOG.scoring)}</h3><dl>${P.RULES_DIALOG.points.map(([what, points]) => `<div><dt>${esc(what)}</dt><dd>${esc(points)}</dd></div>`).join('')}</dl></div>
  </div>
</dialog>
<dialog class="sp-dialog" id="invite-dialog" aria-labelledby="invite-dialog-title">
  <button class="sp-close" type="button" data-sp-close aria-label="Close">${icon('x')}</button>
  <h2 class="sp-dialog-title" id="invite-dialog-title">${esc(P.INVITE_DIALOG.title)}</h2>
  <div class="sp-dialog-body"><p>${esc(P.INVITE_DIALOG.description)}</p><div data-invitation></div></div>
</dialog>
<dialog class="sp-dialog" id="leave-dialog" aria-labelledby="leave-title">
  <h2 class="sp-dialog-title" id="leave-title">${esc(P.LEAVE_DIALOG.title)}</h2>
  <div class="sp-dialog-body"><p>${esc(P.LEAVE_DIALOG.lastPlayer)}</p></div>
  <div class="sp-dialog-actions"><button class="sp-button sp-quiet" type="button" data-sp-close>${esc(P.LEAVE_DIALOG.cancel)}</button><button class="sp-button" type="button" data-sp-close="leave">${esc(P.LEAVE_DIALOG.confirm)}</button></div>
</dialog>`;

function show(step: Step, focus: boolean) {
  state.step = step;
  document.querySelector('[data-controls]')!.innerHTML = controls();
  document.getElementById('main-content')!.innerHTML = main();
  document.querySelector('[data-invitation]')!.innerHTML = state.step === 'table' ? invitation('dialog') : '';
  if (focus) document.querySelector<HTMLElement>('main h1')!.focus();
}

export function render(params: URLSearchParams): string {
  if (params.get('step') === 'table') Object.assign(state, { step: 'table', name: P.SAMPLE.name, code: P.SAMPLE.code });
  const credit = P.FOOTER.credit.map(([text, href]) => href
    ? `<a class="sp-link" href="${href}"${href.startsWith('https://poppycock') ? '' : ` target="_blank" rel="noopener noreferrer"`}>${esc(text)}${href.startsWith('https://poppycock') ? '' : `<span class="sp-sr">${esc(P.FOOTER.newTab)}</span>`}</a>`
    : esc(text)).join('');
  return `<div class="lobby">
<a class="sp-skip" href="#main-content">${esc(P.SKIP)}</a>
<header class="lobby-header">
  <span class="lobby-wordmark" role="img" aria-label="${esc(P.BRAND.label)}"><span class="lobby-mark" aria-hidden="true"><span>p</span></span><span>${esc(P.BRAND.name)}<span aria-hidden="true">${esc(P.BRAND.bang)}</span></span></span>
  <div data-controls>${controls()}</div>
</header>
<main id="main-content" tabindex="-1">${main()}</main>
<footer class="lobby-foot"><span>${esc(P.FOOTER.line)}</span><p>${credit}</p></footer>
</div>${dialogs()}`;
}

export function mount() {
  document.querySelector('[data-invitation]')!.innerHTML = state.step === 'table' ? invitation('dialog') : '';

  document.addEventListener('input', event => {
    const input = event.target as HTMLInputElement;
    if (input.name === 'displayName') {
      state.name = input.value;
      document.querySelectorAll<HTMLInputElement>('input[name="displayName"]').forEach(other => { if (other !== input) other.value = input.value; });
      setInvalid(input, null);
    } else if (input.name === 'roomCode') {
      input.value = input.value.toUpperCase().replace(/\s/g, '').slice(0, P.ROOM_CODE_LENGTH);
      setInvalid(input, null);
    }
  });

  document.addEventListener('submit', event => {
    const form = (event.target as Element).closest<HTMLFormElement>('.lobby-form');
    if (!form) return;
    event.preventDefault();
    const nameInput = form.querySelector<HTMLInputElement>('input[name="displayName"]')!;
    const name = P.displayName(nameInput.value);
    if (!name) {
      setInvalid(nameInput, P.ENTRANCE.nameInstruction);
      nameInput.focus();
      return;
    }
    if (form.dataset.mode === 'join') {
      const codeInput = form.querySelector<HTMLInputElement>('input[name="roomCode"]')!;
      setInvalid(codeInput, P.ROOM_CODE.test(codeInput.value) ? P.ROOM_NOT_FOUND : P.ENTRANCE.codeInstruction);
      codeInput.focus();
      return;
    }
    const pick = crypto.getRandomValues(new Uint32Array(P.ROOM_CODE_LENGTH));
    Object.assign(state, { name, code: [...pick].map(n => P.ROOM_CODE_ALPHABET[n % P.ROOM_CODE_ALPHABET.length]).join('') });
    show('table', true);
  });

  document.addEventListener('click', async event => {
    const copy = (event.target as Element).closest<HTMLElement>('[data-copy]');
    if (!copy) return;
    const where = copy.closest('.lobby-invitation')!;
    const status = where.querySelector('[data-copy-status]')!, manual = where.querySelector<HTMLElement>('[data-manual]')!;
    try {
      await navigator.clipboard.writeText(joinUrl());
      copy.innerHTML = `${icon('check')}<span>${esc(P.ROOM.copied)}</span>`;
      status.textContent = P.ROOM.copiedStatus;
      manual.hidden = true;
    } catch {
      status.textContent = P.ROOM.manualStatus;
      manual.hidden = false;
      const link = manual.querySelector('input')!;
      requestAnimationFrame(() => { link.focus(); link.select(); });
    }
  });

  document.getElementById('leave-dialog')!.addEventListener('close', event => {
    if ((event.target as HTMLDialogElement).returnValue !== 'leave') return;
    Object.assign(state, { code: '' });
    show('entrance', true);
  });
}
