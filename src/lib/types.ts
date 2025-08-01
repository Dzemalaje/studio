
import { z } from "zod";

export const PersonalDetailsSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  title: z.string().min(1, "Job title is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
  summary: z.string().optional(),
  profilePicture: z.string().optional(),
});
export type PersonalDetails = z.infer<typeof PersonalDetailsSchema>;

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  summary: string;
}

export interface Education {
  id:string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  link: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Language {
  id: string;
  name: string;
  level: number;
}

export type FontSize = 10 | 12 | 14;

export interface CVData {
  personalDetails: PersonalDetails;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  template: 'default' | 'left-sidebar' | 'right-sidebar';
  themeColor: string;
  fontFamily: string;
  fontSize: FontSize;
}
