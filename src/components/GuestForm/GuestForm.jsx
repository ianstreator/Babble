import "./GuestForm.css";

import Form from "../shared/Form";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import SocketContext from "../../Context/SocketContext";

function Guest() {
  const {
    guestSocket,
    socket,
    languageList,
    deviceLanguage,
    deviceLanguageValue,
  } = useContext(SocketContext);

  const [username, setUsername] = useState("");
  const [roomID, setRoomID] = useState("");
  const [join, setJoin] = useState(false);
  const [language, setLanguage] = useState(deviceLanguageValue);

  let navigate = useNavigate();
  
  const navBack = () => {
    navigate("/");
  };

  if (join) {
    socket.on("validate", (data) => {
      data === true ? navigate("/ChatRoom") : toast.error(data);
    });

    setTimeout(() => {
      setJoin(false);
    }, 7500);
  }

  const navJoin = async () => {
    if (join)
      return toast("please wait before attempting to join a room again..");

    if (username === "" || roomID === "" || language === null) {
      return toast("Please fill out all fields");
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
              maxLength={7}
            />
            <Input
              placeholder={"RoomID"}
              className={"input"}
              onChange={(e) => setRoomID(e.target.value)}
            />

            <select onChange={(e) => setLanguage(e.target.value)}>
              {/* <option value={null} className="place-holder">
                Please choose a language
              </option> */}
              <option value={deviceLanguageValue}>
                - Device language ({deviceLanguage}) -
              </option>
              {Object.entries(languageList).map((l, i) => {
                return (
                  <option key={i} value={l[1]}>
                    {l[0]}
                  </option>
                );
              })}
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
