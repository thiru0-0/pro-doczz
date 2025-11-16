import React, { useState } from 'react';
import WizardShell from '@/components/WizardShell';
import AIHelperBlock from '@/components/wizard/AIHelperBlock';
import EditableListItem from '@/components/wizard/EditableListItem';
import StyleSelector from '@/components/wizard/StyleSelector';
import { generateLatexCode } from '@/utils/latexGenerator';

export default function ResumeWizardPage() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'fresher'|'experienced'>('fresher');
  const [data, setData] = useState<any>({
    personal: { name: '', email: '', linkedin: '', github: '', leetcode: '', summary: '', summaryNotes: '' },
    education: [],
    experience: [],
    internships: [],
    projects: [],
    skills: '',
    languages: '',
    style: { id: 'style-modern-sidebar' }
  });
  const [generated, setGenerated] = useState('');

  const next = () => setStep(s => Math.min(s+1, 8));
  const back = () => setStep(s => Math.max(s-1, 1));

  const update = (section: string, key: string, value: any) => {
    setData((p:any) => ({ ...p, [section]: { ...p[section], [key]: value } }));
  };

  const setList = (key:string, list:any[]) => setData((p:any)=> ({ ...p, [key]: list }));

  const handleGenerate = () => {
    const code = generateLatexCode({ ...data, userType, style: data.style });
    setGenerated(code);
  };

  return (
    <WizardShell step={step} onNext={next} onBack={back} totalSteps={8}>
      {step === 1 && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Role</h2>
          <div className="flex gap-4 justify-center">
            <button onClick={() => { setUserType('fresher'); next(); }} className="btn">Fresher</button>
            <button onClick={() => { setUserType('experienced'); next(); }} className="btn">Experienced</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label>Name<input value={data.personal.name} onChange={e=> update('personal','name', e.target.value)} /></label>
          <label>Email<input value={data.personal.email} onChange={e=> update('personal','email', e.target.value)} /></label>
          <label>LinkedIn<input value={data.personal.linkedin} onChange={e=> update('personal','linkedin', e.target.value)} /></label>
          <label>GitHub<input value={data.personal.github} onChange={e=> update('personal','github', e.target.value)} /></label>
        </div>
      )}

      {step === 3 && userType === 'fresher' && (
        <AIHelperBlock
          title="Professional Summary"
          notes={data.personal.summaryNotes}
          onNotesChange={(v:any)=> update('personal','summaryNotes', v)}
          onGenerate={async ()=> {
            // delegated to shared AI helper inside component; here we assume it will call API
          }}
          summary={data.personal.summary}
          onSummaryChange={(v:any)=> update('personal','summary', v)}
        />
      )}

      {step === 4 && (
        <div>
          <h3 className="font-semibold mb-2">Education</h3>
          <EditableListItem list={data.education} onChange={(list:any)=> setList('education', list)} itemShape={[ 'school','degree','years' ]} />
        </div>
      )}

      {step === 5 && (
        <div>
          <h3 className="font-semibold mb-2">Experience / Internships</h3>
          <EditableListItem list={userType==='fresher'? data.internships : data.experience} onChange={(list:any)=> setList(userType==='fresher'? 'internships' : 'experience', list)} itemShape={[ 'company','role','years','notes','summary' ]} aiEnabled />
        </div>
      )}

      {step === 6 && (
        <div>
          <label>Skills<textarea value={data.skills} onChange={e=> setData((p:any)=> ({ ...p, skills: e.target.value }))} /></label>
          <EditableListItem list={data.projects} onChange={(list:any)=> setList('projects', list)} itemShape={[ 'title','description' ]} />
        </div>
      )}

      {step === 7 && userType === 'fresher' && (
        <div>
          <label>Languages<textarea value={data.languages} onChange={e=> setData((p:any)=> ({ ...p, languages: e.target.value }))} /></label>
        </div>
      )}

      {step === 8 && (
        <div>
          <StyleSelector currentStyle={data.style} onSelect={(s:any)=> setData((p:any)=> ({ ...p, style: s }))} />
          <div className="mt-4">
            <button onClick={handleGenerate} className="btn-primary">Generate LaTeX</button>
            {generated && <textarea readOnly value={generated} className="mt-2 w-full h-64" />}
          </div>
        </div>
      )}
    </WizardShell>
  );
}
