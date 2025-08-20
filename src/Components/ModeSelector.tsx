import React from 'react';
import { EditMode } from '../types';
import "../Styles/ModeSelector.css";

interface ModeSelectorInterface {
  mode: EditMode;
  onChange: (newMode: EditMode) => void;
}

const ModeSelector: React.FC<ModeSelectorInterface> = ({ mode, onChange }) => {
  const modes: { label: string; value: EditMode }[] = [
    { label: 'Edit White/Black', value: 'whiteBlack' },
    { label: 'Edit Letters', value: 'letters' },
    { label: 'Edit Clues', value: 'clues' },
  ];

  return (
    <div className='mode-selector'>
        {modes.map(({ label, value }) => (
        <button
            key={value}
            className={`mode-button ${mode === value ? 'active' : ''}`}
            onClick={() => onChange(value)}
        >
            {label}
        </button>
        ))}
    </div>
    );
};

export default ModeSelector;