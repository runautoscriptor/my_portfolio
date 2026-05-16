import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { fadeUp, lineReveal, slideFromLeft, staggerContainer } from '../animations/variants';
import { aboutTimeline, profile } from '../data/portfolio';
import { GlassPanel } from './GlassPanel';
import { SectionHeading } from './SectionHeading';

export function AboutSection() {
  return (
    <section id="about" className="section-anchor py-24 lg:py-28">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-14 xl:gap-16 lg:text-lg  ">
        <motion.div
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionHeading
            eyebrow="About"
            title="Quality work that connects detail, speed, and product trust."
            description="I approach testing as more than bug finding. The goal is to reduce release uncertainty, give teams fast signal, and steadily transform manual effort into dependable automation."
          />

          <GlassPanel className="mt-8 rounded-[2rem] p-7">
            <div className="flex items-start gap-4">
              <div className="theme-accent-icon rounded-2xl p-3">
                <Target size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent-muted)]">
                  Career direction
                </p>
                <p className="mt-4 text-base leading-8 text-[var(--text-soft)]">
                  {profile.goal}. I&apos;m especially interested in building stronger test frameworks,
                  growing automation strategy, and contributing to teams that treat quality as an
                  engineering discipline.
                </p>
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.14)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          <motion.div
            variants={lineReveal}
            className="absolute left-[0.95rem] top-3 hidden h-[calc(100%-1.5rem)] w-px origin-top bg-gradient-to-b from-cyan-300 via-sky-400 to-transparent md:block"
          />

          <div className="space-y-6">
            {aboutTimeline.map((item) => (
              <motion.div
                key={item.year}
                variants={fadeUp}
                className="relative md:pl-12"
              >
                <div className="theme-accent-icon absolute left-0 top-2 hidden h-8 w-8 items-center justify-center rounded-full text-xs font-semibold md:flex">
                  {item.year.slice(0, 2)}
                </div>
                <GlassPanel className="rounded-[1.8rem] p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="font-display text-2xl text-[var(--text-heading)]">{item.title}</h3>
                    <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-muted)]">
                      {item.year}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-muted)] sm:text-base">
                    {item.description}
                  </p>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
