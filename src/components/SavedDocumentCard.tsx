import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SavedDocumentCardProps {
  title: string;
  subtitle: string;
}

export default function SavedDocumentCard({ title, subtitle }: SavedDocumentCardProps) {
  return (
    <Card className="p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-0">
        <div className="flex items-center gap-4">
          <FileText size={24} className="text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


