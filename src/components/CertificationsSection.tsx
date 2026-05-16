import { motion } from 'framer-motion';
import { ArrowUpRight, Award, Code2 } from 'lucide-react';
import { fadeUp, staggerContainer } from '../animations/variants';
import { certifications } from '../data/portfolio';
import { GlassPanel } from './GlassPanel';
import { SectionHeading } from './SectionHeading';

export function CertificationsSection() {
  return (
    <section id="certifications" className="section-anchor py-24 lg:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Certifications"
          title="Proof of QA depth backed by automation growth and developer learning."
          description="These certifications now highlight both testing expertise and developer understanding, helping recruiters see a stronger QA plus engineering profile."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-5 lg:mt-14 md:grid-cols-2 xl:grid-cols-3 lg:gap-6"
        >
          {certifications.map((certification) => (
            <motion.article
              key={certification.title}
              variants={fadeUp}
              whileHover={{ y: -8, rotateX: 1.6, rotateY: -1.6 }}
              className="[transform-style:preserve-3d]"
            >
              <GlassPanel className="card-shine h-full rounded-[2rem] p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="theme-accent-icon rounded-2xl p-3">
                    {certification.track === 'Developer Foundations' ? (
                      <Code2 size={20} />
                    ) : (
                      <Award size={20} />
                    )}
                  </div>
                  <span className="theme-chip rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em]">
                    {certification.track}
                  </span>
                </div>

                <h3 className="mt-8 font-display text-2xl text-[var(--text-heading)]">{certification.title}</h3>
                <p className="mt-3 text-sm text-[var(--text-soft)]">{certification.issuer}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent-muted)]">
                    {certification.issuedDate}
                  </p>
                  <span className="theme-success-pill rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em]">
                    {certification.status}
                  </span>
                </div>

                <div className="theme-surface mt-5 rounded-[1.4rem] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-muted)]">
                    Key Learning
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
                    {certification.keyLearning}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {certification.tags.map((tag) => (
                    <span key={tag} className="theme-chip rounded-full px-3 py-2 text-xs font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={certification.link}
                  target="_blank"
                  rel="noreferrer"
                  className="theme-outline-button mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-transform duration-300 hover:translate-x-1"
                >
                  Show credential
                  <ArrowUpRight size={16} />
                </a>
              </GlassPanel>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
