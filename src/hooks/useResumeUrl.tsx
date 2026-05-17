import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { profile } from '../data/portfolio';

const RESUME_STORAGE_KEY = 'portfolio-resume-url';

interface ResumeContextValue {
  resumeUrl: string;
}

const ResumeContext = createContext<ResumeContextValue | null>(null);

function isEditableElement(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.isContentEditable ||
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT'
  );
}

function isValidResumeUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function resolveInitialResumeUrl() {
  if (typeof window === 'undefined') {
    return profile.resumeUrl;
  }

  const storedUrl = window.localStorage.getItem(RESUME_STORAGE_KEY)?.trim();

  return storedUrl && isValidResumeUrl(storedUrl) ? storedUrl : profile.resumeUrl;
}

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeUrl, setResumeUrl] = useState(resolveInitialResumeUrl);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== RESUME_STORAGE_KEY) {
        return;
      }

      const nextUrl = event.newValue?.trim();
      setResumeUrl(nextUrl && isValidResumeUrl(nextUrl) ? nextUrl : profile.resumeUrl);
    };

    const handleShortcut = (event: KeyboardEvent) => {
      if (isEditableElement(event.target)) {
        return;
      }

      if (!(event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'r')) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const nextUrl = window.prompt(
        'Enter new resume URL. Leave empty to reset to the default link.',
        resumeUrl,
      );

      if (nextUrl === null) {
        return;
      }

      const trimmedUrl = nextUrl.trim();

      if (!trimmedUrl) {
        window.localStorage.removeItem(RESUME_STORAGE_KEY);
        setResumeUrl(profile.resumeUrl);
        window.alert('Resume URL reset to the default profile link.');
        return;
      }

      if (!isValidResumeUrl(trimmedUrl)) {
        window.alert('Please enter a valid absolute http(s) resume URL.');
        return;
      }

      window.localStorage.setItem(RESUME_STORAGE_KEY, trimmedUrl);
      setResumeUrl(trimmedUrl);
      window.alert('Resume URL updated successfully.');
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('keydown', handleShortcut);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('keydown', handleShortcut);
    };
  }, [resumeUrl]);

  const value = useMemo(
    () => ({
      resumeUrl,
    }),
    [resumeUrl],
  );

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}

export function useResumeUrl() {
  const resumeContext = useContext(ResumeContext);

  if (!resumeContext) {
    throw new Error('useResumeUrl must be used within a ResumeProvider.');
  }

  return resumeContext.resumeUrl;
}
