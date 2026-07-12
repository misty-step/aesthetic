import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Dialog } from '@base-ui/react/dialog';
import { Menu } from '@base-ui/react/menu';
import { Tooltip } from '@base-ui/react/tooltip';

function App() {
  return (
    <main className="ae-stage" aria-label="Base UI adapter specimens">
      <button className="ae-status" type="button">
        <svg className="ae-icon ae-ok" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
        </svg>
        <span className="ae-status-label">Connected</span>
      </button>

      <span data-ae-tip="Native tooltip" data-testid="native-tip">
        Native
      </span>
      <dialog className="ae-dialog" data-testid="native-dialog" />
      <div className="ae-toasts" hidden>
        Saved
      </div>

      <Dialog.Root defaultOpen>
        <Dialog.Portal>
          <Dialog.Backdrop className="ae-dialog-backdrop" />
          <Dialog.Popup className="ae-dialog-panel">
            <Dialog.Title className="ae-dialog-title">
              Archive report?
            </Dialog.Title>
            <p>This action moves the report out of the active queue.</p>

            <div className="ae-dialog-acts">
              <Menu.Root defaultOpen>
                <Menu.Trigger className="ae-button ae-button-quiet">
                  Actions
                </Menu.Trigger>
                <Menu.Portal>
                  <Menu.Positioner
                    className="ae-pop-positioner"
                    side="bottom"
                    align="start"
                  >
                    <Menu.Popup className="ae-pop-surface">
                      <div className="ae-menu">
                        <Menu.Item className="ae-menu-item">Rename</Menu.Item>
                        <Menu.Item className="ae-menu-item">Archive</Menu.Item>
                      </div>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>

              <Tooltip.Provider delay={0}>
                <Tooltip.Root defaultOpen>
                  <Tooltip.Trigger className="ae-button">
                    Inspect
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Positioner
                      className="ae-tip-positioner"
                      side="top"
                    >
                      <Tooltip.Popup className="ae-tip-surface">
                        Inspect report
                      </Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
