
"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode, useMemo } from 'react';
import { CVData } from '@/lib/types';
import { initialCVData } from '@/lib/initial-data';
import { v4 as uuidv4 } from 'uuid';

interface CVDataContextType {
  cvData: CVData;
  updateCvData: (updates: Partial<CVData> | ((prev: CVData) => CVData)) => void;
  resetCvData: () => void;
}

const CVDataContext = createContext<CVDataContextType | undefined>(undefined);

const ensureIds = (data: Partial<CVData>): CVData => {
  const fullData = { ...initialCVData, ...data };
  return {
    ...fullData,
    personalDetails: { ...initialCVData.personalDetails, ...fullData.personalDetails },
    workExperience: (fullData.workExperience || []).map(item => ({ ...item, id: item.id || uuidv4() })),
    education: (fullData.education || []).map(item => ({ ...item, id: item.id || uuidv4() })),
    skills: (fullData.skills || []).map(item => ({ ...item, id: item.id || uuidv4() })),
    projects: (fullData.projects || []).map(item => ({ ...item, id: item.id || uuidv4() })),
    certifications: (fullData.certifications || []).map(item => ({ ...item, id: item.id || uuidv4() })),
    languages: (fullData.languages || []).map(item => ({ ...item, id: item.id || uuidv4() })),
  };
};

// Debounced localStorage save
let saveTimeout: NodeJS.Timeout;
const saveToLocalStorage = (data: CVData) => {
  if (typeof window === 'undefined') return;
  
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    try {
      localStorage.setItem('proficv-data', JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }, 300);
};

export const CVDataProvider = ({ children }: { children: ReactNode }) => {
  const [cvData, setCvData] = useState<CVData>(initialCVData);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load data from localStorage only on client side after hydration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('proficv-data');
        if (stored) {
          setCvData(ensureIds(JSON.parse(stored)));
        }
      } catch (error) {
        console.error("Failed to load from localStorage:", error);
      }
      setIsHydrated(true);
    }
  }, []);

  // Immediate update function
  const updateCvData = useCallback((updates: Partial<CVData> | ((prev: CVData) => CVData)) => {
    setCvData(prev => {
      const newData = typeof updates === 'function' ? updates(prev) : { ...prev, ...updates };
      if (isHydrated) {
        saveToLocalStorage(newData);
      }
      return newData;
    });
  }, [isHydrated]);

  const resetCvData = useCallback(() => {
    setCvData(initialCVData);
    if (isHydrated) {
      saveToLocalStorage(initialCVData);
    }
  }, [isHydrated]);

  const contextValue = useMemo(() => ({
    cvData,
    updateCvData,
    resetCvData
  }), [cvData, updateCvData, resetCvData]);

  return (
    <CVDataContext.Provider value={contextValue}>
      {children}
    </CVDataContext.Provider>
  );
};

export const useCvData = () => {
  const context = useContext(CVDataContext);
  if (context === undefined) {
    throw new Error('useCvData must be used within a CVDataProvider');
  }
  return context;
};
