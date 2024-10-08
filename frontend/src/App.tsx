import ChatApp from "./Pages/ChatApp"
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom"
import GoogleRegister from "./Pages/GoogleRegister"
import NotFound404 from "./Pages/NotFound404"
import Profile from "./Pages/Profile"
import Settings from "./Pages/Settings"
import { useEffect } from "react"


function App() {

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<GoogleRegister/>} /> */}
        <Route path="/" element={<ChatApp />} />
        <Route path="/chat/:id" element={<ChatApp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Router>
  )
}

export default App
