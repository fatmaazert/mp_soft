import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../formComponents/Title";
import AnchorLink from "../formComponents/AnchorLink";
import Button from "../formComponents/Button";
import { RiLockPasswordLine } from "react-icons/ri";
import SelectInput from "../formComponents/SelectInput";
import IconInput from "../formComponents/IconInput";
import { FaRegUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { BsPersonVcard } from "react-icons/bs";

const roles = [
  { name: "gestionnaire" },
  { name: "admin" },
  { name: "responsable" },
];

function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    lastName: "",
    tel: "",
    email: "",
    password: "",
    role: "",
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
    try {
      const registerInput = formData;
    } catch (error) {
      console.log(error);
      toast.error(`${error}`);
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
            <SelectInput
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full"
              required={true}
              placeholder="Role"
              options={roles?.map((role) => ({
                value: role.name,
                label: role.name,
              }))}
            />
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
              id="passwordConfirm"
              type="password"
              name="passwordConfirm"
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
        <div className="mt-4">
          <AnchorLink
            onClick={() => {
              navigate("/");
            }}
            opString="#"
          >
            Sign in
          </AnchorLink>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
