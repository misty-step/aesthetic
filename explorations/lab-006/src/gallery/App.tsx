import { useEffect, useState, type ReactNode } from 'react';
import {
  AlertTriangle,
  Check,
  CircleX,
  Moon,
  Sun,
  SwatchBook,
  X,
} from 'lucide-react';

import { Button } from '../variants/b/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../variants/b/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../variants/b/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../variants/b/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../variants/b/ui/tooltip';

import './styles.css';

type View = 'overview' | 'tokens' | 'components' | 'compositions' | 'migration';
type Direction = 'quiet' | 'desk' | 'book';
type Accent = 'ultramarine' | 'moss' | 'ember' | 'violet';
type ComponentGroup = 'controls' | 'overlays' | 'data';
type Composition = 'shell' | 'form' | 'desk' | 'dossier';

const viewMeta: Record<
  View,
  { kicker: string; title: string; summary: string }
> = {
  overview: {
    kicker: 'proposal',
    title: 'A gallery that behaves like a screen',
    summary:
      'One viewport, quiet navigation, and the full system visible without turning it into Storybook.',
  },
  tokens: {
    kicker: 'foundations · 02',
    title: 'Tokens are the visual contract',
    summary:
      'Semantic roles stay fixed. Brand steering is explicit and sparse.',
  },
  components: {
    kicker: 'parts · 03',
    title: 'Components: owned skin, borrowed behavior',
    summary:
      'Copy-to-own units wear the ink-and-hairline idiom while Base UI carries semantics.',
  },
  compositions: {
    kicker: 'patterns · 04',
    title: 'Compositions: the product still has taste',
    summary:
      'The primitives stay quiet; the arrangement decides whether the surface is a shell, flow, desk, or dossier.',
  },
  migration: {
    kicker: 'seam · 05',
    title: 'The migration seam is deliberately thin',
    summary:
      'Do not carry a parallel component library. Carry the law, tokens, and composition vocabulary.',
  },
};

const accents: Accent[] = ['ultramarine', 'moss', 'ember', 'violet'];

function Status({
  kind,
  children,
}: {
  kind: 'ok' | 'warn' | 'err';
  children: string;
}) {
  const Icon =
    kind === 'ok' ? Check : kind === 'warn' ? AlertTriangle : CircleX;
  return (
    <span className="gallery-status">
      <Icon className={`gallery-status-icon ${kind}`} aria-hidden />
      <span>{children}</span>
    </span>
  );
}

