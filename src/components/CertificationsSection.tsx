import { motion } from 'framer-motion';
import { ArrowUpRight, Award } from 'lucide-react';
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
          title="Proof of continued QA growth and automation-focused learning."
          description="This section is intentionally easy to update later from the central data file, so credential links and issuers can be swapped without touching component code."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-6"
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
                    <Award size={20} />
                  </div>
                  <span className="theme-success-pill rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em]">
                    {certification.status}
                  </span>
                </div>

                <h3 className="mt-8 font-display text-2xl text-[var(--text-heading)]">{certification.title}</h3>
                <p className="mt-3 text-sm text-[var(--text-soft)]">{certification.issuer}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.24em] text-[var(--accent-muted)]">
                  {certification.year}
                </p>

                <a
                  href={certification.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--accent-text)] transition-transform duration-300 hover:translate-x-1"
                >
                  View credential
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
