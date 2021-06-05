import NotesDashboard from "../components/views/notes/NotesDashboard";
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
];

export default routes;
