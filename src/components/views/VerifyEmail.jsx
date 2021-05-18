import AppLogo from "../common/AppLogo";
import { Link, useLocation } from "react-router-dom";
import userApi from "../../api/users";
import { useState, useEffect } from "react";
import _ from "lodash";

function VerifyEmail() {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const [response, setResponse] = useState({});


  useEffect(() => {
    if (_.isEmpty(response)) {
      userApi.verifyEmail(token).then((res) => {
        console.log(response);
        setResponse(res);
      });
    }
  }, [response]);

  return (
    <div className="d-flex flex-column align-items-center" style={{}}>
      <AppLogo />
      <h2
        style={{
          fontWeight: "bold",
          marginTop: "8rem",
        }}
      >
        {response.message}
      </h2>
      {!response.error && (
        <div>
          <p className="m-0">Your email has been verified.</p>
          <p>
            To use Shelf, please <Link to="signin">Sign In</Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
