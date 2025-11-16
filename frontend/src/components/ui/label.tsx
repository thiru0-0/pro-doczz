import * as React from 'react';
import { cn } from '@/lib/utils';

export const Label = ({ children, className, ...props }: any) => (
  <label className={cn('block text-sm font-medium text-muted-foreground', className)} {...props}>{children}</label>
);

export default Label;
