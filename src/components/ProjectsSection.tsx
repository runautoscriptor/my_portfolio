import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, Code2, GitBranch, Layers, Terminal, Users } from 'lucide-react';
import { fadeUp, staggerContainer } from '../animations/variants';
import { profile, projects } from '../data/portfolio';
import { useResumeUrl } from '../hooks/useResumeUrl';
import { GlassPanel } from './GlassPanel';
import { SectionHeading } from './SectionHeading';

const codingProfiles: {
  title: string;
  stat: string;
  description: string;
  href: string;
  icon: LucideIcon;
}[] = [
    {
      title: 'LeetCode',
      stat: '250+ Problems Solved',
      description: 'Algorithm practice and challenge-driven improvement.',
      href: 'https://leetcode.com/u/vikas_rajput/',
      icon: Terminal,
    },
    {
      title: 'GeeksforGeeks',
      stat: '150+ Concepts Reviewed',
      description: 'Hands-on algorithm learning with quality explanations.',
      href: 'https://www.geeksforgeeks.org/user/vikas_rajpoot_19/practice/',
      icon: Layers,
    },
    {
      title: 'HackerRank',
      stat: 'Top 10% Rank',
      description: 'Problem solving across data structures and QA-friendly logic.',
      href: 'https://www.hackerrank.com/profile/vikas_rajput',
      icon: Code2,
    },
    {
      title: 'GitHub',
      stat: 'contributions',
      description: 'Open-source QA scripts and automation experiments.',
      href: 'https://github.com/vikaskumarsingh20',
      icon: GitBranch,
    },
    {
      title: 'LinkedIn',
      stat: 'QA connections',
      description: 'Building relationships and staying current with best practices.',
      href: 'https://www.linkedin.com/in/vikaskumarsingh24/',
      icon: Users,
    },
    {
      title: 'My Resume',
      stat: 'Downloadable PDF',
      description: 'Downloadable PDF showcasing my QA journey.',
      href: profile.resumeUrl,
      icon: ArrowUpRight,
    },
  ];

export function ProjectsSection() {
  const resumeUrl = useResumeUrl();
  const profileLinks = codingProfiles.map((item) =>
    item.title === 'My Resume'
      ? {
          ...item,
          href: resumeUrl,
        }
      : item,
  );

  return (
    <section id="projects" className="section-anchor scroll-mt-28 py-24 lg:scroll-mt-32 lg:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Projects"
          title="QA-focused work designed to make testing faster, sharper, and more repeatable."
          description="These portfolio projects highlight practical automation and validation systems that can grow with stronger engineering practices over time."
        />

        <div className="mt-12 grid gap-5 lg:mt-14 lg:gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(360px,1fr)]">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            className="grid gap-5 lg:grid-cols-2"
          >
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className={index === 0 ? 'lg:col-span-2' : ''}
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

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            className="flex xl:self-start"
          >
            <GlassPanel className="relative rounded-[2rem] p-6 sm:p-7">
              <div className="max-w-xl xl:max-w-none">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--accent-muted)]">
                  Consistency Over Time
                </p>
                <h2 className="mt-4 text-3xl font-display text-[var(--text-heading)]">
                  Proof of Work
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
                  Daily problem solving & continuous learning that shows my growth toward Automation QA.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-1">
                  {profileLinks.map(({ title, stat, description, href, icon: Icon }) => (
                    <motion.article
                      key={title}
                      whileHover={{ y: -6, scale: 1.01 }}
                      className="group theme-surface rounded-[2rem] border border-[var(--border-soft)] p-5 transition-transform duration-300"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(103,232,249,0.12)] text-[var(--accent-text)]">
                            <Icon size={20} />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-[var(--text-heading)]">{title}</p>
                            <p className="mt-1 text-xs text-[var(--text-muted)]">{description}</p>
                          </div>
                        </div>
                        <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-muted)]">
                          Profile
                        </p>
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-4">
                        <span className="text-sm font-semibold text-[var(--text-heading)]">{stat}</span>
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] px-3 py-2 text-xs font-semibold text-[var(--text-heading)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(56,189,248,0.12)]"
                        >
                          View Profile
                          <ArrowUpRight size={14} />
                        </a>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
