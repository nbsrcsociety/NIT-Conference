import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Building2,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  ExternalLink,
  FileCheck2,
  FileText,
  Filter,
  Globe2,
  Mail,
  MapPin,
  Menu,
  Pause,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { Link, Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { cn } from '@/lib/utils';

const queryClient = new QueryClient();

type HeroSlide = {
  kicker: string;
  title: string;
  detail: string;
  note: string;
  pattern: string;
  image?: string;
};

const heroSlides: HeroSlide[] = [
  { kicker: '1st International Conference', title: 'International Conference on AI and ML for Computing and Cyber Security', detail: '16 – 18 September 2027  |  NIT CAMPUS, Silchar, India', note: 'I-AM-ComCyS 2027',pattern: 'pattern-neural', image: '/banner1.png' },
  { kicker: 'A connected research forum', title: 'Where intelligent systems meet the physical world', detail: 'Hybrid mode  |  Global call for original research', note: 'Build signals that move beyond the screen', pattern: 'pattern-circuit',image: '/slide3.png' },
  { kicker: 'For researchers, builders & leaders', title: 'Turn rigorous ideas into shared momentum', detail: 'Applications of AI in various Domains', note: 'A conference shaped by useful questions', pattern: 'pattern-hex',image: '/slide2.jpg' },
  { kicker: 'One room. Many disciplines.', title: 'The data, devices and decisions of tomorrow', detail: '[Institute], [City], [Country]  |  14 – 16 December 2026', note: 'Submit your next significant result', pattern: 'pattern-dots',image: '/slide1.jpg' },
];

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/committee', label: 'Committee' },
  { href: '/call-for-papers', label: 'Call for Papers' },
  { href: '/submission', label: 'Submission' },
  { href: '/special-sessions', label: 'Special Sessions' },
  { href: '/registration', label: 'Registration' },
];

const searchDocs = [
  { title: 'Conference home', href: '/', terms: 'welcome venue important dates speakers proceedings conference' },
  { title: 'Organizing committee', href: '/committee', terms: 'chief patron chairs advisory technical program track committee' },
  { title: 'Call for papers and tracks', href: '/call-for-papers', terms: 'artificial intelligence computing internet things data science topics awards' },
  { title: 'Manuscript submission', href: '/submission', terms: 'guidelines template consent camera ready checklist plagiarism review system' },
  { title: 'Special sessions', href: '/special-sessions', terms: 'focused research emerging topics organizers submission details' },
  { title: 'Registration and fees', href: '/registration', terms: 'fees payment bank details registration notes listeners students' },
];

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} | CONF 2026`;
    const meta = document.querySelector('meta[name="description"]') ?? document.createElement('meta');
    meta.setAttribute('name', 'description');
    meta.setAttribute('content', description);
    document.head.appendChild(meta);
  }, [title, description]);
}

function Header() {
  const [location, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const results = useMemo(() => {
    if (!query.trim()) return searchDocs;
    const normalized = query.toLowerCase();
    return searchDocs.filter((item) => `${item.title} ${item.terms}`.toLowerCase().includes(normalized));
  }, [query]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (results[0]) {
      setLocation(results[0].href);
      setSearchOpen(false);
      setMenuOpen(false);
    }
  };

  return (
    <header className="glass-nav sticky top-0 z-40 border-b border-cyan-300/20 text-slate-100 shadow-xl shadow-slate-950/10">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-4 lg:px-10">
        <Link href="/" data-testid="link-brand" className="group flex min-w-fit items-center gap-3" onClick={() => setMenuOpen(false)}>
          <img src="/clogo.png" alt="CONF 2026" className="h-16 w-16 object-contain"/>
          <span className="leading-none">
            <span className="block font-display text-xl font-bold tracking-tight">I-AM-COMSYS <span className="text-cyan-300">2027</span></span>
            <span className="mt-1 block font-mono-brand text-[9px] uppercase tracking-[.23em] text-slate-300">Signals / Systems / Society</span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`} className={cn('border-b-2 border-transparent py-2 text-[11px] font-bold uppercase tracking-[.12em] text-slate-300 transition-colors hover:border-cyan-300 hover:text-cyan-200', location === item.href && 'border-cyan-300 text-cyan-200')}>
              {item.label}
            </Link>
          ))}
          <a href="#contact" data-testid="link-nav-contact" className="border-b-2 border-transparent py-2 text-[11px] font-bold uppercase tracking-[.12em] text-slate-300 transition-colors hover:border-cyan-300 hover:text-cyan-200">Contact</a>
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <button type="button" aria-label="Open site search" data-testid="button-open-search" className="rounded-lg border border-slate-500/40 p-2 text-slate-200 hover:border-cyan-300 hover:text-cyan-200" onClick={() => setSearchOpen((open) => !open)}><Search size={17} /></button>
          <Link href="/registration" data-testid="link-header-register" className="button-pattern rounded-lg px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.12em]">Register now <ArrowUpRight className="ml-1 inline" size={14} /></Link>
        </div>
        <button type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu" className="rounded-lg border border-slate-500/40 p-2 text-slate-100 lg:hidden" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {searchOpen && (
        <div className="border-t border-cyan-300/15 px-5 py-4 lg:px-10">
          <form onSubmit={submitSearch} className="mx-auto flex max-w-[1440px] gap-2">
            <label className="sr-only" htmlFor="site-search">Search site</label>
            <input id="site-search" data-testid="input-site-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search pages, tracks, dates…" className="min-w-0 flex-1 rounded-lg border border-slate-500/40 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none" />
            <button type="submit" data-testid="button-site-search" className="button-pattern rounded-lg px-4 text-sm font-bold">Search</button>
          </form>
          <div className="mx-auto mt-3 flex max-w-[1440px] flex-wrap gap-2">
            {results.map((result) => <button type="button" key={result.href} data-testid={`button-search-result-${result.href.replaceAll('/', '') || 'home'}`} onClick={() => { setLocation(result.href); setSearchOpen(false); }} className="rounded-full border border-slate-500/40 bg-slate-900/40 px-3 py-1.5 text-xs text-slate-300 hover:border-cyan-300 hover:text-cyan-200">{result.title}</button>)}
            {results.length === 0 && <span className="text-xs text-slate-400">No indexed pages match that search.</span>}
          </div>
        </div>
      )}
      {menuOpen && (
        <nav aria-label="Mobile navigation" className="border-t border-cyan-300/15 px-5 py-4 lg:hidden">
          <div className="grid gap-1">
            {navItems.map((item) => <Link key={item.href} href={item.href} data-testid={`link-mobile-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`} onClick={() => setMenuOpen(false)} className={cn('rounded-lg px-3 py-3 text-sm font-bold text-slate-300 hover:bg-cyan-300/10 hover:text-cyan-200', location === item.href && 'bg-cyan-300/10 text-cyan-200')}>{item.label}</Link>)}
            <a href="#contact" data-testid="link-mobile-contact" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-bold text-slate-300 hover:bg-cyan-300/10 hover:text-cyan-200">Contact</a>
          </div>
        </nav>
      )}
    </header>
  );
}

