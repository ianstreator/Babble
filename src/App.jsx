import "./App.css";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import Toast from "./components/shared/Toast"

import RoleSelection from "./components/Role-selection/Role-selection";
import GuestForm from "./components/GuestForm/GuestForm";
import HostForm from "./components/HostForm/HostForm";
import ChatRoom from "./components/ChatRoom/ChatRoom";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="form">
              <img src="../src/images/Chatter-Logo.svg" width={250} />
              <RoleSelection />
            </div>
          }
        />
        <Route path="/Host" element={<div></div>} />
        <Route
          path="/GuestForm"
          element={
            <div className="form">
              <img src="../src/images/Chatter-Logo.svg" width={250} />
              <Toast />
              <GuestForm />
            </div>
          }
        />
        <Route
          path="/HostForm"
          element={
            <div className="form">
              <img src="../src/images/Chatter-Logo.svg" width={250} />
              <Toast />
              <HostForm />
            </div>
          }
        />
        <Route
          path="/ChatRoom"
          element={
            <div className="form">
              <img src="../src/images/Chatter-Logo.svg" width={250} />
              <Toast />
              <ChatRoom />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
