import "./ChatRoom.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

import Input from "../shared/Input";
import Button from "../shared/Button";

function ChatRoom() {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    // if (message === "") return toast("Failed to send message..");
    // toast("Message Sent!")
    setMessage("")
  };

  return (
    <div className="chat-room-container">
      <div className="message-container"></div>
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
        />
      </div>
    </div>
  );
}

export default ChatRoom;
