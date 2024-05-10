import React from "react";

function Title({ children, className }) {
  return (
    <>
      <div className="flex justify-center items-center mb-8">
        <h2 className={`text-primary font-Montserrat ${className}`}>
          {children}{" "}
        </h2>
      </div>{" "}
    </>
  );
}

export default Title;
