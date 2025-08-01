
"use client";

import { useCvData } from "@/hooks/use-cv-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { useCallback } from "react";
import { Language } from "@/lib/types";

export function LanguagesForm() {
  const { cvData, setCvData } = useCvData();

  const handleAddLanguage = useCallback(() => {
    setCvData((prev) => ({
      ...prev,
      languages: [
        ...prev.languages,
        { id: uuidv4(), name: "", proficiency: "" },
      ],
    }));
  }, [setCvData]);

  const handleRemoveLanguage = useCallback((id: string) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang.id !== id),
    }));
  }, [setCvData]);

  const handleChange = useCallback((id: string, field: keyof Language, value: string) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    }));
  }, [setCvData]);

  return (
    <div className="space-y-4">
      {cvData.languages.map((lang) => (
        <Card key={lang.id}>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`lang-name-${lang.id}`}>Language</Label>
                <Input
                  id={`lang-name-${lang.id}`}
                  value={lang.name}
                  onChange={(e) => handleChange(lang.id, "name", e.target.value)}
                  placeholder="e.g., Spanish"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`lang-proficiency-${lang.id}`}>Proficiency</Label>
                <Input
                  id={`lang-proficiency-${lang.id}`}
                  value={lang.proficiency}
                  onChange={(e) => handleChange(lang.id, "proficiency", e.target.value)}
                  placeholder="e.g., Native or Fluent"
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="mt-4 text-destructive hover:bg-destructive/10"
              onClick={() => handleRemoveLanguage(lang.id)}
              aria-label={`Remove ${lang.name} language entry`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={handleAddLanguage} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" /> Add Language
      </Button>
    </div>
  );
}
