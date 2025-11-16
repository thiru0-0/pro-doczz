import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import EditableListItem from './EditableListItem';

interface Step_ListProps {
  title: string;
  description: string;
  items: Array<{ id: string; [key: string]: any }>;
  fields: Array<{
    key: string;
    label: string;
    type?: 'text' | 'textarea' | 'date';
    placeholder?: string;
  }>;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: string, value: string) => void;
}

const Step_List: React.FC<Step_ListProps> = ({
  title,
  description,
  items,
  fields,
  onAdd,
  onRemove,
  onUpdate,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <EditableListItem
            key={item.id}
            item={item}
            fields={fields}
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
        ))}

        <Button onClick={onAdd} variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add {title.slice(0, -1)}
        </Button>
      </div>
    </div>
  );
};

export default Step_List;


