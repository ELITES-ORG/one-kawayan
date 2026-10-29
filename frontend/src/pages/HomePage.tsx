import { useState, type ReactNode } from 'react';
import { Logo } from '@/components/icons/Logo';
import { Glyph, type GlyphName } from '@/components/icons/glyph';
import { HISTORY } from '@/data/history';
import { NEWS, type NewsArticle } from '@/data/news';
import { cn } from '@/lib/cn';
import { promptInstall, useInstallState } from '@/pages/install';
import { initialScheme, type Scheme } from '@/pages/scheme';
import { STATUS_BAR_ATTR, syncThemeBar } from '@/pages/theme-bar';

type Tab = 'home' | 'services' | 'news' | 'hotlines';

const TABS: { id: Tab; label: string; icon: GlyphName }[] = [
  { id: 'home', label: 'Home', icon: 'home-rounded' },
  { id: 'services', label: 'Services', icon: 'dashboard-customize-rounded' },
  { id: 'news', label: 'News', icon: 'article-rounded' },
  { id: 'hotlines', label: 'Hotlines', icon: 'health-and-safety-rounded' },
];

type QuickItem = { label: string; icon: GlyphName; go?: Tab };

const QUICK: QuickItem[] = [
  { label: 'Services', icon: 'handyman-rounded', go: 'services' },
  { label: 'Citizen Guide', icon: 'menu-book-rounded', go: 'services' },
  { label: 'E-Services', icon: 'language-rounded', go: 'services' },
  { label: 'Hotlines', icon: 'phone-in-talk-rounded', go: 'hotlines' },
  { label: 'Utilities', icon: 'electrical-services-rounded', go: 'services' },
];

const QUICK_MORE: QuickItem[] = [
  { label: 'Transport', icon: 'directions-bus-rounded' },
  { label: 'Students', icon: 'school-rounded' },
  { label: 'Startups', icon: 'rocket-launch-rounded' },
  { label: 'Health', icon: 'local-hospital-rounded' },
];

const EXPLORE = [
  { label: 'Dining', image: '/explore/dining.jpg' },
  { label: 'Cafe', image: '/explore/cafes.jpg' },
  { label: 'Bars and Bistros', image: '/explore/bars_and_bistros.jpg' },
  { label: 'Resorts', image: '/explore/resorts.png' },
  { label: 'Falls', image: '/explore/falls.jpg' },
  { label: 'Mountains', image: '/explore/mountains.jpg' },
  { label: 'Accommodations', image: '/explore/accommodations.jpg' },
];

const TRANSPARENCY: { label: string; icon: GlyphName }[] = [
  { label: 'Program & Projects', icon: 'account-tree-rounded' },
  { label: 'Bids & Projects', icon: 'gavel-rounded' },
  { label: 'Financial\nReports', icon: 'trending-up-rounded' },
  { label: 'Annual\nBudget', icon: 'account-balance-wallet-rounded' },
  { label: 'Legislative\nOrdinances', icon: 'assured-workload-rounded' },
  { label: 'Executive\nOrders', icon: 'workspace-premium-rounded' },
];

type Tint = 'green' | 'gold';

