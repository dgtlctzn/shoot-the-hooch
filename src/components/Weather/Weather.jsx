import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const Weather = ({ weather }) => {
  const time = moment.unix(weather.dt).format("h:mm a");

  return (
    <li className="list-group-item">
      <p>{time}</p>
      <p>{weather.temp}° F</p>
      <p>{weather.weather[0].description}</p>
    </li>
  );
};

Weather.propTypes = {};

export default Weather;
