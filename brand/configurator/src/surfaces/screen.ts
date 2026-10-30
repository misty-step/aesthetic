// A screen route: /surface.html?screen=docs|changelog|lobby&face=studio|instrument|poppycock&theme=light|dark[&step=…].
// One real page at whatever width it is given; the Surfaces page frames these at 1440 and 390.
import './components.css';
import './screens.css';
import { wire } from './behaviour';
import { openingTheme, useFaces } from './face';
import { FACES, type FaceId } from './faces';
import { SCREENS, type ScreenId } from './screens';

const params = new URLSearchParams(location.search);
const root = document.documentElement;

async function main() {
  const id = (params.get('screen') ?? 'docs') as ScreenId;
  const screen = SCREENS[id];
  if (!screen) throw new Error(`Unknown screen "${id}". Choose ${Object.keys(SCREENS).join(', ')}.`);
  const face = (params.get('face') ?? screen.own) as FaceId;
  if (!FACES[face]) throw new Error(`Unknown face "${face}". Choose ${Object.keys(FACES).join(', ')}.`);
  const theme = openingTheme(params);
  Object.assign(root.dataset, { screen: id, face, theme });
  document.title = `${screen.name} in the ${FACES[face].name.toLowerCase()} face · Surfaces · Misty Step brand lab`;
  const [module] = await Promise.all([screen.load(), useFaces([face])]);
  document.body.innerHTML = await module.render(params);
  wire();
  module.mount?.(params);
  await document.fonts.ready;
  Object.assign(window, { __SURFACE__: { ready: true, screen: id, face, theme } });
}

void main().catch(error => {
  console.error(error);
  document.body.textContent = `This screen could not load: ${String(error)}`;
});
