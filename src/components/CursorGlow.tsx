import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export function CursorGlow() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isFinePointer, setIsFinePointer] = useState(false);

  const glowX = useMotionValue(-400);
  const glowY = useMotionValue(-400);
  const dotX = useMotionValue(-40);
  const dotY = useMotionValue(-40);

  const smoothGlowX = useSpring(glowX, { stiffness: 90, damping: 20, mass: 0.8 });
  const smoothGlowY = useSpring(glowY, { stiffness: 90, damping: 20, mass: 0.8 });
  const smoothDotX = useSpring(dotX, { stiffness: 260, damping: 28, mass: 0.4 });
  const smoothDotY = useSpring(dotY, { stiffness: 260, damping: 28, mass: 0.4 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');

    const updatePointerMode = () => {
      setIsFinePointer(mediaQuery.matches);
    };

    updatePointerMode();
    mediaQuery.addEventListener('change', updatePointerMode);

    return () => {
      mediaQuery.removeEventListener('change', updatePointerMode);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !isFinePointer) {
      return;
    }

    const handlePointerMove = (event: MouseEvent) => {
      glowX.set(event.clientX - 170);
      glowY.set(event.clientY - 170);
      dotX.set(event.clientX - 8);
      dotY.set(event.clientY - 8);
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [dotX, dotY, glowX, glowY, isFinePointer, prefersReducedMotion]);

  if (prefersReducedMotion || !isFinePointer) {
    return null;
  }

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-20 hidden h-[340px] w-[340px] rounded-full bg-cyan-300/10 blur-[100px] md:block"
        style={{ x: smoothGlowX, y: smoothGlowY }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-20 hidden h-4 w-4 rounded-full border border-cyan-100/40 bg-cyan-200/10 md:block"
        style={{ x: smoothDotX, y: smoothDotY }}
      />
    </>
  );
}
