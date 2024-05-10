import logo from "../../assets/logo.png";

function LogoSide() {
  return (
    <>
      <div className="w-1/2 bg-primary flex items-center justify-center">
        <img src={logo} alt="Logo" className="w-56 h-56" />
      </div>
    </>
  );
}

export default LogoSide;
