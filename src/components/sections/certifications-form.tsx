
"use client";

import { useCvData } from "@/hooks/use-cv-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GripVertical, PlusCircle, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { useCallback } from "react";
import { Certification } from "@/lib/types";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableCertificationItem = ({ cert, onRemove, onChange }: { cert: Certification; onRemove: (id: string) => void; onChange: (id: string, field: keyof Certification, value: string) => void; }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: cert.id});

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
                            <Label htmlFor={`cert-name-${cert.id}`}>Certification Name</Label>
                            <Input
                              id={`cert-name-${cert.id}`}
                              value={cert.name}
                              onChange={(e) => onChange(cert.id, "name", e.target.value)}
                              placeholder="e.g., Certified Kubernetes Administrator"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`cert-issuer-${cert.id}`}>Issuer</Label>
                            <Input
                              id={`cert-issuer-${cert.id}`}
                              value={cert.issuer}
                              onChange={(e) => onChange(cert.id, "issuer", e.target.value)}
                              placeholder="e.g., The Linux Foundation"
                            />
                          </div>
                          <div className="sm:col-span-2 space-y-2">
                            <Label htmlFor={`cert-date-${cert.id}`}>Date</Label>
                            <Input
                              id={`cert-date-${cert.id}`}
                              value={cert.date}
                              onChange={(e) => onChange(cert.id, "date", e.target.value)}
                              placeholder="e.g., 2023"
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => onRemove(cert.id)}
                          aria-label={`Remove ${cert.name} certification entry`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export function CertificationsForm() {
  const { cvData, setCvData } = useCvData();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );


  const handleAddCertification = useCallback(() => {
    setCvData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        { id: uuidv4(), name: "", issuer: "", date: "" },
      ],
    }));
  }, [setCvData]);

  const handleRemoveCertification = useCallback((id: string) => {
    setCvData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }));
  }, [setCvData]);

  const handleChange = useCallback((id: string, field: keyof Certification, value: string) => {
    setCvData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    }));
  }, [setCvData]);
  
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setCvData((prev) => {
        const oldIndex = prev.certifications.findIndex((c) => c.id === active.id);
        const newIndex = prev.certifications.findIndex((c) => c.id === over.id);
        return {
          ...prev,
          certifications: arrayMove(prev.certifications, oldIndex, newIndex),
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
                items={cvData.certifications}
                strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {cvData.certifications.map((cert) => (
                    <SortableCertificationItem
                        key={cert.id}
                        cert={cert}
                        onRemove={handleRemoveCertification}
                        onChange={handleChange}
                    />
                ))}
              </div>
            </SortableContext>
        </DndContext>
      <Button variant="outline" onClick={handleAddCertification} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" /> Add Certification
      </Button>
    </div>
  );
}
