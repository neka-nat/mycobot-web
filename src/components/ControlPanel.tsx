import React, { useState, useContext } from "react";
import { SerialContext } from "../contexts/SerialContext";
import { Command } from "../utils/Command";

export const ControlPanel = () => {
  const { serialHelper, isConnected, connect, disconnect } =
    useContext(SerialContext);
  const [command] = useState(() => new Command());

  async function handleConnectClick() {
    connect();
  }

  async function handleDisconnectClick() {
    disconnect();
  }

  async function handleSetColorClick(r: number, g: number, b: number) {
    try {
      await command.setColor(serialHelper, r, g, b);
    } catch (err) {
      console.error("Failed to set color:", err);
    }
  }

  return (
    <div>
      <button onClick={handleConnectClick} disabled={isConnected}>
        Connect
      </button>
      <button onClick={handleDisconnectClick} disabled={!isConnected}>
        Disconnect
      </button>
      <button
        onClick={() => handleSetColorClick(255, 0, 0)}
        disabled={!isConnected}
      >
        LED Red
      </button>
      <button
        onClick={() => handleSetColorClick(0, 255, 0)}
        disabled={!isConnected}
      >
        LED Green
      </button>
      <button
        onClick={() => handleSetColorClick(0, 0, 255)}
        disabled={!isConnected}
      >
        LED Blue
      </button>
    </div>
  );
};
