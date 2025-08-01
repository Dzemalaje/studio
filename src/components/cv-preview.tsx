
"use client";

import { useCvData } from "@/hooks/use-cv-data";
import { useMemo } from "react";
import { cn, hexToHsl } from "@/lib/utils";
import { LayoutGroup } from "framer-motion";
import { DefaultTemplate } from "@/components/cv-templates/default-template";
import { SidebarTemplate } from "@/components/cv-templates/sidebar-template";

const FONT_SIZE_MAP = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
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
      id="cv-preview"
      className={cn(
        "w-full max-w-[800px] mx-auto",
        baseFontSize
      )}
      style={{
        fontFamily: `'${cvData.fontFamily}', sans-serif`,
        '--primary-h': h,
        '--primary-s': `${s}%`,
        '--primary-l': `${l}%`,
        '--primary-foreground-l': l > 50 ? '10%' : '98%',
      } as React.CSSProperties}
    >
      <LayoutGroup>
        {renderTemplate()}
      </LayoutGroup>
    </div>
  );
}
