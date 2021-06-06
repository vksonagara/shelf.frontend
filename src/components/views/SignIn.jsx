// imported dependencies
import _ from "lodash";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Formik, Field } from "formik";
import { useState } from "react";
import { DangerMessage } from "../common/Message";
import { signInSchema } from "../../utils/ValidationUtil";
import AppLogo from "../common/AppLogo";
import userApi from "../../api/users";
import { signIn } from "../../redux/auth";

// Error Message
function ValidationError({ err }) {
  return (
    <div className="w-full">
      <p className="m-0 p-0 text-red-500 text-xs">{err}</p>
    </div>
  );
}

// SignIn Component
function SignIn() {
  // State for Error Mesage
  const [isMeesageVisible, setMessageVisible] = useState({});
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      {/* App Logo  */}
      <AppLogo customStyle="m-8" width="80" height="80" />

      {/* SignIn Component  */}
      <section className="flex flex-col w-96 items-center py-4 px-8 mt-4 bg-white shadow-lg rounded-lg">
        {/* Error Message Component  */}
        {isMeesageVisible.isError && (
          <DangerMessage message={isMeesageVisible.message} />
        )}
        {/* Using Formik For Validation  */}
        <Formik
          validationSchema={signInSchema}
          initialValues={{
            emailId: "",
            password: "",
            rememberMe: false,
          }}
          // Hitting SignIn API after form submit
          onSubmit={async (values, { setSubmitting }) => {
            const { data, error } = await userApi.signin(values);

            setSubmitting(false);

            if (error) {
              setMessageVisible({
                isError: true,
                message: error,
              });
            } else {
              dispatch(signIn(data));
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => {
            return (
              <>
                <h5 className="text-gray-400  text-lg font-bold my-5">
                  Sign In to Shelf
                </h5>
                {/* Email Field  */}
                <Field
                  type="email"
                  placeholder="Enter email"
                  className={`w-full mt-6 p-3 border border-gray-300 rounded-md${
                    touched.emailId && errors.emailId ? " border-red-600" : ""
                  }`}
                  name="emailId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.emailId}
                />
                {/* Error Message Component  */}
                {touched.emailId && errors.emailId && (
                  <ValidationError err={errors.emailId} />
                )}
                {/* Password Field  */}
                <Field
                  type="password"
                  placeholder="Enter password"
                  className={`w-full mt-8  p-3 border border-gray-300 rounded-md ${
                    touched.password && errors.password ? " border-red-600" : ""
                  }`}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {/* Error Message Component  */}
                {touched.password && errors.password && (
                  <ValidationError err={errors.password} />
                )}
                <div className="w-full mt-4 text-sm">
                  <div className="flex items-center">
                    <Field
                      type="checkbox"
                      name="rememberMe"
                      checked={values.rememberMe}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mr-2"
                    />
                    Remember me
                  </div>
                </div>
                {/* Submit Button  */}
                <button
                  disabled={isSubmitting}
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-5 w-full"
                >
                  Sign In
                </button>
                <p className="my-4">Or</p>
                <button
                  className="flex flex-row items-center justify-center bg-gray-200 w-full py-3 px-4 rounded-md mb-2"
                  disabled={isSubmitting}
                >
                  <img
                    src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.232/static/media/google-logo.c21ca9d1.svg"
                    alt=""
                    width="20"
                    height="20"
                  />

                  <span className="text-blue-250 text-sm font-semibold ml-2">
                    Continue with Google
                  </span>
                </button>
              </>
            );
          }}
        </Formik>
        <Link to="/signup" className="text-sm my-2 text-blue-500">
          Sign Up for new account
        </Link>
      </section>
      <section className="relative">
        <div className="fixed bottom-0 right-0">
          <img src="/images/undraw-bg1.svg" alt="" width="400" height="400" />
        </div>
        <div className="fixed bottom-0 left-0">
          <img src="/images/undraw-bg2.svg" alt="" width="400" height="400" />
        </div>
      </section>
    </div>
  );
}

export default SignIn;
