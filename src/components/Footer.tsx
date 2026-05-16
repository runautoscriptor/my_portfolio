import { profile } from '../data/portfolio';

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-soft)] py-8 lg:py-10">
      <div className="section-shell flex flex-col gap-2 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          {/* {new Date().getFullYear()} {profile.role} portfolio. */}
         {new Date().getFullYear()} {profile.role} • Manual → Automation Journey.
        </p>
        <p>Focused on quality, performance, and seamless user experiences.</p>
      </div>
    </footer>
  );
}
