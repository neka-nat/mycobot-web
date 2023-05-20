import React, { createContext, useState } from "react";
import { SerialHelper } from "../utils/SerialHelper";

type SerialContextData = {
  serialHelper: SerialHelper;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};

export const SerialContext = createContext<SerialContextData>(
  {} as SerialContextData
);

export const SerialProvider = ({ children }: { children: React.ReactNode }) => {
  const [serialHelper] = useState(() => new SerialHelper());
  const [isConnected, setIsConnected] = useState(false);

  const connect = async () => {
    try {
      await serialHelper.connect();
      setIsConnected(true);
    } catch (err) {
      console.error("Failed to connect:", err);
    }
  };

  const disconnect = async () => {
    try {
      await serialHelper.disconnect();
      setIsConnected(false);
    } catch (err) {
      console.error("Failed to disconnect:", err);
    }
  };

  const value = { serialHelper, isConnected, connect, disconnect };

  return (
    <SerialContext.Provider value={value}>{children}</SerialContext.Provider>
  );
};
