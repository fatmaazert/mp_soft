import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconInput from "../formComponents/IconInput";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import Title from "../formComponents/Title";
import AnchorLink from "../formComponents/AnchorLink";
import Button from "../formComponents/Button";
import { useAuth } from "../../hooks/useAuth";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const loginInput = {
      email: formData.email,
      password: formData.password,
    };
    await login(loginInput);
    //navigate("/rule");
  }
  return (
    <>
      <div className="w-full sm:w-96">
        <form
          className="p-8"
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <Title className="text-5xl">Se Connecter</Title>
          <IconInput
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="w-full"
            autoComplete="on"
            icon={<FaRegUser />}
            onChange={(e) => onChange(e)}
            required={true}
          />
          <IconInput
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="off"
            className="w-full"
            icon={<RiLockPasswordLine />}
            onChange={(e) => onChange(e)}
            required={true}
          />
          <Button type="submit" className="bg-primary ml-20 text-white w-40">
            Se Connecter
          </Button>
        </form>
      </div>

      <div className="mt-2">
        <AnchorLink
          opString="#"
          onClick={() => {
            navigate("/signup");
          }}
        >
          S'inscrire
        </AnchorLink>
      </div>
    </>
  );
}

export default LoginForm;
