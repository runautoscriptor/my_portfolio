import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  MapPin,
  ShieldCheck,
  Sparkles,
  Smartphone,
} from 'lucide-react';
import { fadeUp, slideFromLeft, slideFromRight, staggerContainer } from '../animations/variants';
import { heroPhrases, profile, socialLinks, stats } from '../data/portfolio';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { AnimatedStat } from './AnimatedStat';
import { GlassPanel } from './GlassPanel';
import { SocialIconButton } from './SocialIconButton';

const readinessPoints = [
  'Functional depth paired with release discipline',
  'Automation growing around high-value flows',
  'Clear reporting that helps teams move faster',
];

const focusAreas = [
  { title: 'Web QA', detail: 'Playwright and Cypress coverage', icon: ShieldCheck },
  { title: 'API Confidence', detail: 'Postman collections for REST checks', icon: Globe },
  { title: 'Mobile Quality', detail: 'Appium-backed smoke validation', icon: Smartphone },
];

export function HeroSection() {
  const typedPhrase = useTypingEffect(heroPhrases);

  return (
    <section id="home" className="section-anchor flex min-h-screen items-center pt-28">
      <div className="section-shell py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            variants={staggerContainer(0.14)}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.div
              variants={slideFromLeft}
              className="inline-flex items-center gap-3 rounded-full border border-cyan-300/18 bg-cyan-300/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-cyan-100"
            >
              <Sparkles size={16} />
              {profile.goal}
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-8 min-h-7 text-sm font-semibold uppercase tracking-[0.34em] text-[var(--text-muted)]"
            >
              {typedPhrase}
              <span className="ml-1 inline-block h-5 w-px animate-pulse bg-cyan-100 align-middle" />
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-5 font-display text-5xl leading-[0.96] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl"
            >
              {profile.heroTitle.split('automation').map((part, index, parts) => (
                <span key={`${part}-${index}`}>
                  {part}
                  {index < parts.length - 1 ? <span className="text-gradient">automation</span> : null}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base leading-8 text-[var(--text-soft)] sm:text-lg"
            >
              {profile.heroSummary}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap"
            >
              <button
                type="button"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-1"
              >
                Explore Projects
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm text-slate-100 transition-transform duration-300 hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-cyan-300/8"
              >
                Contact Me
                <ArrowRight size={16} />
              </button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              {socialLinks.map((link) => (
                <SocialIconButton key={link.label} link={link} />
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-5 text-sm text-[var(--text-muted)]"
            >
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} className="text-cyan-200" />
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-300" />
                {profile.availability}
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <GlassPanel className="card-shine rounded-[2rem] p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/70">
                    Quality Radar
                  </p>
                  <h2 className="mt-2 font-display text-2xl text-white sm:text-3xl">
                    Release readiness board
                  </h2>
                </div>
                <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">
                  Live QA
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm font-semibold text-white">Coverage blend</p>
                  <div className="mt-5 space-y-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between text-xs text-[var(--text-muted)]">
                        <span>Manual validation</span>
                        <span>92%</span>
                      </div>
                      <motion.div
                        className="h-2 rounded-full bg-cyan-300"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 0.92 }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                      />
                    </div>
                    <div>
                      <div className="mb-2 flex items-center justify-between text-xs text-[var(--text-muted)]">
                        <span>Automation depth</span>
                        <span>74%</span>
                      </div>
                      <motion.div
                        className="h-2 rounded-full bg-sky-400"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 0.74 }}
                        transition={{ duration: 1.2, delay: 0.55 }}
                      />
                    </div>
                    <div>
                      <div className="mb-2 flex items-center justify-between text-xs text-[var(--text-muted)]">
                        <span>API confidence</span>
                        <span>81%</span>
                      </div>
                      <motion.div
                        className="h-2 rounded-full bg-teal-300"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 0.81 }}
                        transition={{ duration: 1.2, delay: 0.7 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm font-semibold text-white">Current focus</p>
                  <div className="mt-5 space-y-3">
                    {readinessPoints.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300" />
                        <p className="text-sm leading-6 text-[var(--text-soft)]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {focusAreas.map((area) => {
                  const Icon = area.icon;

                  return (
                    <div
                      key={area.title}
                      className="rounded-[1.5rem] border border-white/10 bg-[var(--panel-soft)] p-5"
                    >
                      <Icon size={18} className="text-cyan-200" />
                      <p className="mt-4 text-sm font-semibold text-white">{area.title}</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                        {area.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </GlassPanel>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} stat={stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
