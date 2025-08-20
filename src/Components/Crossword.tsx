import React from 'react';
import Square from './Square';
import ModeSelector from './ModeSelector';
import PatternHeader from './PatternHeader';
import Clues from './Clues';
import PuzzleExportPanel from './PuzzleExportPanel';

import { isValidCrosswordPattern } from '../Helpers/validPattern';
import { useCrosswordState } from '../Hooks/useCrosswordState';
import { useCrosswordNavigation } from '../Hooks/useCrosswordNavigation';
import { generateClueNumbers } from '../Helpers/generateClueNumbers';

import '../Styles/Crossword.css';

const Crossword: React.FC = () => {
  const gridSize = 5;

  const initialPattern: boolean[][] = [
    [true,  false, false, false, true],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [true,  false, false, false, true],
  ];

  const {
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
    handleToggle,
  } = useCrosswordState(gridSize, initialPattern);

  const { tabToNextWhite, tabToPrevWhite } = useCrosswordNavigation(pattern, setFocusedCell);
  const { numbers, acrossClueNumbers, downClueNumbers } = generateClueNumbers(pattern);

  return (
    <div className="crossword-container">
      <div className="left-panel">
        <ModeSelector mode={mode} onChange={setMode} />
        <PuzzleExportPanel
          pattern={pattern}
          letters={letters}
          numbers={numbers}
          clues={clues}
          width={gridSize}
          height={gridSize}
        />
      </div>

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