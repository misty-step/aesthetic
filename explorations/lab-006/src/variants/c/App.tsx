// Lane C — aesthetic.css native: the shipped CSS file stays the whole
// styling layer (no Tailwind, no theme mapping); Base UI primitives
// replace recipes.js as the behavior layer, wearing the `.ae-*`
// costumes. glue.css carries the exact cost of the marriage.
import { useEffect, useState } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { Menu } from '@base-ui/react/menu';
import { Tabs } from '@base-ui/react/tabs';
import { Tooltip } from '@base-ui/react/tooltip';
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

function StatusPlate() {
  return (
    <div className="c-plate">
      <p className="c-kicker">Fleet status</p>
      <ul>
        {statuses.map(({ label, Icon, aeTone, note }) => (
          <li key={label}>
            <Tooltip.Root>
              <Tooltip.Trigger className="ae-status">
                <Icon className={`ae-icon ${aeTone}`} aria-hidden />
                <span className="ae-status-label">{label}</span>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Positioner side="top" sideOffset={8}>
                  <Tooltip.Popup className="aeb-tip">{note}</Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
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
        <Dialog.Root>
          <Dialog.Trigger
            className="ae-button"
            style={{ alignSelf: 'flex-start' }}
          >
            {studio.action}
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop className="aeb-backdrop" />
            <Dialog.Popup className="aeb-dialog">
              <Dialog.Title className="ae-dialog-title">
                {dialogCopy.title}
              </Dialog.Title>
              <Dialog.Description className="ae-dim">
                {dialogCopy.description}
              </Dialog.Description>
              <p>
                Write to{' '}
                <a className="c-mail" href={`mailto:${dialogCopy.email}`}>
                  {dialogCopy.email}
                </a>{' '}
                {dialogCopy.body}
              </p>
              <div className="ae-dialog-acts">
                <Dialog.Close className="ae-button ae-button-quiet">
                  Cancel
                </Dialog.Close>
                <a className="ae-button" href={`mailto:${dialogCopy.email}`}>
                  {dialogCopy.confirm}
                </a>
              </div>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
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
    document.documentElement.setAttribute('data-ae-theme', accent);
  }, [accent]);

  return (
    <Tooltip.Provider delay={450}>
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
              <Menu.Root>
                <Menu.Trigger className="ae-button ae-button-quiet ae-button-compact">
                  {accent}
                </Menu.Trigger>
                <Menu.Portal>
                  <Menu.Positioner align="end" side="top" sideOffset={6}>
                    <Menu.Popup className="aeb-pop">
                      <div className="ae-menu">
                        <Menu.RadioGroup
                          value={accent}
                          onValueChange={(v) => setAccent(String(v))}
                        >
                          {accents.map((name) => (
                            <Menu.RadioItem
                              key={name}
                              value={name}
                              render={<button type="button" />}
                            >
                              {name}
                            </Menu.RadioItem>
                          ))}
                        </Menu.RadioGroup>
                      </div>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
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
    </Tooltip.Provider>
  );
}
