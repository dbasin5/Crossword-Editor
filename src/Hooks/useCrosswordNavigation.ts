import { Dispatch, SetStateAction } from 'react';

export function useCrosswordNavigation(
  pattern: boolean[][],
  setFocusedCell: Dispatch<SetStateAction<{ row: number; col: number } | null>>
) {
  const gridSize = pattern.length;

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

  return { tabToNextWhite, tabToPrevWhite };
}
