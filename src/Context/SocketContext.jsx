import { createContext, useState } from "react";
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [language, setLanguage] = useState("");
  const [languageOption, setLanguageOption] = useState([]);

  const getLanguages = async () => {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const URL = window.location.href.includes("localhost")
      ? "http://localhost:4000/"
      : "https://chatter-i.herokuapp.com";
    const res = await fetch(`${URL}languages`, options);
    const languageList = await res.json();
    setLanguageOption(...languageList);
    console.log(languageOption);
    // console.log(typeof languageList);
    // console.log(languageList);

  };

  const hostSocket = (username, language, capacity, role) => {
    setLanguage(language);
    const host = io(undefined, {
      query: { username, language, capacity, role },
    });
    setSocket(host);
  };

  const guestSocket = (username, language, roomID, role) => {
    setLanguage(language);

    const guest = io(undefined, {
      query: { username, language, roomID, role },
    });
    setSocket(guest);
  };

  return (
    <SocketContext.Provider
      value={{
        language,
        socket,
        hostSocket,
        guestSocket,
        getLanguages,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
