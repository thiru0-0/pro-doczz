import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Step1_UserType from '@/components/steps/Step1_UserType';
import Step2_Personal from '@/components/steps/Step2_Personal';
import Step_List from '@/components/steps/Step_List';
import Step_Experience from '@/components/steps/Step_Experience';
import Step_Skills from '@/components/steps/Step_Skills';
import Step_Theme from '@/components/steps/Step_Theme';
import Step_Generate from '@/components/steps/Step_Generate';
import { getAiSummary } from '@/api/resumeService';
import { generateLatexCode } from '@/utils/latexGenerator';

const ResumeBuilder = () => {
  // Task 1: Set up the "Brain" (The Wizard State)
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'fresher' | 'experienced'>('fresher');
  const [theme, setTheme] = useState({ id: 'classic-blue', style: 'classic', color: 'blue' });
  const [generatedCode, setGeneratedCode] = useState('');
  const [resumeData, setResumeData] = useState({
    personal: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      website: '',
      summary: '',
    },
    education: [] as Array<{
      id: string;
      institution: string;
      degree: string;
      field: string;
      startDate: string;
      endDate: string;
      gpa?: string;
      description?: string;
    }>,
    experience: [] as Array<{
      id: string;
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      current: boolean;
      description: string;
      aiSummary?: string;
      loading?: boolean;
    }>,
    projects: [] as Array<{
      id: string;
      name: string;
      description: string;
      technologies: string;
      url?: string;
    }>,
    skills: {
      technical: [] as string[],
      soft: [] as string[],
    },
    certifications: [] as Array<{
      id: string;
      name: string;
      issuer: string;
      date: string;
      url?: string;
    }>,
    fresherSummary: '',
  });

  // Task 2: Build the "Wizard Engine"
  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const totalSteps = 7;
  const progress = (step / totalSteps) * 100;

  // Task 5: Handler functions
  const handleUserTypeSelect = (type: 'fresher' | 'experienced') => {
    setUserType(type);
    nextStep();
  };

  const handleChange = (section: string, key: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof typeof prev] as object),
        [key]: value,
      },
    }));
  };

  const addListItem = (key: 'education' | 'projects' | 'certifications' | 'experience') => {
    const newItem = {
      id: Date.now().toString(),
      ...(key === 'education' ? {
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
        description: '',
      } : key === 'experience' ? {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      } : key === 'projects' ? {
        name: '',
        description: '',
        technologies: '',
        url: '',
      } : {
        name: '',
        issuer: '',
        date: '',
        url: '',
      }),
    };
    setResumeData(prev => ({
      ...prev,
      [key]: [...prev[key], newItem],
    }));
  };

  const removeListItem = (key: 'education' | 'projects' | 'certifications' | 'experience', id: string) => {
    setResumeData(prev => ({
      ...prev,
      [key]: prev[key].filter((item: { id: string }) => item.id !== id),
    }));
  };

  const updateListItem = (key: 'education' | 'projects' | 'certifications' | 'experience', id: string, field: string, value: string | boolean) => {
    setResumeData(prev => ({
      ...prev,
      [key]: prev[key].map((item: { id: string; [key: string]: any }) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Task 8: AI and Generate handlers
  const handleFresherSummary = async (notes: string) => {
    setResumeData(prev => ({ ...prev, fresherSummary: 'Loading...' }));
    const skills = resumeData.skills.technical.concat(resumeData.skills.soft).join(', ');
    const summary = await getAiSummary(notes, { 
      role: 'fresher',
      skills: skills,
      type: 'fresherSummary'
    });
    setResumeData(prev => ({ ...prev, fresherSummary: summary }));
  };

  const handleItemAiSummary = async (id: string, notes: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, loading: true } : exp
      ),
    }));

    const experience = resumeData.experience.find(e => e.id === id);
    const skills = resumeData.skills.technical.concat(resumeData.skills.soft).join(', ');
    const summary = await getAiSummary(notes, { 
      role: experience?.position || 'position',
      skills: skills,
      type: 'experienceSummary'
    });

    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, aiSummary: summary, loading: false } : exp
      ),
    }));
  };

  const handleGenerate = () => {
    const code = generateLatexCode(resumeData, theme);
    setGeneratedCode(code);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
  };

  const renderCurrentStep = () => {
    switch(step) {
      case 1:
        return <Step1_UserType onNext={handleUserTypeSelect} />;
      case 2:
        return (
          <Step2_Personal
            data={resumeData.personal}
            onChange={handleChange}
            userType={userType}
          />
        );
      case 3:
        if (userType === 'fresher') {
          return (
            <Step_List
              title="Education"
              description="Add your educational background"
              items={resumeData.education}
              fields={[
                { key: 'institution', label: 'Institution', placeholder: 'University Name' },
                { key: 'degree', label: 'Degree', placeholder: 'Bachelor of Science' },
                { key: 'field', label: 'Field of Study', placeholder: 'Computer Science' },
                { key: 'startDate', label: 'Start Date', type: 'date' },
                { key: 'endDate', label: 'End Date', type: 'date' },
                { key: 'gpa', label: 'GPA', placeholder: '3.8' },
                { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Relevant coursework, achievements...' },
              ]}
              onAdd={() => addListItem('education')}
              onRemove={(id) => removeListItem('education', id)}
              onUpdate={(id, field, value) => updateListItem('education', id, field, value)}
            />
          );
        } else {
          return (
            <Step_Experience
              experience={resumeData.experience}
              onAdd={() => addListItem('experience')}
              onRemove={(id) => removeListItem('experience', id)}
              onUpdate={(id, field, value) => updateListItem('experience', id, field, value)}
              onAiSummary={handleItemAiSummary}
            />
          );
        }
      case 4:
        if (userType === 'fresher') {
          return (
            <Step_List
              title="Projects"
              description="Add your projects and portfolio work"
              items={resumeData.projects}
              fields={[
                { key: 'name', label: 'Project Name', placeholder: 'Project Title' },
                { key: 'description', label: 'Description', type: 'textarea', placeholder: 'What did you build?' },
                { key: 'technologies', label: 'Technologies', placeholder: 'React, Node.js, MongoDB' },
                { key: 'url', label: 'URL', placeholder: 'github.com/username/project' },
              ]}
              onAdd={() => addListItem('projects')}
              onRemove={(id) => removeListItem('projects', id)}
              onUpdate={(id, field, value) => updateListItem('projects', id, field, value)}
            />
          );
        } else {
          return (
            <Step_List
              title="Education"
              description="Add your educational background"
              items={resumeData.education}
              fields={[
                { key: 'institution', label: 'Institution', placeholder: 'University Name' },
                { key: 'degree', label: 'Degree', placeholder: 'Bachelor of Science' },
                { key: 'field', label: 'Field of Study', placeholder: 'Computer Science' },
                { key: 'startDate', label: 'Start Date', type: 'date' },
                { key: 'endDate', label: 'End Date', type: 'date' },
                { key: 'gpa', label: 'GPA', placeholder: '3.8' },
                { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Relevant coursework, achievements...' },
              ]}
              onAdd={() => addListItem('education')}
              onRemove={(id) => removeListItem('education', id)}
              onUpdate={(id, field, value) => updateListItem('education', id, field, value)}
            />
          );
        }
      case 5:
        if (userType === 'fresher') {
          return (
            <Step_List
              title="Certifications"
              description="Add your certifications and credentials"
              items={resumeData.certifications}
              fields={[
                { key: 'name', label: 'Certification Name', placeholder: 'AWS Certified Solutions Architect' },
                { key: 'issuer', label: 'Issuer', placeholder: 'Amazon Web Services' },
                { key: 'date', label: 'Date', type: 'date' },
                { key: 'url', label: 'Verification URL', placeholder: 'credly.com/badges/...' },
              ]}
              onAdd={() => addListItem('certifications')}
              onRemove={(id) => removeListItem('certifications', id)}
              onUpdate={(id, field, value) => updateListItem('certifications', id, field, value)}
            />
          );
        } else {
          return (
            <Step_List
              title="Projects"
              description="Add your projects and portfolio work"
              items={resumeData.projects}
              fields={[
                { key: 'name', label: 'Project Name', placeholder: 'Project Title' },
                { key: 'description', label: 'Description', type: 'textarea', placeholder: 'What did you build?' },
                { key: 'technologies', label: 'Technologies', placeholder: 'React, Node.js, MongoDB' },
                { key: 'url', label: 'URL', placeholder: 'github.com/username/project' },
              ]}
              onAdd={() => addListItem('projects')}
              onRemove={(id) => removeListItem('projects', id)}
              onUpdate={(id, field, value) => updateListItem('projects', id, field, value)}
            />
          );
        }
      case 6:
        return (
          <Step_Skills
            skills={resumeData.skills}
            onUpdate={(category, skills) => {
              setResumeData(prev => ({
                ...prev,
                skills: {
                  ...prev.skills,
                  [category]: skills,
                },
              }));
            }}
          />
        );
      case 7:
        return (
          <>
            <Step_Theme theme={theme} onSelect={setTheme} />
            <div className="mt-8">
              <Step_Generate
                generatedCode={generatedCode}
                onGenerate={handleGenerate}
                onCopy={handleCopy}
              />
            </div>
          </>
        );
      default:
        return <Step1_UserType onNext={handleUserTypeSelect} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Progress Bar */}
      <div className="border-b bg-card p-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-4xl">
          {renderCurrentStep()}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="border-t bg-card p-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={step === 1}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={nextStep}
            disabled={step === totalSteps}
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;


