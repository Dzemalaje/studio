"use client";

import { useCvData } from "@/hooks/use-cv-data";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Globe, MapPin, Briefcase, GraduationCap, Calendar, Sparkles } from "lucide-react";

export function CVPreview() {
  const { cvData } = useCvData();
  const { personalDetails, workExperience, education, skills } = cvData;

  return (
    <div className="bg-card text-card-foreground shadow-lg rounded-lg p-8 aspect-[210/297] w-full max-w-[800px] mx-auto overflow-y-auto cv-preview">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">{personalDetails.name}</h1>
        <p className="text-xl text-muted-foreground font-light">{personalDetails.title}</p>
        <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-2 mt-4 text-sm text-muted-foreground">
          {personalDetails.email && <div className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>{personalDetails.email}</span></div>}
          {personalDetails.phone && <div className="flex items-center gap-2"><Phone className="h-4 w-4" /><span>{personalDetails.phone}</span></div>}
          {personalDetails.website && <div className="flex items-center gap-2"><Globe className="h-4 w-4" /><span>{personalDetails.website}</span></div>}
          {personalDetails.location && <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>{personalDetails.location}</span></div>}
        </div>
      </header>

      <main>
        {personalDetails.summary && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary">Summary</h2>
            <p className="text-sm text-foreground/80 whitespace-pre-wrap">{personalDetails.summary}</p>
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
                        <p className="text-sm text-foreground/90 italic whitespace-pre-wrap">{job.summary}</p>
                     </div>
                  )}
                  <p className="text-sm text-foreground/80 mt-2 whitespace-pre-wrap">{job.description}</p>
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
                <div key={skill.id} className="bg-primary/10 text-primary font-medium text-sm px-3 py-1 rounded-full">
                  {skill.name}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
