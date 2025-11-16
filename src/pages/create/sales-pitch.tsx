import React, { useState } from 'react';
import WizardShell from '@/components/WizardShell';
import AIHelperBlock from '@/components/wizard/AIHelperBlock';
import EditableListItem from '@/components/wizard/EditableListItem';
import StyleSelector from '@/components/wizard/StyleSelector';
import { generateLatexCode } from '@/utils/latexGenerator';
import GenerateBlock from '@/components/wizard/GenerateBlock';

export default function SalesPitchWizard() {
  const [step,setStep] = useState(1);
  const [data,setData] = useState<any>({ coreMessage:{ productName:'', oneLiner:'', targetCustomer:'' }, features:[], socialProof:{}, callToAction:{}, style:{ id:'style-modern-tech' } });
  const next=()=> setStep(s=> s+1); const back=()=> setStep(s=> s-1);
  return (
    <WizardShell step={step} onNext={next} onBack={back} totalSteps={7}>
      {step===1 && (
        <div>
          <label>Product<input value={data.coreMessage.productName} onChange={e=> setData((p:any)=> ({ ...p, coreMessage:{ ...p.coreMessage, productName:e.target.value }}))} /></label>
          <label>One-liner<input value={data.coreMessage.oneLiner} onChange={e=> setData((p:any)=> ({ ...p, coreMessage:{ ...p.coreMessage, oneLiner:e.target.value }}))} /></label>
        </div>
      )}
      {step===2 && <AIHelperBlock title="Problem" notes={''} onNotesChange={()=>{}} onGenerate={()=>{}} summary={''} onSummaryChange={()=>{}} />}
      {step===3 && <AIHelperBlock title="Solution" notes={''} onNotesChange={()=>{}} onGenerate={()=>{}} summary={''} onSummaryChange={()=>{}} />}
      {step===4 && <EditableListItem list={data.features} onChange={(l:any)=> setData((p:any)=> ({ ...p, features:l }))} itemShape={[ 'feature','description' ]} />}
      {step===5 && (
        <div>
          <label>Testimonial<textarea value={data.socialProof.testimonial} onChange={e=> setData((p:any)=> ({ ...p, socialProof:{ ...p.socialProof, testimonial: e.target.value }}))} /></label>
        </div>
      )}
      {step===6 && (
        <div>
          <label>CTA Text<input value={data.callToAction.ctaText} onChange={e=> setData((p:any)=> ({ ...p, callToAction:{ ...p.callToAction, ctaText: e.target.value }}))} /></label>
        </div>
      )}
      {step===7 && (
        <div>
          <StyleSelector currentStyle={data.style} onSelect={(s:any)=> setData((p:any)=> ({ ...p, style:s }))} />
          <div className="mt-4"><GenerateBlock payload={{ type: 'sales-pitch', ...data }} /></div>
        </div>
      )}
    </WizardShell>
  )
}
