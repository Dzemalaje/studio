
"use client";

import { useCvData } from "@/hooks/use-cv-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GripVertical, PlusCircle, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { useCallback } from "react";
import { Language } from "@/lib/types";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Slider } from "../ui/slider";

const PROFICIENCY_LEVELS = ["Beginner", "Intermediate", "Advanced", "Fluent", "Native"];

const SortableLanguageItem = ({ lang, onRemove, onChange }: { lang: Language; onRemove: (id: string) => void; onChange: (id: string, field: keyof Language, value: any) => void; }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: lang.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} >
            <Card>
                <CardContent className="pt-6">
                    <div className="flex gap-2 items-start">
                        <div {...listeners} className="cursor-grab p-2 -ml-2 mt-6">
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-grow grid grid-cols-1 sm:grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`lang-name-${lang.id}`}>Language</Label>
                            <Input
                              id={`lang-name-${lang.id}`}
                              value={lang.name}
                              onChange={(e) => onChange(lang.id, "name", e.target.value)}
                              placeholder="e.g., Spanish"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`lang-proficiency-${lang.id}`}>Proficiency: <span className="font-semibold text-primary">{PROFICIENCY_LEVELS[lang.level]}</span></Label>
                             <Slider
                                id={`lang-proficiency-${lang.id}`}
                                value={[lang.level]}
                                onValueChange={(value) => onChange(lang.id, "level", value[0])}
                                max={4}
                                step={1}
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => onRemove(lang.id)}
                          aria-label={`Remove ${lang.name} language entry`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};


export function LanguagesForm() {
  const { cvData, setCvData } = useCvData();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddLanguage = useCallback(() => {
    setCvData((prev) => ({
      ...prev,
      languages: [
        ...prev.languages,
        { id: uuidv4(), name: "", level: 2 },
      ],
    }));
  }, [setCvData]);

  const handleRemoveLanguage = useCallback((id: string) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang.id !== id),
    }));
  }, [setCvData]);

  const handleChange = useCallback((id: string, field: keyof Language, value: any) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    }));
  }, [setCvData]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setCvData((prev) => {
        const oldIndex = prev.languages.findIndex((l) => l.id === active.id);
        const newIndex = prev.languages.findIndex((l) => l.id === over.id);
        return {
          ...prev,
          languages: arrayMove(prev.languages, oldIndex, newIndex),
        };
      });
    }
  }, [setCvData]);

  return (
    <div className="space-y-4">
      <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={cvData.languages}
                strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {cvData.languages.map((lang) => (
                    <SortableLanguageItem
                        key={lang.id}
                        lang={lang}
                        onRemove={handleRemoveLanguage}
                        onChange={handleChange}
                    />
                ))}
              </div>
            </SortableContext>
        </DndContext>
      <Button onClick={handleAddLanguage} className="w-full text-white">
        <PlusCircle className="mr-2 h-4 w-4" /> Add Language
      </Button>
    </div>
  );
}
