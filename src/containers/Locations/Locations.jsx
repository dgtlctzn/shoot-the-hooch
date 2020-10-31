import React from "react";
import { useHistory } from "react-router-dom";
import Weather from "../../components/Weather/Weather"

const Locations = () => {
  let history = useHistory();
  const weather = history.location.state;
  console.log(weather);

  return (
    <div>
      <h1>Location</h1>
      <ul>
        {weather.hourly.map(item => (
          <Weather key={item.dt} weather={item}/>
        ))}
      </ul>
    </div>
  );
};

export default Locations;
