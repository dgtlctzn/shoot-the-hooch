import React, { useRef, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Weather from "../../components/Weather/Weather";
import moment from "moment";
import "./Locations.css";
import RiverLocContext from "../../utils/RiverLocContext";
import CurrentWeather from "../../components/CurrentWeather/CurrentWeather";
import HourlyWeather from "../../components/HourlyWeather/HourlyWeather";

const Locations = () => {
  const { weather, waterLevel } = useContext(RiverLocContext);

  const iconClass = weather.current.weather[0].main;

  const time = moment.unix(weather.current.dt).format("h:mm a");
  const temp = `${Math.round(weather.current.temp)}°F`;

  const waterLevels = waterLevel.value.timeSeries[1].values[0].value;

  // searches API response for lowest/highest water levels and calculates average
  let min = Infinity;
  let max = -Infinity;
  let avg = 0;
  for (const level of waterLevels) {
    const levelVal = parseInt(level.value);
    if (levelVal > max) {
      max = levelVal;
    }
    if (levelVal < min) {
      min = levelVal;
    }
    avg += levelVal;
  }
  avg /= waterLevels.length;

  const currentWaterLevel = waterLevels[waterLevels.length - 1].value;
  const avgWaterLevel = `${Math.round(avg)} ft³/s`;
  const minWaterLevel = `${min} ft³/s`;
  const maxWaterLevel = `${max} ft³/s`;

  const canvasRef = useRef(null);

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

  useEffect(() => {
    if (canvasRef.current) {
      // size of html canvas
      const WIDTH = canvasRef.current.width;
      const HEIGHT = canvasRef.current.height;

      // conversion of fixed values to percentage for canvas translation
      const range = max - min;
      const percentFill = 1 - currentWaterLevel / range;
      const percentAvg = 1 - avg / range;

      // fills canvas with water based on current level
      const ctx = canvasRef.current.getContext("2d");
      ctx.fillStyle = "rgb(194, 231, 255)";
      ctx.fillRect(0, 0, WIDTH, Math.round(HEIGHT * percentFill));

      // adds line to canvas for average water level
      ctx.strokeStyle = "red";
      ctx.moveTo(0, HEIGHT * percentAvg);
      ctx.lineTo(WIDTH, HEIGHT * percentAvg);
      ctx.stroke();

      // adds text to canvas for each value
      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(avgWaterLevel, WIDTH - 100, HEIGHT * percentAvg);
      ctx.fillText(
        currentWaterLevel + " ft³/s",
        10,
        Math.round(HEIGHT * percentFill)
      );
      ctx.fillText(maxWaterLevel, WIDTH / 2.5, 20);
      ctx.fillText(minWaterLevel, WIDTH / 2.5, HEIGHT * 0.95);
    }
  }, []);

  return (
    <div className="container">
      <h1>Location</h1>
      <div id="main-col" className="row">
        <div className="col-sm-4">
          <CurrentWeather
            time={time}
            temp={temp}
            iconClass={iconClass}
            description={weather.current.weather[0].description}
            displayWeatherIcon={displayWeatherIcon}
            className="current"
          />
        </div>
        <div className="col-sm-4">
          <div className="row">
            <div className="col-sm-12">
              <canvas className="canvas" ref={canvasRef} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 hourly">
          {weather.hourly.map(
            (item, index) => {
              if (index < 6 && index > 0) {
                return <HourlyWeather key={item.dt} weather={item} displayWeatherIcon={displayWeatherIcon} />;
              }
            }
            // <Weather key={item.dt} weather={item} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Locations;
