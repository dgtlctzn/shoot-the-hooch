import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import "./Locations.css";
import CurrentWeather from "../../components/CurrentWeather/CurrentWeather";
import HourlyWeather from "../../components/HourlyWeather/HourlyWeather";
import WaterLevel from "../../components/WaterLevel/WaterLevel";
import locations from "../../locations.json";
import API from "../../utils/API";
import Nav from "../../components/Nav/Nav";
import Buttons from "../../components/Buttons/Buttons";

const Locations = () => {
  const { siteName } = useParams();
  const canvasRef = useRef();
  const googleSearch = locations[siteName].name;

  // latitude and longitude for weather API call
  const latitude = locations[siteName].latitude;
  const longitude = locations[siteName].longitude;
  const siteNo = locations[siteName].site;

  const [limit, setLimit] = useState({
    lower: 0,
    upper: 5,
  });

  const [waterLevels, setWaterLevels] = useState({
    min: 0,
    max: 0,
    avg: 0,
    current: 0,
  });

  const [locationDetails, setLocationDetails] = useState({
    name: "",
    siteLatitude: "",
    siteLongitude: "",
  });

  const [weather, setWeather] = useState({
    time: "",
    temp: "",
    iconClass: "",
    description: "",
    hourly: [],
  });

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
            const name = titleFormat(
              waterResponse.data.value.timeSeries[0].sourceInfo.siteName
            );
            let allLevels;
            const { timeSeries } = waterResponse.data.value;
            for (const series of timeSeries) {
              if (series.variable.unit.unitCode === "ft3/s") {
                allLevels = series.values[0].value
              }
            }
            const { avg, max, min } = findWaterLevels(allLevels);
            const current = parseInt(allLevels[allLevels.length - 1].value);
            const geocoordinates =
              waterResponse.data.value.timeSeries[0].sourceInfo.geoLocation
                .geogLocation;
            const siteLatitude = geocoordinates.latitude;
            const siteLongitude = geocoordinates.longitude;

            setWaterLevels({ ...waterLevels, min, max, avg, current });
            setLocationDetails({
              ...locationDetails,
              name,
              siteLatitude,
              siteLongitude,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const animateWater = (waterLevels, degrees = 0) => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.getContext("2d");

      // size of html canvas
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;

      // conversion of fixed values to percentage for canvas translation
      const range = waterLevels.max - waterLevels.min;
      const percentFill = 1 - (waterLevels.current - waterLevels.min) / range;
      const percentAvg = 1 - (waterLevels.avg - waterLevels.min) / range;

      canvas.clearRect(0, 0, width, height);
      canvas.fillStyle = "rgb(194, 231, 255)";

      // converts degrees into radians
      let change = degrees * (Math.PI / 180);
      // gives value between 0 and 1 and weighs it with arbitrary no. to be added to percent fill
      let newFill = Math.sin(change) / 50;

      if (percentFill) {
        canvas.fillRect(0, 0, width, height * (percentFill + newFill));

        // adds line to canvas for average water level
        canvas.strokeStyle = "red";
        canvas.moveTo(0, height * percentAvg);
        canvas.lineTo(width, height * percentAvg);
        canvas.stroke();

        // adds text to canvas for each value
        canvas.font = "20px Arial";
        canvas.fillStyle = "black";
        canvas.fillText("Average", width - 100, height * percentAvg);
        canvas.fillText("Current", 10, Math.round(height * percentFill));

        // cycles between 0 and 360 degrees and calls recursive function
        setTimeout(() => {
          if (degrees === 360) {
            degrees = 0;
          } else {
            degrees++;
          }
          window.requestAnimationFrame(() =>
            animateWater(waterLevels, (degrees = degrees))
          );
        }, 10);
      }
    }
  };

  useEffect(() => {
    animateWater(waterLevels);
  }, [waterLevels]);

  // increases range for viewing hourly weather
  const handleNextButton = (e) => {
    if (limit.upper < 40) {
      setLimit({ ...limit, upper: limit.upper + 5, lower: limit.lower + 5 });
    }
  };

  const handleBackButton = (e) => {
    if (limit.lower !== 0) {
      setLimit({ ...limit, upper: limit.upper - 5, lower: limit.lower - 5 });
    }
  };

  return (
    <>
      <Nav />
      <div className="container">
        {/* <h1 className="text-center">{titleFormat(locationDetails.name)}</h1> */}
        <h1 className="text-center loc-title">{siteName}</h1>
        <h1 className="text-center loc-header">Current Weather</h1>
        <div id="main-col" className="row loc-row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <CurrentWeather
              time={weather.time}
              temp={weather.temp}
              iconClass={weather.iconClass}
              description={weather.description}
              className="current"
            />
          </div>
          <div className="col-sm-4"></div>
        </div>
        <h1 className="text-center loc-header">Water Level</h1>
        <div className="row loc-row">
          <div className="col-md-0 col-xl-2"></div>
          <div className="col-md-8 col-xl-2">
            <WaterLevel
              currentWaterLevel={waterLevels.current}
              maxWaterLevel={waterLevels.max}
              minWaterLevel={waterLevels.min}
              avgWaterLevel={waterLevels.avg}
            />
          </div>
          <div className="col-m-8 col-xl-4">
            <canvas id="canvas" className="canvas" ref={canvasRef} />
          </div>
        </div>
        <h1 className="text-center loc-header">Hourly Weather</h1>
        <div className="row loc-row">
          <div className="col-sm-12 hourly">
            {weather.hourly.map((item, index) => {
              if (index <= limit.upper && index > limit.lower) {
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
        <div className="row">
          <div className="col-sm-12 text-center">
            <Buttons
              handleNextButton={handleNextButton}
              handleBackButton={handleBackButton}
            />
          </div>
        </div>
        <br />
        <h1 className="text-center loc-header">Map</h1>
        <div className="row loc-row">
          <div className="col-sm-12 map text-center">
            <iframe
              // width="600"
              // height="450"
              frameBorder="0"
              style={{ border: 1 }}
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_API_KEY}&q=${googleSearch}&center=${latitude},${longitude}&zoom=15`}
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <h1 className="text-center loc-header">Shoot the hooch!</h1>
        <div className="row">
          <div className="col-sm-12 text-center">
            <iframe
              // width="600"
              // height="450"
              src="https://www.youtube.com/embed/JW5UEW2kYvc"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default Locations;
