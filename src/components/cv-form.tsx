
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PersonalDetailsForm } from "@/components/sections/personal-details-form";
import { ExperienceForm } from "@/components/sections/experience-form";
import { EducationForm } from "@/components/sections/education-form";
import { SkillsForm } from "@/components/sections/skills-form";
import { Briefcase, GraduationCap, User, Wrench, Palette, AppWindow, Award, Languages as LanguagesIcon } from "lucide-react";
import { CustomizationForm } from "./sections/customization-form";
import { Card } from "@/components/ui/card";
import { ProjectsForm } from "./sections/projects-form";
import { CertificationsForm } from "./sections/certifications-form";
import { LanguagesForm } from "./sections/languages-form";

export function CVForm() {
  return (
    <Accordion
      type="single"
      defaultValue="personal"
      collapsible
      className="w-full space-y-4"
    >
      <Card>
        <AccordionItem value="personal" className="border-b-0">
          <AccordionTrigger className="px-6">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="text-lg font-headline">Personal Details</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6">
            <PersonalDetailsForm />
          </AccordionContent>
        </AccordionItem>
      </Card>
      <Card>
        <AccordionItem value="experience" className="border-b-0">
          <AccordionTrigger className="px-6">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              <span className="text-lg font-headline">Work Experience</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6">
            <ExperienceForm />
          </AccordionContent>
        </AccordionItem>
      </Card>
      <Card>
        <AccordionItem value="education" className="border-b-0">
          <AccordionTrigger className="px-6">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              <span className="text-lg font-headline">Education</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6">
            <EducationForm />
          </AccordionContent>
        </AccordionItem>
      </Card>
       <Card>
        <AccordionItem value="projects" className="border-b-0">
          <AccordionTrigger className="px-6">
            <div className="flex items-center gap-2">
              <AppWindow className="h-5 w-5" />
              <span className="text-lg font-headline">Projects</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6">
            <ProjectsForm />
          </AccordionContent>
        </AccordionItem>
      </Card>
      <Card>
        <AccordionItem value="skills" className="border-b-0">
          <AccordionTrigger className="px-6">
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              <span className="text-lg font-headline">Skills</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6">
            <SkillsForm />
          </AccordionContent>
        </AccordionItem>
      </Card>
       <Card>
        <AccordionItem value="certifications" className="border-b-0">
          <AccordionTrigger className="px-6">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <span className="text-lg font-headline">Certifications</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6">
            <CertificationsForm />
          </AccordionContent>
        </AccordionItem>
      </Card>
       <Card>
        <AccordionItem value="languages" className="border-b-0">
          <AccordionTrigger className="px-6">
            <div className="flex items-center gap-2">
              <LanguagesIcon className="h-5 w-5" />
              <span className="text-lg font-headline">Languages</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6">
            <LanguagesForm />
          </AccordionContent>
        </AccordionItem>
      </Card>
      <Card>
        <AccordionItem value="customization" className="border-b-0">
          <AccordionTrigger className="px-6">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              <span className="text-lg font-headline">Customization</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6">
            <CustomizationForm />
          </AccordionContent>
        </AccordionItem>
      </Card>
    </Accordion>
  );
}
