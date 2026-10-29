import type { CopyOption } from '../../../src/contract';
import { BASELINE_PAGES } from '../../../src/content/facts';
export default { id: 'baseline-copy', layer: 'copy', label: 'Plain facts', summary: 'A straightforward statement of the offer and method, without a new voice direction.', origin: 'baseline', refs: [{ name: 'Misty Step offer', url:'https://mistystep.io', what:'The existing offer, project descriptions and native install commands are the neutral control.' }], voice:'Plain factual baseline; not a proposed new voice.',pages: BASELINE_PAGES } satisfies CopyOption;
