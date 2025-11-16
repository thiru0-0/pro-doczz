import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X, Sparkles } from 'lucide-react';
import EditableListItem from './EditableListItem';

interface Step_ExperienceProps {
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    aiSummary?: string;
    loading?: boolean;
  }>;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: string, value: string | boolean) => void;
  onAiSummary?: (id: string, notes: string) => void;
}

const Step_Experience: React.FC<Step_ExperienceProps> = ({
  experience,
  onAdd,
  onRemove,
  onUpdate,
  onAiSummary,
}) => {
  const [aiNotes, setAiNotes] = useState<{ [key: string]: string }>({});

  const experienceFields = [
    { key: 'company', label: 'Company', type: 'text' as const, placeholder: 'Company Name' },
    { key: 'position', label: 'Position', type: 'text' as const, placeholder: 'Job Title' },
    { key: 'startDate', label: 'Start Date', type: 'date' as const },
    { key: 'endDate', label: 'End Date', type: 'date' as const },
    { key: 'description', label: 'Description', type: 'textarea' as const, placeholder: 'Describe your role and achievements...' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Work Experience</h2>
        <p className="text-muted-foreground">Add your professional experience</p>
      </div>

      <div className="space-y-4">
        {experience.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle>Experience Entry</CardTitle>
                  <CardDescription>Details about this position</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(item.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`${item.id}-company`}>Company *</Label>
                  <Input
                    id={`${item.id}-company`}
                    value={item.company || ''}
                    onChange={(e) => onUpdate(item.id, 'company', e.target.value)}
                    placeholder="Company Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${item.id}-position`}>Position *</Label>
                  <Input
                    id={`${item.id}-position`}
                    value={item.position || ''}
                    onChange={(e) => onUpdate(item.id, 'position', e.target.value)}
                    placeholder="Job Title"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`${item.id}-startDate`}>Start Date</Label>
                  <Input
                    id={`${item.id}-startDate`}
                    type="date"
                    value={item.startDate || ''}
                    onChange={(e) => onUpdate(item.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${item.id}-endDate`}>End Date</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id={`${item.id}-endDate`}
                      type="date"
                      value={item.endDate || ''}
                      onChange={(e) => onUpdate(item.id, 'endDate', e.target.value)}
                      disabled={item.current}
                    />
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`${item.id}-current`}
                        checked={item.current || false}
                        onChange={(e) => onUpdate(item.id, 'current', e.target.checked)}
                        className="h-4 w-4"
                      />
                      <Label htmlFor={`${item.id}-current`} className="text-sm">Current</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${item.id}-description`}>Description</Label>
                <Textarea
                  id={`${item.id}-description`}
                  value={item.description || ''}
                  onChange={(e) => onUpdate(item.id, 'description', e.target.value)}
                  placeholder="Describe your role and achievements..."
                  rows={4}
                />
              </div>

              {onAiSummary && (
                <div className="space-y-2 border-t pt-4">
                  <Label htmlFor={`${item.id}-aiNotes`}>AI Summary Notes</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`${item.id}-aiNotes`}
                      value={aiNotes[item.id] || ''}
                      onChange={(e) => setAiNotes({ ...aiNotes, [item.id]: e.target.value })}
                      placeholder="Enter notes for AI summary..."
                    />
                    <Button
                      onClick={() => onAiSummary(item.id, aiNotes[item.id] || '')}
                      disabled={item.loading}
                      variant="outline"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      {item.loading ? 'Generating...' : 'Generate AI Summary'}
                    </Button>
                  </div>
                  {item.aiSummary && (
                    <div className="mt-2 p-3 bg-muted rounded-md">
                      <p className="text-sm font-medium mb-1">AI Summary:</p>
                      <p className="text-sm text-muted-foreground">{item.aiSummary}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        <Button onClick={onAdd} variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>
    </div>
  );
};

export default Step_Experience;

