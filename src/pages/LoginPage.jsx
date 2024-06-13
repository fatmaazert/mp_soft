import React, { useEffect } from "react";
import LogoSide from "../components/signComponents/LogoSide";
import LoginForm from "../components/signComponents/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { token } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, []);
  return (
    <div className="flex h-screen">
      <LogoSide />
      <div className="w-1/2 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
