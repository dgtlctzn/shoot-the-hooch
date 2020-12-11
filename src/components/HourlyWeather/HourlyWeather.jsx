import React from "react";
import moment from "moment";
import "./HourlyWeather.css";

const HourlyWeather = ({ weather, displayWeatherIcon }) => {
  const iconClass = weather.weather[0].main;
  const time = moment.unix(weather.dt).format("h:mm a");
  const temp = `${Math.round(weather.temp)}°F`;
  return (
    <div className="hourly-card text-center">
      <p>
        <i className="far fa-clock" />
        {time}
      </p>
      <hr/>
      <p>
        <i className="fas fa-thermometer-empty" />
        {temp}
      </p>
      <hr/>
      <p>
        <i className={displayWeatherIcon(iconClass)} />
        <br/>
        {weather.weather[0].description}
      </p>
    </div>
  );
};

export default HourlyWeather;
