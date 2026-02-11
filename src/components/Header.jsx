import Logo from "../assets/logo.png";

const Header = () => {
  return (
    <div
      className={`w-full h-[50px] flex items-center justify-center sm:justify-between text-xl font-semibold border-b-[1px] border-gray-200 gap-5 px-3 bg-white`}
    >
      <div className="flex items-center gap-2">
        <div className="w-[35px]">
          <img
            src={Logo}
            alt="Clarivate-Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className={`text-black flex`}>
          <span className="">OBE</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
