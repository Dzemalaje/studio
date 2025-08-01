
"use client";

import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Toolbar() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleDownloadPdf = async () => {
    const cvElement = document.querySelector<HTMLElement>('.cv-preview');

    if (!cvElement) {
      toast({
        title: "Error",
        description: "Could not find the CV preview element to download.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);

    try {
       // A4 dimensions in points (1 point = 1/72 inch)
      const a4Width = 595.28;
      const a4Height = 841.89;
      
      const canvas = await html2canvas(cvElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        width: cvElement.scrollWidth,
        height: cvElement.scrollHeight,
        windowWidth: cvElement.scrollWidth,
        windowHeight: cvElement.scrollHeight
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });
      
      const pdfWidth = a4Width;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      const totalPages = Math.ceil(pdfHeight / a4Height);

      for (let i = 0; i < totalPages; i++) {
        if (i > 0) {
          pdf.addPage();
        }
        const yPos = -(a4Height * i);
        pdf.addImage(imgData, 'PNG', 0, yPos, pdfWidth, pdfHeight);
      }
     
      pdf.save('ProfiCV_Resume.pdf');

    } catch (error) {
      console.error(error);
      toast({
        title: "PDF Generation Failed",
        description: "An unexpected error occurred while generating the PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };


  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 no-print">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <h1 className="text-2xl font-bold font-logo">
            ProfiCV
          </h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
            <Button 
              onClick={handleDownloadPdf} 
              size="sm"
              className="shadow-sm transition-transform hover:scale-105 text-white"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              {isGenerating ? 'Generating...' : 'Download PDF'}
            </Button>
        </div>
      </div>
    </header>
  );
}
