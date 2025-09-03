/**
 * Utility functions for handling PDF downloads
 */

/**
 * Downloads a PDF file from the public folder
 * @param {string} pdfPath - Path to PDF relative to /public/pdfs/
 * @param {string} fileName - Custom filename for download (optional)
 */
export const downloadPDF = async (pdfPath, fileName = null) => {
  try {
    // Construct the full URL to the PDF
    const fullPath = `/pdfs/${pdfPath}`;
    
    // Fetch the PDF file
    const response = await fetch(fullPath);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.status}`);
    }
    
    // Get the blob data
    const blob = await response.blob();
    
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    // Set download filename
    const downloadFileName = fileName || pdfPath.split('/').pop();
    link.download = downloadFileName;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error downloading PDF:', error);
    
    // Fallback: try direct link approach
    try {
      const link = document.createElement('a');
      link.href = `/pdfs/${pdfPath}`;
      link.download = fileName || pdfPath.split('/').pop();
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } catch (fallbackError) {
      console.error('Fallback download also failed:', fallbackError);
      return false;
    }
  }
};

/**
 * Downloads multiple PDFs in sequence
 * @param {Array} pdfList - Array of {path, fileName} objects
 */
export const downloadMultiplePDFs = async (pdfList) => {
  const results = [];
  
  for (const pdf of pdfList) {
    const success = await downloadPDF(pdf.path, pdf.fileName);
    results.push({ ...pdf, success });
    
    // Small delay between downloads to avoid browser blocking
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  return results;
};

/**
 * Checks if a PDF exists before attempting download
 * @param {string} pdfPath - Path to PDF relative to /public/pdfs/
 */
export const checkPDFExists = async (pdfPath) => {
  try {
    const response = await fetch(`/pdfs/${pdfPath}`, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Error checking PDF existence:', error);
    return false;
  }
};

/**
 * Get file size of PDF
 * @param {string} pdfPath - Path to PDF relative to /public/pdfs/
 */
export const getPDFSize = async (pdfPath) => {
  try {
    const response = await fetch(`/pdfs/${pdfPath}`, { method: 'HEAD' });
    if (response.ok) {
      const contentLength = response.headers.get('content-length');
      return contentLength ? parseInt(contentLength) : null;
    }
    return null;
  } catch (error) {
    console.error('Error getting PDF size:', error);
    return null;
  }
};

/**
 * Format file size in human readable format
 * @param {number} bytes - File size in bytes
 */
export const formatFileSize = (bytes) => {
  if (!bytes) return 'Tamaño desconocido';
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`;
};