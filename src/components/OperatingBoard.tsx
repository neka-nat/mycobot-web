import React, { useState, useEffect, useContext } from 'react';
import { JointSlider } from './JointSlider';
import { Command } from '../utils/Command';
import { SerialContext } from '../contexts/SerialContext';
import { NUM_AXES } from '../utils/common';

export const OperatingBoard = () => {
  const { serialHelper, isConnected } = useContext(SerialContext);
  const [command] = useState(() => new Command());
  const [actualAngles, setActualAngles] = useState(Float32Array.from([0, 0, 0, 0, 0, 0]));
  const [commandAngles, setCommandAngles] = useState(Float32Array.from([0, 0, 0, 0, 0, 0]));
  const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>(undefined);

  const handleValueChange = (jointNumber: number, value: number) => {
    if (!isConnected) return;
    command.sendAngle(serialHelper, jointNumber, value, 50);
    const newCommandAngles = commandAngles.slice(0);
    newCommandAngles[jointNumber - 1] = value;
    setCommandAngles(newCommandAngles);
  }

  useEffect(() => {
    if (isConnected) {
        const timerId = setInterval(async () => {
          const newAngle = await command.getAngles(serialHelper);
          if (newAngle.length === NUM_AXES) {
            setActualAngles(newAngle);
          }
        }, 1000);
        setTimerId(timerId);
        command.getAngles(serialHelper).then((newAngle) => {setCommandAngles(newAngle);}).catch((err) => {console.error("Failed to get angles:", err);})
    } else {
        if (timerId) {
            clearInterval(timerId);
            setTimerId(undefined);
        }
    }
    return () => { if (timerId) clearInterval(timerId); };
  }, [isConnected]);

  return (
    <div>
      {[1, 2, 3, 4, 5, 6].map((jointNumber) => (
        <JointSlider 
          key={jointNumber} 
          jointNumber={jointNumber}
          actualAngle={actualAngles[jointNumber - 1]}
          commandAngle={commandAngles[jointNumber - 1]}
          min={-180} 
          max={180} 
          onValueChange={handleValueChange}
        />
      ))}
    </div>
  );
};
