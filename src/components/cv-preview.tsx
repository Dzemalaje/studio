"use client";

import { useCvData } from "@/hooks/use-cv-data";
import { Briefcase, GraduationCap, Calendar, Mail, Phone, Globe, MapPin } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

const FONT_SIZE_MAP = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
};

const DefaultTemplate = () => {
  const { cvData } = useCvData();
  const { personalDetails, workExperience, education, skills, fontSize } = cvData;

  const baseTextSize = FONT_SIZE_MAP[fontSize];

  return (
    <>
      <header className="text-center mb-8">
        <h1 className={cn("text-4xl font-bold font-headline text-primary", { 'text-5xl': fontSize === 'lg', 'text-3xl': fontSize === 'sm' })}>{personalDetails.name}</h1>
        <p className={cn("text-xl text-muted-foreground font-light", {'text-2xl': fontSize === 'lg', 'text-lg': fontSize === 'sm'})}>{personalDetails.title}</p>
        <div className={cn("flex justify-center items-center flex-wrap gap-x-4 gap-y-2 mt-4 text-sm text-muted-foreground", baseTextSize)}>
          {personalDetails.email && <div className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>{personalDetails.email}</span></div>}
          {personalDetails.phone && <div className="flex items-center gap-2"><Phone className="h-4 w-4" /><span>{personalDetails.phone}</span></div>}
          {personalDetails.website && <div className="flex items-center gap-2"><Globe className="h-4 w-4" /><span>{personalDetails.website}</span></div>}
          {personalDetails.location && <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>{personalDetails.location}</span></div>}
        </div>
      </header>

      <main className={baseTextSize}>
        {personalDetails.summary && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary">Summary</h2>
            <p className="whitespace-pre-wrap text-foreground/80">{personalDetails.summary}</p>
          </section>
        )}
        
        {workExperience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary flex items-center gap-2"><Briefcase className="h-6 w-6"/>Work Experience</h2>
            <div className="space-y-6">
              {workExperience.map((job) => (
                <div key={job.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-bold">{job.role}</h3>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4"/>
                      <span>{job.startDate} - {job.endDate || 'Present'}</span>
                    </div>
                  </div>
                  <p className="text-md font-semibold text-primary">{job.company}</p>
                  {job.summary && (
                     <div className="mt-2 p-3 bg-primary/5 border-l-4 border-primary rounded-r-md">
                        <p className="italic whitespace-pre-wrap text-foreground/90">{job.summary}</p>
                     </div>
                  )}
                  <p className="mt-2 whitespace-pre-wrap text-foreground/80">{job.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary flex items-center gap-2"><GraduationCap className="h-6 w-6"/>Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-bold">{edu.degree}</h3>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4"/>
                        <span>{edu.startDate} - {edu.endDate || 'Present'}</span>
                    </div>
                  </div>
                  <p className="text-md text-muted-foreground">{edu.institution}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div key={skill.id} className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full">
                  {skill.name}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  )
}

const SidebarTemplate = ({ sidebarPosition }: { sidebarPosition: 'left' | 'right' }) => {
  const { cvData } = useCvData();
  const { personalDetails, workExperience, education, skills, fontSize } = cvData;
  const baseTextSize = FONT_SIZE_MAP[fontSize];

  const sidebar = (
    <aside className={cn("bg-primary/5 p-6 rounded-lg space-y-6", baseTextSize)}>
       <div className="text-center">
        <h1 className={cn("text-3xl font-bold font-headline text-primary", { 'text-4xl': fontSize === 'lg', 'text-2xl': fontSize === 'sm' })}>{personalDetails.name}</h1>
        <p className={cn("text-lg text-muted-foreground font-light", { 'text-xl': fontSize === 'lg', 'text-base': fontSize === 'sm' })}>{personalDetails.title}</p>
      </div>
      <div>
        <h2 className="text-xl font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary">Contact</h2>
        <div className="space-y-3">
            {personalDetails.email && <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary"/><span>{personalDetails.email}</span></div>}
            {personalDetails.phone && <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary"/><span>{personalDetails.phone}</span></div>}
            {personalDetails.website && <div className="flex items-center gap-2"><Globe className="h-4 w-4 text-primary"/><span>{personalDetails.website}</span></div>}
            {personalDetails.location && <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary"/><span>{personalDetails.location}</span></div>}
        </div>
      </div>
       {skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div key={skill.id} className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full">
                  {skill.name}
                </div>
              ))}
            </div>
          </section>
        )}
        {education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary flex items-center gap-2"><GraduationCap className="h-5 w-5"/>Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    <div className="text-xs text-muted-foreground/80 flex items-center gap-2 mt-1">
                        <Calendar className="h-3 w-3"/>
                        <span>{edu.startDate} - {edu.endDate || 'Present'}</span>
                    </div>
                </div>
              ))}
            </div>
          </section>
        )}
    </aside>
  );

  const mainContent = (
     <main className={cn("space-y-8", baseTextSize)}>
        {personalDetails.summary && (
          <section>
            <h2 className="text-2xl font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary">Summary</h2>
            <p className="whitespace-pre-wrap text-foreground/80">{personalDetails.summary}</p>
          </section>
        )}
        {workExperience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary flex items-center gap-2"><Briefcase className="h-6 w-6"/>Work Experience</h2>
            <div className="space-y-6">
              {workExperience.map((job) => (
                <div key={job.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-bold">{job.role}</h3>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4"/>
                      <span>{job.startDate} - {job.endDate || 'Present'}</span>
                    </div>
                  </div>
                  <p className="text-md font-semibold text-primary">{job.company}</p>
                   {job.summary && (
                     <div className="mt-2 p-3 bg-primary/5 border-l-4 border-primary rounded-r-md">
                        <p className="italic whitespace-pre-wrap text-foreground/90">{job.summary}</p>
                     </div>
                  )}
                  <p className="mt-2 whitespace-pre-wrap text-foreground/80">{job.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
  );

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8`}>
        {sidebarPosition === 'left' && <div className="md:col-span-1">{sidebar}</div>}
        <div className="md:col-span-2">{mainContent}</div>
        {sidebarPosition === 'right' && <div className="md:col-span-1">{sidebar}</div>}
    </div>
  )
}


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
  }

  const hexToHsl = (hex: string): [number, number, number] => {
    if (!hex) return [222.2, 47.4, 11.2];
    hex = hex.replace('#', '');
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
  }

  const [h, s, l] = hexToHsl(cvData.themeColor);
  const baseFontSize = FONT_SIZE_MAP[cvData.fontSize];

  return (
    <div 
      className={cn(
        "bg-card text-card-foreground shadow-lg rounded-lg p-8 aspect-[210/297] w-full max-w-[800px] mx-auto overflow-y-auto cv-preview transition-all duration-300 ease-in-out",
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
      {renderTemplate()}
    </div>
  );
}
