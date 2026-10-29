import type { Layer } from './contract';
export interface Preset { id: string; label: string; note: string; picks: Record<Layer,string> }
export const presets: Preset[] = [];
// The previous directions are registered only after every ported part exists.
