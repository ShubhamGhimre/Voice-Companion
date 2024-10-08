import profile_icon from "../Assets/dummy profile.svg";
import AI_avatar from "../Assets/AI_Avatar.png";
import { useEffect, useState } from "react";
import { TextGenerateEffect } from "./UI/TextGenerateEffect";
import { ChatMessage } from "../context/chatsData";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import ShareIcon from "@mui/icons-material/Share";
import Toast from "./UI/Toast";
import Welcome from "./Welcome";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

interface ChatMessagesProps {
  msg: ChatMessage[];
}

const ChatMessages = ({ msg }: ChatMessagesProps) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleCopyText = (message: string) => {
    navigator.clipboard.writeText(message).then(() => {
      setToastMessage("Message copied to clipboard!");
      setShowToast(true);
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setToastMessage("Code copied to clipboard!");
      setShowToast(true);
    });
  };

  // Function to check if a message contains code
  const containsCodeSnippet = (message: string) => {
    const codePattern = /```([^`]+)```/g;
    return codePattern.test(message);
  };

  const formatMessageWithCode = (message: string) => {
    const codePattern = /```([^`]+)```/g;
    return message.split(codePattern).map((part, index) => {
      if (index % 2 === 0) {
        return (
          <p key={index} className="text-justify">
            {part}
          </p>
        );
      } else {
        return (
          <div
            key={index}
            className="relative bg-background-secondary text-white p-4 my-2 rounded-lg overflow-x-auto scroll-custom"
          >
            <pre>
              <code>{part}</code>
            </pre>
            <CopyAllIcon
              onClick={() => handleCopyCode(part)}
              className="absolute top-2 right-2 text-white p-1 "
            />
          </div>
        );
      }
    });
  };

  const configureSpeechSynthesis = () => {
    const synth = new SpeechSynthesisUtterance();
    synth.lang = "en-US"; // Set language
    return synth;
  };

  const speak = (text: string) => {
    if (!isSpeaking) {
      // Only speak if not already speaking
      const synth = configureSpeechSynthesis();
      synth.text = text; // The text to be spoken
      window.speechSynthesis.speak(synth);
      setIsSpeaking(true);

      // Add an event listener to reset the speaking state when the speech ends
      synth.onend = () => {
        setIsSpeaking(false);
      };
    }
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel(); // Stop any ongoing speech
    setIsSpeaking(false);
  };

  const handleSoundIcon = () => {
    if (isSpeaking) {
      stopSpeech();
    } else {
      speak(msg[msg.length - 1].message);
    }
  };

  // Function to copy the current URL
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setToastMessage("URL copied to clipboard!");
      setShowToast(true);
    });
  };

  const closeToast = () => {
    setShowToast(false);
  };

  useEffect(() => {
    const chatContainer = document.querySelector(".chat-container");
    chatContainer?.scrollTo({
      top: chatContainer.scrollHeight,
      behavior: "smooth",
    });
  }, [msg]);

  return (
    <div
      className={`chat-container flex  flex-col gap-4 p-10 w-full overflow-hidden h-[550px] overflow-y-auto scroll-smooth snap-none scrollbar-custom`}
    >
      {/* <img src={bg_svg} alt="bg" className="absolute top-0" /> */}
      {/* Dynamically render the data for messages based on role */}
      {msg.length > 0 ? ( // Ensure data is shown only when messages are available
        msg.map((message, index) => {
          if (message.role === "user") {
            return (
              <div
                key={index}
                className={`flex flex-col gap-2 h-auto p-4 rounded-lg shadow-md ${
                  message.role === "user"
                    ? "bg-background-secondary"
                    : "bg-overlay-dark-400 self-end"
                }`}
              >
                <div className="flex flex-row items-center gap-3">
                  <img
                    src={profile_icon}
                    alt="profile icon"
                    height={10}
                    width={30}
                    className="rounded-full bg-secondary-200"
                  />
                  <h3 className="text-lg text-Netral-300">{message.name}</h3>
                  <span className="text-lg text-Netral-600">
                    | {message.timestamp}
                  </span>
                </div>
                <p className="mx-12 text-justify">
                <TextGenerateEffect words={message.message}/>
                  
                  </p>
              </div>
            );
          } else if (message.role === "assistant") {
            return (
              <div
                key={index}
                className="relative flex flex-col gap-2 p-3 bg-Netral-700 rounded-xl shadow-2xl"
              >
                <div className="flex items-center gap-3 justify-end">
                  <span className="text-lg text-Netral-600">
                    {message.timestamp} |
                  </span>
                  <h3 className="text-lg text-Netral-300">VoiceCompanion</h3>
                  <img
                    src={AI_avatar}
                    alt="AI avatar"
                    height={30}
                    width={30}
                    className="rounded-full bg-secondary-200"
                  />
                </div>
                <div className="mx-12">
                  {containsCodeSnippet(message.message) ? (
                    formatMessageWithCode(message.message)
                  ) : (
                    <p className="text-justify">{message.message}</p>
                  )}
                </div>
                <div className="mt-4 flex gap-2 items-center">
                  <CopyAllIcon
                    onClick={() => handleCopyText(message.message)}
                  />
                  <ShareIcon onClick={handleCopyUrl} />

                  {/* Show sound icon if sound is clicked then another */}

                  {isSpeaking ? (
                    <VolumeOffIcon onClick={handleSoundIcon}   />
                  ) : (
                    <VolumeUpIcon onClick={handleSoundIcon} />
                  )}
                </div>
              </div>
            );
          } else {
            return null; // Default if role is not defined
          }
        })
      ) : (
        <div>
          <Welcome />
        </div>
      )}

      {/* Show Toast Notification if active */}
      {showToast && <Toast message={toastMessage} onClose={closeToast} />}
    </div>
  );
};

export default ChatMessages;
