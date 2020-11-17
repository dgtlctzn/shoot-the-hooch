import React, { useRef, useEffect, useContext } from "react";
import moment from "moment";
import "./Locations.css";
import RiverLocContext from "../../utils/RiverLocContext";
import CurrentWeather from "../../components/CurrentWeather/CurrentWeather";
import HourlyWeather from "../../components/HourlyWeather/HourlyWeather";
import WaterLevel from "../../components/WaterLevel/WaterLevel";

const Locations = () => {
  const { weather, waterLevel } = useContext(RiverLocContext);
  const location = waterLevel.value.timeSeries[0].sourceInfo.siteName;
  const {
    latitude,
    longitude,
  } = waterLevel.value.timeSeries[0].sourceInfo.geoLocation.geogLocation;

  const iconClass = weather.current.weather[0].main;

  const time = moment.unix(weather.current.dt).format("h:mm a");
  const temp = `${Math.round(weather.current.temp)}°F`;

  const waterLevels = waterLevel.value.timeSeries[1].values[0].value;

  // searches API response for lowest/highest water levels and calculates average
  const findWaterLevels = (levels) => {
    let min = Infinity;
    let max = -Infinity;
    let avg = 0;
    for (const level of levels) {
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
    return { avg, max, min };
  };

  const { avg, max, min } = findWaterLevels(waterLevels);
  const currentWaterLevel = waterLevels[waterLevels.length - 1].value;

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

  // removes all caps in title
  const titleFormat = (title) => {
    const loc = title.split(",")[0];
    return loc
      .split(" ")
      .map((item) => item[0] + item.slice(1).toLowerCase())
      .join(" ");
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
      ctx.fillText("Average", WIDTH - 100, HEIGHT * percentAvg);
      ctx.fillText("Current", 10, Math.round(HEIGHT * percentFill));
      // ctx.fillText("Max", WIDTH / 2.5, 20);
      // ctx.fillText("Min", WIDTH / 2.5, HEIGHT * 0.95);
    }
  }, []);
  console.log(process.env.REACT_APP_GOOGLE_API_KEY);

  return (
    <div className="container">
      <h1>{titleFormat(location)}</h1>
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
        <div className="col-sm-2">
          <WaterLevel
            currentWaterLevel={currentWaterLevel}
            maxWaterLevel={max}
            minWaterLevel={min}
            avgWaterLevel={avg}
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
          {weather.hourly.map((item, index) => {
            if (index < 6 && index > 0) {
              return (
                <HourlyWeather
                  key={item.dt}
                  weather={item}
                  displayWeatherIcon={displayWeatherIcon}
                />
              );
            }
          })}
        </div>
      </div>
      <div>
        <div>
          <iframe
            width="600"
            height="450"
            frameBorder="0"
            style={{ border: 1 }}
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_API_KEY}&q=${location}&center=${latitude},${longitude}&zoom=15`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Locations;
