
"use client";

import { useCvData } from "@/hooks/use-cv-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { useCallback } from "react";
import { Project } from "@/lib/types";

export function ProjectsForm() {
  const { cvData, setCvData } = useCvData();

  const handleAddProject = useCallback(() => {
    setCvData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { id: uuidv4(), name: "", link: "", description: "" },
      ],
    }));
  }, [setCvData]);

  const handleRemoveProject = useCallback((id: string) => {
    setCvData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
  }, [setCvData]);

  const handleChange = useCallback((id: string, field: keyof Project, value: string) => {
    setCvData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    }));
  }, [setCvData]);

  return (
    <div className="space-y-4">
      {cvData.projects.map((proj) => (
        <Card key={proj.id}>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`project-name-${proj.id}`}>Project Name</Label>
                <Input
                  id={`project-name-${proj.id}`}
                  value={proj.name}
                  onChange={(e) => handleChange(proj.id, "name", e.target.value)}
                  placeholder="e.g., My Awesome App"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`project-link-${proj.id}`}>Link</Label>
                <Input
                  id={`project-link-${proj.id}`}
                  value={proj.link}
                  onChange={(e) => handleChange(proj.id, "link", e.target.value)}
                  placeholder="e.g., myawesomeapp.com"
                />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor={`project-description-${proj.id}`}>Description</Label>
                <Textarea
                  id={`project-description-${proj.id}`}
                  value={proj.description}
                  onChange={(e) => handleChange(proj.id, "description", e.target.value)}
                  placeholder="Describe your project"
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="mt-4 text-destructive hover:bg-destructive/10"
              onClick={() => handleRemoveProject(proj.id)}
              aria-label={`Remove ${proj.name} project entry`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={handleAddProject} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" /> Add Project
      </Button>
    </div>
  );
}
