// The brand lab: the identity sheet (../demo/markup.mjs) rendered against the installed @misty-step/brand, then the
// demo's own script (../demo/app.js) for the theme toggle, the spine and the page's copy buttons and toasts. Every
// file comes through the package's exports map, as it does for a site.
import '@misty-step/brand/brand.css';
import '@misty-step/brand/spine.css';
import '../../demo/demo.css';
import manifest from '@misty-step/brand/package.json';
import tokens from '@misty-step/brand/tokens.json';
import { lockup, MARK_SVG } from '@misty-step/brand/mark';
import { icon, statusIcon } from '@misty-step/brand/spine';
import favicon16 from '@misty-step/brand/identity/icons/favicon-16.png';
import favicon32 from '@misty-step/brand/identity/icons/favicon-32.png';
import faviconSvg from '@misty-step/brand/identity/icons/favicon.svg';
import app180Ink from '@misty-step/brand/identity/icons/app-180-ink.png';
import app180Indigo from '@misty-step/brand/identity/icons/app-180-indigo.png';
import app180Black from '@misty-step/brand/identity/icons/app-180-black.png';
import app180White from '@misty-step/brand/identity/icons/app-180-white.png';
import app1024Ink from '@misty-step/brand/identity/icons/app-1024-ink.png';
import app1024Indigo from '@misty-step/brand/identity/icons/app-1024-indigo.png';
import app1024Black from '@misty-step/brand/identity/icons/app-1024-black.png';
import app1024White from '@misty-step/brand/identity/icons/app-1024-white.png';
import markColor from '@misty-step/brand/identity/marks/mark.svg';
import markInk from '@misty-step/brand/identity/marks/mark-ink.svg';
import markWhite from '@misty-step/brand/identity/marks/mark-white.svg';
import cardStudio from '@misty-step/brand/identity/og/studio.png';
import cardStack from '@misty-step/brand/identity/og/stack.png';
import { sheet } from '../../demo/markup.mjs';

const assets: Record<string, string> = {
  'icons/favicon-16.png': favicon16,
  'icons/favicon-32.png': favicon32,
  'icons/favicon.svg': faviconSvg,
  'icons/app-180-ink.png': app180Ink,
  'icons/app-180-indigo.png': app180Indigo,
  'icons/app-180-black.png': app180Black,
  'icons/app-180-white.png': app180White,
  'icons/app-1024-ink.png': app1024Ink,
  'icons/app-1024-indigo.png': app1024Indigo,
  'icons/app-1024-black.png': app1024Black,
  'icons/app-1024-white.png': app1024White,
  'marks/mark.svg': markColor,
  'marks/mark-ink.svg': markInk,
  'marks/mark-white.svg': markWhite,
  'og/studio.png': cardStudio,
  'og/stack.png': cardStack,
};
const asset = (path: string): string => {
  const url = assets[path];
  if (!url) throw new Error(`brand lab: ${path} is not imported in src/main.ts`);
  return url;
};

for (const [rel, path, type, sizes] of [['icon', 'icons/favicon.svg', 'image/svg+xml', ''], ['icon', 'icons/favicon-32.png', 'image/png', '32x32'], ['apple-touch-icon', 'icons/app-180-ink.png', '', '']]) {
  const link = Object.assign(document.createElement('link'), { rel, href: asset(path) });
  if (type) link.type = type;
  if (sizes) link.setAttribute('sizes', sizes);
  document.head.append(link);
}
document.body.insertAdjacentHTML('afterbegin', sheet({ version: manifest.version, tokens, lockup, MARK_SVG, icon, statusIcon, asset, links: { sheet: './' } }));
void import('../../demo/app.js');
