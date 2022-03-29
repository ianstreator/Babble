import "./HostForm.css";

import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import SocketContext from "../../Context/SocketContext";

import Form from "../shared/Form";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { toast } from "react-toastify";

function HostForm() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState(null);
  const [capacity, setCapacity] = useState(2);
  const { hostSocket } = useContext(SocketContext);

  const navBack = () => {
    navigate("/");
  };

  const navCreate = () => {
    if (username === "" || language === null) {
      toast.warning("Please fill out all fields");
      return null;
    }
    hostSocket(username, language, capacity, "host");
    navigate(`/ChatRoom`);
  };

  return (
    <>
      <Form
        className={"Host-form"}
        children={
          <>
            <Input
              placeholder={"Username"}
              className={"input"}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={7}
            />
            <select onChange={(e) => setLanguage(e.target.value)}>
              <option value={null} className="place-holder">
                Please choose a language
              </option>
              <option value={"Spanish"}>Spanish</option>
              <option value={"French"}>French</option>
              <option value={"German"}>German</option>
            </select>
            <div className="capacity-container">
              <p>Capacity: {capacity}</p>
              <input
                className="capacity"
                type={"range"}
                min={2}
                max={4}
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>

            <div className="btn-container">
              <Button
                type={"button"}
                children={<h1>Back</h1>}
                className={"btn back"}
                onClick={navBack}
              />
              <Button
                type={"button"}
                children={<h1>Create</h1>}
                className={"btn join"}
                onClick={navCreate}
              />
            </div>
          </>
        }
      />
    </>
  );
}

export default HostForm;
