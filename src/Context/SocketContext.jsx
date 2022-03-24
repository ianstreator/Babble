import { createContext, useState } from "react";
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const hostSocket = (username, language, capacity, role) => {
    const host = io(undefined, {
      query: { username, language, capacity, role },
    });
    setSocket(host);
  };
  const guestSocket = (username, language, roomID, role) => {
    const guest = io(undefined, {
      query: { username, language, roomID, role },
    });
    setSocket(guest);
    const join = new Promise((res,rej) => {
      
    })
    // console.log(socket);
    // socket.on("validate", (data) => {
    //   console.log(data);
    //   if (data === false) {
    //     window.alert("room does not exist.");
    //     return;
    //   }
    // });
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
