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
      <p>Average: {Math.round(avgWaterLevel)} ft³/s</p>
      <p>Max: {maxWaterLevel} ft³/s</p>
      <p>Min: {minWaterLevel} ft³/s</p>
    </div>
  );
};

export default WaterLevel;
