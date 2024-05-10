import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage({ status, message, details }) {
  const navigate = useNavigate();

  function nav() {
    navigate("/");
  }
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="text-base font-montserrat text-primary sm:text-5xl">
            {status}{" "}
          </h1>
          <h1 className="mt-4 text-3xl font-montserrat font-bold tracking-tight text-gray-900 sm:text-5xl">
            {message}
          </h1>
          <p className="mt-6 text-base font-montserrat leading-7 text-gray-600">
            {details}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              onClick={nav}
              href="/"
              className="rounded-md bg-primary font-montserrat  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Retourner
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

export default ErrorPage;
