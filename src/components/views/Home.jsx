import Header from "../common/Home/Header";
import { Link } from "react-router-dom";
import Footer from "../common/Home/Footer";

export default function Home() {
  return (
    //   Home page
    <main className="bg-gray-100">
      <Header />

      {/* Getting started  */}

      <div className="flex justify-center mt-16">
        <section className="flex flex-col items-center max-w-xl homepage-heading1">
          <h1 className="font-bold text-5xl text-center text-black-light leading-tight">
            The simplest way to keep all things around.
          </h1>
          <p className="text-center text-black-light font-medium text-lg my-5">
            All your notes, synced on all your browser by Shelf.
          </p>
          <Link
            to="/signup"
            className="p-2 px-4 text-sm  rounded bg-blue-600 text-white hover:bg-blue-500"
          >
            Sign up now
          </Link>
        </section>
      </div>

      {/* Screenshot  */}
      <div className="transform rotate-3 m-auto w-3/5 mt-20">
        <img src="images/shelf-screenshot.png" alt="" />
      </div>

      {/* What people are saying  */}
      <div className="my-24 w-screen">
        <h1 className="font-bold text-5xl text-center text-black-light leading-tight">
          What people are saying
        </h1>
        <div className="flex justify-evenly mt-8">
          <section className="shadow-lg bg-white w-1/5 p-4 rounded-lg flex items-start">
            <img src="/images/person.svg" alt="" width="80" height="80" />
            <section className="ml-2">
              <p className="text-gray-800 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                expedita aperiam hic nulla voluptatem sapiente quia quaerat
                eligendi, consequatur maiores rerum voluptates provident ea,
                unde ut, vitae dolorem architecto modi?
              </p>
              <h2 className="font-semibold text-gray-500 mt-2">-Bhavesh</h2>
            </section>
          </section>
          <section className="shadow-lg bg-white w-1/5 p-4 rounded-lg flex items-start">
            <img src="/images/person.svg" alt="" width="80" height="80" />
            <section className="ml-2">
              <p className="text-gray-800 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                expedita aperiam hic nulla voluptatem sapiente quia quaerat
                eligendi, consequatur maiores rerum voluptates provident ea,
                unde ut, vitae dolorem architecto modi?
              </p>
              <h2 className="font-semibold text-gray-500 mt-2">-Bhavesh</h2>
            </section>
          </section>
          <section className="shadow-lg bg-white w-1/5 p-4 rounded-lg flex items-start">
            <img src="/images/person.svg" alt="" width="80" height="80" />
            <section className="ml-2">
              <p className="text-gray-800 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                expedita aperiam hic nulla voluptatem sapiente quia quaerat
                eligendi, consequatur maiores rerum voluptates provident ea,
                unde ut, vitae dolorem architecto modi?
              </p>
              <h2 className="font-semibold text-gray-500 mt-2">-Bhavesh</h2>
            </section>
          </section>
        </div>
      </div>

      {/* Free Section  */}

      <div className="mt-20 flex justify-center">
        <section className="max-w-2xl">
          <h1 className="font-bold text-4xl text-center text-black-light leading-tight">
            Shelf is free. And ad-free too.
          </h1>
          <p className="text-center mt-4 text-gray-600">
            We don't sell your info. We don't do ads. Our business model ensures
            our ability to act in your best interest while storing and securing
            your data.
          </p>
        </section>
      </div>
      <Footer />
    </main>
  );
}
