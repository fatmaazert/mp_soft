import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { FaWallet } from "react-icons/fa";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoCreate } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

function Navbar() {
  const [nav, setNav] = useState(false);

  const menuItems = [
    {
      icon: <IoCreate size={25} className="mr-2" />,
      text: "Rule creator",
    },
    { icon: <IoCreate size={25} className="mr-2" />, text: "exemple2" },
    { icon: <FaWallet size={25} className="mr-2" />, text: "exemple1" },
    { icon: <CiLogout size={25} className="mr-2" />, text: "Logout" },
  ];
  return (
    <>
      <div className="max-w-[1640px] mx-auto flex justify-between bg-primary items-center p-4 shadow-sm">
        {/* Left side */}
        <div className="flex items-center">
          <div onClick={() => setNav(!nav)} className="cursor-pointer">
            <AiOutlineMenu size={30} />
          </div>
          <img src={logo} alt="logo" className="h-6 w-6 ml-10" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2 text-white ">
            MP <span className="font-bold text-danger">Soft</span>
          </h1>
        </div>

        {/* Mobile Menu */}
        {/* Overlay */}
        {nav ? (
          <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
        ) : (
          ""
        )}

        {/* Side drawer menu */}
        <div
          className={
            nav
              ? "fixed top-0 left-0 w-[300px] h-screen bg-primary z-10 duration-300"
              : "fixed top-0 left-[-100%] w-[300px] h-screen bg-primary z-10 duration-300"
          }
        >
          <AiOutlineClose
            onClick={() => setNav(!nav)}
            size={30}
            className="absolute right-4 top-4 cursor-pointer"
          />
          <h2 className="text-2xl p-4 text-white">
            MP <span className="font-bold text-danger">Soft</span>
          </h2>
          <nav>
            <ul className="flex flex-col p-4 text-gray-800">
              {menuItems.map(({ icon, text }, index) => {
                return (
                  <div key={index} className=" py-4">
                    <li className="text-xl flex cursor-pointer  w-[100%] rounded-full mx-auto p-2 hover:text-white hover:bg-black">
                      {icon} {text}
                    </li>
                  </div>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
