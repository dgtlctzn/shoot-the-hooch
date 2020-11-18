import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import Locations from "./containers/Locations/Locations";
import RiverLocContext from "./utils/RiverLocContext";
import {useState} from 'react';

function App() {
  // const [weather, setWeather] = useState({});
  // const [waterLevel, setWaterLevel] = useState({});
  // const [riverLoc, setRiverLoc] = useState({
  //   latitude: 33.87,
  //   longitude: -84.34,
  //   location: "northatlanta",
  //   site: "02335815",
  // });

  return (
    <Router>
      <Switch>
        {/* <RiverLocContext.Provider
          value={{
            weather,
            waterLevel,
            riverLoc,
            setRiverLoc,
            setWeather,
            setWaterLevel,
          }}
        > */}
          <Route exact path="/" component={Home} />
          <Route exact path="/location/:siteNo" component={Locations} />
        {/* </RiverLocContext.Provider> */}
      </Switch>
    </Router>
  );
}

export default App;
