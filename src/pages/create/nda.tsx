import React, { useState } from 'react';
import WizardShell from '@/components/WizardShell';
import AIHelperBlock from '@/components/wizard/AIHelperBlock';
import EditableListItem from '@/components/wizard/EditableListItem';
import StyleSelector from '@/components/wizard/StyleSelector';
import GenerateBlock from '@/components/wizard/GenerateBlock';

export default function NdaWizard(){
  const [step,setStep]=useState(1);
  const [data,setData]=useState<any>({ ndaType:'Mutual', parties:[], purpose:'', confidentialInfo:'', terms:{}, style:{ id:'style-formal-legal' } });
  const next=()=> setStep(s=> s+1); const back=()=> setStep(s=> s-1);
  return (
    <WizardShell step={step} onNext={next} onBack={back} totalSteps={6}>
      {step===1 && (
        <div>
          <label>NDA Type<select value={data.ndaType} onChange={e=> setData((p:any)=> ({ ...p, ndaType: e.target.value }))}><option>One-Way</option><option>Mutual</option></select></label>
        </div>
      )}
      {step===2 && <EditableListItem list={data.parties} onChange={(l:any)=> setData((p:any)=> ({ ...p, parties:l }))} itemShape={[ 'role','name' ]} />}
      {step===3 && <label>Purpose<input value={data.purpose} onChange={e=> setData((p:any)=> ({ ...p, purpose: e.target.value }))} /></label>}
      {step===4 && <AIHelperBlock title="Definition of Confidential Info" notes={''} onNotesChange={()=>{}} onGenerate={()=>{}} summary={data.confidentialInfo} onSummaryChange={(v:any)=> setData((p:any)=> ({ ...p, confidentialInfo: v }))} />}
      {step===5 && (
        <div>
          <label>Confidentiality Period<input value={data.terms.confidentialityPeriod||''} onChange={e=> setData((p:any)=> ({ ...p, terms:{ ...p.terms, confidentialityPeriod: e.target.value }}))} /></label>
        </div>
      )}
  {step===6 && <div><StyleSelector currentStyle={data.style} onSelect={(s:any)=> setData((p:any)=> ({ ...p, style:s }))} /><div className="mt-4"><GenerateBlock payload={{ type: 'nda', ...data }} /></div></div>}
    </WizardShell>
  )
}
