import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DangerMessage } from "../common/Message";
import { Formik } from "formik";
import { signInSchema } from "../../utils/ValidationUtil";
import AppLogo from "../common/AppLogo";
import userApi from "../../api/users";

function ValidationError({ err }) {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <p
        className="m-0 p-0 text-danger"
        style={{
          fontSize: "11px",
        }}
      >
        {err}
      </p>
    </div>
  );
}

function SignIn() {
  const [isMeesageVisible, setMessageVisible] = useState({});
  return (
    <div className="d-flex flex-column align-items-center">
      <AppLogo />

      <section
        className="d-flex flex-column align-items-center"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",
          marginTop: "1rem",
          padding: "1rem 2rem",
          width: "400px",
          boxSizing: "border-box",
        }}
      >
        {isMeesageVisible.isError && (
          <DangerMessage message={isMeesageVisible.message} />
        )}

        <Formik
          validationSchema={signInSchema}
          initialValues={{
            emailId: "",
            password: "",
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const { error } = await userApi.signin(values);

            setSubmitting(false);

            if (error) {
              console.log(error);
              setMessageVisible({
                isError: true,
                message: error,
              });
            } else {
              console.log("success");
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
                <h5
                  style={{
                    color: "rgb(94, 108, 132)",
                    fontSize: "16px",
                    margin: "1.25rem 0",
                    fontWeight: "700",
                  }}
                >
                  Sign in to Shelf
                </h5>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className={`input  ${
                    touched.emailId && errors.emailId ? "pa-error" : ""
                  }`}
                  name="emailId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.emailId}
                />
                {touched.emailId && errors.emailId && (
                  <ValidationError err={errors.emailId} />
                )}
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  className={`input  ${
                    touched.password && errors.password ? "pa-error" : ""
                  }`}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {touched.password && errors.password && (
                  <ValidationError err={errors.password} />
                )}
                <Button
                  variant="primary"
                  block
                  className="m-4  "
                  style={{
                    fontSize: "14px",
                  }}
                  disabled={isSubmitting}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Sign In
                </Button>{" "}
                <p>Or</p>
                <Button
                  block
                  className="d-flex flex-row align-items-center justify-content-center"
                  variant="light"
                  disabled={isSubmitting}
                >
                  <img
                    src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.232/static/media/google-logo.c21ca9d1.svg"
                    alt=""
                    width="20"
                    height="20"
                  />
                  <span
                    style={{
                      color: "#505f79",
                      fontSize: "14px",
                      fontWeight: "600",
                      marginLeft: "0.25rem",
                    }}
                  >
                    Continue with Google
                  </span>
                </Button>
              </>
            );
          }}
        </Formik>
        <Link
          to="/signup"
          style={{
            fontSize: "0.85rem",
            margin: "1rem 0",
          }}
        >
          Sign Up for new account
        </Link>
      </section>
    </div>
  );
}

export default SignIn;
