import { readFileSync } from 'node:fs';

/* tokens.json is the authority every expectation is read from. */
export const tokens = JSON.parse(readFileSync('tokens.json', 'utf8'));

/* '#5B5BF0' as getComputedStyle reports it: 'rgb(91, 91, 240)'. */
export function rgb(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return `rgb(${r}, ${g}, ${b})`;
}

/* A token reference such as '{colors.primary}', resolved in tokens.json. */
export function resolve(reference: string) {
  return reference
    .slice(1, -1)
    .split('.')
    .reduce((value, key) => value[key], tokens);
}

/* The first family of a computed font-family list, unquoted. */
export function firstFamily(fontFamily: string) {
  return fontFamily.split(',')[0].trim().replace(/^["']|["']$/g, '');
}
