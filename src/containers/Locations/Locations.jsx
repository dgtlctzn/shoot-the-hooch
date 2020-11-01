import React from "react";
import { useHistory } from "react-router-dom";
import Weather from "../../components/Weather/Weather";
import moment from "moment";
import "./Locations.css";

const Locations = () => {
  let history = useHistory();
  const weather = history.location.state;
  console.log(weather);

  const time = moment.unix(weather.current.dt).format("h:mm a");
  const temp = `${Math.round(weather.current.temp)}°F`;

  const waterLevels = weather.value.timeSeries[1].values[0].value;
  console.log(waterLevels);

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

  const currentWaterLevel = `${
    waterLevels[waterLevels.length - 1].value
  } ft³/s`;
  const avgWaterLevel = `${Math.round(avg)} ft³/s`;
  const minWaterLevel = `${min} ft³/s`;
  const maxWaterLevel = `${max} ft³/s`;

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
            {weather.hourly.map((item) => (
              <Weather key={item.dt} weather={item} />
            ))}
          </ul>
        </div>
        <div className="col-sm-4">
          <div className="row">
            <div id="water-level" className="col-sm-12">
              <p>{currentWaterLevel}</p>
              <p>{minWaterLevel}</p>
              <p>{maxWaterLevel}</p>
              <p>{avgWaterLevel}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
