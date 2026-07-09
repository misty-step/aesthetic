/* Hallmark · pre-emit critique: P5 H5 E4 S5 R5 V5 */

export const SPECS = {
  'HALL-1': {
    id: 'HALL-1',
    title: 'The Reference Ledger',
    move: 'Fix the gallery thesis as a left-hand reading rail while the complete catalogue advances as a ruled, single-column ledger.',
    family: 'editorial ledger',
    thesis:
      'A design system gallery should read like its own standard: a stable argument at left, exact live evidence at right, and no card-wall spectacle competing with the primitives.',
    css: `
/* Hallmark · macrostructure: Long Document · tone: austere · anchor hue: inherited */
html,
body {
  overflow-x: clip;
}

.gal-card {
  animation: none;
}

@media (min-width: 901px) {
  .gal-mid {
    width: min(var(--ae-measure-wide), 100% - 3rem);
  }

  .ae-view[data-route='index'].is-on {
    display: grid;
    grid-template-columns: minmax(13rem, 0.7fr) minmax(0, 2.3fr);
    column-gap: 4rem;
    align-items: start;
  }

  .ae-view[data-route='index'] > .gal-lede {
    position: sticky;
    top: 0;
    margin: 0;
    padding: 0 2rem 2rem 0;
    border-right: 1px solid var(--ae-line);
    min-height: calc(100vh - 11rem);
  }

  .ae-view[data-route='index'] > .gal-lede p {
    max-width: 18rem;
    margin-top: 1.8rem;
  }
}

.gal-groups {
  gap: 3rem;
}

.gal-group-h {
  margin: 0 0 0.75rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--ae-line);
}

.gal-cards {
  display: flex;
  flex-direction: column;
  border: 0;
}

.gal-card {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(9rem, 0.55fr);
  min-height: 7.25rem;
  border: 0;
  border-bottom: 1px solid var(--ae-line);
}

.gal-card:first-child {
  border-top: 1px solid var(--ae-line);
}

.gal-specimen {
  grid-column: 1;
  height: auto;
  min-height: 7.25rem;
  justify-content: flex-start;
  padding: 1.4rem 1.25rem;
  border-right: 1px solid var(--ae-line);
}

.gal-meta {
  grid-column: 2;
  grid-row: 1;
  display: flex;
  align-items: center;
  padding: 1.25rem;
  border: 0;
}

.gal-card:hover .gal-meta,
.gal-card:focus-visible .gal-meta {
  box-shadow: inset 2px 0 0 var(--ae-accent);
}

.src-split {
  grid-template-columns: minmax(0, 7fr) minmax(18rem, 5fr);
  gap: 4rem;
}

@media (max-width: 900px) {
  .gal-mid {
    width: min(var(--ae-measure-wide), 100% - 2rem);
  }

  .gal-lede {
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--ae-line);
  }

  .gal-card {
    grid-template-columns: minmax(0, 1fr);
  }

  .gal-specimen {
    grid-column: 1;
    grid-row: 1;
    border-right: 0;
  }

  .gal-meta {
    grid-column: 1;
    grid-row: 2;
    border-top: 1px solid var(--ae-line);
  }

  .gal-card:hover .gal-meta,
  .gal-card:focus-visible .gal-meta {
    box-shadow: inset 0 -2px 0 var(--ae-accent);
  }

  .src-split {
    grid-template-columns: minmax(0, 1fr);
    gap: 2rem;
  }
}
`,
  },

  'HALL-2': {
    id: 'HALL-2',
    title: 'The Continuous Atlas',
    move: 'Turn each primitive family into a horizontal chapter band, with the family name occupying a narrow index column and its live specimens forming a continuous contact sheet.',
    family: 'chaptered atlas',
    thesis:
      'Discovery improves when the gallery exposes relationships across a family at one glance: chapter names anchor the scan, specimens carry the width, and whitespace marks the change of subject.',
    css: `
/* Hallmark · macrostructure: Catalogue · tone: technical · anchor hue: inherited */
html,
body {
  overflow-x: clip;
}

.gal-card {
  animation: none;
}

.gal-mid {
  width: min(92rem, 100% - 3rem);
}

.gal-lede {
  display: grid;
  grid-template-columns: minmax(9rem, 1fr) minmax(0, 3fr);
  align-items: baseline;
  gap: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--ae-line);
}

.gal-lede p {
  margin: 0;
  max-width: 42rem;
}

.gal-groups {
  gap: 0;
}

.gal-groups > section {
  display: grid;
  grid-template-columns: minmax(9rem, 1fr) minmax(0, 3fr);
  gap: 2rem;
  padding: 2.6rem 0;
  border-bottom: 1px solid var(--ae-line);
}

.gal-group-h {
  margin: 0;
  align-self: start;
  position: sticky;
  top: 0;
  padding-top: 0.4rem;
}

.gal-cards {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border: 0;
  gap: 0;
}

.gal-card {
  border: 0;
  border-top: 1px solid var(--ae-line);
  border-left: 1px solid var(--ae-line);
}

.gal-card:nth-child(2n),
.gal-card:last-child {
  border-right: 1px solid var(--ae-line);
}

.gal-card:nth-last-child(-n + 2) {
  border-bottom: 1px solid var(--ae-line);
}

.gal-specimen {
  height: 8rem;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1.25rem;
}

.gal-meta {
  min-height: 2.5rem;
  padding: 0.65rem 1.25rem;
}

.gal-card:hover,
.gal-card:focus-visible {
  box-shadow: inset 0 2px 0 var(--ae-accent);
}

.src-split {
  display: block;
}

.src-split > :first-child {
  max-width: 44rem;
  margin-bottom: 2.5rem;
}

.src-codewrap,
.src-split > .src-code {
  width: min(58rem, 100%);
}

@media (max-width: 767px) {
  .gal-mid {
    width: min(var(--ae-measure-wide), 100% - 2rem);
  }

  .gal-lede,
  .gal-groups > section {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.2rem;
  }

  .gal-lede {
    padding-bottom: 1.5rem;
  }

  .gal-groups > section {
    padding: 2rem 0;
  }

  .gal-group-h {
    position: static;
  }

  .gal-cards {
    grid-template-columns: minmax(0, 1fr);
  }

  .gal-card,
  .gal-card:nth-child(2n),
  .gal-card:last-child,
  .gal-card:nth-last-child(-n + 2) {
    border: 0;
    border-inline: 1px solid var(--ae-line);
    border-top: 1px solid var(--ae-line);
  }

  .gal-card:last-child {
    border-bottom: 1px solid var(--ae-line);
  }

  .gal-specimen {
    height: 7.25rem;
  }
}
`,
  },

  'HALL-3': {
    id: 'HALL-3',
    title: 'The Working Index',
    move: 'Reorder the overview around practical use, then compose a dense three-column workbench whose wider lead plates interrupt the scan at deliberate intervals.',
    family: 'operational workbench',
    thesis:
      'The gallery can behave less like documentation navigation and more like a bench of instruments: common controls and feedback arrive first, dense plates vary the rhythm, and the full reference remains one click beneath every specimen.',
    css: `
/* Hallmark · macrostructure: Workbench · tone: utilitarian · anchor hue: inherited */
html,
body {
  overflow-x: clip;
}

.gal-card {
  animation: none;
}

.gal-mid {
  width: min(76rem, 100% - 3rem);
}

.gal-lede {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 3rem;
  padding: 0 0 1.75rem;
  margin-bottom: 0;
  border-bottom: 1px solid var(--ae-line);
}

.gal-lede p {
  max-width: 30rem;
  margin: 0;
}

.gal-groups {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0;
}

.gal-groups > section {
  min-width: 0;
  padding: 2rem;
  border-bottom: 1px solid var(--ae-line);
}

.gal-groups > section:nth-child(odd) {
  border-right: 1px solid var(--ae-line);
  padding-left: 0;
}

.gal-groups > section:nth-child(even) {
  padding-right: 0;
}

.gal-groups > section[data-hallmark-family='data'] {
  grid-column: 1 / -1;
  padding-inline: 0;
  border-right: 0;
}

.gal-group-h {
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.gal-group-h::after {
  content: '';
  height: 1px;
  flex: 1;
  background: var(--ae-line);
}

.gal-cards {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border: 0;
}

section[data-hallmark-family='data'] .gal-cards {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.gal-card {
  border: 1px solid var(--ae-line);
  margin: -1px 0 0 -1px;
}

.gal-card:hover,
.gal-card:focus-visible {
  position: relative;
  z-index: 1;
  border-color: var(--ae-accent);
}

.gal-specimen {
  height: 7.75rem;
  padding: 1rem;
}

.gal-meta {
  padding: 0.55rem 1rem 0.65rem;
}

.gal-card[data-hallmark-lead='true'] {
  grid-column: span 2;
}

.gal-card[data-hallmark-lead='true'] .gal-specimen {
  justify-content: flex-start;
  height: 9rem;
  padding-inline: 1.5rem;
}

.src-split {
  grid-template-columns: minmax(17rem, 4fr) minmax(0, 7fr);
  gap: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--ae-line);
}

@media (max-width: 767px) {
  .gal-mid {
    width: min(var(--ae-measure-wide), 100% - 2rem);
  }

  .gal-lede {
    display: block;
  }

  .gal-lede p {
    margin-top: 1rem;
  }

  .gal-groups {
    grid-template-columns: minmax(0, 1fr);
  }

  .gal-groups > section,
  .gal-groups > section:nth-child(odd),
  .gal-groups > section:nth-child(even),
  .gal-groups > section[data-hallmark-family='data'] {
    grid-column: 1;
    padding: 1.75rem 0;
    border-right: 0;
  }

  .gal-cards,
  section[data-hallmark-family='data'] .gal-cards {
    grid-template-columns: minmax(0, 1fr);
  }

  .gal-card[data-hallmark-lead='true'] {
    grid-column: 1;
  }

  .gal-card[data-hallmark-lead='true'] .gal-specimen,
  .gal-specimen {
    height: 7.25rem;
    padding-inline: 1rem;
  }

  .src-split {
    grid-template-columns: minmax(0, 1fr);
    gap: 2rem;
  }
}
`,
    apply(doc) {
      const groups = doc.querySelector(
        '.ae-view[data-route="index"] .gal-groups',
      );
      if (!groups) return;

      const order = [
        'FORMS',
        'FEEDBACK',
        'DATA',
        'LAYOUT',
        'CONTENT',
        'FOUNDATIONS',
      ];
      const sections = [...groups.children];
      const byName = new Map(
        sections.map((section) => [
          section.querySelector('.gal-group-h')?.textContent.trim(),
          section,
        ]),
      );

      order.forEach((name) => {
        const section = byName.get(name);
        if (section) groups.append(section);
      });

      groups.querySelectorAll(':scope > section').forEach((section) => {
        const name = section
          .querySelector('.gal-group-h')
          ?.textContent.trim()
          .toLowerCase();
        if (name) section.dataset.hallmarkFamily = name;
        section.querySelectorAll('.gal-card').forEach((card, index) => {
          if (index === 0) card.dataset.hallmarkLead = 'true';
        });
      });
    },
  },
};
