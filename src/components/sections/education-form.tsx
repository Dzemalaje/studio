
"use client";

import { useCvData } from "@/hooks/use-cv-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GripVertical, PlusCircle, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { useCallback } from "react";
import { Education } from "@/lib/types";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableEducationItem = ({ edu, onRemove, onChange }: { edu: Education; onRemove: (id: string) => void; onChange: (id: string, field: keyof Education, value: string) => void; }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: edu.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} >
            <Card>
                <CardContent className="pt-6">
                    <div className="flex gap-2">
                        <div {...listeners} className="cursor-grab p-2 -ml-2">
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor={`degree-${edu.id}`}>Degree/Certificate</Label>
                                <Input
                                id={`degree-${edu.id}`}
                                value={edu.degree}
                                onChange={(e) => onChange(edu.id, "degree", e.target.value)}
                                placeholder="e.g., B.S. in Computer Science"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                                <Input
                                id={`institution-${edu.id}`}
                                value={edu.institution}
                                onChange={(e) => onChange(edu.id, "institution", e.target.value)}
                                placeholder="e.g., University of Technology"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`edu-start-date-${edu.id}`}>Start Date</Label>
                                <Input
                                id={`edu-start-date-${edu.id}`}
                                value={edu.startDate}
                                onChange={(e) => onChange(edu.id, "startDate", e.target.value)}
                                placeholder="e.g., Sept 2018"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`edu-end-date-${edu.id}`}>End Date</Label>
                                <Input
                                id={`edu-end-date-${edu.id}`}
                                value={edu.endDate}
                                onChange={(e) => onChange(edu.id, "endDate", e.target.value)}
                                placeholder="e.g., June 2022"
                                />
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10 self-start"
                            onClick={() => onRemove(edu.id)}
                            aria-label={`Remove ${edu.institution} education entry`}
                            >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};


export function EducationForm() {
  const { cvData, setCvData } = useCvData();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddEducation = useCallback(() => {
    setCvData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id: uuidv4(), degree: "", institution: "", startDate: "", endDate: "" },
      ],
    }));
  }, [setCvData]);

  const handleRemoveEducation = useCallback((id: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  }, [setCvData]);

  const handleChange = useCallback((id: string, field: keyof Education, value: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  }, [setCvData]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setCvData((prev) => {
        const oldIndex = prev.education.findIndex((e) => e.id === active.id);
        const newIndex = prev.education.findIndex((e) => e.id === over.id);
        return {
          ...prev,
          education: arrayMove(prev.education, oldIndex, newIndex),
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
                items={cvData.education}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-4">
                    {cvData.education.map((edu) => (
                        <SortableEducationItem 
                            key={edu.id} 
                            edu={edu} 
                            onRemove={handleRemoveEducation}
                            onChange={handleChange}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
      <Button onClick={handleAddEducation} className="w-full text-white">
        <PlusCircle className="mr-2 h-4 w-4" /> Add Education
      </Button>
    </div>
  );
}
