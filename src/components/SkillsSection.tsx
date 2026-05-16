import { motion } from 'framer-motion';
import { Bot, Bug, Globe, Smartphone } from 'lucide-react';
import { fadeUp, staggerContainer } from '../animations/variants';
import { skillCategories, type SkillIcon } from '../data/portfolio';
import { SectionHeading } from './SectionHeading';

const skillIconMap: Record<SkillIcon, typeof Bug> = {
  manual: Bug,
  automation: Bot,
  mobile: Smartphone,
  api: Globe,
};

export function SkillsSection() {
  return (
    <section id="skills" className="section-anchor py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Skills"
          title="A balanced QA stack, from exploratory depth to automation acceleration."
          description="The portfolio is structured around practical testing work: uncovering issues manually, automating stable paths, validating APIs, and expanding quality across mobile experiences."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="mt-12 grid gap-5 lg:grid-cols-2"
        >
          {skillCategories.map((category) => {
            const Icon = skillIconMap[category.icon];

            return (
              <motion.article
                key={category.title}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.01 }}
                className="card-shine glass-panel rounded-[2rem] p-6 sm:p-7"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl border border-cyan-300/18 bg-cyan-300/10 p-3 text-cyan-100">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
                        {category.badge}
                      </p>
                      <h3 className="mt-3 font-display text-2xl text-white">{category.title}</h3>
                    </div>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/8 sm:max-w-[8rem]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-sky-400"
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-[var(--text-muted)] sm:text-base">
                  {category.summary}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
