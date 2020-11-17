import React from "react";
import "./CurrentWeather.css";

const CurrentWeather = ({ time, temp, description, iconClass }) => {
  // changes fontawesome icon based on weather condition
  const displayWeatherIcon = (weatherEvent) => {
    switch (weatherEvent) {
      case "Clouds":
        return "fas fa-cloud";
      case "Rain":
        return "fas fa-cloud-rain";
      case "Smoke" || "Haze" || "Fog" || "Mist":
        return "fas fa-smog";
      case "Thunderstorm":
        return "fas fa-bolt";
      case "Snow":
        return "fas fa-snowflake";
      default:
        return "fas fa-sun";
    }
  };

  return (
    <div id="current">
      <h2>Current Weather</h2>
      <p>{time}</p>
      <p>{temp}</p>
      <p>{description}</p>
      <i className={displayWeatherIcon(iconClass)}></i>
    </div>
  );
};

export default CurrentWeather;
