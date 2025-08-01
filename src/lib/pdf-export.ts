
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const exportCvToPdf = async (elementId: string, fileName: string): Promise<void> => {
  const cvElement = document.getElementById(elementId);
  if (!cvElement) {
    console.error(`Element with id "${elementId}" not found.`);
    alert('Could not find the CV element to export.');
    return;
  }
  
  const stickyParent = cvElement.parentElement;
  if (!stickyParent) {
    console.error('Could not find parent of CV element.');
    return;
  }

  const originalParentClassName = stickyParent.className;
  const originalBodyClassName = document.body.className;

  // Temporarily modify styles to ensure the entire CV is captured correctly.
  stickyParent.className = '';
  document.body.className += ' overflow-hidden';
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
    const pdfHeight = pdf.internal.pageSize.getHeight();

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
    stickyParent.className = originalParentClassName;
    document.body.className = originalBodyClassName;
  }
};
