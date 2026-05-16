import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { fadeUp, staggerContainer } from '../animations/variants';
import { projects } from '../data/portfolio';
import { GlassPanel } from './GlassPanel';
import { SectionHeading } from './SectionHeading';

export function ProjectsSection() {
  return (
    <section id="projects" className="section-anchor py-24 lg:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Projects"
          title="QA-focused work designed to make testing faster, sharper, and more repeatable."
          description="These portfolio projects highlight practical automation and validation systems that can grow with stronger engineering practices over time."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="mt-12 grid gap-5 lg:mt-14 lg:gap-6 xl:grid-cols-3"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className={index === 0 ? 'xl:col-span-2' : ''}
            >
              <GlassPanel className="card-shine relative h-full rounded-[2rem] p-6 sm:p-7">
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span key={tag} className="theme-accent-chip rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em]">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="mt-6 font-display text-3xl text-[var(--text-heading)]">{project.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--text-soft)] sm:text-base">
                  {project.summary}
                </p>

                <div className="theme-surface rounded-[1.4rem] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--accent-muted)]">
                    Impact
                  </p>
                  <p className="mt-3 text-lg text-[var(--text-heading)]">{project.impact}</p>
                </div>

                <div className="mt-6 space-y-3">
                  {project.metrics.map((metric) => (
                    <div key={metric} className="theme-surface rounded-2xl px-4 py-3">
                      <p className="text-sm text-[var(--text-muted)]">{metric}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-4 text-sm">
                  <a
                    href={project.links.caseStudy}
                    target="_blank"
                    rel="noreferrer"
                    className="theme-primary-button inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold transition-transform duration-300 hover:-translate-y-1"
                  >
                    Case Study
                    <ArrowUpRight size={16} />
                  </a>
                  <a
                    href={project.links.source}
                    target="_blank"
                    rel="noreferrer"
                    className="theme-outline-button inline-flex items-center gap-2 rounded-full px-4 py-2 transition-transform duration-300 hover:-translate-y-1"
                  >
                    Source
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </GlassPanel>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
