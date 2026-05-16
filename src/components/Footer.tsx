import { profile } from '../data/portfolio';

export function Footer() {
  return (
    <footer className="border-t border-white/8 py-8">
      <div className="section-shell flex flex-col gap-2 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          {new Date().getFullYear()} {profile.role} portfolio.
        </p>
        <p>Content is centralized in the data layer for easy replacement later.</p>
      </div>
    </footer>
  );
}
