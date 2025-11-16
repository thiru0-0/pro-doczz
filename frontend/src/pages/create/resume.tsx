import React, { useState } from 'react';
import WizardShell from '@/components/WizardShell';
import GenerateBlock from '@/components/wizard/GenerateBlock';

export default function ResumeWizardPage(){
  const [step,setStep]=useState(1);
  const next=()=> setStep(s=>s+1);
  const back=()=> setStep(s=>Math.max(1,s-1));
  const data = { personal: { name: 'John Doe' } };

  return (
    <WizardShell step={step} totalSteps={3} onNext={next} onBack={back}>
      <div>Resume wizard step {step}</div>
      {step===3 && <GenerateBlock payload={data} />}
    </WizardShell>
  );
}
