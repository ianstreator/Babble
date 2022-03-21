import { createContext, useState } from "react";
// import { io } from "https://cdn.socket.io/4.3.0/socket.io.esm.min.js";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const hostSocket = (username, language, capacity) => {
    // const host = io(undefined, {
    //   query: { username, language, capacity },
    // });
    setSocket(io());
  };
  const guestSocket = (username, roomID, language) => {
    // const guest = io(undefined, {
    //   query: { username, roomID, language },
    // });
    setSocket(io());
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
