"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Languages } from "lucide-react";

export function Toolbar() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="container mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
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
          <h1 className="text-xl sm:text-2xl font-bold font-headline">CV Canvas</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Select defaultValue="en">
            <SelectTrigger className="w-[120px] hidden sm:flex">
              <div className="flex items-center gap-2">
                <Languages className="h-4 w-4" />
                <SelectValue placeholder="Language" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es" disabled>Español</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="modern">
            <SelectTrigger className="w-[140px] hidden sm:flex">
              <SelectValue placeholder="Template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="classic" disabled>Classic</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handlePrint}>
            <Download className="mr-0 sm:mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Download PDF</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
