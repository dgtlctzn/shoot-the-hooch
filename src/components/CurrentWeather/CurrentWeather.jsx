import React from "react";
import "./CurrentWeather.css"

const CurrentWeather = ({ time, temp, description }) => {
  return (
    <div id="current">
      <h2>Current Weather</h2>
      <p>{time}</p>
      <p>{temp}</p>
      <p>{description}</p>
    </div>
  );
};

export default CurrentWeather;
