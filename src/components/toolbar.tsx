
"use client";

import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { exportCvToPdf } from "@/lib/pdf-export";

export function Toolbar() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleDownloadPdf = async () => {
    setIsGenerating(true);
    try {
      await exportCvToPdf('cv-preview-container', 'ProfiCV_Resume.pdf');
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
