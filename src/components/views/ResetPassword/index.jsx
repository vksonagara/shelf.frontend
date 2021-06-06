import { Formik } from "formik";
import { useLocation } from "react-router-dom";
import AppLogo from "../../common/AppLogo";
import Input from "../../common/Form/Input";
import Button from "../../common/Form/Button";
import { resetPasswordSchema } from "../../../utils/ValidationUtil";
import userApi from "../../../api/users";
import { notify } from "../../common/Toast";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token") || "default";

  async function handleResetSubmit(
    { emailId, password },
    { setSubmitting, resetForm }
  ) {
    const { error } = await userApi.resetPassword({
      emailId,
      password,
      token,
    });

    if (error) {
      notify(error, "danger", toast.POSITION.BOTTOM_CENTER);
    } else {
      notify(
        "Password reset successfull!",
        "success",
        toast.POSITION.BOTTOM_CENTER
      );
      resetForm({});
    }

    setSubmitting(false);
  }

  return (
    <>
      <div className="flex flex-col items-center h-screen bg-gray-100">
        {/* App Logo  */}
        <AppLogo margin="m-8" width="80" height="80" />

        {/* Reset password Component  */}
        <section className="flex flex-col w-96 items-center py-4 px-8 mt-4 bg-white shadow-lg rounded-lg">
          <Formik
            initialValues={{ emailId: "", password: "", confirmPassword: "" }}
            validationSchema={resetPasswordSchema}
            onSubmit={handleResetSubmit}
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
                    Reset password
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
                  <Input
                    placeholder="New password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    errorMessage={touched.password && errors.password}
                  />
                  <Input
                    placeholder="Confirm password"
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    errorMessage={
                      touched.confirmPassword && errors.confirmPassword
                    }
                  />
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    Reset password
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
