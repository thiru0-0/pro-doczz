import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Briefcase } from 'lucide-react';

interface Step1_UserTypeProps {
  onNext: (type: 'fresher' | 'experienced') => void;
}

const Step1_UserType: React.FC<Step1_UserTypeProps> = ({ onNext }) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Welcome to Resume Builder</h2>
        <p className="text-muted-foreground">Let's start by selecting your experience level</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => onNext('fresher')}>
          <CardHeader>
            <GraduationCap className="h-12 w-12 text-primary mb-2" />
            <CardTitle>Fresher</CardTitle>
            <CardDescription>
              Just starting your career? We'll help you create a resume that highlights your education, projects, and skills.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Select Fresher</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => onNext('experienced')}>
          <CardHeader>
            <Briefcase className="h-12 w-12 text-primary mb-2" />
            <CardTitle>Experienced</CardTitle>
            <CardDescription>
              Have work experience? We'll help you showcase your professional journey and achievements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Select Experienced</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Step1_UserType;

