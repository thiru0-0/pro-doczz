import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step_ThemeProps {
  theme: { id: string; style: string; color: string };
  onSelect: (theme: { id: string; style: string; color: string }) => void;
}

const themes = [
  { id: 'classic-blue', style: 'classic', color: 'blue' },
  { id: 'classic-green', style: 'classic', color: 'green' },
  { id: 'modern-blue', style: 'modern', color: 'blue' },
  { id: 'modern-purple', style: 'modern', color: 'purple' },
  { id: 'minimal-black', style: 'minimal', color: 'black' },
  { id: 'minimal-gray', style: 'minimal', color: 'gray' },
];

const Step_Theme: React.FC<Step_ThemeProps> = ({ theme, onSelect }) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Choose a Theme</h2>
        <p className="text-muted-foreground">Select a design style for your resume</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {themes.map((t) => (
          <Card
            key={t.id}
            className={cn(
              'cursor-pointer hover:border-primary transition-colors',
              theme.id === t.id && 'border-primary border-2'
            )}
            onClick={() => onSelect(t)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="capitalize">{t.style} - {t.color}</CardTitle>
                {theme.id === t.id && (
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
              <CardDescription>
                {t.style === 'classic' && 'Traditional and professional layout'}
                {t.style === 'modern' && 'Contemporary design with clean lines'}
                {t.style === 'minimal' && 'Simple and elegant minimalist style'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={cn(
                'h-24 rounded-md border-2',
                t.color === 'blue' && 'bg-blue-100 border-blue-300',
                t.color === 'green' && 'bg-green-100 border-green-300',
                t.color === 'purple' && 'bg-purple-100 border-purple-300',
                t.color === 'black' && 'bg-gray-900 border-gray-700',
                t.color === 'gray' && 'bg-gray-200 border-gray-400'
              )} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Step_Theme;


