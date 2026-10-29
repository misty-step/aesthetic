import type { Layer, MarkOption, TypeOption, ColorOption, LayoutOption, HeroOption, MotionOption, CopyOption } from './contract';
export type Option = MarkOption | TypeOption | ColorOption | LayoutOption | HeroOption | MotionOption | CopyOption;
export const LAYERS: Layer[] = ['mark', 'type', 'color', 'layout', 'hero', 'motion', 'copy'];
export const modules = import.meta.glob<{ default: Option }>('/options/*/*/index.ts');
export const optionPaths = Object.keys(modules);
export const optionIds = (layer: Layer) => optionPaths.filter(p => p.split('/')[2] === layer).map(p => p.split('/')[3]);
export async function loadOption(layer: Layer, id: string): Promise<Option> {
  const path = '/options/' + layer + '/' + id + '/index.ts';
  if (!modules[path]) throw new Error('Unknown ' + layer + ' option: ' + id);
  const { default: option } = await modules[path]();
  if (option.layer !== layer || option.id !== id) throw new Error('Option contract mismatch: ' + path);
  return option;
}
export async function catalog(): Promise<Option[]> { return Promise.all(optionPaths.map(async p => (await modules[p]()).default)); }
