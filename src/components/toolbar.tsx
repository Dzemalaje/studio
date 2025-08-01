
"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function Toolbar() {
  const handleDownloadPdf = async () => {
    const element = document.getElementById('cv-preview');
    if (!element) return;

    // Dynamically import the library only on the client-side
    const html2pdf = (await import('html2pdf.js')).default;

    // Clone the element to render it in isolation
    const clonedElement = element.cloneNode(true) as HTMLElement;
    
    // Style the cloned element to be off-screen and at a defined size
    clonedElement.style.position = 'absolute';
    clonedElement.style.left = '-9999px';
    clonedElement.style.width = '800px'; 
    document.body.appendChild(clonedElement);

    const opt = {
      margin:       5,
      filename:     'cv-canvas-resume.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 3, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().from(clonedElement).set(opt).save();
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      // Clean up the cloned element after PDF is generated or if an error occurs
      document.body.removeChild(clonedElement);
    }
  };

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 no-print">
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
