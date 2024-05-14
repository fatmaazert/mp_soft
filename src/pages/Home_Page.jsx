import AdminDashImg from "../admindash.svg";

const HomePage = () => {
  return (
    <>
      <div className="w-100% mt-10 overflow-hidden flex justify-center items-center">
        <img
          src={AdminDashImg}
          alt="admin dash"
          className="w-auto h-3/4 max-h-[500px]"
        />
      </div>
    </>
  );
};

export default HomePage;
