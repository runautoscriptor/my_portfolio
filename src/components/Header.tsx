import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { fadeUp } from '../animations/variants';
import { navItems, profile, socialLinks } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';
import { ThemeToggle } from './ThemeToggle';

const sectionIds = navItems.map((item) => item.id);

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pendingSection, setPendingSection] = useState<string | null>(null);
  const pendingTimeoutRef = useRef<number | null>(null);
  const observedSection = useActiveSection(sectionIds);
  const activeSection = pendingSection ?? observedSection;

  useEffect(() => {
    return () => {
      if (pendingTimeoutRef.current) {
        window.clearTimeout(pendingTimeoutRef.current);
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (pendingTimeoutRef.current) {
      window.clearTimeout(pendingTimeoutRef.current);
    }

    setPendingSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);

    pendingTimeoutRef.current = window.setTimeout(() => {
      setPendingSection(null);
    }, 900);
  };

  return (
    <motion.header
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="fixed inset-x-0 top-0 z-40 px-4 pt-4"
    >
      <div className="section-shell">
        <div className="glass-panel rounded-[2rem] px-4 py-3 sm:px-5 lg:rounded-full lg:px-6 lg:py-4">
          <div className="flex items-center justify-between gap-4 lg:grid lg:grid-cols-[minmax(220px,auto)_1fr_auto] lg:gap-6">
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-3 text-left lg:min-w-[15rem]"
            >
              <span className=" flex h-11 w-11 items-center justify-center rounded-full overflow-hidden ">
                {profile.image ? (
                  <img
                    src={profile.image}
                    alt={`${profile.name} avatar`}
                    className="h-full w-full object-cover"
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
              {/* <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="theme-primary-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-transform duration-300 hover:-translate-y-1"
              >
                Let&apos;s talk
                <ArrowUpRight size={16} />
              </button> */}
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
