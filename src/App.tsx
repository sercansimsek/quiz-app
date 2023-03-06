import React, { useState } from 'react';
import { MainMenu } from './components/MainMenu';
import { Quiz } from './components/Quiz';

export const App = () => {
  const [gameState, setGameState] = useState('menu');

  const toggleState = () => {
    setGameState('quiz');
  }

  return (
    <>
    <div className="App">
          {gameState === 'menu' && (
          <MainMenu toggle={toggleState}/>
        )}

        {gameState === 'quiz' && (
          <Quiz />
        )}  
    </div>
    </>
  );
}

