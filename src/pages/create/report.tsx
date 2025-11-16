import React, { useState } from 'react';
import WizardShell from '@/components/WizardShell';
import AIHelperBlock from '@/components/wizard/AIHelperBlock';
import EditableListItem from '@/components/wizard/EditableListItem';
import StyleSelector from '@/components/wizard/StyleSelector';
import GenerateBlock from '@/components/wizard/GenerateBlock';

export default function ReportWizard(){
  const [step,setStep]=useState(1);
  const [data,setData]=useState<any>({ coreDetails:{ title:'', author:'', department:'', date:'' }, executiveSummary:'', bodySections:[], conclusion:'', style:{ id:'style-corporate' } });
  const next=()=> setStep(s=> s+1); const back=()=> setStep(s=> s-1);
  return (
    <WizardShell step={step} onNext={next} onBack={back} totalSteps={5}>
      {step===1 && (
        <div>
          <label>Title<input value={data.coreDetails.title} onChange={e=> setData((p:any)=> ({ ...p, coreDetails:{ ...p.coreDetails, title: e.target.value }}))} /></label>
        </div>
      )}
      {step===2 && <AIHelperBlock title="Executive Summary" notes={''} onNotesChange={()=>{}} onGenerate={()=>{}} summary={data.executiveSummary} onSummaryChange={(v:any)=> setData((p:any)=> ({ ...p, executiveSummary:v }))} />}
      {step===3 && (
        <EditableListItem list={data.bodySections} onChange={(l:any)=> setData((p:any)=> ({ ...p, bodySections:l }))} itemShape={[ 'title','contentNotes','generatedContent' ]} aiEnabled />
      )}
      {step===4 && <AIHelperBlock title="Conclusion" notes={''} onNotesChange={()=>{}} onGenerate={()=>{}} summary={data.conclusion} onSummaryChange={(v:any)=> setData((p:any)=> ({ ...p, conclusion:v }))} />}
  {step===5 && <div><StyleSelector currentStyle={data.style} onSelect={(s:any)=> setData((p:any)=> ({ ...p, style:s }))} /><div className="mt-4"><GenerateBlock payload={{ type: 'report', ...data }} /></div></div>}
    </WizardShell>
  )
}
