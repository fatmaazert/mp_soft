import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "../../hooks/useAuth";
import { get } from "../../utils/apiMethods";
import { rules, rulesPath } from "../../constants";
import { VscBellDot } from "react-icons/vsc";
import { VscBell } from "react-icons/vsc";

function Navbar() {
  const [items, setItems] = useState([]);
  const [nav, setNav] = useState(false);
  const { logout, user, token } = useAuth();

  useEffect(() => {
    const fetchRules = async () => {
      if (user) {
        const roleId = rules.find((rule) => rule.role == user.roles[0])?.id;

        console.log({ token });
        const getRules = await get(`/libelles/role/${roleId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!getRules) return;
        const formattedRules = getRules.map((r) => {
          console.log(rulesPath.find((rule) => rule.rule == r));
          return { text: r, ...rulesPath.find((rule) => rule.rule == r) };
        });
        setItems(formattedRules);
      }
    };

    fetchRules();
  }, []);

  /*  const getNotifications = async () => {
    await get(`push-notifications/10`);
  };

  getNotifications();
*/
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
    setNav(!nav);
  };

  return (
    <>
      <div className="max-w-[1640px] bg-primary p-4 shadow-sm">
        {/* Left side */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <div onClick={() => setNav(!nav)} className="cursor-pointer">
              <AiOutlineMenu size={30} />
            </div>
            <img src={logo} alt="logo" className="h-6 w-6 ml-10" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2 text-white ">
              MP <span className="font-bold text-danger">Soft</span>
            </h1>
          </div>

          <div>
            <VscBellDot size={"23px"} className="text-white cursor-pointer" />
          </div>
        </div>

        {/* Mobile Menu */}
        {/* Overlay */}
        {nav ? (
          <div
            className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"
            onClick={() => setNav(!nav)}
          ></div>
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
              {items.map(({ icon, text, path }, index) => {
                return (
                  <div key={index} className=" py-4">
                    <li
                      className="text-xl flex cursor-pointer  w-[100%] rounded-full mx-auto p-2 hover:text-white hover:bg-black"
                      onClick={() => navigateTo(path)}
                    >
                      {icon} {text}
                    </li>
                  </div>
                );
              })}
              <div
                className="text-xl flex cursor-pointer  w-[100%] rounded-full mx-auto p-2 hover:text-white hover:bg-black"
                onClick={logout}
              >
                <CiLogout size={25} className="mr-2" /> Logout
              </div>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
