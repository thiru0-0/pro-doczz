import React from 'react';
import SavedDocumentCard from '@/components/SavedDocumentCard';

// This is "fake" data for now.
const fakeDocs = [
  { id: 1, title: 'My Resume (v2)', subtitle: '3 pages • Updated 10 minutes ago' },
  { id: 2, title: 'Sales Proposal (Draft)', subtitle: '5 pages • Updated 2 days ago' },
  { id: 3, title: 'Software Engineer Resume', subtitle: '2 pages • Updated 1 week ago' },
  { id: 4, title: 'Business Contract Template', subtitle: '8 pages • Updated 3 days ago' },
];

export default function LibraryPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-10">My Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fakeDocs.map((doc) => (
          <SavedDocumentCard
            key={doc.id}
            title={doc.title}
            subtitle={doc.subtitle}
          />
        ))}
      </div>
    </div>
  );
}


