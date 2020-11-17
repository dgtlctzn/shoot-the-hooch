import React from "react";
import "./CurrentWeather.css";

const CurrentWeather = ({ time, temp, description, iconClass, displayWeatherIcon }) => {
  return (
    <div id="current">
      <h2>Current Weather</h2>
      <p>{time}</p>
      <p>{temp}</p>
      <p>{description}</p>
      <i id="current-icon" className={`current-icon ${displayWeatherIcon(iconClass)}`}></i>
    </div>
  );
};

export default CurrentWeather;
