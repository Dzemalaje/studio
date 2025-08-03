"use client";

import { useCvData } from "@/hooks/use-cv-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { GripVertical, X } from "lucide-react";
import { useState, KeyboardEvent, useCallback, memo } from "react";
import { v4 as uuidv4 } from "uuid";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Skill } from "@/lib/types";

const SortableSkill = memo(({ skill, onRemove }: { skill: Skill; onRemove: (id: string) => void }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: skill.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            <Badge variant="secondary" className="pl-1 pr-1 py-1 text-sm group">
                <div {...listeners} className="cursor-grab pr-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                </div>
                {skill.name}
                <button
                  onClick={() => onRemove(skill.id)}
                  className="ml-2 rounded-full hover:bg-muted-foreground/20 p-0.5"
                  aria-label={`Remove ${skill.name} skill`}
                >
                  <X className="h-3 w-3" />
                </button>
            </Badge>
        </div>
    );
});
SortableSkill.displayName = 'SortableSkill';

export function SkillsForm() {
  const { cvData, updateCvData } = useCvData();
  const [currentSkill, setCurrentSkill] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddSkill = useCallback(() => {
    if (currentSkill.trim()) {
      const newSkill: Skill = {
        id: uuidv4(),
        name: currentSkill.trim(),
      };
      updateCvData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
      setCurrentSkill('');
    }
  }, [currentSkill, updateCvData]);

  const handleRemoveSkill = useCallback((id: string) => {
    updateCvData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  }, [updateCvData]);

  const handleKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  }, [handleAddSkill]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      updateCvData(prev => {
        const oldIndex = prev.skills.findIndex(skill => skill.id === active.id);
        const newIndex = prev.skills.findIndex(skill => skill.id === over.id);

        return {
          ...prev,
          skills: arrayMove(prev.skills, oldIndex, newIndex)
        };
      });
    }
  }, [updateCvData]);

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
          <Button onClick={handleAddSkill} className="text-white">Add</Button>
        </div>
      </div>
      <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
      >
          <SortableContext
              items={cvData.skills}
              strategy={rectSortingStrategy}
          >
              <div className="flex flex-wrap gap-2 min-h-[2.5rem] items-center">
                  {cvData.skills.length === 0 && (
                      <p className="text-sm text-muted-foreground">No skills added yet.</p>
                  )}
                  {cvData.skills.map((skill) => (
                      <SortableSkill 
                          key={skill.id} 
                          skill={skill} 
                          onRemove={handleRemoveSkill}
                      />
                  ))}
              </div>
          </SortableContext>
      </DndContext>
    </div>
  );
}