import "./ChatRoom.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

import Input from "../shared/Input";
import Button from "../shared/Button";
import Card from "../shared/Card";

function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message === "") return;
    const newMessage = (
      <Card
        className={"message-bubble"}
        children={message}
        key={messages.length + 1}
      />
    );

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const sendStyle = {
    backgroundColor: "#5D86F0",
    color: "white",
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
