import { useEffect, useState } from 'react';
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
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

function StatusPlate() {
  return (
    <div className="mt-auto border-t py-4">
      <p className="mb-3 font-mono text-xs tracking-wider text-muted-foreground uppercase">
        Fleet status
      </p>
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {statuses.map(({ label, Icon, tone, note }) => (
          <li key={label}>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1.5">
                <Icon className={`size-4 ${tone}`} aria-hidden />
                <span>{label}</span>
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
    <section className="flex h-full flex-col">
      <div className="flex flex-1 flex-col justify-center gap-5 py-6">
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          {studio.kicker}
        </p>
        <h1 className="max-w-[26ch] font-bold">{studio.headline}</h1>
        <p className="max-w-[52ch] text-muted-foreground">{studio.lede}</p>
        <Dialog>
          <DialogTrigger
            render={<Button className="self-start">{studio.action}</Button>}
          />
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
    </section>
  );
}

function Work() {
  return (
    <section className="flex h-full min-h-0 flex-col gap-5 pt-6 md:pt-14">
      <header className="flex flex-col gap-2">
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          {work.kicker}
        </p>
        <h1 className="font-bold">{work.headline}</h1>
        <p className="max-w-[52ch] text-muted-foreground">{work.lede}</p>
      </header>
      <div className="min-h-0 overflow-y-auto">
        {projects.map(([mark, name, desc], i) => (
          <div key={name}>
            {i > 0 && <Separator />}
            <a
              href="#0"
              className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-3 gap-y-0.5 py-3 hover:bg-muted md:grid-cols-[2.5rem_10rem_1fr]"
            >
              <span className="font-mono text-xs text-muted-foreground">
                {mark}
              </span>
              <span className="font-medium">{name}</span>
              <span className="col-start-2 text-muted-foreground md:col-start-3">
                {desc}
              </span>
            </a>
          </div>
        ))}
      </div>
      <StatusPlate />
    </section>
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
    document.documentElement.setAttribute('data-accent', accent);
  }, [accent]);

  return (
    <Tabs
      defaultValue="studio"
      className="grid h-dvh grid-rows-[auto_minmax(0,1fr)_auto] gap-0"
    >
      <header className="flex items-center justify-between border-b px-4 py-3 md:px-10">
        <a href="#0" className="flex items-center gap-2 font-medium">
          <SwatchBook className="size-4" aria-hidden />
          misty step
        </a>
        <TabsList>
          <TabsTrigger value="studio">studio</TabsTrigger>
          <TabsTrigger value="work">work</TabsTrigger>
        </TabsList>
      </header>

      <main className="min-h-0 px-4 md:px-10">
        <TabsContent value="studio" className="h-full">
          <Studio />
        </TabsContent>
        <TabsContent value="work" className="h-full">
          <Work />
        </TabsContent>
      </main>

      <footer className="flex items-center justify-between border-t px-4 py-2 text-xs text-muted-foreground md:px-10">
        <span className="hidden sm:inline">{footer.links}</span>
        <span className="sm:hidden">{footer.short}</span>
        <span className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs font-normal text-muted-foreground"
                >
                  {accent}
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={accent} onValueChange={setAccent}>
                {accents.map((name) => (
                  <DropdownMenuRadioItem key={name} value={name}>
                    {name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setDark((d) => !d)}
          >
            {dark ? <Sun /> : <Moon />}
          </Button>
        </span>
      </footer>
    </Tabs>
  );
}
