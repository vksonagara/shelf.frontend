import ForgotPassword from "../components/views/ForgotPassword";
import NotesDashboard from "../components/views/notes/NotesDashboard";
import ResetPassword from "../components/views/ResetPassword";
import SignIn from "../components/views/SignIn";
import SignUp from "../components/views/SignUp";
import VerifyEmail from "../components/views/VerifyEmail";

const routes = [
  {
    path: "/signup",
    component: SignUp,
    onlyGuest: true,
  },
  {
    path: "/verify-email",
    component: VerifyEmail,
    onlyGuest: true,
  },
  {
    path: "/signin",
    component: SignIn,
    onlyGuest: true,
  },
  {
    path: "/notes",
    component: NotesDashboard,
    isProtected: true,
    hasSidebar: true,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    onlyGuest: true,
  },
  {
    path: "/reset-password",
    component: ResetPassword,
    onlyGuest: true,
  },
];

export default routes;
