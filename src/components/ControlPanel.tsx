import React, { useState, useContext, useEffect } from "react";
import { SerialContext } from "../contexts/SerialContext";
import { Command } from "../utils/Command";

export const ControlPanel = () => {
  const { serialHelper, isConnected, connect, disconnect } =
    useContext(SerialContext);
  const [isConnecting, setIsConnecting] = useState(false);
  const [command] = useState(() => new Command());

  async function handleConnectClick() {
    setIsConnecting(true);
    connect();
  }

  async function handleDisconnectClick() {
    setIsConnecting(false);
    disconnect();
  }

  async function handleSetColorClick(r: number, g: number, b: number) {
    try {
      await command.setColor(serialHelper, r, g, b);
    } catch (err) {
      console.error("Failed to set color:", err);
    }
  }

  useEffect(() => {
    if (isConnected) {
      setIsConnecting(false);
    }
  }, [isConnected]);

  return (
    <div className="flex flex-col items-start space-y-4">
      <div className="flex flex-raw">
        <button
          onClick={handleConnectClick}
          disabled={isConnected || isConnecting}
          className="bg-gray-600 hover:bg-gray-100 text-white rounded shadow px-4 py-2"
        >
          Connect
        </button>
        <button
          onClick={handleDisconnectClick}
          disabled={!isConnected || isConnecting}
          className="bg-gray-600 hover:bg-gray-100 text-white rounded shadow px-4 py-2"
        >
          Disconnect
        </button>
        {isConnected && (
          <span className="text-green-500 px-4 py-2">Connected</span>
        )}
        {isConnecting && (
          <span className="text-gray-500 px-4 py-2">Connecting...</span>
        )}
      </div>
      <div className="flex flex-raw">
        <button
          onClick={() => handleSetColorClick(255, 0, 0)}
          disabled={!isConnected || isConnecting}
          className="bg-red-600 hover:bg-red-100 text-white rounded shadow px-4 py-2"
        >
          LED Red
        </button>
        <button
          onClick={() => handleSetColorClick(0, 255, 0)}
          disabled={!isConnected || isConnecting}
          className="bg-green-600 hover:bg-green-100 text-white rounded shadow px-4 py-2"
        >
          LED Green
        </button>
        <button
          onClick={() => handleSetColorClick(0, 0, 255)}
          disabled={!isConnected || isConnecting}
          className="bg-blue-600 hover:bg-blue-100 text-white rounded shadow px-4 py-2"
        >
          LED Blue
        </button>
      </div>
    </div>
  );
};
