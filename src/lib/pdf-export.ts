
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const exportCvToPdf = async (containerId: string, fileName: string): Promise<void> => {
  const printContainer = document.getElementById(containerId);
  if (!printContainer) {
    console.error(`Element with id "${containerId}" not found.`);
    alert('Could not find the CV container to export.');
    return;
  }
  
  const cvElement = printContainer.querySelector<HTMLElement>('.cv-preview');
   if (!cvElement) {
    console.error(`Element with class ".cv-preview" not found inside "#${containerId}".`);
    alert('Could not find the CV element to export.');
    return;
  }

  const originalContainerTransform = printContainer.style.transform;
  
  // Temporarily modify styles to ensure the entire CV is captured correctly.
  printContainer.style.transform = 'scale(1)';
  window.scrollTo(0, 0);
  
  try {
    const canvas = await html2canvas(cvElement, {
      scale: 3,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pencarian.getHeight();

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const canvasAspectRatio = canvasHeight / canvasWidth;
    
    const imgHeightInPdf = pdfWidth * canvasAspectRatio;
    let heightLeft = imgHeightInPdf;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeightInPdf);
    heightLeft -= pdfHeight;

    // A small tolerance (e.g., 1mm) to prevent creating an extra blank page for tiny overflows.
    const tolerance = 1; 
    while (heightLeft > tolerance) {
      position -= pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeightInPdf);
      heightLeft -= pdfHeight;
    }

    pdf.save(fileName);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert('An error occurred while generating the PDF.');
  } finally {
    // Restore original styles
    printContainer.style.transform = originalContainerTransform;
  }
};
