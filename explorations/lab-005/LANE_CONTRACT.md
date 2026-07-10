# Lab 005 lane contract

Recompose two real `mistystep.io` pages through close-family Aesthetic directions. The fixed content is the live Studio offer and Work registry. Quiet Register and Civic Folio are carried favorites. The unresolved primitive is status language.

Fixed: Geist/Geist Mono, square geometry, paper/ink surfaces, hairlines, one restrained ultramarine accent, glyph-led status with ink labels, full viewport, 390-first, light/dark, no gradients/pills/shadows/serifs/invented claims. React/shadcn/Base UI remains the prospective substrate, but this is a zero-build visual prototype.

Each option must render:

1. `studio`: real headline, lede, and “Let's talk” action from `components/home.tsx`.
2. `work`: real Roster, Bitterblossom, Powder, Canary, and Landmark rows from `content/work.ts`.
3. `status`: healthy, attention, failed, pending, and unknown marks. Color lives on the mark only; labels stay ink. No circles, emoji, pills, filled severity blocks, or plain check/x defaults.

VARIANCE medium-low; MOTION minimal feedback; DENSITY medium. Return one proposition.

Write only your assigned module, exporting default one object:

```js
{
  id, title, family, move, essence,
  layout: 'register'|'folio'|'split'|'index'|'plate'|'field',
  statusStyle: 'cut-square'|'corner-mark'|'bracketed'|'register-tick'|'split-glyph'|'signal-cell',
  statusNote,
  tokens:{ light:{canvas,surface,wash,ink,muted,line,accent,success,warning,danger}, dark:{same} },
  css
}
```

Candidate CSS may target `.site`, `.site-header`, `.brand`, `.view-nav`, `.page`, `.studio`, `.work`, `.offer`, `.lede`, `.action`, `.work-list`, `.work-row`, `.work-mark`, `.status-plate`, `.status-item`, `.status-mark`, `.site-footer`. Do not inspect other lane modules. Verify syntax and contrast.
