import React, { useState } from 'react';

const DownloadButton = ({
  pdfPath,
  fileName,
  buttonText,
  variant,
  size,
  className = '',
  icon,
}) => {
  const [isHover, setIsHover] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Base classes provide consistent sizing and rounded corners.
  // We intentionally do not override color classes passed via className from caller.
  const baseClasses = 'h-11 px-4 py-2 rounded-lg font-nexa font-medium text-xs sm:text-sm flex items-center justify-center';

  // Inline style fallback for hover color (option A) when Tailwind hover doesn't apply
  const fallbackStyle = isHover ? { backgroundColor: '#c8911e' } : undefined;

  return (
    <button
      onClick={handleDownload}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`${baseClasses} ${className}`}
      style={fallbackStyle}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {buttonText}
    </button>
  );
};

export default DownloadButton;
