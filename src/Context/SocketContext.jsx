import { createContext, useState } from "react";
// import { io } from "https://cdn.socket.io/4.3.0/socket.io.esm.min.js";
import { io } from "socket.io-client";
console.log(io)

const devCheck = window.location.href.includes("localhost")
const wsURL = devCheck ? "localhost:4000" : "https://ian-chatter.netlify.app"

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const hostSocket = (username, language, capacity) => {
    // const host = io(undefined, {
    //   query: { username, language, capacity },
    // });
    setSocket(io.connect(wsURL));
  };
  const guestSocket = (username, roomID, language) => {
    // const guest = io(undefined, {
    //   query: { username, roomID, language },
    // });
    setSocket(io.connect(wsURL));
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        hostSocket,
        guestSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
