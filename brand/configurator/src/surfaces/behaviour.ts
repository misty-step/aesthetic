// Behaviour for the spine's components, ported from the root recipes/: dialog.js (focus in, Tab cycles, focus
// returns to the invoker, title labels the dialog), pop.js (the slip placed by its invoker, arrow keys through its
// menu), toast.js (news that stays until dismissed, four at most), settings.js (rows fold open a chooser; Escape
// folds and returns focus) and the lab preview's tab keys (ArrowLeft, ArrowRight, Home, End). One set of
// document-level listeners serves every face and every screen.
import { icon, statusIcon, type Status } from './icons';

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
const returnTo = new WeakMap<HTMLElement, HTMLElement>();

function focusables(root: Element): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(el => !(el as HTMLButtonElement).disabled && el.offsetParent !== null);
}

/** Opens a dialog as a modal; closing it returns focus to the invoker (or, for a menu item, to the menu's button). */
export function openDialog(dialog: HTMLDialogElement, invoker: HTMLElement) {
  if (!dialog.hasAttribute('aria-labelledby') && !dialog.hasAttribute('aria-label')) {
    const title = dialog.querySelector<HTMLElement>('.sp-dialog-title');
    if (title) {
      title.id ||= `${dialog.id || 'dialog'}-title`;
      dialog.setAttribute('aria-labelledby', title.id);
    }
  }
  const pop = invoker.closest<HTMLElement>('[popover]');
  returnTo.set(dialog, (pop && document.querySelector<HTMLElement>(`[popovertarget="${pop.id}"]`)) || invoker);
  pop?.hidePopover();
  dialog.returnValue = '';
  dialog.showModal();
}

/** Shows a toast in the tray. It stays until dismissed or pushed out by a fifth. */
export function toast(tray: HTMLElement, message: string, status?: Status): HTMLElement {
  const el = document.createElement('div');
  el.className = 'sp-toast';
  el.setAttribute('role', 'status');
  el.innerHTML = `${status ? statusIcon(status) : ''}<span></span><button class="sp-close" type="button" aria-label="Dismiss">${icon('x')}</button>`;
  el.querySelector('span')!.textContent = message;
  tray.append(el);
  while (tray.children.length > 4) tray.firstElementChild!.remove();
  return el;
}

/** Marks a field invalid with a message in its note (status on the glyph), or clears it. */
export function setInvalid(input: HTMLInputElement, message: string | null) {
  const note = document.getElementById(`${input.id}-error`);
  if (!note) throw new Error(`#${input.id} has no #${input.id}-error note`);
  const described = (input.getAttribute('aria-describedby') ?? '').split(' ').filter(id => id && id !== note.id);
  if (message) {
    input.setAttribute('aria-invalid', 'true');
    note.innerHTML = `${statusIcon('err')}<span></span>`;
    note.querySelector('span')!.textContent = message;
    described.push(note.id);
  } else {
    input.removeAttribute('aria-invalid');
  }
  note.hidden = !message;
  input.setAttribute('aria-describedby', described.join(' '));
}

function selectTab(tab: HTMLElement, focus: boolean) {
  const list = tab.closest('[role="tablist"]')!;
  for (const t of list.querySelectorAll<HTMLElement>('[role="tab"]')) {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    const panel = document.getElementById(t.getAttribute('aria-controls') ?? '');
    if (panel) panel.hidden = !on;
  }
  if (focus) tab.focus();
  tab.dispatchEvent(new CustomEvent('sp-tab', { bubbles: true }));
}

function foldSetting(row: HTMLElement, open: boolean) {
  const chooser = row.nextElementSibling as HTMLElement | null;
  chooser?.classList.toggle('is-open', open);
  row.setAttribute('aria-expanded', String(open));
}

function place(pop: HTMLElement, invoker: HTMLElement) {
  const r = invoker.getBoundingClientRect(), p = pop.getBoundingClientRect();
  let top = r.bottom + 6;
  if (top + p.height > innerHeight - 8) top = r.top - p.height - 6;
  const left = Math.min(r.left, innerWidth - p.width - 8);
  pop.style.top = `${Math.max(8, top)}px`;
  pop.style.left = `${Math.max(8, left)}px`;
}

const menuItems = (menu: Element) => [...menu.querySelectorAll<HTMLElement>('.sp-menu-item')].filter(b => !(b as HTMLButtonElement).disabled);

