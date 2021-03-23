import { useState } from "react";
import Form from "../../components/Form/Form";
import { useHistory } from "react-router-dom";
import "./Home.css";
import Nav from "../../components/Nav/Nav";

const Home = () => {
  const [riverSite, setRiverSite] = useState("Buford Dam");
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    history.push(`/${riverSite}`);
  };

  const handleInputChange = (e) => {
    // console.log(e.target)
    setRiverSite(e.target.value);
  };

  return (
    <>
      <Nav />
      <div id="home" className="container">
        <div id="title" className="row">
          <div className="col-sm-12 text-center">
            <p className="title">SHOOT</p>
            <p className="title">THE</p>
            <p className="title">HOOCH!</p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8 text-center">
            <p id="intro-text">A site for ATLiens to monitor water levels and weather for the Chattahoochee River</p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2 col-md-4"></div>
          <div className="col-sm-8 col-md-4">
            <Form
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
