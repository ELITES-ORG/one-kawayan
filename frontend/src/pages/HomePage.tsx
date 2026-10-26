import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui';
import { buttonStyles } from '@/components/ui/button-styles';
import { Logo } from '@/components/icons/Logo';
import { Mark, type MarkName } from '@/components/icons/marks';
import { cn } from '@/lib/cn';
import { reportFieldError } from './report-error';
import { schemeFromPreference, type Scheme } from './scheme';

type Tab = 'home' | 'services' | 'news' | 'report' | 'emergency';

const TABS: { id: Tab; label: string; mark: MarkName }[] = [
  { id: 'home', label: 'Home', mark: 'home' },
  { id: 'services', label: 'Services', mark: 'civic' },
  { id: 'news', label: 'News', mark: 'news' },
  { id: 'report', label: 'Report', mark: 'report' },
  { id: 'emergency', label: 'Emergency', mark: 'phone' },
];

const PAGE_TITLE: Record<Exclude<Tab, 'home'>, string> = {
  services: 'Services',
  news: 'Announcements',
  report: 'Report a problem',
  emergency: 'Emergency',
};

type Action = {
  id: string;
  label: string;
  mark: MarkName;
  keywords: string;
  go: Tab;
  serviceId?: string;
};

const ACTIONS: Action[] = [
  { id: 'services', label: 'Services', mark: 'civic', keywords: 'services', go: 'services' },
  {
    id: 'documents',
    label: 'Documents',
    mark: 'services',
    keywords: 'documents clearance registry permit',
    go: 'services',
    serviceId: 'documents',
  },
  {
    id: 'payments',
    label: 'Payments',
    mark: 'pay',
    keywords: 'payments taxes fees',
    go: 'services',
    serviceId: 'payments',
  },
  { id: 'emergency', label: 'Emergency', mark: 'phone', keywords: 'emergency 911 call', go: 'emergency' },
  { id: 'news', label: 'News', mark: 'news', keywords: 'news announcements', go: 'news' },
  { id: 'reports', label: 'Reports', mark: 'report', keywords: 'reports problem road waste', go: 'report' },
  { id: 'results', label: 'Results', mark: 'award', keywords: 'results musikawayan showdown awards', go: 'news' },
  { id: 'all', label: 'View all', mark: 'plus', keywords: 'all', go: 'services' },
];

const SERVICES: { id: string; title: string; summary: string; body: string }[] = [
  {
    id: 'documents',
    title: 'Documents',
    summary: 'Clearances and civil registry',
    body: 'Request a clearance or a civil registry copy. The requirements on this screen will be the municipality’s own list, shown before you start.',
  },
  {
    id: 'payments',
    title: 'Payments',
    summary: 'Taxes and local fees',
    body: 'See an amount the municipality has billed, then pay it. The receipt stays with the payment.',
  },
  {
    id: 'reports',
    title: 'Community reports',
    summary: 'Roads, waste, water',
    body: 'Describe a problem and where it is. You keep a reference number so you can follow what happened to it.',
  },
  {
    id: 'hotlines',
    title: 'Hotlines',
    summary: 'Who to call',
    body: 'For an emergency, call 911. Office numbers will be the ones the municipality publishes.',
  },
];

const RESULTS: { school: string; average: string; rank: string }[] = [
  { school: 'Tabunan National High School', average: '97.20', rank: '1' },
  { school: 'Western Biliran High School for the Arts and Culture', average: '95.10', rank: '2' },
  { school: 'Biliran Science High School', average: '91.80', rank: '3' },
  { school: 'Bool National High School', average: '90.50', rank: '4.5' },
  { school: 'Maripipi National Vocational School', average: '90.50', rank: '4.5' },
  { school: 'Kawayan National High School', average: '89.40', rank: '6' },
  { school: 'Cabucgayan National High School', average: '88.90', rank: '7' },
];

const AWARDS: [string, string][] = [
  ['Best band master', 'Western Biliran High School for the Arts and Culture'],
  ['Best majorette', 'Tabunan National High School'],
  ['Best color guard', 'Western Biliran High School for the Arts and Culture'],
  ['Best in musicality', 'Tabunan National High School'],
  ['Best in parade', 'Tabunan National High School'],
];

const TOPICS = ['Road', 'Waste', 'Street light', 'Water', 'Other'] as const;

