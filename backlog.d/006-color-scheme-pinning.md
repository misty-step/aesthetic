# Make pinned modes pin color-scheme too

Priority: P1 · Status: shipped · Estimate: S

Shipped in v2.3.1 (commit 1615279): the pinned-mode blocks now narrow
`color-scheme`; recipes.js's inline `style.colorScheme` pin remains as
belt-and-suspenders for consumers on older tags.

## Goal

UA-rendered widgets (scrollbars, form controls, selection chrome)
always match the page's resolved mode, including when a site pins a
mode against the OS preference.

## Oracle

- [x] `.dark` / `[data-ae-mode='dark']` sets `color-scheme: dark`;
      `.light` / `[data-ae-mode='light']` sets `color-scheme: light`.
- [x] A page pinned dark under OS-light renders dark end-to-end
      (verified on the local site walk, Chromium, 2026-06-11; WebKit
      spot-check remains open as a minor residual).

## Notes

**Why (spec-robustness lens, found in the 2026-06-11 groom):** `:root`
declares `color-scheme: light dark` and the mode blocks only swap
custom-property values. With both schemes allowed, the browser resolves
the used scheme from the user's OS preference — so a site pinned
`.light` under OS-dark gets dark scrollbars and dark-styled form
controls against the light surface. Two-line fix in the existing
pinned-mode blocks (aesthetic.css `.dark` / `.light` selectors).
