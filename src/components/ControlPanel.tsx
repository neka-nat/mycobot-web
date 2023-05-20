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
    <div className="flex flex-col items-start space-y-4">
      <div className="flex flex-raw">
        <button
          onClick={handleConnectClick}
          disabled={isConnected}
          className="bg-gray-600 hover:bg-gray-100 text-white rounded shadow px-4 py-2"
        >
          Connect
        </button>
        <button
          onClick={handleDisconnectClick}
          disabled={!isConnected}
          className="bg-gray-600 hover:bg-gray-100 text-white rounded shadow px-4 py-2"
        >
          Disconnect
        </button>
      </div>
      <div className="flex flex-raw">
        <button
          onClick={() => handleSetColorClick(255, 0, 0)}
          disabled={!isConnected}
          className="bg-red-600 hover:bg-red-100 text-white rounded shadow px-4 py-2"
        >
          LED Red
        </button>
        <button
          onClick={() => handleSetColorClick(0, 255, 0)}
          disabled={!isConnected}
          className="bg-green-600 hover:bg-green-100 text-white rounded shadow px-4 py-2"
        >
          LED Green
        </button>
        <button
          onClick={() => handleSetColorClick(0, 0, 255)}
          disabled={!isConnected}
          className="bg-blue-600 hover:bg-blue-100 text-white rounded shadow px-4 py-2"
        >
          LED Blue
        </button>
      </div>
    </div>
  );
};
