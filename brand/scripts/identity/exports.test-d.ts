// Type-level check of the published declarations, resolved through the package's own exports map.
// Compiled (never run) by `tsc -p scripts/identity`.
import { HTML_ATTRS, THEME_ATTR, twoLineLength, type Theme } from '@misty-step/brand/attrs';
import { FAVICON_SVG, lockup, MARK_16, MARK_32, MARK_FULL } from '@misty-step/brand/mark';
import { startBrand, type GroundFogParams } from '@misty-step/brand/runtime';
import * as spine from '@misty-step/brand/spine';
import * as behaviour from '../../configurator/src/surfaces/behaviour';
import * as icons from '../../configurator/src/surfaces/icons';

const params: Partial<GroundFogParams> = { density: 0.5, wind: 1 };
const handle = startBrand({ root: document, motion: true, params });
handle.destroy();
const theme: Theme = document.documentElement.getAttribute(THEME_ATTR) === 'dark' ? 'dark' : 'light';
const layout: 'editorial' = HTML_ATTRS['data-layout'];
const markup: string = lockup('MISTY STEP', { href: '/' }) + lockup('MISTYSTACK') + MARK_16 + MARK_32 + MARK_FULL + FAVICON_SVG;
const h2: number = twoLineLength('Before work, name the check.');
// @ts-expect-error the lockup draws only the two brand names
lockup('MISTY');
// @ts-expect-error params are the field's own keys
startBrand({ params: { speed: 2 } });

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

// The published declarations equal the configurator's sources they are bundled from, in both directions.
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
const agree: [
  Equal<typeof spine.wire, typeof behaviour.wire>,
  Equal<typeof spine.openDialog, typeof behaviour.openDialog>,
  Equal<typeof spine.toast, typeof behaviour.toast>,
  Equal<typeof spine.setInvalid, typeof behaviour.setInvalid>,
  Equal<typeof spine.icon, typeof icons.icon>,
  Equal<typeof spine.statusIcon, typeof icons.statusIcon>,
  Equal<spine.IconName, icons.IconName>,
  Equal<spine.Status, icons.Status>,
] = [true, true, true, true, true, true, true, true];
export { theme, layout, markup, h2, glyphs, agree };
