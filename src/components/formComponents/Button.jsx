import React from "react";

function Button({ onClick, children, className, type }) {
  return (
    <button
      type={type}
      className={`py-2 px-4 rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
