import React from 'react';
import '../Styles/App.css';
import Crossword from './Crossword';

function App() {
  return (
    <div className="App">
      <div style={{ padding: '20px' }}>
        <h1>Crossword Grid</h1>
        <Crossword />
      </div>
    </div>
  );
}

export default App;
