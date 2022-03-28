import "./App.css";
import Logo from "./images/export";

import { Route, Routes, BrowserRouter as Router, Link } from "react-router-dom";

import RoleSelection from "./components/Role-selection/Role-selection";
import GuestForm from "./components/GuestForm/GuestForm";
import HostForm from "./components/HostForm/HostForm";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import Toast from "./components/shared/Toast";
import { SocketProvider } from "./Context/SocketContext";


function App() {
  return (
    <>
      <SocketProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <div className="form">
                  <img src={Logo.Logo} width={250} />
                  <RoleSelection />
                </div>
              }
            />
            <Route
              path="/GuestForm"
              element={
                <div className="form">
                  <img src={Logo.Logo} width={250} />
                  <Toast />
                  <GuestForm />
                </div>
              }
            />
            <Route
              path="/HostForm"
              element={
                <div className="form">
                  <img src={Logo.Logo} width={250} />
                  <Toast />
                  <HostForm />
                </div>
              }
            />
            <Route
              path="/ChatRoom"
              element={
                <div className="form">
                  <Link to={"/"}>
                    <img src={Logo.Logo} width={250} />
                  </Link>
                  <Toast />
                  <ChatRoom />
                </div>
              }
            />
          </Routes>
        </Router>
      </SocketProvider>
    </>
  );
}

export default App;
