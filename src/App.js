import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import Locations from "./containers/Locations/Locations";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/location/:siteNo" component={Locations} />
      </Switch>
    </Router>
  );
}

export default App;
