import Logo from "../assets/logo.png";
import User from "../assets/User.png";
import { TypeAnimation } from "react-type-animation";
import Loading from "../assets/loading_green.gif";
import Copy from "../assets/Copy.png";

const Message = ({ obj }) => {
  const handleCopyToClipBoard = async () => {
    await navigator.clipboard.writeText(obj.content);
  };
  return (
    <div className={`w-full h-auto flex flex-col p-2 rounded-lg text-black`}>
      <div className="w-full h-10 flex items-center">
        {obj.role == "user" ? (
          <div className="flex items-center gap-2">
            <div className="w-[25px] h-[25px]">
              <img src={User} alt="User" className="w-full h-full" />
            </div>
            <h1 className="text-sm font-semibold">You</h1>
          </div>
        ) : (
          <div className="w-full flex items-center gap-[3px]">
            <div className="w-[30px] h-[30px]">
              <img src={Logo} alt="Logo" className="w-full h-full" />
            </div>
            <h1 className="text-sm font-semibold mt-1">OBE</h1>
            {obj.content !== "Generating..." && (
              <div
                className="flex-1 flex items-center justify-end mt-1 cursor-pointer"
                data-tooltip-target="tooltip-dark"
                onClick={handleCopyToClipBoard}
              >
                <img src={Copy} alt="Copy" className="w-5 h-5" />
              </div>
            )}
          </div>
        )}
      </div>
      {obj.role == "user" ? (
        <div className="flex w-full pl-9 text-[15px] font-normal">
          {obj.content}
        </div>
      ) : (
        <div className="flex w-full pl-9 text-[15px] font-normal text-pretty">
          {obj.content == "Generating..." ? (
            <img src={Loading} alt="animation" className="w-[45px]" />
          ) : (
            <div className="flex flex-col">
              {obj.content.split("\n").map((value, index) => (
                <TypeAnimation
                  sequence={[value, () => console.log("done")]}
                  speed={90}
                  cursor={false}
                  key={index}
                />
              ))}
              <span className="font-black">Source URIs:</span>
              {obj.sourceUris &&
                obj.sourceUris.map((value, index) => (
                  <a
                    key={value || index}
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "block" }}
                    className="text-blue-700"
                  >
                    <TypeAnimation
                      sequence={[value, () => console.log("done")]}
                      speed={90}
                      cursor={false}
                    />
                  </a>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Message;
