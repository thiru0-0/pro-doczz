import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';

interface Step_SkillsProps {
  skills: {
    technical: string[];
    soft: string[];
  };
  onUpdate: (category: 'technical' | 'soft', skills: string[]) => void;
}

const Step_Skills: React.FC<Step_SkillsProps> = ({ skills, onUpdate }) => {
  const [techInput, setTechInput] = useState('');
  const [softInput, setSoftInput] = useState('');

  const addSkill = (category: 'technical' | 'soft', value: string) => {
    if (value.trim()) {
      onUpdate(category, [...skills[category], value.trim()]);
      if (category === 'technical') setTechInput('');
      else setSoftInput('');
    }
  };

  const removeSkill = (category: 'technical' | 'soft', index: number) => {
    const newSkills = skills[category].filter((_, i) => i !== index);
    onUpdate(category, newSkills);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Skills</h2>
        <p className="text-muted-foreground">Add your technical and soft skills</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Technical Skills</CardTitle>
            <CardDescription>Programming languages, tools, technologies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill('technical', techInput);
                  }
                }}
                placeholder="e.g., JavaScript, React, Python"
              />
              <Button onClick={() => addSkill('technical', techInput)}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.technical.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => removeSkill('technical', index)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Soft Skills</CardTitle>
            <CardDescription>Interpersonal and communication skills</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={softInput}
                onChange={(e) => setSoftInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill('soft', softInput);
                  }
                }}
                placeholder="e.g., Leadership, Communication"
              />
              <Button onClick={() => addSkill('soft', softInput)}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.soft.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-full text-sm"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => removeSkill('soft', index)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Step_Skills;


