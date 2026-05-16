import { ArrowUpRight, Briefcase, GitBranch, Mail } from 'lucide-react';
import type { SocialLink } from '../data/portfolio';

interface SocialIconButtonProps {
  link: SocialLink;
  variant?: 'soft' | 'solid';
}

const iconMap = {
  github: GitBranch,
  linkedin: Briefcase,
  mail: Mail,
} as const;

export function SocialIconButton({
  link,
  variant = 'soft',
}: SocialIconButtonProps) {
  const Icon = iconMap[link.icon];
  const variantStyles =
    variant === 'solid'
      ? 'theme-primary-button'
      : 'theme-outline-button';

  return (
    <a
      href={link.href}
      target={link.href.startsWith('mailto:') ? undefined : '_blank'}
      rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-transform duration-300 hover:-translate-y-1 ${variantStyles}`}
      aria-label={link.label}
    >
      <Icon size={16} />
      <span>{link.label}</span>
      <ArrowUpRight size={14} className="opacity-70" />
    </a>
  );
}
