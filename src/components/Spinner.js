import React from "react";
import loading from "../assets/loading.gif";

function Spinner() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <img src={loading} className="spinner" alt="Loading ..." />
      </div>
    </>
  );
}

export default Spinner;
