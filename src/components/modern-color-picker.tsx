"use client";

import { Input } from "./ui/input";
import { Palette } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useCallback } from "react";

const PRESET_COLORS = [
    "#48A9A6", "#438E8C", "#3E7370", "#D4B483", "#C1A57B", "#AE9673",
    "#E4DFDA", "#F5F2EF", "#2E2E2E", "#424242", "#616161", "#757575"
];

interface ModernColorPickerProps {
    color: string;
    onChange: (color: string) => void;
}

export function ModernColorPicker({ color, onChange }: ModernColorPickerProps) {

    const handleColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    }, [onChange]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="relative flex items-center cursor-pointer">
                    <Palette className="absolute left-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        value={color || ''}
                        onChange={handleColorChange}
                        className="pl-9"
                        placeholder="#000000"
                        readOnly
                    />
                    <div
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md border"
                        style={{ backgroundColor: color }}
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4">
                <div className="flex items-center gap-2 mb-4">
                    <div
                        className="h-8 w-8 rounded-md border"
                        style={{ backgroundColor: color }}
                    />
                    <Input
                        type="text"
                        value={color}
                        onChange={handleColorChange}
                        className="flex-1"
                        placeholder="#000000"
                    />
                    <div className="relative">
                        <Input
                            type="color"
                            value={color}
                            onChange={handleColorChange}
                            className="h-10 w-10 p-1 cursor-pointer opacity-0 absolute inset-0"
                        />
                         <div className="h-10 w-10 rounded-md border bg-gradient-to-r from-red-500 via-green-500 to-blue-500" />
                    </div>
                </div>
                <div className="grid grid-cols-6 gap-2">
                    {PRESET_COLORS.map((preset) => (
                        <button
                            key={preset}
                            className="h-8 w-8 rounded-md border transition-transform hover:scale-110"
                            style={{ backgroundColor: preset }}
                            onClick={() => onChange(preset)}
                            aria-label={`Select color ${preset}`}
                        />
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}
