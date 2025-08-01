"use client";

import { useCvData } from "@/hooks/use-cv-data";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function PersonalDetailsForm() {
  const { cvData, setCvData } = useCvData();
  const { personalDetails } = cvData;

  const handleChange = (field: keyof typeof personalDetails, value: string) => {
    setCvData((prev) => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-4 p-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={personalDetails.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="e.g., Jane Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Job Title</Label>
          <Input id="title" value={personalDetails.title} onChange={(e) => handleChange("title", e.target.value)} placeholder="e.g., Full Stack Developer" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={personalDetails.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="e.g., jane.doe@email.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={personalDetails.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="e.g., (123) 456-7890" />
        </div>
         <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" value={personalDetails.location} onChange={(e) => handleChange("location", e.target.value)} placeholder="e.g., San Francisco, CA" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website/Portfolio</Label>
          <Input id="website" value={personalDetails.website} onChange={(e) => handleChange("website", e.target.value)} placeholder="e.g., yourportfolio.com" />
        </div>
      </div>
       <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea id="summary" value={personalDetails.summary} onChange={(e) => handleChange("summary", e.target.value)} placeholder="A brief summary of your professional background..." rows={5}/>
        </div>
    </div>
  );
}
