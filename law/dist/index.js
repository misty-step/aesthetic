/* the law as a consumer-enforceable gate.

   Import from '@misty-step/aesthetic/law' in your Playwright tests:

     import { assertLaw, collectConsoleErrors } from '@misty-step/aesthetic/law';

     test('my app holds the law', async ({ page }) => {
       const errors = collectConsoleErrors(page);
       await page.goto('/dashboard');
       await assertLaw(page, { consoleErrors: errors });
     });

   Or sweep routes in both modes:

     import { assertLawRoute } from '@misty-step/aesthetic/law';

     for (const route of ['/dashboard', '/settings']) {
       for (const mode of ['light', 'dark'] as const) {
         test(`${route} · ${mode}`, assertLawRoute(route, mode));
       }
     }

   On failure, assertLaw throws with named offenders — which invariant
   broke and which elements caused it. No silent pass/fail. */
import { checkAll, collectConsoleErrors } from './invariants.js';
/** Assert the law holds on the current page. Throws with named offenders on failure. */
export async function assertLaw(page, opts = {}) {
  const violations = await checkAll(page, opts);
  if (violations.length === 0) return;
  const message = violations
    .map(
      (v) =>
        `✗ law violation: ${v.invariant}\n  offenders:\n    ${v.offenders.join('\n    ')}`,
    )
    .join('\n');
  throw new Error(`\n${message}\n`);
}
/** Returns a Playwright test function that navigates to a route, optionally
    sets the aesthetic mode, and asserts the law. Use directly as the test body:

    test('dashboard · light', assertLawRoute('/dashboard', 'light')); */
export function assertLawRoute(route, mode, opts) {
  return async ({ page }) => {
    const errors = collectConsoleErrors(page);
    if (mode) {
      await page.addInitScript((m) => {
        localStorage.setItem('ae-mode', m);
      }, mode);
    }
    await page.goto(route);
    await page.waitForLoadState('networkidle');
    await assertLaw(page, { ...opts, consoleErrors: errors });
  };
}
// re-exports for consumer convenience
export {
  collectConsoleErrors,
  checkFontSize,
  checkRadius,
  checkNoPageScroll,
  checkCursorDefault,
  checkConsoleClean,
  checkAll,
} from './invariants.js';
