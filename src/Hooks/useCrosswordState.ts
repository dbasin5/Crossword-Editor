import { useState } from 'react';
import { EditMode } from '../types';

export function useCrosswordState(gridSize: number, initialPattern: boolean[][]) {
  const [pattern, setPattern] = useState<boolean[][]>(
    initialPattern.map(row => [...row])
  );

  const [letters, setLetters] = useState<string[][]>(
    Array(gridSize).fill(null).map(() => Array(gridSize).fill(''))
  );

  const [clues, setClues] = useState<{
    across: Record<number, string>;
    down: Record<number, string>;
  }>({ across: {}, down: {} });

  const [mode, setMode] = useState<EditMode>('whiteBlack');
  const [focusedCell, setFocusedCell] = useState<{ row: number; col: number } | null>(null);

  const handleToggle = (row: number, col: number) => {
    setPattern(prev =>
      prev.map((r, i) =>
        r.map((cell, j) => (i === row && j === col ? !cell : cell))
      )
    );

    if (!pattern[row][col]) {
      setLetters(prev =>
        prev.map((r, i) =>
          r.map((cell, j) =>
            i === row && j === col ? '' : cell
          )
        )
      );
    }
  };

  return {
    pattern,
    setPattern,
    letters,
    setLetters,
    clues,
    setClues,
    mode,
    setMode,
    focusedCell,
    setFocusedCell,
    handleToggle
  };
}