function HeroSlider({ compact = false, pageLabel }: { compact?: boolean; pageLabel?: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const slide = heroSlides[active];
  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % heroSlides.length), 6000);
    return () => window.clearInterval(timer);
  }, [paused]);
  const move = (direction: number) => setActive((current) => (current + direction + heroSlides.length) % heroSlides.length);
  return (
    <section aria-label="Conference highlights" aria-live="polite" role="region" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} onKeyDown={(event) => { if (event.key === 'ArrowRight') move(1); if (event.key === 'ArrowLeft') move(-1); }} tabIndex={0} onTouchStart={(event) => setTouchStart(event.touches[0].clientX)} onTouchEnd={(event) => { if (touchStart === null) return; const distance = event.changedTouches[0].clientX - touchStart; if (Math.abs(distance) > 40) move(distance > 0 ? -1 : 1); setTouchStart(null); }} className="hero-gradient relative isolate overflow-hidden border-b border-cyan-300/20 min-h-[650px] md:min-h-[700px]">
      {heroSlides.map((item, index) => (
  <div
    key={item.title}
    aria-hidden={index !== active}
    className={cn(
      'absolute inset-0 -z-10 bg-cover bg-[center_30%] opacity-0 transition-opacity duration-1000',
      !item.image && item.pattern,
      index === active && 'opacity-100'
    )}
    style={
      item.image
        ? { backgroundImage: `url(${item.image})` }
        : undefined
    }
  />
))}
      <div className="absolute inset-0 -z-[5] overflow-hidden"><div className={cn('hero-orbit', compact && 'scale-75')} /><div className="absolute right-[16%] top-[32%] h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_26px_#00e5ff]" /><div className="absolute right-[24%] top-[67%] h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_18px_#a78bfa]" /></div>
      <div className="absolute inset-0 -z-[4] bg-black/30" />
      <div className="absolute inset-0 -z-[4] bg-gradient-to-b from-black/30 via-transparent to-[#050b1f]/90" />
     
      <div className="mx-auto flex max-w-[1440px] items-center px-5 py-20 lg:px-10" style={{ minHeight: compact ? 390 : 650 }}>
        <div className="max-w-3xl reveal">
          {pageLabel && <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-slate-950/30 px-3 py-1.5 font-mono-brand text-[10px] uppercase tracking-[.18em] text-cyan-200"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300" /> {pageLabel}</div>}
          <p className="eyebrow text-cyan-300">{slide.kicker}</p>
          <h1 className={cn('mt-4 max-w-4xl font-display font-semibold leading-[.98] tracking-[-.04em] text-slate-50', compact ? 'text-4xl md:text-6xl' : 'text-5xl md:text-7xl lg:text-[5.85rem]')}>{slide.title}</h1>
          <p className="mt-6 max-w-xl font-mono-brand text-xs leading-7 text-cyan-100/80 md:text-sm">{slide.detail}<span className="ml-1 inline-block h-4 w-px translate-y-1 animate-pulse bg-cyan-300" /></p>
          <p className="mt-2 text-sm italic text-slate-300">{slide.note}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/submission" data-testid="link-hero-submit" className="button-pattern rounded-lg px-5 py-3 text-center text-xs font-extrabold uppercase tracking-[.13em]">Submit paper <ArrowRight className="ml-1 inline" size={15} /></Link>
            <Link href="/registration" data-testid="link-hero-register" className="rounded-lg border border-cyan-200/40 bg-slate-950/35 px-5 py-3 text-center text-xs font-extrabold uppercase tracking-[.13em] text-cyan-100 hover:border-cyan-200 hover:bg-slate-900/50">Register now</Link>
            <Link href="/call-for-papers" data-testid="link-hero-cfp" className="rounded-lg border border-slate-400/30 bg-slate-950/25 px-5 py-3 text-center text-xs font-extrabold uppercase tracking-[.13em] text-slate-200 hover:border-cyan-300 hover:text-cyan-200">Call for papers</Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-7 left-5 right-5 mx-auto flex max-w-[1440px] items-center justify-between gap-4 lg:left-10 lg:right-10">
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Previous slide" data-testid="button-hero-previous" onClick={() => move(-1)} className="rounded-full border border-slate-400/35 bg-slate-950/30 p-2 text-slate-200 hover:border-cyan-300 hover:text-cyan-200"><ChevronLeft size={17} /></button>
          <button type="button" aria-label="Next slide" data-testid="button-hero-next" onClick={() => move(1)} className="rounded-full border border-slate-400/35 bg-slate-950/30 p-2 text-slate-200 hover:border-cyan-300 hover:text-cyan-200"><ChevronRight size={17} /></button>
          <button type="button" aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} data-testid="button-hero-pause" onClick={() => setPaused((value) => !value)} className="rounded-full border border-slate-400/35 bg-slate-950/30 p-2 text-slate-200 hover:border-cyan-300 hover:text-cyan-200">{paused ? <Play size={15} /> : <Pause size={15} />}</button>
        </div>
        <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
          {heroSlides.map((item, index) => <button type="button" role="tab" aria-selected={index === active} aria-label={`Show slide ${index + 1}`} data-testid={`button-hero-dot-${index + 1}`} key={item.title} onClick={() => setActive(index)} className={cn('h-1.5 rounded-full bg-slate-500/70 transition-all', index === active ? 'w-12 bg-cyan-300' : 'w-5 hover:bg-cyan-200')} />)}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, children, dark = false }: { eyebrow: string; title: string; children?: ReactNode; dark?: boolean }) {
  return <div className={cn('max-w-3xl', dark ? 'text-slate-50' : 'text-slate-900')}><p className={cn('section-kicker', dark && 'text-cyan-300')}>{eyebrow}</p><h2 className="mt-3 font-display text-4xl font-semibold tracking-[-.04em] md:text-5xl">{title}</h2>{children && <p className={cn('mt-4 max-w-2xl text-sm leading-7', dark ? 'text-slate-300' : 'text-slate-600')}>{children}</p>}</div>;
}

