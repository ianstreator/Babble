import { createContext, useState } from "react";
import { io } from "socket.io-client";
console.log(io)

const checkENV = window.location.href.includes("localhost")
const wsURL = checkENV ? "localhost:4000" : "https://ian-chatter.netlify.app"

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
