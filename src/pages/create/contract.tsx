import React, { useState } from 'react';
import WizardShell from '@/components/WizardShell';
import AIHelperBlock from '@/components/wizard/AIHelperBlock';
import EditableListItem from '@/components/wizard/EditableListItem';
import StyleSelector from '@/components/wizard/StyleSelector';
import GenerateBlock from '@/components/wizard/GenerateBlock';

export default function ContractWizard(){
  const [step,setStep] = useState(1);
  const [data,setData]=useState<any>({ parties:{}, services:[], paymentTerms:{}, timeline:{}, clauses:{}, style:{ id:'style-classic-legal' } });
  const next=()=> setStep(s=> s+1); const back=()=> setStep(s=> s-1);
  return (
    <WizardShell step={step} onNext={next} onBack={back} totalSteps={6}>
      {step===1 && (
        <div>
          <label>Provider Name<input value={data.parties.providerName||''} onChange={e=> setData((p:any)=> ({ ...p, parties:{ ...p.parties, providerName: e.target.value }}))} /></label>
        </div>
      )}
      {step===2 && <EditableListItem list={data.services} onChange={(l:any)=> setData((p:any)=> ({ ...p, services: l }))} itemShape={[ 'service','description' ]} />}
      {step===3 && (
        <div>
          <label>Payment Structure<textarea value={data.paymentTerms.structure||''} onChange={e=> setData((p:any)=> ({ ...p, paymentTerms:{ ...p.paymentTerms, structure: e.target.value }}))} /></label>
        </div>
      )}
      {step===4 && (
        <div>
          <label>Timeline<textarea value={data.timeline.startDate||''} onChange={e=> setData((p:any)=> ({ ...p, timeline:{ ...p.timeline, startDate: e.target.value }}))} /></label>
        </div>
      )}
      {step===5 && (
        <div>
          <AIHelperBlock title="Termination Clause" notes={''} onNotesChange={()=>{}} onGenerate={()=>{}} summary={data.clauses.termination||''} onSummaryChange={(v:any)=> setData((p:any)=> ({ ...p, clauses:{ ...p.clauses, termination: v }}))} />
          <AIHelperBlock title="Confidentiality" notes={''} onNotesChange={()=>{}} onGenerate={()=>{}} summary={data.clauses.confidentiality||''} onSummaryChange={(v:any)=> setData((p:any)=> ({ ...p, clauses:{ ...p.clauses, confidentiality: v }}))} />
          <AIHelperBlock title="IP Clause" notes={''} onNotesChange={()=>{}} onGenerate={()=>{}} summary={data.clauses.ip||''} onSummaryChange={(v:any)=> setData((p:any)=> ({ ...p, clauses:{ ...p.clauses, ip: v }}))} />
        </div>
      )}
  {step===6 && <div><StyleSelector currentStyle={data.style} onSelect={(s:any)=> setData((p:any)=> ({ ...p, style:s }))} /><div className="mt-4"><GenerateBlock payload={{ type: 'contract', ...data }} /></div></div>}
    </WizardShell>
  )
}
