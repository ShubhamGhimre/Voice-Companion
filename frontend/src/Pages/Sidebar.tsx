import AddIcon from "@mui/icons-material/Add";
import settingsIcon from "../Assets/Settings.svg";
import { useNavigate } from "react-router-dom";
import sidebarIcon from "../Assets/Sidebar Left.svg";
import { ChatRoom } from "../context/chatsData";
import CustomButton from "../Components/CustomButton";
import ChatLists from "../Components/ChatLists";
import Profile from "../Components/Profile";
import HorizontalLine from "../Components/HorizontalLine";
import { useState } from "react";

interface SidebarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  onSelectChatRoom: (id: string) => void; // Callback to notify parent of chat room selection
  selectedChatRoomId: string; // Current selected chat room ID
  chatRooms: ChatRoom[]; // List of chat rooms
  onAddNewChatRoom: () => void; // Callback to add a new chat room
}

const Sidebar = ({
  toggleSidebar,
  isSidebarOpen,
  onSelectChatRoom,
  selectedChatRoomId,
  chatRooms,
  onAddNewChatRoom,
}: SidebarProps) => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(""); // Search query for chat rooms

  const handleSelectChatRoom = (id: string) => {
    onSelectChatRoom(id);
    navigate(`chat/${id}`);
  };
  const filteredChatRooms = chatRooms.filter((chatRoom) =>
    chatRoom.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`h-screen w-[300px] bg-Netral-700 text-Netral-100  px-10 py-5 flex flex-col align-left shadow-xl md:gap-10  ${
        isSidebarOpen ? "block" : "md:hidden"
      } `}
    >
      <div className="flex justify-between items-center">
        <Profile />

        <div className="flex md:flex-col items-center gap-3">
          {/* Settings buttons */}
          <img
            src={settingsIcon}
            alt="setting"
            width={30}
            height={30}
            onClick={() => {
              navigate("/settings");
            }}
          />
          <img
            src={sidebarIcon}
            alt="Sidebar"
            width={30}
            height={30}
            onClick={toggleSidebar}
            className={`${isSidebarOpen ? "hidden" : "block"}`}
          />
        </div>
      </div>

      <CustomButton
        label="Start new Chat"
        onClick={onAddNewChatRoom}
        className="bg-green-gradient text-Netral-100"
        icon={<AddIcon />}
      />

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search chats..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mt-4 p-2 bg-Netral-800 text-Netral-100 rounded"
      />

      <div className="flex flex-col gap-2 overflow-auto">
        <h1 className="text-lg text-center">History</h1>
        <HorizontalLine />
        <ChatLists chatRooms={filteredChatRooms} onSelectChatRoom={onSelectChatRoom} />
      </div>
    </div>
  );
};

export default Sidebar;
