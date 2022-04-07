import "./App.css";
import images from "./images/export";

import { Route, Routes, BrowserRouter as Router, Link } from "react-router-dom";

import RoleSelection from "./components/Role-selection/Role-selection";
import GuestForm from "./components/GuestForm/GuestForm";
import HostForm from "./components/HostForm/HostForm";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import Toast from "./components/shared/Toast";
import Footer from "./components/shared/Footer";
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
                  <img src={require(images.Logo)} className="Logo" />
                  <RoleSelection />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/GuestForm"
              element={
                <div className="form">
                  <img src={require(images.Logo)} className="Logo" />
                  <Toast />
                  <GuestForm />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/HostForm"
              element={
                <div className="form">
                  <img src={require(images.Logo)} className="Logo" />
                  <Toast />
                  <HostForm />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/ChatRoom"
              element={
                <div className="form">
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
