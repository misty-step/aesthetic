# Daedalus task-workbench adoption feedback

Priority: P1 · Status: open · Estimate: M

## Goal

Use the Daedalus UI catalog as a pressure test for aesthetic's ability to
support dense, evidence-heavy agent workbenches without consumers falling back
to bespoke dashboard CSS.

## Oracle

- [ ] Aesthetic documents an approved "task workbench" or "dossier" composition
      for dense operator surfaces: rail, task header, tabbed work area,
      right-side evidence inspector, internal stage scroll, and compact action
      row.
- [ ] Aesthetic includes or documents a comparison-matrix primitive for
      task-by-candidate eval grids that preserves the status-on-glyph law
      without reducing scanability.
- [ ] Adoption docs explain local/offline prototype adoption: when to use the
      pinned CDN, npm package, copied stylesheet, or relative local checkout
      link in cross-repo design catalogs.
- [ ] Status tags have a canonical compound pattern for "tag plus status glyph"
      so consumers do not invent filled pills or colored soft badges.
- [ ] The primitives page includes at least one evidence-workbench specimen:
      source refs, immutable run records, composition hash, gate state,
      residual risk, and trace drilldown.

## Notes

Daedalus is a useful adopter because its UI is not marketing, not a generic
analytics dashboard, and not a simple document. The product unit is a task
contract. Downstream objects include eval arenas, hypotheses, candidate
compositions, runs, trials, traces, approvals, launch packages, and sometimes a
swarm of member tasks plus a master synthesis task.

The first Daedalus catalog pass used reasonable bespoke UI decisions but drifted
away from aesthetic: rounded cards, filled status pills, multiple font sizes,
soft color washes, and page-level scroll. Grounding it in aesthetic forced the
right questions:

- How does a dense task dossier keep one-size typography while still showing
  hierarchy?
- How should an eval heatmap communicate task-level failure without colored
  cells becoming status pills?
- What is the sanctioned local prototype import path when a consumer repo wants
  to dogfood aesthetic from a sibling checkout before the next tag?
- Should the kit ship a workbench archetype separate from screen, shell, and
  document?

This is not a Daedalus blocker. It is a design-system hardening opportunity.
