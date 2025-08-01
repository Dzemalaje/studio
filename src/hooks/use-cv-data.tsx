"use client";

import { createContext, useContext, useState, Dispatch, SetStateAction, useEffect, ReactNode } from 'react';
import { CVData } from '@/lib/types';
import { initialCVData } from '@/lib/initial-data';
import { v4 as uuidv4 } from 'uuid';

interface CVDataContextType {
  cvData: CVData;
  setCvData: Dispatch<SetStateAction<CVData>>;
}

const CVDataContext = createContext<CVDataContextType | undefined>(undefined);

// A function to ensure data from localStorage has IDs if it's an older format.
const ensureIds = (data: CVData): CVData => {
  return {
    ...data,
    workExperience: data.workExperience?.map(item => ({ ...item, id: item.id || uuidv4() })) || [],
    education: data.education?.map(item => ({ ...item, id: item.id || uuidv4() })) || [],
    skills: data.skills?.map(item => ({ ...item, id: item.id || uuidv4() })) || [],
  };
};

export const CVDataProvider = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [cvData, setCvData] = useState<CVData>(initialCVData);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem('proficv-data');
      if (item) {
        const parsedData = JSON.parse(item);
        setCvData(ensureIds(parsedData));
      } else {
        // Set initial data with IDs only on the client
        setCvData(ensureIds(initialCVData));
      }
    } catch (error) {
      console.error("Failed to read from localStorage", error);
      setCvData(ensureIds(initialCVData));
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        window.localStorage.setItem('proficv-data', JSON.stringify(cvData));
      } catch (error) {
        console.error("Failed to write to localStorage", error);
      }
    }
  }, [cvData, isMounted]);

  return (
    <CVDataContext.Provider value={{ cvData, setCvData }}>
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
