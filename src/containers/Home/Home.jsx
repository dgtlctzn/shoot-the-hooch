import { useState, useEffect } from "react";
import Form from "../../components/Form/Form";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [riverLoc, setRiverLoc] = useState({
    latitude: 33.87,
    longitude: -84.34,
    location: "northatlanta",
    site: "02335815",
  });

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    API.getWeather(riverLoc.latitude, riverLoc.longitude).then(
      (weatherResponse) => {
        API.getWaterLevel(riverLoc.site).then((waterLevelResponse) => {
          history.push(`/location/${riverLoc.location}`, {
            ...weatherResponse.data,
            ...waterLevelResponse.data,
          });
        });
      }
    );
  };

  const handleInputChange = (e) => {
    const locInfo = e.target.value.split(" ");
    setRiverLoc({
      latitude: locInfo[0],
      longitude: locInfo[1],
      location: locInfo[2],
      site: locInfo[3],
    });
  };

  return (
    <div id="home" className="container">
      <h1>Home</h1>
      <Form handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
    </div>
  );
};

export default Home;
