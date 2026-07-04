import type { Page } from '@playwright/test';
import { type InvariantName } from './invariants.js';
export type AssertLawOptions = {
  /** Max font size in px (default 16). Override if your chrome uses a smaller size. */
  maxFontSize?: number;
  /** Errors collected via collectConsoleErrors(page) before navigation. */
  consoleErrors?: string[];
  /** Invariants to skip (e.g. ['fontSize'] if you intentionally use larger headings). */
  skip?: InvariantName[];
};
/** Assert the law holds on the current page. Throws with named offenders on failure. */
export declare function assertLaw(
  page: Page,
  opts?: AssertLawOptions,
): Promise<void>;
/** Returns a Playwright test function that navigates to a route, optionally
    sets the aesthetic mode, and asserts the law. Use directly as the test body:

    test('dashboard · light', assertLawRoute('/dashboard', 'light')); */
export declare function assertLawRoute(
  route: string,
  mode?: 'light' | 'dark',
  opts?: Omit<AssertLawOptions, 'consoleErrors'>,
): (args: { page: Page }) => Promise<void>;
export {
  collectConsoleErrors,
  checkFontSize,
  checkRadius,
  checkNoPageScroll,
  checkCursorDefault,
  checkConsoleClean,
  checkAll,
} from './invariants.js';
export type {
  InvariantResult,
  InvariantName,
  LawViolation,
} from './invariants.js';
