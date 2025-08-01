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
import { cn } from "@/lib/utils";

const FONT_OPTIONS = [
    { label: "PT Sans", value: "PT Sans" },
    { label: "Roboto", value: "Roboto" },
    { label: "Open Sans", value: "Open Sans" },
    { label: "Lato", value: "Lato" },
    { label: "Montserrat", value: "Montserrat" },
];

const TEMPLATE_OPTIONS: { value: 'default' | 'left-sidebar' | 'right-sidebar', label: string }[] = [
    { value: 'default', label: 'Default' },
    { value: 'left-sidebar', label: 'Left Sidebar' },
    { value: 'right-sidebar', label: 'Right Sidebar' },
];

const LayoutPreview = ({ layout }: { layout: 'default' | 'left-sidebar' | 'right-sidebar' }) => {
    return (
        <div className="h-16 w-full rounded-md bg-muted p-2">
            {layout === 'default' && <div className="h-full w-full rounded-sm bg-primary/20" />}
            {layout === 'left-sidebar' && (
                <div className="flex h-full w-full gap-1">
                    <div className="h-full w-1/3 rounded-sm bg-primary/20" />
                    <div className="h-full w-2/3 rounded-sm bg-primary/10" />
                </div>
            )}
            {layout === 'right-sidebar' && (
                <div className="flex h-full w-full gap-1">
                    <div className="h-full w-2/3 rounded-sm bg-primary/10" />
                    <div className="h-full w-1/3 rounded-sm bg-primary/20" />
                </div>
            )}
        </div>
    );
};


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
        <div className="space-y-6 p-1">
            <div className="space-y-2">
                <Label>Template</Label>
                <div className="grid grid-cols-3 gap-2">
                    {TEMPLATE_OPTIONS.map((template) => (
                        <div key={template.value}>
                            <button
                                onClick={() => handleTemplateChange(template.value)}
                                className={cn(
                                    "w-full rounded-lg border-2 p-1 transition-colors",
                                    cvData.template === template.value ? "border-primary" : "border-transparent hover:border-primary/50"
                                )}
                            >
                               <LayoutPreview layout={template.value} />
                            </button>
                            <p className="mt-1 text-center text-xs font-medium">{template.label}</p>
                        </div>
                    ))}
                </div>
            </div>

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
