
export const optimizePrint = () => {
  // Add print-specific styles
  const printStyles = document.createElement('style');
  printStyles.textContent = `
    @media print {
      body * { visibility: hidden; }
      #cv-preview-container, #cv-preview-container * { visibility: visible; }
      #cv-preview-container { 
        position: absolute; 
        left: 0; 
        top: 0; 
        width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
      }
    }
  `;
  document.head.appendChild(printStyles);

  // Trigger print
  window.print();

  // Clean up
  setTimeout(() => {
    document.head.removeChild(printStyles);
  }, 1000);
};

export const exportToPDF = async () => {
  // For better PDF export, we could integrate with libraries like jsPDF or Puppeteer
  // For now, use the browser's print to PDF functionality
  optimizePrint();
};
