// The step mark (MIS-931): two sharp parallelograms whose sides lean 60° from the horizontal, the trailing one a
// fixed step down and to the right. Every drawing in identity/ (the SVG marks, mark.js, the favicons, the app icons
// and the social cards) comes from this geometry. Colours come from the root tokens.json: the leading
// parallelogram is colors.primary, the trailing one colors.secondary, and a single-colour mark is Ink or white.

const RAD = Math.PI / 180;
/** The sides' angle from the horizontal, in degrees. */
export const ANGLE = 60;
// Lengths in parallelogram heights.
const SIDE = 1 / Math.tan(ANGLE * RAD); // horizontal run of a slanted side
const EDGE = 0.8; // top and bottom edge
const DROP = 0.5; // the step: the trailing parallelogram starts half a height lower
const GAP = 0.2; // clearance between the facing sides, measured square to them
const RUN = EDGE + GAP / Math.sin(ANGLE * RAD) - SIDE * DROP; // the trailing parallelogram's horizontal offset
/** The mark's bounding box, in parallelogram heights. */
export const BOX = { width: RUN + EDGE + SIDE, height: 1 + DROP };
/** Clear space around the mark: one parallelogram height on every side. */
export const CLEAR = 1;
/** The lockup: the mark stands 1.25 times the wordmark's capital height, centred on the capitals, then a gap (em). */
export const LOCKUP_MARK = 1.25;
export const LOCKUP_GAP = 0.35;
/** The two names the lockup sets: the studio and its open method. */
export const NAMES = ['Misty Step', 'mistystack'];

/** A number for SVG: at most three decimals, no trailing zeros. */
export const num = value => String(Math.round(value * 1000) / 1000);

/** The two parallelograms as path data, each h tall, the bounding box's top-left corner at (x, y). */
export function shapes(h, x = 0, y = 0) {
  const at = (dx, dy) => `M${num(x + (dx + SIDE) * h)} ${num(y + dy * h)}H${num(x + (dx + SIDE + EDGE) * h)}L${num(x + (dx + EDGE) * h)} ${num(y + (dy + 1) * h)}H${num(x + dx * h)}Z`;
  return { leading: at(0, 0), trailing: at(RUN, DROP) };
}

/** Path elements for the mark: [leading, trailing] fills draw it in colour, one fill draws it in a single colour. */
export function markPaths(h, x, y, fill) {
  const { leading, trailing } = shapes(h, x, y);
  return Array.isArray(fill)
    ? `<path fill="${fill[0]}" d="${leading}"/><path fill="${fill[1]}" d="${trailing}"/>`
    : `<path fill="${fill}" d="${leading}${trailing}"/>`;
}

const UNIT = 40; // the vector drawings' parallelogram height: viewBox 0 0 84.783 60
/** The mark as a standalone SVG, its viewBox tight to the parallelograms. attrs land on the <svg> element. */
export function markSvg(fill, attrs = '') {
  const width = num(BOX.width * UNIT), height = num(BOX.height * UNIT);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"${attrs}>${markPaths(UNIT, 0, 0, fill)}</svg>`;
}

/** The favicon: the mark centred in a square as wide as the mark, so browsers scale it edge to edge. */
export function faviconSvg(fill) {
  const size = BOX.width * UNIT;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${num(size)} ${num(size)}" width="${num(size)}" height="${num(size)}">${markPaths(UNIT, 0, (size - BOX.height * UNIT) / 2, fill)}</svg>`;
}

/**
 * A square raster drawing: the mark centred on an optional ground. Favicons keep a one-pixel margin; app icons keep
 * the mark's clear space. The parallelogram height snaps to an even pixel count and the top to a whole pixel, so
 * every horizontal edge lands on a pixel boundary.
 */
export function squareIcon(size, { fill, ground, clear }) {
  const fit = clear ? size / (BOX.width + 2 * CLEAR) : (size - 2) / BOX.width;
  const h = 2 * Math.floor(fit / 2);
  const x = (size - BOX.width * h) / 2, y = Math.floor((size - BOX.height * h) / 2);
  const back = ground ? `<rect width="${size}" height="${size}" fill="${ground}"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${back}${markPaths(h, x, y, fill)}</svg>`;
}
