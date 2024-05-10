import React from "react";
import LogoSide from "../components/signComponents/LogoSide";
import SignUpForm from "../components/signComponents/SignUpForm";

function SignUpPage() {
  return (
    <>
      <div className="flex h-screen">
        <LogoSide />
        <div className="w-1/2 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <SignUpForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
