
"use client";

import { createContext, useContext, useState, Dispatch, SetStateAction, useEffect, ReactNode, useMemo } from 'react';
import { CVData } from '@/lib/types';
import { initialCVData } from '@/lib/initial-data';
import { v4 as uuidv4 } from 'uuid';

interface CVDataContextType {
  cvData: CVData;
  setCvData: Dispatch<SetStateAction<CVData>>;
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

export const CVDataProvider = ({ children }: { children: ReactNode }) => {
  const [cvData, setCvData] = useState<CVData>(initialCVData);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after the initial render.
    try {
      const storedData = window.localStorage.getItem('proficv-data');
      if (storedData) {
        setCvData(ensureIds(JSON.parse(storedData)));
      }
    } catch (error) {
      console.error("Failed to read from localStorage on init", error);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // This effect runs only on the client and only after the component has mounted.
    // This prevents overwriting localStorage with initial data on the first render.
    if (isMounted) {
      try {
        const dataToStore = JSON.stringify(cvData);
        window.localStorage.setItem('proficv-data', dataToStore);
      } catch (error) {
        console.error("Failed to write to localStorage", error);
      }
    }
  }, [cvData, isMounted]);

  const contextValue = useMemo(() => ({ cvData, setCvData }), [cvData]);

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