const SERVICE_SECTIONS: {
  title: string;
  description: string;
  items: { title: string; subtitle: string; icon: GlyphName; tint: Tint }[];
}[] = [
  {
    title: 'E-Services',
    description:
      'Login to the Online Services portal to get permits, pay taxes, or request official personal records',
    items: [
      { title: 'Local Civil Registry', subtitle: 'Request civil registry documents.', icon: 'contact-page-rounded', tint: 'green' },
      { title: 'Real Property Tax', subtitle: 'Pay your real property taxes online.', icon: 'request-quote-rounded', tint: 'gold' },
      { title: 'Business Permit', subtitle: 'Apply for or renew your business permit.', icon: 'storefront-rounded', tint: 'green' },
    ],
  },
  {
    title: 'Popular Services',
    description: 'Avail municipal services in just a few taps.',
    items: [
      { title: 'Use of Government Facilities', subtitle: 'Book venues for your programs or...', icon: 'account-balance-rounded', tint: 'green' },
      { title: 'Medical Assistance', subtitle: 'Get aid for medical expenses.', icon: 'medical-services-rounded', tint: 'gold' },
      { title: 'Enterprise Development Program', subtitle: 'Assistance for MSMEs.', icon: 'show-chart-rounded', tint: 'green' },
      { title: 'Transportation Assistance', subtitle: 'Request a ride for urgent needs.', icon: 'directions-bus-rounded', tint: 'gold' },
      { title: 'Request Streetlight Repair', subtitle: 'Report broken streetlights for saf...', icon: 'wb-incandescent-rounded', tint: 'green' },
      { title: 'Request Waste Collection', subtitle: 'Request cleanup for public waste ...', icon: 'delete-outline-rounded', tint: 'gold' },
      { title: 'Request for Training', subtitle: 'Request training from municipal experts.', icon: 'dashboard-customize-rounded', tint: 'green' },
    ],
  },
  {
    title: 'Featured Services',
    description: 'Quick guides and downloadable forms for other essential municipal services.',
    items: [
      { title: 'Senior Citizen ID', subtitle: 'Apply for a Senior Citizen ID.', icon: 'card-membership-rounded', tint: 'green' },
      { title: 'Solo Parent ID', subtitle: 'Apply for a Solo Parent ID.', icon: 'badge-rounded', tint: 'gold' },
      { title: 'Medical Certificate', subtitle: 'Request a medical certificate.', icon: 'medical-information-rounded', tint: 'green' },
      { title: 'Livelihood Training & Loan Assistance', subtitle: 'Programs for livelihood and loans.', icon: 'cases-rounded', tint: 'gold' },
      { title: 'Mountain Hiking Permit', subtitle: 'Get a permit for hiking.', icon: 'landscape-rounded', tint: 'green' },
      { title: 'Summer Employment', subtitle: 'Apply for summer jobs.', icon: 'school-rounded', tint: 'gold' },
    ],
  },
];

const GUIDES = [
  'Social Services',
  'Legal Assistance',
  'Health and Nutrition',
  'Housing and Urban Poor',
  'Information Technology and Investment',
  'Cleanliness and Environmental Protection',
  'Education, Arts, Culture, and Sports Development',
  'Peace and Order, Public Safety, and Transportation',
  'Transparency, Accountability, Good Governance, and Growth',
  'Engineering, General Services, and Sound System Assistance',
  'Livelihood, Employment, Agriculture, and Human Development',
];

const HOTLINES: { name: string; description: string; number: string }[] = [
  {
    name: 'Disaster Risk Reduction and Management Office (DRRMO)',
    description: 'Call for local natural disasters, rescue operations, and municipal emergencies.',
    number: '09165204412',
  },
  {
    name: 'Provincial Disaster Risk Reduction and Management Office (PDRRMO)',
    description: 'Call for provincial-level disasters, major calamities, and coordinated rescue efforts.',
    number: '09064707040',
  },
  {
    name: 'Biliran Provincial Hospital (BPH)',
    description: 'Call for severe medical emergencies, ambulance requests, and urgent healthcare services.',
    number: '09158496164',
  },
  {
    name: 'Biliran Police Provincial Office (BPPO)',
    description: 'Call for immediate police assistance, crime reporting, and public safety concerns.',
    number: '09156419144',
  },
  {
    name: 'Biliran Electric Cooperative (BILECO)',
    description: 'Call for power outages, electrical emergencies, and fallen power lines.',
    number: '09052559119',
  },
];

const card = 'rounded-[16px] bg-surface shadow-[0_4px_12px_oklch(0.2_0.04_158/0.06)]';
const iconWell = 'flex size-10 items-center justify-center rounded-[12px] bg-green-100 text-green-700';

