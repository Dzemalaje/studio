"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Languages, LayoutTemplate } from "lucide-react";
import { useCvData } from "@/hooks/use-cv-data";

export function CustomizationForm() {
    const { cvData, setCvData } = useCvData();

    const handleTemplateChange = (value: 'default' | 'left-sidebar' | 'right-sidebar') => {
        setCvData((prev) => ({...prev, template: value}));
    };

    return (
        <div className="space-y-4 p-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Language</Label>
                    <Select defaultValue="en">
                        <SelectTrigger>
                            <div className="flex items-center gap-2">
                                <Languages className="h-4 w-4" />
                                <SelectValue placeholder="Language" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es" disabled>Español</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Template</Label>
                    <Select value={cvData.template} onValueChange={handleTemplateChange}>
                        <SelectTrigger>
                            <div className="flex items-center gap-2">
                                <LayoutTemplate className="h-4 w-4" />
                                <SelectValue placeholder="Template" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="left-sidebar">Left Sidebar</SelectItem>
                            <SelectItem value="right-sidebar">Right Sidebar</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}
