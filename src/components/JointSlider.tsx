import React, { ChangeEvent } from "react";

type Props = {
  jointNumber: number;
  actualAngle: number;
  commandAngle: number;
  min: number;
  max: number;
  disabled: boolean;
  onValueChange: (jointNumber: number, value: number) => void;
};

export const JointSlider: React.FC<Props> = ({
  jointNumber,
  actualAngle,
  commandAngle,
  min,
  max,
  disabled,
  onValueChange,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    onValueChange(jointNumber, newValue);
  };

  return (
    <div>
      <p>
        Actual Joint {jointNumber}: {actualAngle} deg
      </p>
      <p>
        Command Joint {jointNumber}: {commandAngle} deg
      </p>
      <label>{min}</label>
      <input
        type="range"
        min={min}
        max={max}
        value={commandAngle}
        onChange={handleChange}
        disabled={disabled}
        className="w-1/2 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg dark:bg-gray-700"
      />
      <label>{max}</label>
    </div>
  );
};
