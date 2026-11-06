// Type-level check of the published declarations, resolved through the package's own exports map, against the
// sources they are bundled from. Compiled (never run) by `tsc -p scripts/identity`.
import { HTML_ATTRS, THEME_ATTR, THEME_STORAGE_ITEM, type Theme } from '@misty-step/brand/attrs';
import { FAVICON_SVG, lockup, MARK_SVG, MONO_MARK_SVG, type BrandName, type LockupOptions } from '@misty-step/brand/mark';
import { startBrand, type BrandHandle, type StartBrandOptions } from '@misty-step/brand/runtime';
import * as spine from '@misty-step/brand/spine';
import tokens from '@misty-step/brand/tokens.json';
import * as attrs from '../../src/attrs';
import * as behaviour from '../../src/behaviour';
import * as icons from '../../src/icons';
import * as runtime from '../../src/runtime';
// @ts-expect-error 0.3.0 removed the per-size marks: MARK_SVG and MONO_MARK_SVG replace MARK_16, MARK_32 and MARK_FULL
import { MARK_32 } from '@misty-step/brand/mark';
// @ts-expect-error 0.3.0 removed the hero's two-line helper with the horizon hero
import { twoLineLength } from '@misty-step/brand/attrs';

const handle: BrandHandle = startBrand({ root: document });
handle.destroy();
// @ts-expect-error the runtime has no motion and no field parameters
startBrand({ motion: false });
const theme: Theme = document.documentElement.getAttribute(THEME_ATTR) === 'dark' ? 'dark' : 'light';
const brand: 'misty-step' = HTML_ATTRS['data-brand'];
const item: string = THEME_STORAGE_ITEM;
const name: BrandName = 'mistystack';
const options: LockupOptions = { href: '/', label: 'Misty Step home', variant: 'mono' };
const markup: string = lockup('Misty Step', options) + lockup(name) + MARK_SVG + MONO_MARK_SVG + FAVICON_SVG;
// @ts-expect-error the lockup sets only the two names
lockup('Misty');
// @ts-expect-error variants are color and mono
lockup('mistystack', { variant: 'white' });
const indigo: string = tokens.colors.primary + tokens.typography.display.fontFamily;

spine.wire();
const tray = document.createElement('div');
const shown: HTMLElement = spine.toast(tray, 'Request sent.', 'ok');
spine.setInvalid(document.createElement('input'), null);
spine.openDialog(document.createElement('dialog'), shown);
const glyphs: string = spine.icon('copy', 'sp-ok') + spine.statusIcon('err');
// @ts-expect-error statuses are ok, warn and err
spine.statusIcon('info');
// @ts-expect-error icon() draws only the spine's glyphs
spine.icon('rocket');

// The published declarations equal the sources they are bundled from, in both directions.
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
const agree: [
  Equal<typeof startBrand, typeof runtime.startBrand>,
  Equal<StartBrandOptions, runtime.StartBrandOptions>,
  Equal<BrandHandle, runtime.BrandHandle>,
  Equal<typeof HTML_ATTRS, typeof attrs.HTML_ATTRS>,
  Equal<typeof THEME_ATTR, typeof attrs.THEME_ATTR>,
  Equal<typeof THEME_STORAGE_ITEM, typeof attrs.THEME_STORAGE_ITEM>,
  Equal<Theme, attrs.Theme>,
  Equal<typeof spine.wire, typeof behaviour.wire>,
  Equal<typeof spine.openDialog, typeof behaviour.openDialog>,
  Equal<typeof spine.toast, typeof behaviour.toast>,
  Equal<typeof spine.setInvalid, typeof behaviour.setInvalid>,
  Equal<typeof spine.icon, typeof icons.icon>,
  Equal<typeof spine.statusIcon, typeof icons.statusIcon>,
  Equal<spine.IconName, icons.IconName>,
  Equal<spine.Status, icons.Status>,
] = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
export { theme, brand, item, markup, indigo, glyphs, agree };
