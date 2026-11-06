// The social card template: 1200 x 630 on the canvas, the lockup at the top, the headline ending in its Indigo full
// stop, the address in mono and the colour mark large at the right. Every word is outlined from the package's own
// fonts (fontkit), so @resvg/resvg-js renders the cards without a browser or system fonts. Values come from the root
// tokens.json; only the card's own geometry (margin, mark size, line limit) lives here.
import { create } from 'fontkit';
import { decompress } from 'wawoff2';
import { BOX, LOCKUP_GAP, LOCKUP_MARK, markPaths } from './mark.mjs';

const W = 1200, H = 630;
const MARGIN = 80;
const MARK_HEIGHT = 132; // one parallelogram, in px: the mark is 198 px tall at the right
const COLUMN_GAP = 64; // between the headline and the mark
const MAX_LINES = 3;
const STEP = 4; // the headline steps down from the display size until it fits

/** The cards: one per name, each with the headline and address its site leads with. */
export const CARDS = [
  { file: 'og/studio.png', name: 'Misty Step', headline: 'Two weeks to see what’s worth building.', url: 'mistystep.io' },
  { file: 'og/stack.png', name: 'mistystack', headline: 'A method for coding agents.', url: 'stack.mistystep.io' },
];

const two = value => String(Math.round(value * 100) / 100);
const px = value => Number.parseFloat(value);
const em = value => (value === undefined ? 0 : Number.parseFloat(value));

/** The faces as fontkit fonts. fontkit cannot apply variations to WOFF2 glyphs, so each is decompressed to sfnt. */
export async function openFaces(fonts) {
  const faces = new Map();
  for (const font of fonts) faces.set(font.family, create(Buffer.from(await decompress(font.bytes))));
  return faces;
}

/** The face for a style at a size: wght follows font-weight, opsz follows the px size (font-optical-sizing: auto). */
function instance(faces, style, size) {
  const base = faces.get(style.fontFamily);
  if (!base) throw new Error(`og: no font file for ${style.fontFamily}`);
  if (!base.fvar) return base;
  const settings = {};
  for (const axis of base.fvar.axis) {
    const tag = axis.axisTag.trim();
    if (tag === 'wght') settings.wght = Number(style.fontWeight);
    if (tag === 'opsz') settings.opsz = size;
  }
  return base.getVariation(settings);
}

/** One line, shaped with the font's kerning and ligatures and letter-spaced as CSS spaces it. */
function shape(font, text, size, tracking) {
  const run = font.layout(text);
  const scale = size / font.unitsPerEm;
  const space = tracking * size;
  const glyphs = [];
  let x = 0;
  run.glyphs.forEach((glyph, i) => {
    const { xAdvance, xOffset, yOffset } = run.positions[i];
    glyphs.push({ glyph, x: x + xOffset * scale, y: yOffset * scale });
    x += xAdvance * scale + space;
  });
  return { glyphs, scale, width: Math.max(0, x - space) };
}

const COMMANDS = { moveTo: 'M', lineTo: 'L', quadraticCurveTo: 'Q', bezierCurveTo: 'C', closePath: 'Z' };
/** A shaped line's glyphs as path data, its baseline starting at (x, y), split into the body and a final full stop. */
function outline(line, x, y) {
  const parts = line.glyphs.map(({ glyph, x: gx, y: gy }) => glyph.path.commands.map(({ command, args }) => {
    const points = [];
    for (let i = 0; i < args.length; i += 2) points.push(`${two(x + gx + args[i] * line.scale)} ${two(y - gy - args[i + 1] * line.scale)}`);
    return COMMANDS[command] + points.join(' ');
  }).join(''));
  const last = line.glyphs.at(-1);
  const stop = last?.glyph.codePoints.length === 1 && last.glyph.codePoints[0] === 0x2e ? parts.pop() : '';
  return { body: parts.join(''), stop };
}

/** Greedy lines no wider than width. */
function wrap(font, words, size, tracking, width) {
  const lines = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (line && shape(font, next, size, tracking).width > width) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  return [...lines, line];
}

/** The fewest lines that fit, then the narrowest width that keeps that count (text-wrap: balance). */
function balance(font, text, size, tracking, width) {
  const words = text.split(' ');
  const count = wrap(font, words, size, tracking, width).length;
  let lo = 0, hi = width;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (wrap(font, words, size, tracking, mid).length <= count) hi = mid;
    else lo = mid;
  }
  return wrap(font, words, size, tracking, hi);
}

/** One card as an SVG with every glyph outlined. */
export function cardSvg(card, { tokens, faces }) {
  const c = tokens.colors, t = tokens.typography;
  const capHeight = font => font.capHeight / font.unitsPerEm;
  const markWidth = BOX.width * MARK_HEIGHT;
  const column = W - 2 * MARGIN - markWidth - COLUMN_GAP;

  // The lockup, its mark's top on the margin: the mark LOCKUP_MARK capitals tall, centred on the name's capitals.
  const nameSize = px(t.heading.fontSize);
  const nameFont = instance(faces, t.heading, nameSize);
  const nameCaps = capHeight(nameFont) * nameSize;
  const lockMark = (LOCKUP_MARK * nameCaps) / BOX.height;
  const name = outline(shape(nameFont, card.name, nameSize, em(t.heading.letterSpacing)), MARGIN + BOX.width * lockMark + LOCKUP_GAP * nameSize, MARGIN + ((LOCKUP_MARK + 1) * nameCaps) / 2);

  // The headline: the largest size from display down to heading that fits the column in MAX_LINES balanced lines.
  const style = t.display;
  let size = px(style.fontSize), font, lines;
  for (; ; size -= STEP) {
    font = instance(faces, style, size);
    lines = balance(font, card.headline, size, em(style.letterSpacing), column).map(text => shape(font, text, size, em(style.letterSpacing)));
    if ((lines.length <= MAX_LINES && lines.every(line => line.width <= column)) || size - STEP < px(t.heading.fontSize)) break;
  }
  // Centred on the card from the first line's capitals to the last baseline.
  const leading = Number(style.lineHeight) * size;
  const span = capHeight(font) * size + (lines.length - 1) * leading;
  const top = (H - span) / 2 + capHeight(font) * size;
  const headline = lines.map((line, i) => outline(line, MARGIN, top + i * leading));

  // The address: mono at the title size, its baseline on the bottom margin.
  const urlSize = px(t.title.fontSize);
  const url = outline(shape(instance(faces, t.mono, urlSize), card.url, urlSize, em(t.mono.letterSpacing)), MARGIN, H - MARGIN);

  const ink = [name.body, ...headline.map(line => line.body + (line === headline.at(-1) ? '' : line.stop))].join('');
  const stop = headline.at(-1).stop;
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`,
    `<rect width="${W}" height="${H}" fill="${c.canvas}"/>`,
    markPaths(lockMark, MARGIN, MARGIN, [c.primary, c.secondary]),
    `<path fill="${c.ink}" d="${ink}"/>`,
    stop ? `<path fill="${c.primary}" d="${stop}"/>` : '',
    `<path fill="${c.graphite}" d="${url.body}${url.stop}"/>`,
    markPaths(MARK_HEIGHT, W - MARGIN - markWidth, Math.round((H - BOX.height * MARK_HEIGHT) / 2), [c.primary, c.secondary]),
    '</svg>',
  ].join('');
}
