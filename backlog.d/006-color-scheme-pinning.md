# Make pinned modes pin color-scheme too

Priority: P1 · Status: ready · Estimate: S

## Goal

UA-rendered widgets (scrollbars, form controls, selection chrome)
always match the page's resolved mode, including when a site pins a
mode against the OS preference.

## Oracle

- [ ] `.dark` / `[data-ae-mode='dark']` sets `color-scheme: dark`;
      `.light` / `[data-ae-mode='light']` sets `color-scheme: light`.
- [ ] A page pinned light under OS-dark renders light scrollbars and
      form controls (screenshot from the demo page or a manual check,
      both Chromium and WebKit).

## Notes

**Why (spec-robustness lens, found in the 2026-06-11 groom):** `:root`
declares `color-scheme: light dark` and the mode blocks only swap
custom-property values. With both schemes allowed, the browser resolves
the used scheme from the user's OS preference — so a site pinned
`.light` under OS-dark gets dark scrollbars and dark-styled form
controls against the light surface. Two-line fix in the existing
pinned-mode blocks (aesthetic.css `.dark` / `.light` selectors).
