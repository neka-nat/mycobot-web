import React from "react";
import { ControlPanel } from "./components/ControlPanel";
import { OperatingBoard } from "./components/OperatingBoard";
import { SerialProvider } from "./contexts/SerialContext";
import "./App.css";

function App() {
  return (
    <div>
      <p>Serial communication with mycobot in your browser!</p>
      <p>First, follow <a href="https://zenn.dev/karaage0703/books/3be6bad93b0c8e/viewer/3b3b5a">this link</a> to set up mycobot.</p>
      <SerialProvider>
        <ControlPanel />
        <OperatingBoard />
      </SerialProvider>
    </div>
  );
}

export default App;
