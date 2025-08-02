
"use client";

import { createContext, useContext, useState, Dispatch, SetStateAction, useEffect, ReactNode, useMemo, useCallback, useRef } from 'react';
import { CVData } from '@/lib/types';
import { initialCVData } from '@/lib/initial-data';
import { v4 as uuidv4 } from 'uuid';
import debounce from 'lodash.debounce';


interface CVDataContextType {
  cvData: CVData;
  setCvData: Dispatch<SetStateAction<CVData>>;
  debouncedSetCvData: (data: CVData) => void;
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
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
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

  // Optimized localStorage saving with batching
  useEffect(() => {
    if (isMounted) {
      // Clear existing timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      // Batch localStorage writes to avoid blocking the main thread
      saveTimeoutRef.current = setTimeout(() => {
        try {
          const dataToStore = JSON.stringify(cvData);
          window.localStorage.setItem('proficv-data', dataToStore);
        } catch (error) {
          console.error("Failed to write to localStorage", error);
        }
      }, 100);
    }
  }, [cvData, isMounted]);

  // Increase debounce delay for better performance
  const debouncedSetCvData = useMemo(
    () => debounce((newData) => {
      setCvData(newData);
    }, 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSetCvData.cancel();
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    }
  }, [debouncedSetCvData]);


  const contextValue = useMemo(() => ({ cvData, setCvData, debouncedSetCvData }), [cvData, setCvData, debouncedSetCvData]);

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
