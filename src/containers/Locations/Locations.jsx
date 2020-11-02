import React, { useRef, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Weather from "../../components/Weather/Weather";
import moment from "moment";
import "./Locations.css";
import RiverLocContext from "../../utils/RiverLocContext";

const Locations = () => {
  const { weather, waterLevel } = useContext(RiverLocContext);

  const time = moment.unix(weather.current.dt).format("h:mm a");
  const temp = `${Math.round(weather.current.temp)}°F`;

  const waterLevels = waterLevel.value.timeSeries[1].values[0].value;

  // searches API response for lowest/highest water levels and calculates average
  let min = Infinity;
  let max = -Infinity;
  let avg = 0;
  for (const level of waterLevels) {
    const levelVal = parseInt(level.value);
    if (levelVal > max) {
      max = levelVal;
    }
    if (levelVal < min) {
      min = levelVal;
    }
    avg += levelVal;
  }
  avg /= waterLevels.length;

  const currentWaterLevel = waterLevels[waterLevels.length - 1].value;
  const avgWaterLevel = `${Math.round(avg)} ft³/s`;
  const minWaterLevel = `${min} ft³/s`;
  const maxWaterLevel = `${max} ft³/s`;

  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      // size of html canvas
      const WIDTH = canvasRef.current.width;
      const HEIGHT = canvasRef.current.height;

      // conversion of fixed values to percentage for canvas translation
      const range = max - min;
      const percentFill = currentWaterLevel / range;
      const percentAvg = avg / range;

      // fills canvas with water based on current level
      const ctx = canvasRef.current.getContext("2d");
      ctx.fillStyle = "blue";
      ctx.fillRect(0, 0, WIDTH, Math.round(HEIGHT * percentFill));

      // adds line to canvas for average water level
      ctx.strokeStyle = "red";
      ctx.moveTo(0, HEIGHT * percentAvg);
      ctx.lineTo(WIDTH, HEIGHT * percentAvg);
      ctx.stroke();
    }
  }, []);

  return (
    <div className="container">
      <h1>Location</h1>
      <div className="row">
        <div className="col-sm-4">
          <ul>
            <li className="list-group-item">
              <p>{time}</p>
              <p>{temp}</p>
              <p>{weather.current.weather[0].description}</p>
            </li>
            {weather.hourly
              .filter((item, index) => index < 6)
              .map((item) => (
                <Weather key={item.dt} weather={item} />
              ))}
          </ul>
        </div>
        <div className="col-sm-2">
          <div className="row">
            <div id="water-level" className="col-sm-12">
              <p>Current Water Flow: {currentWaterLevel} ft³/s</p>
              <p>Minimum Water Flow: {minWaterLevel}</p>
              <p>Maximum Water Flow: {maxWaterLevel}</p>
              <p>Average Water FLow: {avgWaterLevel}</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="row">
            <div className="col-sm-12">
              <canvas ref={canvasRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
