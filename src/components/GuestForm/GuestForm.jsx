import "./GuestForm.css";

import Form from "../shared/Form";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import SocketContext from "../../Context/SocketContext";

function Guest() {
  const [username, setUsername] = useState("");
  const [roomID, setRoomID] = useState("");
  const [language, setLanguage] = useState(null);
  const [join, setJoin] = useState(false);
  const { guestSocket, socket } = useContext(SocketContext);

  let navigate = useNavigate();

  const navBack = () => {
    navigate("/");
  };
  const connectToRoom = () => {
    const promise = new Promise((res, rej) => {
      socket.on("validate", (data) => {
        if (data) {
          res(navigate("/ChatRoom"));
        } else {
          rej(console.log("error"));
        }
      });
    });
    return promise;
  };
  if (join) {
    toast.promise(connectToRoom, {
      success: "you're connected to the room!",
      error: "there was an issue connecting to this room.",
    });
  }

  const navJoin = () => {
    if (
      username === "" ||
      roomID === "" ||
      language === "Please choose a language"
    ) {
      toast("Please fill out all fields");
      return null;
    }
    guestSocket(username, language, roomID, "guest");
    setJoin(true);
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
              <option value={null} className="place-holder">
                Please choose a language
              </option>
              <option value={"Spanish"}>Spanish</option>
              <option value={"French"}>French</option>
              <option value={"German"}>German</option>
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
