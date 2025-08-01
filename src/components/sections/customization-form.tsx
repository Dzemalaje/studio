"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Languages } from "lucide-react";

export function CustomizationForm() {
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
                    <Select defaultValue="modern">
                        <SelectTrigger>
                            <SelectValue placeholder="Template" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="classic" disabled>Classic</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}
