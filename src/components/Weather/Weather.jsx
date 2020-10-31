import React from "react";
import PropTypes from "prop-types";

const Weather = ({ weather }) => {
  return (
    <li className="list-group-item">
      <p>{weather.dt}</p>
      <p>{weather.temp}° F</p>
      <p>{weather.weather[0].description}</p>
    </li>
  );
};

Weather.propTypes = {};

export default Weather;
