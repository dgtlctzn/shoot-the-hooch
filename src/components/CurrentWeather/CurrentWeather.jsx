import React from "react";
import "./CurrentWeather.css";

const CurrentWeather = ({ time, temp, description, iconClass }) => {
  return (
    <div id="current">
      <div className="row row-titles">
        <div className="col-sm-4 text-center">
          <h5>Time</h5>
        </div>
        <div className="col-sm-4 text-center">
          <h5>Temperature</h5>
        </div>
        <div className="col-sm-4 text-center">
          <h5>Weather</h5>
        </div>
      </div>
      <hr/>
      <div className="row">
        <div className="col-sm-4 text-center">
          <p>{time}</p>
        </div>
        <div className="col-sm-4 text-center">
          <p>{temp}</p>
        </div>
        <div className="col-sm-4 text-center">
          <p>{description}</p>
        </div>
      </div>
      <div className="row icon-row">
        <div className="col-sm-12 text-center">
          <i id="current-icon" className={`current-icon ${iconClass}`}></i>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
