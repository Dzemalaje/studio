
"use client";

import { useCvData } from "@/hooks/use-cv-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GripVertical, PlusCircle, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { useCallback, memo } from "react";
import { Project } from "@/lib/types";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableProjectItem = memo(({ proj, onRemove, onChange }: { proj: Project; onRemove: (id: string) => void; onChange: (id: string, field: keyof Project, value: string) => void; }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: proj.id});

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
                        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`project-name-${proj.id}`}>Project Name</Label>
                            <Input
                              id={`project-name-${proj.id}`}
                              defaultValue={proj.name}
                              onChange={(e) => onChange(proj.id, "name", e.target.value)}
                              placeholder="e.g., My Awesome App"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`project-link-${proj.id}`}>Link</Label>
                            <Input
                              id={`project-link-${proj.id}`}
                              defaultValue={proj.link}
                              onChange={(e) => onChange(proj.id, "link", e.target.value)}
                              placeholder="e.g., myawesomeapp.com"
                            />
                          </div>
                          <div className="sm:col-span-2 space-y-2">
                            <Label htmlFor={`project-description-${proj.id}`}>Description</Label>
                            <Textarea
                              id={`project-description-${proj.id}`}
                              defaultValue={proj.description}
                              onChange={(e) => onChange(proj.id, "description", e.target.value)}
                              placeholder="Describe your project"
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => onRemove(proj.id)}
                          aria-label={`Remove ${proj.name} project entry`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
});
SortableProjectItem.displayName = 'SortableProjectItem';


export function ProjectsForm() {
  const { cvData, setCvData, debouncedSetCvData } = useCvData();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
    const newProjects = cvData.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
    );
    debouncedSetCvData({ ...cvData, projects: newProjects });
  }, [cvData, debouncedSetCvData]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setCvData((prev) => {
        const oldIndex = prev.projects.findIndex((p) => p.id === active.id);
        const newIndex = prev.projects.findIndex((p) => p.id === over.id);
        return {
          ...prev,
          projects: arrayMove(prev.projects, oldIndex, newIndex),
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
                items={cvData.projects}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-4">
                    {cvData.projects.map((proj) => (
                        <SortableProjectItem 
                            key={proj.id} 
                            proj={proj} 
                            onRemove={handleRemoveProject}
                            onChange={handleChange}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
      <Button onClick={handleAddProject} className="w-full text-white">
        <PlusCircle className="mr-2 h-4 w-4" /> Add Project
      </Button>
    </div>
  );
}
