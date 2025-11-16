import * as React from 'react';
import { cn } from '@/lib/utils';

export const Input = (props: any) => <input className={cn('w-full rounded border px-3 py-2', props.className)} {...props} />;

export default Input;
