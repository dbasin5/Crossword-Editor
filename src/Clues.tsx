import React from 'react';
import './Clues.css';

interface CluesProps {
  mode: 'whiteBlack' | 'letters' | 'clues';
  clues: {
    across: Record<number, string>;
    down: Record<number, string>;
  };
  setClues: React.Dispatch<React.SetStateAction<{
    across: Record<number, string>;
    down: Record<number, string>;
  }>>;
  acrossClueNumbers: number[];
  downClueNumbers: number[];
}

const Clues: React.FC<CluesProps> = ({ mode, clues, setClues, acrossClueNumbers, downClueNumbers }) => {
  const readOnly = mode !== 'clues';

  return (
    <div className="clues-box">
      <h3>ACROSS:</h3>
      {acrossClueNumbers.map(num => (
        <div className="clue-row" key={`across-${num}`}>
            <span className="clue-number">{num}.</span>
            <input
            type="text"
            className="clue-input"
            value={clues.across[num] ?? ''}
            readOnly={readOnly}
            onChange={(e) => {
                if (!readOnly) {
                setClues(prev => ({
                    ...prev,
                    across: { ...prev.across, [num]: e.target.value },
                }));
                }
            }}
            />
        </div>      
      ))}

      <h3>DOWN:</h3>
      {downClueNumbers.map(num => (
        <div className="clue-row" key={`down-${num}`}>
            <span className="clue-number">{num}.</span>
            <input
            type="text"
            className="clue-input"
            value={clues.down[num] ?? ''}
            readOnly={readOnly}
            onChange={(e) => {
                if (!readOnly) {
                setClues(prev => ({
                    ...prev,
                    down: { ...prev.down, [num]: e.target.value },
                }));
                }
            }}
            />
        </div>      
      ))}
    </div>
  );
};

export default Clues;