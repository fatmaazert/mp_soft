import React, { useEffect, useState } from "react";
import CloseButton from "../formComponents/CloseButton";
import { get } from "../../utils/apiMethods";

function UsersModal({ isOpen, onClose, submit, confirmMsg }) {
  const [users, setusers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    async function getUsers() {
      const response = await get("/user/retrieve-all-user");
      setusers(response);
      console.log(response);
    }
    getUsers();
  }, []);

  const onSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleClose = () => {
    submit(selectedUser);
    onClose();
  };

  const UsersHeader = ["Id", "Username", "Email", "Role", "Action"];

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75 "
        >
          <div className="relative bg-white p-8 rounded-lg w-[1200px] h-[600px] overflow-auto border border-gray-300 shadow-lg">
            <CloseButton className="absolute top-1 right-2" onClick={onClose} />
            <h2 className="mt-2 text-xl text-primary font-semibold mb-4">
              users
            </h2>

            <table className="border-collapse table-auto bg-white w-full">
              <thead>
                <tr className="text-left">
                  {UsersHeader?.map((title, index) => (
                    <th
                      key={index}
                      className="bg-primary bg-100 sticky top-0 border-b border-gray-200 px-6 py-4 text-white text-600 font-bold tracking-wider uppercase text-xs"
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              {users?.length > 0 ? (
                <>
                  <tbody>
                    {users.map((user, index) => {
                      if (user.roles[0]?.id == 3) {
                        return (
                          <tr key={index} className="bg-lightGrey">
                            <td className=" px-4 py-2">{user.id}</td>
                            <td className=" px-4 py-2">{user.username}</td>
                            <td className=" px-4 py-2">{user.email}</td>
                            <td className=" px-4 py-2">Responsable</td>
                            <td className=" px-4 py-2">
                              <input
                                className="w-4 h-4"
                                type="radio"
                                name="selectedUsers"
                                checked={selectedUser?.id == user.id}
                                onChange={() => onSelectUser(user)}
                              />
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </>
              ) : (
                <>Aucune donnée disponible </>
              )}
            </table>
            <div className="flex justify-end mt-4">
              <button
                className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
                onClick={handleClose}
              >
                {confirmMsg || "Selecter"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UsersModal;
