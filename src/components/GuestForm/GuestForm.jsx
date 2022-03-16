import "./GuestForm.css";

import Form from "../shared/Form";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
// import { toast } from "react-toastify";
import SocketContext from "../../Context/SocketContext"

// async function socketInitGuest(username, roomID, language) {
//   socket = io(undefined, {
//     query: { username, roomID, language },
//   });
//   socket.emit("message-send", "Guest");
//   socket.on("server-reply", data => console.log(data))
// }

function Guest() {
  const [username, setUsername] = useState("");
  const [roomID, setRoomID] = useState(null);
  const [language, setLanguage] = useState(null);
  const { guestSocket, socket } = useContext(SocketContext);


  let navigate = useNavigate();

  const navBack = () => {
    navigate("/");
  };

  const navJoin = () => {
    if (
      username === "" ||
      roomID === "" ||
      language === "Please choose a language"
    ) {
      // toast("Please fill out all fields :)");
      alert("please fill out all fields");
      return null;
    }

    guestSocket(username, roomID, language)

    navigate(`/ChatRoom?${roomID}`);
  };

  return (
    <>
      <Form
        className={"Guest-form"}
        children={
          <>
            <Input
              placeholder={"Username"}
              className={"input"}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder={"RoomID"}
              className={"input"}
              onChange={(e) => setRoomID(e.target.value)}
            />

            <select onChange={(e) => setLanguage(e.target.value)}>
              <option className="place-holder">Please choose a language</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
            <div className="btn-container">
              <Button
                type={"button"}
                children={<h1>Back</h1>}
                className={"btn back"}
                onClick={navBack}
              />
              <Button
                type={"button"}
                children={<h1>Join</h1>}
                className={"btn join"}
                onClick={navJoin}
              />
            </div>
          </>
        }
      />
    </>
  );
}

export default Guest;
