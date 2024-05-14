import { useEffect, useState } from "react";
import { get, post, remove } from "../utils/apiMethods";
import { rules } from "../constants";
import {
  FcManager,
  FcBusinessman,
  FcReadingEbook,
  FcTodoList,
} from "react-icons/fc";

const GestionDesRoles = () => {
  const [tasks, setTasks] = useState([]);
  const [adminTasks, setAdminTasks] = useState([]);
  const [responsableTasks, setResponsableTasks] = useState([]);
  const [gestionnaireTasks, setGestionnaireTasks] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    const getAdminTasks = async () => {
      const result = await get(`/libelles/role/2`);
      if (result) {
        setAdminTasks(result);
      }
    };
    getAdminTasks();

    const getResponsableTasks = async () => {
      const result = await get(`/libelles/role/3`);
      if (result) {
        setResponsableTasks(result);
      }
    };
    getResponsableTasks();

    const getGestionnaireTasks = async () => {
      const result = await get(`/libelles/role/4`);
      if (result) {
        setGestionnaireTasks(result);
      }
    };
    getGestionnaireTasks();
  }, [update]);

  useEffect(() => {
    const allTasks = async () => {
      const result = await get("/retrieve-all-tache");
      if (result) {
        setTasks(result);
      }
    };
    allTasks();
  }, []);

  const handleAffecter = async () => {
    console.log({ selectedTask, selectedUser });

    const result = await post(
      `/affecter-tache-role?tacheId=${selectedTask}&roleId=${selectedUser}`
    );
    if (result) {
      //setGestionnaireTasks([...gestionnaireTasks, result]);
      setUpdate((prev) => !prev);
    }
  };

  const handleChangeUser = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleChangeTask = (e) => {
    setSelectedTask(e.target.value);
  };

  const handleEnlever = async () => {
    console.log({ selectedTask, selectedUser });

    const result = await remove(
      `/enlever-tache-role?tacheId=${selectedTask}&roleId=${selectedUser}`
    );
    if (result) {
      //setGestionnaireTasks([...gestionnaireTasks, result]);
      setUpdate((prev) => !prev);
    }
  };

  return (
    <div className="p-4 bg-gray-100 h-screen text-center">
      <h1 className="text-3xl mt-4 flex gap-x-1 justify-center items-center bg-gray-300 max-w-7xl mx-auto">
        Gestion des roles <FcTodoList size={38} />
      </h1>

      <div className="flex mt-10 justify-around">
        <div className="bg-white rounded-md p-4 max-w-fit">
          <h3 className="text-xl font-semibold mb-2 flex gap-x-1 items-center bg-black text-gray-50 p-2 rounded-md">
            <FcBusinessman /> Administrateur
          </h3>
          <div className="flex flex-col gap-2 text-lg mt-4">
            {
              // Admin rules
              adminTasks?.map((rule) => (
                <span key={rule} className="text-start border-b pb-1">
                  {" "}
                  {rule}{" "}
                </span>
              ))
            }
          </div>
        </div>

        <div className="bg-white rounded-md p-4 max-w-fit">
          <h3 className="text-xl font-semibold mb-2 flex gap-x-1 items-center bg-black text-gray-50 p-2 rounded-md">
            <FcReadingEbook /> Gestionnaire
          </h3>
          <div className="flex flex-col gap-2 text-lg mt-4">
            {
              // Gestionnaire rules
              gestionnaireTasks?.map((rule) => (
                <span key={rule} className="text-start border-b pb-1">
                  {" "}
                  {rule}{" "}
                </span>
              ))
            }
          </div>
        </div>

        <div className="bg-white rounded-md p-4 max-w-fit">
          <h3 className="text-xl font-semibold mb-2 flex gap-x-1 items-center bg-black text-gray-50 p-2 rounded-md">
            {" "}
            <FcManager /> Responsable
          </h3>
          <div className="flex flex-col gap-2 text-lg mt-4">
            {
              // Responsable rules
              responsableTasks?.map((rule) => (
                <span key={rule} className="text-start border-b pb-1">
                  {" "}
                  {rule}{" "}
                </span>
              ))
            }
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center gap-7 justify-evenly">
        <select
          name="users"
          className={`py-2 px-4 bg-lightGrey rounded-lg focus:outline-none w-56`}
          required
          onChange={handleChangeUser}
        >
          <option disabled value="">
            Select a Rule
          </option>
          {rules.map((option, id) => (
            <option key={id} value={option.id}>
              {option.role}
            </option>
          ))}
        </select>

        <select
          name="tasks"
          className={`py-2 px-4 bg-lightGrey rounded-lg focus:outline-none w-56`}
          required
          onChange={handleChangeTask}
        >
          <option disabled value="">
            Select a task
          </option>
          {tasks.map((option) => (
            <option key={option[0]} value={option[0]}>
              {option[1]}
            </option>
          ))}
        </select>

        <div className="space-x-8">
          <button
            onClick={handleAffecter}
            className="bg-green-800 hover:bg-green-600 text-white font-bold py-2 px-10 rounded"
          >
            affecter
          </button>
          <button
            onClick={handleEnlever}
            className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-10 rounded"
          >
            enlever
          </button>
        </div>
      </div>
    </div>
  );
};

export default GestionDesRoles;
