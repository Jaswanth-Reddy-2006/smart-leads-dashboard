import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Database,
  Download,
  Filter,
  GitBranch,
  LayoutDashboard,
  Search,
  Server,
  Sparkles,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';

type SectionTab = 'features' | 'backend' | 'frontend';

const assignmentPoints = [
  'JWT authentication with protected routes',
  'Lead CRUD with details, filters, and search',
  'Backend pagination with 10 records per page',
  'CSV export, Docker setup, and RBAC',
];

const featureCards: Array<{ title: string; text: string; icon: LucideIcon }> = [
  {
    title: 'Authentication Flow',
    text: 'Registration, login, password hashing, JWT middleware, and protected frontend routes are wired end to end.',
    icon: ShieldCheck,
  },
  {
    title: 'Leads Workspace',
    text: 'A focused dashboard handles create, update, delete, list, and detail workflows with reusable UI components.',
    icon: LayoutDashboard,
  },
  {
    title: 'Advanced Discovery',
    text: 'Status, source, search, and sort work together through backend query logic and a debounced search input.',
    icon: Filter,
  },
  {
    title: 'Export Ready',
    text: 'CSV export respects active filters so reviewers can verify the same dataset they see on screen.',
    icon: Download,
  },
];

const stackItems: Array<{ title: string; text: string; icon: LucideIcon }> = [
  { title: 'Frontend', text: 'React, TypeScript, Vite, TailwindCSS', icon: LayoutDashboard },
  { title: 'State & API', text: 'Zustand, Axios, typed contracts', icon: GitBranch },
  { title: 'Backend', text: 'Node, Express, JWT, Zod', icon: Server },
  { title: 'Database', text: 'MongoDB, Mongoose, Docker', icon: Database },
];

const tabContent: Record<SectionTab, { title: string; body: string; bullets: string[] }> = {
  features: {
    title: 'Assignment Coverage',
    body: 'The implementation maps directly to the internship brief and keeps the required features connected as one usable product.',
    bullets: [
      'Authentication, lead CRUD, filters, search, sorting, pagination, and CSV export are implemented.',
      'RBAC is kept because the assignment explicitly marks Admin and Sales User access as mandatory.',
      'Loading states, empty states, validation, and error UI are part of the user-facing workflow.',
      'The README includes setup instructions, API documentation, and environment guidance.',
    ],
  },
  backend: {
    title: 'API And Data Layer',
    body: 'The backend follows a clean Express structure with route, controller, service, model, middleware, and utility layers.',
    bullets: [
      'Zod validates incoming payloads before controller logic runs.',
      'Centralized errors and response helpers keep API output predictable.',
      'Mongoose schemas define status/source enums and user relationships.',
      'Pagination metadata is returned from the API with skip and limit handling.',
    ],
  },
  frontend: {
    title: 'Dashboard Experience',
    body: 'The client is a typed React app with reusable controls, protected routes, store-driven state, and responsive layouts.',
    bullets: [
      'Reusable table, card, modal, form, filter, and layout components keep the UI maintainable.',
      'Axios handles API communication while Zustand stores auth and lead state.',
      'Search input is debounced to avoid noisy API calls while typing.',
      'The interface supports dark mode as a bonus feature.',
    ],
  },
};

