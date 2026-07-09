export const SPECS = {
  'IMP-1': {
    id: 'IMP-1',
    title: 'The calibration field',
    move: 'Keep the canonical gallery map and optically calibrate every plate, edge, focus, and selection state.',
    family: 'Optical calibration',
    thesis:
      'World-class finish comes from consistency at the point of attention. The existing gallery already has the right content architecture; this proposition sharpens its plate geometry, optical alignment, reading rhythm, and keyboard feedback so every primitive feels cut from one instrument.',
    css: `
      .gal-mid {
        width: min(78rem, 100% - 3rem);
      }

      .ae-desk {
        padding-block: clamp(1.5rem, 3.5vw, 3rem);
      }

      .gal-lede {
        max-width: 52rem;
        padding-bottom: clamp(2.5rem, 6vw, 5rem);
        margin-bottom: 0;
      }

      .gal-lede h2 {
        margin-bottom: 1.25rem;
      }

      .gal-lede p {
        max-width: 58ch;
        text-wrap: pretty;
      }

      .gal-groups {
        gap: clamp(3rem, 7vw, 5.5rem);
      }

      .gal-groups > section {
        min-width: 0;
      }

      .gal-group-h {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin: 0 0 1rem;
      }

      .gal-group-h::after {
        content: '';
        height: 1px;
        flex: 1;
        background: var(--ae-line);
      }

      .gal-cards {
        grid-template-columns: repeat(auto-fit, minmax(min(15rem, 100%), 1fr));
        gap: 1rem;
        border: 0;
      }

      .gal-card {
        border: 1px solid var(--ae-line);
        background: var(--ae-surface);
        animation: none;
      }

      .gal-card:hover {
        border-color: var(--ae-ink-faint);
      }

      .gal-card:active {
        border-color: var(--ae-accent);
      }

      .gal-card:focus-visible {
        outline: 2px solid var(--ae-ink);
        outline-offset: 3px;
      }

      .gal-specimen {
        height: 8.25rem;
        padding: 1.35rem;
        border-bottom: 1px solid var(--ae-line);
        background: var(--ae-wash);
      }

      .gal-card:hover .gal-specimen,
      .gal-card:focus-visible .gal-specimen {
        background: color-mix(in srgb, var(--ae-wash) 94%, var(--ae-accent));
      }

      .gal-meta {
        display: flex;
        align-items: center;
        min-height: 2.75rem;
        margin: 0;
        padding: .65rem 1rem .7rem;
        border: 0;
      }

      .gal-card:focus-visible .gal-meta-cls {
        color: var(--ae-accent);
        font-weight: var(--ae-w-medium);
      }

      .ae-view:not([data-route='index']) > .ae-group:first-of-type {
        max-width: 50rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--ae-line);
      }

      .src-split {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: clamp(2rem, 5vw, 4rem);
      }

      .src-codewrap:focus-within .src-code,
      .src-copy:focus-visible,
      .plate-run:focus-visible {
        border-color: var(--ae-ink);
      }

      .ae-view :is(a, button, input, textarea, summary, [tabindex]):focus-visible {
        outline: 2px solid var(--ae-ink);
        outline-offset: 3px;
      }

      ::selection {
        color: var(--ae-ink);
        background: color-mix(in srgb, var(--ae-accent) 24%, var(--ae-surface));
      }

      @media (prefers-contrast: more) {
        .gal-card,
        .gal-specimen,
        .src-code {
          border-color: var(--ae-ink);
        }
      }

      @media (max-width: 767px) {
        .gal-mid {
          width: calc(100% - 2rem);
        }

        .ae-desk {
          padding-block: 1.5rem;
        }

        .gal-lede {
          padding-bottom: 2.75rem;
        }

        .gal-groups {
          gap: 3rem;
        }

        .gal-cards {
          grid-template-columns: minmax(0, 1fr);
          gap: .8rem;
        }

        .gal-specimen {
          height: 7.25rem;
          padding: 1rem;
        }
      }
    `,
  },

  'IMP-2': {
    id: 'IMP-2',
    title: 'The reading room',
    move: 'Arrange categories as an asymmetric reading room of compact specimen bands.',
    family: 'Ruled reading room',
    thesis:
      'A complete system is easier to comprehend when related primitives stay in visible bands. Asymmetric category columns create rhythm without changing type size, while a full-width data band gives the most visual material room to breathe.',
    css: `
      .gal-mid {
        width: min(82rem, 100% - 3rem);
      }

      .ae-desk {
        padding-block: clamp(1.5rem, 3.5vw, 3rem);
      }

      .gal-lede {
        max-width: 46rem;
        padding: clamp(1rem, 3vw, 2rem) 0 clamp(2.5rem, 6vw, 5rem);
        margin: 0;
      }

      .gal-lede h2 {
        margin-bottom: 1.4rem;
      }

      .gal-groups {
        display: grid;
        grid-template-columns: minmax(0, 5fr) minmax(0, 4fr);
        gap: clamp(2.5rem, 6vw, 5.5rem) clamp(2rem, 5vw, 4.5rem);
        align-items: start;
      }

      .gal-groups > section {
        min-width: 0;
        border-top: 1px solid var(--ae-ink);
        padding-top: 1rem;
      }

      .gal-groups > section:nth-child(2),
      .gal-groups > section:nth-child(4) {
        transform: translateY(clamp(1.5rem, 4vw, 3rem));
      }

      .gal-groups > section:nth-child(5) {
        grid-column: 1 / -1;
      }

      .gal-group-h {
        margin: 0 0 1.5rem;
      }

      .gal-cards {
        display: flex;
        flex-direction: column;
        border: 0;
      }

      .gal-card {
        display: grid;
        grid-template-columns: minmax(7.5rem, .8fr) minmax(0, 1.8fr);
        min-height: 6rem;
        border: 0;
        border-top: 1px solid var(--ae-line);
        animation: none;
      }

      .gal-card:last-child {
        border-bottom: 1px solid var(--ae-line);
      }

      .gal-meta {
        grid-column: 1;
        grid-row: 1;
        display: flex;
        align-items: center;
        margin: 0;
        padding: .8rem 1rem .8rem 0;
        border: 0;
      }

      .gal-specimen {
        grid-column: 2;
        grid-row: 1;
        height: auto;
        min-height: 6rem;
        padding: .8rem 1rem;
        border-left: 1px solid var(--ae-line);
        background: transparent;
      }

      .gal-card:hover,
      .gal-card:focus-visible {
        background: var(--ae-wash);
      }

      .gal-card:focus-visible {
        outline: 2px solid var(--ae-ink);
        outline-offset: 2px;
      }

      .gal-groups > section:nth-child(5) .gal-cards {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        column-gap: clamp(2rem, 5vw, 4.5rem);
      }

      .gal-groups > section:nth-child(5) .gal-card:nth-last-child(-n + 2) {
        border-bottom: 1px solid var(--ae-line);
      }

      .src-code {
        border-inline: 0;
        padding-inline: 2.4em 1rem;
      }

      .src-split {
        gap: clamp(2rem, 5vw, 4rem);
      }

      @media (max-width: 767px) {
        .gal-mid {
          width: calc(100% - 2rem);
        }

        .gal-lede {
          padding-bottom: 2.5rem;
        }

        .gal-groups {
          grid-template-columns: minmax(0, 1fr);
          gap: 2.5rem;
        }

        .gal-groups > section,
        .gal-groups > section:nth-child(5) {
          grid-column: 1;
        }

        .gal-groups > section:nth-child(2),
        .gal-groups > section:nth-child(4) {
          transform: none;
        }

        .gal-groups > section:nth-child(5) .gal-cards {
          display: flex;
        }

        .gal-card {
          grid-template-columns: minmax(6.5rem, .9fr) minmax(0, 1.5fr);
        }

        .gal-specimen {
          padding-inline: .75rem;
        }
      }
    `,
  },

  'IMP-3': {
    id: 'IMP-3',
    title: 'State before source',
    move: 'Promote every existing state matrix ahead of source and mark state-proven primitives in the canonical overview.',
    family: 'State-proof gallery',
    thesis:
      'A design system earns trust by showing what happens beyond the resting pose. This proposition makes interaction truth the primary proof: existing state matrices lead each applicable detail plate, focus is unmistakable, and the overview quietly distinguishes primitives whose edge cases are documented.',
    css: `
      .gal-mid {
        width: min(80rem, 100% - 3rem);
      }

      .ae-desk {
        padding-block: clamp(1.5rem, 3.5vw, 3rem);
      }

      .gal-lede {
        max-width: 52rem;
        padding-bottom: clamp(2.5rem, 6vw, 5rem);
        margin-bottom: 0;
      }

      .gal-lede h2 {
        margin-bottom: 1.25rem;
      }

      .gal-lede p {
        max-width: 60ch;
        text-wrap: pretty;
      }

      .gal-groups {
        gap: clamp(3rem, 7vw, 5.5rem);
      }

      .gal-group-h {
        margin-bottom: 1rem;
      }

      .gal-cards {
        grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr));
      }

      .gal-card {
        animation: none;
      }

      .gal-card.imp-state-proven {
        box-shadow: inset 0 2px 0 var(--ae-accent);
      }

      .gal-card.imp-state-proven .gal-meta-cls {
        font-weight: var(--ae-w-medium);
      }

      .gal-card:focus-visible {
        outline: 2px solid var(--ae-ink);
        outline-offset: 3px;
      }

      .gal-card:focus-visible .gal-meta-cls {
        color: var(--ae-accent);
      }

      .ae-view:not([data-route='index']) .back-link {
        position: sticky;
        top: 0;
        z-index: var(--ae-z-sticky);
        padding-block: .55rem;
        border-bottom: 1px solid var(--ae-line);
        background: var(--ae-surface);
      }

      .imp-state-proof {
        margin-block: clamp(2rem, 5vw, 4rem);
        padding-block: 1.25rem;
        border-block: 1px solid var(--ae-ink);
      }

      .imp-state-proof .states-cap {
        margin-bottom: 1rem;
        color: var(--ae-ink-muted);
      }

      .imp-state-proof .states {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr));
        gap: 0;
        border-top: 1px solid var(--ae-line);
        border-left: 1px solid var(--ae-line);
      }

      .imp-state-proof .state {
        min-width: 0;
        padding: 1rem;
        border-right: 1px solid var(--ae-line);
        border-bottom: 1px solid var(--ae-line);
      }

      .imp-state-proof .state-demo {
        min-height: 4.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .imp-state-proof .state:focus-within {
        box-shadow: inset 0 0 0 1px var(--ae-ink);
      }

      .imp-state-proof .state-name {
        color: var(--ae-ink-muted);
        font-weight: var(--ae-w-medium);
      }

      .imp-state-proof .state-note {
        max-width: 36ch;
        text-wrap: pretty;
      }

      .ae-view :is(a, button, input, textarea, summary, [tabindex]):focus-visible {
        outline: 2px solid var(--ae-ink);
        outline-offset: 3px;
      }

      .plate-run:focus-visible,
      .src-copy:focus-visible {
        border-color: var(--ae-ink);
      }

      .src-copy.is-copied .cp-check {
        color: var(--ae-accent);
      }

      @media (prefers-contrast: more) {
        .gal-card.imp-state-proven {
          box-shadow: inset 0 3px 0 var(--ae-accent);
        }

        .imp-state-proof .states,
        .imp-state-proof .state {
          border-color: var(--ae-ink);
        }
      }

      @media (max-width: 767px) {
        .gal-mid {
          width: calc(100% - 2rem);
        }

        .gal-cards {
          grid-template-columns: minmax(0, 1fr);
        }

        .ae-view:not([data-route='index']) .back-link {
          margin-bottom: 1.25rem;
        }

        .imp-state-proof {
          margin-block: 1.75rem 2.5rem;
          padding-block: 1rem;
        }

        .imp-state-proof .states {
          grid-template-columns: minmax(0, 1fr);
        }

        .imp-state-proof .state-demo {
          min-height: 3.5rem;
        }
      }
    `,
    apply(doc) {
      for (const view of doc.querySelectorAll('.ae-view[data-route]')) {
        if (view.dataset.route === 'index') continue;
        const proof = [...view.querySelectorAll(':scope > .ae-group')].find(
          (group) => group.querySelector('.states'),
        );
        if (!proof || proof.classList.contains('imp-state-proof')) continue;

        proof.classList.add('imp-state-proof');
        const intro = view.querySelector(':scope > .ae-group');
        if (intro && intro !== proof) intro.after(proof);

        const card = doc.querySelector(
          `.gal-card[href="#${view.dataset.route}"]`,
        );
        card?.classList.add('imp-state-proven');
      }
    },
  },
};
