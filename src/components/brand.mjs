import { html } from '../lib/html.mjs';

// The studio mark: an unrolling fern frond (a fiddlehead). One path, drawn in
// currentColor so it follows the theme.
const FROND =
  'M32 60 C32 46 30 36 34 27 C38 18 47 15 52 20 C57 25 54 33 47 34 C41 35 38 29 41 25 C43 22 47 23 47 26';
const LEAVES = [
  'M32 52 C25 51 20 47 18 42',
  'M32 52 C38 52 42 49 44 45',
  'M32 44 C26 43 22 39 21 35',
  'M32 44 C37 43 40 40 41 37',
  'M33 36 C28 35 25 31 25 28',
];

export const fernMark = ({ size = 32, className = '', drawn = false } = {}) => html`
  <svg class="mark${className ? ` ${className}` : ''}${drawn ? ' mark--draw' : ''}" width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <path class="mark__stem" d="${FROND}" pathLength="1" />
    ${LEAVES.map((d) => html`<path class="mark__leaf" d="${d}" pathLength="1" />`)}
  </svg>`;
