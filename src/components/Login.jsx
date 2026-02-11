import { useEffect } from "react";
import LogoBlack from "../assets/logo.png";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "../msalConfig";
import { useNavigate } from "react-router";

const Login = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/chat");
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  return (
    <div className="w-full h-full flex items-center justify-center ">
      <div className="flex-1 w-full flex flex-col items-center justify-center gap-5">
        <div className="w-[60px] h-[60px] flex items-center justify-center gap-2 font-semibold text-[#11743a]">
          <img src={LogoBlack} alt="Logo" className="w-full h-full" />
          <h1 className="text-4xl flex">
            OB <span className="text-gray-600">E</span>
          </h1>
        </div>
        <button
          className="bg-[#11743a]/90 px-15 border-gray-600 border-2 py-5 text-lg rounded-2xl text-white cursor-pointer hover:bg-[#11743a]/80"
          onClick={handleLogin}
        >
          SSO into your account
        </button>
      </div>
    </div>
  );
};

export default Login;
