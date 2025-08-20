import React, { useState } from 'react';
import './PuzzleExportPanel.css';
import { GeneratePuzzleArgs } from './types';
import { makeIPuz } from './makeIPuz';
import { downloadIPuz } from './downloadIPuz';

interface PuzzleExportPanelProps {
  pattern: boolean[][];
  letters: string[][];
  numbers: (number | undefined)[][];
  clues: {
    across: Record<number, string>;
    down: Record<number, string>;
  };
  width: number;
  height: number;
}

const PuzzleExportPanel: React.FC<PuzzleExportPanelProps> = ({
  pattern,
  letters,
  numbers,
  clues,
  width,
  height,
}) => {
  const [title, setTitle] = useState('Untitled Puzzle');
  const [author, setAuthor] = useState('David Basin');

  const handleDownload = () => {
    const puzzleData: GeneratePuzzleArgs = {
      width,
      height,
      pattern,
      letters,
      numbers,
      clues,
      metadata: {
        title,
        author,
      },
    };

    const ipuz = makeIPuz(puzzleData);
    downloadIPuz(ipuz);
  };

  return (
    <div className="puzzle-export-panel">
      <label>
        Title:
        <input
          type="text"
          className="export-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label>
        Author:
        <input
          type="text"
          className="export-input"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </label>

      <button className="download-button" onClick={handleDownload}>
        Download .ipuz
      </button>
    </div>
  );
};

export default PuzzleExportPanel;
