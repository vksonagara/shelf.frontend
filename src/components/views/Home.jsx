import _ from "lodash";
import Header from "../common/Home/Header";
import { Link } from "react-router-dom";
import Footer from "../common/Home/Footer";
import { useSelector } from "react-redux";

export default function Home() {
  const auth = useSelector((state) => state.auth);
  const isAuth = !_.isEmpty(auth);

  return (
    //   Home page
    <main className="bg-gray-100">
      <Header isAuth={isAuth} />

      {/* Getting started  */}

      <div className="flex justify-center mt-16">
        <section className="flex flex-col items-center max-w-xl homepage-heading1">
          <h1 className="font-bold text-5xl text-center text-black-light leading-tight">
            The simplest way to keep all things around.
          </h1>
          <p className="text-center text-black-light font-medium text-lg my-5">
            All your notes, synced on all your browser by Shelf.
          </p>
          {!isAuth ? (
            <Link
              to="/signup"
              className="p-2 px-4 text-sm  rounded bg-blue-600 text-white hover:bg-blue-500"
            >
              Sign up now
            </Link>
          ) : (
            <Link
              to="/notes"
              className="p-2 px-4 text-sm  rounded bg-blue-600 text-white hover:bg-blue-500"
            >
              Go to Shelf
            </Link>
          )}
        </section>
      </div>

      {/* Screenshot  */}
      <div className="transform rotate-3 m-auto w-3/5 mt-20">
        <img src="images/shelf-screenshot.png" alt="" />
      </div>

      {/* What people are saying  */}
      {/* <div className="my-24 w-screen">
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
      </div> */}

      {/* Our Feature  */}

      <div
        className="mt-20 flex flex-col items-center   py-6"
        style={{
          backgroundColor: "#00315d",
        }}
      >
        <h1 className="font-bold text-4xl text-center text-white leading-tight">
          Our Features
        </h1>
        <div className="px-8 mt-8 flex justify-evenly w-full">
          <section className="w-1/5 flex flex-col items-center shadow-lg bg-white rounded-lg p-4 text-center">
            <i className="bi bi-journal text-2xl"></i>
            <h1 className="text-gray-700 font-semibold text-xl p-1">Notes</h1>
            <p className="text-gray-700 p-2">
              This Notes app by Shelf is simple and easy to use. You can create
              notes, archive notes and restore them. Inside Notes app you can
              use many editor's functionallty. Use wherever you want to,
              anywhere any time.
            </p>
          </section>
        </div>
      </div>

      {/* Upcoming Features  */}

      <div
        className="flex flex-col items-center py-6"
        style={{
          backgroundColor: "#00315d",
        }}
      >
        <h1 className="font-bold text-4xl text-center text-white leading-tight">
          Upcoming Features
        </h1>
        <div className="px-8 mt-8 flex justify-center w-full">
          <section className="w-1/5 flex flex-col items-center shadow-lg bg-white rounded-lg p-4 text-center mx-6">
            <i className="bi bi-list-task text-3xl"></i>
            <h1 className="text-gray-700 font-semibold text-2xl p-1">Todo</h1>
            <p className="text-gray-700 p-2">
              Now, on Shelf App you can create Todo task list. Easy to manage
              all your task inside Todo app. you can add task, remove task and
              reset task.
            </p>
          </section>
          <section className="w-1/5 flex flex-col items-center shadow-lg bg-white rounded-lg p-4 text-center mx-6">
            <i className="bi bi-calendar2-week text-2xl"></i>
            <h1 className="text-gray-700 font-semibold text-xl p-1">
              Calender
            </h1>
            <p className="text-gray-700 p-2">
              Now, on Shelf App you can use Calender for remainder. You can set
              a remainder for any events like Birthday, anniversary and more.
            </p>
          </section>
        </div>
      </div>

      {/* Free Section  */}

      <div className="mt-20 flex justify-around items-center">
        <div className="w-3/5 transform">
          <img src="images/shelf-screenshot.png" alt="" loading="lazy" />
        </div>
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
