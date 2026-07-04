# PRODUCT_NAME DESIGN.md

This file is the product's public-site brand contract. Keep it short and exact:
agents and humans should be able to update `site/` from this file without
inventing a second design system.

## Brand Voice

- Plain-spoken, concrete, and operator-facing.
- Lead with the user outcome, then the proof.
- Avoid marketing fog, mascot language, and decorative claims.

## Pitch One-Liner

`PRODUCT_NAME helps TARGET_USER do OUTCOME without FAILURE_MODE.`

## Lucide Mark

- Icon: `kanban`
- Reason: chosen for PRODUCT_NAME because it communicates WORKFLOW_SHAPE.
- Rule: the mark is an inline Lucide SVG inside `.ae-app-mark`. No bespoke
  marks, logo images, emoji marks, or colored wordmarks.

## Palette Hooks

Only steer brand tokens here. Do not add a second palette.

```css
:root {
  --ae-accent: #2643d0;
  --ae-accent-dark: #8c9eff;
}
```

If the product needs extra categorical hues, name them as project tokens and
spend them on content, never filled pills:

```css
:root {
  --product-signal: #2c6e62;
  --product-signal-dark: #54bba4;
}
```

## Screenshot Inventory

| File                                      | Surface                | State                 | Caption                                    |
| ----------------------------------------- | ---------------------- | --------------------- | ------------------------------------------ |
| `site/assets/screenshots/01-overview.svg` | Main product screen    | Loaded with real data | Replace with the actual overview.          |
| `site/assets/screenshots/02-workflow.svg` | Primary workflow       | Mid-action            | Replace with the actual walkthrough frame. |
| `site/assets/screenshots/03-release.svg`  | Release notes or proof | Latest release        | Replace with the actual shipped proof.     |

## Footer Links

- Misty Step: `https://mistystep.io`
- GitHub: `https://github.com/misty-step/PRODUCT_REPO` when public
- Weave: `https://weave.mistystep.io` for weave-family products

## Release Notes Rule

`site/changelog.html` is user-facing. Write entries as product outcomes, not
commit logs. Each entry needs a date, a version or release label, and one or two
plain-language bullets.
