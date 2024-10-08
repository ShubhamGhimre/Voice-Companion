import React, { Dispatch, SetStateAction, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import CustomButton from "./CustomButton";
import SendIcon from "@mui/icons-material/Send";


interface TextInputProps {
  setIsMicClicked: Dispatch<SetStateAction<boolean>>;
  transcript: string;
  setMsg: (message: string) => void; // Updated to only require a message string
}

const TextInput = ({ setIsMicClicked, transcript, setMsg }: TextInputProps) => {
 
  const [inputValue, setInputValue] = useState("");

  // Function to handle the mic click
  const handleMicClick = () => {
    setIsMicClicked((prev) => !prev);
  };

  // Function to send the message
  const handleSendMessage = async () => {
    const message = inputValue || transcript;
    if (message.trim()) {
      setMsg(message); // Send the message
      setInputValue(""); // Clear the input field
    }
  };

  // Function to handle the Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="w-full bg-background-secondary px-4 py-3 h-full rounded-lg flex gap-2   items-center justify-between">

      <button onClick={handleMicClick}>
        <MicIcon className="text-Netral-100 h-10 cursor-pointer" />
      </button>
      <input 
        type="text"
        className=" w-full bg-background-secondary outline-none text-lg"
        id="query"
        name="query"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="How may I help you?"
        value={transcript || inputValue} // Use transcript if available, otherwise use inputValue
      />
      <CustomButton
        className="bg-blue-gradient text-Netral-800"
        icon={<SendIcon className="text-Netral-800" />}
        onClick={handleSendMessage}
      />
    </div>
  );
};

export default TextInput;
