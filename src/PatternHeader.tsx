import React from 'react';
import './PatternHeader.css';

interface PatternHeaderProps {
  isValid: boolean;
}

const PatternHeader: React.FC<PatternHeaderProps> = ({ isValid }) => {
  const text = isValid ? '✔️ Valid Pattern!' : '❌ Invalid pattern :(';
  const className = `pattern-header ${isValid ? 'valid' : 'invalid'}`;

  return <p className={className}>{text}</p>;
};

export default PatternHeader;