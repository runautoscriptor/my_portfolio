import { motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { fadeUp } from '../animations/variants';
import { navItems, profile, socialLinks } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';

const sectionIds = navItems.map((item) => item.id);

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="fixed inset-x-0 top-0 z-40 px-4 pt-4"
    >
      <div className="section-shell">
        <div className="glass-panel rounded-full px-4 py-3 sm:px-5">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-3 text-left"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 font-display text-sm font-bold tracking-[0.24em] text-cyan-100">
                QA
              </span>
              <span className="hidden min-[420px]:block">
                <span className="block text-sm font-semibold text-white">{profile.role}</span>
                <span className="block text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">
                  {/* Premium portfolio */}
                </span>
              </span>
            </button>

            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                      isActive
                        ? 'bg-cyan-300/14 text-cyan-100'
                        : 'text-slate-300 hover:bg-white/6 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              {socialLinks.slice(0, 2).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition-transform duration-300 hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-cyan-300/10"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-1"
              >
                Let&apos;s talk
                <ArrowUpRight size={16} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen((currentState) => !currentState)}
              className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-100 lg:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {isMenuOpen ? (
            <div className="mt-4 space-y-2 border-t border-white/10 pt-4 lg:hidden">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full rounded-2xl bg-white/5 px-4 py-3 text-left text-sm text-slate-200 transition-colors duration-300 hover:bg-white/8"
                >
                  {item.label}
                </button>
              ))}
              <a
                href={socialLinks[0].href}
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100"
              >
                GitHub
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </motion.header>
  );
}
