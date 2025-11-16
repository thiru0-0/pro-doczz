import React from 'react';
import WizardShell from '@/components/WizardShell';
import GenerateBlock from '@/components/wizard/GenerateBlock';
export default function ContractWizard(){ return <WizardShell step={1} totalSteps={2} onNext={()=>{}} onBack={()=>{}}><div>Contract</div><GenerateBlock payload={{ title: 'Contract' }} /></WizardShell> }