function TokenView() {
  return (
    <div className="gallery-view-inner">
      <SectionHeading
        kicker="foundations · 02"
        title="Tokens are the visual contract"
      >
        Semantic roles stay fixed. Brand steering is explicit and sparse: one
        accent dial, the shared ink system, and values that can be checked from
        the source of truth.
      </SectionHeading>
      <div className="token-grid">
        <article className="token-panel">
          <h3>surface and ink</h3>
          <div className="color-list">
            {[
              ['surface', 'var(--background)', '#fcfcfc'],
              ['wash', 'var(--muted)', '#f3f3f3'],
              ['ink', 'var(--foreground)', '#151515'],
              ['ink-muted', 'var(--muted-foreground)', '#737373'],
              ['line', 'var(--border)', '#e9e9e9'],
              ['accent', 'var(--primary)', 'theme dial'],
            ].map(([label, color, value]) => (
              <div className="color-row" key={label}>
                <span className="swatch" style={{ background: color }} />
                <code>{label}</code>
                <span className="token-value">{value}</span>
              </div>
            ))}
          </div>
        </article>
        <article className="token-panel">
          <h3>registers</h3>
          <div className="register-list">
            <div>
              <span>ink · regular</span>
              <code>400</code>
            </div>
            <div className="medium">
              <span>ink · medium</span>
              <code>550</code>
            </div>
            <div className="black">
              <span>ink · black</span>
              <code>800</code>
            </div>
            <div className="muted">
              <span>muted · regular</span>
              <code>400</code>
            </div>
            <div className="muted medium">
              <span>muted · medium</span>
              <code>550</code>
            </div>
            <div className="muted black">
              <span>muted · black</span>
              <code>800</code>
            </div>
          </div>
        </article>
        <article className="token-panel">
          <h3>space scale</h3>
          <div className="space-list">
            {[
              ['--0', '0.1em', 8],
              ['--1', '0.25em', 18],
              ['--2', '0.5em', 32],
              ['--3', '0.75em', 46],
              ['--4', '1em', 58],
              ['--5', '1.5em', 72],
              ['--6', '2em', 88],
            ].map(([name, value, width]) => (
              <div className="space-row" key={name}>
                <code>{name}</code>
                <span className="space-bar" style={{ width: `${width}%` }} />
                <span>{value}</span>
              </div>
            ))}
          </div>
        </article>
        <article className="token-panel">
          <h3>motion</h3>
          <p className="quiet-copy">
            <code>--ae-quick</code> 160ms for feedback. <code>--ae-soft</code>{' '}
            240ms for view changes. <code>--ae-gentle</code> 480ms for a state
            resolving once. Reduced motion makes all three instant.
          </p>
        </article>
        <article className="token-panel">
          <h3>theme dial</h3>
          <p className="quiet-copy">
            The four accents are presets over the same identity. Change the
            theme in the rail; no component gains a new size, radius, or ambient
            color.
          </p>
          <div className="tag-row">
            <span className="tag">ultramarine</span>
            <span className="tag">moss</span>
            <span className="tag">ember</span>
            <span className="tag">violet</span>
          </div>
        </article>
        <article className="token-panel">
          <h3>shadcn map</h3>
          <p className="quiet-copy">
            <code>--primary</code> receives <code>--ae-accent</code>.{' '}
            <code>--radius</code> collapses to 0. Text scale clamps to content
            16px and chrome 13px. The mapping is a bridge, not a second token
            system.
          </p>
        </article>
      </div>
    </div>
  );
}

