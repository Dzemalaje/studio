
"use client";

import { useCvData } from "@/hooks/use-cv-data";
import { useMemo } from "react";
import { cn, hexToHsl } from "@/lib/utils";
import { LayoutGroup } from "framer-motion";
import { DefaultTemplate } from "@/components/cv-templates/default-template";
import { SidebarTemplate } from "@/components/cv-templates/sidebar-template";

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

  return (
    <div
      id="cv-preview-container"
      className="w-full max-w-[800px] mx-auto"
    >
        <div
            id="cv-preview"
            className="cv-preview"
            style={{
                fontFamily: `'${cvData.fontFamily}', sans-serif`,
                fontSize: `${cvData.fontSize}px`,
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
    </div>
  );
}
