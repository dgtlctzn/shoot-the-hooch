import React from "react";

const HourlyWeather = () => {
  return (
    <div id="hourly">
      <h2>Current Weather</h2>
      <p>{time}</p>
      <p>{temp}</p>
      <p>{description}</p>
      <i className={displayWeatherIcon(iconClass)}></i>
    </div>
  );
};

export default HourlyWeather;
