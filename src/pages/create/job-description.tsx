import React, { useState } from 'react';
import WizardShell from '@/components/WizardShell';
import AIHelperBlock from '@/components/wizard/AIHelperBlock';
import StyleSelector from '@/components/wizard/StyleSelector';
import GenerateBlock from '@/components/wizard/GenerateBlock';

export default function JobDescriptionWizard(){
  const [step,setStep]=useState(1);
  const [data,setData]=useState<any>({ coreRoleDetails:{ jobTitle:'', location:'', employmentType:'' }, companySummary:'', responsibilities:'', qualifications:'', style:{ id:'style-corporate' } });
  const next=()=> setStep(s=> s+1); const back=()=> setStep(s=> s-1);
  return (
    <WizardShell step={step} onNext={next} onBack={back} totalSteps={5}>
      {step===1 && <div><label>Job Title<input value={data.coreRoleDetails.jobTitle} onChange={e=> setData((p:any)=> ({ ...p, coreRoleDetails:{ ...p.coreRoleDetails, jobTitle: e.target.value }}))} /></label></div>}
      {step===2 && <AIHelperBlock title="Company Summary" notes={''} onNotesChange={()=>{}} onGenerate={()=>{}} summary={data.companySummary} onSummaryChange={(v:any)=> setData((p:any)=> ({ ...p, companySummary:v }))} />}
      {step===3 && <AIHelperBlock title="Responsibilities" notes={''} onNotesChange={()=>{}} onGenerate={()=>{}} summary={data.responsibilities} onSummaryChange={(v:any)=> setData((p:any)=> ({ ...p, responsibilities:v }))} />}
      {step===4 && <AIHelperBlock title="Qualifications" notes={''} onNotesChange={()=>{}} onGenerate={()=>{}} summary={data.qualifications} onSummaryChange={(v:any)=> setData((p:any)=> ({ ...p, qualifications:v }))} />}
  {step===5 && <div><StyleSelector currentStyle={data.style} onSelect={(s:any)=> setData((p:any)=> ({ ...p, style:s }))} /><div className="mt-4"><GenerateBlock payload={{ type: 'job', ...data }} /></div></div>}
    </WizardShell>
  )
}
