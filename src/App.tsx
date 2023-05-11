import React from 'react';
import { ControlPanel } from './components/ControlPanel';
import { OperatingBoard } from './components/OperatingBoard';
import { SerialProvider } from './contexts/SerialContext';
import './App.css';

function App() {
  return (
    <div>
      <SerialProvider>
        <ControlPanel />
        <OperatingBoard />
      </SerialProvider>
    </div>
  );
}

export default App;