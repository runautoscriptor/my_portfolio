import { motion } from 'framer-motion';
import { fadeUp } from '../animations/variants';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left';

  return (
    <motion.div
      className={`max-w-2xl ${alignment} ${className}`.trim()}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.38em] text-[var(--accent-muted)]">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl leading-tight text-[var(--text-heading)] sm:text-4xl lg:text-4xl">
        {title}
      </h2>
      <p className="mt-5 text-sm leading-7 text-[var(--text-muted)] sm:text-base">
        {description}
      </p>
    </motion.div>
  );
}
