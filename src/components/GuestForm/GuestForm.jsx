import "./GuestForm.css";

import Form from "../shared/Form";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

function Guest() {
  const [username, setUsername] = useState("");
  const [roomID, setRoomID] = useState(null);
  const [language, setLanguage] = useState(null);

  let navigate = useNavigate();

  const navBack = () => {
    navigate("/");
  };

  const navJoin = () => {
    if (username === "" || roomID === "" || language === null) {
      toast("Please fill out all fields :)");
      return null;
    }

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
              <option value={null} className="place-holder">
                Please choose a language
              </option>
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
