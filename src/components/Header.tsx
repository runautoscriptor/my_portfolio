import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { fadeUp } from '../animations/variants';
import { navItems, profile, socialLinks } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';
import { ThemeToggle } from './ThemeToggle';

const sectionIds = navItems.map((item) => item.id);
const MOBILE_NAV_BREAKPOINT = '(min-width: 1024px)';
const MOBILE_NAV_CLOSE_DELAY_MS = 320;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pendingSection, setPendingSection] = useState<string | null>(null);
  const pendingTimeoutRef = useRef<number | null>(null);
  const headerPanelRef = useRef<HTMLDivElement | null>(null);
  const observedSection = useActiveSection(sectionIds);
  const activeSection = pendingSection ?? observedSection;

  useEffect(() => {
    return () => {
      if (pendingTimeoutRef.current) {
        window.clearTimeout(pendingTimeoutRef.current);
      }
    };
  }, []);

  const isDesktopViewport = () => window.matchMedia(MOBILE_NAV_BREAKPOINT).matches;

  const scrollMobileSection = (targetSection: HTMLElement) => {
    const headerHeight = headerPanelRef.current?.getBoundingClientRect().height ?? 92;
    const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY;
    const scrollTarget = Math.max(0, sectionTop - headerHeight - 12);

    window.scrollTo({
      top: scrollTarget,
      behavior: 'smooth',
    });
  };

  const scrollToSection = (sectionId: string) => {
    if (pendingTimeoutRef.current) {
      window.clearTimeout(pendingTimeoutRef.current);
    }

    const targetSection = document.getElementById(sectionId);

    if (!targetSection) {
      return;
    }

    setPendingSection(sectionId);

    const desktopViewport = isDesktopViewport();
    const performScroll = () => {
      if (desktopViewport) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      scrollMobileSection(targetSection);
    };

    if (!desktopViewport && isMenuOpen) {
      setIsMenuOpen(false);
      window.setTimeout(performScroll, MOBILE_NAV_CLOSE_DELAY_MS);
    } else {
      setIsMenuOpen(false);
      performScroll();
    }

    pendingTimeoutRef.current = window.setTimeout(() => {
      setPendingSection(null);
    }, desktopViewport ? 900 : 1200);
  };

  return (
    <motion.header
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="fixed inset-x-0 top-0 z-40 px-4 pt-4"
    >
      <div className="section-shell">
        <div
          ref={headerPanelRef}
          className="glass-panel rounded-[2rem] px-4 py-3 sm:px-5 lg:rounded-full lg:px-6 lg:py-4"
        >
          <div className="flex items-center justify-between gap-4 lg:grid lg:grid-cols-[minmax(220px,auto)_1fr_auto] lg:gap-6">
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-3 text-left lg:min-w-[15rem]"
            >
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] shadow-[0_10px_30px_rgba(2,6,23,0.10)]">
                {profile.image ? (
                  <img
                    src={profile.image}
                    alt={`${profile.name} avatar`}
                    loading="eager"
                    decoding="async"
                    className="h-full w-full scale-[1] object-cover object-[center_12%] opacity-100 blur-0 filter-none [image-rendering:auto] [transform:translateZ(0)]"
                  />
                ) : (
                  <span className="font-display text-sm font-bold tracking-[0.24em]">
                    {profile.name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')
                      .slice(0, 2)}
                  </span>
                )}
              </span>
              <span className="hidden min-[420px]:block">
                <span className="block text-sm font-semibold text-[var(--text-heading)]">
                  {profile.name}
                </span>
                <span className="block text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">
                  QA ENGINEER
                </span>
              </span>
            </button>

            <nav className="hidden justify-self-center lg:flex">
              <div className="theme-nav-shell relative flex items-center gap-1 rounded-full px-1 py-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className={`theme-nav-button relative rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                        isActive ? 'theme-nav-button-active' : ''
                      }`}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="active-nav-highlight"
                          className="theme-nav-highlight absolute inset-0 rounded-full"
                          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                        />
                      ) : null}
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>

            <div className="hidden items-center justify-self-end gap-2 lg:flex">
              {socialLinks.slice(0, 2).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="theme-outline-button rounded-full px-4 py-2 text-sm transition-transform duration-300 hover:-translate-y-1"
                >
                  {link.label}
                </a>
              ))}
              <ThemeToggle />
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setIsMenuOpen((currentState) => !currentState)}
                className="theme-control rounded-full p-3"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="overflow-hidden lg:hidden"
              >
                <div className="mt-4 space-y-2 border-t border-[var(--border-soft)] pt-4">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => scrollToSection(item.id)}
                        className={`block w-full rounded-2xl px-4 py-3 text-left text-sm transition-colors duration-300 ${
                          isActive
                            ? 'theme-nav-highlight text-[var(--text-heading)]'
                            : 'theme-surface text-[var(--text-secondary)]'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                  <a
                    href={socialLinks[0].href}
                    target="_blank"
                    rel="noreferrer"
                    className="theme-accent-chip block rounded-2xl px-4 py-3 text-sm"
                  >
                    GitHub
                  </a>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
