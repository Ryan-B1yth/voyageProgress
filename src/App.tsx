import React from 'react';
import './App.css';

import { ProgressBar } from './components/ProgressBar/ProgressBar';

const App = () => {
  return (
    <div className='App'>
      <ProgressBar
        departureTime={'09-03-2023'}
        arrivalTime={'09-05-2023'}
        portOfDischarging='endingPlace'
        portOfLoading='startingPlace'
      />
    </div>
  );
};

export default App;
