# Ship the canonical behavior layer as recipes

Priority: P1 · Status: shipped · Estimate: M

## Goal

Every behavior the CSS implies has exactly one canonical implementation
maintained in this repo, so consumers stop hand-rolling divergent glue
for the same primitives.

## Oracle

- [ ] A `recipes/` directory holds self-contained, dependency-free
      snippets: the mode boot (FOUC-free, inline in head), the mode
      toggle (view-transition breath, persists choice, next-themes
      compatible), nav indicator (activation, resize, font load),
      view swap, the send moment, settings rows, input anticipation —
      plus a combined `recipes.js` mirroring what the site runs.
- [ ] The send recipe announces success to screen readers — a
      `role="status"` live region or label swap; the `aria-hidden`
      done layer alone is silent.
- [ ] The site runs the recipes verbatim: `site/recipes.js` becomes a
      symlink (or byte-identical copy checked by CI) of the canonical
      file — zero ad-hoc glue in `site/`.
- [ ] README points each JS-requiring primitive at its recipe, and
      the Layout example's mode toggle matches the canonical icon
      markup (today it still shows the v1 text toggle `>dark<`).
- [ ] Recipes are reachable by consumers without npm: the jsDelivr
      path (`cdn.jsdelivr.net/gh/misty-step/aesthetic@vX.Y.Z/recipes/…`)
      documented in README/ADOPTING.md; the npm `files` allowlist
      gains `recipes/`.
- [ ] At least one production consumer replaces its hand-rolled glue
      with the recipes, diff linked in the adoption PR (011).

## Children

1. Extract `site/recipes.js` into `recipes/` as the canonical layer;
   the site consumes it verbatim.
2. Send moment: add the SR announcement; document the pattern.
3. README: recipe pointers + fix the stale Layout example toggle.
4. Package: add `recipes/` to the npm files allowlist; document the
   no-build consumption paths.
5. Migrate consumers in the 011 adoption PRs.

## Notes

**Why (premise-inversion lens):** "One stylesheet, no JavaScript" is
half-true — the styling implies behavior the consumer must write, and
each consumer hand-rolls ~100 divergent lines. The CSS stays the
product; recipes are documentation that happens to execute, not a
framework. Keep each snippet small enough to read in one screen.

2026-06-12 groom: the seed (site/recipes.js) shipped with v2.4.0 and
already contains mode/nav/send/settings/anticipation; what remains is
extraction to `recipes/`, the SR fix, the README sync, and consumer
migration. Estimate stays M only because of the consumer-migration
oracle; the repo-side work is S.
