export type EditMode = 'whiteBlack' | 'letters' | 'clues';

export interface IPuz {
    version: string;
    kind: string[];
    title: string;
    author?: string;
    dimensions: { width: number; height: number };
    puzzle: (number | null)[][];
    solution: string[][];
    clues: {
        across: Array<{ number: number; clue: string }>;
        down: Array<{ number: number; clue: string }>;
    };
}

export interface GeneratePuzzleArgs {
    width: number;
    height: number;
    pattern: boolean[][]; // true = black square
    letters: string[][];  // user input or solution grid
    numbers: (number | undefined)[][]; // determines clue number location
    clues: {
        across: Record<number, string>;
        down: Record<number, string>;
    };
    metadata: {
        title: string;
        author?: string;
        copyright?: string;
    };
}
  