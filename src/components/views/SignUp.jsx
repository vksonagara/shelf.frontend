import { Link } from "react-router-dom";
import { Formik } from "formik";
import { signUpSchema } from "../../utils/ValidationUtil";
import AppLogo from "../common/AppLogo";
import userApi from "../../api/users";
import { notify } from "../common/Toast";
import Input from "../common/Form/Input";
import Button from "../common/Form/Button";
import VectorBg from "../common/VectorBg";

// SignUp component
function SignUp() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {/* App Logo  */}

      <AppLogo customStyle="m-8" width="80" height="80" />

      {/* Signup Component  */}
      <section className="flex flex-col w-96 items-center py-4 px-8 mt-4 bg-white shadow-lg rounded-lg">
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

            // Showing Toast
            if (error) {
              notify(error, "danger");
            } else {
              notify(
                `A verification link has been sent to ${values.emailId}`,
                "sucess"
              );
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
                <Input
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  errorMessage={touched.firstName && errors.firstName}
                />

                <Input
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  errorMessage={touched.lastName && errors.lastName}
                />

                <Input
                  type="email"
                  placeholder="Enter email"
                  name="emailId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.emailId}
                  errorMessage={touched.emailId && errors.emailId}
                />

                <Input
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  errorMessage={touched.password && errors.password}
                />

                <p className="text-gray-400 text-xs mt-3 leading-4">
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

                <Button
                  disabled={isSubmitting}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Sign Up
                </Button>

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
      <VectorBg />
    </div>
  );
}

export default SignUp;
