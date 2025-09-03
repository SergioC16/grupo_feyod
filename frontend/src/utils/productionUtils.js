/**
 * Production utilities for PDF handling in Hostinger
 */

/**
 * Get the base URL for the application
 * Works both in development and production
 */
export const getBaseURL = () => {
  // In production (Hostinger), use the current domain
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  // Fallback for server-side rendering
  return '';
};

/**
 * Enhanced PDF download function for production environments
 * @param {string} pdfPath - Path to PDF relative to /public/pdfs/
 * @param {string} fileName - Custom filename for download
 */
export const downloadPDFProduction = async (pdfPath, fileName = null) => {
  try {
    const baseURL = getBaseURL();
    const fullPath = `${baseURL}/pdfs/${pdfPath}`;
    
    // First, check if the file exists
    const headResponse = await fetch(fullPath, { method: 'HEAD' });
    
    if (!headResponse.ok) {
      throw new Error(`PDF not found: ${headResponse.status}`);
    }
    
    // Create a temporary link for download
    const link = document.createElement('a');
    link.href = fullPath;
    link.download = fileName || pdfPath.split('/').pop();
    
    // For better browser compatibility
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // Trigger the download
    link.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
    
    return true;
  } catch (error) {
    console.error('Production PDF download error:', error);
    
    // Fallback: open in new tab if direct download fails
    try {
      const baseURL = getBaseURL();
      const fullPath = `${baseURL}/pdfs/${pdfPath}`;
      window.open(fullPath, '_blank');
      return true;
    } catch (fallbackError) {
      console.error('Fallback failed:', fallbackError);
      return false;
    }
  }
};

/**
 * Validate PDF paths for production
 * @param {string} pdfPath - Path to validate
 */
export const validatePDFPath = (pdfPath) => {
  // Check for potentially problematic characters
  const problematicChars = /[<>:"|?*\s]/;
  if (problematicChars.test(pdfPath)) {
    console.warn('PDF path contains potentially problematic characters:', pdfPath);
    return false;
  }
  
  // Check file extension
  if (!pdfPath.toLowerCase().endsWith('.pdf')) {
    console.warn('File does not have .pdf extension:', pdfPath);
    return false;
  }
  
  return true;
};

/**
 * Batch validate all PDF files in data
 * @param {Array} dataArray - Array of objects with pdfFiles property
 */
export const validateAllPDFs = (dataArray) => {
  const invalidPaths = [];
  
  dataArray.forEach((item, index) => {
    if (item.pdfFiles && Array.isArray(item.pdfFiles)) {
      item.pdfFiles.forEach((pdf, pdfIndex) => {
        if (!validatePDFPath(pdf.path)) {
          invalidPaths.push({
            item: item.name || `Item ${index}`,
            pdf: pdf.name || `PDF ${pdfIndex}`,
            path: pdf.path
          });
        }
      });
    }
  });
  
  if (invalidPaths.length > 0) {
    console.warn('Invalid PDF paths found:', invalidPaths);
  }
  
  return invalidPaths;
};

/**
 * Generate optimized filename for downloads
 * @param {string} originalName - Original filename
 * @param {string} productName - Product/service name for context
 */
export const generateOptimizedFileName = (originalName, productName = '') => {
  // Remove special characters and normalize
  let fileName = originalName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^\w\s.-]/g, '') // Remove special chars except dots, hyphens, spaces
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .toLowerCase();
  
  // Add product context if provided
  if (productName) {
    const productSlug = productName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase();
    
    fileName = `grupo-feyod-${productSlug}-${fileName}`;
  }
  
  // Ensure .pdf extension
  if (!fileName.endsWith('.pdf')) {
    fileName += '.pdf';
  }
  
  return fileName;
};