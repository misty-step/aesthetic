// The studio face is the Locked preset. Its type and colour are the preset's own options; the geometry, the button
// weight and the feedback motion below are read from the preset's layout and motion modules when the face loads, so the studio
// face copies no values. A module that stops declaring one of them fails loudly here, never silently.
import type { LayoutOption, MotionOption } from '../contract';
import { loadOption } from '../options';
import { presets } from '../presets';

const preset = presets.find(p => p.id === 'locked');
if (!preset) throw new Error('src/presets.ts has no "locked" preset; the studio face is defined by it.');
export const LOCKED = preset.picks;

export interface LockedValues {
  radius: string;   // the layout's --radius
  rule: string;     // the layout's --rule
  controlH: string; // the layout's .btn min-height
  weight: string;   // the layout's .btn font-weight
  duration: string; // the motion's colour transition duration
  easing: string;   // the motion's colour transition easing
}

function declarations(source: string, selector: string): Record<string, string> {
  const css = source.replace(/\/\*[\s\S]*?\*\//g, '');
  let depth = 0, start = 0;
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (c === '{') {
      if (depth === 0 && css.slice(start, i).trim() === selector) {
        const body = css.slice(i + 1, css.indexOf('}', i));
        return Object.fromEntries([...body.matchAll(/([\w-]+)\s*:\s*([^;]+)/g)].map(m => [m[1], m[2].trim()]));
      }
      depth++;
    } else if (c === '}') {
      depth--;
      if (depth === 0) start = i + 1;
    } else if (c === ';' && depth === 0) {
      start = i + 1;
    }
  }
  throw new Error(`The Locked layout declares no "${selector}" rule.`);
}

function need(value: string | undefined, what: string): string {
  if (!value) throw new Error(`The Locked preset no longer declares ${what}; update src/surfaces/locked.ts.`);
  return value;
}

export async function readLocked(): Promise<LockedValues> {
  const [layout, motion] = await Promise.all([loadOption('layout', LOCKED.layout), loadOption('motion', LOCKED.motion)]) as [LayoutOption, MotionOption];
  const root = `html[data-layout="${layout.id}"]`;
  const tokens = declarations(layout.css, root);
  const button = declarations(layout.css, `${root} .btn`);
  // Interaction CSS from options/motion/_motion-a/interaction.ts, e.g. "transition:color 150ms steps(3,jump-none),…"
  const colour = motion.interaction?.css.match(/transition:color (\d+m?s) ([\w-]+\([^)]*\)|[\w-]+)/);
  return {
    radius: need(tokens['--radius'], `--radius in ${layout.id}`),
    rule: need(tokens['--rule'], `--rule in ${layout.id}`),
    controlH: need(button['min-height'], `a .btn min-height in ${layout.id}`),
    weight: need(button['font-weight'], `a .btn font-weight in ${layout.id}`),
    duration: need(colour?.[1], `a colour transition in ${motion.id}`),
    easing: need(colour?.[2], `a colour transition easing in ${motion.id}`),
  };
}
