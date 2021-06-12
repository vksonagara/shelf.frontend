import AppLogo from "../common/AppLogo";
import { Link, useLocation } from "react-router-dom";
import userApi from "../../api/users";
import { useState, useEffect } from "react";
import _ from "lodash";

// Verify Email Component
function VerifyEmail() {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const [response, setResponse] = useState({});

  // Hitting verifyEmail API
  useEffect(() => {
    if (_.isEmpty(response)) {
      userApi.verifyEmail(token).then((res) => {
        setResponse(res);
      });
    }
  }, [response]);

  return (
    <div className="flex flex-col items-center">
      <AppLogo margin="my-8" width="90" height="90" />
      {!response.error && (
        <img src="/images/undraw-verify.svg" alt="" className="mt-4" />
      )}
      <h2 className="font-bold mt-16 text-2xl text-gray-400">
        {response.message}
      </h2>
      {!response.error && (
        <div className="mt-2 flex flex-col items-center">
          <p className="m-0 text-gray-700">Your email has been verified.</p>
          <p className="text-gray-700">
            To use Shelf, please{" "}
            <Link to="signin" className="text-sm my-2 text-blue-500">
              Sign In
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
