import React from 'react';
import DocumentCard from '@/components/DocumentCard';
import { FileText, Presentation, FileSignature, Shield, Gavel, BookOpen, FileCheck, Briefcase, GraduationCap, FileBarChart } from 'lucide-react';

const templates = [
  { id: 'resume', title: 'Resume Builder', subtitle: 'AI-powered resume generation with LaTeX export.', icon: <FileText size={24} />, href: '/template/resume', isFeatured: true },
  { id: 'proposal', title: 'Business Proposal', subtitle: 'Project, sales, and partnership proposals.', icon: <Presentation size={24} />, href: '/template/proposal' },
  { id: 'contract', title: 'Contract', subtitle: 'Legal contracts and agreements.', icon: <FileSignature size={24} />, href: '/template/contract' },
  { id: 'nda', title: 'NDA', subtitle: 'Non-disclosure agreements.', icon: <Shield size={24} />, href: '/template/nda' },
  { id: 'legal', title: 'Legal Document', subtitle: 'Various legal documents and forms.', icon: <Gavel size={24} />, href: '/template/legal' },
  { id: 'report', title: 'Report', subtitle: 'Business and technical reports.', icon: <BookOpen size={24} />, href: '/template/report' },
  { id: 'invoice', title: 'Invoice', subtitle: 'Professional invoices and billing.', icon: <FileCheck size={24} />, href: '/template/invoice' },
  { id: 'job', title: 'Job Description', subtitle: 'Create detailed job postings.', icon: <Briefcase size={24} />, href: '/template/job' },
  { id: 'cover', title: 'Cover Letter', subtitle: 'Professional cover letters.', icon: <GraduationCap size={24} />, href: '/template/cover' },
  { id: 'analysis', title: 'Analysis', subtitle: 'Data analysis and research documents.', icon: <FileBarChart size={24} />, href: '/template/analysis' },
];

export default function CreatePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Create a New Document</h1>
      <p className="text-lg text-gray-600 mb-10">Select a template to begin.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((doc) => (
          <DocumentCard
            key={doc.id}
            title={doc.title}
            subtitle={doc.subtitle}
            icon={doc.icon}
            isFeatured={doc.isFeatured}
            isDisabled={doc.isDisabled}
            href={doc.href}
          />
        ))}
      </div>
    </div>
  );
}
