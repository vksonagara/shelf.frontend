// imported dependencies
import _ from "lodash";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Field, Formik } from "formik";
import { signInSchema } from "../../utils/ValidationUtil";
import AppLogo from "../common/AppLogo";
import userApi from "../../api/users";
import { signIn } from "../../redux/auth";
import { notify } from "../common/Toast";
import Input from "../common/Form/Input";
import Button from "../common/Form/Button";
import VectorBg from "../common/VectorBg";

// SignIn Component
function SignIn() {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      {/* App Logo  */}

      <AppLogo customStyle="m-8" width="80" height="80" />

      {/* SignIn Component  */}

      <section className="flex flex-col w-96 items-center py-4 px-8 mt-4 bg-white shadow-lg rounded-lg">
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
              // Showing Toast on error
              notify(error, "danger");
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

                <Input
                  type="email"
                  placeholder="Enter email"
                  name="emailId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.emailId}
                  errorMessage={touched.emailId && errors.emailId}
                />

                {/* Password Field  */}

                <Input
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  errorMessage={touched.password && errors.password}
                />

                {/* Remember me checkbox  */}

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

                <Button
                  disabled={isSubmitting}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Sign In
                </Button>

                {/* <p className="my-4">Or</p>

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
                </button> */}
              </>
            );
          }}
        </Formik>

        {/* Footer Of SignIn  */}
        <div className="flex flex-col w-full mt-2">
          <Link to="/signup" className="text-sm my-2 text-blue-500 ">
            Sign Up for new Account?
          </Link>
          <Link to="/forgot-password" className="text-sm text-blue-500">
            Forgot Password
          </Link>
        </div>
      </section>

      {/* background for SignIn  */}
      <VectorBg />
    </div>
  );
}

export default SignIn;
