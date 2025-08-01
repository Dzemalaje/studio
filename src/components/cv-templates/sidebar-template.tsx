
"use client";

import { useCvData } from "@/hooks/use-cv-data";
import { Briefcase, GraduationCap, Calendar, Mail, Phone, Globe, MapPin, AppWindow, Link as LinkIcon, Award, Languages as LanguagesIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Progress } from "../ui/progress";

const MotionDiv = motion.div;
const PROFICIENCY_LEVELS = ["Beginner", "Intermediate", "Advanced", "Fluent", "Native"];

export const SidebarTemplate = ({ sidebarPosition }: { sidebarPosition: 'left' | 'right' }) => {
  const { cvData } = useCvData();
  const { personalDetails, workExperience, education, skills, projects, certifications, languages, personalDetailsBackground } = cvData;

  const getResponsiveValue = (base: number, multiplier = 1) => {
    return { fontSize: `${base * multiplier}em` };
  };

  const sidebar = (
    <motion.aside
      layoutId="sidebar"
      className={`p-6 rounded-lg space-y-6 h-full break-inside-avoid ${personalDetailsBackground ? 'bg-primary/5' : ''}`}
    >
      <MotionDiv layoutId="personal-details-section">
        <div className="text-center">
          {personalDetails.profilePicture && (
            <motion.div layoutId="profile-picture" className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-primary/20">
              <Image src={personalDetails.profilePicture} alt="Profile" width={128} height={128} className="object-cover w-full h-full" />
            </motion.div>
          )}
          <h1 className="font-bold font-headline text-primary" style={getResponsiveValue(2.2)}>{personalDetails.name}</h1>
          <p className="font-light text-muted-foreground" style={getResponsiveValue(1.2)}>{personalDetails.title}</p>
        </div>
        <div>
          <h2 className="font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary" style={getResponsiveValue(1.4)}>Contact</h2>
          <div className="space-y-3" style={getResponsiveValue(0.95)}>
              {personalDetails.email && <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary"/><span>{personalDetails.email}</span></div>}
              {personalDetails.phone && <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary"/><span>{personalDetails.phone}</span></div>}
              {personalDetails.website && <div className="flex items-center gap-2"><Globe className="h-4 w-4 text-primary"/><span>{personalDetails.website}</span></div>}
              {personalDetails.location && <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary"/><span>{personalDetails.location}</span></div>}
          </div>
        </div>
      </MotionDiv>
       {skills.length > 0 && (
          <MotionDiv layoutId="skills-section">
            <h2 className="font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary" style={getResponsiveValue(1.4)}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div key={skill.id} className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full text-sm">
                  {skill.name}
                </div>
              ))}
            </div>
          </MotionDiv>
        )}
        {education.length > 0 && (
          <MotionDiv layoutId="education-section">
            <h2 className="font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary flex items-center gap-2" style={getResponsiveValue(1.4)}><GraduationCap className="h-5 w-5"/>Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                    <h3 className="font-bold" style={getResponsiveValue(1.1)}>{edu.degree}</h3>
                    <p className="text-muted-foreground" style={getResponsiveValue(0.95)}>{edu.institution}</p>
                    <div className="text-muted-foreground/80 flex items-center gap-2 mt-1" style={getResponsiveValue(0.85)}>
                        <Calendar className="h-3 w-3"/>
                        <span>{edu.startDate} - {edu.endDate || 'Present'}</span>
                    </div>
                </div>
              ))}
            </div>
          </MotionDiv>
        )}
         {languages.length > 0 && (
          <MotionDiv layoutId="languages-section">
            <h2 className="font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary flex items-center gap-2" style={getResponsiveValue(1.4)}><LanguagesIcon className="h-5 w-5"/>Languages</h2>
            <div className="space-y-3">
              {languages.map((lang) => (
                <div key={lang.id}>
                  <div className="flex justify-between items-center mb-1" style={getResponsiveValue(0.95)}>
                    <span className="font-semibold">{lang.name}</span>
                    <span className="text-muted-foreground">{PROFICIENCY_LEVELS[lang.level]}</span>
                  </div>
                  <Progress value={(lang.level + 1) * 20} className="h-1.5" />
                </div>
              ))}
            </div>
          </MotionDiv>
        )}
    </motion.aside>
  );

  const mainContent = (
     <motion.main layoutId="main-content" className="space-y-8 p-6">
        {personalDetails.summary && (
          <MotionDiv layoutId="summary-section" className="break-inside-avoid">
            <h2 className="font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary" style={getResponsiveValue(1.8)}>Summary</h2>
            <p className="whitespace-pre-wrap text-foreground/80">{personalDetails.summary}</p>
          </MotionDiv>
        )}

        {workExperience.length > 0 && (
          <MotionDiv layoutId="experience-section" className="break-inside-avoid">
            <h2 className="font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary flex items-center gap-2" style={getResponsiveValue(1.8)}><Briefcase className="h-6 w-6"/>Work Experience</h2>
            <div className="space-y-6">
              {workExperience.map((job) => (
                <div key={job.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold" style={getResponsiveValue(1.2)}>{job.role}</h3>
                    <div className="text-muted-foreground flex items-center gap-2" style={getResponsiveValue(0.9)}>
                      <Calendar className="h-4 w-4"/>
                      <span>{job.startDate} - {job.endDate || 'Present'}</span>
                    </div>
                  </div>
                  <p className="font-semibold text-primary" style={getResponsiveValue(1.1)}>{job.company}</p>
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
            <h2 className="font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary flex items-center gap-2" style={getResponsiveValue(1.8)}><AppWindow className="h-6 w-6"/>Projects</h2>
            <div className="space-y-6">
              {projects.map((proj) => (
                <div key={proj.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold" style={getResponsiveValue(1.2)}>{proj.name}</h3>
                    {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground flex items-center gap-1 hover:text-primary" style={getResponsiveValue(0.9)}><LinkIcon className="h-3 w-3" /><span>{proj.link}</span></a>}
                  </div>
                  <p className="mt-2 whitespace-pre-wrap text-foreground/80">{proj.description}</p>
                </div>
              ))}
            </div>
          </MotionDiv>
        )}
         {certifications.length > 0 && (
          <MotionDiv layoutId="certifications-section" className="mb-8 break-inside-avoid">
            <h2 className="font-bold font-headline border-b-2 border-primary pb-2 mb-4 text-primary flex items-center gap-2" style={getResponsiveValue(1.8)}><Award className="h-6 w-6"/>Certifications</h2>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="break-inside-avoid">
                  <h3 className="font-bold" style={getResponsiveValue(1.2)}>{cert.name}</h3>
                  <p className="text-muted-foreground">{cert.issuer} - {cert.date}</p>
                </div>
              ))}
            </div>
          </MotionDiv>
        )}
      </motion.main>
  );

  return (
    <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-card text-card-foreground p-8 break-inside-avoid">
        {sidebarPosition === 'left' ? (
            <>
                <div className="md:col-span-1">{sidebar}</div>
                <div className="md:col-span-2">{mainContent}</div>
            </>
        ) : (
            <>
                <div className="md:col-span-2">{mainContent}</div>
                <div className="md:col-span-1">{sidebar}</div>
            </>
        )}
    </motion.div>
  )
}
