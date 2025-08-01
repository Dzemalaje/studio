
"use client";

import { useCvData } from "@/hooks/use-cv-data";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { LayoutGroup } from "framer-motion";
import { DefaultTemplate } from "@/components/cv-templates/default-template";
import { SidebarTemplate } from "@/components/cv-templates/sidebar-template";

const FONT_SIZE_MAP = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
};

const hexToHsl = (hex: string): [number, number, number] => {
  if (!hex || typeof hex !== 'string') return [222.2, 47.4, 11.2]; // Default color
  hex = hex.replace('#', '');
  
  // Handle shorthand hex
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
};

export function CVPreview() {
  const { cvData } = useCvData();

  const renderTemplate = () => {
    switch (cvData.template) {
      case 'left-sidebar':
        return <SidebarTemplate sidebarPosition="left" />;
      case 'right-sidebar':
        return <SidebarTemplate sidebarPosition="right" />;
      case 'default':
      default:
        return <DefaultTemplate />;
    }
  };

  const [h, s, l] = useMemo(() => hexToHsl(cvData.themeColor), [cvData.themeColor]);
  const baseFontSize = FONT_SIZE_MAP[cvData.fontSize];

  return (
    <div
      className={cn(
        "w-full max-w-[800px] mx-auto cv-preview",
        baseFontSize
      )}
      style={{
        fontFamily: `'${cvData.fontFamily}', sans-serif`,
        '--primary-h': h,
        '--primary-s': `${s}%`,
        '--primary-l': `${l}%`,
        '--primary-foreground-l': `${l > 50 ? 10 : 90}%`,
      } as React.CSSProperties}
    >
      <LayoutGroup>
        {renderTemplate()}
      </LayoutGroup>
    </div>
  );
}
