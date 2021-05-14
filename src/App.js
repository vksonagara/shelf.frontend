import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import routes from "./routes";

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => {
          return <Route path={route.path} component={route.component} key={index} />;
        })}
      </Switch>
    </Router>
  );
}

export default App;
