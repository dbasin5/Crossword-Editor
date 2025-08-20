export function generateClueNumbers(pattern: boolean[][]): {
    numbers: (number | undefined)[][],
    acrossClueNumbers: number[],
    downClueNumbers: number[]
  } {
    const gridSize = pattern.length;
    let counter = 1;
    const numbers = Array(gridSize).fill(null).map(() => Array(gridSize).fill(undefined));
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
  
    return { numbers, acrossClueNumbers, downClueNumbers };
  }
  