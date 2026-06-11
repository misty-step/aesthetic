# Build the showcase page and CI guardrails

Priority: P1 · Status: pending · Estimate: M

## Goal

The system demonstrates itself and defends itself: a live page showing
every primitive in both modes, and CI that catches regressions before a
tag ships to two production sites.

## Oracle

- [ ] A demo page in this repo, built with the kit itself, shows every
      primitive (screen, bars, nav, views, registers, form) in light and
      dark, deployed (GitHub Pages) at a stable URL.
- [ ] CI runs stylelint + prettier on every push and fails on violations.
- [ ] Visual regression screenshots of the demo page (both modes) run in
      CI; an unintended pixel change fails the build.
- [ ] The repo has a CLAUDE.md stating the law and the release flow, so
      a cold agent can contribute safely.

## Children

1. `demo/index.html` exercising every primitive with real copy.
2. GitHub Pages deploy + link from README.
3. stylelint + prettier + CI workflow.
4. Playwright screenshot diff of the demo in CI.
5. CLAUDE.md.

## Notes

**Why (harness lens):** the package ships to two production sites with
zero tests, zero lint, and no rendered reference. The demo doubles as
documentation, the visual-diff target, and the place to develop motion
work (backlog 001) honestly.

Promoted P2 → P1 in the 2026-06-11 groom: two backlog premises went
stale within a day of seeding because there is no rendered reference to
check against, and both the motion epic (001) and the recipes epic
(005) name the demo page as their proof surface. The demo should run on
the 005 recipes verbatim — zero ad-hoc glue.
