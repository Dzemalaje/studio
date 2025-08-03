"use client";

import { Button } from "@/components/ui/button";
import { Download, Sparkles } from "lucide-react";
import Link from "next/link";

export function Toolbar() {
  const handlePrint = async () => {
    const { optimizePrint } = await import('@/lib/print-utils');
    optimizePrint();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 no-print">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl font-bold font-logo bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              ProfiCV
            </h1>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button 
            size="sm"
            className="shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl text-white bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
            asChild
          >
            <Link href="/preview">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}