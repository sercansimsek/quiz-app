import React from 'react';
import { Questions } from './components/Questions/Questions';
import { Startup } from './components/Startup/Startup';

export const App = () => {
  return (
    <>
    {true && (
      <Startup />
    )}
      
      {false && (
      <Questions />
      )}
    
      </>
  );
}

