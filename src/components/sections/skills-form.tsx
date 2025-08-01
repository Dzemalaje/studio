"use client";

import { useCvData } from "@/hooks/use-cv-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState, KeyboardEvent } from "react";
import { v4 as uuidv4 } from "uuid";

export function SkillsForm() {
  const { cvData, setCvData } = useCvData();
  const [currentSkill, setCurrentSkill] = useState("");

  const handleAddSkill = () => {
    if (currentSkill.trim()) {
      setCvData((prev) => ({
        ...prev,
        skills: [...prev.skills, { id: uuidv4(), name: currentSkill.trim() }],
      }));
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));
  };
  
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  }

  return (
    <div className="space-y-4 p-1">
      <div className="space-y-2">
        <Label htmlFor="skill-input">Add Skill</Label>
        <div className="flex gap-2">
          <Input
            id="skill-input"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="e.g., React"
          />
          <Button onClick={handleAddSkill}>Add</Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {cvData.skills.length === 0 && (
            <p className="text-sm text-muted-foreground">No skills added yet.</p>
        )}
        {cvData.skills.map((skill) => (
          <Badge key={skill.id} variant="secondary" className="pl-3 pr-1 py-1 text-sm">
            {skill.name}
            <button
              onClick={() => handleRemoveSkill(skill.id)}
              className="ml-2 rounded-full hover:bg-muted-foreground/20 p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
