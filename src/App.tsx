import React, { useState } from 'react';
import { Questions } from './components/Questions/Questions';
import { Startup } from './components/Startup/Startup';

export const App = () => {
  const [isGameStarted, setIsGameStarted] = useState(true);
  return (
    <>
      {isGameStarted 
        ? ( <Questions /> ) 
        : ( <Startup /> )
      }     
    </>
  );
}

