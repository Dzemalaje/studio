
"use client";

import { CVForm } from '@/components/cv-form';
import { CVPreview } from '@/components/cv-preview';
import { Toolbar } from '@/components/toolbar';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Printer } from 'lucide-react';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function CVBuilder() {
  const [mobileView, setMobileView] = useState<'form' | 'preview'>('form');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toolbar />
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 sm:p-8">
        <div className={`${mobileView === 'form' ? 'block' : 'hidden'} lg:block no-print`}>
          <CVForm />
        </div>
        
        <div className="lg:hidden no-print fixed bottom-4 right-4 z-20">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                 <Button onClick={() => setMobileView(prev => prev === 'form' ? 'preview' : 'form')} size="icon" className="rounded-full h-14 w-14 shadow-lg text-white">
                    {mobileView === 'form' ? <Eye /> : <Pencil />}
                  </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{mobileView === 'form' ? 'Show Preview' : 'Show Form'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className={`${mobileView === 'preview' ? 'block' : 'hidden'} lg:block`}>
          <div id="cv-preview-container" className="lg:sticky lg:top-24 h-[calc(100vh-10rem)] overflow-y-auto">
             <CVPreview />
          </div>
        </div>
      </main>
    </div>
  );
}
