import React from "react";
import { useHistory } from "react-router-dom";
import Weather from "../../components/Weather/Weather";
import moment from "moment";
import "./Locations.css"

const Locations = () => {
  let history = useHistory();
  const weather = history.location.state;
  console.log(weather);

  const time = moment.unix(weather.current.dt).format("h:mm a");
  const temp = `${Math.round(weather.current.temp)}°F`;

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
      </div>
    </div>
  );
};

export default Locations;
