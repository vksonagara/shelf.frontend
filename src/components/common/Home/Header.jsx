import AppLogo from "../AppLogo";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex justify-between items-center max-w-5xl mx-auto py-6">
      <section>
        <AppLogo />
      </section>
      <section>
        <Link
          to="/contact-us"
          className=" px-3 text-gray-900 text-sm hover:text-gray-600"
        >
          Contact Us
        </Link>
        <Link
          to="/help"
          className=" px-3 text-gray-900 text-sm hover:text-gray-600"
        >
          Help
        </Link>
        <Link
          to="signin"
          className=" border-l ml-4 px-5 text-gray-900 text-sm hover:text-gray-600 py-2"
        >
          Sign In
        </Link>
        <Link
          to="signup"
          className="p-2 text-sm  rounded  border border-gray-400 hover:border-gray-600"
        >
          Sign Up
        </Link>
      </section>
    </div>
  );
}
