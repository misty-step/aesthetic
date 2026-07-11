# LAB 003 lane contract

Each blind lane owns one file under `lanes/` and exports exactly three future
design systems. The shared renderer owns all markup. A lane supplies a coherent
system proposition, not a page concept.

```js
export const SPECS = {
  'LANE-1': {
    id: 'LANE-1',
    title: 'Short memorable name',
    family: 'structural family',
    move: 'One sentence naming the reusable system move.',
    essence: 'Why this could be Misty Step family DNA.',
    dna: ['shared trait', 'shared trait', 'shared trait'],
    dials: {
      color: 'what products own',
      type: 'what products own',
      density: 'what products own',
      shape: 'what products own',
      imagery: 'what products own',
    },
    layout: 'rail | top | split | atlas | canvas | ledger',
    componentLayout: 'grid | bento | ledger | strips',
    tokens: {
      fontDisplay: 'CSS font stack',
      fontBody: 'CSS font stack',
      fontMono: 'CSS font stack',
      radiusSm: 'CSS length',
      radiusMd: 'CSS length',
      radiusLg: 'CSS length',
      border: 'CSS border width',
      shadow: 'CSS box-shadow or none',
      space: 'number from .82 to 1.3',
      control: 'CSS length from 2rem to 3rem',
      light: {
        canvas: '#…',
        surface: '#…',
        raised: '#…',
        ink: '#…',
        muted: '#…',
        line: '#…',
        accent: '#…',
        accentInk: '#…',
        success: '#…',
        warning: '#…',
        danger: '#…',
      },
      dark: {
        /* same keys */
      },
    },
    products: {
      canary: { accent: '#…', secondary: '#…', note: 'identity dial' },
      powder: { accent: '#…', secondary: '#…', note: 'identity dial' },
      crucible: { accent: '#…', secondary: '#…', note: 'identity dial' },
      landmark: { accent: '#…', secondary: '#…', note: 'identity dial' },
    },
    css: `optional candidate-specific CSS`,
  },
};
```

The renderer applies those values to the same complete matrix:

- foundations: palette, typography, spacing/density, shape/elevation;
- components: button, input, select, checkbox, switch, tabs, badge, card,
  alert, menu, table, dialog, tooltip, toast, command palette;
- states: default, hover, focus, selected/open, disabled, loading, error,
  success, empty, and reduced motion;
- motion: enter, selection, disclosure, state resolution, reduced motion;
- compositions: dashboard, settings/form, document/detail, dense workbench;
- product identity: Canary, Powder, Crucible, and Landmark as secondary skins.

Fixed substrate: React/TypeScript authoring, shadcn open-code registry, Base UI
behavioral primitives, accessibility, complete states, light/dark, 390-first.
Current Aesthetic is a baseline, not a constraint. Preserve family resemblance
through intentional technical/editorial craft, legible state, disciplined
composition, and restrained purposeful motion—not by copying its exact square,
single-size, ultramarine costume.
