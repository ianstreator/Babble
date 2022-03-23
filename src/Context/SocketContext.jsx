import { createContext, useState } from "react";
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";


const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const hostSocket = (username, language, capacity) => {
    const host = io(undefined, {
      query: { username, language, capacity },
    });
    setSocket(host);
  };
  const guestSocket = (username, roomID, language) => {
    const guest = io(undefined, {
      query: { username, roomID, language },
    });
    setSocket(guest);
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
