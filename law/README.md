# The Law Gate

Prove the Misty Step design law holds on your own surfaces — mechanically,
in CI, with named offenders on failure.

## Quickstart

```sh
npm install @misty-step/aesthetic
```

You need `@playwright/test` installed (it's an optional peer dependency —
only required if you use the law gate):

```sh
npm install -D @playwright/test
```

```typescript
import { assertLaw, collectConsoleErrors } from '@misty-step/aesthetic/law';
import { test } from '@playwright/test';

test('my app holds the law', async ({ page }) => {
  const errors = collectConsoleErrors(page);
  await page.goto('/dashboard');
  await assertLaw(page, { consoleErrors: errors });
});
```

## Sweep routes in both modes

```typescript
import { assertLawRoute } from '@misty-step/aesthetic/law';
import { test } from '@playwright/test';

const routes = ['/dashboard', '/settings', '/profile'];
const modes = ['light', 'dark'] as const;

for (const route of routes) {
  for (const mode of modes) {
    test(`${route} · ${mode}`, assertLawRoute(route, mode));
  }
}
```

## The five invariants

| Invariant       | What it checks                                                        |
| --------------- | --------------------------------------------------------------------- |
| `fontSize`      | Nothing renders larger than 16px (content) / 13px (chrome)            |
| `radius`        | No element has non-zero `border-radius` — round marks are SVG circles |
| `noPageScroll`  | The page itself never scrolls (stages scroll inside)                  |
| `cursorDefault` | Static text keeps the default cursor (no I-beam)                      |
| `consoleClean`  | No error-level console messages or uncaught page errors               |

## On failure

```
✗ law violation: radius
  offenders:
    div.card → 8px
    button.submit → 12px
✗ law violation: fontSize
  offenders:
    max font size 24.0px exceeds 16px
```

## Skipping invariants

If you intentionally override an invariant (e.g., larger headings):

```typescript
await assertLaw(page, { skip: ['fontSize'] });
```

## API

- `assertLaw(page, opts?)` — throws with named offenders if any invariant fails
- `assertLawRoute(route, mode?, opts?)` — returns a test function that navigates + asserts
- `collectConsoleErrors(page)` — sets up console/pageerror listeners; pass the array to `assertLaw` via `opts.consoleErrors`
- `checkAll(page, opts?)` — returns `LawViolation[]` instead of throwing (for custom reporting)

## How it ships

`@misty-step/aesthetic/law` resolves to a compiled ESM build
(`law/dist`, generated from `law/index.ts` + `law/invariants.ts` by
`npm run build:law`) — Node's own module resolver refuses to load `.ts`
files from `node_modules`, so importing the package by name needs
compiled JS. `law/dist` ships with `law/index.ts`/`law/invariants.ts` in
the same tarball; CI (`build-law.mjs --check`) fails if dist ever drifts
from the source.

If you're pinning-conscious and don't want a `node_modules` dependency
on the gate at all, vendor the `.ts` source verbatim instead: copy
`law/index.ts` and `law/invariants.ts` into your own repo and import them
by relative path. Playwright's test runner handles TypeScript natively —
no build step needed for that path either. Both are supported; pick
whichever matches how much you want this repo's release cadence to touch
your test suite.
