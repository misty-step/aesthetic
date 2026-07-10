// One content source for every lane: the live Studio offer, the Work
// registry, and the five-state status plate. Lanes vary the substrate,
// never the content.
import {
  CircleCheck,
  CircleDashed,
  CircleX,
  Clock,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react';

export const studio = {
  kicker: 'Software consulting · agentic systems',
  headline: 'You know AI could help. We know where to start.',
  lede: 'We look at how your company actually runs, from operations to product to support, and show you where AI pays off. The conversation is free, and you leave with a plan either way.',
  action: "Let's talk",
};

export const dialogCopy = {
  title: "Let's talk",
  description:
    'A one-hour working session on where AI pays off in your company. Free, and you leave with a plan either way.',
  body: 'with a sentence about your company. We reply within a day.',
  email: 'hello@mistystep.io',
  confirm: 'Start the email',
};

export const work = {
  kicker: 'Selected work',
  headline: 'Factory systems.',
  lede: 'Operational software for agents and the people responsible for them.',
};

export const projects: ReadonlyArray<readonly [string, string, string]> = [
  [
    'RS',
    'roster',
    'the agent registry: identities, prompts, model policy, and harness materialization',
  ],
  [
    'BB',
    'bitterblossom',
    'event plane for agent workloads: tasks, triggers, budgets, and remote runs',
  ],
  [
    'PW',
    'powder',
    'agent-friendly backlog and kanban board for cards, claims, runs, and handoffs',
  ],
  [
    'CN',
    'canary',
    'agent-facing observability for errors, health probes, and incident context',
  ],
  [
    'LM',
    'landmark',
    'release intelligence from commits to changelogs, notes, plans, and evidence',
  ],
];

/* Status rides the glyph: hue on the Lucide mark only, labels stay ink.
   Pending and unknown carry no judgment, so they carry no hue. `tone` is
   the Tailwind utility (lanes A/B); `aeTone` is the aesthetic.css class
   (lanes C/D). */
export const statuses: ReadonlyArray<{
  label: string;
  Icon: LucideIcon;
  tone: string;
  aeTone: string;
  note: string;
}> = [
  {
    label: 'healthy',
    Icon: CircleCheck,
    tone: 'text-ok',
    aeTone: 'ae-ok',
    note: 'All probes green for 14 days.',
  },
  {
    label: 'attention',
    Icon: TriangleAlert,
    tone: 'text-warn',
    aeTone: 'ae-warn',
    note: 'One probe degraded since 09:12.',
  },
  {
    label: 'failed',
    Icon: CircleX,
    tone: 'text-err',
    aeTone: 'ae-err',
    note: 'Deploy 4818 rolled back at 07:03.',
  },
  {
    label: 'pending',
    Icon: Clock,
    tone: 'text-muted-foreground',
    aeTone: 'ae-dim',
    note: 'Verification queued behind 2 runs.',
  },
  {
    label: 'unknown',
    Icon: CircleDashed,
    tone: 'text-muted-foreground/60',
    aeTone: 'ae-dim',
    note: 'No probe has reported yet.',
  },
];

export const footer = {
  links: 'GitHub · hello@mistystep.io · privacy',
  short: 'hello@mistystep.io',
};

export const accents = ['ultramarine', 'moss', 'ember', 'violet'] as const;
