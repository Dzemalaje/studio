
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

const formSections = [
    { id: 'customization', icon: Palette, title: 'Customization', component: <CustomizationForm /> },
    { id: 'personal', icon: User, title: 'Personal Details', component: <PersonalDetailsForm /> },
    { id: 'experience', icon: Briefcase, title: 'Work Experience', component: <ExperienceForm /> },
    { id: 'education', icon: GraduationCap, title: 'Education', component: <EducationForm /> },
    { id: 'projects', icon: AppWindow, title: 'Projects', component: <ProjectsForm /> },
    { id: 'skills', icon: Wrench, title: 'Skills', component: <SkillsForm /> },
    { id: 'certifications', icon: Award, title: 'Certifications', component: <CertificationsForm /> },
    { id: 'languages', icon: LanguagesIcon, title: 'Languages', component: <LanguagesForm /> },
];

export function CVForm() {
  return (
    <Accordion
      type="single"
      defaultValue="customization"
      collapsible
      className="w-full space-y-4"
    >
      {formSections.map(({ id, icon: Icon, title, component }) => (
          <Card key={id}>
            <AccordionItem value={id} className="border-b-0">
              <AccordionTrigger className="px-6">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  <span className="text-lg font-headline">{title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6">
                {component}
              </AccordionContent>
            </AccordionItem>
          </Card>
      ))}
    </Accordion>
  );
}
