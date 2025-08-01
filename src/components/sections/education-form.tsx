"use client";

import { useCvData } from "@/hooks/use-cv-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

export function EducationForm() {
  const { cvData, setCvData } = useCvData();

  const handleAddEducation = () => {
    setCvData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id: uuidv4(), degree: "", institution: "", startDate: "", endDate: "" },
      ],
    }));
  };

  const handleRemoveEducation = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const handleChange = (id: string, field: string, value: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  return (
    <div className="space-y-4">
      {cvData.education.map((edu, index) => (
        <Card key={edu.id}>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`degree-${edu.id}`}>Degree/Certificate</Label>
                <Input
                  id={`degree-${edu.id}`}
                  value={edu.degree}
                  onChange={(e) => handleChange(edu.id, "degree", e.target.value)}
                  placeholder="e.g., B.S. in Computer Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                <Input
                  id={`institution-${edu.id}`}
                  value={edu.institution}
                  onChange={(e) => handleChange(edu.id, "institution", e.target.value)}
                  placeholder="e.g., University of Technology"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`edu-start-date-${edu.id}`}>Start Date</Label>
                <Input
                  id={`edu-start-date-${edu.id}`}
                  value={edu.startDate}
                  onChange={(e) => handleChange(edu.id, "startDate", e.target.value)}
                  placeholder="e.g., Sept 2018"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`edu-end-date-${edu.id}`}>End Date</Label>
                <Input
                  id={`edu-end-date-${edu.id}`}
                  value={edu.endDate}
                  onChange={(e) => handleChange(edu.id, "endDate", e.target.value)}
                  placeholder="e.g., June 2022"
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="mt-4 text-destructive hover:bg-destructive/10"
              onClick={() => handleRemoveEducation(edu.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={handleAddEducation} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" /> Add Education
      </Button>
    </div>
  );
}
