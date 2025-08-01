"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Languages, LayoutTemplate, Palette, Type } from "lucide-react";
import { useCvData } from "@/hooks/use-cv-data";
import { Input } from "../ui/input";

const FONT_OPTIONS = [
    { label: "PT Sans", value: "PT Sans" },
    { label: "Roboto", value: "Roboto" },
    { label: "Open Sans", value: "Open Sans" },
    { label: "Lato", value: "Lato" },
    { label: "Montserrat", value: "Montserrat" },
];

export function CustomizationForm() {
    const { cvData, setCvData } = useCvData();

    const handleTemplateChange = (value: 'default' | 'left-sidebar' | 'right-sidebar') => {
        setCvData((prev) => ({...prev, template: value}));
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCvData(prev => ({ ...prev, themeColor: e.target.value }));
    }

    const handleFontChange = (value: string) => {
        setCvData(prev => ({...prev, fontFamily: value}));
    }

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
                <div className="space-y-2">
                    <Label>Theme Color</Label>
                    <div className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        <Input type="color" value={cvData.themeColor || ''} onChange={handleColorChange} className="p-1 h-10"/>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Font Family</Label>
                    <Select value={cvData.fontFamily} onValueChange={handleFontChange}>
                        <SelectTrigger>
                             <div className="flex items-center gap-2">
                                <Type className="h-4 w-4" />
                                <SelectValue placeholder="Font Family" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                           {FONT_OPTIONS.map(font => (
                                <SelectItem key={font.value} value={font.value} style={{fontFamily: font.value}}>
                                    {font.label}
                                </SelectItem>
                           ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}
