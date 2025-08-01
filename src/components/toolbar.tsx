
"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2pdf from 'html2pdf.js';

export function Toolbar() {
  const handleDownloadPdf = () => {
    const element = document.getElementById('cv-preview');
    if (!element) return;

    const opt = {
      margin:       5,
      filename:     'cv-canvas-resume.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 3 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <h1 className="text-2xl font-bold font-logo">
            CV Canvas
          </h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
            <Button 
              onClick={handleDownloadPdf} 
              size="sm"
              className="shadow-sm transition-transform hover:scale-105 text-white"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
        </div>
      </div>
    </header>
  );
}
