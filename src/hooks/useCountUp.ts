import { useEffect, useRef, useState } from 'react';

export function useCountUp(
  targetValue: number,
  isActive: boolean,
  duration = 1600,
  decimals = 0,
) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const startedAt = performance.now();

    const animate = (timestamp: number) => {
      const progress = Math.min((timestamp - startedAt) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = targetValue * easedProgress;

      setCount(Number(currentValue.toFixed(decimals)));

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(animate);
      }
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
    };
  }, [decimals, duration, isActive, targetValue]);

  return count;
}
