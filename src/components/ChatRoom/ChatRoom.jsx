import "./ChatRoom.css";

import { useState, useContext, useEffect, useRef } from "react";
import SocketContext from "../../Context/SocketContext";
// import { toast } from "react-toastify";

import Input from "../shared/Input";
import Button from "../shared/Button";
import Card from "../shared/Card";

function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { socket } = useContext(SocketContext);
  const messagesRef = useRef();
  messagesRef.current = messages;

  const sendStyle = {
    backgroundColor: "#5D86F0",
    color: "white",
  };
  const sendMessage = () => {
    if (message === "") return;
    socket.emit("sender", message);
    setMessage("");
  };

  useEffect(() => {
    socket.on("reciever", (data) => {
      console.log(messagesRef);
      const [socketMessage, id] = data;
      const style = id === socket.id ? "send" : "recieve";
      const newMessage = {
        message: socketMessage,
        key: messagesRef.current.length + 1,
        style: style,
      };
      setMessages((messages) => [...messages, newMessage]);
      const messageContainer = document.getElementById("chat");
      messageContainer.scrollTop = messageContainer.scrollHeight;
    });
    console.log("called");
  }, [socket]);

  return (
    <div className="chat-room-container">
      <div className="message-container" id="chat">
        {messagesRef.current.map((m) => {
          return (
            <Card
              className={`message-bubble-${m.style}`}
              children={m.message}
              key={m.key}
            />
          );
        })}
      </div>
      <div className="message-input-container">
        <Input
          className={"text-input"}
          placeholder={"Type message here"}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
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
