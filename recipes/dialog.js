/* the dialog: focus, labeling, and restoration for <dialog class="ae-dialog">.

   The native <dialog> + showModal() owns the top layer and Escape.
   This recipe fills the accessibility gaps the browser doesn't:
   — focus moves into the dialog on open (the first focusable control,
     or the dialog itself as fallback)
   — focus is trapped inside while open (Tab cycles within)
   — focus returns to the invoker on close (the button that opened it)
   — if the dialog has an aria-labelledby, it is honored; otherwise the
     .ae-dialog-title is wired as the label if neither is set

   Pair with: a button that calls dialog.showModal(), and both actions
   (cancel + confirm) call dialog.close().

   <button id="open">Open</button>
   <dialog class="ae-dialog" aria-labelledby="dlg-title">
     <p class="ae-dialog-title" id="dlg-title">Archive this project?</p>
     <div class="ae-dialog-acts">
       <button class="ae-button ae-button-quiet">Cancel</button>
       <button class="ae-button">Confirm</button>
     </div>
   </dialog>

   Open it: aeDialog(document.getElementById('open'), dialogEl)
   — or let the recipe auto-wire every [data-ae-dialog] invoker. */
(() => {
  if (window.aeDialog) return;
  const FOCUSABLE =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function focusables(dialog) {
    return [...dialog.querySelectorAll(FOCUSABLE)].filter(
      (el) => !el.disabled && el.offsetParent !== null,
    );
  }

  function label(dialog) {
    if (
      dialog.hasAttribute('aria-labelledby') ||
      dialog.hasAttribute('aria-label')
    )
      return;
    const title = dialog.querySelector('.ae-dialog-title');
    if (!title) return;
    if (!title.id)
      title.id = `ae-dlg-title-${Math.random().toString(36).slice(2, 9)}`;
    dialog.setAttribute('aria-labelledby', title.id);
  }

  function trap(dialog, e) {
    if (e.key !== 'Tab') return;
    const items = focusables(dialog);
    if (items.length === 0) {
      e.preventDefault();
      dialog.focus();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  /* wire one invoker → dialog pair. Returns a cleanup function. */
  function aeDialog(invoker, dialog) {
    if (invoker._aeDialog) return invoker._aeDialog.cleanup;

    let lastFocused = null;
    label(dialog);
    if (!dialog.hasAttribute('tabindex')) dialog.tabIndex = -1;

    const onKey = (e) => trap(dialog, e);
    const open = () => {
      lastFocused = invoker;
      dialog.showModal();
    };
    const onClose = () => {
      if (lastFocused) lastFocused.focus();
      lastFocused = null;
    };

    invoker.addEventListener('click', open);
    dialog.addEventListener('keydown', onKey);
    dialog.addEventListener('close', onClose);

    const cleanup = () => {
      invoker.removeEventListener('click', open);
      dialog.removeEventListener('keydown', onKey);
      dialog.removeEventListener('close', onClose);
      delete invoker._aeDialog;
    };
    invoker._aeDialog = { open, cleanup };
    return cleanup;
  }

  /* auto-wire: <button data-ae-dialog="#dlg-id">Open</button> */
  document.addEventListener('click', (e) => {
    const invoker = e.target.closest('[data-ae-dialog]');
    if (!invoker) return;
    const sel = invoker.getAttribute('data-ae-dialog');
    const dialog = document.querySelector(sel);
    if (!(dialog instanceof HTMLDialogElement)) return;
    if (!invoker._aeDialog) {
      aeDialog(invoker, dialog);
      // first click: the invoker's listener was added during dispatch and
      // won't fire for this event, so open the dialog directly
      invoker._aeDialog.open();
    }
    // subsequent clicks: the invoker's own listener handles opening
  });

  window.aeDialog = aeDialog;
})();
