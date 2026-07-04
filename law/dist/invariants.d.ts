import type { Page } from '@playwright/test';
export type InvariantResult =
  | {
      pass: true;
    }
  | {
      pass: false;
      offenders: string[];
    };
export type InvariantName =
  | 'fontSize'
  | 'radius'
  | 'noPageScroll'
  | 'cursorDefault'
  | 'consoleClean';
export type LawViolation = {
  invariant: InvariantName;
  offenders: string[];
};
export declare function checkFontSize(
  page: Page,
  max?: number,
): Promise<InvariantResult>;
export declare function checkRadius(page: Page): Promise<InvariantResult>;
export declare function checkNoPageScroll(page: Page): Promise<InvariantResult>;
export declare function checkCursorDefault(
  page: Page,
): Promise<InvariantResult>;
export declare function collectConsoleErrors(page: Page): string[];
export declare function checkConsoleClean(errors: string[]): InvariantResult;
export declare function checkAll(
  page: Page,
  opts?: {
    maxFontSize?: number;
    consoleErrors?: string[];
    skip?: InvariantName[];
  },
): Promise<LawViolation[]>;
