import { useState } from "react";
import Form from "../../components/Form/Form";
import { useHistory } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [riverSite, setRiverSite] = useState("northatlanta");
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
