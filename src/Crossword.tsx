import React, { useState } from 'react';
import Square from './Square';
import ModeSelector from './ModeSelector';
import { EditMode } from './types';
import { isValidCrosswordPattern } from './validPattern';
import Clues from './Clues';
import PatternHeader from './PatternHeader';
import './Crossword.css';

const Crossword: React.FC = () => {
  const gridSize = 5;

  const initialPattern: boolean[][] = [
    [true,  false, false, false, true],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [true,  false, false, false, true],
  ];

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
  
    // If turning the square black, clear its letter
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
  

  // Calculate numbers dynamically (unchanged)
  let counter = 1;

    const numbers: (number | undefined)[][] = Array(gridSize)
    .fill(null)
    .map(() => Array(gridSize).fill(undefined));

    const acrossClueNumbers: number[] = [];
    const downClueNumbers: number[] = [];

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (pattern[row][col]) continue;

            const isStartOfAcross = col === 0 || pattern[row][col - 1];
            const isStartOfDown = row === 0 || pattern[row - 1][col];

            if (isStartOfAcross || isStartOfDown) {
                numbers[row][col] = counter;

                if (isStartOfAcross) acrossClueNumbers.push(counter);
                if (isStartOfDown) downClueNumbers.push(counter);

                counter++;
            }
        }
    }

    counter=1;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (pattern[row][col]) continue;

      const isStartOfAcross =
        col === 0 || pattern[row][col - 1] === true;

      const isStartOfDown =
        row === 0 || pattern[row - 1][col] === true;

      if (isStartOfAcross || isStartOfDown) {
        numbers[row][col] = counter++;
      }
    }
  }

  const tabToNextWhite = (row: number, col: number) => {
    for (let i = row * gridSize + col + 1; i < gridSize * gridSize; i++) {
      const r = Math.floor(i / gridSize);
      const c = i % gridSize;
      if (!pattern[r][c]) {
        setFocusedCell({ row: r, col: c });
        return;
      }
    }
  };

  const tabToPrevWhite = (row: number, col: number) => {
    for (let i = row * gridSize + col - 1; i >= 0; i--) {
      const r = Math.floor(i / gridSize);
      const c = i % gridSize;
      if (!pattern[r][c]) {
        setFocusedCell({ row: r, col: c });
        return;
      }
    }
  };

  return (
    <div className="crossword-container">
        <ModeSelector mode={mode} onChange={setMode} />

        <div className="crossword-grid-wrapper">
        <PatternHeader isValid={isValidCrosswordPattern(pattern)} />
            <div className="crossword-grid">
            {pattern.flatMap((row, rowIndex) =>
                row.map((isBlack, colIndex) => (
                <Square
                    key={`${rowIndex}-${colIndex}`}
                    isBlack={isBlack}
                    number={numbers[rowIndex][colIndex]}
                    onClick={() => {
                    if (mode === 'whiteBlack') {
                        handleToggle(rowIndex, colIndex);
                    } else if (!isBlack && mode === 'letters') {
                        setFocusedCell({ row: rowIndex, col: colIndex });
                    }
                    }}
                    mode={mode}
                    letter={letters[rowIndex][colIndex]}
                    onLetterChange={(value) => {
                    setLetters(prev =>
                        prev.map((r, i) =>
                        r.map((cell, j) =>
                            i === rowIndex && j === colIndex ? value : cell
                        )
                        )
                    );
                    }}
                    isFocused={
                    focusedCell?.row === rowIndex &&
                    focusedCell?.col === colIndex &&
                    mode === 'letters'
                    }
                    onFocusChange={(dir) => {
                    if (dir === 'next') {
                        tabToNextWhite(rowIndex, colIndex);
                        return;
                    }

                    const delta = {
                        up: [-1, 0],
                        down: [1, 0],
                        left: [0, -1],
                        right: [0, 1],
                    }[dir];

                    const [dr, dc] = delta;
                    let r = rowIndex + dr;
                    let c = colIndex + dc;

                    while (r >= 0 && r < gridSize && c >= 0 && c < gridSize) {
                        if (!pattern[r][c]) {
                        setFocusedCell({ row: r, col: c });
                        break;
                        }
                        r += dr;
                        c += dc;
                    }
                    }}
                    onRequestBackspace={() => tabToPrevWhite(rowIndex, colIndex)}
                />
                ))
            )}
            </div>
        </div>

        <Clues
            mode={mode}
            clues={clues}
            setClues={setClues}
            acrossClueNumbers={acrossClueNumbers}
            downClueNumbers={downClueNumbers}
        />
    </div>
  );
};

export default Crossword;