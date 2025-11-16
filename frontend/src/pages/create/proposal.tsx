import React from 'react';
import WizardShell from '@/components/WizardShell';
import GenerateBlock from '@/components/wizard/GenerateBlock';
export default function ProposalWizard(){
  return <WizardShell step={1} totalSteps={2} onNext={()=>{}} onBack={()=>{}}><div>Proposal</div><GenerateBlock payload={{ title: 'Proposal' }} /></WizardShell>
}
