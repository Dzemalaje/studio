"use client";

import { useCvData } from "@/hooks/use-cv-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, PlusCircle, Sparkles, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { generateJobSummary } from "@/ai/flows/generate-job-summary";

export function ExperienceForm() {
  const { cvData, setCvData } = useCvData();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddExperience = () => {
    setCvData((prev) => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        {
          id: uuidv4(),
          role: "",
          company: "",
          startDate: "",
          endDate: "",
          description: "",
          summary: "",
        },
      ],
    }));
  };

  const handleRemoveExperience = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((exp) => exp.id !== id),
    }));
  };

  const handleChange = (id: string, field: string, value: string) => {
    setCvData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const handleGenerateSummary = async (experienceId: string) => {
    setIsLoading(experienceId);
    const experience = cvData.workExperience.find(
      (exp) => exp.id === experienceId
    );
    if (!experience || !experience.role || !experience.description) {
      toast({
        title: "Missing Information",
        description:
          "Please provide a role and responsibilities to generate a summary.",
        variant: "destructive",
      });
      setIsLoading(null);
      return;
    }

    try {
      const result = await generateJobSummary({
        role: experience.role,
        responsibilities: experience.description,
      });

      setCvData((prev) => ({
        ...prev,
        workExperience: prev.workExperience.map((exp) =>
          exp.id === experienceId ? { ...exp, summary: result.summary } : exp
        ),
      }));
      toast({
        title: "Summary Generated",
        description: "AI summary has been successfully added.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      {cvData.workExperience.map((exp, index) => (
        <Card key={exp.id}>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`role-${exp.id}`}>Role</Label>
                <Input id={`role-${exp.id}`} value={exp.role} onChange={(e) => handleChange(exp.id, 'role', e.target.value)} placeholder="e.g., Senior Developer" />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`company-${exp.id}`}>Company</Label>
                <Input id={`company-${exp.id}`} value={exp.company} onChange={(e) => handleChange(exp.id, 'company', e.target.value)} placeholder="e.g., Tech Solutions Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`start-date-${exp.id}`}>Start Date</Label>
                <Input id={`start-date-${exp.id}`} value={exp.startDate} onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)} placeholder="e.g., Jan 2020" />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
                <Input id={`end-date-${exp.id}`} value={exp.endDate} onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)} placeholder="e.g., Present" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`description-${exp.id}`}>Description / Responsibilities</Label>
              <Textarea id={`description-${exp.id}`} value={exp.description} onChange={(e) => handleChange(exp.id, 'description', e.target.value)} placeholder="Describe your responsibilities and achievements..." />
            </div>
            <div className="space-y-2">
                <Label htmlFor={`summary-${exp.id}`}>AI Generated Summary</Label>
                <Textarea id={`summary-${exp.id}`} value={exp.summary} onChange={(e) => handleChange(exp.id, 'summary', e.target.value)} placeholder="Click 'Generate with AI' or write your own summary." className="italic bg-primary/5"/>
            </div>
            <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" onClick={() => handleGenerateSummary(exp.id)} disabled={isLoading === exp.id}>
                    {isLoading === exp.id ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    Generate with AI
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleRemoveExperience(exp.id)}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={handleAddExperience} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
      </Button>
    </div>
  );
}
