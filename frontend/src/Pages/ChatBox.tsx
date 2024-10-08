import React, { useEffect, useState } from "react";
import sidebarIcon from "../assets/Sidebar Left.svg";
import AddIcon from "@mui/icons-material/Add";
import { ChatMessage, ChatRoom } from "../context/chatsData";
import CustomButton from "../Components/CustomButton";
import HorizontalLine from "../Components/HorizontalLine";
import ChatMessages from "../Components/ChatMessages";
import MicrophoneInput from "../Components/MicrophoneInput";
import TextInput from "../Components/TextInput";

interface ChatBoxProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  selectedChatRoomId: string; // Prop to accept the selected chat room ID
  onChatRoomSelect: (id: string) => void; // Callback to notify parent of chat room change
  chatRooms: ChatRoom[];
  onAddNewChatRoom: () => void; // Callback to add a new chat room
  onSendMessage: (newMessage: ChatMessage) => void; // Callback to send a message
}

const ChatBox = ({
  isSidebarOpen,
  toggleSidebar,
  selectedChatRoomId,
  onChatRoomSelect,
  chatRooms,
  onAddNewChatRoom,
  onSendMessage,
}: ChatBoxProps) => {
  const [isMicClicked, setIsMicClicked] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [message, setMessage] = useState("");  

  // Finding the current chat room based on the selected ID
  const currentRoom = chatRooms.find((room) => room.id === selectedChatRoomId) || null;

  // Function to handle sending messages
  const handleSendMessage = (message: string) => {
    if (message.trim() === "") return;

    const newMessage: ChatMessage = {
      name: "User",
      message,
      timestamp: new Date().toLocaleTimeString(),
      role: "user",
    };

    onSendMessage(newMessage); // Send message to parent function
    setMessage(""); // Clear input after sending
  };

  useEffect(() => {
    setTranscript(transcript); // Ensure transcript updates (if needed)
  }, [transcript]);

  return (
    <div className={`${isSidebarOpen} relative w-full h-[710px] gap-2 m-2 rounded-l-lg bg-background-primary rounded-xl text-Netral-100`}>
      <div className="flex justify-between items-center p-6">
        <div className="flex gap-2 items-center">
          <img
            src={sidebarIcon}
            alt="Sidebar"
            width={30}
            height={30}
            className={`md:block ${isSidebarOpen ? "hidden" : "block"}`}
            onClick={toggleSidebar}
          />
          <h1 className="text-Netral-300 text-lg">CHATS - {currentRoom?.name || "No Chat Selected"}</h1>
        </div>
        <CustomButton
          label="New Chat"
          onClick={onAddNewChatRoom}
          className="bg-blue-gradient text-Netral-800"
          icon={<AddIcon />}
        />
      </div>
      <HorizontalLine />

      {/* Chat Messages */}
      <ChatMessages msg={currentRoom?.messages || []} />

      {/* Message Input Section */}
      <div className="absolute bottom-0 w-full flex flex-col items-center">
        {/* Microphone Input */}
        {isMicClicked ? (
          <MicrophoneInput setTranscript={setTranscript} />
        ) : null}
        {/* Text Input */}
        <TextInput
          setIsMicClicked={setIsMicClicked}
          transcript={transcript}
          setMsg={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatBox;
