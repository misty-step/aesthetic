# Token architecture v3 — split semantic tokens from brand tokens

Priority: P1 · Status: open · Estimate: M

## Goal

`tokens.json` names every color/type/motion/space value once, flat, with no
declared boundary between "this is Misty Step law" and "this is a
consumer's dial." The layer model (`docs/vision.md`) now states that
boundary as policy — this ticket makes it real in the token source: a
semantic tier (role, scale step, AA floor — fixed) and a brand tier (the
values a consumer is meant to override — `--ae-accent(-dark)`, the status
triplet, density, mono ratio) that a human or an agent can tell apart by
reading the schema, not by having read `README.md`'s prose first.

## Oracle

- [ ] `tokens.json` restructures onto DTCG shape (`$type`/`$value`, per
      015's existing mandate) AND adds a `$extensions.mistyStep.tier` (or
      equivalent) field on every token: `"invariant"` or `"brand"`. No
      token is unmarked.
- [ ] Every `"brand"`-tier token has a `$description` stating what a
      consumer may set and the constraint it must still satisfy (e.g.
      `--ae-accent`: "any hue; must clear the AA floor recorded in
      `contrast`"). Every `"invariant"`-tier token's `$description` states
      why it is fixed (mirrors the worked example already sketched in 015's
      children — `--ae-radius`: "0 — invariant; round marks are SVG
      circles, never CSS border-radius").
- [ ] `color.light`/`color.dark` and any other light/dark parallel key sets
      collapse into DTCG `$value: {light, dark}` form — the data-layer twin
      of 013's foundation-pass CSS de-triplication. Land in the same PR or
      note the deliberate split; do not let the two drift out of step.
- [ ] The render gate (`law/`) and the future source token-guard (015 child 2) both read tier from the same field — no second classification
      list to keep in sync.
- [ ] A consumer (or an agent) can filter tokens by tier with a one-line
      `jq` query over the `mistyStep.tier` extension field and get exactly
      the dial set named in `README.md`'s steering section — proof the
      schema and the prose agree.
- [ ] `npm run check` (token/feed drift checks) passes on the restructured
      file; `site/tokens.html`'s generation still round-trips.

## Notes

**Relationship to 015.** 015 already committed to DTCG shape and to
authoring a `$description` per token — this ticket is the semantic/brand
_tier_ boundary on top of that shape, not a competing restructure. Land
018 as 015's tier-marking child if 015 is still open when this starts;
otherwise land as a follow-on PR against the DTCG file 015 ships.

**Not an aliasing layer.** The vision's non-goals reject "token tiering /
aliasing" as a recoloring indirection a consumer chains through — that
non-goal is about _runtime alias resolution_ (theme A recolors theme B).
This ticket adds a _classification_ field for the tokens that already
exist; it does not add a new value-resolution mechanism. Keep the flat,
intent-named token set; just say out loud, in the schema, which of those
flat names are dials.

**Why now:** the layer model names this as the concrete blocker for 019
(a consumer installing one primitive needs to know which tokens it may
recolor without reading prose) and for the eventual CLI `lint` face (a
source token-guard needs a machine-readable tier list to enforce against,
not a hand-maintained rule file that drifts from `tokens.json`).
