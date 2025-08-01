import { CVBuilder } from '@/components/cv-builder';
import { CVDataProvider } from '@/hooks/use-cv-data';

export default function Home() {
  return (
    <CVDataProvider>
      <main className="min-h-screen">
        <CVBuilder />
      </main>
    </CVDataProvider>
  );
}
