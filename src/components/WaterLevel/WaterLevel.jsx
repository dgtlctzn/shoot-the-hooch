import React from "react";
import "./WaterLevel.css";

const WaterLevel = ({
  currentWaterLevel,
  maxWaterLevel,
  avgWaterLevel,
  minWaterLevel,
}) => {
  return (
    <div className="water-level">
      <p>Current: {currentWaterLevel} ft³/s</p>
      <p>Average: {avgWaterLevel}</p>
      <p>Max: {maxWaterLevel}</p>
      <p>Min: {minWaterLevel}</p>
    </div>
  );
};

export default WaterLevel;
