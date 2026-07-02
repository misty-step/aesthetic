# Component registry tier — per-primitive shadcn-style install units

Priority: P1 · Status: open · Estimate: M

## Goal

`site/r/registry.json` today ships two coarse items — `aesthetic` (the
whole CSS file + tokens) and `recipes` (the whole combined JS file). A
consumer running `npx shadcn add https://aesthetic.mistystep.io/r/...`
gets everything or nothing; there is no "just give me the dialog primitive
and its recipe" unit, which is the actual shadcn-registry job (copy one
component's code into the consumer's repo, own it from there). This
ticket ships the granular tier: one registry item per primitive (or per
closely-coupled primitive family — e.g. `choice` bundling check/radio/
switch), each declaring its CSS slice, its recipe dependency if any, and
its token dependencies.

## Oracle

- [ ] `site/r/primitives.json` (33 primitives, already itemized for the
      gallery) gains a registry-shaped sibling — either extend
      `registry.json`'s `items[]` with one entry per primitive/family, or
      ship `site/r/components/<name>.json` per shadcn's per-item file
      convention. Pick one; document the choice in `CLAUDE.md`'s repo-shape
      section.
- [ ] Each item's `files[]` names the exact CSS custom properties and
      classes it needs (a real extraction from `aesthetic.css`, not the
      whole file) plus its recipe file if the primitive is JS-backed
      (dialog, toast, pop, settings, anticipate).
- [ ] `npx shadcn add https://aesthetic.mistystep.io/r/<primitive>.json`
      installs a working, styled primitive into a scratch consumer repo
      that has _not_ installed the full `aesthetic` item — proves the
      slice is self-contained (or correctly declares its `registryDependencies`
      on shared tokens/base).
- [ ] `scripts/build-registry.mjs` generates the per-primitive items from
      `aesthetic.css` + `recipes/` mechanically (matching the existing
      `build:registry`/`build:feed` pattern) — never hand-maintained, same
      "never edit by hand" contract `CLAUDE.md` already states for
      `site/r/`.
- [ ] `npm run check`'s registry/feed drift check extends to the new
      per-primitive items (stale generation fails the gate, same as today).
- [ ] `docs/ADOPTING.md` documents the granular install path alongside the
      existing whole-file path, with a worked example (install `.ae-toast` + its recipe only).

## Notes

**Relationship to the non-goal "no component library as the product."**
This ticket is explicitly copy-paste-to-own, not a runtime package a
consumer imports and stays coupled to — same posture as the existing two
registry items, just finer-grained. It does not reopen Bet A.

**Relationship to 018.** Each registry item's declared token dependencies
should reference the tier-marked tokens 018 ships (a primitive's `files[]`
entry can say "requires these `brand`-tier tokens to be set, these
`invariant`-tier tokens ship with the primitive") — sequence 018 first if
both are in flight, but this ticket does not block on 018 landing; it can
extract per-primitive CSS slices against the current flat token set and
pick up the tier metadata later.

**Relationship to the CLI face (021).** The mechanical form of "install
one primitive" for a consumer without `npx shadcn` available (or who
wants an aesthetic-native command) is a `sync` subcommand reading this
same registry — this ticket ships the data the CLI consumes; it does not
require the CLI to exist first.

**Why this and not "just point people at `aesthetic.css`."** The 2026-06
assessment found 4 of 19 fleet repos actually vendoring the CSS file and
15 with an open, unexecuted adoption ticket — a likely friction point is
"vendor 52KB of CSS to use one button," which a granular registry removes
without weakening the single-file identity of the canonical artifact.
