import type { ElementType, ReactNode } from 'react';

interface GlassPanelProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

export function GlassPanel({
  as: Component = 'div',
  className = '',
  children,
}: GlassPanelProps) {
  return <Component className={`glass-panel ${className}`.trim()}>{children}</Component>;
}
