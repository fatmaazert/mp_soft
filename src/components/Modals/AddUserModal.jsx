import { RiLockPasswordLine } from "react-icons/ri";
import Button from "../formComponents/Button";
import IconInput from "../formComponents/IconInput";
import Modal from "./Modal";
import { FaRegUser } from "react-icons/fa";
import { BsPersonVcard } from "react-icons/bs";
import Title from "../formComponents/Title";
import { useEffect, useState } from "react";
import { rules } from "../../constants";
import { toast } from "react-toastify";
import { post, update } from "../../utils/apiMethods";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useAuth } from "../../hooks/useAuth";

const AddUserModal = ({ isOpen, handleClose, userData }) => {
  const [formData, setFormData] = useState({
    username: "",
    lastName: "",
    tel: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [user, setUser] = useLocalStorage("user", null);

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    } else {
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "",
      });
    }
  }, [userData]);

  console.log({ formData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userData) {
        // get the role id from the user data
        console.log({ role: formData.role, rules });

        const roleId = rules.find((rule) => rule.role == formData.role)?.id;

        const response = await update("user/update/" + userData.id, {
          username: formData.username,
          email: formData.email,
          roles: [{ id: roleId }],
        });

        if (response) {
          toast.success("Le compte a été mis à jour");
          // if the user logged in is the same as the current user updated
          if (user.id == userData.id) {
            setUser({ ...response, roles: [response.roles[0]?.name] });
          }
          // if the user logged in is not the same as the current user updated
          else if (user.id != userData.id) {
            handleClose();
          }
          handleClose();
        }
        console.log(response);
      } else {
        // check if the confirm password is the same as the current password
        if (formData.password !== formData.confirmPassword) {
          toast.error("Les mots de passe ne sont pas identiques");
          return;
        }
        const response = await post("user/Add-user", {
          user: {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          },
          role: formData.role,
        });
        if (response) {
          handleClose();
          toast.success("Utilisateur créé avec succès!");
        }
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      toast.error(`${error}`);
    }
  };
  return (
    <Modal show={isOpen} close={handleClose} title="">
      <form onSubmit={(e) => handleSubmit(e)} className="mx-auto max-w-md">
        <div>
          <Title className="text-3xl">Information sur le compte</Title>
          <div className="mt-12">
            <IconInput
              id="username"
              type="text"
              value={formData.username}
              name="username"
              className="w-full"
              placeholder="nom et prenom"
              onChange={handleChange}
              icon={<BsPersonVcard />}
            />
          </div>
          <select
            name="role"
            onChange={handleChange}
            value={formData.role}
            required
            className={`py-2 w-full px-4 mb-4 bg-lightGrey rounded-lg focus:outline-none`}
          >
            <option disabled value="">
              Role
            </option>
            {rules.map((rule) => (
              <option key={rule.id} value={rule.role}>
                {rule.role}
              </option>
            ))}
          </select>

          <IconInput
            id="email"
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            className="w-full"
            onChange={handleChange}
            icon={<FaRegUser />}
          />
          {!userData && (
            <>
              <IconInput
                id="password"
                type="password"
                name="password"
                value={formData.password}
                className="w-full"
                placeholder="Password"
                autoComplete="off"
                icon={<RiLockPasswordLine />}
                onChange={handleChange}
              />
              <IconInput
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                className="w-full"
                placeholder="Confirm Password"
                autoComplete="off"
                icon={<RiLockPasswordLine />}
                onChange={handleChange}
              />
            </>
          )}
        </div>
        <div className="flex items-center justify-between gap-10">
          <Button
            className="bg-gray-400 text-white w-full"
            onClick={handleClose}
          >
            Annuler
          </Button>
          <Button className="bg-primary text-white w-full">
            {userData ? "Modifier" : "Ajouter"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUserModal;
