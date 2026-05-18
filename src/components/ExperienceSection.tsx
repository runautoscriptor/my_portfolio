import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, MapPin } from 'lucide-react';
import { fadeUp, lineReveal, staggerContainer } from '../animations/variants';
import { experienceItems } from '../data/portfolio';
import { GlassPanel } from './GlassPanel';
import { SectionHeading } from './SectionHeading';

export function ExperienceSection() {
  return (
    <section id="experience" className="section-anchor scroll-mt-28 py-24 lg:scroll-mt-32 lg:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Experience"
          title="Hands-on QA experience shaped around real releases and growing automation ownership."
          description="These roles reflect a progression from foundational QA execution into broader quality engineering responsibility across web, mobile, and API flows."
        />

        <motion.div
          variants={staggerContainer(0.14)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="relative mt-12 space-y-8 lg:mt-14 lg:space-y-10"
        >
          <motion.div
            variants={lineReveal}
            className="absolute left-[0.95rem] top-4 hidden h-[calc(100%-2rem)] w-px origin-top bg-gradient-to-b from-cyan-300 via-sky-400 to-transparent md:block"
          />

          {experienceItems.map((item) => (
            <motion.article
              key={`${item.company}-${item.period}`}
              variants={fadeUp}
              className="relative md:pl-12"
            >
              <div className="theme-accent-icon absolute left-0 top-6 hidden h-8 w-8 items-center justify-center rounded-full md:flex">
                <Briefcase size={16} />
              </div>

              <GlassPanel className="card-shine rounded-[2rem] p-6 sm:p-8">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-muted)]">
                      {item.type}
                    </p>
                    <h3 className="mt-3 font-display text-3xl text-[var(--text-heading)]">{item.role}</h3>
                    <p className="mt-2 text-lg text-[var(--text-secondary)]">{item.company}</p>
                  </div>

                  <div className="grid gap-3 text-sm text-[var(--text-muted)] sm:grid-cols-2 lg:min-w-[16rem] lg:text-right">
                    <span className="inline-flex items-center gap-2 lg:justify-end">
                      <Calendar size={16} className="text-[var(--accent-text)]" />
                      {item.period}
                    </span>
                    <span className="inline-flex items-center gap-2 lg:justify-end">
                      <MapPin size={16} className="text-[var(--accent-text)]" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-7 text-[var(--text-soft)] sm:text-base">
                  {item.summary}
                </p>

                <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="space-y-3">
                    {item.achievements.map((achievement) => (
                      <div key={achievement} className="flex gap-3">
                        <CheckCircle2 size={18} className="mt-1 shrink-0 text-[var(--accent-text)]" />
                        <p className="text-sm leading-7 text-[var(--text-muted)]">{achievement}</p>
                      </div>
                    ))}
                  </div>

                  <div className="theme-surface rounded-[1.6rem] p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-muted)]">
                      Stack touched
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {item.stack.map((tech) => (
                        <span key={tech} className="theme-chip rounded-full px-3 py-2 text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
