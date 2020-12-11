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
      <div className="text-center">
        <h5>Current</h5>
        <p>{currentWaterLevel} ft³/s</p>
        <hr/>
      </div>
      <div className="text-center">
        <h5>Average</h5>
        <p>{Math.round(avgWaterLevel)} ft³/s</p>
        <hr/>
      </div>
      <div className="text-center">
        <h5>Max</h5>
        <p>{maxWaterLevel} ft³/s</p>
        <hr/>
      </div>
      <div className="text-center">
        <h5>Min</h5>
        <p>{minWaterLevel} ft³/s</p>
      </div>
    </div>
  );
};

export default WaterLevel;
