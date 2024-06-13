import React, { useEffect, useState } from "react";
import IconInput from "../components/formComponents/IconInput";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import Button from "../components/formComponents/Button";
import { useAuth } from "../hooks/useAuth";
import { FcConferenceCall } from "react-icons/fc";
import { BsPersonVcard } from "react-icons/bs";
import { update } from "../utils/apiMethods";
import { toast } from "react-toastify";

function Compte() {
  const { user } = useAuth();

  console.log({ user });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setFormData({
      username: user.username,
      email: user.email,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log({ formData });

    // if the confirm password is the same as the old password
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Les mots de passe ne sont pas identiques");
      return;
    }

    const res = await update("user/update/" + user.id, {
      username: formData.username,
      email: formData.email,
      password: formData.newPassword,
    });

    if (res) {
      toast.success("Votre compte a été mis à jour");
    } else {
      toast.error("Une erreur s'est produite");
    }
  }

  return (
    <div className="flex flex-col gap-4 mt-10">
      <div className="p-4 bg-gray-100 h-screen text-center">
        <h1 className="text-3xl mt-4 flex gap-x-1 justify-center items-center bg-gray-300 max-w-7xl mx-auto">
          <FcConferenceCall size={38} /> Gerer Compte
        </h1>

        <div className="max-w-lg mx-auto">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <div className="mt-12">
                <IconInput
                  id="username"
                  type="text"
                  name="username"
                  className="w-full"
                  value={formData.username}
                  placeholder="nom et prenom"
                  onChange={handleChange}
                  icon={<BsPersonVcard />}
                />
              </div>
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

              <IconInput
                id="oldPassword"
                type="password"
                name="oldPassword"
                className="w-full"
                placeholder="old Password"
                autoComplete="off"
                icon={<RiLockPasswordLine />}
                onChange={handleChange}
              />

              <IconInput
                id="password"
                type="password"
                name="newPassword"
                className="w-full"
                placeholder="New Password"
                autoComplete="off"
                icon={<RiLockPasswordLine />}
                onChange={handleChange}
              />

              <IconInput
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                className="w-full"
                placeholder="Confirm Password"
                onChange={handleChange}
                icon={<RiLockPasswordLine />}
              />
              {}
            </div>
            <Button type="submit" className="bg-primary text-white w-full">
              Modifier
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Compte;