export function HomePage() {
  const [tab, setTab] = useState<Tab>('home');
  const [scheme, setScheme] = useState<Scheme>(() =>
    schemeFromPreference(window.matchMedia('(prefers-color-scheme: dark)').matches),
  );
  const [serviceId, setServiceId] = useState('documents');

  function applyScheme(next: Scheme) {
    setScheme(next);
    document.documentElement.dataset.theme = next;
  }

  function openTab(next: Tab, nextService?: string) {
    if (nextService) setServiceId(nextService);
    setTab(next);
  }

  return (
    <div className="min-h-page bg-paper text-ink md:flex">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-30 focus:bg-surface focus:px-3 focus:py-2 focus:text-base focus:font-semibold"
      >
        Skip to content
      </a>
      <aside className="sticky top-0 hidden h-[calc(100dvh-var(--staging-banner-h))] w-60 shrink-0 flex-col overflow-y-auto border-r border-hairline bg-paper px-4 py-6 md:flex">
        <div className="flex items-center gap-3">
          <Logo />
          <div className="min-w-0">
            <p className="text-md font-bold">One Kawayan</p>
            <p className="text-sm text-ink-muted">Biliran</p>
          </div>
        </div>
        <nav aria-label="Sections" className="mt-8 flex flex-col gap-1">
          {TABS.map((item) => {
            const selected = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={cn(
                  'interactive-press flex min-h-11 items-center gap-3 rounded-sm px-3 text-left text-md',
                  selected ? 'bg-primary-soft font-bold text-green-700' : 'font-medium text-ink-muted',
                )}
                aria-current={selected ? 'page' : undefined}
                onClick={() => setTab(item.id)}
              >
                <Mark name={item.mark} live={selected} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="mt-auto pt-6">
          <ThemeButton scheme={scheme} onToggle={() => applyScheme(scheme === 'light' ? 'dark' : 'light')} />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {tab !== 'home' && (
          <header className="sticky top-0 z-20 border-b border-hairline bg-paper">
            <div className="flex items-center gap-3 px-(--gutter) py-2.5">
              <Logo label="One Kawayan" className="size-9 md:hidden" />
              <h1 className="min-w-0 flex-1 text-md">{PAGE_TITLE[tab]}</h1>
              <ThemeButton
                scheme={scheme}
                onToggle={() => applyScheme(scheme === 'light' ? 'dark' : 'light')}
                className="md:hidden"
              />
            </div>
          </header>
        )}

        <main
          id="content"
          className={cn(
            'flex-1 pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-12',
            tab === 'home' ? 'pt-0' : 'px-(--gutter) pt-6',
          )}
        >
          {tab === 'home' && (
            <HomePanel
              key="home"
              scheme={scheme}
              onToggle={() => applyScheme(scheme === 'light' ? 'dark' : 'light')}
              onOpen={openTab}
            />
          )}
          {tab === 'services' && (
            <ServicesPanel key="services" selected={serviceId} onSelect={setServiceId} />
          )}
          {tab === 'news' && <NewsPanel key="news" />}
          {tab === 'report' && <ReportPanel key="report" />}
          {tab === 'emergency' && <EmergencyPanel key="emergency" />}
        </main>
      </div>

      <nav
        aria-label="Sections"
        className="fixed inset-x-0 bottom-0 z-20 border-t border-hairline bg-paper pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        <div className="flex">
          {TABS.map((item) => {
            const selected = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={cn(
                  'interactive-press flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 text-2xs',
                  selected ? 'font-bold text-green-700' : 'font-medium text-ink-muted',
                )}
                aria-current={selected ? 'page' : undefined}
                onClick={() => setTab(item.id)}
              >
                <span
                  className={cn(
                    'flex size-8 items-center justify-center rounded-sm',
                    selected && 'bg-primary-soft',
                  )}
                >
                  <Mark name={item.mark} live={selected} className="size-5" />
                </span>
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function HomePanel({
  scheme,
  onToggle,
  onOpen,
}: {
  scheme: Scheme;
  onToggle: () => void;
  onOpen: (tab: Tab, serviceId?: string) => void;
}) {
  const [query, setQuery] = useState('');
  const needle = query.trim().toLowerCase();
  const visible = ACTIONS.filter((action) => {
    if (needle === '') return true;
    return `${action.label} ${action.keywords}`.toLowerCase().includes(needle);
  });

  return (
    <div className="anim-drop-in">
      <div className="relative bg-primary px-(--gutter) pt-[max(1.5rem,env(safe-area-inset-top))] pb-4 text-on-primary">
        <div className="flex items-center gap-2">
          <label className="relative min-w-0 flex-1 md:max-w-md md:flex-none">
            <span className="sr-only">Search services</span>
            <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-muted">
              <Mark name="search" className="size-5" />
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder='Search "documents"'
              className="h-12 w-full rounded-sm border border-hairline bg-surface pr-3 pl-10 text-md text-ink"
            />
          </label>
          <ThemeButton
            scheme={scheme}
            onToggle={onToggle}
            className="text-on-primary hover:bg-primary-hover md:hidden"
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <h1 className="min-w-0 text-lg text-on-primary">
            <span className="block">Maayong Adlaw,</span>
            <span className="block">Kawayanon!</span>
          </h1>
          <Logo label="One Kawayan" className="size-11" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gold-500" />
      </div>

      <div className="mt-4 grid grid-cols-1 items-start gap-5 px-(--gutter) lg:w-fit lg:grid-cols-[24rem_22rem] lg:gap-8">
        {visible.length === 0 ? (
          <p className="text-md text-ink-muted" role="status">Nothing matches that.</p>
        ) : (
          <ul className="grid grid-cols-4 gap-x-1 gap-y-3 max-[21rem]:gap-x-0">
            {visible.map((action, index) => (
              <li key={action.id} className="min-w-0">
                <button
                  type="button"
                  className="interactive-press flex w-full min-w-0 flex-col items-center gap-1.5 text-center"
                  onClick={() => onOpen(action.go, action.serviceId)}
                >
                  <span className="flex size-12 items-center justify-center rounded-sm bg-green-100 text-green-700">
                    <Mark name={action.mark} live delay={index * 40} />
                  </span>
                  <span className="w-full text-xs font-semibold">{action.label}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <section className="rounded-sm bg-primary px-5 py-4 text-on-primary">
          <h2 className="text-xl text-on-primary">Spotted a problem?</h2>
          <p className="mt-2 text-md text-on-primary-muted">
            A road, waste, water, or a street light. Tell the municipality, or call 911 if someone is
            in danger.
          </p>
          <div className="mt-4 flex gap-2">
            <a href="tel:911" className={buttonStyles({ variant: 'inverse', size: 'sm', className: 'flex-1' })}>
              Call 911
            </a>
            <Button type="button" variant="accent" size="sm" className="flex-1" onClick={() => onOpen('report')}>
              Report it
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

function ServicesPanel({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="anim-drop-in flex flex-col gap-6">
      <p className="text-md text-ink-muted">What you will be able to do from here.</p>
      <div className="border-y border-hairline md:grid md:grid-cols-2 md:gap-4 md:border-0">
        {SERVICES.map((service) => {
          const isOpen = selected === service.id;
          return (
            <div
              key={service.id}
              className={cn(
                'border-b border-hairline last:border-b-0 md:rounded-sm md:border',
                isOpen && 'bg-primary-soft',
              )}
            >
              <button
                type="button"
                className="interactive-press flex min-h-14 w-full items-center gap-3 px-3 py-3 text-left"
                aria-expanded={isOpen}
                onClick={() => onSelect(service.id)}
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-md font-semibold">{service.title}</span>
                  <span className="block text-md text-ink-muted">{service.summary}</span>
                </span>
              </button>
              {isOpen && <p className="anim-drop-in px-3 pb-4 text-md text-ink">{service.body}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NewsPanel() {
  return (
    <div className="anim-drop-in flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-start lg:gap-x-12">
      <p className="text-md text-ink-muted lg:col-span-2">MusiKawayan 2026, official results.</p>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg">Grand Showdown</h2>
        <table className="w-full text-base">
          <caption className="sr-only">Grand Showdown rankings</caption>
          <thead>
            <tr className="border-b border-hairline text-left text-ink-muted">
              <th scope="col" className="py-2 pr-3 font-semibold">School</th>
              <th scope="col" className="py-2 pr-3 text-right font-semibold">Average</th>
              <th scope="col" className="py-2 text-right font-semibold">Rank</th>
            </tr>
          </thead>
          <tbody>
            {RESULTS.map((row) => (
              <tr key={row.school} className="border-b border-hairline align-top">
                <th scope="row" className="py-3 pr-3 text-left text-base font-semibold text-ink">
                  {row.school}
                </th>
                <td className="py-3 pr-3 text-right font-medium whitespace-nowrap tabular-nums">
                  {row.average}
                </td>
                <td className="py-3 text-right font-semibold whitespace-nowrap tabular-nums">
                  {row.rank === '1' ? (
                    <span className="inline-block rounded-sm bg-accent-solid px-1.5 text-on-accent">
                      {row.rank}
                    </span>
                  ) : (
                    row.rank
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-4">
          <h2 className="text-lg">Special awards</h2>
          <dl className="flex flex-col gap-4">
            {AWARDS.map(([award, school]) => (
              <div key={award}>
                <dt className="text-md font-semibold text-ink-muted">{award}</dt>
                <dd className="mt-0.5 text-md font-semibold">{school}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg">Grand raffle</h2>
          <p className="text-md">
            Tickets were ₱100, with no minimum and no maximum. Selling ran from 15 to 22 October
            2026, until 4:00 PM, at the Kawayan Municipal Port.
          </p>
          <p className="text-md">
            The draw was 22 October 2026, 7:00 PM, at the Kawayan Food Park, Municipal Port. It was
            also streamed on the official Kawayan PIO Facebook page.
          </p>
          <p className="text-md">
            A winner claims with the original ticket and a proof of identity.
          </p>
        </section>
      </div>
    </div>
  );
}

function ReportPanel() {
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>('Road');
  const [place, setPlace] = useState('');
  const [detail, setDetail] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const problem = reportFieldError(place, detail);
    if (problem !== '') {
      setSaved(false);
      setError(problem);
      return;
    }
    setError('');
    setSaved(true);
  }

  return (
    <div className="anim-drop-in flex flex-col gap-6">
      <p className="text-md text-ink-muted">This form stays on this phone. It is not sent.</p>
      <form className="flex max-w-3xl flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-x-6" onSubmit={onSubmit} noValidate>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="topic" className="text-base font-semibold">
            What is it about
          </label>
          <select
            id="topic"
            value={topic}
            onChange={(event) => setTopic(event.target.value as (typeof TOPICS)[number])}
            className="h-12 rounded-sm border border-hairline-strong bg-surface px-3 text-md"
          >
            {TOPICS.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="place" className="text-base font-semibold">
            Where
          </label>
          <input
            id="place"
            value={place}
            onChange={(event) => setPlace(event.target.value)}
            autoComplete="off"
            aria-invalid={error !== '' && place.trim() === ''}
            className="h-12 rounded-sm border border-hairline-strong bg-surface px-3 text-md"
          />
        </div>
        <div className="flex flex-col gap-1.5 lg:col-span-2">
          <label htmlFor="detail" className="text-base font-semibold">
            What happened
          </label>
          <textarea
            id="detail"
            value={detail}
            onChange={(event) => setDetail(event.target.value)}
            rows={4}
            aria-invalid={error !== '' && detail.trim() === ''}
            className="rounded-sm border border-hairline-strong bg-surface px-3 py-3 text-md"
          />
        </div>
        {error !== '' && (
          <p role="alert" className="text-base font-semibold text-danger-700 lg:col-span-2">
            {error}
          </p>
        )}
        {saved && (
          <p role="status" className="text-md lg:col-span-2">
            Noted under {topic}. Nothing was sent.
          </p>
        )}
        <div className="lg:col-span-2 lg:max-w-xs">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}

function EmergencyPanel() {
  return (
    <div className="anim-drop-in flex flex-col gap-5">
      <p className="text-md text-ink-muted">
        Municipal office numbers will be the ones Kawayan publishes. Until then, emergency is 911.
      </p>
      <a
        href="tel:911"
        className={buttonStyles({ variant: 'primary', size: 'lg', fullWidth: true, className: 'md:w-64' })}
      >
        Call 911
      </a>
    </div>
  );
}

function ThemeButton({
  scheme,
  onToggle,
  className,
}: {
  scheme: Scheme;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={cn(
        'interactive-press flex size-12 shrink-0 items-center justify-center rounded-sm text-ink hover:bg-primary-soft',
        className,
      )}
      aria-pressed={scheme === 'dark'}
      aria-label={scheme === 'light' ? 'Switch to dark' : 'Switch to light'}
      onClick={onToggle}
    >
      <Mark key={scheme} name={scheme === 'light' ? 'moon' : 'sun'} live />
    </button>
  );
}
