"use client";
import { ChatRoom } from "../context/chatsData";

interface ChatListsProps {
  chatRooms: ChatRoom[];
  onSelectChatRoom: (id: string) => void;
}


const ChatLists = ({ chatRooms, onSelectChatRoom }: ChatListsProps) => {
  
  // Function to get the latest message timestamp for a chat room
  // const getLatestMessageTimestamp = (room: ChatRoom) => {
  //   if (room.messages.length === 0) return new Date(0); // Return an old date if no messages
  //   const latestMessage = room.messages[room.messages.length - 1];
  //   return new Date(latestMessage.timestamp);
  // };

  // // Sort chat rooms by the latest message timestamp
  // const sortedChatRooms = [...chatRooms].sort((a, b) =>
  //   getLatestMessageTimestamp(b).getTime() - getLatestMessageTimestamp(a).getTime()
  // );

  return (
    <div className="flex flex-col gap-2 h-full overflow-y-auto scroll-smooth snap-none scrollbar-custom">
      {chatRooms.map((room) => (
        <button
          key={room.id}
          onClick={() => onSelectChatRoom(room.id)}
          className={`text-left p-2 bg-background-secondary rounded-lg hover:bg-background-tertiary ${
            room.id === chatRooms[0].id ? "bg-blue-500 text-white" : ""  // Highlights the selected room
          }`}
        >
          
          {room.name} 
        </button>
      ))}
    </div>
  );
};

export default ChatLists;