function AnnouncementRow() {
  const announcements = [
    { label: 'Presentation template', icon: FileText, href: '/submission' },
    { label: 'Technical program schedule', icon: Clock3, href: '/call-for-papers' },
    { label: 'Proceedings inclusion approved', icon: ShieldCheck, href: '/call-for-papers', highlight: true },
    { label: 'Paper invited for special session', icon: Sparkles, href: '/special-sessions' },
  ];
  return <section className="pattern-dots border-b border-blue-900/10 px-5 py-5 lg:px-10"><div className="mx-auto grid max-w-[1440px] gap-3 md:grid-cols-2 xl:grid-cols-4">{announcements.map(({ label, icon: Icon, href, highlight }) => <Link href={href} data-testid={`link-announcement-${label.toLowerCase().replaceAll(' ', '-')}`} key={label} className={cn('group flex items-center justify-between gap-3 rounded-xl border border-blue-900/10 bg-[#f6f9ff]/70 px-4 py-4 text-xs font-bold uppercase tracking-[.08em] text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-500/50', highlight && 'border-cyan-500/40 bg-gradient-to-r from-cyan-100/80 to-blue-100/80 text-blue-900')}><span className="flex items-center gap-3"><Icon size={18} className="text-blue-600" />{label}</span><ArrowUpRight size={16} className="text-blue-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>)}</div></section>;
}

function ImportantDates() {
  const dates = [
    ['Call for full paper', '[01 April 2026]'], ['Last date of submission', '[15 June 2026]'], ['Acceptance notification', '[30 July 2026]'], ['Camera-ready submission', '[20 August 2026]'], ['Registration begins', '[01 August 2026]'], ['Registration ends', '[05 September 2026]'], ['Conference dates', '14 – 16 October 2026'],
  ];
  return <section className="pattern-neural section-dark px-5 py-24 lg:px-10"><div className="mx-auto max-w-[1440px]"><SectionHeading eyebrow="Keep the signal moving" title="Important dates" dark>Mark the moments that move a good idea from first draft to shared result.</SectionHeading><div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{dates.map(([label, date], index) => <article key={label} data-testid={`card-important-date-${index}`} className="pattern-hex card-lift rounded-2xl border border-cyan-300/25 p-5"><CalendarDays className="mb-8 text-cyan-300" size={22} /><p className="text-sm font-bold text-slate-100">{label}</p><p className="mt-3 font-mono-brand text-xs text-cyan-100/75">{date}</p>{index === 1 && <p className="mt-1 text-[10px] text-slate-400 line-through">[01 June 2026]</p>}</article>)}</div></div></section>;
}

function SpeakerCards() {
  const speakers = [
    {
      name: 'Prof. Kaushik Dutta',
      affiliation:
        'Interim Director, School of Information Systems and Management, University of South Florida',
         image: '/speaker1.jpg',
    },
    {
      name: 'Prof. Ashish Ghosh',
      affiliation: 'ISI Kolkata (Present Director IIIT Bhubaneswar)',
      image: '/speaker2.jfif',
    },
    {
      name: 'Prof. Sudan Jha',
      affiliation:
        'Department of Computer Science & Engineering, Kathmandu University, Nepal',
        image: '/speaker3.jfif',
    },
  ];

return (
  <section className="pattern-grid px-5 py-24 lg:px-10">
    <div className="mx-auto max-w-[1440px]">
      <SectionHeading
        eyebrow="People worth making time for"
        title="Keynote & invited speakers"
        children="A first look at the voices shaping this year’s conversation. Full biographies and portraits will be added soon."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {speakers.map((speaker, index) => (
          <article
            key={`${speaker.name}-${index}`}
            data-testid={`card-speaker-${index}`}
            className="card-lift rounded-2xl border border-blue-900/10 bg-[#f7faff]/70 p-4"
          >
            <div className="flex aspect-square w-full items-center justify-center overflow-hidden">
              <img
                src={speaker.image}
                alt={speaker.name}
                className="h-full w-full object-contain"
              />
            </div>

            <h3 className="mt-5 font-display text-xl font-semibold">
              {speaker.name}
            </h3>

            <p className="mt-2 font-mono-brand text-[10px] uppercase leading-5 tracking-[.08em] text-blue-700">
              {speaker.affiliation}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
}

function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const labels = ['Opening keynote', 'Networked minds', 'Workshop hour', 'Lab conversations', 'The auditorium', 'Poster exchange', 'A shared table', 'Closing reflections', 'City after dark', 'Previous edition'];
  return <section className="pattern-hex section-dark px-5 py-24 lg:px-10"><div className="mx-auto max-w-[1440px]"><SectionHeading eyebrow="A decade of ideas, in frames" title="Glimpses of previous editions" dark /><div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5">{labels.map((label, index) => <button type="button" key={label} data-testid={`button-gallery-${index}`} onClick={() => setSelected(index)} className={cn('group relative aspect-[4/3] overflow-hidden rounded-xl border border-cyan-200/20 text-left', index % 3 === 0 ? 'bg-gradient-to-br from-cyan-400/60 via-blue-700 to-[#10103b]' : index % 3 === 1 ? 'bg-gradient-to-br from-violet-500/50 via-blue-800 to-[#07152f]' : 'bg-gradient-to-br from-sky-300/60 via-cyan-800 to-[#08213f]')}><span className="absolute inset-0 opacity-45 [background-image:radial-gradient(rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:13px_13px]" /><span className="absolute bottom-0 left-0 right-0 translate-y-1 bg-gradient-to-t from-[#050b1f] p-3 pt-10 text-[10px] font-bold uppercase tracking-[.1em] text-slate-100 transition-transform group-hover:translate-y-0">{label}</span></button>)}</div></div>{selected !== null && <div role="dialog" aria-modal="true" aria-label="Gallery preview" className="fixed inset-0 z-50 flex items-center justify-center bg-[#050b1f]/90 p-5" onClick={() => setSelected(null)}><div className={cn('relative aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-2xl border border-cyan-300/40', selected % 3 === 0 ? 'bg-gradient-to-br from-cyan-400/60 via-blue-700 to-[#10103b]' : selected % 3 === 1 ? 'bg-gradient-to-br from-violet-500/50 via-blue-800 to-[#07152f]' : 'bg-gradient-to-br from-sky-300/60 via-cyan-800 to-[#08213f]')} onClick={(event) => event.stopPropagation()}><span className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:15px_15px]" /><div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#050b1f] p-6 pt-24"><p className="eyebrow text-cyan-300">Previous edition / {String(selected + 1).padStart(2, '0')}</p><h3 className="mt-2 font-display text-3xl text-slate-50">{labels[selected]}</h3></div><button type="button" aria-label="Close gallery preview" data-testid="button-close-gallery" onClick={() => setSelected(null)} className="absolute right-4 top-4 rounded-full border border-slate-200/40 bg-slate-950/50 p-2 text-slate-100"><X size={18} /></button></div></div>}</section>;
}

function Footer() {
  return (
    <footer
      id="contact"
      className="pattern-mesh section-dark wave-edge px-5 pb-8 pt-20 lg:px-10"
    >
      <div className="mx-auto max-w-[1440px]">

        <div className="grid gap-10 border-b border-cyan-200/15 pb-12 md:grid-cols-[1.3fr_.8fr_.8fr]">

          {/* CONTACT */}
          <div>
            <p className="eyebrow text-cyan-300">
              Contact the organising desk
            </p>

            <h2 className="mt-3 max-w-sm font-display text-4xl font-semibold">
              Good research starts with a door left open.
            </h2>

            {/* CONTACT DETAILS */}
            <div className="mt-6 grid gap-6 text-sm text-slate-300 sm:grid-cols-2">

              {/* FIRST CONTACT - CSE */}
              <div className="grid gap-2">
                <p className="font-semibold text-cyan-200">
                  CSE Department, NIT Silchar
                </p>

                <p className="flex gap-3">
                  <Building2
                    size={17}
                    className="mt-0.5 shrink-0 text-cyan-300"
                  />
                  CSE Department, NIT Silchar
                </p>

                <p className="flex gap-3">
                  <MapPin
                    size={17}
                    className="mt-0.5 shrink-0 text-cyan-300"
                  />
                  NIT SILCHAR, SILCHAR, INDIA
                </p>

                <p className="flex gap-3">
                  <Mail
                    size={17}
                    className="mt-0.5 shrink-0 text-cyan-300"
                  />
                  <a
                    href="mailto:saroj@cse.nits.ac.in"
                    className="hover:text-cyan-200"
                  >
                    saroj@cse.nits.ac.in
                  </a>
                </p>
              </div>

              {/* SECOND CONTACT - ECE */}
              <div className="grid gap-2">
                <p className="font-semibold text-cyan-200">
                  ECE Department, NIT Silchar
                </p>

                <p className="flex gap-3">
                  <Building2
                    size={17}
                    className="mt-0.5 shrink-0 text-cyan-300"
                  />
                  ECE Department, NIT Silchar
                </p>

                <p className="flex gap-3">
                  <MapPin
                    size={17}
                    className="mt-0.5 shrink-0 text-cyan-300"
                  />
                  NIT SILCHAR, SILCHAR, INDIA
                </p>

                <p className="flex gap-3">
                  <Mail
                    size={17}
                    className="mt-0.5 shrink-0 text-cyan-300"
                  />
                  <a
                    href="mailto:banani@ece.nits.ac.in"
                    className="hover:text-cyan-200"
                  >
                    banani@ece.nits.ac.in
                  </a>
                </p>
              </div>

            </div>
          </div>

          {/* ORGANIZER */}
          <div>
            <p className="eyebrow text-cyan-300">
              Organizer
            </p>

            <h3 className="mt-4 font-display text-xl">
              Centre for AI and ML for Applications, NIT Silchar
            </h3>

            <a
              href="https://www.nits.ac.in/"
              data-testid="link-organizer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-cyan-200 hover:text-cyan-100"
            >
              Visit organizer
              <ExternalLink size={14} />
            </a>
          </div>

          {/* PUBLICATION PARTNER */}
          <div>
            <p className="eyebrow text-cyan-300">
              Publication partner
            </p>

            <div className="mt-4 flex h-20 items-center rounded-xl border border-cyan-200/20 bg-slate-950/20 px-5 font-display text-2xl font-bold tracking-tight text-slate-200">
              Procedia Computer Science
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-400">
              Proceedings series Volume to be announced, subject to final editorial checks.
            </p>
          </div>

        </div>

        {/* FOOTER BOTTOM */}
        <div className="flex flex-col justify-between gap-4 pt-7 text-xs text-slate-400 md:flex-row">

          <p>
            © 2027 [I-AM-ComCyS 2027] · NIT SILCHAR. Built for ideas with somewhere to go.
          </p>

          <a
            href="#top"
            data-testid="link-back-to-top"
            className="inline-flex items-center gap-2 text-cyan-200 hover:text-cyan-100"
          >
            Back to top
            <ArrowUpRight size={14} />
          </a>

        </div>
      </div>
    </footer>
  );
}

function PageShell({ children, pageLabel, compact = true }: { children: ReactNode; pageLabel?: string; compact?: boolean }) {
  return <div id="top" className="site-shell min-h-[100dvh]"><Header /><main><HeroSlider compact={compact} pageLabel={pageLabel} />{children}</main><Footer /></div>;
}

function Home() {
  usePageMeta('International Conference on AI & Computing', 'I-AM COMSYS 2027 brings together research across artificial intelligence, computing, IoT and data analytics.');
  return <PageShell compact={false}><AnnouncementRow /><section className="pattern-grid px-5 py-24 lg:px-10"><div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[1fr_.65fr]"><div><SectionHeading eyebrow="Welcome to I-AM-ComCyS 2027" title="A sharper conversation about intelligent systems." children="I-AM-ComCyS 2027 is an international meeting point for researchers, practitioners and curious minds working where computation touches the world. Bring a paper, a prototype, a question or a perspective that deserves a wider room." /><p className="mt-7 border-l-2 border-blue-600 pl-5 font-display text-xl italic text-blue-900">Conference theme: International Conference on AI and ML for Computing and Cyber Security</p><p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">Across three days, multiple tracks and one generous community, we will examine the systems that make tomorrow more capable, responsible and human-centred.</p><Link href="/call-for-papers" data-testid="link-home-explore-tracks" className="mt-8 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-blue-700 hover:text-cyan-700">Explore the tracks <ArrowRight size={16} /></Link></div><div className="pattern-mesh relative min-h-[380px] overflow-hidden rounded-[2rem] border border-blue-900/15 p-8 shadow-2xl shadow-blue-900/10"><div className="absolute -right-16 -top-14 h-56 w-56 rounded-full border border-cyan-200/30" /><div className="absolute bottom-8 left-8 h-28 w-28 rounded-full border border-violet-300/20" /><div className="relative flex min-h-[315px] flex-col justify-between"><div className="font-mono-brand text-xs uppercase tracking-[.18em] text-cyan-200">NIT SILCHAR</div><div><div className="font-display text-7xl font-semibold tracking-[-.09em] text-slate-50 md:text-3xl">I-AM-ComCyS <span className="text-cyan-300">/</span> 2027</div><p className="mt-3 max-w-xs text-sm leading-6 text-slate-300">An event of "Centre for AI and ML for Applications", NIT Silchar</p></div><div className="flex items-center justify-between border-t border-cyan-200/20 pt-4 font-mono-brand text-[10px] uppercase tracking-[.12em] text-cyan-100/70"><span>Computing and CyberSecurity</span><span>16-18 / 09 / 27</span></div></div></div></div></section><section className="pattern-mesh wave-edge section-dark px-5 pb-24 pt-20 lg:px-10"><div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 md:flex-row md:items-end"><div className="max-w-2xl"><SectionHeading eyebrow="Make the venue part of the story" title="Venue: NIT Silchar" dark children="NIT Silchar welcomes the conference to Silchar, a place where research, design and everyday life have a habit of crossing paths." /></div><a href="https://www.nits.ac.in/" data-testid="link-more-about-institute" className="button-pattern rounded-lg px-5 py-3 text-xs font-extrabold uppercase tracking-[.13em]">More about NIT <ArrowUpRight className="ml-1 inline" size={14} /></a></div></section><section className="pattern-dots px-5 py-24 lg:px-10"><div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[.7fr_1.3fr]"><SectionHeading eyebrow="What is moving" title="Updates" children="A small, useful stream of things to know as the programme takes shape." /><div className="grid gap-3">{['[12 March 2026] · Proceedings inclusion has been approved by [Publisher].', '[24 February 2026] · Special session proposals are now invited.', '[08 January 2026] · The first call for papers is now live.'].map((item, index) => <Link href={index === 1 ? '/special-sessions' : '/call-for-papers'} data-testid={`link-update-${index}`} key={item} className="group flex items-center justify-between gap-6 border-b border-blue-900/15 py-5 text-sm text-slate-700 hover:text-blue-700"><span>{item}</span><ArrowRight className="shrink-0 text-blue-600 transition-transform group-hover:translate-x-1" size={17} /></Link>)}</div></div></section><ImportantDates /><SpeakerCards /><section className="pattern-circuit section-dark px-5 py-24 lg:px-10"><div className="mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-[.85fr_1.15fr]"><div><SectionHeading eyebrow="A record that travels" title="Conference Proceedings published in Procedia Computer Science by Elsevier" dark children="Approved proceedings inclusion gives accepted work a clear next step: discoverable, citable and ready to join the broader conversation." /><span className="mt-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-xs font-bold text-cyan-200"><ShieldCheck size={15} /> Publisher series approved</span></div><div className="pattern-hex mx-auto flex aspect-[3/4] w-full max-w-sm items-end rounded-2xl border border-cyan-200/30 p-7 shadow-2xl shadow-cyan-900/30"><div><BookOpen size={34} className="text-cyan-300" /><p className="mt-12 font-mono-brand text-[10px] uppercase tracking-[.18em] text-cyan-200">Proceedings / Volume to be announced</p><h3 className="mt-3 font-display text-4xl font-semibold text-slate-50">The future is a shared result.</h3><p className="mt-4 text-sm text-slate-300">Procedia Computer Science. Volume to be announced</p></div></div></div></section><section className="pattern-waves px-5 py-24 lg:px-10"><div className="mx-auto max-w-[1440px]"><SectionHeading eyebrow="Publication, without the fog" title="Proceedings publication" children="Accepted papers will be considered for publication through [Publisher / Series], subject to quality checks and the publisher’s final editorial process. There is no additional charge for non-open-access publication. Abstracts and short papers under four pages are not considered." /><a href="#" data-testid="link-publisher-series" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-blue-700 hover:text-cyan-700">Explore the publisher series <ExternalLink size={15} /></a><div className="mt-12 grid gap-5 md:grid-cols-3">{['[Previous edition] · Volume [X]', '[Previous edition] · Volume [X]', '[Previous edition] · Volume [X]'].map((title, index) => <a href="#" data-testid={`link-previous-proceedings-${index}`} key={title + index} className="card-lift group rounded-2xl border border-blue-900/10 bg-[#f6f9ff]/75 p-5"><div className="pattern-mesh flex aspect-[4/3] items-end rounded-xl p-5 text-slate-50"><span className="font-mono-brand text-[10px] uppercase tracking-[.14em]">Proceedings {String(index + 1).padStart(2, '0')}</span></div><div className="mt-4 flex items-center justify-between text-sm font-bold text-slate-800"><span>{title}</span><ArrowUpRight size={16} className="text-blue-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div></a>)}</div></div></section><section className="pattern-grid px-5 py-24 lg:px-10"><div className="mx-auto max-w-[1440px]"><SectionHeading eyebrow="More context, more connection" title="Three ways into the conference" />
 <div className="mt-10 grid gap-5 lg:grid-cols-3">
  {[
    [
      'About NIT Silchar',
      'A place for ambitious questions and patient work.',
      '/nit-silchar.png'
    ],
    [
      'About CSE Department',
      'The people and practices behind this year’s programme.',
      '/cse-department.jpg'
    ],
    [
      'About Silchar',
      'A city-sized invitation to keep the conversation going.',
      '/silchar.jfif'
    ]
  ].map(([title, text, image], index) => (
    <article
      key={title}
      className="card-lift overflow-hidden rounded-2xl border border-blue-900/10 bg-[#f7faff]/70"
    >
      <div className="h-32 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="font-display text-2xl font-semibold">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          {text}
        </p>

        <a
          href="#"
          data-testid={`link-about-${index}`}
          className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.12em] text-blue-700"
        >
          More about {title.replace('About ', '')}
          <ArrowRight size={15} />
        </a>
      </div>
    </article>
  ))}
</div>
  </div></section><Gallery /></PageShell>;
}

const committeeRoles: Array<[string, string[]]> = [
  ['Patron', [
    'Prof. Dilip Kumar Baidya · Director, NIT Silchar, India'
  ]],

  ['Organizing Chairs', [
    'Dr. Banani Basu · NIT Silchar, India',
    'Dr. Jupita Hazarika · NIT Silchar, India',
    'Dr. Atanu Sahoo · NIT Silchar, India',
    'Dr. Ramanujam E · NIT Silchar, India',
    'Dr. Biswarup Ganguly · NIT Silchar, India'
  ]],

  ['General Chairs', [
    'Prof. Alexandre E Escargueil · Sorbonne University, France',
    'Prof. Ashish Ghosh · ISI Kolkata, India',
    'Prof. Ivana Budinska · SAS, Slovakia',
    'Dr. Rahul Gourav, Scientist,  Sorbonne University, France ',
    'Dr. S K Biswas · NIT Silchar, India'
  ]],

  ['Organizing Secretary', [
    'Dr. Malaya Dutta Borah · NIT Silchar, India',
    'Dr. Badal Soni · NIT Silchar, India',
    'Dr. Sugnya Devi K · NIT Silchar, India',
    'Dr. Dilip Kumar Ghosh'
  ]],

  ['Convener', [
    'Dr. Kedar Nath Das · NIT Silchar, India',
    'Dr. Partha Pakray · NIT Silchar, India',
    'Dr. Arnab Nandi · NIT Silchar, India',
    'Dr. Nabanita Adhikary · NIT Silchar, India'
  ]],

  ['Publication Chairs', [
    'Dr. Sudarshan Sahoo · NIT Silchar, India',
    'Dr. Malaya Dutta Borah · NIT Silchar, India',
    'Dr. Ramanujam E · NIT Silchar, India'
  ]],

  ['Co-Convener', [
    'Dr. Aparajita Dutta · NIT Silchar, India',
    'Dr. Debbrota Paul Chowdhury · NIT Silchar, India'
  ]],

  ['Publicity Chairs', [
    'Dr. Dalton Meitei T · Manipur University',
    'Dr. Murugan R · NIT Pondicherry, India',
    'Dr. Biswarup Ganguly · NIT Silchar, India',
    'Dr. Jupita Hazarika · NIT Silchar, India',
    'Dr. Rajarshi Pramanik · NIT Silchar, India'
  ]],

  ['Hospitality Chairs', [
    'Dr. Malaya Dutta Borah · NIT Silchar, India',
    'Dr. Jupitara Hazarika · NIT Silchar, India'
  ]],

  ['Finance Chairs', [
    'Dr. Malaya Dutta Borah · NIT Silchar, India',
    'Dr. Debbrota Paul Chowdhury · NIT Silchar, India'
  ]],

  ['Website Management Chairs', [
    'Dr. Partha Pakray · NIT Silchar, India',
    'Dr. Ripon Patgiri · NIT Silchar, India',
    'Dr. Ramanujam E · NIT Silchar, India'
  ]],
];

function Committee() {
  usePageMeta('Organizing Committee', 'Meet the chairs, advisors and technical programme committee for CONF 2026.');
  const [filter, setFilter] = useState('');
  const technical = [
  'Dr. Sangram Ray · NIT Sikkim',
  'Dr. Deepanjal Shrestha · Associate Professor and Director of the International Relations Center at Pokhara University, Nepal',
  'Dr. Badal Soni · NIT Silchar',
  'Dr. Malaya Dutta Borah · NIT Silchar'
];
  const filtered = technical.filter((member) => member.toLowerCase().includes(filter.toLowerCase()));
  return <PageShell pageLabel="People behind the programme"><section className="pattern-grid px-5 py-24 lg:px-10"><div className="mx-auto max-w-[1120px]"><SectionHeading eyebrow="The people behind the programme" title="Organizing committee" children="A distributed team of researchers, hosts and detail-people making room for meaningful exchange." /><div className="mt-12 grid gap-5 md:grid-cols-2">{committeeRoles.map(([role, people], index) => <article key={role} data-testid={`card-committee-role-${index}`} className="card-lift overflow-hidden rounded-2xl border border-blue-900/10 bg-[#f7faff]/75"><div className="pattern-hex border-b border-cyan-300/20 px-5 py-3"><h2 className="font-mono-brand text-xs font-bold uppercase tracking-[.15em] text-cyan-100">{role}</h2></div><div className="grid gap-3 p-5">{(people as string[]).map((person, personIndex) => <p key={`${person}-${personIndex}`} className="flex items-start gap-3 text-sm text-slate-700"><Users size={15} className="mt-0.5 shrink-0 text-blue-600" />{person}</p>)}</div></article>)}</div>
 {/* ADVISORY COMMITTEE */}
<div className="mt-24">
  <p className="section-kicker">
    Guidance, experience, perspective
  </p>

  <h2 className="mt-3 font-display text-4xl font-semibold">
    Advisory committee
  </h2>

  <div className="pattern-mesh mt-7 grid gap-3 rounded-2xl border border-cyan-300/20 p-6 text-sm text-slate-200 md:grid-cols-2">
    {[
      'Prof. P. N. Suganthan · Qatar University, Qatar',
      'Prof. Kusum Deep · IIT Roorkee, India',
      'Prof. Kalyanmoy Deb · Michigan University, USA',
      'Prof. Nischal Kumar Verma · IIT Kanpur, India',
      'Prof. Ivana Budinska · SAS, Slovakia',
      'Prof. Atulya Nagar · Liverpool Hope University, UK',
      'Prof. R. Balasubramanian · IIT Roorkee, India',
      'Prof. Ashish Ghosh · ISI Kolkata (Present Director, IIIT Bhubaneswar)',
      'Prof. Chittaranjan Mandal · IIT Kharagpur',
      'Prof. Animesh Mukherjee · IIT Kharagpur',
      'Prof. Asit Kumar Das · IIEST Shibpur',
      'Prof. Rajiv Mishra · IIT Patna',
      'Prof. Tandra Pal · NIT Durgapur',
      'Prof. Sushmita Ghosh · Jadavpur University',
      'Prof. Kaushik Dutta · Interim Director, School of Information Systems and Management, University of South Florida',
      'Prof. Hans-Peters Kaul · BOKU University, Austria'
    ].map((person, personIndex) => (
      <p
        key={`${person}-${personIndex}`}
        className="border-b border-cyan-200/15 pb-3"
      >
        {person}
      </p>
    ))}
  </div>
</div>
{/* GUEST EDITORS */}
<div className="mt-24">
  <p className="section-kicker">
    Curating quality, shaping scholarly contributions
  </p>

  <h2 className="mt-3 font-display text-4xl font-semibold">
    Guest Editors
  </h2>

  <div className="pattern-mesh mt-7 grid gap-3 rounded-2xl border border-cyan-300/20 p-6 text-sm text-slate-200 md:grid-cols-2">
    {[
      'Prof. Sudan Jha · Kathmandu University, Nepal',
      'Prof. Evizal Abdul Kadir · Universitas Islam Riau (UIR), Indonesia',
      'Dr. Saroj Kr Biswas · NIT Silchar',
      'Dr. Kedar Nath Das · NIT Silchar'
    ].map((person, personIndex) => (
      <p
        key={`${person}-${personIndex}`}
        className="border-b border-cyan-200/15 pb-3"
      >
        {person}
      </p>
    ))}
  </div>
</div>
  <div className="mt-24"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="section-kicker">A broad technical lens</p><h2 className="mt-3 font-display text-4xl font-semibold">Technical program committee</h2></div><div className="relative"><Filter className="absolute left-3 top-3.5 text-blue-600" size={16} /><label className="sr-only" htmlFor="committee-filter">Filter committee</label><input id="committee-filter" data-testid="input-committee-filter" value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="Filter by name or institute" className="w-full rounded-lg border border-blue-900/15 bg-[#f7faff]/80 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 md:w-72" /></div></div><div className="mt-7 grid gap-2 md:grid-cols-2">{filtered.map((member, index) => <div key={`${member}-${index}`} data-testid={`text-technical-member-${index}`} className="rounded-lg border border-blue-900/10 bg-[#f7faff]/70 px-4 py-3 text-sm text-slate-700">{member}</div>)}</div>{filtered.length === 0 && <p className="mt-6 rounded-lg border border-dashed border-blue-900/20 p-6 text-sm text-slate-600">No committee members match that filter.</p>}</div></div></section></PageShell>;
}

const tracks = [
  { title: 'Artificial Intelligence and Machine Learning (AI/ML)', pattern: 'pattern-neural', topics: [
  'Will be Updated Soon!!!'
]},
{ title: 'Advanced Artificial Intelligence and Emerging Technologies in Applications', pattern: 'pattern-neural', topics: [
  'Will be Updated Soon!!!'
]},
  { title: 'AI-Enabled Solutions for Network Systems and Cybersecurity in Applications', pattern: 'pattern-neural', topics: [
  'Will be Updated Soon!!!'
]},
{ title: 'Intelligent Systems in Practice', pattern: 'pattern-neural', topics: [
  'Will be Updated Soon!!!'
]},
{ title: '5G Communication ', pattern: 'pattern-neural', topics: [
  'Will be Updated Soon!!!'
]},
{ title: 'Signal Processing ', pattern: 'pattern-neural', topics: [
  'Will be Updated Soon!!!'
]},
{ title: 'Electrical Power, Energy and Drives System', pattern: 'pattern-neural', topics: [
  'Will be Updated Soon!!!'
]},
{ title: 'Control and Instrumentation', pattern: 'pattern-neural', topics: [
  'Will be Updated Soon!!!'
]},
{ title: 'Biomedical', pattern: 'pattern-neural', topics: [
  'Will be Updated Soon!!!'
]},
{ title: 'Renewable Energy ', pattern: 'pattern-neural', topics: [
  'Will be Updated Soon!!!'
]},
{ title: 'Optimization in AI and ML', pattern: 'pattern-neural', topics: [
  'Will be Updated Soon!!!'
]},
{ title: 'Optimization in AI and ML', pattern: 'pattern-neural', topics: [
  'Will be Updated Soon!!!'
]},
{ title: 'AI and ML in Structural and Geotechnical Engineering', pattern: 'pattern-neural', topics: [
  'Will be Updated Soon!!!'
]},
{ title: 'Application of AI and ML in Water Resources and Environmental Engineering', pattern: 'pattern-neural', topics: [
  'Will be Updated Soon!!!'
  
]},
];

function CallForPapers() {
  usePageMeta('Call for Papers', 'Explore the multiple research tracks and submit original work to I-AM-COMSYS 2027.');
  return <PageShell pageLabel="The invitation to contribute"><section className="pattern-waves px-5 py-20 lg:px-10"><div className="mx-auto max-w-[1120px]"><div className="flex flex-wrap gap-3"><a href="#" download data-testid="link-download-brochure" className="button-pattern rounded-lg px-5 py-3 text-xs font-extrabold uppercase tracking-[.12em]"><Download className="mr-2 inline" size={15} />Download brochure</a><Link href="/submission" data-testid="link-submission-guidelines" className="rounded-lg border border-blue-900/20 bg-[#f7faff]/70 px-5 py-3 text-xs font-extrabold uppercase tracking-[.12em] text-blue-800">Submission guidelines <ArrowRight className="ml-1 inline" size={15} /></Link></div><div className="mt-14"><SectionHeading eyebrow="Call for papers" title="Bring the hard question." children="We invite original research, applied studies and thoughtful provocations across the systems that make intelligence useful. Choose a track, find your edge and send us work with somewhere to go." /></div><div className="mt-16"><p className="section-kicker">Multiple connected lenses</p><h2 className="mt-3 font-display text-4xl font-semibold">Conference tracks</h2><div className="mt-8 grid gap-5 md:grid-cols-2">{tracks.map((track, index) => <article key={track.title} data-testid={`card-track-${index}`} className="card-lift h-[500px] overflow-hidden rounded-2xl border border-blue-900/10 bg-[#f7faff]/70"><div className={cn('h-[220px] p-6', track.pattern)}><div className="flex items-center justify-between text-cyan-100"><span className="font-mono-brand text-[10px] uppercase tracking-[.16em]">Track {index + 1}</span><ArrowDownRight size={19} /></div><h3 className="mt-8 font-display text-3xl font-semibold text-slate-50">{track.title}</h3></div><ul className="grid gap-2 p-6 sm:grid-cols-2">{track.topics.map((topic) => <li key={topic} className="flex items-start gap-2 text-sm text-slate-700"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />{topic}</li>)}</ul></article>)}</div></div><div className="mt-20 grid gap-5 md:grid-cols-2"><article className="pattern-mesh rounded-2xl border border-cyan-300/25 p-7 text-slate-50"><Award className="text-cyan-300" size={24} /><h2 className="mt-8 font-display text-3xl font-semibold">Best paper awards</h2><p className="mt-3 text-sm leading-7 text-slate-300">One award per track, selected by the technical programme committee for originality, clarity and potential to travel beyond the room.</p></article><article className="pattern-circuit rounded-2xl border border-cyan-300/20 p-7 text-slate-50"><Sparkles className="text-cyan-300" size={24} /><h2 className="mt-8 font-display text-3xl font-semibold">Call for special session</h2><p className="mt-3 text-sm leading-7 text-slate-300">Propose a focused conversation on an emerging topic. Send a short rationale and organiser details to [email].</p><Link href="/special-sessions" data-testid="link-special-session-call" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.13em] text-cyan-200">See special sessions <ArrowRight size={15} /></Link></article></div></div></section></PageShell>;
}

function Submission() {
  usePageMeta('Manuscript Submission', 'Submission guidelines, templates and the camera-ready checklist for CONF 2026 authors.');
  const [checked, setChecked] = useState<boolean[]>(Array.from({ length: 13 }, () => false));
  const checklist = ['Author names and affiliations are consistent', 'Paper is written in English', 'Manuscript uses the approved template', 'Paper is between 10 and 12 pages', 'All figures are legible in print', 'References are complete and formatted', 'Plagiarism check has been completed', 'Anonymisation requirements are met', 'Copyright and consent form is ready', 'Final PDF has been proofread', 'Supplementary files are clearly named', 'Submission link has been tested', 'All co-authors have approved the final version'];
  return <PageShell pageLabel="From draft to review"><section className="pattern-dots px-5 py-20 lg:px-10"><div className="mx-auto max-w-[1120px]"><SectionHeading eyebrow="Manuscript submission" title="Make the work easy to review." children="The clearest submission respects the reader’s attention. Use the guidance below, then send your work through the review system." /><div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_.9fr]"><div><SectionHeading eyebrow="01 / Before you send" title="Submission guidelines" /><ol className="mt-7 grid gap-4">{['All manuscripts must be written in English and present original work.', 'Submissions will undergo peer review; do not submit work under active review elsewhere.', 'Manuscripts should be 10 to 12 pages using the approved conference template.', 'Every submission is subject to plagiarism and originality checks.', 'Submission is accepted only through the review system linked below.'].map((item, index) => <li key={item} className="flex gap-4 rounded-xl border border-blue-900/10 bg-[#f7faff]/70 p-4 text-sm leading-6 text-slate-700"><span className="font-mono-brand text-xs text-blue-700">0{index + 1}</span>{item}</li>)}</ol><a href="#" data-testid="link-submission-system" className="button-pattern mt-7 inline-block rounded-lg px-5 py-3 text-xs font-extrabold uppercase tracking-[.13em]">Submission link <ExternalLink className="ml-1 inline" size={14} /></a></div><div className="pattern-circuit rounded-2xl border border-cyan-300/20 p-7 text-slate-50"><FileText size={25} className="text-cyan-300" /><h2 className="mt-8 font-display text-3xl font-semibold">Manuscript templates</h2><p className="mt-3 text-sm leading-6 text-slate-300">Choose the format that lets you focus on the argument, not the formatting.</p><div className="mt-7 grid gap-3"><a href="#" download data-testid="link-word-template" className="flex items-center justify-between rounded-lg border border-cyan-200/20 bg-slate-950/20 px-4 py-3 text-sm text-cyan-100 hover:border-cyan-200"><span>Word template</span><Download size={15} /></a><a href="#" download data-testid="link-latex-template" className="flex items-center justify-between rounded-lg border border-cyan-200/20 bg-slate-950/20 px-4 py-3 text-sm text-cyan-100 hover:border-cyan-200"><span>LaTeX template</span><Download size={15} /></a><a href="#" download data-testid="link-consent-form" className="flex items-center justify-between rounded-lg border border-cyan-200/20 bg-slate-950/20 px-4 py-3 text-sm text-cyan-100 hover:border-cyan-200"><span>Consent to publish form</span><Download size={15} /></a></div></div></div></div></section><section className="pattern-circuit section-dark px-5 py-24 lg:px-10"><div className="mx-auto max-w-[1120px]"><div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr]"><div><SectionHeading eyebrow="02 / After acceptance" title="Camera-ready submission" dark children="Acceptance is a beginning, not a finish line. Keep the final file clean, complete and ready for the proceedings workflow." /><a href="#" data-testid="link-camera-ready" className="button-pattern mt-7 inline-block rounded-lg px-5 py-3 text-xs font-extrabold uppercase tracking-[.13em]">Camera-ready submission link <ExternalLink className="ml-1 inline" size={14} /></a></div><div><ol className="grid gap-4">{['Use the final conference template and incorporate reviewer recommendations.', 'Include the signed consent to publish form with the final manuscript.', 'Run one final plagiarism check and verify all metadata.', 'Upload the final PDF and source files before [Camera-ready date].'].map((item, index) => <li key={item} className="flex gap-4 rounded-xl border border-cyan-200/15 bg-slate-950/15 p-4 text-sm leading-6 text-slate-300"><span className="font-mono-brand text-xs text-cyan-300">0{index + 1}</span>{item}</li>)}</ol></div></div><div className="mt-20 grid gap-8 lg:grid-cols-[.75fr_1.25fr]"><div><p className="eyebrow text-cyan-300">File discipline</p><h2 className="mt-3 font-display text-3xl font-semibold">Camera-ready files naming</h2><p className="mt-4 text-sm leading-7 text-slate-300">Use the following naming convention for a clean editorial handoff:</p><code className="mt-5 block rounded-lg border border-cyan-200/20 bg-slate-950/30 p-4 font-mono-brand text-xs text-cyan-200">CONF26_Track##_Surname_FirstAuthor.pdf</code></div><div className="pattern-hex rounded-2xl border border-cyan-200/20 p-6"><p className="font-mono-brand text-[10px] uppercase tracking-[.15em] text-cyan-200">Example / upload preview</p><div className="mt-5 flex min-h-28 items-center justify-center rounded-lg border border-dashed border-cyan-200/30 text-sm text-slate-300">[Screenshot placeholder]</div></div></div></div></section><section className="pattern-grid px-5 py-24 lg:px-10"><div className="mx-auto max-w-[1120px]"><SectionHeading eyebrow="A final quiet pass" title="Camera-ready submission checklist" children="Tick each item as you work. Your progress stays in this session while you move through the page." /><div className="mt-10 grid gap-2 md:grid-cols-2">{checklist.map((item, index) => <label key={item} data-testid={`label-checklist-${index}`} className={cn('flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm transition', checked[index] ? 'border-cyan-500/50 bg-cyan-100/50 text-blue-900' : 'border-blue-900/10 bg-[#f7faff]/70 text-slate-700')}><input type="checkbox" data-testid={`input-checklist-${index}`} checked={checked[index]} onChange={() => setChecked((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))} className="sr-only" /><span className={cn('mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border', checked[index] ? 'border-cyan-600 bg-cyan-500 text-[#05102c]' : 'border-blue-900/25')}>{checked[index] && <Check size={14} />}</span>{item}</label>)}</div><p className="mt-6 font-mono-brand text-xs text-blue-700">{checked.filter(Boolean).length} / 13 checks complete</p></div></section></PageShell>;
}

const sessions = [
  { number: 'SS01', title: '[Special Session Title]', motivation: '[Why this focused research conversation matters now. Replace this paragraph with the session motivation and need.]', topics: ['[Emerging topic]', '[Method or application area]', '[Open problem]', '[Responsible practice]'], organizer: '[Organizer Name] · [Designation], [Department], [Institute], [Address]', email: '[email]', link: '[Submission link]' },
  { number: 'SS02', title: '[Special Session Title]', motivation: '[A second invitation for a tightly scoped conversation across disciplines, methods and communities.]', topics: ['[Topic area]', '[Topic area]', '[Topic area]', '[Topic area]'], organizer: '[Organizer Name] · [Designation], [Department], [Institute], [Address]', email: '[email]', link: '[Submission link]' },
];

function SpecialSessions() {
  usePageMeta('Special Sessions', 'Focused research tracks on emerging topics at CONF 2026.');
  return <PageShell pageLabel="Focused research tracks"><section className="pattern-waves px-5 py-24 lg:px-10"><div className="mx-auto max-w-[1120px]"><SectionHeading eyebrow="Beyond the main tracks" title="Special sessions" children="Focused research tracks on emerging topics. Each session is a smaller room inside the larger conversation—specific enough to go deep, open enough to make a new connection." /><div className="mt-12 grid gap-7">{sessions.map((session) => <article key={session.number} data-testid={`card-special-session-${session.number}`} className="overflow-hidden rounded-2xl border border-blue-900/10 bg-[#f7faff]/75 shadow-lg shadow-blue-900/5"><div className="pattern-hex flex flex-col justify-between gap-5 border-b border-cyan-300/20 p-7 md:flex-row md:items-end"><div><p className="font-mono-brand text-xs tracking-[.17em] text-cyan-100">{session.number} / SPECIAL SESSION</p><h2 className="mt-4 font-display text-3xl font-semibold text-slate-50 md:text-4xl">{session.title}</h2></div><span className="rounded-full border border-cyan-200/30 px-3 py-1.5 font-mono-brand text-[10px] uppercase tracking-[.13em] text-cyan-100">Accepting proposals</span></div><div className="grid gap-10 p-7 lg:grid-cols-[1.15fr_.85fr]"><div><h3 className="font-display text-xl font-semibold">Motivation and need for the special session</h3><p className="mt-3 text-sm leading-7 text-slate-600">{session.motivation}</p><h3 className="mt-9 font-display text-xl font-semibold">Topics of interest</h3><ul className="mt-4 grid gap-2 sm:grid-cols-2">{session.topics.map((topic) => <li key={topic} className="flex gap-2 text-sm text-slate-700"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />{topic}</li>)}</ul></div><div className="pattern-circuit rounded-xl border border-cyan-300/20 p-6 text-slate-100"><h3 className="font-display text-xl font-semibold">Session organizers</h3><p className="mt-4 text-sm leading-6 text-slate-300">{session.organizer}</p><a href={`mailto:${session.email}`} data-testid={`link-session-email-${session.number}`} className="mt-3 inline-flex items-center gap-2 text-sm text-cyan-200 hover:text-cyan-100"><Mail size={15} />{session.email}</a><div className="mt-8 border-t border-cyan-200/15 pt-6"><h3 className="font-display text-xl font-semibold">Submission details</h3><a href="#" data-testid={`link-session-submit-${session.number}`} className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-200">{session.link} <ExternalLink size={14} /></a><p className="mt-3 text-xs leading-6 text-slate-400">Select track as: <span className="text-slate-200">{session.number}: {session.title}</span><br />Last submission: [Date]<br />Decision notification: [Date]</p></div></div></div></article>)}</div></div></section></PageShell>;
}

function Registration() {
  usePageMeta('Registration', 'Registration fees, payment steps and participant notes for CONF 2026.');
  const fees = [['Indian Authors', 'Students UG / PG / PhD*', 'Rs. [X] + 18% GST'], ['Indian Authors', 'Academicians', 'Rs. [X] + 18% GST'], ['Indian Authors', 'Industry professionals', 'Rs. [X] + 18% GST'], ['Authors from abroad', 'Students', 'USD [X] + 18% GST'], ['Authors from abroad', 'Academicians', 'USD [X] + 18% GST'], ['Listeners', 'All categories', 'Rs. [X] / USD [X] + 18% GST']];
  return <PageShell pageLabel="Make your place in the room"><section className="pattern-grid px-5 py-24 lg:px-10"><div className="mx-auto max-w-[1120px]"><SectionHeading eyebrow="Registration fee" title="Choose your way in." children="Every registration supports the room around the paper: thoughtful review, a welcoming programme and the shared infrastructure of the conference." /><div className="mt-10 overflow-x-auto rounded-2xl border border-blue-900/15 bg-[#f7faff]/75"><table className="w-full min-w-[680px] border-collapse text-left text-sm"><thead className="pattern-hex text-slate-50"><tr><th className="px-5 py-4 font-mono-brand text-[10px] uppercase tracking-[.14em]">Participant type</th><th className="px-5 py-4 font-mono-brand text-[10px] uppercase tracking-[.14em]">Category</th><th className="px-5 py-4 font-mono-brand text-[10px] uppercase tracking-[.14em]">Fee</th></tr></thead><tbody>{fees.map(([group, category, fee], index) => <tr key={category + group} className={cn('border-b border-blue-900/10', index % 2 === 0 && 'bg-blue-100/25')}><td className="px-5 py-4 font-semibold text-blue-900">{group}</td><td className="px-5 py-4 text-slate-700">{category}</td><td className="px-5 py-4 font-mono-brand text-xs text-slate-700">{fee}</td></tr>)}</tbody></table></div><p className="mt-4 text-xs text-slate-500">*Subject to valid identity proof. GST rates and final amounts will be confirmed by [Institute].</p></div></section><section className="pattern-circuit section-dark px-5 py-24 lg:px-10"><div className="mx-auto max-w-[1120px]"><SectionHeading eyebrow="A clear path to confirmed" title="Steps to pay for registration" dark /><div className="mt-10 grid gap-6 lg:grid-cols-2"><article className="rounded-2xl border border-cyan-200/15 bg-slate-950/15 p-7"><h2 className="font-display text-2xl font-semibold">Indian authors / participants</h2><ol className="mt-6 grid gap-4">{['Open the registration form and select your participant category.', 'Complete the online payment through [Payment Gateway].', 'Save the transaction receipt and upload proof where requested.', 'Wait for the confirmation email from the organizing desk.'].map((step, index) => <li key={step} className="flex gap-4 text-sm leading-6 text-slate-300"><span className="font-mono-brand text-xs text-cyan-300">0{index + 1}</span>{step}</li>)}</ol></article><article className="rounded-2xl border border-cyan-200/15 bg-slate-950/15 p-7"><h2 className="font-display text-2xl font-semibold">Foreign authors / participants</h2><div className="mt-6 overflow-hidden rounded-lg border border-cyan-200/15"><table className="w-full text-sm"><tbody>{[['Account name', '[Account name]'], ['Bank', '[Bank name]'], ['Address', '[Bank address]'], ['Account no.', '[Account number]'], ['IFSC', '[IFSC]'], ['MICR', '[MICR]'], ['AD code', '[AD code]'], ['SWIFT', '[SWIFT]']].map(([label, value]) => <tr key={label} className="border-b border-cyan-200/10 last:border-0"><td className="w-1/3 px-3 py-2 text-slate-400">{label}</td><td className="px-3 py-2 text-cyan-100">{value}</td></tr>)}</tbody></table></div></article></div></div></section><section className="pattern-dots px-5 py-24 lg:px-10"><div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[1fr_.7fr]"><div><SectionHeading eyebrow="Before you confirm" title="Registration notes" /><ul className="mt-7 grid gap-3">{['Student registrations require a valid student ID proof.', 'The fee includes applicable publication charges for accepted papers.', 'On-site registration includes the conference kit and scheduled meals.', 'Listeners receive access to sessions but not the full author kit.', 'Extra page charges and maximum page limits follow the final call for papers.'].map((note) => <li key={note} className="flex gap-3 text-sm leading-7 text-slate-700"><Check className="mt-1 shrink-0 text-blue-600" size={17} />{note}</li>)}</ul></div><div className="pattern-mesh rounded-2xl border border-cyan-300/25 p-7 text-slate-50"><Globe2 className="text-cyan-300" size={25} /><h2 className="mt-8 font-display text-3xl font-semibold">Ready to take a seat?</h2><p className="mt-3 text-sm leading-7 text-slate-300">Use the official form to register. You can return to this page any time for payment details and notes.</p><a href="[FORM URL]" data-testid="link-open-registration-form" className="button-pattern mt-7 inline-block rounded-lg px-5 py-3 text-xs font-extrabold uppercase tracking-[.13em]">Open registration form <ArrowUpRight className="ml-1 inline" size={14} /></a></div></div></section></PageShell>;
}

function Router() {
  return <ErrorBoundary><Switch><Route path="/" component={Home} /><Route path="/committee" component={Committee} /><Route path="/committee.html" component={Committee} /><Route path="/call-for-papers" component={CallForPapers} /><Route path="/call-for-papers.html" component={CallForPapers} /><Route path="/submission" component={Submission} /><Route path="/submission.html" component={Submission} /><Route path="/special-sessions" component={SpecialSessions} /><Route path="/special_session" component={SpecialSessions} /><Route path="/special_session.html" component={SpecialSessions} /><Route path="/registration" component={Registration} /><Route path="/registration.html" component={Registration} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;