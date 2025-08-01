
"use client";

import { useCvData } from "@/hooks/use-cv-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { useCallback } from "react";
import { Certification } from "@/lib/types";

export function CertificationsForm() {
  const { cvData, setCvData } = useCvData();

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

  return (
    <div className="space-y-4">
      {cvData.certifications.map((cert) => (
        <Card key={cert.id}>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`cert-name-${cert.id}`}>Certification Name</Label>
                <Input
                  id={`cert-name-${cert.id}`}
                  value={cert.name}
                  onChange={(e) => handleChange(cert.id, "name", e.target.value)}
                  placeholder="e.g., Certified Kubernetes Administrator"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`cert-issuer-${cert.id}`}>Issuer</Label>
                <Input
                  id={`cert-issuer-${cert.id}`}
                  value={cert.issuer}
                  onChange={(e) => handleChange(cert.id, "issuer", e.target.value)}
                  placeholder="e.g., The Linux Foundation"
                />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor={`cert-date-${cert.id}`}>Date</Label>
                <Input
                  id={`cert-date-${cert.id}`}
                  value={cert.date}
                  onChange={(e) => handleChange(cert.id, "date", e.target.value)}
                  placeholder="e.g., 2023"
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="mt-4 text-destructive hover:bg-destructive/10"
              onClick={() => handleRemoveCertification(cert.id)}
              aria-label={`Remove ${cert.name} certification entry`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={handleAddCertification} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" /> Add Certification
      </Button>
    </div>
  );
}
