import React from "react";
import { useHistory } from "react-router-dom";

const Locations = () => {
  let history = useHistory();
  const weather = history.location.state;
  console.log(weather);

  return (
    <div>
      <h1>Location</h1>
      <p>{weather.list[0].main.temp}</p>
    </div>
  );
};

export default Locations;
