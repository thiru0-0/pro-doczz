import React, { useState } from 'react';
import WizardShell from '@/components/WizardShell';
import AIHelperBlock from '@/components/wizard/AIHelperBlock';
import EditableListItem from '@/components/wizard/EditableListItem';
import StyleSelector from '@/components/wizard/StyleSelector';
import { generateLatexCode } from '@/utils/latexGenerator';
import GenerateBlock from '@/components/wizard/GenerateBlock';

export default function ProposalWizard() {
  const [step,setStep] = useState(1);
  const [data,setData] = useState<any>({
    proposalType: 'Project',
    coreDetails: { yourCompany:'', yourContact:'', clientName:'', clientContact:'', proposalTitle:'', date:'' },
    executiveSummary: '',
    problemStatement: '',
    scopeItems: [],
    timelineAndInvestment: { estimatedTimeline:'', pricingModel:'', costDetails:'', paymentTerms:'' },
    aboutUsSection: '',
    style: { id: 'style-corporate' }
  });

  const next = ()=> setStep(s=> s+1);
  const back = ()=> setStep(s=> s-1);

  const setList = (k:string,l:any[])=> setData((p:any)=> ({ ...p, [k]: l }));

  const render = () => {
    if (step === 1) return (
      <div>
        <label>Proposal Type<select value={data.proposalType} onChange={e=> setData((p:any)=> ({ ...p, proposalType: e.target.value }))}>
          <option>Project</option>
          <option>Sales</option>
          <option>Partnership</option>
        </select></label>
      </div>
    );
    if (step === 2) return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label>Your Company<input value={data.coreDetails.yourCompany} onChange={e=> setData((p:any)=> ({ ...p, coreDetails: { ...p.coreDetails, yourCompany: e.target.value }}))} /></label>
        <label>Client Name<input value={data.coreDetails.clientName} onChange={e=> setData((p:any)=> ({ ...p, coreDetails: { ...p.coreDetails, clientName: e.target.value }}))} /></label>
      </div>
    );
    if (step === 3) return <AIHelperBlock title="Executive Summary" notes={''} onNotesChange={()=>{}} onGenerate={()=>{}} summary={data.executiveSummary} onSummaryChange={(v:any)=> setData((p:any)=> ({ ...p, executiveSummary: v }))} />;
    if (step === 4) return <AIHelperBlock title="Problem Statement" notes={''} onNotesChange={()=>{}} onGenerate={()=>{}} summary={data.problemStatement} onSummaryChange={(v:any)=> setData((p:any)=> ({ ...p, problemStatement: v }))} />;
    if (step === 5) return <EditableListItem list={data.scopeItems} onChange={(l:any)=> setList('scopeItems', l)} itemShape={[ 'phase','description' ]} />;
    if (step === 6) return (
      <div>
        <label>Estimated Timeline<input value={data.timelineAndInvestment.estimatedTimeline} onChange={e=> setData((p:any)=> ({ ...p, timelineAndInvestment: { ...p.timelineAndInvestment, estimatedTimeline: e.target.value }}))} /></label>
      </div>
    );
    if (step === 7) return <AIHelperBlock title="About Us" notes={''} onNotesChange={()=>{}} onGenerate={()=>{}} summary={data.aboutUsSection} onSummaryChange={(v:any)=> setData((p:any)=> ({ ...p, aboutUsSection: v }))} />;
    return (
      <div>
        <StyleSelector currentStyle={data.style} onSelect={(s:any)=> setData((p:any)=> ({ ...p, style: s }))} />
        <div className="mt-4">
          <GenerateBlock payload={{ type: 'proposal', ...data }} />
        </div>
      </div>
    );
  };

  return (
    <WizardShell step={step} onNext={next} onBack={back} totalSteps={8}>
      {render()}
    </WizardShell>
  );
}
