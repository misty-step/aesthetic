# Ship the canonical behavior layer as recipes

Priority: P1 · Status: pending · Estimate: M

## Goal

Every behavior the CSS implies has exactly one canonical implementation
maintained in this repo, so consumers stop hand-rolling divergent glue
for the same four primitives.

## Oracle

- [ ] A `recipes/` directory holds one self-contained, dependency-free
      snippet per behavior: mode toggle (FOUC-free boot script, persists
      choice, next-themes compatible), nav indicator (positions
      `.ae-nav-ind` on view change, resize, and font load), view swap
      (remount plus the exit/enter hook backlog 001 designs), and the
      send moment (`is-sent` + `disabled`).
- [ ] The send recipe announces success to screen readers — the
      `aria-hidden` done layer is currently silent, so an SR user never
      hears "Sent" on a still-"Send message"-labeled disabled button.
- [ ] The demo page (backlog 003) runs on the recipes verbatim: zero
      ad-hoc glue in `demo/`.
- [ ] README points each JS-requiring primitive at its recipe, and the
      Layout example's mode toggle matches the canonical icon markup
      (today it still shows the v1 text toggle `>dark<`).
- [ ] At least one production consumer replaces its hand-rolled glue
      with the recipes, diff linked in the closing commit.

## Children

1. Mode toggle recipe: pre-paint boot script (no flash of wrong mode),
   class + `data-ae-mode` setting, localStorage persistence; fix the
   README Layout example's stale text-toggle markup.
2. Nav indicator recipe: measure + position on activation, `resize`,
   and `document.fonts.ready`.
3. View swap recipe: remount choreography now; grows the `data-leaving`
   exit hook when backlog 001 lands the vocabulary.
4. Send moment recipe: `is-sent`, `disabled`, and an SR announcement
   (`role="status"` live region or label swap — decide and document).
5. Wire the demo page (backlog 003) to consume the recipes verbatim.
6. Migrate one production consumer onto the recipes.

## Notes

**Why (premise-inversion lens):** "One stylesheet, no JavaScript" is
half-true. Four primitives are styling for behavior the consumer must
write — mode toggle, `.ae-nav-ind` positioning, view swapping, the send
moment — and each of the two (soon three) production sites hand-rolls
~100 lines of identical glue, divergently. The CSS stays the product;
recipes are documentation that happens to execute, not a framework.
Keep each snippet small enough to read in one screen and copy-paste
without a build step. Blocks the honest completion of backlog 001
(exit choreography needs a canonical hook) and feeds backlog 003 (the
demo proves the recipes).
