import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface EditableListItemProps {
  item: {
    id: string;
    [key: string]: any;
  };
  fields: Array<{
    key: string;
    label: string;
    type?: 'text' | 'textarea' | 'date';
    placeholder?: string;
  }>;
  onUpdate: (id: string, field: string, value: string) => void;
  onRemove: (id: string) => void;
}

const EditableListItem: React.FC<EditableListItemProps> = ({
  item,
  fields,
  onUpdate,
  onRemove,
}) => {
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold">Item Details</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(item.id)}
            className="text-destructive hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label htmlFor={`${item.id}-${field.key}`}>{field.label}</Label>
              {field.type === 'textarea' ? (
                <Textarea
                  id={`${item.id}-${field.key}`}
                  value={item[field.key] || ''}
                  onChange={(e) => onUpdate(item.id, field.key, e.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                />
              ) : (
                <Input
                  id={`${item.id}-${field.key}`}
                  type={field.type || 'text'}
                  value={item[field.key] || ''}
                  onChange={(e) => onUpdate(item.id, field.key, e.target.value)}
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EditableListItem;

