import React from "react";

function MainTitle({ opString }) {
  return (
    <>
      <div className=" mt-12 flex items-center justify-between mb-12">
        <h2 className="text-primary text-[2.5rem] leading-[2.75rem] font-medium font-montserrat">
          {opString}
        </h2>
      </div>
    </>
  );
}

export default MainTitle;