function SectionHeading({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: string;
}) {
  return (
    <div className="section-heading">
      <span className="kicker">{kicker}</span>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}

function OverviewView({
  onView,
  direction,
  setDirection,
}: {
  onView: (view: View) => void;
  direction: Direction;
  setDirection: (direction: Direction) => void;
}) {
  const directionNotes: Record<Direction, { title: string; note: string }> = {
    quiet: {
      title: 'A · quiet specimen book',
      note: 'Overview first. Maximum negative space. Best public-facing catalog and onboarding surface.',
    },
    desk: {
      title: 'B · operator desk',
      note: 'Three-pane pressure. More visible state and composition. Best for build-time component work.',
    },
    book: {
      title: 'C · paper dossier',
      note: 'Narrow reading line. Strongest Kenya Hara restraint. Best for docs and decision packets.',
    },
  };

  return (
    <div className="gallery-view-inner">
      <div className="overview-grid">
        <div className="hero-copy">
          <span className="kicker">the proposal · 01</span>
          <h2>ShadCN distribution. Base UI behavior. Aesthetic identity.</h2>
          <p>
            The migration does not replace the visual language. It changes the
            adoption seam: copy-to-own components arrive through a registry,
            accessible behavior comes from Base UI, and the one CSS file keeps
            the family resemblance.
          </p>
          <div className="action-row">
            <Button onClick={() => onView('components')}>
              browse components
            </Button>
            <Button variant="quiet" onClick={() => onView('migration')}>
              inspect the seam
            </Button>
          </div>
          <div className="law-strip">
            <div>
              <strong>one size</strong>
              <span>hierarchy by ink and weight</span>
            </div>
            <div>
              <strong>hard edges</strong>
              <span>hairlines, radius 0, quiet depth</span>
            </div>
            <div>
              <strong>screen first</strong>
              <span>views swap; the chrome stays put</span>
            </div>
          </div>
        </div>
        <div className="gallery-preview">
          <div className="preview-head">
            <strong>the gallery shell</strong>
            <code>viewport / 01</code>
          </div>
          <div className="preview-body">
            <div className="preview-rail">
              <b>gallery</b>
              <span>tokens</span>
              <span>parts</span>
              <span>patterns</span>
              <span>seam</span>
            </div>
            <div className="preview-desk">
              <h3>Components in context</h3>
              <p>
                A specimen is more useful when the composition around it is
                visible. The rail is navigation, never a second page.
              </p>
              <div className="preview-row">
                <code>01</code>
                <span>ink button · one action</span>
                <small>Base UI</small>
              </div>
              <div className="preview-row">
                <code>02</code>
                <span>settings row · fold to choose</span>
                <small>recipe</small>
              </div>
              <div className="preview-row">
                <code>03</code>
                <span>status glyph · words stay ink</span>
                <small>law</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="direction-cards" aria-label="direction tradeoffs">
        {(Object.keys(directionNotes) as Direction[]).map((key) => (
          <button
            key={key}
            type="button"
            className="direction-card"
            aria-pressed={direction === key}
            onClick={() => setDirection(key)}
          >
            <strong>{directionNotes[key].title}</strong>
            <span>{directionNotes[key].note}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ControlsPanel() {
  return (
    <div className="component-grid">
      <article className="specimen">
        <h3>button anatomy</h3>
        <div className="specimen-body">
          <div className="inline-specimens">
            <Button>primary action</Button>
            <Button variant="quiet">quiet action</Button>
            <Button size="compact">compact</Button>
          </div>
          <div className="state-grid">
            <div className="state">
              <code>rest</code>
              <Button>run</Button>
              <span>contained ink shape</span>
            </div>
            <div className="state">
              <code>disabled</code>
              <Button disabled>run</Button>
              <span>no color rewrite</span>
            </div>
            <div className="state">
              <code>resolved</code>
              <Button disabled>
                <Check aria-hidden /> sent
              </Button>
              <span>success persists</span>
            </div>
          </div>
        </div>
      </article>
      <article className="specimen">
        <h3>choice + validation</h3>
        <div className="specimen-body">
          <div className="choice-stack">
            <label>
              <input type="checkbox" defaultChecked /> Keep the source readable
            </label>
            <label>
              <input type="radio" name="visibility" defaultChecked /> Public
            </label>
            <label>
              <input type="checkbox" defaultChecked /> Auto-verify
            </label>
          </div>
          <label className="field">
            <span>email</span>
            <input defaultValue="reader@example.com" aria-label="email" />
          </label>
          <label className="field">
            <span>invalid</span>
            <input
              defaultValue="reader@"
              aria-invalid="true"
              aria-label="invalid email"
            />
            <span className="field-note">
              <CircleX aria-hidden /> Address needs a domain.
            </span>
          </label>
        </div>
      </article>
      <article className="specimen specimen-wide">
        <h3>tabs + progressive disclosure</h3>
        <div className="specimen-body">
          <details className="fold">
            <summary>Why a fold instead of another panel?</summary>
            <p>
              A user can keep the high-level surface quiet, then open the one
              detail they need. Base UI handles the disclosure behavior;
              aesthetic supplies the line and plus-mark.
            </p>
          </details>
        </div>
      </article>
    </div>
  );
}

function OverlaysPanel({ onToast }: { onToast: () => void }) {
  return (
    <div className="component-grid">
      <article className="specimen">
        <h3>dialog · decision surface</h3>
        <div className="specimen-body">
          <p>
            A panel costume, not a marketing modal. Focus trap, Escape, and
            focus return belong to Base UI.
          </p>
          <Dialog>
            <DialogTrigger
              render={<Button variant="quiet">open dialog</Button>}
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Archive this direction?</DialogTitle>
                <DialogDescription>
                  This is the decision surface. The panel is restrained; Base UI
                  owns the focus trap and Escape behavior.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="quiet">cancel</Button>} />
                <DialogClose render={<Button>confirm</Button>} />
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </article>
      <article className="specimen">
        <h3>menu · hairline slip</h3>
        <div className="specimen-body">
          <p>
            Positioning and keyboard navigation are the borrowed behavior. The
            surface stays a quiet slip.
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="quiet">open menu</Button>}
            />
            <DropdownMenuContent>
              <DropdownMenuRadioGroup value="source">
                <DropdownMenuRadioItem value="source">
                  copy recipe
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="registry">
                  open registry
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="law">
                  read source
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </article>
      <article className="specimen specimen-wide">
        <h3>news · toast at the edge</h3>
        <div className="specimen-body">
          <div className="inline-specimens">
            <Button variant="quiet" onClick={onToast}>
              show resolved toast
            </Button>
            <span>A toast is an edge event, not a filled status pill.</span>
          </div>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="quiet" size="compact">
                  hover for tooltip
                </Button>
              }
            />
            <TooltipContent>The hint is chrome, not content.</TooltipContent>
          </Tooltip>
        </div>
      </article>
    </div>
  );
}

function DataPanel() {
  return (
    <div className="component-grid">
      <article className="specimen">
        <h3>status on the glyph</h3>
        <div className="specimen-body">
          <Status kind="ok">resolved · words stay ink</Status>
          <Status kind="warn">attention · sentence stays ink</Status>
          <Status kind="err">failed · no colored pill</Status>
        </div>
      </article>
      <article className="specimen">
        <h3>figures + meter</h3>
        <div className="specimen-body">
          <p>
            <strong className="figure">96.4</strong> <span>quality</span>
          </p>
          <div className="meter">
            <span style={{ width: '68%' }} />
            <i style={{ left: '80%' }} />
          </div>
          <p>ink line + threshold mark, no dashboard chrome</p>
        </div>
      </article>
      <article className="specimen specimen-wide">
        <h3>table · instrument register</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>candidate</th>
              <th>quality</th>
              <th>cost</th>
              <th>state</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>base-ui</td>
              <td className="winner">96.4</td>
              <td>0.18</td>
              <td>
                <Status kind="ok">chosen</Status>
              </td>
            </tr>
            <tr>
              <td>radix</td>
              <td>93.1</td>
              <td>0.21</td>
              <td>
                <Status kind="warn">review</Status>
              </td>
            </tr>
            <tr>
              <td>native</td>
              <td>88.7</td>
              <td>0.08</td>
              <td>
                <Status kind="err">gap</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    </div>
  );
}

function ComponentsView({ onToast }: { onToast: () => void }) {
  const [group, setGroup] = useState<ComponentGroup>('controls');
  return (
    <div className="gallery-view-inner">
      <SectionHeading
        kicker="parts · 03"
        title="Components: owned skin, borrowed behavior"
      >
        Each specimen is a candidate copy-to-own unit. Base UI supplies focus
        and interaction semantics; the component stays recognizably aesthetic
        because the skin is still ink, hairline, and weight.
      </SectionHeading>
      <Tabs
        value={group}
        onValueChange={(value) => setGroup(value as ComponentGroup)}
      >
        <TabsList className="gallery-tabs">
          <TabsTrigger value="controls">controls</TabsTrigger>
          <TabsTrigger value="overlays">overlays</TabsTrigger>
          <TabsTrigger value="data">data + status</TabsTrigger>
        </TabsList>
        <TabsContent value="controls">
          <ControlsPanel />
        </TabsContent>
        <TabsContent value="overlays">
          <OverlaysPanel onToast={onToast} />
        </TabsContent>
        <TabsContent value="data">
          <DataPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ShellComposition() {
  return (
    <div className="composition-frame">
      <div className="mini-shell">
        <aside className="mini-rail">
          <strong>workspace</strong>
          <span>overview</span>
          <span>runs</span>
          <span>settings</span>
        </aside>
        <section className="mini-desk">
          <div className="mini-head">
            <strong>selected run</strong>
            <code>03 / 08</code>
          </div>
          <div className="mini-body">
            <p>
              The desk owns the working set. A selected row opens the inspector;
              the page itself never moves.
            </p>
            <div className="mini-list">
              <div>
                <code>09:42</code>
                <span>
                  <strong>base-ui</strong> · verification
                </span>
                <Status kind="ok">resolved</Status>
              </div>
              <div>
                <code>09:31</code>
                <span>
                  <strong>tokens</strong> · contrast
                </span>
                <Status kind="warn">attention</Status>
              </div>
            </div>
          </div>
          <div className="mini-foot">
            focus / keyboard reachable / state persists
          </div>
        </section>
        <aside className="mini-inspector">
          <strong>inspector</strong>
          <span>evidence</span>
          <span>folded until selected</span>
        </aside>
      </div>
    </div>
  );
}

function FormComposition() {
  return (
    <div className="composition-frame">
      <div className="form-layout">
        <form>
          <label className="field">
            <span>project name</span>
            <input defaultValue="aesthetic" />
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="quiet" className="setting-trigger">
                  theme <span>ultramarine</span>
                </Button>
              }
            />
            <DropdownMenuContent>
              <DropdownMenuRadioGroup value="ultramarine">
                {accents.map((accent) => (
                  <DropdownMenuRadioItem key={accent} value={accent}>
                    {accent}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="choice-stack">
            <label>
              <input type="checkbox" defaultChecked /> Include dark mode
            </label>
            <label>
              <input type="checkbox" defaultChecked /> Run the law gate
            </label>
          </div>
          <Button>save settings</Button>
        </form>
        <div className="form-aside">
          <strong>one send moment</strong>
          <p>
            Settings rest as label · value rows. The choice opens only when
            needed. Submission resolves once and stays resolved.
          </p>
          <Status kind="ok">ready to save</Status>
        </div>
      </div>
    </div>
  );
}

function DeskComposition() {
  return (
    <div className="composition-frame">
      <div className="desk-layout">
        <div className="desk-table">
          <code className="caption">comparison / numerals + winner</code>
          <table className="data-table">
            <thead>
              <tr>
                <th>model</th>
                <th>quality</th>
                <th>latency</th>
                <th>read</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>base-ui</td>
                <td className="winner">96.4</td>
                <td>180ms</td>
                <td>
                  <Status kind="ok">winner</Status>
                </td>
              </tr>
              <tr>
                <td>radix</td>
                <td>93.1</td>
                <td>210ms</td>
                <td>
                  <Status kind="warn">spread</Status>
                </td>
              </tr>
              <tr>
                <td>native</td>
                <td>88.7</td>
                <td>80ms</td>
                <td>
                  <Status kind="err">gap</Status>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="desk-side">
          <div className="surface-panel">
            <code className="caption">cost × quality</code>
            <svg
              className="plot"
              viewBox="0 0 260 170"
              role="img"
              aria-label="cost by quality plot"
            >
              <path className="plot-axis" d="M 30 12 L 30 145 L 245 145" />
              <path className="plot-frontier" d="M 62 110 L 122 64 L 204 28" />
              <circle className="plot-dot chosen" cx="122" cy="64" r="4.5" />
              <circle className="plot-dot" cx="204" cy="28" r="4.5" />
              <circle className="plot-dot dominated" cx="164" cy="88" r="4.5" />
              <text className="plot-label" x="130" y="60">
                pick
              </text>
            </svg>
          </div>
          <div className="surface-panel">
            <code className="caption">gate</code>
            <Status kind="ok">law passes</Status>
            <div className="meter">
              <span className="ok" style={{ width: '84%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DossierComposition() {
  return (
    <div className="composition-frame">
      <div className="dossier">
        <div className="dossier-copy">
          <span className="kicker">figure 01 · recommendation</span>
          <h3>One visual contract, three implementation seams.</h3>
          <p>
            The migration works when the architecture is allowed to be boring:
            tokens stay semantic, components are copy-to-own, and Base UI
            supplies the behavior that a zero-build CSS file should not pretend
            to own.
          </p>
          <blockquote>
            “The system's personality is the constraint, not the framework.”
          </blockquote>
        </div>
        <div className="findings">
          <strong>findings</strong>
          <div>
            <b>01</b>
            <span>Keep the single CSS file as the product.</span>
          </div>
          <div>
            <b>02</b>
            <span>Use the registry as the distribution face.</span>
          </div>
          <div>
            <b>03</b>
            <span>Let compositions carry the visual variation.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompositionsView() {
  const [composition, setComposition] = useState<Composition>('shell');
  const content: Record<Composition, ReactNode> = {
    shell: <ShellComposition />,
    form: <FormComposition />,
    desk: <DeskComposition />,
    dossier: <DossierComposition />,
  };
  return (
    <div className="gallery-view-inner">
      <SectionHeading
        kicker="patterns · 04"
        title="Compositions: the product still has taste"
      >
        Primitives do not decide the page. These four common compositions are
        the immediate application set: shell, form flow, instrument desk, and
        report. They share tokens and behavior but arrange attention
        differently.
      </SectionHeading>
      <Tabs
        value={composition}
        onValueChange={(value) => setComposition(value as Composition)}
      >
        <TabsList className="composition-tabs">
          <TabsTrigger value="shell">
            <strong>app shell</strong>
            <small>rail · desk · inspector</small>
          </TabsTrigger>
          <TabsTrigger value="form">
            <strong>form flow</strong>
            <small>settings · choice · send</small>
          </TabsTrigger>
          <TabsTrigger value="desk">
            <strong>instrument desk</strong>
            <small>table · plot · status</small>
          </TabsTrigger>
          <TabsTrigger value="dossier">
            <strong>paper dossier</strong>
            <small>lede · findings · figure</small>
          </TabsTrigger>
        </TabsList>
        {(Object.keys(content) as Composition[]).map((key) => (
          <TabsContent key={key} value={key}>
            {content[key]}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function MigrationView() {
  return (
    <div className="gallery-view-inner">
      <SectionHeading
        kicker="seam · 05"
        title="The migration seam is deliberately thin"
      >
        Do not carry the old kit forward as a parallel component library. Carry
        its law and tokens into the shadcn registry, then let Base UI own the
        interaction surface.
      </SectionHeading>
      <div className="migration-grid">
        <div className="migration-table-wrap">
          <table className="migration-table">
            <thead>
              <tr>
                <th>surface</th>
                <th>distribution</th>
                <th>ownership decision</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>button</td>
                <td>shadcn item</td>
                <td>copy-to-own skin; Base UI trigger behavior where needed</td>
              </tr>
              <tr>
                <td>dialog</td>
                <td>registry + recipe</td>
                <td>
                  panel costume; focus trap, Escape, and return are behavior
                </td>
              </tr>
              <tr>
                <td>tabs</td>
                <td>registry item</td>
                <td>ink nav indicator; roving keyboard model stays upstream</td>
              </tr>
              <tr>
                <td>menu</td>
                <td>registry item</td>
                <td>hairline slip; positioning stays upstream</td>
              </tr>
              <tr>
                <td>tokens</td>
                <td>tokens.json</td>
                <td>one semantic map; no Tailwind palette beside it</td>
              </tr>
              <tr>
                <td>compositions</td>
                <td>consumer code</td>
                <td>product judgment; choose shell, form, desk, or dossier</td>
              </tr>
            </tbody>
          </table>
        </div>
        <aside className="migration-aside">
          <div className="surface-panel">
            <h3>what stays ours</h3>
            <ul>
              <li>one-size hierarchy</li>
              <li>ink + weight registers</li>
              <li>hairline / radius 0</li>
              <li>status on the glyph</li>
              <li>viewport screens</li>
              <li>motion as feedback</li>
            </ul>
          </div>
          <div className="surface-panel">
            <h3>what moves upstream</h3>
            <ul>
              <li>focus management</li>
              <li>Escape and return</li>
              <li>roving tabs and menu keys</li>
              <li>popover positioning</li>
              <li>aria wiring</li>
            </ul>
          </div>
          <p>
            Decision rule: composition stays with the consumer. Behavior uses
            Base UI. Identity lives in tokens or the law.
          </p>
        </aside>
      </div>
    </div>
  );
}

export default function GalleryApp() {
  const [view, setView] = useState<View>('overview');
  const [direction, setDirection] = useState<Direction>('quiet');
  const [accent, setAccent] = useState<Accent>('ultramarine');
  const [dark, setDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches,
  );
  const [toast, setToast] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.dataset.accent = accent;
  }, [accent, dark]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(false), 4000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const meta = viewMeta[view];
  const showView = (next: View) => setView(next);
  const toggleMode = () => setDark((current) => !current);

  return (
    <TooltipProvider>
      <div className={`gallery-shell direction-${direction}`}>
        <header className="gallery-topbar">
          <div className="gallery-brand">
            <SwatchBook aria-hidden />
            <span>AESTHETIC</span>
            <em>/</em>
            <span>BASE UI</span>
          </div>
          <div className="gallery-top-actions">
            <span>LAB 007 · visual contract</span>
            <Button
              variant="ghost"
              size="icon"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={toggleMode}
            >
              {dark ? <Sun /> : <Moon />}
            </Button>
          </div>
        </header>
        <div className="gallery-main">
          <aside className="gallery-rail">
            <div className="rail-intro">
              <strong>THE GALLERY</strong>
              <span>tokens · parts · compositions</span>
            </div>
            <nav aria-label="gallery views">
              <span className="rail-label">catalog</span>
              {(Object.keys(viewMeta) as View[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  aria-current={view === key ? 'page' : undefined}
                  onClick={() => showView(key)}
                >
                  {key === 'migration' ? 'migration seam' : key}
                </button>
              ))}
            </nav>
            <div className="rail-foot">
              <span className="rail-label">accent dial</span>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="compact"
                      className="accent-trigger"
                    >
                      {accent}
                    </Button>
                  }
                />
                <DropdownMenuContent align="start">
                  <DropdownMenuRadioGroup
                    value={accent}
                    onValueChange={(value) => setAccent(value as Accent)}
                  >
                    {accents.map((item) => (
                      <DropdownMenuRadioItem key={item} value={item}>
                        {item}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </aside>
          <section className="gallery-stage">
            <header className="stage-head">
              <div>
                <span className="kicker">{meta.kicker}</span>
                <h1>{meta.title}</h1>
                <p>{meta.summary}</p>
              </div>
              <div className="direction-picker">
                <span>direction</span>
                <div>
                  {(['quiet', 'desk', 'book'] as Direction[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={direction === key}
                      onClick={() => setDirection(key)}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>
            </header>
            <main className="gallery-views">
              <section
                className="gallery-view"
                data-active={view === 'overview'}
              >
                <OverviewView
                  onView={showView}
                  direction={direction}
                  setDirection={setDirection}
                />
              </section>
              <section className="gallery-view" data-active={view === 'tokens'}>
                <TokenView />
              </section>
              <section
                className="gallery-view"
                data-active={view === 'components'}
              >
                <ComponentsView onToast={() => setToast(true)} />
              </section>
              <section
                className="gallery-view"
                data-active={view === 'compositions'}
              >
                <CompositionsView />
              </section>
              <section
                className="gallery-view"
                data-active={view === 'migration'}
              >
                <MigrationView />
              </section>
            </main>
          </section>
        </div>
        <footer className="gallery-footer">
          <span>prototype · local only · never deployed</span>
          <span className="footer-status">
            direction {direction} · accent {accent}
          </span>
          <span className="footer-wide">390 first · 1440 enhancement</span>
        </footer>
        {toast && (
          <div className="toast-wrap">
            <div className="toast">
              <Check aria-hidden />
              <span>direction noted · success persists</span>
              <button
                type="button"
                aria-label="dismiss toast"
                onClick={() => setToast(false)}
              >
                <X aria-hidden />
              </button>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
