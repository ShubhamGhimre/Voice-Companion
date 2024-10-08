import { useEffect, useState } from "react";
import chatsData, { ChatMessage, ChatRoom } from "../context/chatsData";
import Sidebar from "./Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import ChatBox from "./ChatBox";

const ChatApp: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>(chatsData); // Manage chat rooms state he/re
  const [selectedChatRoomId, setSelectedChatRoomId] = useState<
    string | undefined
  >(undefined);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Add new chat room and update state
  const handleAddNewChatRoom = () => {
    const newRoomId = (chatRooms.length + 1).toString();
    const newRoom: ChatRoom = {
      id: newRoomId,
      name: `Chat Room ${newRoomId}`,
      messages: [],
      timestamp: new Date().toISOString(),
    };
    setChatRooms((prevRooms) => [...prevRooms, newRoom]);
    setSelectedChatRoomId(newRoomId); // Select the new room immediately
    navigate(`/chat/${newRoomId}`); // Update the URL with the new chat room ID
  };

  // Select a specific chat room
  const handleSelectChatRoom = (id: string) => {
    setSelectedChatRoomId(id);
    navigate(`/chat/${id}`); // Update the URL with the selected chat room ID
  };

  const configureSpeechSynthesis = () => {
    const synth = new SpeechSynthesisUtterance();
    synth.lang = "en-US"; // Set language
    return synth;
  };

  const speak = (text: string) => {
    const synth = configureSpeechSynthesis();
    synth.text = text; // The text to be spoken
    window.speechSynthesis.speak(synth);
  };

  // Function to handle AI response and speak only the first line
  const speakFirstLineOfAIResponse = (response: string) => {
    // Trim leading whitespace or newline characters
    const trimmedResponse = response.trimStart();

    // Extract the first line from the trimmed response
    const firstLine = trimmedResponse.split("\n")[0];

    // Speak the first line
    speak(firstLine);
  };

  const containsCodeSnippet = (message: string) => {
    const codePattern = /```([^`]+)```/g;
    return codePattern.test(message);
  };

  // Add a new message to the selected chat room
  const handleSendMessage = async (newMessage: ChatMessage) => {
    let roomId = selectedChatRoomId;

    if (!roomId) {
      const newRoomId = (chatRooms.length + 1).toString();
      const newRoom: ChatRoom = {
        id: newRoomId,
        name: `Chat Room ${newRoomId}`,
        messages: [newMessage], // Add the message to the new room
        timestamp: new Date().toISOString(),
      };

      setChatRooms((prevRooms) => [...prevRooms, newRoom]);
      setSelectedChatRoomId(newRoomId); // Select the new room immediately
      navigate(`/chat/${newRoomId}`); // Update the URL with the new chat room ID
      roomId = newRoomId; // Assign to roomId for further processing
    } else {
      // If a chat room is selected, add the message to it
      setChatRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === roomId
            ? { ...room, messages: [...room.messages, newMessage] }
            : room
        )
      );
    }

    // Call AI API after creating the room
    await fetchAIResponseAndAddMessage(roomId, newMessage.message);
  };

  // Function to fetch AI response and add it to the chat room
  const fetchAIResponseAndAddMessage = async (
    roomId: string,
    userMessage: string
  ) => {
    try {
      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI response");
      }

      const data = await response.json();
      console.log(data);

      const aiMessage: ChatMessage = {
        name: "AI",
        message: data.answer, // Use the AI's response
        timestamp: new Date().toISOString(),
        role: "assistant",
        type: containsCodeSnippet(data.answer) ? "code" : "text",
      };

      setChatRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === roomId
            ? { ...room, messages: [...room.messages, aiMessage] }
            : room
        )
      );

      speakFirstLineOfAIResponse(data.answer);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  useEffect(() => {
    if (id) {
      setSelectedChatRoomId(id);
    } else {
      setSelectedChatRoomId("");
    }
  }, [id]);

  useEffect(() => {
    // Redirect to '/' if an invalid chat room ID is detected
    if (id && !chatRooms.some((room) => room.id === id)) {
      navigate("/");
    }
  }, [id, chatRooms, navigate]);

  return (
    <main className="h-screen bg-Netral-700 flex overflow-hidden">
      <Sidebar
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        onSelectChatRoom={handleSelectChatRoom}
        selectedChatRoomId={selectedChatRoomId || ""}
        chatRooms={chatRooms}
        onAddNewChatRoom={handleAddNewChatRoom} // Pass down to Sidebar
      />
      <ChatBox
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        selectedChatRoomId={selectedChatRoomId || ""}
        onChatRoomSelect={handleSelectChatRoom}
        onAddNewChatRoom={handleAddNewChatRoom} // Pass down to ChatBox
        onSendMessage={handleSendMessage}
        chatRooms={chatRooms}
      />
    </main>
  );
};

export default ChatApp;
