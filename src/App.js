import _ from "lodash";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import routes from "./routes";
import { useDispatch } from "react-redux";
import { signIn } from "./redux/auth";
import { useEffect } from "react";
import userApi from "./api/users";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const isAuthenticated = !_.isEmpty(auth);

  useEffect(() => {
    userApi.getAccessToken().then(({ error, data }) => {
      if (error) {
        console.log(error);
      } else {
        dispatch(signIn(data));
      }
    });
  }, [])

  return (
    <>
      <Router>
        <Switch>
          {routes.map((route, index) => {
            const { path, component, isProtected, onlyGuest } = route;

            if (isProtected && !isAuthenticated) {
              return <Redirect to="/signin" />
            }

            if (onlyGuest && isAuthenticated) {
              return <Redirect to="/" />
            }

            return (
              <Route path={path} component={component} key={index} />
            );
          })}
        </Switch>
      </Router>
    </>
  );
}

export default App;