export function HomePage() {
  const [tab, setTab] = useState<Tab>('home');
  const [scheme, setScheme] = useState<Scheme>(() =>
    initialScheme(
      document.documentElement.dataset.theme,
      window.matchMedia('(prefers-color-scheme: dark)').matches,
    ),
  );
  const [article, setArticle] = useState<string | null>(null);

  function applyScheme(next: Scheme) {
    setScheme(next);
    document.documentElement.dataset.theme = next;
    syncThemeBar();
  }

  return (
    <div className="ui-roboto min-h-page overflow-x-clip bg-paper text-ink">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-30 focus:rounded-[12px] focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="relative mx-auto min-h-page w-full max-w-[480px]">
        <main id="content">
          {tab === 'home' && (
            <HomeView
              scheme={scheme}
              onToggle={() => applyScheme(scheme === 'light' ? 'dark' : 'light')}
              onOpen={(next) => {
                if (next === 'news') setArticle(null);
                setTab(next);
              }}
              onRead={(title) => {
                setArticle(title);
                setTab('news');
              }}
            />
          )}
          {tab === 'services' && <ServicesView />}
          {tab === 'news' && <NewsView open={article} onOpen={setArticle} />}
          {tab === 'hotlines' && <HotlinesView />}
        </main>
        <FloatingNav
          tab={tab}
          onSelect={(next) => {
            if (next !== 'news') setArticle(null);
            setTab(next);
          }}
        />
      </div>
    </div>
  );
}

