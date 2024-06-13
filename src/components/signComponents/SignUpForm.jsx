import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../formComponents/Title";
import AnchorLink from "../formComponents/AnchorLink";
import Button from "../formComponents/Button";
import { RiLockPasswordLine } from "react-icons/ri";
import IconInput from "../formComponents/IconInput";
import { FaRegUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { BsPersonVcard } from "react-icons/bs";
import { post } from "../../utils/apiMethods";
import { SlActionUndo } from "react-icons/sl";
function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // must all fields have a value
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    // check if the confirm password is the same as the current password
    if (formData.password !== formData.confirmPassword) {
      toast.error("Les mots de passe ne sont pas identiques");
      return;
    }

    const res = await post("/api/auth/signup", formData);
    if (res) {
      navigate("/");
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <Title className="text-3xl">Information sur le compte</Title>
            <div className="mt-12">
              <IconInput
                id="username"
                type="text"
                name="username"
                className="w-full"
                placeholder="nom et prenom"
                onChange={handleChange}
                icon={<BsPersonVcard />}
              />
            </div>
            <IconInput
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              className="w-full"
              onChange={handleChange}
              icon={<FaRegUser />}
            />

            <IconInput
              id="password"
              type="password"
              name="password"
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
              className="w-full"
              placeholder="Confirm Password"
              onChange={handleChange}
              icon={<RiLockPasswordLine />}
            />
            {}
          </div>
          <Button type="submit" className="bg-primary text-white w-full">
            Sign Up
          </Button>
        </form>
        <br />
        <div className="from-neutral-50s rounded">
          <AnchorLink
            className="flex items-center w-max p-2 mx-auto justify-center underline gap-3"
            onClick={() => {
              navigate("/");
            }}
            opString="#"
          >
            <SlActionUndo />
            <span> Sign in </span>
          </AnchorLink>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
