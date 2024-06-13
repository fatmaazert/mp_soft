import { useEffect, useState } from "react";
import { FcCancel, FcCheckmark, FcConferenceCall } from "react-icons/fc";
import useLocalStorage from "../hooks/useLocalStorage";
import { FaEye } from "react-icons/fa";
import { get, remove, update } from "../utils/apiMethods";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import Title from "../components/formComponents/Title";
import Modal from "../components/Modals/Modal";
import { IoCloseSharp } from "react-icons/io5";

const Notifications = () => {
  const [notificationsInLocalStorage, _] = useLocalStorage(
    "notifications",
    null
  );
  const [regle, setRegle] = useState(null);
  const [showRegleModal, setShowRegleModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useLocalStorage(
    "selectedNotification",
    null
  );

  /*

        codope: selectedRegle.codope,
        lp: selectedRegle.lp,
        DSC: selectedRegle.dsc,
        ord: selectedRegle.ord,
        RUBINI: selectedRegle.rubini,
        RUBDST: selectedRegle.rubdst,
        SRC: selectedRegle.src,
        OPR: selectedRegle.opr,
        CMSR: selectedRegle.cmsr,


  */

  const [showAllNotifications, setShowAllNotifications] = useState(false);

  const { user } = useAuth();
  const approveRegle = async (selectedRegle) => {
    const res = await update(`/Regle/approuver/${selectedRegle.id}`);
    const res1 = await update(`/historique/${selectedRegle.id}/mark-delivered`);
    if (!res && !res1) {
      toast.error("erreur regle");
      return;
    }
    // toast success
    toast.success("Regle updated successfully!");
    setSelectedNotification(null);
    // refresh the page
    setTimeout(() => {
      window.location.reload();
      setShowAllNotifications(false);
    }, 1000);
  };

  useEffect(() => {
    if (showAllNotifications) {
      setNotifications(notificationsInLocalStorage);
    } else {
      setNotifications([selectedNotification]);
    }
  }, [showAllNotifications]);

  const handleChangeAllNotifs = (value) => {
    if (!selectedNotification) {
      setShowAllNotifications(true);
      return;
    }
    setShowAllNotifications(value);
  };

  const refuserRegle = async (selectedRegle) => {
    const res = await remove(`/Regle/refuser/${selectedRegle.id}`);
    if (!res) {
      toast.error("erreur regle");
      return;
    }
    // refresh the page
    setSelectedNotification(null);
    setTimeout(() => {
      window.location.reload();
      setShowAllNotifications(false);
    }, 1000);
  };

  const retrieveRegle = async (selectedRegle) => {
    console.log({ selectedRegle });
    const link =
      user?.roles[0] === "ROLE_GESTIONNAIRE"
        ? `/Regle/retrieve-regle/${selectedRegle?.id}`
        : `/RegleTemp/retrieve-regleTemp/${selectedRegle?.id}`;
    const res = await get(link);
    if (!res) {
      toast.error("erreur regle");
      return;
    }
    setRegle(res);
    setShowRegleModal(true);
  };

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    console.log("set notifications");
    if (selectedNotification !== null) {
      setNotifications([selectedNotification]);
    } else {
      setNotifications(notificationsInLocalStorage);
    }

    // remove selectedNotification
    return () => setSelectedNotification(null);
  }, [notificationsInLocalStorage]);

  const gestHeaders = ["Id", "Action Type", "Date", "Responsable", "Regle", ""];

  const respHeaders = [
    "Id",
    "Action Type",
    "Date",
    "Gestionnaire",
    "Regle",
    "Status",
  ];

  const sliceStr = (str) => {
    if (typeof str === "string" && str.length > 0) {
      return str.slice(0, 10);
    } else {
      return "";
    }
  };

  const handleRemoveNotif = async (notif) => {
    const res = await update(`/Regle/${notif?.id}/reset-ids`);
    if (!res) {
      toast.error("erreur remove notification");
      return;
    }
    // toast success
    toast.success("Notification removed successfully!");

    // reload
    setSelectedNotification(null);
    //setShowAllNotifications(false);
    // filter out notifications
    setNotifications((prev) => {
      return prev.filter((noti) => noti.id !== notif.id);
    });
  };

  // if the user role is ROLE_GESTIONNAIRE the the headers will take the gestHeaders, if the user role is ROLE_RESPONSABLE the headers will take the respHeaders
  const headers =
    user?.roles[0] === "ROLE_GESTIONNAIRE"
      ? gestHeaders
      : user?.roles[0] === "ROLE_RESPONSABLE"
      ? respHeaders
      : null;

  return (
    <div className="mt-10">
      <h1 className="text-3xl mt-4 flex gap-x-1 justify-center items-center bg-gray-300 max-w-7xl mx-auto">
        <FcConferenceCall size={38} /> Notifications page
      </h1>
      {/* show two buttons (all notifs and selectedNotif) */}
      <div className="flex mt-10 justify-around">
        <div className="bg-white rounded-md p-4 max-w-fit">
          <div className="flex justify-between gap-10 items-center">
            <div
              className="flex gap-x-2 items-center cursor-pointer border"
              onClick={() => handleChangeAllNotifs(true)}
            >
              <FaEye size={20} className="text-primary" />
              <p className="text-primary">Voir toutes les notifications</p>
            </div>
            <div
              className="flex gap-x-2 items-center cursor-pointer border"
              onClick={() => handleChangeAllNotifs(false)}
            >
              <FaEye size={20} className="text-primary" />
              <p className="text-primary">Voir la notification sélectionnée</p>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-y-scroll max-h-[500px] max-w-6xl my-10 mx-auto">
        <table className="table-auto mx-auto w-full bg-white">
          <thead>
            <tr className="text-center">
              {headers?.map((title, index) => (
                <th
                  key={index}
                  className="bg-primary bg-100 sticky top-0 border-b border-gray-200 px-6 py-4 text-white text-600 font-bold tracking-wider uppercase text-xs"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          {notifications?.length > 0 ? (
            <>
              <tbody>
                {notifications.map((notification, index) => (
                  <tr
                    key={index}
                    className="bg-lightGrey border-b-2 text-center"
                  >
                    <td className=" px-4 py-2">{notification?.id}</td>
                    <td className=" px-4 py-2">
                      {user?.roles[0] === "ROLE_GESTIONNAIRE"
                        ? (notification?.actionType || "REFUSE") +
                          " " +
                          (notification?.status || "REFUSE")
                        : "Demande " + notification?.actionType}
                    </td>

                    <td className=" px-4 py-2">
                      {sliceStr(notification?.dmjobj)}
                    </td>

                    <td className=" px-4 py-2">{notification?.username}</td>

                    <td className=" px-4 py-2">
                      {" "}
                      <FaEye
                        onClick={() => retrieveRegle(notification)}
                        className="cursor-pointer mx-auto"
                        size="20px"
                        title="See more"
                      />
                    </td>
                    {user?.roles[0] !== "ROLE_GESTIONNAIRE" && (
                      <>
                        <td className="px-4 py-2 space-x-2">
                          <button
                            onClick={() => approveRegle(notification)}
                            className="p-2 rounded bg-green-500 text-white"
                          >
                            Approuver
                          </button>
                          <button
                            onClick={() => refuserRegle(notification)}
                            className="p-2 rounded bg-red-500 text-white"
                          >
                            Refuser
                          </button>
                        </td>
                      </>
                    )}
                    {user?.roles[0] === "ROLE_GESTIONNAIRE" && (
                      <td>
                        <IoCloseSharp
                          onClick={() => handleRemoveNotif(notification)}
                          className="cursor-pointer text-red-500"
                          size={26}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <>Aucune donnée disponible </>
          )}
        </table>
      </div>
      <Modal
        show={showRegleModal}
        close={() => setShowRegleModal(false)}
        title=""
      >
        {/* regle infos */}

        <Title className="text-3xl text-blue-500">
          Information sur la Regle {regle?.id}
        </Title>
        <div className="mt-12 max-h-96 overflow-y-auto">
          <div className="flex justify-around gap-10">
            <div className="flex flex-col gap-2">
              <p className="text-red-500 font-bold">Codope</p>
              <p className="text-red-500 font-bold">LP</p>

              <p className="text-red-500 font-bold">DSC</p>
              <p className="text-red-500 font-bold">ORD</p>
              <p className="text-red-500 font-bold">RUBINI</p>
              <p className="text-red-500 font-bold">RUBDST</p>
              <p className="text-red-500 font-bold">SRC</p>
              <p className="text-red-500 font-bold">OPR</p>
              <p className="text-red-500 font-bold">CMSR</p>
            </div>
            <div className="flex flex-col gap-2">
              <input value={regle?.codope} disabled />
              <input value={regle?.lp} disabled />
              <textarea value={regle?.dsc} disabled />
              <input value={regle?.ord} disabled />
              <input value={regle?.rubini} disabled />
              <input value={regle?.rubdst} disabled />
              <input value={regle?.src} disabled />
              <input value={regle?.opr} disabled />
              <input value={regle?.cmsr} disabled />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Notifications;
