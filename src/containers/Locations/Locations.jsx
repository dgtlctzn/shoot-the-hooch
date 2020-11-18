import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import "./Locations.css";
// import RiverLocContext from "../../utils/RiverLocContext";
import CurrentWeather from "../../components/CurrentWeather/CurrentWeather";
import HourlyWeather from "../../components/HourlyWeather/HourlyWeather";
import WaterLevel from "../../components/WaterLevel/WaterLevel";
import locations from "../../locations.json";
import API from "../../utils/API";

const Locations = () => {
  const { siteNo } = useParams();
  const canvasRef = useRef(null);

  const latitude = locations[siteNo].latitude;
  const longitude = locations[siteNo].longitude;

  const [waterLevels, setWaterLevels] = useState({
    min: 0,
    max: 0,
    avg: 0,
    current: 0,
  });

  const [locationName, setLocationName] = useState("");

  const [weather, setWeather] = useState({
    time: "",
    temp: "",
    iconClass: "",
    description: "",
    hourly: [],
  });

  // const { weather, waterLevel } = useContext(RiverLocContext);

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
    avg /= levels.length;
    return { avg, max, min };
  };

  // const { avg, max, min } = findWaterLevels(waterLevels);
  // const currentWaterLevel = waterLevels[waterLevels.length - 1].value;

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
    API.getWeather(latitude, longitude)
      .then((weatherResponse) => {
        console.log(weatherResponse);
        const iconClass = displayWeatherIcon(
          weatherResponse.data.current.weather[0].main
        );
        const time = moment
          .unix(weatherResponse.data.current.dt)
          .format("h:mm a");
        const temp = `${Math.round(weatherResponse.data.current.temp)}°F`;
        const description = weatherResponse.data.current.weather[0].description;
        const hourly = weatherResponse.data.hourly;

        setWeather({ ...weather, time, temp, iconClass, description, hourly });

        API.getWaterLevel(siteNo)
          .then((waterResponse) => {
            const location =
              waterResponse.data.value.timeSeries[0].sourceInfo.siteName;
            const allLevels =
              waterResponse.data.value.timeSeries[1].values[0].value;
            const { avg, max, min } = findWaterLevels(allLevels);
            const current = parseInt(allLevels[allLevels.length - 1].value);
            setWaterLevels({ ...waterLevels, min, max, avg, current });
            setLocationName(titleFormat(location));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // if (canvasRef.current) {
      // size of html canvas
      // console.log(waterLevels)
      const WIDTH = canvasRef.current.width;
      const HEIGHT = canvasRef.current.height;

      // conversion of fixed values to percentage for canvas translation
      const range = waterLevels.max - waterLevels.min;
      const percentFill = 1 - (waterLevels.current / range);
      const percentAvg = 1 - (waterLevels.avg / range);
      console.log(percentFill);

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
    // }
  }, [waterLevels]);

  return (
    <div className="container">
      <h1>{titleFormat(locationName)}</h1>
      <div id="main-col" className="row">
        <div className="col-sm-4">
          <CurrentWeather
            time={weather.time}
            temp={weather.temp}
            iconClass={weather.iconClass}
            description={weather.description}
            // displayWeatherIcon={displayWeatherIcon}
            className="current"
          />
        </div>
        <div className="col-sm-2">
          <WaterLevel
            currentWaterLevel={waterLevels.current}
            maxWaterLevel={waterLevels.max}
            minWaterLevel={waterLevels.min}
            avgWaterLevel={waterLevels.avg}
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
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_API_KEY}&q=${locationName}&center=${latitude},${longitude}&zoom=15`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Locations;
