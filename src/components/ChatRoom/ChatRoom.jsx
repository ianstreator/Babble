import "./ChatRoom.css";

import { useState, useContext, useEffect, useRef } from "react";
import SocketContext from "../../Context/SocketContext";
import { toast } from "react-toastify";
import images from "../../images/export";

import Input from "../shared/Input";
import Button from "../shared/Button";
import Card from "../shared/Card";

function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [limiter, setLimiter] = useState(false);
  const { socket, language, username } = useContext(SocketContext);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;
  const usersRef = useRef(users);
  usersRef.current = users;
  const leaveRoom = () => {
    window.location.href = "/";
  };
  if (!socket) leaveRoom();
  
  const copyRoomKey = () => {
    const key = document.getElementById("Room-Key");
    if (!key.value) return;
    navigator.clipboard.writeText(key.value);
    toast.success("room key copied");
  };

  const sendButtonStyle = {
    backgroundColor: "#5D86F0",
    color: "white",
  };

  const sendMessage = () => {
    if (limiter)
      return toast.info("you may only send a message every two seconds..");

    if (message === "") return;
    socket.emit("sender", message);

    setMessage("");

    setLimiter(true);

    setTimeout(() => {
      setLimiter(false);
    }, 2000);
  };

  useEffect(() => {
    socket.on("joined", (data) => {
      const [inviteID, chatters] = data;
      const RoomKey = document.getElementById("Room-Key");
      RoomKey.value = inviteID;
      setUsers([...chatters]);
    });

    socket.on(`${language}`, (data) => {
      const [socketMessage, id] = data;
      const style = id === username ? "send" : "recieve";
      const newMessage = {
        name: id !== username ? id : "",
        message: socketMessage,
        key: messagesRef.current.length + 1,
        style: style,
      };
      setMessages((messages) => [...messages, newMessage]);

      const messageContainer = document.getElementById("chat");
      messageContainer.scrollTop = messageContainer.scrollHeight;
    });

    socket.on("server spam alert", () =>
      toast.info("you may only send a message every two seconds")
    );

    socket.on("user-leaving", (data) => {
      const [username, chatters] = data;
      const messageBox = document.getElementById("chat");
      const leavingMessage = document.createElement("p");
      leavingMessage.id = "author";
      leavingMessage.innerText = `[ ${username} ] has left the room...`;
      messageBox.append(leavingMessage);
      const messageContainer = document.getElementById("chat");
      messageContainer.scrollTop = messageContainer.scrollHeight;
      setUsers([...chatters]);
    });
  }, [socket]);

  return (
    <>
      <header>
        <img
          src={images.Exit}
          alt="exit"
          className={"leave-room"}
          onClick={leaveRoom}
        />
        <img src={images.Logo} alt="Chatter" className="Logo" />
      </header>

      <div className="room-info">
        <div className="users">
          {usersRef.current.map((u) => {
            return <Card className={"user"} children={u} key={u} />;
          })}
        </div>
        <Button
          className={"copy-button"}
          children={"Room Key"}
          id={"Room-Key"}
          onClick={copyRoomKey}
        />
      </div>

      <div className="chat-room-container">
        <div className="message-container" id="chat">
          {messagesRef.current.map((m) => {
            return (
              <>
                <p id="author">{m.name}</p>
                <Card
                  className={`message-bubble ${m.style}`}
                  children={[m.message, <div id="color"></div>]}
                  key={m.key}
                />
              </>
            );
          })}
        </div>
        <div className="message-input-container">
          <Input
            className={"text-input"}
            placeholder={"Type message here"}
            maxLength={120}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
            onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
          />
          <Button
            className={"send-button"}
            children={"Send"}
            onClick={sendMessage}
            style={message === "" ? null : sendButtonStyle}
          />
        </div>
      </div>
    </>
  );
}

export default ChatRoom;
