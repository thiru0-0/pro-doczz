import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step_ThemeProps {
  // keep compatible shape so callers expecting {id, style, color} still work
  theme: { id: string; style?: string; color?: string };
  onSelect: (theme: { id: string; style?: string; color?: string; name?: string }) => void;
}

const styles = [
  {
    id: 'style-modern-sidebar',
    name: 'Modern Sidebar',
    description: 'Sidebar for contact + skills, main area for experience.',
    mockup: (
      <div className="h-full flex gap-2">
        <div className="w-1/3 h-full bg-gray-200 rounded-sm p-2 flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-white rounded-full" />
          <div className="h-2 w-2/3 bg-white rounded" />
          <div className="h-2 w-1/2 bg-white rounded" />
        </div>
        <div className="w-2/3 h-full bg-white rounded-sm p-2">
          <div className="h-3 w-1/2 bg-gray-300 rounded" />
          <div className="h-2 w-full bg-gray-100 rounded mt-2" />
          <div className="h-2 w-full bg-gray-100 rounded mt-1" />
        </div>
      </div>
    ),
  },
  {
    id: 'style-professional-header',
    name: 'Professional Header',
    description: 'Single-column layout with a strong header.',
    mockup: (
      <div className="h-full flex flex-col gap-2">
        <div className="h-3 w-1/2 bg-gray-300 rounded" />
        <div className="h-2 w-full bg-gray-100 rounded mt-2" />
        <div className="h-2 w-3/4 bg-gray-100 rounded mt-1" />
        <div className="h-3 w-1/3 bg-gray-300 rounded mt-2" />
      </div>
    ),
  },
  {
    id: 'style-dynamic-columns',
    name: 'Dynamic Columns',
    description: 'Main content on left, profile/skills on right.',
    mockup: (
      <div className="h-full flex gap-2">
        <div className="w-2/3 h-full bg-white rounded-sm p-2">
          <div className="h-3 w-1/2 bg-gray-300 rounded" />
          <div className="h-2 w-full bg-gray-100 rounded mt-2" />
          <div className="h-2 w-full bg-gray-100 rounded mt-1" />
        </div>
        <div className="w-1/3 h-full bg-gray-200 rounded-sm p-2">
          <div className="h-3 w-1/2 bg-white rounded" />
          <div className="h-2 w-full bg-white rounded mt-2" />
        </div>
      </div>
    ),
  },
];

const Step_Theme: React.FC<Step_ThemeProps> = ({ theme, onSelect }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2"><Palette /> Choose a Style</h2>
        <p className="text-muted-foreground">Select a resume layout style — these presets control overall structure and visual hierarchy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {styles.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect({ id: s.id, style: s.name, color: 'default' })}
            className={cn(
              'p-3 border rounded-lg bg-card text-left transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary',
              theme.id === s.id ? 'border-primary shadow-xl' : 'border-border'
            )}
            aria-pressed={theme.id === s.id}
          >
            <div className="h-40 mb-3 overflow-hidden rounded-md">
              {s.mockup}
            </div>
            <div>
              <h3 className="font-semibold">{s.name}</h3>
              <p className="text-sm text-muted-foreground">{s.description}</p>
            </div>
            {theme.id === s.id && (
              <div className="mt-2 inline-flex items-center gap-2 text-sm text-primary">
                <Check className="h-4 w-4" /> Selected
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step_Theme;

