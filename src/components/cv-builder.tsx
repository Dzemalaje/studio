
"use client";

import { CVForm } from '@/components/cv-form';
import { CVPreview } from '@/components/cv-preview';
import { Toolbar } from '@/components/toolbar';
import { Button } from '@/components/ui/button';
import { Eye, Pencil } from 'lucide-react';
import { useState } from 'react';

export function CVBuilder() {
  const [mobileView, setMobileView] = useState<'form' | 'preview'>('form');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toolbar />
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 sm:p-8">
        <div className="lg:hidden no-print sticky top-16 z-10 bg-background py-2 -mx-4 sm:-mx-8 px-4 sm:px-8 mb-4">
          <div className="flex justify-center gap-2">
            <Button
              variant={mobileView === 'form' ? 'default' : 'outline'}
              onClick={() => setMobileView('form')}
              className="w-full"
            >
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </Button>
            <Button
              variant={mobileView === 'preview' ? 'default' : 'outline'}
              onClick={() => setMobileView('preview')}
              className="w-full"
            >
              <Eye className="mr-2 h-4 w-4" /> Preview
            </Button>
          </div>
        </div>

        <div className={`${mobileView === 'form' ? 'block' : 'hidden'} lg:block no-print`}>
          <CVForm />
        </div>
        
        <div className={`${mobileView === 'preview' ? 'block' : 'hidden'} lg:block`}>
          <div className="lg:sticky lg:top-24 h-[calc(100vh-10rem)] overflow-y-auto">
             <CVPreview />
          </div>
        </div>
      </main>
    </div>
  );
}
