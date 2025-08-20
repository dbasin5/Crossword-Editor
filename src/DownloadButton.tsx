import React from 'react';
import './DownloadButton.css';

interface DownloadButtonProps {
  onClick: () => void;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick }) => {
  return (
    <button className="download-button" onClick={onClick}>
      Download .ipuz
    </button>
  );
};

export default DownloadButton;