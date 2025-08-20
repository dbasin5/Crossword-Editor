import { IPuz,GeneratePuzzleArgs } from "./types";

export function makeIPuz({
    width,
    height,
    pattern,
    letters,
    numbers,
    clues,
    metadata,
    }: GeneratePuzzleArgs): IPuz {
    const puzzle = Array.from({ length: height }, (_, r) =>
        Array.from({ length: width }, (_, c) => {
            if (pattern[r][c]) {
            return null; // black square
            }
        
            const number = numbers[r][c];
            return number !== undefined ? number : 0;
        })
    );
    const solution = letters;

    const across = Object.entries(clues.across)
        .map(([num, clue]) => ({ number: Number(num), clue }))
        .sort((a, b) => a.number - b.number);

    const down = Object.entries(clues.down)
        .map(([num, clue]) => ({ number: Number(num), clue }))
        .sort((a, b) => a.number - b.number);

    return {
        version: "http://ipuz.org/v2",
        kind: ["http://ipuz.org/crossword#1"],
        title: metadata.title,
        author: metadata.author,
        dimensions: { width, height },
        puzzle,
        solution,
        clues: { across, down },
    };
}
