// The three real screens. Each renders its live page's content in any face; "own" is the face it wears on the
// Surfaces page unless Locked everywhere is chosen. A screen route is /surface.html?screen=<id>&face=<id>&theme=<theme>
// (and &step=<id> for a screen with steps), so every frame on the Surfaces page is a real page at its width.
import * as landmark from '../content/landmark';
import * as misty from '../content/misty';
import * as poppycock from '../content/poppycock';
import type { FaceId, Source } from '../faces';

export type ScreenId = 'docs' | 'changelog' | 'lobby';
export interface ScreenModule {
  render(params: URLSearchParams): Promise<string> | string;
  mount?(params: URLSearchParams): void;
}
export interface Screen {
  id: ScreenId;
  name: string;
  own: FaceId;
  page: string;
  sources: Source[];
  steps?: { id: string; name: string }[]; // the first step is the default
  load(): Promise<ScreenModule>;
}

export const SCREENS: Record<ScreenId, Screen> = {
  docs: {
    id: 'docs',
    name: 'Docs',
    own: 'studio',
    page: misty.PAGE_URL,
    sources: [{ label: `skills/misty/SKILL.md at ${misty.SHA.slice(0, 7)}`, href: misty.SOURCE }],
    load: () => import('./docs'),
  },
  changelog: {
    id: 'changelog',
    name: 'Release notes',
    own: 'instrument',
    page: landmark.PAGE_URL,
    sources: [{ label: `CHANGELOG.md at ${landmark.SHA.slice(0, 7)}`, href: landmark.SOURCE }],
    load: () => import('./changelog'),
  },
  lobby: {
    id: 'lobby',
    name: 'Lobby',
    own: 'poppycock',
    page: poppycock.PAGE_URL,
    sources: [
      { label: `entrance.tsx at ${poppycock.SHA.slice(0, 7)}`, href: poppycock.SOURCES.entrance },
      { label: `page.tsx at ${poppycock.SHA.slice(0, 7)}`, href: poppycock.SOURCES.room },
    ],
    steps: [{ id: 'entrance', name: 'Entrance' }, { id: 'table', name: 'Waiting room' }],
    load: () => import('./lobby'),
  },
};

export const SCREEN_IDS = Object.keys(SCREENS) as ScreenId[];

/** The route of one frame. */
export function screenHref(screen: ScreenId, face: FaceId, theme: string, step?: string): string {
  const params = new URLSearchParams({ screen, face, theme });
  if (step) params.set('step', step);
  return `/surface.html?${params}`;
}
