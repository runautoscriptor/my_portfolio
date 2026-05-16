import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeUp } from '../animations/variants';
import type { StatItem } from '../data/portfolio';
import { useCountUp } from '../hooks/useCountUp';

interface AnimatedStatProps {
  stat: StatItem;
}

export function AnimatedStat({ stat }: AnimatedStatProps) {
  const statRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(statRef, { once: true, amount: 0.6 });
  const count = useCountUp(stat.value, isInView);

  return (
    <motion.div
      ref={statRef}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.45 }}
      whileHover={{ y: -6 }}
      className="glass-panel rounded-[1.6rem] p-5"
    >
      <p className="font-display text-4xl text-white sm:text-5xl">
        {count}
        {stat.suffix}
      </p>
      <p className="mt-4 text-sm font-semibold text-slate-100">{stat.label}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{stat.description}</p>
    </motion.div>
  );
}
