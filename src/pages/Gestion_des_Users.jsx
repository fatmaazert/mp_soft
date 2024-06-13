import { FcTodoList, FcConferenceCall } from "react-icons/fc";
import AddUserModal from "../components/Modals/AddUserModal";

import { get, remove } from "../utils/apiMethods";
import { useState, useEffect } from "react";
import ConfirmationModal from "../components/Modals/ConfirmationModal";
import { FaSearch } from "react-icons/fa";
const UserHeaders = ["Nom d'utilisateur", "Email", "Role", "Actions"];

const GestionDesUsers = () => {
  const [users, setUsers] = useState([]);
  const [showedUsers, setShowedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [addUserModalOpen, setUserModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpenConfirmationModal = (user) => {
    setSelectedUser(user);
    setMessage(
      `Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.username}?`
    );
    setConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setConfirmationModalOpen(false);
  };

  useEffect(() => {
    async function getUsers() {
      setIsLoading(true);
      const response = await get("/user/retrieve-all-user");
      setUsers(response);
      setShowedUsers(response);
      console.log(response);
      setIsLoading(false);
    }
    getUsers();
  }, [addUserModalOpen, confirmationModalOpen]);

  const removeUser = async () => {
    await remove("/user/remove-user/" + selectedUser?.id);
    setConfirmationModalOpen(false);
  };

  const handleFilterUser = (e) => {
    const value = e.target.value;
    setShowedUsers(
      users.filter(
        (user) =>
          user.username.toLowerCase().includes(value.toLowerCase()) ||
          user.email.toLowerCase().includes(value.toLowerCase()) ||
          user.roles[0]?.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleCloseAddUserModal = () => {
    setUserModalOpen(false);
  };

  const handleOpenUserModal = (user) => {
    setSelectedUser(user);
    console.log({ user, selectedUser });
    setUserModalOpen(true);
  };

  return (
    <>
      <div className="p-4 bg-gray-100 h-screen text-center">
        <h1 className="text-3xl mt-4 flex gap-x-1 justify-center items-center bg-gray-300 max-w-7xl mx-auto">
          <FcConferenceCall size={38} /> Gestion des utilisateurs
        </h1>

        <div className="flex flex-col gap-4 mt-10">
          <div className="flex items-center justify-end gap-x-6">
            <input
              onChange={handleFilterUser}
              className="w-80 p-2 float-start bg-gray-200"
              placeholder="Rechercher un utilisateur"
            />
            <button
              onClick={() => handleOpenUserModal(null)}
              className="p-2 rounded bg-green-500 text-white"
            >
              Ajouter un utilisateur
            </button>
          </div>
          <div className="overflow-y-scroll max-h-[500px]">
            <table className="table-auto w-full bg-white">
              <thead>
                <tr className="text-center">
                  {UserHeaders?.map((title, index) => (
                    <th
                      key={index}
                      className="bg-primary bg-100 sticky top-0 border-b border-gray-200 px-6 py-4 text-white text-600 font-bold tracking-wider uppercase text-xs"
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              {showedUsers?.length > 0 ? (
                <>
                  <tbody>
                    {showedUsers.map((user, index) => (
                      <tr key={index} className="bg-lightGrey border-b-2">
                        <td className=" px-4 py-2">{user.username}</td>
                        <td className=" px-4 py-2">{user.email}</td>
                        <td className=" px-4 py-2">{user.roles[0]?.name}</td>
                        <td className=" px-4 py-2 space-x-2">
                          <button
                            onClick={() =>
                              handleOpenUserModal({
                                ...user,
                                role: user.roles[0]?.name,
                                password: "",
                              })
                            }
                            className="p-2 rounded bg-green-500 text-white"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handleOpenConfirmationModal(user)}
                            className="p-2 rounded bg-red-500 text-white"
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              ) : (
                <>Aucune donnée disponible </>
              )}
            </table>
          </div>
        </div>
      </div>
      <ConfirmationModal
        message={message}
        title="Vous etes sur?"
        isOpen={confirmationModalOpen}
        confirm={removeUser}
        handleClose={handleCloseConfirmationModal}
      />
      <AddUserModal
        userData={selectedUser}
        isOpen={addUserModalOpen}
        handleClose={handleCloseAddUserModal}
      />
    </>
  );
};

export default GestionDesUsers;
