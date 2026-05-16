import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { fadeUp, staggerContainer } from '../animations/variants';
import { projects } from '../data/portfolio';
import { GlassPanel } from './GlassPanel';
import { SectionHeading } from './SectionHeading';

export function ProjectsSection() {
  return (
    <section id="projects" className="section-anchor py-24">
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
          className="mt-12 grid gap-5 xl:grid-cols-3"
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
                    <span
                      key={tag}
                      className="rounded-full border border-cyan-300/18 bg-cyan-300/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="mt-6 font-display text-3xl text-white">{project.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--text-soft)] sm:text-base">
                  {project.summary}
                </p>

                <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200/70">
                    Impact
                  </p>
                  <p className="mt-3 text-lg text-white">{project.impact}</p>
                </div>

                <div className="mt-6 space-y-3">
                  {project.metrics.map((metric) => (
                    <div key={metric} className="rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3">
                      <p className="text-sm text-[var(--text-muted)]">{metric}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-4 text-sm">
                  <a
                    href={project.links.caseStudy}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-1"
                  >
                    Case Study
                    <ArrowUpRight size={16} />
                  </a>
                  <a
                    href={project.links.source}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-100 transition-transform duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-cyan-300/10"
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
