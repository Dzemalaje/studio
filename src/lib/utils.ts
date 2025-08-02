import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Memoize hex to HSL conversion for better performance
const hslCache = new Map<string, [number, number, number]>();

export const hexToHsl = (hex: string): [number, number, number] => {
  if (!hex || typeof hex !== 'string') return [222.2, 47.4, 11.2]; // Default color
  
  // Check cache first
  if (hslCache.has(hex)) {
    return hslCache.get(hex)!;
  }
  
  const sanitizedHex = hex.replace('#', '');
  
  // Handle shorthand hex
  const fullHex = sanitizedHex.length === 3 
    ? sanitizedHex.split('').map(char => char + char).join('') 
    : sanitizedHex;

  if (fullHex.length !== 6) {
    const defaultColor: [number, number, number] = [222.2, 47.4, 11.2];
    hslCache.set(hex, defaultColor);
    return defaultColor;
  }

  const r = parseInt(fullHex.substring(0, 2), 16) / 255;
  const g = parseInt(fullHex.substring(2, 4), 16) / 255;
  const b = parseInt(fullHex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  const result: [number, number, number] = [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  
  // Cache the result (limit cache size to prevent memory leaks)
  if (hslCache.size > 100) {
    const firstKey = hslCache.keys().next().value;
    hslCache.delete(firstKey);
  }
  hslCache.set(hex, result);
  
  return result;
};
