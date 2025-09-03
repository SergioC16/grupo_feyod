const DownloadButton = ({
  pdfPath,
  fileName,
  buttonText,
  variant,
  size,
  className,
  icon,
}) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className={`${className} ${
        variant === "secondary" ? "bg-gray-200 text-black" : "bg-blue-500 text-white"
      } ${size === "sm" ? "px-3 py-2 text-sm" : "px-5 py-3 text-base"}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {buttonText}
    </button>
  );
};

export default DownloadButton;
