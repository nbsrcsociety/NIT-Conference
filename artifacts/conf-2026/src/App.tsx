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
  detailSecond?: string;
  note: string;
  pattern: string;
  image?: string;
};



const heroSlides: HeroSlide[] = [
  {
  kicker: 'I-AM-ComCyS 2027',
  title: 'International Conference on AI and ML for Computing and Cyber Security',
  detail: '16–18 September 2027',
  detailSecond: 'Centre for AI and ML for Applications | NIT Silchar',
  note: 'Hybrid Mode',
  pattern: 'pattern-neural',
  image: '/bannerfinal.png',
},
// {
//   kicker: 'I-AM-ComCyS 2027',
//   title: 'International Conference on AI and ML for Computing and Cyber Security',
//   detail: '16–18 September 2027',
//   detailSecond: 'Centre for AI and ML for Applications | NIT Silchar',
//   note: 'Hybrid Mode',
//   pattern: 'pattern-neural',
//   image: '/banner1new.png',
// },

  {
    kicker: 'I-AM-ComCyS 2027',
  title: 'International Conference on AI and ML for Computing and Cyber Security',
  detail: '16–18 September 2027',
  detailSecond: 'Centre for AI and ML for Applications | NIT Silchar',
  note: 'Hybrid Mode',
    pattern: 'pattern-circuit',
    image: '/slide3.png',
  },
  {
   kicker: 'I-AM-ComCyS 2027',
  title: 'International Conference on AI and ML for Computing and Cyber Security',
  detail: '16–18 September 2027',
  detailSecond: 'Centre for AI and ML for Applications | NIT Silchar',
  note: 'Hybrid Mode',
    pattern: 'pattern-hex',
    image: '/slide2.jpg',
  },
  {
    kicker: 'I-AM-ComCyS 2027',
  title: 'International Conference on AI and ML for Computing and Cyber Security',
  detail: '16–18 September 2027',
  detailSecond: 'Centre for AI and ML for Applications | NIT Silchar',
  note: 'Hybrid Mode',
    pattern: 'pattern-dots',
    image: '/slide1.jpg',
  },
];

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/important-dates', label: 'Important Dates' },
  { href: '/committee', label: 'Committee' },
  { href: '/call-for-papers', label: 'Call for Papers' },
  { href: '/submission', label: 'Submission' },
  { href: '/special-sessions', label: 'Special Sessions' },
  { href: '/registration', label: 'Registration' },
  
];



