"use client";

import { memo } from 'react';
import { useCVData } from '@/hooks/use-cv-data';
import { DefaultTemplate } from '@/components/cv-templates/default-template';
import { SidebarTemplate } from '@/components/cv-templates/sidebar-template';

const CVPreview = memo(() => {
  const { cvData } = useCVData();

  const renderTemplate = () => {
    switch (cvData.template) {
      case 'sidebar':
        return <SidebarTemplate data={cvData} />;
      case 'default':
      default:
        return <DefaultTemplate data={cvData} />;
    }
  };

  return (
    <div className="cv-preview bg-white shadow-lg mx-auto" style={{ width: '210mm', minHeight: '297mm' }}>
      {renderTemplate()}
    </div>
  );
});

CVPreview.displayName = 'CVPreview';

export { CVPreview };