import React from 'react';
import { useParams } from 'react-router-dom';
import ResumeBuilder from './ResumeBuilder';
import ResumeWizardPage from './resume';
import ProposalWizard from './proposal';
import ContractWizard from './contract';
import NDAWizard from './nda';
import LegalGenericWizard from './legal-generic';
import ReportWizard from './report';
import InvoiceWizard from './invoice';
import JobDescriptionWizard from './job-description';
import CoverLetterWizard from './cover-letter';
import SalesPitchWizard from './sales-pitch';
import AnalysisWizard from './analysis';
import ReactNotFound from '../NotFound';

export default function CreateRouter() {
  const { id } = useParams<{ id?: string }>();

  if (!id) {
    return (
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-xl font-semibold">No template selected</h2>
        <p className="text-muted-foreground">Please choose a template from the Create page.</p>
      </div>
    );
  }

  switch (id) {
    case 'resume':
      // prefer the ResumeBuilder full experience
      return <ResumeBuilder />;
    case 'proposal':
      return <ProposalWizard />;
    case 'contract':
      return <ContractWizard />;
    case 'nda':
      return <NDAWizard />;
    case 'legal':
      return <LegalGenericWizard />;
    case 'report':
      return <ReportWizard />;
    case 'invoice':
      return <InvoiceWizard />;
    case 'job':
      return <JobDescriptionWizard />;
    case 'cover':
      return <CoverLetterWizard />;
    case 'sales-pitch':
      return <SalesPitchWizard />;
    case 'analysis':
      return <AnalysisWizard />;
    default:
      return <ReactNotFound />;
  }
}
