import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { CiLogout, CiUser } from "react-icons/ci";
import { useAuth } from "../../hooks/useAuth";
import { get } from "../../utils/apiMethods";
import { rules, rulesPath } from "../../constants.js";
import { VscBellDot, VscBell } from "react-icons/vsc";
import useLocalStorage from "../../hooks/useLocalStorage.jsx";
import { AiFillSafetyCertificate } from "react-icons/ai";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const { logout, user, token } = useAuth();
  const [notifications, setNotifications] = useLocalStorage(
    "notifications",
    null
  );
  const [selectedNotification, setSelectedNotification] = useLocalStorage(
    "selectedNotification",
    null
  );
  const [regleList, setRegleList] = useState([]);

  console.log({ regleList });

  function handleToggleDropDown() {
    setShowDropDown(!showDropDown);
  }

  useEffect(() => {
    const fetchRules = async () => {
      if (user) {
        const roleId = rules.find((rule) => rule.role == user.roles[0])?.id;

        const getRules = await get(`/libelles/role/${roleId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!getRules) return;
        const formattedRules = getRules.map((r) => {
          return { text: r, ...rulesPath.find((rule) => rule.rule == r) };
        });
        setRegleList(formattedRules);
      }
    };

    fetchRules();
  }, [user]);

  console.log({ user });

  const handleSelectNotif = (notif) => {
    setSelectedNotification(notif);

    // navigate to the notificaitons page after 1 second
    setTimeout(() => {
      // change url to /profile/notifications
      window.location.href = "/profile/notifications";
    }, 1000);
    setShowDropDown(false);
  };

  const role = user.roles?.[0];

  useEffect(() => {
    // fetch notifications from the server
    const fetchNotifications = async () => {
      if (user) {
        const link =
          role === "ROLE_GESTIONNAIRE"
            ? "/Regle/notifGest/" + user.id
            : role === "ROLE_RESPONSABLE"
            ? "/Regle/notifResp/" + user.id
            : null;
        const getNotifications = await get(link, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!getNotifications) return;
        //setNotifications(getNotifications);
        // AFTER WE GET THE NOTIFICATIONS BACK WE NEED TO FETCH EVERY USER BASED ON THE ROLE OF THE CONNECTED USER
        // TO GET THE USERNAME OF EVERY NOTIFICATION
        const users = getNotifications.map(async (notif) => {
          const userId =
            role === "ROLE_GESTIONNAIRE" ? notif?.id_resp : notif.id_user;
          const user = await get(`/user/retrieve-user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!user) return;
          notif.username = user?.username;
          return notif;
        });
        const formattedNotifications = await Promise.all(users);
        setNotifications(formattedNotifications);
        console.log({ getNotifications });
      }
    };

    // run this every 2 seconds
    setInterval(() => {
      fetchNotifications();
    }, 5000);
  }, []);

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

          <div className="text-white cursor-pointer">
            {notifications?.length ? (
              <div className="flex gap-1 items-center relative">
                <VscBellDot onClick={handleToggleDropDown} size={"23px"} />
                <span className="absolute -left-2 top-2 text-red-500 font-black">
                  {notifications?.length}
                </span>
                {showDropDown && (
                  <div className="absolute top-8 right-3 w-[400px] max-h-96 z-10 bg-gray-100 p-2 rounded-md overflow-y-auto">
                    <span className="absolute -top-1 right-3 w-4 h-4 rotate-45 bg-gray-100 -z-10"></span>
                    {/* show notifications */}
                    {notifications?.map((notif, index) => {
                      return (
                        <div
                          onClick={() => handleSelectNotif(notif)}
                          className="border-b p-2 rounded-md text-gray-900 hover:bg-gray-200"
                        >
                          <div className="flex items-center gap-2">
                            <CiUser size={"20px"} />
                            <span className="text-lg">{notif.username}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <VscBell size={"20px"} />
                            <span className="text-lg">
                              {role === "ROLE_GESTIONNAIRE"
                                ? notif?.actionType + " " + notif?.status
                                : "Demande " + notif?.actionType}
                            </span>
                          </div>
                          {role === "ROLE_GESTIONNAIRE" ? (
                            <div className="flex items-center gap-2">
                              <AiFillSafetyCertificate size={"20px"} />
                              <span className="text-lg">{notif.id}</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <AiFillSafetyCertificate size={"20px"} />
                              <span className="text-lg">{notif.id_regle}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <VscBell size={"23px"} />
            )}
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
            <div className="text-xl font-medium mx-4 text-gray-800 flex gap-x-1 items-center">
              {" "}
              <span className="font-semibold">Session</span>
              <span>{user?.username}</span>
            </div>
            <ul className="flex flex-col p-4 text-gray-800">
              <div
                className="text-xl flex cursor-pointer  w-[100%] rounded-full mx-auto p-2 hover:text-white hover:bg-black"
                onClick={() => navigateTo("compte")}
              >
                <CiUser size={25} className="mr-2" /> Modifier mon compte
              </div>
              {regleList?.map(({ icon, text, path }, index) => {
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
