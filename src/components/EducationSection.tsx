import { motion } from 'framer-motion';
import { fadeUp, lineReveal, staggerContainer } from '../animations/variants';
import { educationItems } from '../data/portfolio';
import { SectionHeading } from './SectionHeading';

export function EducationSection() {
  return (
    <section id="education" className="section-anchor scroll-mt-28 py-24 lg:scroll-mt-32 lg:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Education"
          title="Academic roots that shaped my technical thinking and learning discipline."
          description="A focused education journey that built the programming, problem-solving, and analytical foundation behind my QA and automation growth."
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="relative mt-12 lg:mt-14"
        >
          <motion.div
            variants={lineReveal}
            className="absolute left-[9rem] top-3 hidden h-[calc(100%-1.5rem)] w-px origin-top bg-gradient-to-b from-cyan-300 via-sky-400 to-transparent lg:block"
          />

          <div className="space-y-8 lg:space-y-10">
            {educationItems.map((item) => (
              <motion.article
                key={`${item.year}-${item.course}`}
                variants={fadeUp}
                className="group border-b border-[var(--border-soft)] pb-8 last:border-b-0 last:pb-0 lg:grid lg:grid-cols-[8rem_minmax(0,1fr)] lg:gap-10"
              >
                <div className="flex items-center gap-3 lg:items-start lg:justify-end lg:pt-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_24px_var(--glow)] lg:hidden" />
                  <p className="font-display text-2xl tracking-[-0.05em] text-[var(--text-heading)] transition-colors duration-300 group-hover:text-[var(--accent-text)] sm:text-3xl lg:text-right">
                    {item.year}
                  </p>
                </div>

                <div className="relative lg:pl-10">
                  <span className="absolute left-0 top-3 hidden h-3 w-3 -translate-x-[calc(50%+1.25rem)] rounded-full border border-[var(--accent-border)] bg-[var(--background-elevated)] shadow-[0_0_0_8px_var(--background)] transition-colors duration-300 group-hover:border-[var(--border-strong)] lg:block" />
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-muted)]">
                    {item.institution}
                  </p>
                  <h3 className="mt-3 font-display text-2xl text-[var(--text-heading)] sm:text-[2rem]">
                    {item.course}
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-soft)] sm:text-base">
                    {item.learning}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
