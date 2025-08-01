
"use client";

import { useCvData } from "@/hooks/use-cv-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GripVertical, PlusCircle, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { memo, useCallback } from "react";
import { WorkExperience } from "@/lib/types";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableExperienceItem = memo(({
    exp,
    onRemove,
    onChange,
}: {
    exp: WorkExperience;
    onRemove: (id: string) => void;
    onChange: (id: string, field: keyof WorkExperience, value: string) => void;
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: exp.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            <Card>
                <CardContent className="pt-6 space-y-4">
                    <div className="flex items-start gap-2">
                         <div {...listeners} className="cursor-grab p-2 -ml-2 mt-6">
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-grow space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor={`role-${exp.id}`}>Role</Label>
                                    <Input id={`role-${exp.id}`} value={exp.role} onChange={(e) => onChange(exp.id, 'role', e.target.value)} placeholder="e.g., Senior Developer" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor={`company-${exp.id}`}>Company</Label>
                                    <Input id={`company-${exp.id}`} value={exp.company} onChange={(e) => onChange(exp.id, 'company', e.target.value)} placeholder="e.g., Tech Solutions Inc." />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor={`start-date-${exp.id}`}>Start Date</Label>
                                    <Input id={`start-date-${exp.id}`} value={exp.startDate} onChange={(e) => onChange(exp.id, 'startDate', e.target.value)} placeholder="e.g., Jan 2020" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
                                    <Input id={`end-date-${exp.id}`} value={exp.endDate} onChange={(e) => onChange(exp.id, 'endDate', e.target.value)} placeholder="e.g., Present" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`description-${exp.id}`}>Description / Responsibilities</Label>
                                <Textarea id={`description-${exp.id}`} value={exp.description} onChange={(e) => onChange(exp.id, 'description', e.target.value)} placeholder="Describe your responsibilities and achievements..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`summary-${exp.id}`}>Key Achievements / Summary</Label>
                                <Textarea id={`summary-${exp.id}`} value={exp.summary} onChange={(e) => onChange(exp.id, 'summary', e.target.value)} placeholder="Summarize your key achievements in this role." className="italic bg-primary/5"/>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => onRemove(exp.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
});
SortableExperienceItem.displayName = 'SortableExperienceItem';


export function ExperienceForm() {
  const { cvData, setCvData } = useCvData();

   const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddExperience = useCallback(() => {
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
  }, [setCvData]);

  const handleRemoveExperience = useCallback((id: string) => {
    setCvData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((exp) => exp.id !== id),
    }));
  }, [setCvData]);

  const handleChange = useCallback((id: string, field: keyof WorkExperience, value: string) => {
    setCvData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  }, [setCvData]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
        setCvData((prev) => {
            const oldIndex = prev.workExperience.findIndex((exp) => exp.id === active.id);
            const newIndex = prev.workExperience.findIndex((exp) => exp.id === over.id);
            return {
                ...prev,
                workExperience: arrayMove(prev.workExperience, oldIndex, newIndex),
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
            items={cvData.workExperience}
            strategy={verticalListSortingStrategy}
        >
            <div className="space-y-4">
                {cvData.workExperience.map((exp) => (
                    <SortableExperienceItem
                        key={exp.id}
                        exp={exp}
                        onRemove={handleRemoveExperience}
                        onChange={handleChange}
                    />
                ))}
            </div>
        </SortableContext>
      </DndContext>
      <Button onClick={handleAddExperience} className="w-full text-white">
        <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
      </Button>
    </div>
  );
}