function HistoryBody({ body }: { body: string }) {
  const blocks = body.split(/\n\n+/);
  return (
    <div className="mt-2.5 space-y-3">
      {blocks.map((block) => {
        const lines = block.split('\n');
        if (lines.every((line) => line.startsWith('• '))) {
          return (
            <ul key={block} className="space-y-1 text-[14px] leading-[1.45] text-ink/75">
              {lines.map((line) => (
                <li key={line}>{line.slice(2)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={block} className="text-[14px] leading-[1.6] text-ink/75">
            {block}
          </p>
        );
      })}
    </div>
  );
}

function HomeView({
  scheme,
  onToggle,
  onOpen,
  onRead,
}: {
  scheme: Scheme;
  onToggle: () => void;
  onOpen: (tab: Tab) => void;
  onRead: (title: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [history, setHistory] = useState(false);
  const tiles = expanded ? [...QUICK, ...QUICK_MORE] : QUICK;

  if (history) {
    return (
      <div className="px-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[calc(8rem+env(safe-area-inset-bottom))]">
        <BackButton onClick={() => setHistory(false)} />
        <h1 className="mt-4 text-[28px] leading-[1.2] font-extrabold tracking-[-0.02em]">History of Kawayan</h1>
        <p className="mt-2 text-[14px] leading-[1.4] text-ink/70">
          From Barrio Telegrafo to the Municipality we know today
        </p>
        <ol className="mt-8">
          {HISTORY.map((entry, index) => (
            <li key={entry.title} className="flex gap-4">
              <div className="flex w-8 shrink-0 flex-col items-center">
                <span className="flex size-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <Glyph name={entry.icon} className="size-4" />
                </span>
                {index < HISTORY.length - 1 && <span className="mt-1 w-0.5 flex-1 bg-green-700/30" />}
              </div>
              <article className={cn(card, 'mb-6 min-w-0 flex-1 p-[18px]')}>
                <p className="inline-flex rounded-[8px] bg-green-100 px-2.5 py-1 text-[12px] font-bold tracking-[0.02em] text-green-700">
                  {entry.era}
                </p>
                <h2 className="mt-2.5 text-[16px] font-bold">{entry.title}</h2>
                <HistoryBody body={entry.body} />
              </article>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div className="pb-[calc(8rem+env(safe-area-inset-bottom))]">
      <header
        {...{ [STATUS_BAR_ATTR]: '' }}
        className="u-scheme-dark relative overflow-hidden rounded-b-[34px] bg-green-50 bg-[linear-gradient(to_bottom,var(--color-green-50),transparent_4rem),linear-gradient(to_bottom_right,var(--color-green-50),var(--color-paper))] min-[460px]:rounded-b-[42px]"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-16 right-2 size-36 overflow-hidden opacity-[0.18] min-[380px]:right-4 min-[380px]:size-44 min-[380px]:opacity-20"
        >
          <img
            src="/logos/logo_nobg.png"
            alt=""
            className="absolute top-[-52.06%] left-[-52.06%] size-[204.26%] max-w-none"
          />
        </span>
        <div className="pointer-events-none absolute -bottom-14 -left-2 size-52 rounded-full bg-primary/15" />
        <div className="relative px-5 pt-[max(0.875rem,env(safe-area-inset-top))]">
          <div className="flex items-center gap-1.5">
            <SearchField placeholder="Search something..." />
            <IconButton label={scheme === 'light' ? 'Switch to dark' : 'Switch to light'} onClick={onToggle}>
              <Glyph name={scheme === 'light' ? 'dark-mode-rounded' : 'light-mode-rounded'} className="size-[22px]" />
            </IconButton>
            <IconButton label="Notifications">
              <Glyph name="notifications-outline-rounded" className="size-[22px]" />
            </IconButton>
          </div>
          <div className="mt-7 pb-5">
            <div className="max-w-[52%]">
              <p className="inline-flex rounded-full border border-hairline bg-surface px-3.5 py-2 text-[14px] font-extrabold text-green-700">
                Maayong Adlaw!
              </p>
              <h1 className="mt-3 text-[24px] leading-[1.02] font-extrabold tracking-[-0.03em] text-ink min-[380px]:text-[28px] min-[460px]:mt-4 min-[460px]:text-[32px] min-[460px]:tracking-[-0.075rem]">
                <span className="block whitespace-nowrap">Welcome to</span>
                <span className="block whitespace-nowrap text-gold-600">OneKawayan</span>
              </h1>
            </div>
            <p className="mt-2.5 text-[14px] leading-[1.35] text-ink/80 min-[460px]:mt-3 min-[460px]:text-[16px]">
              <span className="block whitespace-nowrap">Municipal services, local news,</span>
              <span className="block whitespace-nowrap min-[380px]:hidden">and emergency access.</span>
              <span className="hidden whitespace-nowrap min-[380px]:block">and emergency access in one place.</span>
            </p>
          </div>
        </div>
      </header>

      <div className="px-6 pt-[26px]">
        <h2 className="text-[22px] leading-tight font-bold">Quick access</h2>
        <ul className="mt-4 grid grid-cols-3 gap-3">
          {tiles.map((item) => (
            <li key={item.label}>
              <Tile
                icon={item.icon}
                label={item.label}
                onClick={() => {
                  if (item.go) onOpen(item.go);
                }}
              />
            </li>
          ))}
          <li>
            <Tile
              icon={expanded ? 'expand-less-rounded' : 'expand-more-rounded'}
              label={expanded ? 'View Less' : 'View More'}
              onClick={() => setExpanded((value) => !value)}
            />
          </li>
        </ul>

        <Rule />

        <section className={cn(card, 'p-[22px]')}>
          <div className="flex items-center gap-2.5">
            <Glyph name="campaign-rounded" className="size-6 text-green-700" />
            <h2 className="text-[22px] leading-tight font-bold">Better Kawayan</h2>
          </div>
          <p className="mt-3.5 text-[16px] leading-[1.45]">
            Create an account to report local issues directly to the municipality.
          </p>
          <InstallButton />
        </section>

        <Rule />

        <h2 className="text-[24px] leading-tight font-bold">Explore Kawayan</h2>
        <p className="mt-2 text-[14px] text-ink/70">Discover your next favorite spot in the municipality</p>
      </div>

      <ul className="mt-4 flex gap-3 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {EXPLORE.map((item) => (
          <li key={item.label} className="relative h-[180px] w-[75%] shrink-0 overflow-hidden rounded-[16px]">
            <img src={item.image} alt="" className="size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-scrim" />
            <p className="absolute inset-x-0 bottom-0 p-4 text-[20px] font-bold text-on-primary">{item.label}</p>
          </li>
        ))}
      </ul>

      <div className="px-6">
        <Rule />
        <h2 className="text-[22px] leading-[1.25] font-bold whitespace-pre-line">
          Transparency &{'\n'}Good Governance
        </h2>
        <p className="mt-1.5 text-[14px] text-ink/70">Know where your taxes go</p>
        <ul className="mt-[18px] grid grid-cols-2 gap-3">
          {TRANSPARENCY.map((item) => (
            <li key={item.label} className={cn(card, 'flex items-center gap-3 px-3.5 py-4')}>
              <span className={iconWell}>
                <Glyph name={item.icon} className="size-[22px]" />
              </span>
              <span className="text-[12px] leading-[1.3] font-semibold whitespace-pre-line">{item.label}</span>
            </li>
          ))}
        </ul>
        <Rule />
        <h2 className="text-[28px] leading-[1.15] font-extrabold tracking-[-0.02em]">Discover Latest News</h2>
        <p className="mt-1.5 text-[14px] text-ink/70">Latest news and announcements for Kawayan</p>
        <ul className="mt-[18px] flex flex-col gap-3.5">
          {NEWS.slice(0, 3).map((item) => (
            <li key={item.title}>
              <button type="button" className="w-full text-left" onClick={() => onRead(item.title)}>
                <NewsCard item={item} />
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="mt-4 w-full rounded-[18px] border border-ink/20 px-5 py-4 text-[16px] font-semibold"
          onClick={() => onOpen('news')}
        >
          See more news
        </button>
        <Rule />
        <h2 className="text-[22px] leading-tight font-bold">History of Kawayan</h2>
        <p className="mt-1.5 text-[14px] text-ink/70">Learn about the rich heritage of our municipality</p>
        <button type="button" className={cn(card, 'mt-[18px] flex w-full items-center gap-4 p-5 text-left')} onClick={() => setHistory(true)}>
          <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-green-100 text-green-700">
            <Glyph name="auto-stories-rounded" className="size-6" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] font-bold">Discover Our Story</span>
            <span className="mt-1 block text-[12px] leading-[1.4] text-ink-muted">
              From Barrio Telegrafo to the Municipality of Kawayan — explore centuries of heritage, culture, and
              resilience.
            </span>
          </span>
          <Glyph name="arrow-forward-ios-rounded" className="size-4 shrink-0 text-green-700" />
        </button>
      </div>
    </div>
  );
}

function ServicesView() {
  const [query, setQuery] = useState('');
  const needle = query.trim().toLowerCase();
  const sections = SERVICE_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter((item) => item.title.toLowerCase().includes(needle)),
  })).filter((section) => section.items.length > 0);
  const guides = GUIDES.filter((title) => title.toLowerCase().includes(needle));
  const empty = sections.length === 0 && guides.length === 0;

  return (
    <Screen title="Services" search="Search services..." query={query} onQuery={setQuery}>
      {empty ? (
        <p className="py-12 text-center text-[16px] text-ink-muted">No services found</p>
      ) : (
        <>
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-[22px] font-bold">{section.title}</h2>
              <p className="mt-1.5 text-[14px] leading-[1.4] text-ink/80">{section.description}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {section.items.map((item) => (
                  <li key={item.title} className={cn(card, 'flex items-center gap-4 p-4')}>
                    <span
                      className={cn(
                        'flex size-11 shrink-0 items-center justify-center rounded-[14px]',
                        item.tint === 'green' ? 'bg-green-100 text-green-700' : 'bg-gold-100 text-gold-700',
                      )}
                    >
                      <Glyph name={item.icon} className="size-6" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[16px] font-bold">{item.title}</span>
                      <span className="mt-1 block truncate text-[12px] text-ink/70">{item.subtitle}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <Rule />
            </section>
          ))}
          {guides.length > 0 && (
            <section>
              <h2 className="text-[22px] font-bold">Guide to All Services</h2>
              <p className="mt-1.5 text-[14px] leading-[1.4] text-ink/80">
                Requirements and procedures for municipal services.
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {guides.map((title) => (
                  <li key={title} className={cn(card, 'flex items-center gap-3 px-5 py-[18px]')}>
                    <span className="min-w-0 flex-1 text-[16px] font-semibold">{title}</span>
                    <Glyph name="chevron-right-rounded" className="size-6 shrink-0 text-ink-subtle" />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </Screen>
  );
}

function NewsView({ open, onOpen }: { open: string | null; onOpen: (title: string | null) => void }) {
  const [query, setQuery] = useState('');
  const needle = query.trim().toLowerCase();
  const items = NEWS.filter((item) => item.title.toLowerCase().includes(needle));
  const selected = NEWS.find((item) => item.title === open);

  if (selected) {
    return (
      <div className="px-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[calc(8rem+env(safe-area-inset-bottom))]">
        <BackButton onClick={() => onOpen(null)} />
        <img src={selected.image} alt="" className="mt-4 aspect-video w-full rounded-[16px] object-cover" />
        <h1 className="mt-4 text-[28px] leading-[1.2] font-extrabold">{selected.title}</h1>
        <p className="mt-2 text-[12px] font-semibold text-green-700">
          {selected.author} · {selected.date}
        </p>
        {selected.body.split(/\n\n+/).map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="mt-4 text-[16px] leading-[1.45]">
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  return (
    <Screen title="News" search="Search news..." query={query} onQuery={setQuery}>
      {items.length === 0 ? (
        <p className="py-12 text-center text-[16px] text-ink-muted">No news found</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {items.map((item) => (
            <li key={item.title}>
              <button type="button" className="w-full text-left" onClick={() => onOpen(item.title)}>
                <NewsCard item={item} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Screen>
  );
}

function HotlinesView() {
  const [query, setQuery] = useState('');
  const needle = query.trim().toLowerCase();
  const items = HOTLINES.filter(
    (item) =>
      item.name.toLowerCase().includes(needle) ||
      item.description.toLowerCase().includes(needle) ||
      item.number.includes(needle),
  );

  return (
    <Screen title="Hotlines" search="Search hotlines..." query={query} onQuery={setQuery}>
      {items.length === 0 ? (
        <p className="py-12 text-center text-[16px] text-ink-muted">No hotlines found</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.number}>
              <a href={`tel:${item.number}`} className={cn(card, 'flex gap-3 p-4')}>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-green-100 text-green-700">
                  <Glyph name="phone-in-talk-rounded" className="size-6" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[16px] font-bold">{item.name}</span>
                  <span className="mt-1 block text-[12px] leading-[1.4] text-ink/70">{item.description}</span>
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-[8px] bg-gold-100 px-3 py-1.5 text-[14px] font-bold text-gold-700">
                    <Glyph name="call-rounded" className="size-3.5" />
                    {item.number}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </Screen>
  );
}

function Screen({
  title,
  search,
  query,
  onQuery,
  children,
}: {
  title: string;
  search: string;
  query: string;
  onQuery: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <div className="px-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[calc(8rem+env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Logo label="" className="size-11" />
          <h1 className="min-w-0 text-[28px] leading-tight font-extrabold tracking-[-0.02em]">{title}</h1>
        </div>
        <IconButton label="Notifications">
          <Glyph name="notifications-outline-rounded" className="size-[22px]" />
        </IconButton>
      </div>
      <div className="mt-6">
        <SearchField placeholder={search} value={query} onChange={onQuery} />
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function SearchField({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-[16px] border border-hairline bg-surface px-2.5 shadow-[0_4px_12px_oklch(0.2_0.04_158/0.05)]">
      <Glyph name="search-rounded" className="size-[18px] shrink-0 text-green-700" />
      <span className="sr-only">{placeholder}</span>
      <input
        value={onChange ? (value ?? '') : undefined}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        placeholder={placeholder}
        className="w-full min-w-0 flex-1 bg-transparent text-[16px] font-medium text-ink outline-none placeholder:text-[14px] placeholder:tracking-normal placeholder:text-ink-muted"
      />
    </label>
  );
}

const INSTALL_HINT = {
  ios: 'In Safari, tap Share, then Add to Home Screen.',
  manual: "Open your browser's menu and choose Install app or Add to Home screen.",
} as const;

/** Opens the browser's install dialog where there is one, and says how where there is not. */
function InstallButton() {
  const state = useInstallState();
  const [hint, setHint] = useState(false);
  const installed = state === 'installed';

  return (
    <>
      <button
        type="button"
        disabled={installed}
        onClick={() => {
          if (state === 'prompt') void promptInstall();
          else setHint(true);
        }}
        className="mt-4 w-full rounded-[18px] bg-primary px-5 py-4 text-[16px] font-bold text-on-primary disabled:opacity-60"
      >
        {installed ? 'Installed' : 'Install App'}
      </button>
      <p role="status" className="mt-3 text-center text-[14px] leading-[1.4] text-ink/80 empty:hidden">
        {hint && (state === 'ios' || state === 'manual') ? INSTALL_HINT[state] : ''}
      </p>
    </>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-11 items-center gap-1 rounded-[16px] border border-hairline bg-surface px-3.5 text-[14px] font-semibold text-green-700 shadow-[0_4px_12px_oklch(0.2_0.04_158/0.05)]"
    >
      <Glyph name="arrow-forward-ios-rounded" className="size-4 -scale-x-100" />
      Back
    </button>
  );
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-11 shrink-0 items-center justify-center rounded-[16px] border border-hairline bg-surface text-green-700 shadow-[0_4px_12px_oklch(0.2_0.04_158/0.05)]"
    >
      {children}
    </button>
  );
}

function Tile({ icon, label, onClick }: { icon: GlyphName; label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={cn(card, 'flex w-full flex-col items-center px-1 py-3.5')}>
      <span className={iconWell}>
        <Glyph name={icon} className="size-[22px]" />
      </span>
      <span className="mt-2 w-full truncate text-center text-[11px] font-semibold">{label}</span>
    </button>
  );
}

function NewsCard({ item }: { item: NewsArticle }) {
  return (
    <div className={cn(card, 'overflow-hidden')}>
      <img src={item.image} alt="" className="aspect-video w-full object-cover" />
      <div className="px-4 pt-3.5 pb-4">
        <p className="flex items-center gap-3 text-[12px]">
          <span className="inline-flex min-w-0 items-center gap-1 text-ink-muted">
            <Glyph name="person-rounded" className="size-3.5" />
            <span className="truncate">{item.author}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-green-700">
            <Glyph name="calendar-today-rounded" className="size-3.5" />
            {item.date}
          </span>
        </p>
        <h3 className="mt-2 text-[14px] leading-[1.3] font-bold">{item.title}</h3>
      </div>
    </div>
  );
}

function Rule() {
  return <div className="my-5 h-px bg-ink/6" />;
}

function FloatingNav({ tab, onSelect }: { tab: Tab; onSelect: (tab: Tab) => void }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center px-6 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <nav
        aria-label="Sections"
        className="pointer-events-auto flex h-16 w-full max-w-[300px] items-center justify-center rounded-[24px] bg-scrim shadow-[0_18px_28px_oklch(0.14_0.02_158/0.3)]"
      >
        {TABS.map((item) => {
          const selected = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-current={selected ? 'page' : undefined}
              onClick={() => onSelect(item.id)}
              className={cn(
                'flex min-w-14 flex-col items-center px-3 py-1.5',
                selected ? 'text-gold-500' : 'text-on-primary/60',
              )}
            >
              <Glyph name={item.icon} className={selected ? 'size-[26px]' : 'size-6'} />
              <span className={cn('mt-0.5 text-[10px]', selected ? 'font-bold' : 'font-medium')}>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
