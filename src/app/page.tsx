import { CVBuilder } from '@/components/cv-builder';
import { CVDataProvider } from '@/hooks/use-cv-data.tsx';

export default function Home() {
  return (
    <CVDataProvider>
      <CVBuilder />
    </CVDataProvider>
  );
}
