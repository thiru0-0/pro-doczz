import { useParams, useNavigate } from 'react-router-dom';
import ResumeBuilder from './create/ResumeBuilder';
import React from 'react';

export default function TemplatePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // If resume template, render the builder directly
  if (id === 'resume') {
    return <ResumeBuilder />;
  }

  return (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">{id?.toUpperCase() || 'Template'}</h2>
      <p className="text-muted-foreground mb-6">This template is available. Click below to start creating.</p>
      <div className="flex justify-center">
        <button className="btn-primary px-4 py-2 rounded" onClick={() => navigate(`/create/${id}`)}>Create Document</button>
      </div>
    </div>
  );
}
