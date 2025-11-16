import * as React from 'react';
import { cn } from '@/lib/utils';

export const Textarea = (props: any) => {
  return <textarea className={cn('w-full rounded border px-3 py-2', props.className)} {...props} />;
};

export default Textarea;
