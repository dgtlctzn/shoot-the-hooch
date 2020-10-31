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

  const listLength = weather.value.timeSeries[1].values[0].value.length;
  console.log(listLength);
  const waterLevel = `${
    weather.value.timeSeries[1].values[0].value[listLength - 1].value
  } ft3/s`;

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
              <p>{waterLevel}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
