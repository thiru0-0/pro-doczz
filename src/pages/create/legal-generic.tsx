import React, { useState } from 'react';
import WizardShell from '@/components/WizardShell';
import AIHelperBlock from '@/components/wizard/AIHelperBlock';
import EditableListItem from '@/components/wizard/EditableListItem';
import StyleSelector from '@/components/wizard/StyleSelector';
import GenerateBlock from '@/components/wizard/GenerateBlock';

export default function LegalGenericWizard(){
  const [step,setStep]=useState(1);
  const [data,setData]=useState<any>({ intentNotes:'', documentTitle:'', parties:[], coreTermsNotes:'', coreClauses:'', style:{ id:'style-formal-legal' } });
  const next=()=> setStep(s=> s+1); const back=()=> setStep(s=> s-1);
  return (
    <WizardShell step={step} onNext={next} onBack={back} totalSteps={4}>
      {step===1 && <AIHelperBlock title="Document Intent" notes={data.intentNotes} onNotesChange={(v:any)=> setData((p:any)=> ({ ...p, intentNotes:v }))} onGenerate={()=>{}} summary={data.documentTitle} onSummaryChange={(v:any)=> setData((p:any)=> ({ ...p, documentTitle:v }))} />}
      {step===2 && <EditableListItem list={data.parties} onChange={(l:any)=> setData((p:any)=> ({ ...p, parties:l }))} itemShape={[ 'role','name' ]} />}
      {step===3 && <AIHelperBlock title="Core Terms" notes={data.coreTermsNotes} onNotesChange={(v:any)=> setData((p:any)=> ({ ...p, coreTermsNotes:v }))} onGenerate={()=>{}} summary={data.coreClauses} onSummaryChange={(v:any)=> setData((p:any)=> ({ ...p, coreClauses:v }))} />}
  {step===4 && <div><StyleSelector currentStyle={data.style} onSelect={(s:any)=> setData((p:any)=> ({ ...p, style:s }))} /><div className="mt-4"><GenerateBlock payload={{ type: 'legal-generic', ...data }} /></div></div>}
    </WizardShell>
  )
}