let wired = false;
/** Installs the document-level behaviour once. */
export function wire() {
  if (wired) return;
  wired = true;

  document.addEventListener('click', event => {
    const target = event.target as Element;
    const opener = target.closest<HTMLElement>('[data-sp-dialog]');
    if (opener) {
      const dialog = document.querySelector<HTMLDialogElement>(opener.dataset.spDialog!);
      if (dialog) openDialog(dialog, opener);
      return;
    }
    const closer = target.closest<HTMLElement>('[data-sp-close]');
    if (closer) {
      closer.closest('dialog')?.close(closer.dataset.spClose || '');
      return;
    }
    const tab = target.closest<HTMLElement>('[role="tab"]');
    if (tab) {
      selectTab(tab, false);
      return;
    }
    const row = target.closest<HTMLElement>('.sp-setting');
    if (row) {
      const open = row.getAttribute('aria-expanded') !== 'true';
      row.closest('.sp-settings')?.querySelectorAll<HTMLElement>('.sp-setting').forEach(r => foldSetting(r, false));
      foldSetting(row, open);
      return;
    }
    const option = target.closest<HTMLElement>('.sp-chooser .sp-menu-item');
    if (option) {
      const chooser = option.closest('.sp-chooser')!, settingRow = chooser.previousElementSibling as HTMLElement;
      chooser.querySelectorAll('.sp-menu-item').forEach(o => o.setAttribute('aria-checked', String(o === option)));
      const value = settingRow.querySelector('.sp-setting-value');
      if (value) value.textContent = option.dataset.value ?? option.textContent!.trim();
      foldSetting(settingRow, false);
      settingRow.focus();
      return;
    }
    const dismiss = target.closest('.sp-toast .sp-close');
    if (dismiss) {
      const t = dismiss.closest<HTMLElement>('.sp-toast')!;
      t.classList.add('is-leaving');
      t.addEventListener('animationend', () => t.remove(), { once: true });
      return;
    }
    const item = target.closest<HTMLElement>('[popover] .sp-menu-item');
    if (item) item.closest<HTMLElement>('[popover]')!.hidePopover();
  });

  document.addEventListener('keydown', event => {
    const el = event.target as HTMLElement;
    if (el.getAttribute('role') === 'tab' && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const tabs = [...el.closest('[role="tablist"]')!.querySelectorAll<HTMLElement>('[role="tab"]')];
      const i = tabs.indexOf(el);
      const n = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (i + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      selectTab(tabs[n], true);
      return;
    }
    const menu = el.closest('.sp-menu');
    if (menu && ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      const items = menuItems(menu);
      const i = items.indexOf(el);
      const next = event.key === 'ArrowDown' ? items[(i + 1) % items.length] : event.key === 'ArrowUp' ? items[(i - 1 + items.length) % items.length] : event.key === 'Home' ? items[0] : items[items.length - 1];
      if (!next) return;
      event.preventDefault();
      items.forEach(b => (b.tabIndex = -1));
      next.tabIndex = 0;
      next.focus();
      return;
    }
    const chooser = el.closest('.sp-chooser');
    if (chooser && event.key === 'Escape') {
      const row = chooser.previousElementSibling as HTMLElement;
      foldSetting(row, false);
      row.focus();
      return;
    }
    const dialog = el.closest('dialog[open]');
    if (dialog && event.key === 'Tab') {
      const items = focusables(dialog);
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  // Dialogs return focus to whatever opened them, on every way of closing (button, Escape, form).
  document.addEventListener('close', event => {
    const dialog = event.target as HTMLElement;
    returnTo.get(dialog)?.focus();
    returnTo.delete(dialog);
  }, true);

  // A popover opens beside its invoker with its checked (or first) item focused; closing returns focus there.
  document.addEventListener('toggle', event => {
    const pop = event.target as HTMLElement;
    if (!(pop instanceof HTMLElement) || !pop.classList.contains('sp-pop')) return;
    const invoker = document.querySelector<HTMLElement>(`[popovertarget="${pop.id}"]`);
    if (!invoker) return;
    invoker.setAttribute('aria-expanded', String((event as ToggleEvent).newState === 'open'));
    if ((event as ToggleEvent).newState !== 'open') {
      if (!document.activeElement || document.activeElement === document.body || pop.contains(document.activeElement)) invoker.focus();
      return;
    }
    place(pop, invoker);
    const items = menuItems(pop);
    if (!items.length) return;
    items.forEach(b => (b.tabIndex = -1));
    const first = items.find(b => b.getAttribute('aria-checked') === 'true') ?? items[0];
    first.tabIndex = 0;
    first.focus();
  }, true);
}
