/**
 * Validates a 2D crossword grid.
 * @param pattern 2D array of booleans where `true = black`, `false = white`
 * @returns true if all white squares are part of ≥3 contiguous white squares in both directions
 */
 export function isValidCrosswordPattern(pattern: boolean[][]): boolean {
    const size = pattern.length;
    
    // Check if they're all black
    let allBlack = true;
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (!pattern[r][c]) {
                allBlack = false;
                break;
            }
        }
        if (!allBlack) break;
    }
    if (allBlack) return false;
  
    const isWhite = (r: number, c: number) =>
      r >= 0 && r < size && c >= 0 && c < size && !pattern[r][c];
  
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (pattern[r][c]) continue; // skip black
  
        // Count horizontal white run
        let hStart = c;
        while (hStart > 0 && isWhite(r, hStart - 1)) hStart--;
        let hEnd = c;
        while (hEnd < size - 1 && isWhite(r, hEnd + 1)) hEnd++;
        const hCount = hEnd - hStart + 1;
  
        // Count vertical white run
        let vStart = r;
        while (vStart > 0 && isWhite(vStart - 1, c)) vStart--;
        let vEnd = r;
        while (vEnd < size - 1 && isWhite(vEnd + 1, c)) vEnd++;
        const vCount = vEnd - vStart + 1;
  
        if (hCount < 3 || vCount < 3) {
          return false;
        }
      }
    }
  
    return true;
  }