# Mobile-first audit — 2026-07-07 (aesthetic-928)

Operator, 2026-07-07: "phone needs to be prioritized. I need to be able to
handle all of this on my phone. Glass in particular, but ALL of our
applications need a mobile-optimized UI and UX." The law this audit checks
against is in `DESIGN.md` under "Mobile-first is law".

## Method

Each surface was loaded headless (Chromium via Playwright, this repo's own
`node_modules`) at a 390×844 viewport — the same fixture width
`tests/mobile.spec.ts` gates on — and checked for:

- HTTP status (site actually loads)
- `document.documentElement.scrollWidth - window.innerWidth` (any positive
  value is a horizontal-scroll violation of the law's "never" clause)
- console/page errors
- a full-viewport screenshot, reviewed by eye for collapsed chrome, readable
  type, and no cut-off content

Screenshots live beside this file in `docs/mobile-audit/`.

## Audit table

| Surface                | URL                                             | HTTP | Overflow (px) | Console errors | Verdict                                                                                       |
| ---------------------- | ----------------------------------------------- | ---- | ------------- | -------------- | --------------------------------------------------------------------------------------------- |
| Deck (Bridge)          | `bastion.tail5f5eb4.ts.net/artifacts/a/bridge/` | 200  | 0             | none           | **Clean.** Single-column feed, mono tag badges, no pills.                                     |
| Board (Powder)         | `bastion.tail5f5eb4.ts.net:10001/`              | 200  | 0             | none           | **Clean.** Tabs + filter row readable, card list single-column.                               |
| Glass (marketing site) | `misty-step.github.io/glass/`                   | 200  | 0             | none           | **Clean** (site only — see gap below).                                                        |
| Sanctum (portal)       | `bastion.tail5f5eb4.ts.net/`                    | 200  | 0             | none           | **Clean.** Fleet directory table's three columns fit without stacking or truncation at 390px. |
| Shelf (artifacts)      | `bastion.tail5f5eb4.ts.net/artifacts/`          | 200  | 0             | none           | **Clean.** Search + list render single-column, bottom-chrome home affordance visible.         |

All five surfaces pass the law's hard gate (zero horizontal overflow at
390px) with rendered evidence in `docs/mobile-audit/*.png`. This is
consistent with the mobile suite already gated by `tests/mobile.spec.ts`
(aesthetic-902) landing before this audit — the fleet had already absorbed
the bulk of the work; this pass confirms it held and finds the one real gap
below.

## Gap filed

**Glass's live-stage app has no publicly reachable URL to audit.** The
fleet registry (Sanctum's `FLEET` array) lists only a `site` link for
Glass (the static marketing page audited above) — no `app` link. Glass's
own `README.md` documents the live-stage server as
`cargo run -- serve --bind 127.0.0.1:9041` — loopback-only, not deployed to
the tailnet despite glass-906 ("Application floor: verified-live onboarding
and tailnet deployment contract") showing `done` in Powder. This is
Glass's own deployment gap, not Aesthetic's to fix, and it directly
undercuts the operator's explicit "Glass in particular" callout — the one
surface named by name is the one surface not yet auditable live. Not filing
a duplicate Powder card (glass-906 already claims the deployment contract
is done); flagged as a comment on aesthetic-928 for the Glass lane to
reconcile against its own `docs/deployment.md`.

## Lab/design-template default

`tests/list-row.spec.ts` asserted a 4-column desktop grid with no explicit
viewport, relying on Playwright's implicit 1280×720 default — the exact
desktop-first-by-default gap this law closes. `playwright.config.ts` now
sets `use.viewport` to 390×844 repo-wide, so every future fixture, lab
page, and law-gate test previews mobile-first unless it explicitly opts up
(as `list-row.spec.ts` and the 768px case in `mobile.spec.ts` now do, with
a comment naming why). Full suite re-verified green under the new default:
`npx playwright test` → 74 passed.
