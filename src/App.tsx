import React from "react";
import { ControlPanel } from "./components/ControlPanel";
import { OperatingBoard } from "./components/OperatingBoard";
import { SerialProvider } from "./contexts/SerialContext";

function App() {
  return (
    <div className="px-7 py-7 grid grid-cols-1 gap-5">
      <p className="text-3xl font-bold">Serial communication with mycobot in your browser!</p>
      <p>First, follow <a href="https://zenn.dev/karaage0703/books/3be6bad93b0c8e/viewer/3b3b5a" className="text-slate-500 hover:text-sky-500">this link</a> to set up mycobot.</p>
      <SerialProvider>
        <ControlPanel />
        <OperatingBoard />
      </SerialProvider>
    </div>
  );
}

export default App;
