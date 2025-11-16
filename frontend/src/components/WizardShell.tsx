import React from 'react';
import { Button } from '@/components/ui/button';

interface WizardShellProps {
  step: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  children: React.ReactNode;
}

export default function WizardShell({ step, totalSteps, onNext, onBack, children }: WizardShellProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <div className="mb-4">
        <div className="text-sm text-muted">Step {step} of {totalSteps}</div>
      </div>
      <div className="mb-6">{children}</div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={step <= 1}>Back</Button>
        <Button onClick={onNext}>{step >= totalSteps ? 'Finish' : 'Next'}</Button>
      </div>
    </div>
  );
}
