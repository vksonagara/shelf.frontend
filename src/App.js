import _ from "lodash";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import routes from "./routes";
import { useDispatch } from "react-redux";
import { signIn } from "./redux/auth";
import { useEffect, useState } from "react";
import userApi from "./api/users";
import Sidebar from "./components/common/Sidebar";
import Loader from "./components/common/Loader";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userApi.getAccessToken().then(({ error, data }) => {
      if (error) {
        console.log(error);
      } else {
        dispatch(signIn(data));
      }
      setLoading(false);
    });
  }, [])

  return (
    <>
      <Router>
        <Switch>
          {routes.map((route, index) => {
            const { path, component: Component, isProtected, onlyGuest, hasSidebar } = route;
            const isAuthenticated = !_.isEmpty(auth);

            if (loading) {
              return <Route path={path} render={() => { return <Loader /> }} />;
            }

            if (isProtected && !isAuthenticated) {
              return <Route path={path} render={() => { return <Redirect to="/signin" />; }} />
            }

            if (onlyGuest && isAuthenticated) {
              return <Route path={path} render={() => { return <Redirect to="/notes" />; }} />
            }

            return (
              <Route path={path} render={() => {
                return (
                  <>
                    {hasSidebar && <Sidebar />}
                    <div style= {{
                      position: "relative",
                      left: "75px",
                    }}><Component /></div>
                  </>
                )
              }} key={index} />
            );
          })}
        </Switch>
      </Router>
    </>
  );
}

export default App;
