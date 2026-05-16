import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface TypingOptions {
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
}

export function useTypingEffect(
  phrases: string[],
  { typingSpeed = 72, deletingSpeed = 36, pauseMs = 1800 }: TypingOptions = {},
) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!phrases.length) {
      return;
    }

    if (prefersReducedMotion) {
      setDisplayText(phrases[0]);
      return;
    }

    const currentPhrase = phrases[phraseIndex % phrases.length];
    const finishedTyping = displayText === currentPhrase;
    const finishedDeleting = displayText.length === 0;

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && finishedTyping) {
      delay = pauseMs;
    }

    const timer = window.setTimeout(() => {
      if (!isDeleting && finishedTyping) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && finishedDeleting) {
        setIsDeleting(false);
        setPhraseIndex((currentIndex) => (currentIndex + 1) % phrases.length);
        return;
      }

      const nextLength = displayText.length + (isDeleting ? -1 : 1);
      setDisplayText(currentPhrase.slice(0, nextLength));
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    deletingSpeed,
    displayText,
    isDeleting,
    pauseMs,
    phraseIndex,
    phrases,
    prefersReducedMotion,
    typingSpeed,
  ]);

  return displayText;
}
