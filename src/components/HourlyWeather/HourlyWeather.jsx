import React from "react";
import moment from "moment";
import "./HourlyWeather.css";

const HourlyWeather = ({ weather, displayWeatherIcon }) => {
  const iconClass = weather.weather[0].main;
  const time = moment.unix(weather.dt).format("h:mm a");
  const temp = `${Math.round(weather.temp)}°F`;
  return (
    <div className="hourly-card">
      <p>
        <i class="far fa-clock" />
        {time}
      </p>
      <p>
        <i class="fas fa-thermometer-empty" />
        {temp}
      </p>
      <p>
        <i className={displayWeatherIcon(iconClass)} />
        {weather.weather[0].description}
      </p>
    </div>
  );
};

export default HourlyWeather;