function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} | I-AM-ComCyS 2027`;
    const meta = document.querySelector('meta[name="description"]') ?? document.createElement('meta');
    meta.setAttribute('name', 'description');
    meta.setAttribute('content', description);
    document.head.appendChild(meta);
  }, [title, description]);
}

function Header() {
  const [location, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      

      <header className="glass-nav sticky top-0 z-40 border-b border-cyan-300/20 text-slate-100 shadow-xl shadow-slate-950/10">
  <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-4 lg:px-10">
          
          <Link
            href="/"
            data-testid="link-brand"
            className="navbar-slide-left group flex min-w-fit items-center gap-3"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src="/clogo.png"
              alt="I-AM-ComCyS 2027"
              className="h-16 w-16 object-contain"
            />

            <span className="leading-none">
              <span className="block font-display text-xl font-bold tracking-tight">
                I-AM-COMSYS <span className="text-cyan-300">2027</span>
              </span>

              <span className="mt-1 block font-mono-brand text-[9px] uppercase tracking-[.23em] text-slate-300">
                Signals / Systems / Society
              </span>
            </span>
          </Link>

          
<nav
  aria-label="Main navigation"
  className="navbar-slide-left hidden items-center gap-5 xl:flex"
>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-testid={`link-nav-${item.label
                  .toLowerCase()
                  .replaceAll(' ', '-')}`}
                className={cn(
                  'border-b-2 border-transparent py-2 text-[11px] font-bold uppercase tracking-[.12em] text-slate-300 transition-colors hover:border-cyan-300 hover:text-cyan-200',
                  location === item.href &&
                    'border-cyan-300 text-cyan-200'
                )}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/contact"
              data-testid="link-nav-contact"
              className={cn(
                'border-b-2 border-transparent py-2 text-[11px] font-bold uppercase tracking-[.12em] text-slate-300 transition-colors hover:border-cyan-300 hover:text-cyan-200',
                location === '/contact' &&
                  'border-cyan-300 text-cyan-200'
              )}
            >
              Contact
            </Link>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/registration"
              data-testid="link-header-register"
              className="navbar-slide-right button-pattern rounded-lg px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.12em]"
            >
              Register now
              <ArrowUpRight className="ml-1 inline" size={14} />
            </Link>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            data-testid="button-mobile-menu"
            className="rounded-lg border border-slate-500/40 p-2 text-slate-100 lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {menuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="border-t border-cyan-300/15 px-5 py-4 lg:hidden"
          >
            <div className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-testid={`link-mobile-nav-${item.label
                    .toLowerCase()
                    .replaceAll(' ', '-')}`}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'rounded-lg px-3 py-3 text-sm font-bold text-slate-300 hover:bg-cyan-300/10 hover:text-cyan-200',
                    location === item.href &&
                      'bg-cyan-300/10 text-cyan-200'
                  )}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/contact"
                data-testid="link-mobile-contact"
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'rounded-lg px-3 py-3 text-sm font-bold text-slate-300 hover:bg-cyan-300/10 hover:text-cyan-200',
                  location === '/contact' &&
                    'bg-cyan-300/10 text-cyan-200'
                )}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
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
    <section aria-label="Conference highlights" aria-live="polite" role="region" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} onKeyDown={(event) => { if (event.key === 'ArrowRight') move(1); if (event.key === 'ArrowLeft') move(-1); }} tabIndex={0} onTouchStart={(event) => setTouchStart(event.touches[0].clientX)} onTouchEnd={(event) => { if (touchStart === null) return; const distance = event.changedTouches[0].clientX - touchStart; if (Math.abs(distance) > 40) move(distance > 0 ? -1 : 1); setTouchStart(null); }} 
className="hero-refresh-animation hero-gradient relative isolate overflow-hidden border-b border-cyan-300/20 min-h-[650px] md:min-h-[700px]">

      {heroSlides.map((item, index) => (
  <div
    key={item.title}
    aria-hidden={index !== active}
    className={cn(
      'absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-0 transition-opacity duration-1000',
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
      
     
<div className="absolute inset-0 -z-[4] bg-black/20" />

<div
  className="absolute inset-0 -z-[4]"
  style={{
  background:
    'linear-gradient(90deg, rgba(2,8,30,0.62) 0%, rgba(2,8,30,0.46) 28%, rgba(2,8,30,0.20) 58%, rgba(2,8,30,0.02) 100%)',
}}
/>

<div className="absolute inset-0 -z-[4] bg-gradient-to-b from-black/10 via-transparent to-[#050b1f]/85" />


      <div
  className="relative mx-auto flex max-w-[1440px] items-center px-5 py-20 lg:px-4"
  style={{ minHeight: compact ? 390 : 650 }}
>



{/* LEFT-SIDE INSTITUTIONAL LOGOS */}
<div className="hero-logos absolute left-[-90px] top-[86%] z-10 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex">
  <div className="flex h-55 w-55 items-center justify-center overflow-hidden rounded-full bg-white/90 p-2 shadow-xl ring-2 ring-cyan-300/50">
   <img
  src="/nit_logo.png"
  alt="NIT Silchar Logo"
  className="h-full w-full scale-[1.10] object-contain"
 />
  </div>

  <div className="flex h-55 w-55 items-center justify-center overflow-hidden rounded-full bg-white/90 p-2 shadow-xl ring-2 ring-cyan-300/50">
    <img
      src="/conference-logo.jpeg"
      alt="Centre for AI and ML for Applications Logo"
      className="h-full w-full object-contain"
    />
  </div>
</div>


        
<div className="ml-0 max-w-3xl pl-0 hero-content-enter lg:ml-36 lg:pl-4">

          {pageLabel && <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-slate-950/30 px-3 py-1.5 font-mono-brand text-[10px] uppercase tracking-[.18em] text-cyan-200"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300" /> {pageLabel}</div>}
          
          <p className="eyebrow text-white text-sm md:text-base font-semibold tracking-[.18em]">
  {slide.kicker}
</p>
          <h1
  className={cn(
    'mt-4 max-w-4xl font-display font-semibold leading-[1.02] tracking-[-.035em] text-white',
    '[text-shadow:0_4px_18px_rgba(0,0,0,0.75)]',
    compact
      ? 'text-4xl md:text-6xl'
      : 'text-5xl md:text-6xl lg:text-[3.8rem]'
  )}
>
  {slide.title}
</h1>
          <p className="mt-6 max-w-xl font-mono-brand text-sm leading-7 text-white md:text-base font-medium [text-shadow:0_2px_10px_rgba(0,0,0,0.65)]">
  {slide.detail}
  {slide.detailSecond && (
    <>
      <br />
      {slide.detailSecond}
    </>
  )}
  
</p>
          <p className="mt-3 text-base font-semibold italic text-white md:text-lg [text-shadow:0_2px_10px_rgba(0,0,0,0.65)]">
  {slide.note}
</p>
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
    {
      label:
        'Proceedings Publication: Procedia Computer Science (Elsevier), subject to approval.',
      icon: FileText,
    },
    {
      label: 'Hybrid Mode',
      icon: Globe2,
    },
    {
      label: 'Thank you for your contribution in I-AM-ComCyS 2027!',
      icon: Sparkles,
    },
  ];

  const TickerGroup = ({
    copy,
  }: {
    copy: string;
  }) => (
    <div
      className="announcement-ticker-group"
      aria-hidden={copy !== 'first'}
    >
      {announcements.map(({ label, icon: Icon }, index) => (
        <div
          key={`${copy}-${index}`}
          className="announcement-ticker-item"
        >
          <Icon
            size={20}
            className="shrink-0 text-blue-600"
          />

          <span>{label}</span>

         <span className="announcement-divider">|</span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="announcement-ticker">
      <div className="announcement-ticker-window">
        <div className="announcement-ticker-track">

          <TickerGroup copy="first" />
          <TickerGroup copy="second" />
          <TickerGroup copy="third" />

        </div>
      </div>
    </section>
  );
}

function QuickLinksRow() {
  const announcements = [
    {
      label: 'Presentation template',
      icon: FileText,
      href: '/submission',
    },
    {
      label: 'Technical program schedule',
      icon: Clock3,
      href: '#',
    },
    {
      label: 'Proceedings information',
      icon: ShieldCheck,
      href: '/call-for-papers',
      highlight: true,
    },
    {
      label: 'Paper invited for special session',
      icon: Sparkles,
      href: '/special-sessions',
    },
  ];

  return (
    <section className="pattern-dots border-b border-blue-900/10 px-5 py-5 lg:px-10">
      <div className="mx-auto grid max-w-[1440px] gap-3 md:grid-cols-2 xl:grid-cols-4">

        {announcements.map(
          ({ label, icon: Icon, href, highlight }) => (
            <Link
              href={href}
              data-testid={`link-quick-${label
                .toLowerCase()
                .replaceAll(' ', '-')}`}
              key={label}
              className={cn(
                'group flex items-center justify-between gap-3 rounded-xl border border-blue-900/10 bg-[#f6f9ff]/70 px-4 py-4 text-xs font-bold uppercase tracking-[.08em] text-slate-700 transition',
                'hover:-translate-y-0.5 hover:border-blue-500/50',
                highlight &&
                  'border-cyan-500/40 bg-gradient-to-r from-cyan-100/80 to-blue-100/80 text-blue-900'
              )}
            >
              <span className="flex items-center gap-3">
                <Icon
                  size={18}
                  className="text-blue-600"
                />

                {label}
              </span>

              <ArrowUpRight
                size={16}
                className="text-blue-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          )
        )}

      </div>
    </section>
  );
}

function ImportantDates() {
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setToday(new Date());
    }, 60 * 60 * 1000);

    return () => window.clearInterval(timer);
  }, []);

  /*
   * ============================================================
   * ONLY EDIT THE DATES BELOW
   *
   * Once your actual dates are available, enter them here.
   *
   * Example:
   * date: '15 April 2027'
   *
   * Until a date is finalized:
   * date: 'To be announced'
   * ============================================================
   */

  const dates = [
    {
      title: 'Paper Submission',
      date: 'To be announced',
    },
    {
      title: 'Paper Acceptance',
      date: 'To be announced',
    },
    {
      title: 'Final Submission',
      date: 'To be announced',
    },
    {
      title: 'Registration',
      date: 'To be announced',
    },
    {
      title: 'Date of Conference',
      date: '16-18 September 2027',
    },
  ];

  /*
   * Convert a written date into a JavaScript Date.
   * "To be announced" is treated as unavailable.
   */
  const parseDate = (value: string) => {
    if (
      !value ||
      value.toLowerCase() === 'to be announced' ||
      value.toLowerCase() === 'tba'
    ) {
      return null;
    }

    const parsed = new Date(value);

    return Number.isNaN(parsed.getTime()) ? null : parsed;
  };

  /*
   * Add parsed dates to the timeline.
   */
  const datedItems = dates
    .map((item, index) => ({
      ...item,
      index,
      parsedDate: parseDate(item.date),
    }))
    .filter((item) => item.parsedDate !== null);

  /*
   * ============================================================
   * LIVE SEGMENT-BY-SEGMENT SLIDER
   *
   * The slider moves between two consecutive dates.
   *
   * Example:
   *
   * Paper Submission
   *        ↓
   *        ────────────────
   *                         ↓
   *                  Paper Acceptance
   *
   * When today's date reaches Paper Acceptance,
   * the slider starts moving toward Final Submission.
   * ============================================================
   */

  let progress = 0;

  if (datedItems.length >= 2) {
    const now = today.getTime();

    const firstDate = datedItems[0].parsedDate!.getTime();

    const lastDate =
      datedItems[datedItems.length - 1].parsedDate!.getTime();

    /*
     * Before the first known date.
     */
    if (now <= firstDate) {
      progress = 0;
    }

    /*
     * After the final known date.
     */
    else if (now >= lastDate) {
      progress = 100;
    }

    /*
     * Find which segment contains today's date.
     */
    else {
      for (let i = 0; i < datedItems.length - 1; i++) {
        const segmentStart =
          datedItems[i].parsedDate!.getTime();

        const segmentEnd =
          datedItems[i + 1].parsedDate!.getTime();

        if (now >= segmentStart && now <= segmentEnd) {
          /*
           * Progress inside the current segment.
           * 0 = beginning of segment
           * 1 = end of segment
           */
          const segmentProgress =
            (now - segmentStart) /
            (segmentEnd - segmentStart);

          /*
           * Divide the complete timeline equally
           * between the five milestone positions.
           */
          const segmentSize =
            100 / (datedItems.length - 1);

          progress =
            i * segmentSize +
            segmentProgress * segmentSize;

          break;
        }
      }
    }
  }

  progress = Math.max(
    0,
    Math.min(100, progress)
  );

  /*
   * Timeline starts at 5% and ends at 95%.
   */
  const progressPosition =
    5 + progress * 0.9;

  /*
   * Format the displayed date.
   */
  const formatDate = (value: string) => {
    const parsed = parseDate(value);

    if (!parsed) {
      return 'To be announced';
    }

    return parsed.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  /*
   * Check whether a milestone has passed.
   */
  const isPassed = (value: string) => {
    const parsed = parseDate(value);

    if (!parsed) {
      return false;
    }

    return today.getTime() >= parsed.getTime();
  };

  return (
    <section className="bg-white px-5 py-20 lg:px-10">
      
<div className="w-full">



        {/* Heading */}
        <div className="text-center">
          <p className="font-mono-brand text-xs font-semibold uppercase tracking-[.18em] text-blue-600">
            Conference Timeline
          </p>

          <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-.04em] text-slate-900 md:text-5xl">
            Important{' '}
            <span className="text-orange-600">
              Dates
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            Keep track of the important milestones of I-AM-ComCyS 2027.
          </p>

          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-blue-700 to-orange-500" />
        </div>

        {/* =====================================================
            DESKTOP TIMELINE
        ===================================================== */}
        <div className="relative mt-20 hidden lg:block">

          {/* Background timeline */}
          <div className="absolute left-[5%] right-[5%] top-8 h-1 rounded-full bg-slate-200" />

          {/* LIVE PROGRESS LINE */}
          <div
            className="absolute left-[5%] top-8 h-1 rounded-full bg-gradient-to-r from-blue-700 via-cyan-500 to-orange-500 transition-all duration-1000 ease-linear"
            style={{
              width: `${progress * 0.9}%`,
            }}
          />

          {/* LIVE MOVING INDICATOR */}
          <div
            className="absolute top-[1px] z-20 h-[58px] w-[58px] -translate-x-1/2 rounded-full border-4 border-white bg-orange-500 shadow-xl shadow-orange-500/30 transition-all duration-1000 ease-linear"
            style={{
              left: `${progressPosition}%`,
            }}
          >
            <div className="flex h-full w-full items-center justify-center">
              <span className="h-3 w-3 animate-pulse rounded-full bg-white" />
            </div>
          </div>

          {/* Timeline points */}
          <div className="relative grid grid-cols-5 gap-6">

            {dates.map((item, index) => {
              const itemDate = parseDate(item.date);

              const passed = isPassed(item.date);

              const isConference =
                index === dates.length - 1;

              return (
                <article
                  key={item.title}
                  className="relative flex flex-col items-center text-center"
                >

                  {/* Timeline circle */}
                  <div
                    className={cn(
                      'z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 transition-all duration-700',

                      passed
                        ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/25'

                        : isConference
                          ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/25'

                          : 'border-slate-200 bg-white text-slate-400'
                    )}
                  >
                    {isConference ? (
                      <CalendarDays size={23} />
                    ) : passed ? (
                      <Check
                        size={24}
                        strokeWidth={3}
                      />
                    ) : (
                      <span className="h-3 w-3 rounded-full bg-slate-300" />
                    )}
                  </div>

                  {/* Date */}
                  <p
                    className={cn(
                      'mt-7 min-h-[24px] text-sm font-semibold',

                      passed || isConference
                        ? 'text-orange-600'
                        : 'text-slate-500'
                    )}
                  >
                    {itemDate
                      ? formatDate(item.date)
                      : 'To be announced'}
                  </p>

                  {/* Title */}
                  <div
                    className={cn(
                      'mt-4 w-full rounded-2xl border px-5 py-5 transition-all duration-500',

                      passed
                        ? 'border-orange-200 bg-orange-50 shadow-sm'
                        : 'border-slate-200 bg-white shadow-sm'
                    )}
                  >
                    <h3 className="font-display text-lg font-semibold text-slate-800">
                      {item.title}
                    </h3>
                  </div>

                </article>
              );
            })}

          </div>
        </div>

        {/* =====================================================
            MOBILE TIMELINE
        ===================================================== */}
        <div className="mt-12 lg:hidden">

          <div className="relative ml-4 border-l-2 border-slate-200 pl-8">

            {/* Mobile progress */}
            <div
              className="absolute -left-[2px] top-0 w-0.5 rounded-full bg-gradient-to-b from-blue-700 via-cyan-500 to-orange-500 transition-all duration-1000"
              style={{
                height: `${progress}%`,
              }}
            />

            <div className="grid gap-8">

              {dates.map((item, index) => {
                const passed = isPassed(item.date);

                const isConference =
                  index === dates.length - 1;

                return (
                  <article
                    key={item.title}
                    className="relative"
                  >

                    {/* Point */}
                    <div
                      className={cn(
                        'absolute -left-[49px] top-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white',

                        passed || isConference
                          ? 'bg-orange-500'
                          : 'bg-slate-300'
                      )}
                    />

                    {/* Date */}
                    <p
                      className={cn(
                        'text-sm font-semibold',

                        passed || isConference
                          ? 'text-orange-600'
                          : 'text-slate-500'
                      )}
                    >
                      {parseDate(item.date)
                        ? formatDate(item.date)
                        : 'To be announced'}
                    </p>

                    {/* Title */}
                    <h3 className="mt-1 font-display text-xl font-semibold text-slate-800">
                      {item.title}
                    </h3>

                  </article>
                );
              })}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}



function ImportantDatesPage() {
  usePageMeta(
    'Important Dates',
    'Important dates and conference timeline for I-AM-ComCyS 2027.'
  );

  return (
    <PageShell
      pageLabel="Conference Timeline"
      showHero={false}
    >
      <div className="important-dates-page-enter">
        <ImportantDates />
      </div>
    </PageShell>
  );
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
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Committee', href: '/committee' },
    { label: 'Call for Papers', href: '/call-for-papers' },
    { label: 'Submission', href: '/submission' },
    { label: 'Special Sessions', href: '/special-sessions' },
    { label: 'Registration', href: '/registration' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer
      id="contact"
      className="pattern-mesh section-dark border-t border-cyan-300/15 px-5 pb-8 pt-16 lg:px-10"
    >
      <div className="mx-auto max-w-[1440px]">

        {/* MAIN FOOTER */}
        <div className="grid gap-12 border-b border-cyan-200/15 pb-12 md:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_1fr_.8fr]">

          {/* CONFERENCE INFORMATION */}
          <div className="site-footer-column">
            <div className="flex items-center gap-4">
              <img
                src="/clogo.png"
                alt="I-AM-COMSYS 2027"
                className="h-16 w-16 object-contain"
              />

              <div>
                <h2 className="font-display text-xl font-bold">
                  I-AM-COMSYS <span className="text-cyan-300">2027</span>
                </h2>

                <p className="mt-1 font-mono-brand text-[9px] uppercase tracking-[.16em] text-slate-400">
                  Signals / Systems / Society
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-6 text-slate-300">
              International Conference on AI and ML for Computing and Cyber Security.
            </p>

            <div className="mt-5 grid gap-3 text-sm text-slate-300">

              <p className="flex items-start gap-3">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-cyan-300"
                />
                <span>
                  NIT Silchar, Silchar, Assam, India
                </span>
              </p>

              <p className="flex items-center gap-3">
                <CalendarDays
                  size={17}
                  className="shrink-0 text-cyan-300"
                />
                <span>16–18 September 2027</span>
              </p>

            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="site-footer-column">
            <p className="eyebrow text-cyan-300">
              Quick Links
            </p>

            <div className="mt-5 grid gap-2">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-cyan-200"
                >
                  <ArrowRight
                    size={14}
                    className="text-cyan-400 transition-transform group-hover:translate-x-1"
                  />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CONTACT US */}
          <div className="site-footer-column">
            <p className="eyebrow text-cyan-300">
              Contact Us
            </p>

            <div className="mt-5 grid gap-5 text-sm text-slate-300">

              <div>
                <p className="font-semibold text-cyan-200">
                  CSE Department, NIT Silchar
                </p>

                <a
                  href="mailto:saroj@cse.nits.ac.in"
                  className="mt-2 flex items-center gap-3 hover:text-cyan-200"
                >
                  <Mail
                    size={16}
                    className="shrink-0 text-cyan-300"
                  />
                  saroj@cse.nits.ac.in
                </a>
              </div>

              <div>
                <p className="font-semibold text-cyan-200">
                  ECE Department, NIT Silchar
                </p>

                <a
                  href="mailto:banani@ece.nits.ac.in"
                  className="mt-2 flex items-center gap-3 hover:text-cyan-200"
                >
                  <Mail
                    size={16}
                    className="shrink-0 text-cyan-300"
                  />
                  banani@ece.nits.ac.in
                </a>
              </div>

              <a
                href="https://www.nits.ac.in/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-cyan-200 hover:text-cyan-100"
              >
                <Building2
                  size={16}
                  className="shrink-0"
                />
                Visit NIT Silchar
                <ExternalLink size={13} />
              </a>

            </div>
          </div>

          {/* ORGANIZER */}
          <div className="site-footer-column">
            <p className="eyebrow text-cyan-300">
              Organizer
            </p>

            <h3 className="mt-5 font-display text-xl font-semibold text-slate-50">
              Centre for AI and ML for Applications
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              National Institute of Technology Silchar
            </p>

            <a
              href="https://www.nits.ac.in/"
              target="_blank"
              rel="noreferrer"
              className="button-pattern mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-extrabold uppercase tracking-[.1em]"
            >
              Visit NIT Silchar
              <ExternalLink size={14} />
            </a>

            <div className="mt-8">
              <p className="font-mono-brand text-[10px] uppercase tracking-[.15em] text-slate-400">
  Proceedings Publication
</p>

<div className="mt-3 rounded-xl border border-cyan-200/20 bg-slate-950/20 px-4 py-4">
  <p className="font-display text-lg font-semibold text-slate-200">
    Proposed for Procedia Computer Science  (Elsevier) — To be approval.
  </p>

  
</div>
            </div>
          </div>

        </div>

        {/* FOOTER BOTTOM */}
        <div className="pt-7 text-xs text-slate-400">
          <p>
            © 2027 I-AM-ComCyS 2027 · All rights reserved · Hosted by NIT Silchar.
          </p>
        </div>

      </div>
    </footer>
  );
}



function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      data-testid="button-back-to-top"
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-cyan-300/40 bg-slate-950/90 px-4 py-3 text-xs font-bold uppercase tracking-[.1em] text-cyan-200 shadow-xl shadow-slate-950/30 backdrop-blur-md',
        'transition-all duration-700 ease-out',
        visible
          ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none translate-y-3 scale-90 opacity-0',
        'hover:-translate-y-1 hover:scale-105 hover:border-cyan-200 hover:bg-slate-900 hover:text-cyan-100'
      )}
    >
      <ArrowUpRight size={15} />
      Back to top
    </button>
  );
}


function PageShell({
  children,
  pageLabel,
  compact = true,
  showHero = true,
}: {
  children: ReactNode;
  pageLabel?: string;
  compact?: boolean;
  showHero?: boolean;
}) {
  

useEffect(() => {
  const main = document.querySelector('.site-shell main');

  if (!main) return;

  // Select sections throughout every page, including sections
  // nested inside divs, while avoiding nested section animations.
  const sections = Array.from(
    main.querySelectorAll('section')
  ).filter((section) => !section.parentElement?.closest('section'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const section = entry.target;

        if (entry.isIntersecting) {
          section.classList.remove('reveal-hidden');
          section.classList.add('reveal-visible');
        } else {
          section.classList.remove('reveal-visible');
          section.classList.add('reveal-hidden');
        }
      });
    },
    {
      threshold: 0.05,
      rootMargin: '0px 0px -30px 0px',
    }
  );

  sections.forEach((section) => {
    section.classList.add('scroll-reveal', 'reveal-hidden');
    observer.observe(section);
  });

  return () => observer.disconnect();
}, []);




  return (
    <div id="top" className="site-shell min-h-[100dvh]">
      <Header />

      <main>
        {showHero && (
          <HeroSlider
            compact={compact}
            pageLabel={pageLabel}
          />
        )}

        {children}
      </main>

      <Footer />

      <BackToTop />
    </div>
  );
}


function AboutNITAndObjective() {
  return (
    <section className="about-objective-section scroll-reveal relative isolate overflow-hidden bg-slate-100 px-5 py-12 lg:min-h-[620px] lg:px-10 lg:py-10">
      {/* Faded NIT Silchar campus background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/nit-silchar.png')" }}
      />
      <div className="absolute inset-0 -z-10 bg-white/50" />

      <div className="mx-auto grid max-w-[1440px] items-center gap-10 lg:min-h-[540px] lg:grid-cols-2 lg:gap-14">

        {/* LEFT: NIT SILCHAR LOGO */}
        <div className="flex items-center justify-center lg:justify-start">
          <a
            href="https://www.nits.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit NIT Silchar website"
            className="group flex h-56 w-56 items-center justify-center overflow-hidden rounded-full bg-white/90 p-3 shadow-xl ring-2 ring-blue-200 transition-all duration-300 hover:scale-105 hover:shadow-2xl md:h-64 md:w-64"
          >
            <img
              src="/nit_logo.png"
              alt="National Institute of Technology Silchar logo"
              className="h-full w-full scale-[1.12] object-contain transition-transform duration-300 group-hover:scale-[1.2]"
            />
          </a>
        </div>

        {/* RIGHT: ABOUT NIT SILCHAR */}
        <div className="relative rounded-2xl bg-[#b82e32] p-6 text-white shadow-xl md:p-8">
          <div className="absolute -bottom-5 left-5 right-0 -z-10 h-5 rounded-b-xl bg-yellow-400" />
          <div className="absolute -bottom-9 left-10 right-0 -z-20 h-5 rounded-b-xl bg-sky-500" />

          <h2 className="flex items-center gap-3 font-display text-2xl font-bold md:text-3xl">
            <span className="text-yellow-200">■</span>
            About NIT Silchar
          </h2>

          <p className="mt-5 text-justify leading-7 text-white/95 md:text-base">
            National Institute of Technology Silchar (NIT Silchar) is an
            Institute of National Importance located in Assam, India.
            The institute is committed to excellence in technical education,
            research, and innovation. Its academic environment encourages
            interdisciplinary collaboration and the development of solutions
            to emerging scientific and technological challenges.
          </p>

          <a
            href="https://www.nits.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-yellow-200 underline underline-offset-4 hover:text-white"
          >
            Explore NIT Silchar →
          </a>
        </div>

        {/* BOTTOM LEFT: CONFERENCE OBJECTIVE */}
        <div className="relative rounded-2xl bg-[#2860b3] p-6 text-white shadow-xl md:p-8">
          <div className="absolute -bottom-5 left-5 right-0 -z-10 h-5 rounded-b-xl bg-yellow-300" />
          <div className="absolute -bottom-9 left-10 right-0 -z-20 h-5 rounded-b-xl bg-cyan-400" />

          <h2 className="flex items-center gap-3 font-display text-2xl font-bold md:text-3xl">
            <span className="text-white">■</span>
            Conference Objective
          </h2>

          <p className="mt-5 text-justify leading-7 text-white/95 md:text-base">
            The International Conference on AI and ML for Computing and Cyber Security (I-AM-COMSYS 2027) to provide a global platform for researchers, academicians, industry professionals, and practitioners to exchange knowledge and present innovative research in Artificial Intelligence, Machine Learning, Computing, and Cyber Security. The conference seeks to promote advances in intelligent computing, AI-driven cyber defence, secure and trustworthy AI, privacy-preserving technologies, and emerging computational paradigms. It further aims to foster interdisciplinary collaboration, industry–academia partnerships, technology transfer, and research networking while addressing emerging challenges posed by Generative AI, adversarial threats, autonomous systems, and next-generation digital infrastructures.
          </p>
        </div>

        {/* BOTTOM RIGHT: CONFERENCE LOGO */}
        <div className="flex items-center justify-center">
          <div className="group flex h-64 w-64 items-center justify-center overflow-hidden rounded-2xl bg-white p-5 shadow-xl ring-1 ring-blue-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:ring-blue-300 md:h-72 md:w-72">
            <img
              src="/clogo.png"
              alt="I-AM-ComCyS 2027 conference logo"
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

function Home() {
  usePageMeta('International Conference on AI & Computing', 'I-AM COMSYS 2027 brings together research across artificial intelligence, computing, IoT and data analytics.');
  return <PageShell compact={false}>
    <AnnouncementRow />
    <QuickLinksRow />
    <ImportantDates />
    <AboutNITAndObjective />
    <CommitteeMembersMarquee />
    <section className="pattern-grid px-5 py-24 lg:px-10">
  <div className="mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-[.85fr_1.15fr]">
    <div>
     <SectionHeading
  eyebrow="A record that travels"
  title="Proceedings Publication"
  children="The conference proceedings have been proposed for publication in Procedia Computer Science (Elsevier). The proposal has been submitted and is currently subject to publisher approval."
/>

     <span className="mt-7 inline-flex items-center gap-2 rounded-full border border-blue-300 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700">
  <ShieldCheck size={15} />
  Proposal submitted — approval pending
</span>
    </div>

    <div className="pattern-hex mx-auto flex aspect-[3/4] w-full max-w-sm items-end rounded-2xl border border-cyan-200/30 p-7 shadow-2xl shadow-cyan-900/30">
      <div>
        <BookOpen size={34} className="text-cyan-300" />

        <p className="mt-12 font-mono-brand text-[10px] uppercase tracking-[.18em] text-cyan-200">
          Proceedings / Volume to be announced
        </p>

        <h3 className="mt-3 font-display text-4xl font-semibold text-slate-50">
          The future is a shared result.
        </h3>

        <p className="mt-4 text-sm text-slate-300">
          Procedia Computer Science. Volume to be announced
        </p>
      </div>
    </div>
  </div>
</section>


<section className="pattern-waves px-5 py-24 lg:px-10"><div className="mx-auto max-w-[1440px]"><SectionHeading eyebrow="Publication, without the fog" title="Proceedings publication" children="Accepted papers will be considered for publication through [Publisher / Series], subject to quality checks and the publisher’s final editorial process. There is no additional charge for non-open-access publication. Abstracts and short papers under four pages are not considered." /><a href="#" data-testid="link-publisher-series" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-blue-700 hover:text-cyan-700">Explore the publisher series <ExternalLink size={15} /></a><div className="mt-12 grid gap-5 md:grid-cols-3">{['[Previous edition] · Volume [X]', '[Previous edition] · Volume [X]', '[Previous edition] · Volume [X]'].map((title, index) => <a href="#" data-testid={`link-previous-proceedings-${index}`} key={title + index} className="card-lift group rounded-2xl border border-blue-900/10 bg-[#f6f9ff]/75 p-5"><div className="pattern-mesh flex aspect-[4/3] items-end rounded-xl p-5 text-slate-50"><span className="font-mono-brand text-[10px] uppercase tracking-[.14em]">Proceedings {String(index + 1).padStart(2, '0')}</span></div><div className="mt-4 flex items-center justify-between text-sm font-bold text-slate-800"><span>{title}</span><ArrowUpRight size={16} className="text-blue-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div></a>)}</div></div></section>

<section className="pattern-grid px-5 py-24 lg:px-10">
  <div className="mx-auto max-w-[1440px]">

    <SectionHeading
      eyebrow="More context, more connection"
      title="Three ways into the conference"
    />

    <div className="mt-10 grid gap-5 lg:grid-cols-3">

      {[
        [
          'About NIT Silchar',
          'A place for ambitious questions and patient work.',
          '/nit-silchar.png',
          'https://www.nits.ac.in/'
        ],
        [
          'About CSE Department',
          'The people and practices behind this year’s programme.',
          '/cse-department.jpg',
          'https://cs.nits.ac.in/'
        ],
        [
          'About ECE Department',
          'The Department of Electronics and Communication Engineering at NIT Silchar.',
          '/ece-department.jpg',
          'https://ec.nits.ac.in/'
        ]
      ].map(([title, text, image, link], index) => (




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
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`link-about-${index}`}
              className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.12em] text-blue-700 transition-colors hover:text-cyan-600"
            >
              More about {title.replace('About ', '')}
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

          </div>

        </article>

      ))}

    </div>

  </div>
</section>
  
  

<section className="bg-white px-5 py-24 lg:px-10">
  <div className="mx-auto max-w-[1440px]">

    <SectionHeading
      eyebrow="Where we meet"
      title="Conference Location"
      children="I-AM-ComCyS 2027 will be hosted at the National Institute of Technology Silchar, Assam."
    />

    <div className="mt-10 overflow-hidden rounded-2xl border border-blue-900/10 bg-white shadow-lg">

      <div className="border-b border-blue-900/10 px-6 py-5">
        <h3 className="font-display text-2xl font-semibold text-slate-900">
          National Institute of Technology Silchar
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          NIT Silchar, Cachar, Silchar, Assam, India – 788010
        </p>
      </div>

      <iframe
        title="National Institute of Technology Silchar Map"
        src="https://www.google.com/maps?q=National%20Institute%20of%20Technology%20Silchar%2C%20Assam&output=embed"
        className="h-[500px] w-full border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />

    </div>

  </div>
</section>



  <Gallery /></PageShell>;
}

const committeeRoles: Array<[string, string[]]> = [
  ['Patron', [
    'Prof. Dilip Kumar Baidya · Director, NIT Silchar, India'
  ]],

  ['Organizing Chairs', [
    'Dr. Banani Basu · NIT Silchar, India',
    'Dr. Jupitara Hazarika · NIT Silchar, India',
    'Dr. Atanu Sahu · NIT Silchar, India',
    'Dr. Ramanujam E · NIT Silchar, India',
    'Dr. Biswarup Ganguly · NIT Silchar, India'
  ]],

  ['General Chairs', [
    'Prof. Ivana Budinska · SAS, Slovakia',
    'Prof. Alexandre E Escargueil · Sorbonne University, France',
    'Prof. Ashish Ghosh · Director, IIIT Bhubaneswar, India',
    'Dr. Rahul Gourav · Sorbonne University, France ',
    'Dr. Saroj Kumar Biswas · NIT Silchar, India'
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
    'Dr. Jupitara Hazarika · NIT Silchar, India',
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


const committeePhotos: Record<string, string> = {
  // Patron
  'Prof. Dilip Kumar Baidya': '/committee/dilip.jpg',

  // Organizing Chairs
  'Dr. Banani Basu': '/committee/Basu.jpg',
  'Dr. Jupitara Hazarika': '/committee/image.png',
  'Dr. Atanu Sahu': '/committee/sahu.jpg',
  'Dr. Ramanujam E': '/committee/e.jpg',
  'Dr. Biswarup Ganguly': '/committee/ganguly.jpg',

  // General Chairs
  'Prof. Alexandre E Escargueil': '/committee/sorbonne.jpeg',
  'Prof. Ashish Ghosh': '/committee/ashish.jpg',
  'Prof. Ivana Budinska': '/committee/sas.jpg',
  'Dr. Rahul Gourav': '/committee/rahul.jpg',
  'Dr. Saroj Kumar Biswas': '/committee/saroj sir.jpg',

  // Organizing Secretary
  'Dr. Malaya Dutta Borah': '/committee/malaya.jpg',
  'Dr. Badal Soni': '/committee/soni.jpg',
  'Dr. Sugnya Devi K': '/committee/devi.jpg',

  // Convener
  'Dr. Kedar Nath Das': '/committee/nath.jpg',
  'Dr. Partha Pakray': '/committee/pakray.png',
  'Dr. Arnab Nandi': '/committee/nandi.jpg',
  'Dr. Nabanita Adhikary': '/committee/nabanita.jpg',

  // Publication Chairs
  'Dr. Sudarshan Sahoo': '/committee/sahoo.jpg',
  

  // Co-Convener
  'Dr. Aparajita Dutta': '/committee/dutta.jpg',
  'Dr. Debbrota Paul Chowdhury': '/committee/paul.jpg',

  // Publicity Chairs
  'Dr. Dalton Meitei T': '/committee/dalton.jpg',
  'Dr. Murugan R': '/committee/murugan.jpg',
  'Dr. Rajarshi Pramanik': '/committee/pra.jpg',

  'Dr. Ripon Patgiri': '/committee/patgiri.jpg',

  // Hospitality Chairs
  'Dr. Jupita Hazarika': '/committee/image.png',
};


function CommitteeMembersMarquee() {
  

const uniqueMembers = new Map<
  string,
  {
    id: string;
    role: string;
    name: string;
    affiliation: string;
    image?: string;
  }
>();

committeeRoles.forEach(([role, people]) => {
  people.forEach((person) => {
    const name = person.split(' · ')[0].trim();
    const key = name.toLowerCase().replace(/\s+/g, ' ');

    if (!uniqueMembers.has(key)) {
      const affiliation = person.includes(' · ')
        ? person.split(' · ').slice(1).join(' · ')
        : '';

      uniqueMembers.set(key, {
        id: key,
        role,
        name,
        affiliation,
        image: committeePhotos[name],
      });
    }
  });
});

const members = Array.from(uniqueMembers.values());



  const renderMembers = (isDuplicate = false) =>
    members.map((member, index) => (
      <article
        key={`${isDuplicate ? 'duplicate-' : ''}${member.id}-${index}`}
        className="committee-marquee-card"
      >
        <div className="committee-marquee-photo">
          {member.image ? (
            <img
              src={member.image}
              alt={isDuplicate ? '' : member.name}
              loading="lazy"
            />
          ) : (
            <Users size={30} className="text-blue-400" />
          )}
        </div>

        <div className="min-w-0">
          <h3 className="committee-marquee-name">
            {member.name}
          </h3>
          {/* <p className="committee-marquee-role">
            {member.role}
          </p> */}
          <p className="committee-marquee-affiliation">
            {member.affiliation || 'I-AM-ComCyS 2027'}
          </p>
        </div>
      </article>
    ));

  return (
    <section className="committee-marquee-section">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 text-center">
          <p className="font-mono-brand text-xs font-bold uppercase tracking-[.18em] text-blue-600">
            The People Behind the Conference
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Committee Members
          </h2>
          <p className="mt-3 text-sm text-slate-600 md:text-base">
            Meet the researchers and organizers behind I-AM-ComCyS 2027.
          </p>
        </div>

        <div
          className="committee-marquee"
          aria-label="Scrolling committee members"
        >
          <div className="committee-marquee-track">
            <div className="committee-marquee-group">
              {renderMembers()}
            </div>

            <div
              className="committee-marquee-group"
              aria-hidden="true"
            >
              {renderMembers(true)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




function Committee() {
  usePageMeta('Organizing Committee', 'Meet the chairs, advisors and technical programme committee for CONF 2026.');
  
  const technical = [
  'Dr. Sangram Ray · NIT Sikkim',
  'Dr. Deepanjal Shrestha · Associate Professor and Director of the International Relations Center at Pokhara University, Nepal',
  'Dr. Badal Soni · NIT Silchar',
  'Dr. Malaya Dutta Borah · NIT Silchar'
];
  







  return <PageShell pageLabel="People behind the programme" showHero={false}><section className="pattern-grid px-5 py-24 lg:px-10 reveal"><div className="mx-auto max-w-[1120px]"><SectionHeading eyebrow="The people behind the programme" title="Organizing committee" children="A distributed team of researchers, hosts and detail-people making room for meaningful exchange." />
  
  <div className="mt-12">

  {/* ===================== */}
  {/* PATRON */}
  {/* ===================== */}
  <div className="flex justify-center">
    {committeeRoles
      .filter(([role]) => role === 'Patron')
      .map(([role, people]) => (
        <article
          key={role}
          data-testid="card-committee-role-patron"
          className="card-lift w-full max-w-[680px] overflow-hidden rounded-2xl border border-blue-900/10 bg-[#f7faff]/75"
        >
          {/* Role heading */}
          <div className="pattern-hex border-b border-cyan-300/20 px-5 py-4">
            <h2 className="font-mono-brand text-xs font-bold uppercase tracking-[.15em] text-cyan-100">
              {role}
            </h2>
          </div>

          {/* Patron */}
          <div className="flex justify-center p-5">
            {(people as string[]).map((person, personIndex) => {
              const name = person.split(' · ')[0].trim();
              const affiliation = person.includes(' · ')
                ? person.split(' · ').slice(1).join(' · ')
                : '';
              const image = committeePhotos[name];

              return (
                <div
                  key={`${person}-${personIndex}`}
                  className="flex w-full max-w-[520px] items-center gap-4 rounded-xl border border-blue-900/10 bg-white/70 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-lg"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-blue-200 bg-blue-50">
                    {image ? (
                      <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Users size={28} className="text-blue-400" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-6 text-slate-800">
                      {name}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {affiliation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      ))}
  </div>

  {/* ============================== */}
  {/* ALL OTHER COMMITTEE ROLES */}
  {/* ============================== */}
  <div className="mt-8 grid gap-6 md:grid-cols-2">
    {committeeRoles
      .filter(([role]) => role !== 'Patron')
      .map(([role, people], index) => (
        <article
          key={role}
          data-testid={`card-committee-role-${index + 1}`}
          className="card-lift overflow-hidden rounded-2xl border border-blue-900/10 bg-[#f7faff]/75"
        >
          {/* Role heading */}
          <div className="pattern-hex border-b border-cyan-300/20 px-5 py-4">
            <h2 className="font-mono-brand text-xs font-bold uppercase tracking-[.15em] text-cyan-100">
              {role}
            </h2>
          </div>

          {/* Members */}
          <div className="grid gap-4 p-5">
            {(people as string[]).map((person, personIndex) => {
              const name = person.split(' · ')[0].trim();
              const affiliation = person.includes(' · ')
                ? person.split(' · ').slice(1).join(' · ')
                : '';
              const image = committeePhotos[name];

              return (
                <div
                  key={`${person}-${personIndex}`}
                  className="group flex items-center gap-4 rounded-xl border border-blue-900/10 bg-white/70 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-lg"
                >
                  {/* Member photo */}
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-blue-200 bg-blue-50">
                    {image ? (
                      <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Users size={28} className="text-blue-400" />
                      </div>
                    )}
                  </div>

                  {/* Member information */}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-6 text-slate-800">
                      {name}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {affiliation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      ))}
  </div>

</div>








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
{/* TECHNICAL PROGRAM COMMITTEE */}
<div className="mt-24">
  <p className="section-kicker">
    A broad technical lens
  </p>

  <h2 className="mt-3 font-display text-4xl font-semibold">
    Technical Program Committee
  </h2>

  <div className="mt-7 grid gap-2 md:grid-cols-2">
    {technical.map((member, index) => (
      <div
        key={`${member}-${index}`}
        data-testid={`text-technical-member-${index}`}
        className="rounded-lg border border-blue-900/10 bg-[#f7faff]/70 px-4 py-3 text-sm text-slate-700"
      >
        {member}
      </div>
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
</div></div>

</section>
</PageShell>;
}

const tracks = [
  {
    title: 'Artificial Intelligence and Machine Learning (AI/ML)',
    pattern: 'pattern-neural',
    topics: [
      'Deep Learning and Neural Networks',
      'Generative AI and Large Language Models',
      'Natural Language Processing and Speech Intelligence',
      'Computer Vision and Image Analytics',
      'Reinforcement Learning and Autonomous Systems',
      'Explainable and Trustworthy AI',
      'Federated and Privacy-Preserving Machine Learning',
      'Multimodal AI and Foundation Models',
      'AI for Edge and Distributed Computing',
      'AI Applications and Intelligent Decision-Making',
    ],
  },

  {
    title: 'Advanced Artificial Intelligence and Emerging Technologies in Applications',
    pattern: 'pattern-neural',
    topics: [
      'Generative and Agentic AI',
      'Digital Twins and Intelligent Simulation',
      'Internet of Things and AIoT',
      'Extended, Augmented and Virtual Reality',
      'Autonomous Systems and Robotics',
      'Edge and Fog Intelligence',
      'Blockchain and AI Integration',
      'Quantum Computing and Quantum AI',
      'Human–AI Interaction and Collaborative Intelligence',
      'Emerging AI Applications and Smart Technologies',
    ],
  },

  {
    title: 'AI-Enabled Solutions for Network Systems and Cybersecurity in Applications',
    pattern: 'pattern-neural',
    topics: [
      'AI-Driven Intrusion Detection and Prevention',
      'Machine Learning for Network Security',
      'Malware and Ransomware Detection',
      'Network Traffic Analysis and Anomaly Detection',
      'Adversarial Machine Learning and AI Security',
      'Cyber Threat Intelligence and Analytics',
      'Security and Privacy in IoT Networks',
      'Cloud, Edge and 5G Network Security',
      'Digital Forensics and Incident Response',
      'Blockchain and AI for Cybersecurity',
    ],
  },

  {
    title: 'Intelligent Systems in Practice',
    pattern: 'pattern-neural',
    topics: [
      'Intelligent Automation and Decision Support Systems',
      'Robotics and Autonomous Systems',
      'Smart Manufacturing and Industry 4.0/5.0',
      'Intelligent Transportation Systems',
      'Smart Cities and Intelligent Infrastructure',
      'Healthcare and Assistive Intelligent Systems',
      'Intelligent Agriculture and Precision Farming',
      'Human–Computer Interaction and Intelligent Interfaces',
      'IoT-Based Intelligent Systems',
      'Real-World AI Applications and Deployment',
    ],
  },

  {
    title: '5G Communication',
    pattern: 'pattern-neural',
    topics: [
      '5G and Beyond-5G Wireless Networks',
      'Massive MIMO and Beamforming',
      'Millimeter-Wave and Terahertz Communications',
      'Network Slicing and Virtualization',
      'Software-Defined and Cloud-Native Networks',
      'AI/ML for 5G Network Optimization',
      'Internet of Things and Machine-Type Communications',
      'Edge Computing and Mobile Edge Networks',
      'Ultra-Reliable Low-Latency Communications',
      '6G Technologies and Future Wireless Networks',
    ],
  },

  {
    title: 'Signal Processing',
    pattern: 'pattern-neural',
    topics: [
      'Digital Signal Processing',
      'Image and Video Processing',
      'Speech and Audio Signal Processing',
      'Biomedical Signal Processing',
      'Statistical and Adaptive Signal Processing',
      'Machine Learning for Signal Processing',
      'Multidimensional and Multimodal Signal Processing',
      'Signal Detection, Estimation and Classification',
      'Compressed Sensing and Sparse Signal Processing',
      'Signal Processing for Communication Systems',
    ],
  },

  {
    title: 'Electrical Power, Energy and Drives System',
    pattern: 'pattern-neural',
    topics: [
      'Smart Grids and Intelligent Power Systems',
      'Power System Protection and Automation',
      'Power Quality and Harmonic Analysis',
      'Power Electronics and Converter Systems',
      'Electrical Machines and Drives',
      'Energy Storage and Battery Management Systems',
      'Electric Vehicles and Charging Infrastructure',
      'AI/ML Applications in Power Systems',
      'Distributed Generation and Microgrids',
      'Energy Management and Demand-Side Optimization',
    ],
  },

  {
    title: 'Control and Instrumentation',
    pattern: 'pattern-neural',
    topics: [
      'Advanced Control Systems',
      'Intelligent and AI-Based Control',
      'Adaptive and Robust Control',
      'Nonlinear and Optimal Control',
      'Industrial Automation and Process Control',
      'Robotics and Autonomous Control',
      'Sensors and Smart Sensor Systems',
      'Instrumentation and Measurement Systems',
      'Fault Detection, Diagnosis and Condition Monitoring',
      'IoT-Based Control and Instrumentation',
    ],
  },

  {
    title: 'Biomedical',
    pattern: 'pattern-neural',
    topics: [
      'AI and ML in Healthcare and Medicine',
      'Biomedical Signal and Image Processing',
      'Medical Imaging and Computer-Aided Diagnosis',
      'Biomedical Instrumentation and Sensors',
      'Wearable and Remote Health Monitoring',
      'Digital Health and Telemedicine',
      'Bioinformatics and Computational Biology',
      'Medical Robotics and Assistive Technologies',
      'Health Data Analytics and Predictive Modelling',
      'Biomedical Devices and Intelligent Healthcare Systems',
    ],
  },

  {
    title: 'Renewable Energy',
    pattern: 'pattern-neural',
    topics: [
      'Solar Photovoltaic and Solar Thermal Energy',
      'Wind Energy Systems',
      'Hydropower and Small Hydro Systems',
      'Biomass and Bioenergy Technologies',
      'Geothermal and Ocean Energy',
      'Hybrid Renewable Energy Systems',
      'Energy Storage and Battery Technologies',
      'Smart Grids and Renewable Energy Integration',
      'AI/ML for Renewable Energy Forecasting and Optimization',
      'Renewable Energy Management and Sustainability',
    ],
  },

  {
    title: 'Optimization in AI and ML',
    pattern: 'pattern-neural',
    topics: [
      'Evolutionary and Genetic Algorithms',
      'Swarm Intelligence and Metaheuristic Optimization',
      'Multi-Objective Optimization',
      'Bayesian Optimization',
      'Reinforcement Learning-Based Optimization',
      'Hyperparameter Optimization and AutoML',
      'Optimization for Deep Learning',
      'Combinatorial and Discrete Optimization',
      'Fuzzy and Neuro-Fuzzy Optimization',
      'Optimization for Real-World AI Applications',
    ],
  },

  {
    title: 'AI and ML in Structural and Geotechnical Engineering',
    pattern: 'pattern-neural',
    topics: [
      'AI-Based Structural Health Monitoring',
      'Machine Learning for Structural Analysis and Design',
      'Structural Damage Detection and Prediction',
      'Intelligent Earthquake Engineering',
      'AI-Based Construction and Structural Safety',
      'Geotechnical Data Analytics and Prediction',
      'Machine Learning for Soil and Foundation Engineering',
      'AI-Based Slope Stability and Landslide Prediction',
      'Intelligent Infrastructure Monitoring and Management',
      'Digital Twins and Predictive Maintenance of Structures',
    ],
  },

  {
    title: 'Application of AI and ML in Water Resources and Environmental Engineering',
    pattern: 'pattern-neural',
    topics: [
      'AI/ML for Hydrological Modelling and Forecasting',
      'Flood Prediction and Early Warning Systems',
      'Drought Monitoring and Prediction',
      'Groundwater Modelling and Management',
      'Water Quality Monitoring and Prediction',
      'Intelligent Water Distribution and Management',
      'Remote Sensing and GIS for Water Resources',
      'AI-Based Environmental Monitoring and Assessment',
      'Climate Change Modelling and Impact Prediction',
      'Smart and Sustainable Water Resources Management',
    ],
  },
];

function CallForPapers() {
  usePageMeta('Call for Papers', 'Explore the multiple research tracks and submit original work to I-AM-COMSYS 2027.');
  return <PageShell pageLabel="The invitation to contribute" showHero={false}><section className="pattern-waves px-5 py-20 lg:px-10 reveal"><div className="mx-auto max-w-[1120px]"><div className="flex flex-wrap gap-3"><a href="#" download data-testid="link-download-brochure" className="button-pattern rounded-lg px-5 py-3 text-xs font-extrabold uppercase tracking-[.12em]"><Download className="mr-2 inline" size={15} />Download brochure</a><Link href="/submission" data-testid="link-submission-guidelines" className="rounded-lg border border-blue-900/20 bg-[#f7faff]/70 px-5 py-3 text-xs font-extrabold uppercase tracking-[.12em] text-blue-800">Submission guidelines <ArrowRight className="ml-1 inline" size={15} /></Link></div><div className="mt-14"><SectionHeading eyebrow="Call for papers" title="Bring the hard question." children="We invite original research, applied studies and thoughtful provocations across the systems that make intelligence useful. Choose a track, find your edge and send us work with somewhere to go." /></div><div className="mt-16"><p className="section-kicker">Multiple connected lenses</p><h2 className="mt-3 font-display text-4xl font-semibold">Conference tracks</h2><div className="mt-8 grid gap-5 md:grid-cols-2">{tracks.map((track, index) => <article key={track.title} data-testid={`card-track-${index}`} className="card-lift min-h-[500px] overflow-hidden rounded-2xl border border-blue-900/10 bg-[#f7faff]/70"><div className={cn('h-[220px] p-6', track.pattern)}><div className="flex items-center justify-between text-cyan-100"><span className="font-mono-brand text-[10px] uppercase tracking-[.16em]">Track {index + 1}</span><ArrowDownRight size={19} /></div><h3 className="mt-8 font-display text-3xl font-semibold text-slate-50">{track.title}</h3></div><ul className="grid gap-2 p-6 sm:grid-cols-2">{track.topics.map((topic) => <li key={topic} className="flex items-start gap-2 text-sm text-slate-700"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />{topic}</li>)}</ul></article>)}</div></div><div className="mt-20 grid gap-5 md:grid-cols-2"><article className="pattern-mesh rounded-2xl border border-cyan-300/25 p-7 text-slate-50"><Award className="text-cyan-300" size={24} /><h2 className="mt-8 font-display text-3xl font-semibold">Best paper awards</h2><p className="mt-3 text-sm leading-7 text-slate-300">One award per track, selected by the technical programme committee for originality, clarity and potential to travel beyond the room.</p></article><article className="pattern-circuit rounded-2xl border border-cyan-300/20 p-7 text-slate-50"><Sparkles className="text-cyan-300" size={24} /><h2 className="mt-8 font-display text-3xl font-semibold">Call for special session</h2><p className="mt-3 text-sm leading-7 text-slate-300">Propose a focused conversation on an emerging topic. Send a short rationale and organiser details to [email].</p><Link href="/special-sessions" data-testid="link-special-session-call" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.13em] text-cyan-200">See special sessions <ArrowRight size={15} /></Link></article></div></div></section></PageShell>;
}

function Submission() {
  usePageMeta('Manuscript Submission', 'Submission guidelines, templates and the camera-ready checklist for CONF 2026 authors.');
  const [checked, setChecked] = useState<boolean[]>(Array.from({ length: 13 }, () => false));
  const checklist = ['Author names and affiliations are consistent', 'Paper is written in English', 'Manuscript uses the approved template', 'Paper is between 10 and 12 pages', 'All figures are legible in print', 'References are complete and formatted', 'Plagiarism check has been completed', 'Anonymisation requirements are met', 'Copyright and consent form is ready', 'Final PDF has been proofread', 'Supplementary files are clearly named', 'Submission link has been tested', 'All co-authors have approved the final version'];
  return <PageShell pageLabel="From draft to review" showHero={false}><section className="pattern-dots px-5 py-20 lg:px-10 reveal"><div className="mx-auto max-w-[1120px]"><SectionHeading eyebrow="Manuscript submission" title="Make the work easy to review." children="The clearest submission respects the reader’s attention. Use the guidance below, then send your work through the review system." /><div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_.9fr]"><div><SectionHeading eyebrow="01 / Before you send" title="Submission guidelines" /><ol className="mt-7 grid gap-4">{['All manuscripts must be written in English and present original work.', 'Submissions will undergo peer review; do not submit work under active review elsewhere.', 'Manuscripts should be 10 to 12 pages using the approved conference template.', 'Every submission is subject to plagiarism and originality checks.', 'Submission is accepted only through the review system linked below.'].map((item, index) => <li key={item} className="flex gap-4 rounded-xl border border-blue-900/10 bg-[#f7faff]/70 p-4 text-sm leading-6 text-slate-700"><span className="font-mono-brand text-xs text-blue-700">0{index + 1}</span>{item}</li>)}</ol><a href="#" data-testid="link-submission-system" className="button-pattern mt-7 inline-block rounded-lg px-5 py-3 text-xs font-extrabold uppercase tracking-[.13em]">Submission link <ExternalLink className="ml-1 inline" size={14} /></a></div><div className="pattern-circuit rounded-2xl border border-cyan-300/20 p-7 text-slate-50"><FileText size={25} className="text-cyan-300" /><h2 className="mt-8 font-display text-3xl font-semibold">Manuscript templates</h2><p className="mt-3 text-sm leading-6 text-slate-300">Choose the format that lets you focus on the argument, not the formatting.</p><div className="mt-7 grid gap-3"><a href="#" download data-testid="link-word-template" className="flex items-center justify-between rounded-lg border border-cyan-200/20 bg-slate-950/20 px-4 py-3 text-sm text-cyan-100 hover:border-cyan-200"><span>Word template</span><Download size={15} /></a><a href="#" download data-testid="link-latex-template" className="flex items-center justify-between rounded-lg border border-cyan-200/20 bg-slate-950/20 px-4 py-3 text-sm text-cyan-100 hover:border-cyan-200"><span>LaTeX template</span><Download size={15} /></a><a href="#" download data-testid="link-consent-form" className="flex items-center justify-between rounded-lg border border-cyan-200/20 bg-slate-950/20 px-4 py-3 text-sm text-cyan-100 hover:border-cyan-200"><span>Consent to publish form</span><Download size={15} /></a></div></div></div></div></section><section className="pattern-circuit section-dark px-5 py-24 lg:px-10"><div className="mx-auto max-w-[1120px]"><div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr]"><div><SectionHeading eyebrow="02 / After acceptance" title="Camera-ready submission" dark children="Acceptance is a beginning, not a finish line. Keep the final file clean, complete and ready for the proceedings workflow." /><a href="#" data-testid="link-camera-ready" className="button-pattern mt-7 inline-block rounded-lg px-5 py-3 text-xs font-extrabold uppercase tracking-[.13em]">Camera-ready submission link <ExternalLink className="ml-1 inline" size={14} /></a></div><div><ol className="grid gap-4">{['Use the final conference template and incorporate reviewer recommendations.', 'Include the signed consent to publish form with the final manuscript.', 'Run one final plagiarism check and verify all metadata.', 'Upload the final PDF and source files before [Camera-ready date].'].map((item, index) => <li key={item} className="flex gap-4 rounded-xl border border-cyan-200/15 bg-slate-950/15 p-4 text-sm leading-6 text-slate-300"><span className="font-mono-brand text-xs text-cyan-300">0{index + 1}</span>{item}</li>)}</ol></div></div><div className="mt-20 grid gap-8 lg:grid-cols-[.75fr_1.25fr]"><div><p className="eyebrow text-cyan-300">File discipline</p><h2 className="mt-3 font-display text-3xl font-semibold">Camera-ready files naming</h2><p className="mt-4 text-sm leading-7 text-slate-300">Use the following naming convention for a clean editorial handoff:</p><code className="mt-5 block rounded-lg border border-cyan-200/20 bg-slate-950/30 p-4 font-mono-brand text-xs text-cyan-200">CONF26_Track##_Surname_FirstAuthor.pdf</code></div><div className="pattern-hex rounded-2xl border border-cyan-200/20 p-6"><p className="font-mono-brand text-[10px] uppercase tracking-[.15em] text-cyan-200">Example / upload preview</p><div className="mt-5 flex min-h-28 items-center justify-center rounded-lg border border-dashed border-cyan-200/30 text-sm text-slate-300">[Screenshot placeholder]</div></div></div></div></section><section className="pattern-grid px-5 py-24 lg:px-10"><div className="mx-auto max-w-[1120px]"><SectionHeading eyebrow="A final quiet pass" title="Camera-ready submission checklist" children="Tick each item as you work. Your progress stays in this session while you move through the page." /><div className="mt-10 grid gap-2 md:grid-cols-2">{checklist.map((item, index) => <label key={item} data-testid={`label-checklist-${index}`} className={cn('flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm transition', checked[index] ? 'border-cyan-500/50 bg-cyan-100/50 text-blue-900' : 'border-blue-900/10 bg-[#f7faff]/70 text-slate-700')}><input type="checkbox" data-testid={`input-checklist-${index}`} checked={checked[index]} onChange={() => setChecked((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))} className="sr-only" /><span className={cn('mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border', checked[index] ? 'border-cyan-600 bg-cyan-500 text-[#05102c]' : 'border-blue-900/25')}>{checked[index] && <Check size={14} />}</span>{item}</label>)}</div><p className="mt-6 font-mono-brand text-xs text-blue-700">{checked.filter(Boolean).length} / 13 checks complete</p></div></section></PageShell>;
}

const sessions = [
  { number: 'SS01', title: '[Special Session Title]', motivation: '[Why this focused research conversation matters now. Replace this paragraph with the session motivation and need.]', topics: ['[Emerging topic]', '[Method or application area]', '[Open problem]', '[Responsible practice]'], organizer: '[Organizer Name] · [Designation], [Department], [Institute], [Address]', email: '[email]', link: '[Submission link]' },
  { number: 'SS02', title: '[Special Session Title]', motivation: '[A second invitation for a tightly scoped conversation across disciplines, methods and communities.]', topics: ['[Topic area]', '[Topic area]', '[Topic area]', '[Topic area]'], organizer: '[Organizer Name] · [Designation], [Department], [Institute], [Address]', email: '[email]', link: '[Submission link]' },
];

function SpecialSessions() {
  usePageMeta('Special Sessions', 'Focused research tracks on emerging topics at CONF 2026.');
  return <PageShell pageLabel="Focused research tracks" showHero={false}><section className="pattern-waves px-5 py-24 lg:px-10 reveal"><div className="mx-auto max-w-[1120px]"><SectionHeading eyebrow="Beyond the main tracks" title="Special sessions" children="Focused research tracks on emerging topics. Each session is a smaller room inside the larger conversation—specific enough to go deep, open enough to make a new connection." /><div className="mt-12 grid gap-7">{sessions.map((session) => <article key={session.number} data-testid={`card-special-session-${session.number}`} className="overflow-hidden rounded-2xl border border-blue-900/10 bg-[#f7faff]/75 shadow-lg shadow-blue-900/5"><div className="pattern-hex flex flex-col justify-between gap-5 border-b border-cyan-300/20 p-7 md:flex-row md:items-end"><div><p className="font-mono-brand text-xs tracking-[.17em] text-cyan-100">{session.number} / SPECIAL SESSION</p><h2 className="mt-4 font-display text-3xl font-semibold text-slate-50 md:text-4xl">{session.title}</h2></div><span className="rounded-full border border-cyan-200/30 px-3 py-1.5 font-mono-brand text-[10px] uppercase tracking-[.13em] text-cyan-100">Accepting proposals</span></div><div className="grid gap-10 p-7 lg:grid-cols-[1.15fr_.85fr]"><div><h3 className="font-display text-xl font-semibold">Motivation and need for the special session</h3><p className="mt-3 text-sm leading-7 text-slate-600">{session.motivation}</p><h3 className="mt-9 font-display text-xl font-semibold">Topics of interest</h3><ul className="mt-4 grid gap-2 sm:grid-cols-2">{session.topics.map((topic) => <li key={topic} className="flex gap-2 text-sm text-slate-700"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />{topic}</li>)}</ul></div><div className="pattern-circuit rounded-xl border border-cyan-300/20 p-6 text-slate-100"><h3 className="font-display text-xl font-semibold">Session organizers</h3><p className="mt-4 text-sm leading-6 text-slate-300">{session.organizer}</p><a href={`mailto:${session.email}`} data-testid={`link-session-email-${session.number}`} className="mt-3 inline-flex items-center gap-2 text-sm text-cyan-200 hover:text-cyan-100"><Mail size={15} />{session.email}</a><div className="mt-8 border-t border-cyan-200/15 pt-6"><h3 className="font-display text-xl font-semibold">Submission details</h3><a href="#" data-testid={`link-session-submit-${session.number}`} className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-200">{session.link} <ExternalLink size={14} /></a><p className="mt-3 text-xs leading-6 text-slate-400">Select track as: <span className="text-slate-200">{session.number}: {session.title}</span><br />Last submission: [Date]<br />Decision notification: [Date]</p></div></div></div></article>)}</div></div></section></PageShell>;
}

function Registration() {
  usePageMeta(
    'Registration',
    'Registration fees, payment steps and participant notes for I-AM-ComCyS 2027.'
  );

  const fees = [
    ['Author-student', '8,000', '7,000', '120', '100'],
    ['Author-Academician', '9,000', '8,000', '140', '130'],
    ['Author-Industry person', '10,000', '9,000', '150', '140'],
    ['Listener / Accompanying Person', '5,000', '5,000', '80', '70'],
  ];

  return (
    <PageShell pageLabel="Make your place in the room" showHero={false}>
      <section className="pattern-grid px-5 py-24 lg:px-10 reveal">
        <div className="mx-auto max-w-[1120px]">

          <SectionHeading
            eyebrow="Registration fee"
            title="Choose your way in."
            children="Every registration supports the room around the paper: thoughtful review, a welcoming programme and the shared infrastructure of the conference."
          />

          <div className="mt-10 overflow-x-auto rounded-2xl border border-blue-900/15 bg-[#f7faff]/75">
            <table className="w-full min-w-[900px] border-collapse text-center text-sm">
              <thead className="pattern-hex text-slate-50">
                <tr>
                  <th
                    rowSpan={2}
                    className="px-5 py-4 font-mono-brand text-[10px] uppercase tracking-[.14em]"
                  >
                    Category
                  </th>

                  <th
                    colSpan={2}
                    className="px-5 py-4 font-mono-brand text-[10px] uppercase tracking-[.14em]"
                  >
                    Indian (INR)
                  </th>

                  <th
                    colSpan={2}
                    className="px-5 py-4 font-mono-brand text-[10px] uppercase tracking-[.14em]"
                  >
                    Foreigner (US$)
                  </th>
                </tr>

                <tr>
                  <th className="border-t border-cyan-200/20 px-5 py-3 font-mono-brand text-[10px] uppercase tracking-[.1em]">
                    IEEE Non-membership
                  </th>

                  <th className="border-t border-cyan-200/20 px-5 py-3 font-mono-brand text-[10px] uppercase tracking-[.1em]">
                    IEEE Membership
                  </th>

                  <th className="border-t border-cyan-200/20 px-5 py-3 font-mono-brand text-[10px] uppercase tracking-[.1em]">
                    IEEE Non-membership
                  </th>

                  <th className="border-t border-cyan-200/20 px-5 py-3 font-mono-brand text-[10px] uppercase tracking-[.1em]">
                    IEEE Membership
                  </th>
                </tr>
              </thead>

              <tbody>
                {fees.map(
                  (
                    [
                      category,
                      indianNonMember,
                      indianMember,
                      foreignNonMember,
                      foreignMember,
                    ],
                    index
                  ) => (
                    <tr
                      key={category}
                      className={cn(
                        'border-b border-blue-900/10',
                        index % 2 === 0 && 'bg-blue-100/25'
                      )}
                    >
                     <td className="px-5 py-4 text-left text-lg font-semibold text-blue-900">
  {category}
</td>

<td className="px-5 py-4 font-mono-brand text-lg font-normal text-slate-700">
  {indianNonMember}
</td>

<td className="px-5 py-4 font-mono-brand text-lg font-normal text-slate-700">
  {indianMember}
</td>

<td className="px-5 py-4 font-mono-brand text-lg font-normal text-slate-700">
  {foreignNonMember}
</td>

<td className="px-5 py-4 font-mono-brand text-lg font-normal text-slate-700">
  {foreignMember}
</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      <section className="pattern-circuit section-dark px-5 py-24 lg:px-10">
        <div className="mx-auto max-w-[1120px]">
          <SectionHeading
            eyebrow="A clear path to confirmed"
            title="Steps to pay for registration"
            dark
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">

            <article className="rounded-2xl border border-cyan-200/15 bg-slate-950/15 p-7">
              <h2 className="font-display text-2xl font-semibold">
                Indian authors / participants
              </h2>

              <ol className="mt-6 grid gap-4">
                {[
                  'Open the registration form and select your participant category.',
                  'Complete the online payment through [Payment Gateway].',
                  'Save the transaction receipt and upload proof where requested.',
                  'Wait for the confirmation email from the organizing desk.',
                ].map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-4 text-sm leading-6 text-slate-300"
                  >
                    <span className="font-mono-brand text-xs text-cyan-300">
                      0{index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </article>

            <article className="rounded-2xl border border-cyan-200/15 bg-slate-950/15 p-7">
              <h2 className="font-display text-2xl font-semibold">
                Foreign authors / participants
              </h2>

              <div className="mt-6 overflow-hidden rounded-lg border border-cyan-200/15">
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      ['Account name', '[Account name]'],
                      ['Bank', '[Bank name]'],
                      ['Address', '[Bank address]'],
                      ['Account no.', '[Account number]'],
                      ['IFSC', '[IFSC]'],
                      ['MICR', '[MICR]'],
                      ['AD code', '[AD code]'],
                      ['SWIFT', '[SWIFT]'],
                    ].map(([label, value]) => (
                      <tr
                        key={label}
                        className="border-b border-cyan-200/10 last:border-0"
                      >
                        <td className="w-1/3 px-3 py-2 text-slate-400">
                          {label}
                        </td>

                        <td className="px-3 py-2 text-cyan-100">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

          </div>
        </div>
      </section>

      <section className="pattern-dots px-5 py-24 lg:px-10">
        <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[1fr_.7fr]">

          <div>
            <SectionHeading
              eyebrow="Before you confirm"
              title="Registration notes"
            />

            <ul className="mt-7 grid gap-3">
              {[
                'Student registrations require a valid student ID proof.',
                'The fee includes applicable publication charges for accepted papers.',
                'On-site registration includes the conference kit and scheduled meals.',
                'Listeners receive access to sessions but not the full author kit.',
                'Extra page charges and maximum page limits follow the final call for papers.',
              ].map((note) => (
                <li
                  key={note}
                  className="flex gap-3 text-sm leading-7 text-slate-700"
                >
                  <Check
                    className="mt-1 shrink-0 text-blue-600"
                    size={17}
                  />
                  {note}
                </li>
              ))}
            </ul>
          </div>

          <div className="pattern-mesh rounded-2xl border border-cyan-300/25 p-7 text-slate-50">
            <Globe2 className="text-cyan-300" size={25} />

            <h2 className="mt-8 font-display text-3xl font-semibold">
              Ready to take a seat?
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              Use the official form to register. You can return to this page
              any time for payment details and notes.
            </p>

            <a
              href="[FORM URL]"
              data-testid="link-open-registration-form"
              className="button-pattern mt-7 inline-block rounded-lg px-5 py-3 text-xs font-extrabold uppercase tracking-[.13em]"
            >
              Open registration form
              <ArrowUpRight className="ml-1 inline" size={14} />
            </a>
          </div>

        </div>
      </section>
    </PageShell>
  );
}


function Contact() {
  usePageMeta(
    'Contact',
    'Contact the organizing committee of I-AM-ComCyS 2027 at NIT Silchar.'
  );

  return (
    <PageShell pageLabel="Get in touch" showHero={false}>
      <section className="pattern-grid px-5 py-24 lg:px-10 reveal">
        <div className="mx-auto max-w-[1120px]">
          <SectionHeading
            eyebrow="Contact the organising desk"
            title="We are here to help."
            children="For conference-related queries, please contact the organizing team at NIT Silchar."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="card-lift rounded-2xl border border-blue-900/10 bg-[#f7faff]/75 p-7">
              <Building2 className="text-blue-600" size={25} />

              <h2 className="mt-6 font-display text-2xl font-semibold">
                CSE Department
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Department of Computer Science and Engineering
                <br />
                NIT Silchar
                <br />
                Silchar, Assam, India
              </p>

              <a
                href="mailto:saroj@cse.nits.ac.in"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-cyan-700"
              >
                <Mail size={16} />
                saroj@cse.nits.ac.in
              </a>
            </article>

            <article className="card-lift rounded-2xl border border-blue-900/10 bg-[#f7faff]/75 p-7">
              <Building2 className="text-blue-600" size={25} />

              <h2 className="mt-6 font-display text-2xl font-semibold">
                ECE Department
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Department of Electronics and Communication Engineering
                <br />
                NIT Silchar
                <br />
                Silchar, Assam, India
              </p>

              <a
                href="mailto:banani@ece.nits.ac.in"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-cyan-700"
              >
                <Mail size={16} />
                banani@ece.nits.ac.in
              </a>
            </article>
          </div>

          <div className="pattern-mesh section-dark mt-8 rounded-2xl border border-cyan-300/20 p-8">
            <MapPin className="text-cyan-300" size={25} />

            <h2 className="mt-6 font-display text-3xl font-semibold">
              NIT Silchar
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              National Institute of Technology Silchar, Silchar, Assam, India.
            </p>

            <a
              href="https://www.nits.ac.in/"
              target="_blank"
              rel="noreferrer"
              className="button-pattern mt-6 inline-flex rounded-lg px-5 py-3 text-xs font-extrabold uppercase tracking-[.13em]"
            >
              Visit NIT Silchar
              <ExternalLink className="ml-1" size={14} />
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}





function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, [location]);

  return null;
}

function Router() {
  return <ErrorBoundary><Switch>
    <Route path="/" component={Home} />
    <Route path="/important-dates" component={ImportantDatesPage} />
    <Route path="/committee" component={Committee} />
    <Route path="/committee.html" component={Committee} />
    <Route path="/call-for-papers" component={CallForPapers} />
    <Route path="/call-for-papers.html" component={CallForPapers} />
    <Route path="/submission" component={Submission} />
    <Route path="/submission.html" component={Submission} />
    <Route path="/special-sessions" component={SpecialSessions} />
    <Route path="/special_session" component={SpecialSessions} />
    <Route path="/special_session.html" component={SpecialSessions} />
    <Route path="/registration" component={Registration} />
    <Route path="/registration.html" component={Registration} />
    
    <Route path="/contact" component={Contact} />
    <Route component={NotFound} />
  </Switch></ErrorBoundary>;
}

function App() {

useEffect(() => {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  window.scrollTo(0, 0);
}, []);


  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <ScrollToTop />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;