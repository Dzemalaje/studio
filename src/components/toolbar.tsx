"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function Toolbar() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 no-print">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="h-8 w-8 text-primary"
          >
            <rect width="256" height="256" fill="none" />
            <path
              d="M168,224H32a8,8,0,0,1-8-8V88a8,8,0,0,1,8-8H168"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <path
              d="M80,80V40a8,8,0,0,1,8-8h96a8,8,0,0,1,8,8V184a8,8,0,0,1-8,8H168"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
          </svg>
          <h1 className="ml-2 text-2xl font-bold font-headline">
            ProfiCV
          </h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
            <Button onClick={handlePrint} size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
        </div>
      </div>
    </header>
  );
}
