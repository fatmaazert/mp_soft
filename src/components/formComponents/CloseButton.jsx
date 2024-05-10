import React from "react";
import { IoClose } from "react-icons/io5";

function CloseButton({ onClick }) {
  return (
    <>
      <button
        className="absolute top-6 right-6 m-3 text-black hover:text-gray-800"
        onClick={onClick}
      >
        <IoClose size="1.5rem" />
      </button>
    </>
  );
}

export default CloseButton;
