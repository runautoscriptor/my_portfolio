import { motion } from 'framer-motion';
import noiseTexture from '../assets/noise.svg';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const particles = [
  { left: '8%', top: '18%', delay: 0, duration: 16 },
  { left: '22%', top: '72%', delay: 1.6, duration: 18 },
  { left: '41%', top: '28%', delay: 0.7, duration: 14 },
  { left: '58%', top: '64%', delay: 2.1, duration: 17 },
  { left: '76%', top: '22%', delay: 1.3, duration: 15 },
  { left: '88%', top: '76%', delay: 2.8, duration: 19 },
];

export function BackgroundDecor() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="grid-backdrop absolute inset-0 opacity-40" />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: `url(${noiseTexture})` }}
      />

      <motion.div
        className="absolute -left-16 top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-[120px]"
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [0, 50, -20, 0], y: [0, -20, 30, 0], scale: [1, 1.12, 0.96, 1] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-4rem] top-[12%] h-80 w-80 rounded-full bg-teal-300/10 blur-[120px]"
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [0, -60, 14, 0], y: [0, 24, -18, 0], scale: [1, 0.92, 1.08, 1] }
        }
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-8rem] left-1/3 h-96 w-96 rounded-full bg-sky-500/8 blur-[140px]"
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [0, 18, -12, 0], y: [0, -40, 18, 0], scale: [1, 1.06, 0.98, 1] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {particles.map((particle) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan-200/30"
          style={{ left: particle.left, top: particle.top }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [-10, 16, -8],
                  opacity: [0.18, 0.48, 0.18],
                  scale: [1, 1.35, 1],
                }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
