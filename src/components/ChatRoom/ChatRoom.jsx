import "./ChatRoom.css";

import { useState, useContext, useEffect } from "react";
import SocketContext from "../../Context/SocketContext";

// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

import Input from "../shared/Input";
import Button from "../shared/Button";
import Card from "../shared/Card";

function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { socket } = useContext(SocketContext);

  const sendStyle = {
    backgroundColor: "#5D86F0",
    color: "white",
  };

  useEffect(() => {
    socket.on("reciever", (data) => {
      const [socketMessage, id] = data;
      const style = id === socket.id ? "send" : "recieve";
      const newMessage = (
        <Card
          className={`message-bubble-${style}`}
          children={socketMessage}
          key={messages.length + 1}
        />
      );
      console.log("hello");
      console.log(messages);
      setMessages([...messages, newMessage]);
      console.log(messages);
    });
  }, []);
  const sendMessage = () => {
    if (message === "") return;
    socket.emit("sender", message);
    setMessage("");
  };
  return (
    <div className="chat-room-container">
      <div className="message-container" id="poop">
        {messages}
      </div>
      <div className="message-input-container">
        <Input
          className={"text-input"}
          placeholder={"Type message here"}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <Button
          className={"button-input"}
          children={"Send"}
          onClick={sendMessage}
          style={message === "" ? null : sendStyle}
        />
      </div>
    </div>
  );
}

export default ChatRoom;
