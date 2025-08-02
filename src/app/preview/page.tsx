
'use client';

import { CVPreview } from '@/components/cv-preview';
import { Button } from '@/components/ui/button';
import { CVDataProvider } from '@/hooks/use-cv-data';
import { ArrowLeft, Printer } from 'lucide-react';
import Link from 'next/link';

export default function PreviewPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <CVDataProvider>
      <div className="bg-muted min-h-screen">
        <header className="bg-background/80 backdrop-blur sticky top-0 no-print">
          <div className="container mx-auto p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold font-logo">Print Preview</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                  <Link href="/">
                      <ArrowLeft className="mr-2" />
                      Back to Editor
                  </Link>
              </Button>
              <Button onClick={handlePrint} className="text-white">
                <Printer className="mr-2" />
                Print to PDF
              </Button>
            </div>
          </div>
        </header>
        <main className="container mx-auto p-4 sm:p-8">
          <div id="cv-preview-container" className="my-8">
            <CVPreview />
          </div>
        </main>
      </div>
    </CVDataProvider>
  );
}
