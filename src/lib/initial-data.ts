
import type { CVData } from "./types";

export const initialCVData: CVData = {
  template: "default",
  themeColor: "#48A9A6",
  fontFamily: "PT Sans",
  fontSize: "base",
  personalDetailsBackground: true,
  personalDetails: {
    name: "Jane Doe",
    title: "Full Stack Developer",
    email: "jane.doe@example.com",
    phone: "(123) 456-7890",
    location: "San Francisco, CA",
    website: "janedoe.dev",
    summary: "Dedicated and innovative Full Stack Developer with 5+ years of experience in building and maintaining web applications. Proficient in JavaScript, React, Node.js, and cloud technologies. Passionate about creating seamless user experiences and writing clean, efficient code.",
    profilePicture: "",
  },
  workExperience: [
    {
      id: "work-1",
      role: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      startDate: "Jan 2020",
      endDate: "Present",
      description: "• Led the development of a new client-facing dashboard using React and TypeScript.\n• Improved application performance by 30% through code optimization and bundle size reduction.\n• Mentored junior developers and conducted code reviews.",
      summary: "As a Senior Frontend Developer, I spearheaded the creation of a cutting-edge client dashboard, driving significant performance gains and fostering team growth through mentorship.",
    },
    {
      id: "work-2",
      role: "Backend Developer",
      company: "Innovate Co.",
      startDate: "Jun 2017",
      endDate: "Dec 2019",
      description: "• Designed and implemented RESTful APIs for a high-traffic e-commerce platform using Node.js and Express.\n• Managed database schemas and migrations in PostgreSQL.\n• Collaborated with a team of 5 developers in an Agile environment.",
      summary: "At Innovate Co., I was instrumental in architecting and deploying robust backend services for a major e-commerce site, focusing on scalability and database integrity within an agile team.",
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.S. in Computer Science",
      institution: "University of Technology",
      startDate: "Sep 2013",
      endDate: "May 2017",
    },
  ],
  skills: [
    { id: "skill-1", name: "JavaScript" },
    { id: "skill-2", name: "TypeScript" },
    { id: "skill-3", name: "React" },
    { id: "skill-4", name: "Next.js" },
    { id: "skill-5", name: "Node.js" },
    { id: "skill-6", name: "GraphQL" },
    { id: "skill-7", name: "PostgreSQL" },
    { id: "skill-8", name: "Docker" },
  ],
  projects: [],
  certifications: [],
  languages: [
    { id: 'lang-1', name: 'English', level: 4 },
    { id: 'lang-2', name: 'Spanish', level: 2 },
  ],
};
