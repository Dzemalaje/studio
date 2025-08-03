
'use client';

import { CVPreview } from '@/components/cv-preview';
import { Button } from '@/components/ui/button';
import { CVDataProvider } from '@/hooks/use-cv-data';
import { ArrowLeft, Printer, Download, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function PreviewPage() {
  const handlePrint = () => {
    // Optimize for print
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        @page { margin: 0; size: A4; }
        body { margin: 0; padding: 0; }
        #cv-preview-container { margin: 0 !important; padding: 0 !important; max-width: none !important; }
        #cv-preview { margin: 0 !important; padding: 0 !important; box-shadow: none !important; }
      }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
      window.print();
      document.head.removeChild(style);
    }, 100);
  };

  // Optimize page for print preview
  useEffect(() => {
    document.body.style.background = '#f8fafc';
    return () => {
      document.body.style.background = '';
    };
  }, []);

  return (
    <CVDataProvider>
      <div className="bg-muted/30 min-h-screen">
        <header className="bg-background/95 backdrop-blur-md sticky top-0 z-50 no-print border-b">
          <div className="container mx-auto p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl font-bold font-logo bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                ProfiCV Preview
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild className="transition-all hover:scale-105">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Editor
                </Link>
              </Button>
              <Button 
                onClick={handlePrint} 
                className="bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                <Download className="mr-2 h-4 w-4" />
                Export to PDF
              </Button>
            </div>
          </div>
        </header>
        <main id="preview-main" className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div className="bg-white rounded-lg shadow-2xl print:shadow-none print:rounded-none overflow-hidden animate-fade-in">
                <CVPreview />
              </div>
            </div>
          </div>
        </main>
      </div>
    </CVDataProvider>
  );
}
