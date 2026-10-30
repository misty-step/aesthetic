// Loads faces and turns them into CSS: the type option's @font-face rules and tokens, and for each theme the colour
// option's tokens and the face's spine values, scoped to [data-face="<id>"][data-theme="<theme>"].
import type { ColorOption, TypeOption } from '../contract';
import { loadOption } from '../options';
import { FACES, type Face, type FaceId } from './faces';
import { readLocked, type LockedValues } from './locked';
import { THEMES, type Theme } from './spine';

export interface LoadedFace { face: Face; type: TypeOption; color: ColorOption; values: Record<Theme, Record<string, string>> }

let locked: Promise<LockedValues> | undefined;

export async function loadFace(id: FaceId): Promise<LoadedFace> {
  const face = FACES[id];
  if (!face) throw new Error(`Unknown face: ${id}`);
  locked ??= readLocked();
  const [type, color, from] = await Promise.all([loadOption('type', face.type), loadOption('color', face.color), locked]) as [TypeOption, ColorOption, LockedValues];
  const values = Object.fromEntries(THEMES.map(theme => [theme, Object.fromEntries(Object.entries(face.values[theme])
    .map(([token, value]) => [token, typeof value === 'string' ? value : from[value.read]]))])) as LoadedFace['values'];
  return { face, type, color, values };
}

export function faceCss({ face, type, color, values }: LoadedFace): string {
  const scope = `[data-face="${face.id}"]`;
  const rules: [string, Record<string, string>][] = [
    [scope, type.tokens],
    ...THEMES.map(theme => [`${scope}[data-theme="${theme}"]`, { 'color-scheme': theme, ...color[theme], ...values[theme] }] as [string, Record<string, string>]),
  ];
  return [
    ...type.faces.map(f => `@font-face{font-family:${JSON.stringify(f.family)};src:url(${JSON.stringify(f.src)}) format('woff2');font-weight:${f.weight};font-style:${f.style ?? 'normal'};font-display:swap;${f.unicodeRange ? `unicode-range:${f.unicodeRange};` : ''}}`),
    ...rules.map(([selector, tokens]) => `${selector}{${Object.entries(tokens).map(([k, v]) => `${k}:${v}`).join(';')}}`),
  ].join('\n');
}

/** Loads the faces and injects each one's stylesheet into this document. */
export async function useFaces(ids: FaceId[]): Promise<Record<FaceId, LoadedFace>> {
  const loaded = await Promise.all([...new Set(ids)].map(loadFace));
  for (const l of loaded) {
    const id = `face-${l.face.id}`;
    const style = document.getElementById(id) ?? document.head.appendChild(Object.assign(document.createElement('style'), { id }));
    style.textContent = faceCss(l);
  }
  return Object.fromEntries(loaded.map(l => [l.face.id, l])) as Record<FaceId, LoadedFace>;
}

/** The theme a page opens in: ?theme=light|dark, else the system's. */
export function openingTheme(params: URLSearchParams): Theme {
  const asked = params.get('theme');
  if (asked === 'light' || asked === 'dark') return asked;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
