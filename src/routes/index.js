import SignIn from "../components/views/SignIn";
import SignUp from "../components/views/SignUp";
import VerifyEmail from "../components/views/VerifyEmail";

const routes = [
  {
    path: "/signup",
    component: SignUp,
  },
  {
    path: "/verify-email",
    component: VerifyEmail,
  },
  {
    path: "/signin",
    component: SignIn,
  },
];

export default routes;
