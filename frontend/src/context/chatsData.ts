import { Language } from "@mui/icons-material";

// Declare a global interface to add the webkitSpeechRecognition property to the Window object
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}


export interface ChatRoom {
  id: string;
  name: string;
  timestamp?: string;
  messages: { name: string; message: string; timestamp?: string; role?: string }[];
}

export interface ChatMessage {
  name: string;
  message: string;
  timestamp?: string;
  role?: string; // Role is either "user" or "assistant"
  type?: string; // Type is either "text" or "code"
}

const chatsData: ChatRoom[] = [
  {
    id: "1",
    name: "General Text",
    messages: [
    ],
  },
  {
    id: "2",
    name: "Morning Greatings",
    messages: [
    ],
  },
];

export default chatsData;