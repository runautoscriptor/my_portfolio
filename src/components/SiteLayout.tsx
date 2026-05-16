import type { ReactNode } from 'react';
import { BackgroundDecor } from './BackgroundDecor';
import { CursorGlow } from './CursorGlow';

interface SiteLayoutProps {
  children: ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      <BackgroundDecor />
      <CursorGlow />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
