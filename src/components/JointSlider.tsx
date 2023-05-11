import React, { ChangeEvent } from 'react';

type Props = {
  jointNumber: number;
  actualAngle: number;
  commandAngle: number;
  min: number;
  max: number;
  onValueChange: (jointNumber: number, value: number) => void;
}

export const JointSlider: React.FC<Props> = ({ jointNumber, actualAngle, commandAngle, min, max, onValueChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    onValueChange(jointNumber, newValue);
  };

  return (
    <div>
      <p>Actual Joint {jointNumber}: {actualAngle} deg</p>
      <p>Command Joint {jointNumber}: {commandAngle} deg</p>
      <label>{min}</label>
      <input 
        type="range" 
        min={min}
        max={max}
        value={commandAngle}
        onChange={handleChange}
      />
      <label>{max}</label>
    </div>
  );
};
