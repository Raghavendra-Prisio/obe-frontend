import { useEffect, useRef, useState } from "react";
import UpArrow from "../assets/UpArrow.png";
import Message from "./Message";
import axios from "axios";
import { API_BASE_URL } from "../../config.js";
import LogoBlack from "../assets/logo.png";
import { Plus } from "lucide-react";
import { useMsal } from "@azure/msal-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Chat = () => {
  const messagesContainer = useRef(null);
  const { accounts } = useMsal();
  const firstName = accounts[0].name.split(" ")[0];
  const lastName = accounts[0].name.split(" ")[1];
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [projectIds, setProjectIds] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const preDefinedQuestions = [
    "What is the invoice number?",
    "What is the total cost of the job?",
    "What is the customer email address?",
    "What is the name of the customer?",
  ];

  useEffect(() => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTo({
        top: messagesContainer.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    const getProjectIds = async () => {
      const response = await axios.get(
        "https://b8gl1p7k51.execute-api.us-east-1.amazonaws.com/get-projectIds",
      );
      setProjectIds(response.data.projectIds);
    };
    getProjectIds();
  }, []);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSendMessage = (prompt = text) => {
    if (prompt !== "") {
      const message = {
        role: "user",
        content: prompt,
      };
      setMessages((prev) => [...prev, message]);
      setText("");
      askGpt(prompt);
    }
  };

  const buildChatHistory = (messages) => {
    const MAX = 4;
    return messages.slice(-MAX);
  };

  const chatHistory = buildChatHistory(messages);

  const askGpt = async (message) => {
    try {
      const placeholder = {
        role: "assistant",
        content: "Generating...",
      };
      setMessages((prev) => [...prev, placeholder]);
      const response = await axios.post(
        `https://3tr8th5ncc.execute-api.us-east-1.amazonaws.com/query`,
        {
          query: message,
          projectID: selectedProjectId,
          chatHistory: chatHistory,
        },
      );
      setMessages((prev) => {
        const updatedMessages = [
          ...prev.slice(0, prev.length - 1),
          { role: "assistant", content: response.data.answer },
        ];
        return updatedMessages;
      });
    } catch (err) {
      console.log(err);
      setMessages((prev) => {
        const updatedMessages = [
          ...prev.slice(0, prev.length - 1),
          {
            role: "assistant",
            content: "Error generating response. Try Again.",
          },
        ];
        return updatedMessages;
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      if (e.shiftKey) {
        e.preventDefault();
        setText((prev) => prev + "\n");
      } else {
        e.preventDefault();
        handleSendMessage();
      }
    }
  };

  const handlePredefinedQuestionsSend = (value) => {
    setText(value);
    handleSendMessage(value);
  };

  return (
    <div className="h-[calc(100vh-50px)] w-full flex flex-col justify-center items-center">
      <div className="h-[100%] w-[400px] sm:w-[700px] md:w-[800px] flex flex-col">
        {messages.length !== 0 ? (
          <div
            className="flex-1 w-full flex flex-col p-3 overflow-auto gap-3 dark:text-white"
            ref={messagesContainer}
          >
            {messages.map((obj, index) => (
              <Message obj={obj} key={index} />
            ))}
          </div>
        ) : (
          <div
            className={`flex-1 w-full flex flex-col p-3 items-center justify-center`}
          >
            <div className="flex-1 w-full flex flex-col items-center justify-end">
              <div className="w-[60px] h-[60px]">
                <img src={LogoBlack} alt="Logo" className="w-full h-full" />
              </div>
              <h1 className="text-2xl font-semibold">
                Hi <span className="text-[#11743a]">{firstName}</span>, How can
                I help you today?
              </h1>
            </div>
            <div
              className={`flex-1 w-full flex flex-col items-center justify-end gap-2 text-neutral-900`}
            >
              {/* <div className="w-full flex flex-col sm:flex-row gap-2">
                {preDefinedQuestions.slice(0, 2).map((value, index) => (
                  <div
                    className="w-full h-[50px] flex border-[1px] border-neutral-300 rounded-md px-2 py-1 text-sm items-center justify-center cursor-pointer"
                    key={index}
                    onClick={() => handlePredefinedQuestionsSend(value)}
                  >
                    {value}
                  </div>
                ))}
              </div>
              <div className="w-full hidden sm:flex gap-2">
                {preDefinedQuestions.slice(2, 4).map((value, index) => (
                  <div
                    className="w-full flex h-[50px] border-[1px] border-neutral-300 rounded-md px-2 py-1 text-sm items-center justify-center cursor-pointer"
                    key={index}
                    onClick={() => handlePredefinedQuestionsSend(value)}
                  >
                    {value}
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        )}

        <div className={`w-full h-[70px] py-3 relative`}>
          <div
            className={`w-[30px] h-[30px] absolute ${
              text !== "" ? "bg-neutral-800" : "bg-neutral-400"
            } flex items-center justify-center rounded-lg top-5 right-2 cursor-pointer`}
            onClick={() => handleSendMessage()}
          >
            <img src={UpArrow} alt="UpArrow" className="w-[15px] rotate-90" />
          </div>
          <div
            className={`w-max h-max absolute
            flex items-center justify-center rounded-lg top-4.5 right-13 cursor-pointer`}
          >
            {/* <Select
              value={selectedProjectId}
              onValueChange={(value) => setSelectedProjectId(value)}
            >
              <SelectTrigger className="w-[180px] bg-neutral-800 !text-white">
                <SelectValue placeholder="Select a Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Project Ids</SelectLabel>
                  {projectIds.map((projectId) => (
                    <SelectItem value={projectId}>{projectId}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select> */}
          </div>
          <textarea
            type="text"
            multiple={true}
            rows={5}
            value={text}
            placeholder="Message Assistant"
            className={`w-full h-[100%] bg-neutral-200 rounded-lg p-2 outline-none border-[1px] border-neutral-300 pr-60`}
            onChange={(e) => handleInputChange(e)}
            onKeyPress={(e) => handleKeyPress(e)}
            onPaste={(e) => {
              e.preventDefault();
              setText(e.clipboardData.getData("text/plain"));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
