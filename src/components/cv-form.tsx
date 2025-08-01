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
import { Briefcase, GraduationCap, User, Wrench } from "lucide-react";

export function CVForm() {
  return (
    <Accordion
      type="multiple"
      defaultValue={["personal", "experience", "education", "skills"]}
      className="w-full"
    >
      <AccordionItem value="personal">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span className="text-lg font-headline">Personal Details</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <PersonalDetailsForm />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="experience">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            <span className="text-lg font-headline">Work Experience</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ExperienceForm />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="education">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            <span className="text-lg font-headline">Education</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <EducationForm />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="skills">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            <span className="text-lg font-headline">Skills</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <SkillsForm />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
