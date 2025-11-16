import * as React from 'react';
import { cn } from '@/lib/utils';

export const Badge = ({ children, className, ...props }: any) => (
  <span className={cn('inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground', className)} {...props}>{children}</span>
);

export default Badge;
