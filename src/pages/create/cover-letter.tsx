import React, { useState } from 'react';
import WizardShell from '@/components/WizardShell';
import AIHelperBlock from '@/components/wizard/AIHelperBlock';
import StyleSelector from '@/components/wizard/StyleSelector';
import GenerateBlock from '@/components/wizard/GenerateBlock';

export default function CoverLetterWizard(){
  const [step,setStep]=useState(1);
  const [data,setData]=useState<any>({ yourDetails:{}, companyDetails:{}, jobDescriptionPaste:'', coverLetterBody:'', style:{ id:'style-classic' } });
  const next=()=> setStep(s=> s+1); const back=()=> setStep(s=> s-1);
  return (
    <WizardShell step={step} onNext={next} onBack={back} totalSteps={5}>
      {step===1 && <div><label>Your Name<input value={data.yourDetails.name||''} onChange={e=> setData((p:any)=> ({ ...p, yourDetails:{ ...p.yourDetails, name: e.target.value }}))} /></label></div>}
      {step===2 && <div><label>Company Name<input value={data.companyDetails.companyName||''} onChange={e=> setData((p:any)=> ({ ...p, companyDetails:{ ...p.companyDetails, companyName: e.target.value }}))} /></label></div>}
      {step===3 && <div><label>Job Description<textarea value={data.jobDescriptionPaste} onChange={e=> setData((p:any)=> ({ ...p, jobDescriptionPaste: e.target.value }))} /></label></div>}
      {step===4 && <AIHelperBlock title="Your Pitch" notes={''} onNotesChange={()=>{}} onGenerate={()=>{}} summary={data.coverLetterBody} onSummaryChange={(v:any)=> setData((p:any)=> ({ ...p, coverLetterBody:v }))} />}
  {step===5 && <div><StyleSelector currentStyle={data.style} onSelect={(s:any)=> setData((p:any)=> ({ ...p, style:s }))} /><div className="mt-4"><GenerateBlock payload={{ type: 'cover', ...data }} /></div></div>}
    </WizardShell>
  )
}
