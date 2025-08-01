
"use client";

import { useCvData } from "@/hooks/use-cv-data";
import { Briefcase, GraduationCap, Calendar, Mail, Phone, Globe, MapPin, AppWindow, Award, Languages, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { Progress } from "../ui/progress";

const FONT_SIZE_MAP = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
};

const MotionDiv = motion.div;
const PROFICIENCY_LEVELS = ["Beginner", "Intermediate", "Advanced", "Fluent", "Native"];

export const DefaultTemplate = () => {
  const { cvData } = useCvData();
  const { personalDetails, workExperience, education, skills, projects, certifications, languages, fontSize, personalDetailsBackground } = cvData;
  const baseTextSize = FONT_SIZE_MAP[fontSize];

  return (
    <motion.div layout className="bg-card text-card-foreground p-8 space-y-8 cv-page">
      <MotionDiv
        layoutId="personal-details-section"
        className={cn(
          'mb-8 break-inside-avoid',
          { 'bg-primary/5 p-8 rounded-lg': personalDetailsBackground }
        )}
      >
        <header className="text-center">
          {personalDetails.profilePicture && (
            <motion.div layoutId="profile-picture" className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-primary/20">
              <Image src={personalDetails.profilePicture} alt="Profile" width={128} height={128} className="object-cover w-full h-full" />
            </motion.div>
          )}
          <h1 className={cn("text-4xl font-bold font-headline text-primary", { 'text-5xl': fontSize === 'lg', 'text-3xl': fontSize === 'sm' })}>{personalDetails.name}</h1>
          <p className={cn("text-xl text-muted-foreground font-light", {'text-2xl': fontSize === 'lg', 'text-lg': fontSize === 'sm'})}>{personalDetails.title}</p>
          <div className={cn("flex justify-center items-center flex-wrap gap-x-4 gap-y-2 mt-4 text-sm text-muted-foreground", baseTextSize)}>
            {personalDetails.email && <div className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>{personalDetails.email}</span></div>}
            {personalDetails.phone && <div className="flex items-center gap-2"><Phone className="h-4 w-4" /><span>{personalDetails.phone}</span></div>}
            {personalDetails.website && <div className="flex items-center gap-2"><Globe className="h-4 w-4" /><span>{personalDetails.website}</span></div>}
            {personalDetails.location && <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>{personalDetails.location}</span></div>}
          </div>
        </header>
      </MotionDiv>

      <main className={baseTextSize}>
        {personalDetails.summary && (
          <MotionDiv layoutId="summary-section" className="mb-8 break-inside-avoid">
            <h2 className="text-2xl font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary">Summary</h2>
            <p className="whitespace-pre-wrap text-foreground/80">{personalDetails.summary}</p>
          </MotionDiv>
        )}
        
        {workExperience.length > 0 && (
          <MotionDiv layoutId="experience-section" className="mb-8">
            <h2 className="text-2xl font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary flex items-center gap-2"><Briefcase className="h-6 w-6"/>Work Experience</h2>
            <div className="space-y-6">
              {workExperience.map((job) => (
                <div key={job.id} className="break-inside-avoid">
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
          </MotionDiv>
        )}
        
        {projects.length > 0 && (
          <MotionDiv layoutId="projects-section" className="mb-8 break-inside-avoid">
            <h2 className="text-2xl font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary flex items-center gap-2"><AppWindow className="h-6 w-6"/>Projects</h2>
            <div className="space-y-6">
              {projects.map((proj) => (
                <div key={proj.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-bold">{proj.name}</h3>
                    {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground flex items-center gap-1 hover:text-primary"><LinkIcon className="h-3 w-3" /><span>{proj.link}</span></a>}
                  </div>
                  <p className="mt-2 whitespace-pre-wrap text-foreground/80">{proj.description}</p>
                </div>
              ))}
            </div>
          </MotionDiv>
        )}

        {education.length > 0 && (
           <MotionDiv layoutId="education-section" className="mb-8 break-inside-avoid">
            <h2 className="text-2xl font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary flex items-center gap-2"><GraduationCap className="h-6 w-6"/>Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
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
           </MotionDiv>
        )}

        {skills.length > 0 && (
          <MotionDiv layoutId="skills-section" className="mb-8 break-inside-avoid">
            <h2 className="text-2xl font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div key={skill.id} className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full">
                  {skill.name}
                </div>
              ))}
            </div>
          </MotionDiv>
        )}

        {certifications.length > 0 && (
          <MotionDiv layoutId="certifications-section" className="mb-8 break-inside-avoid">
            <h2 className="text-2xl font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary flex items-center gap-2"><Award className="h-6 w-6"/>Certifications</h2>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="break-inside-avoid">
                  <h3 className="text-lg font-bold">{cert.name}</h3>
                  <p className="text-md text-muted-foreground">{cert.issuer} - {cert.date}</p>
                </div>
              ))}
            </div>
          </MotionDiv>
        )}

        {languages.length > 0 && (
          <MotionDiv layoutId="languages-section" className="break-inside-avoid">
            <h2 className="text-2xl font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary flex items-center gap-2"><Languages className="h-6 w-6"/>Languages</h2>
            <div className="grid grid-cols-2 gap-4">
              {languages.map((lang) => (
                <div key={lang.id} className="break-inside-avoid">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">{lang.name}</span>
                    <span className="text-sm text-muted-foreground">{PROFICIENCY_LEVELS[lang.level]}</span>
                  </div>
                   <Progress value={(lang.level + 1) * 20} className="h-2" />
                </div>
              ))}
            </div>
          </MotionDiv>
        )}
      </main>
    </motion.div>
  )
}
