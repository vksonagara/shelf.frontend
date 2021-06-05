import { Link } from "react-router-dom";
import { useState } from "react";
import { SuccessMessage, DangerMessage } from "../common/Message";
import { Formik, Field } from "formik";
import { signUpSchema } from "../../utils/ValidationUtil";
import AppLogo from "../common/AppLogo";
import userApi from "../../api/users";

// Error Message
function ValidationError({ err }) {
  return (
    <div className="w-full">
      <p className="m-0 p-0 text-red-500 text-xs">{err}</p>
    </div>
  );
}

// SignUp component
function SignUp() {
  // State for Error Mesage
  const [isMeesageVisible, setMessageVisible] = useState({});
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {/* App Logo  */}
      <AppLogo margin="m-8" width="80" height="80" />

      {/* Signup Component  */}
      <section className="flex flex-col w-96 items-center py-4 px-8 mt-4 bg-white shadow-lg rounded-lg">
        {/* Showing DangerMessage Dialogue  */}
        {isMeesageVisible.isError && (
          <DangerMessage message={isMeesageVisible.message} />
        )}
        {isMeesageVisible.message && !isMeesageVisible.isError && (
          <SuccessMessage message={isMeesageVisible.message} />
        )}
        {/* Using Formik For Validation  */}
        <Formik
          validationSchema={signUpSchema}
          initialValues={{
            firstName: "",
            lastName: "",
            emailId: "",
            password: "",
          }}
          // hitting signup API after form submit
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const { error } = await userApi.signup(values);

            setSubmitting(false);

            if (error) {
              setMessageVisible({
                isError: true,
                message: error,
              });
            } else {
              setMessageVisible({
                isError: false,
                message: `A verification link has been sent to ${values.emailId}`,
              });
              resetForm({});
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
                  Sign up for your account
                </h5>
                <Field
                  type="text"
                  placeholder="First name"
                  className={`w-full mt-6 p-3 border border-gray-300 rounded-md ${
                    touched.firstName && errors.firstName
                      ? "border-red-600"
                      : ""
                  }`}
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
                {/* Showing Error Message  */}
                {touched.firstName && errors.firstName && (
                  <ValidationError err={errors.firstName} />
                )}
                <Field
                  type="text"
                  placeholder="Last name"
                  className={`w-full mt-6 p-3 border border-gray-300 rounded-md ${
                    touched.lastName && errors.lastName ? "border-red-600" : ""
                  }`}
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
                {/* Showing Error Message  */}
                {touched.lastName && errors.lastName && (
                  <ValidationError err={errors.lastName} />
                )}
                <Field
                  type="email"
                  placeholder="Enter email"
                  className={`w-full mt-6 p-3 border border-gray-300 rounded-md ${
                    touched.emailId && errors.emailId ? "border-red-600" : ""
                  }`}
                  name="emailId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.emailId}
                />
                {/* Showing Error Message  */}
                {touched.emailId && errors.emailId && (
                  <ValidationError err={errors.emailId} />
                )}
                <Field
                  type="password"
                  placeholder="Enter password"
                  className={`w-full mt-6 p-3 border border-gray-300 rounded-md ${
                    touched.password && errors.password ? "border-red-600" : ""
                  }`}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {/* Showing Error Message  */}
                {touched.password && errors.password && (
                  <ValidationError err={errors.password} />
                )}
                <p
                  // className="mt-3"
                  // style={{
                  //   color: "#5E6C84",
                  //   fontSize: "12px",
                  //   lineHeight: "1rem",
                  //   marginTop: "0.5rem",
                  // }}
                  className="text-gray-400 text-xs mt-3 leading-4"
                >
                  By signing up, I accept the
                  <Link to="/terms" className="text-xs  text-blue-400">
                    {" "}
                    Terms of Service
                  </Link>{" "}
                  and acknowledge the
                  <Link to="/privacy" className="text-xs  text-blue-400">
                    {" "}
                    Privacy Policy
                  </Link>{" "}
                  .
                </p>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-5 w-full"
                >
                  Sign Up
                </button>
                <p className="my-4">Or</p>
                <button
                  disabled={isSubmitting}
                  className="flex flex-row items-center justify-center bg-gray-200 w-full py-3 px-4 rounded-md mb-2"
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
        <Link to="/signin" className="text-sm my-2 text-blue-500">
          Already have an account? Sign In
        </Link>
      </section>
      <section className="relative bg-gray-100 h-full">
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

export default SignUp;
