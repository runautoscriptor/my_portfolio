import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../animations/variants';
import { profile } from '../data/portfolio';

const loaderTags = ['Manual QA', 'Automation', 'API Validation'];

export function LoaderScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(3,6,15,0.96)] px-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45 } }}
    >
      <motion.div
        variants={staggerContainer(0.16)}
        initial="hidden"
        animate="visible"
        className="glass-panel max-w-xl rounded-[2rem] px-6 py-8 text-center sm:px-10 sm:py-10"
      >
        <motion.p
          variants={fadeUp}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.36em] text-cyan-200/75"
        >
          {profile.role}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="font-display text-3xl leading-tight text-white sm:text-4xl"
        >
          Loading the QA command center
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-4 text-sm leading-7 text-[var(--text-muted)]"
        >
          Preparing the premium portfolio experience with testing highlights, automation work,
          and release-ready signals.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8">
          <div className="loader-scan h-2 rounded-full bg-white/6" />
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-7 grid gap-3 text-xs uppercase tracking-[0.22em] text-slate-300 sm:grid-cols-3"
        >
          {loaderTags.map((tag) => (
            <div
              key={tag}
              className="rounded-full border border-white/10 bg-white/4 px-4 py-3"
            >
              {tag}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