export function LandingPage(): JSX.Element {
  const { isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState<SectionTab>('features');

  const currentTab = tabContent[activeTab];

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white selection:bg-blue-500 selection:text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_4%,rgba(0,102,255,0.28),transparent_28%),radial-gradient(circle_at_52%_40%,rgba(0,85,255,0.16),transparent_32%),linear-gradient(180deg,#000_0%,#020814_48%,#001b43_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:72px_72px]" />

      <nav className="sticky top-0 z-40 border-b border-white/10 bg-black/70 px-4 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.55)]">
              <Sparkles size={19} />
            </span>
            <span>
              <span className="block text-sm font-bold uppercase leading-tight tracking-wide">ServiceHive</span>
              <span className="block text-xs font-medium text-blue-300">Smart Leads Dashboard</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button className="h-9 px-3">
                  Dashboard <ArrowRight size={16} />
                </Button>
              </Link>
            ) : (
              <>
                <Link className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 hover:text-white sm:inline-flex" to="/login">
                  Sign in
                </Link>
                <Link to="/register">
                  <Button className="h-9 px-3">Get started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <header className="relative z-10">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-16 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:pb-24 lg:pt-20">
          <section className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
              <Sparkles size={14} />
              MERN internship assignment
            </div>
            <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-normal text-white sm:text-6xl lg:mx-0">
              Smart Leads Dashboard for <span className="text-blue-400">growing sales teams</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg lg:mx-0">
              A full-stack lead management system built with React, TypeScript, Express, MongoDB, and clean architecture
              practices for the ServiceHive internship assignment.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link to="/login">
                <Button className="h-11 w-full px-5 sm:w-auto">
                  Test dashboard <ArrowRight size={18} />
                </Button>
              </Link>
              <a href="#work-summary">
                <Button variant="secondary" className="h-11 w-full px-5 sm:w-auto">
                  View implementation
                </Button>
              </a>
            </div>

            <div className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-2 lg:mx-0">
              {assignmentPoints.map((point) => (
                <div key={point} className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.035] p-3 text-left text-sm text-slate-300">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-blue-300" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </section>

          <section aria-label="Dashboard preview" className="relative">
            <div className="absolute inset-8 rounded-full bg-blue-600/30 blur-3xl" />
            <div className="relative overflow-hidden rounded-lg border border-blue-400/20 bg-[#05070b] shadow-[0_0_70px_rgba(0,92,255,0.2)]">
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs font-semibold text-blue-200">/dashboard</span>
              </div>

              <div className="grid min-h-[390px] grid-cols-[76px_1fr]">
                <aside className="border-r border-white/10 bg-black/40 p-4">
                  <div className="mb-7 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <BarChart3 size={18} />
                  </div>
                  <div className="space-y-3">
                    {[LayoutDashboard, Search, Filter, Download].map((Icon, index) => (
                      <div
                        key={index}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          index === 0 ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400'
                        }`}
                      >
                        <Icon size={17} />
                      </div>
                    ))}
                  </div>
                </aside>

                <div className="bg-[radial-gradient(circle_at_70%_20%,rgba(37,99,235,0.18),transparent_28%)] p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">Lead intelligence</p>
                      <h2 className="mt-2 text-2xl font-bold text-white">Qualified pipeline</h2>
                    </div>
                    <div className="rounded-lg border border-blue-400/30 bg-blue-500/10 px-3 py-2 text-xs font-bold text-blue-100">
                      CSV export ready
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {[
                      ['Total leads', '128', '+18 this week'],
                      ['Qualified', '42', 'Instagram + Web'],
                      ['Page size', '10', 'Backend limit'],
                    ].map(([label, value, caption]) => (
                      <div key={label} className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
                        <p className="text-xs text-slate-400">{label}</p>
                        <p className="mt-2 text-2xl font-bold text-white">{value}</p>
                        <p className="mt-1 text-xs text-blue-200">{caption}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-lg border border-white/10 bg-black/35">
                    <div className="grid grid-cols-[1fr_105px_105px] gap-3 border-b border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      <span>Lead</span>
                      <span>Status</span>
                      <span>Source</span>
                    </div>
                    {[
                      ['Rahul Sharma', 'Qualified', 'Instagram'],
                      ['Neha Rao', 'Contacted', 'Referral'],
                      ['Vikram Sen', 'New', 'Website'],
                    ].map(([name, status, source]) => (
                      <div key={name} className="grid grid-cols-[1fr_105px_105px] gap-3 px-4 py-3 text-sm">
                        <span className="font-medium text-slate-200">{name}</span>
                        <span className="text-blue-300">{status}</span>
                        <span className="text-slate-400">{source}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </header>


      <section id="work-summary" className="relative z-10 border-y border-white/10 bg-black/35">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-300">What was built</p>
            <h2 className="mt-3 text-3xl font-bold text-white">A professional dashboard shaped around the brief</h2>
            <p className="mt-4 text-slate-300">
              The UI now follows the ServiceHive direction: dark surfaces, blue action color, compact sections, and
              product-style dashboard previews.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {featureCards.map(({ title, text, icon: Icon }) => (
              <article key={title} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600/15 text-blue-300">
                  <Icon size={21} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-300">Implementation notes</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Review the engineering coverage</h2>
            <p className="mt-4 leading-7 text-slate-300">
              These notes explain the choices behind the app without hiding the required assignment features.
            </p>
          </div>

          <div className="rounded-lg border border-blue-400/20 bg-white/[0.045] p-3">
            <div className="grid gap-2 sm:grid-cols-3">
              {(['features', 'backend', 'frontend'] as SectionTab[]).map((tab) => (
                <button
                  key={tab}
                  className={`rounded-lg px-4 py-3 text-sm font-bold capitalize ${
                    activeTab === tab ? 'bg-blue-600 text-white' : 'bg-black/35 text-slate-300 hover:bg-blue-500/10'
                  }`}
                  onClick={() => setActiveTab(tab)}
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-5 sm:p-6">
              <h3 className="text-2xl font-bold text-white">{currentTab.title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{currentTab.body}</p>
              <div className="mt-6 grid gap-3">
                {currentTab.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-3 rounded-lg border border-white/10 bg-black/35 p-3 text-sm text-slate-300">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-blue-300" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/10 bg-[#02050a]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
          {stackItems.map(({ title, text, icon: StackIcon }) => (
            <div key={title} className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/15 text-blue-300">
                <StackIcon size={18} />
              </span>
              <div>
                <h3 className="font-bold text-white">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 bg-black px-4 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-sm text-slate-500 sm:flex-row">
          <p>Smart Leads Dashboard for the ServiceHive full-stack internship assignment.</p>
          <p>Built with TypeScript, MERN, RBAC, CSV export, Docker, and clean API structure.</p>
        </div>
      </footer>
    </main>
  );
}
