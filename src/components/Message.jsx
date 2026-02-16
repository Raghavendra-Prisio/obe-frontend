import Logo from "../assets/logo.png";
import User from "../assets/User.png";
import { TypeAnimation } from "react-type-animation";
import Loading from "../assets/loading_green.gif";
import Copy from "../assets/Copy.png";
import Sharepoint from "../assets/sharepoint.svg";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState } from "react";

const Message = ({ obj }) => {
  const [showSources, setShowSources] = useState(false);

  const handleCopyToClipBoard = async () => {
    await navigator.clipboard.writeText(obj.content);
  };

  function getFileNameWithoutExtension(url) {
    const parsedUrl = new URL(url);

    // Handle SharePoint-style ?id= links
    const idParam = parsedUrl.searchParams.get("id");
    const path = idParam || parsedUrl.pathname;

    const fileName = decodeURIComponent(
      path.substring(path.lastIndexOf("/") + 1),
    );

    // Remove extension
    return fileName.replace(/\.[^/.]+$/, "");
  }

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
            // <div className="flex flex-col">
            //   {obj.content.split("\n").map((value, index) => (
            //     <TypeAnimation
            //       sequence={[value, () => console.log("done")]}
            //       speed={90}
            //       cursor={false}
            //       key={index}
            //     />
            //   ))}
            //   <span className="font-black">Source URIs:</span>
            //   <HoverCard>
            //     <HoverCardTrigger>
            //       <img
            //         src={Sharepoint}
            //         alt="Sharepoint"
            //         className="w-5 h-5 cursor-pointer"
            //       />
            //     </HoverCardTrigger>
            //     <HoverCardContent>
            //       {obj.sourceUris &&
            //         obj.sourceUris.map((value, index) => (
            //           <a
            //             key={value || index}
            //             href={value}
            //             target="_blank"
            //             rel="noopener noreferrer"
            //             style={{ display: "block" }}
            //             className="text-blue-700 underline"
            //           >
            //             <TypeAnimation
            //               sequence={[
            //                 getFileNameWithoutExtension(value),
            //                 () => console.log("done"),
            //               ]}
            //               speed={90}
            //               cursor={false}
            //             />
            //           </a>
            //         ))}
            //     </HoverCardContent>
            //   </HoverCard>
            // </div>
            <span>
              <TypeAnimation
                sequence={[obj.content, () => setShowSources(true)]}
                speed={50}
                cursor={false}
              />
              {showSources && obj.sourceUris?.length > 0 && (
                <div className="font-black mt-2 flex items-center gap-2">
                  Reference:
                  <HoverCard>
                    <HoverCardTrigger>
                      <img
                        src={Sharepoint}
                        alt="Sharepoint"
                        className="w-5 h-5 cursor-pointer"
                      />
                    </HoverCardTrigger>
                    <HoverCardContent
                      side="bottom"
                      align="start"
                      className="w-100 max-h-60 overflow-y-auto wrap-break-word"
                    >
                      <ol className="list-decimal pl-5 space-y-1">
                        {obj.sourceUris.map((value, index) => (
                          <li key={index}>
                            <a
                              href={value}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-700 underline break-all"
                            >
                              {getFileNameWithoutExtension(value)}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              )}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Message;
