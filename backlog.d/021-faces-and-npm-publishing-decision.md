# Ship the cheap consumption faces; decide npm publishing

Priority: P1 · Status: open · Estimate: M

## Goal

Per `docs/vision.md`'s Consumption faces section (operator ruling
2026-07-02: aesthetic does not inherit harness-kit's kit-not-a-service
exception), close the two cheapest face gaps — skill and API-naming — and
resolve the standing open question of whether `@misty-step/aesthetic`
publishes to the npm registry or stays git-tag/CDN-only. These three are
bundled because each is a documentation/packaging decision, not new
product surface, and each is a prerequisite the CLI and MCP faces (tracked
separately, sequenced later per the vision) would otherwise duplicate.

## Oracle

- [ ] A skill ships (repo-local `.claude/skills/aesthetic/` or the
      harness-kit-standard equivalent for this repo's harness setup)
      that teaches a consuming agent: the layer model and its
      brand-flexibility contract (what it may set vs never touch), which
      face answers which question (SDK for CI law-checking, API feed for
      reading tokens/primitives/recipes programmatically, the site for
      visual reference), and the steering doctrine's invariants/dials
      split. Self-contained per the shared skill-writing contract — no
      `$REPO_ROOT` sourcing, portable.
- [ ] `README.md`, `docs/ADOPTING.md`, and `docs/vision.md` all name
      `site/r/*.json` explicitly as **the API face** (not left implicit as
      "the registry") — one sentence each, pointing at the same
      `aesthetic.json`/`primitives.json`/`recipes.json`/`registry.json`
      feed that already exists.
- [ ] The npm publishing question is decided and recorded, not left as
      ambient 404 status: either (a) publish `@misty-step/aesthetic` to
      the npm registry (add `publishConfig`, wire `npm publish` into
      `scripts/release.mjs`'s release flow, decide public vs scoped-private
      access) with the tradeoff argued (discoverability + standard
      `npm install` UX vs. a second distribution channel to keep in sync
      with the git-tag one that's authoritative today), or (b) explicitly
      decline and say why in `README.md`'s Install section (today's three
      install paths — pinned git tag, CDN link, shadcn registry — already
      cover the real consumption modes; a fourth channel may be pure
      surface area for zero new reach). Either verdict is acceptable; an
      undecided 404 is not.
- [ ] If (a): a scratch `npm install @misty-step/aesthetic@<version>`
      resolves and the installed package matches the git-tag contents
      (`files` allowlist, `law/` included per the current manifest).
- [ ] `npm run check` passes; no change to the law gate or existing
      install paths (this ticket adds/documents faces, it does not remove
      any).

## Notes

**Why bundled and not three tickets.** All three are low-code,
high-documentation-leverage moves that unblock the higher-cost CLI/MCP
work without duplicating groundwork — the skill needs to describe the
install paths, so it should be written after (or alongside) the npm
decision, not before, to avoid describing a face that then changes shape.

**CLI and MCP are deliberately not in this ticket's scope.** Per the
vision's sequencing argument (skill → CLI → MCP), file the CLI
(`scaffold`/`lint`/`sync`) as its own ticket once 019 (component registry
tier) has a concrete `sync` target to build against, and file MCP only
once a real consumer has demonstrated needing live queries beyond a
one-time API-feed fetch — do not pre-build either speculatively.

**Relationship to 011.** The skill's steering-doctrine content and the
API-feed naming pass directly reduce the friction the fleet-adoption
census (011, updated 2026-07-02) identifies — an agent working an
adoption PR that can read one skill instead of `README.md` + `DESIGN.md`

- `docs/ADOPTING.md` cold is cheaper to convert.
