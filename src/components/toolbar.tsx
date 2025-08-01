
"use client";

import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Toolbar() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleDownloadPdf = async () => {
    setIsGenerating(true);
    
    const element = document.getElementById('cv-preview');
    if (!element) {
      toast({
        title: "Error",
        description: "CV preview element not found.",
        variant: "destructive",
      });
      setIsGenerating(false);
      return;
    }

    try {
      const html2pdf = (await import('html2pdf.js')).default;
      
      const opt = {
        margin: 0,
        filename: 'CV-Canvas.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] }
      };

      await html2pdf().from(element).set(opt).save();

    } catch (err) {
      console.error(err);
      toast({
        title: "PDF Generation Failed",
        description: "An unexpected error occurred. Please try again.",
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
            CV Canvas
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
