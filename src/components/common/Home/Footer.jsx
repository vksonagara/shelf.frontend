import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="flex max-w-5xl justify-between mt-10 mx-auto border-t border-gray-500 py-4">
      <section>
        {" "}
        <p className="text-gray-800 font-semibold">
          <span>&#169;</span> Shelf 2021
        </p>
        <p className="text-gray-700 text-sm">
          Created By{" "}
          <Link to="" className="font-semibold">
            @Vinod
          </Link>{" "}
          and{" "}
          <Link to="" className="font-semibold">
            @Bhavesh
          </Link>
        </p>
      </section>
      <section>
        {/* <Link
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
        </Link> */}
        <Link
          to="/about-us"
          className=" px-3 text-gray-900 text-sm hover:text-gray-600"
        >
          About us
        </Link>
      </section>
    </div>
  );
}
