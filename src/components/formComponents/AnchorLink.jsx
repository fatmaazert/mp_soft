import React from "react";

function AnchorLink({ opString, onClick, className, children }) {
  return (
    <a
      href={opString}
      className={`text-primary ${className}`}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

export default AnchorLink;
