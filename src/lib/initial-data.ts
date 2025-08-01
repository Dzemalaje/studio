import type { CVData } from "./types";
import { v4 as uuidv4 } from "uuid";

export const initialCVData: CVData = {
  personalDetails: {
    name: "Jane Doe",
    title: "Full Stack Developer",
    email: "jane.doe@example.com",
    phone: "(123) 456-7890",
    location: "San Francisco, CA",
    website: "janedoe.dev",
    summary: "Dedicated and innovative Full Stack Developer with 5+ years of experience in building and maintaining web applications. Proficient in JavaScript, React, Node.js, and cloud technologies. Passionate about creating seamless user experiences and writing clean, efficient code."
  },
  workExperience: [
    {
      id: uuidv4(),
      role: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      startDate: "Jan 2020",
      endDate: "Present",
      description: "• Led the development of a new client-facing dashboard using React and TypeScript.\n• Improved application performance by 30% through code optimization and bundle size reduction.\n• Mentored junior developers and conducted code reviews.",
      summary: "As a Senior Frontend Developer, I spearheaded the creation of a cutting-edge client dashboard, driving significant performance gains and fostering team growth through mentorship.",
    },
    {
      id: uuidv4(),
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
      id: uuidv4(),
      degree: "B.S. in Computer Science",
      institution: "University of Technology",
      startDate: "Sep 2013",
      endDate: "May 2017",
    },
  ],
  skills: [
    { id: uuidv4(), name: "JavaScript" },
    { id: uuidv4(), name: "TypeScript" },
    { id: uuidv4(), name: "React" },
    { id: uuidv4(), name: "Next.js" },
    { id: uuidv4(), name: "Node.js" },
    { id: uuidv4(), name: "GraphQL" },
    { id: uuidv4(), name: "PostgreSQL" },
    { id: uuidv4(), name: "Docker" },
  ],
};
