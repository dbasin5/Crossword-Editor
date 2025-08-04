import React, { useRef, useEffect } from 'react';
import './Square.css';

interface SquareProps {
  number?: number;
  isBlack: boolean;
  onClick?: () => void;
  mode: 'whiteBlack' | 'letters' | 'clues';
  letter?: string;
  onLetterChange?: (value: string) => void;
  isFocused?: boolean;
  onFocusChange?: (direction: 'up' | 'down' | 'left' | 'right' | 'next') => void;
  onRequestBackspace?: () => void;
}

const Square: React.FC<SquareProps> = ({
  number,
  isBlack,
  onClick,
  mode,
  letter,
  onLetterChange,
  isFocused,
  onFocusChange,
  onRequestBackspace,
}) => {
    const className = `square ${isBlack ? 'black' : 'white'} ${isFocused && !isBlack && mode === 'letters' ? 'focused' : ''}`;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <div className={className} onClick={onClick}>
      {!isBlack && number !== undefined && (
        <span className="square-number">{number}</span>
      )}

    {!isBlack && (
    <input
        ref={inputRef}
        className="square-input"
        value={letter ?? ''}
        readOnly={mode !== 'letters'}
        onChange={(e) => {
        const val = e.target.value.toUpperCase().slice(0, 1);
        if (mode === 'letters') {
            onLetterChange?.(val);
        }
        }}
        onKeyDown={(e) => {
        if (mode !== 'letters') return;

        if (e.key === 'ArrowUp') onFocusChange?.('up');
        else if (e.key === 'ArrowDown') onFocusChange?.('down');
        else if (e.key === 'ArrowLeft') onFocusChange?.('left');
        else if (e.key === 'ArrowRight') onFocusChange?.('right');

        if (e.key === 'Backspace' || e.key === 'Delete') {
            if (letter && letter.length > 0) {
            e.preventDefault();
            onLetterChange?.('');
            } else {
            e.preventDefault();
            onRequestBackspace?.();
            }
        }

        if (/^[a-zA-Z]$/.test(e.key)) {
            setTimeout(() => {
            onFocusChange?.('next');
            }, 0);
        }
        }}
    />
    )}
    </div>
  );
};

export default Square;