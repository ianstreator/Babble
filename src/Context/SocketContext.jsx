import { createContext, useState } from "react";

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
