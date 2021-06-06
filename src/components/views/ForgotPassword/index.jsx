import { Formik } from "formik";
import AppLogo from "../../common/AppLogo";
import Input from "../../common/Form/Input";
import Button from "../../common/Form/Button";
import { forgotPasswordSchema } from "../../../utils/ValidationUtil";
import userApi from "../../../api/users";
import { notify } from "../../common/Toast";
import { toast } from "react-toastify";

async function handleForgotSubmit({ emailId }, { setSubmitting, resetForm }) {
  const { error } = await userApi.sendForgotPasswordLink({ emailId });

  if (error) {
    notify("Something went wrong!", "error");
  } else {
    resetForm({});
    notify("Reset link sent!", "success", toast.POSITION.BOTTOM_CENTER);
  }

  setSubmitting(false);
}

function ForgotPassword() {
  return (
    <>
      <div className="flex flex-col items-center h-screen bg-gray-100">
        {/* App Logo  */}
        <AppLogo margin="m-8" width="80" height="80" />

        {/* Forgot password Component  */}
        <section className="flex flex-col w-96 items-center py-4 px-8 mt-4 bg-white shadow-lg rounded-lg">
          <Formik
            initialValues={{ emailId: "" }}
            validationSchema={forgotPasswordSchema}
            onSubmit={handleForgotSubmit}
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
                  <h5 className="text-gray-400 text-lg font-bold my-5">
                    Forgot password
                  </h5>
                  <Input
                    placeholder="Enter email"
                    type="email"
                    name="emailId"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.emailId}
                    errorMessage={touched.emailId && errors.emailId}
                  />
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    Send reset link
                  </Button>
                </>
              );
            }}
          </Formik>
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
    </>
  );
}

export default ForgotPassword;
