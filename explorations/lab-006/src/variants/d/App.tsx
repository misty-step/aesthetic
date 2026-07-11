// Lane D — floating-surface hybrid: the pages wear aesthetic.css
// exactly as lane C does, but every floating surface (dialog, menu,
// tooltip) is the stock shadcn component from lane A. This is the path
// for an existing aesthetic.css consumer who wants the Base UI behavior
// layer without re-clothing their pages. One toggle drives both theme
// systems (.dark + data-ae-theme/data-accent).
import { useEffect, useState } from 'react';
import { Tabs } from '@base-ui/react/tabs';
import { Moon, Sun, SwatchBook } from 'lucide-react';
import {
  accents,
  dialogCopy,
  footer,
  projects,
  statuses,
  studio,
  work,
} from '@/shared/content';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

function StatusPlate() {
  return (
    <div className="c-plate">
      <p className="c-kicker">Fleet status</p>
      <ul>
        {statuses.map(({ label, Icon, aeTone, note }) => (
          <li key={label}>
            <Tooltip>
              <TooltipTrigger className="ae-status">
                <Icon className={`ae-icon ${aeTone}`} aria-hidden />
                <span className="ae-status-label">{label}</span>
              </TooltipTrigger>
              <TooltipContent>{note}</TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Studio() {
  return (
    <>
      <div className="c-offer">
        <p className="c-kicker">{studio.kicker}</p>
        <h1 className="c-headline">{studio.headline}</h1>
        <p className="c-lede ae-dim">{studio.lede}</p>
        <Dialog>
          <DialogTrigger
            className="ae-button"
            style={{ alignSelf: 'flex-start' }}
          >
            {studio.action}
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>{dialogCopy.title}</DialogTitle>
              <DialogDescription>{dialogCopy.description}</DialogDescription>
            </DialogHeader>
            <p>
              Write to{' '}
              <a
                className="text-primary underline underline-offset-4"
                href={`mailto:${dialogCopy.email}`}
              >
                {dialogCopy.email}
              </a>{' '}
              {dialogCopy.body}
            </p>
            <DialogFooter>
              <Button
                render={
                  <a href={`mailto:${dialogCopy.email}`}>
                    {dialogCopy.confirm}
                  </a>
                }
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <StatusPlate />
    </>
  );
}

function Work() {
  return (
    <>
      <header
        style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}
      >
        <p className="c-kicker">{work.kicker}</p>
        <h1 className="c-headline">{work.headline}</h1>
        <p className="c-lede ae-dim">{work.lede}</p>
      </header>
      <div className="c-rows">
        {projects.map(([mark, name, desc]) => (
          <a key={name} href="#0" className="c-row">
            <span className="c-row-mark">{mark}</span>
            <span className="c-row-name">{name}</span>
            <span className="c-row-desc">{desc}</span>
          </a>
        ))}
      </div>
      <StatusPlate />
    </>
  );
}

export default function App() {
  const [dark, setDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches,
  );
  const [accent, setAccent] = useState<string>('ultramarine');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);
  useEffect(() => {
    // One dial, both systems: the page reads data-ae-theme, the floats
    // read data-accent.
    document.documentElement.setAttribute('data-ae-theme', accent);
    document.documentElement.setAttribute('data-accent', accent);
  }, [accent]);

  return (
    <TooltipProvider delay={450}>
      <Tabs.Root defaultValue="studio" className="ae-screen">
        <header className="ae-bar">
          <span className="ae-logo">
            <SwatchBook className="ae-icon" aria-hidden />
            misty step
          </span>
          <Tabs.List className="ae-tabs">
            <Tabs.Tab value="studio">studio</Tabs.Tab>
            <Tabs.Tab value="work">work</Tabs.Tab>
          </Tabs.List>
        </header>

        <main className="ae-stage">
          <Tabs.Panel value="studio" className="c-view">
            <Studio />
          </Tabs.Panel>
          <Tabs.Panel value="work" className="c-view">
            <Work />
          </Tabs.Panel>
        </main>

        <footer className="ae-bar">
          <div
            className="ae-foot"
            style={{ border: 0, flex: 1, paddingTop: 0 }}
          >
            <span>{footer.links}</span>
            <span className="ae-foot-links">
              <DropdownMenu>
                <DropdownMenuTrigger className="ae-button ae-button-quiet ae-button-compact">
                  {accent}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="top" sideOffset={6}>
                  <DropdownMenuRadioGroup
                    value={accent}
                    onValueChange={setAccent}
                  >
                    {accents.map((name) => (
                      <DropdownMenuRadioItem key={name} value={name}>
                        {name}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <button
                type="button"
                className="ae-button ae-button-quiet ae-button-compact"
                aria-label={
                  dark ? 'Switch to light mode' : 'Switch to dark mode'
                }
                onClick={() => setDark((d) => !d)}
              >
                {dark ? (
                  <Sun className="ae-icon" aria-hidden />
                ) : (
                  <Moon className="ae-icon" aria-hidden />
                )}
              </button>
            </span>
          </div>
        </footer>
      </Tabs.Root>
    </TooltipProvider>
  );
}
