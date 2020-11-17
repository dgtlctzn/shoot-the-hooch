import { useState, useContext } from "react";
import Form from "../../components/Form/Form";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import "./Home.css";
import RiverLocContext from "../../utils/RiverLocContext";

const Home = () => {
  const { riverLoc, setRiverLoc, setWeather, setWaterLevel } = useContext(
    RiverLocContext
  );

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    API.getWeather(riverLoc.latitude, riverLoc.longitude).then(
      (weatherResponse) => {
        API.getWaterLevel(riverLoc.site).then((waterLevelResponse) => {
          setWeather(weatherResponse.data);
          setWaterLevel(waterLevelResponse.data);
          history.push(`/location/${riverLoc.location}`);
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
      <div id="title" className="text-center">
        <p className="title">SHOOT</p>
        <p className="title">THE</p>
        <p className="title">HOOCH!</p>
      </div>
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <Form
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
