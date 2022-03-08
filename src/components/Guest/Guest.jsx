import "./Guest.css";
import "./Guest.css";

import Form from "../shared/Form";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { useNavigate } from "react-router-dom";

function Guest() {
  let navigate = useNavigate();
  const navBack = () => {
    navigate("/");
  };

  return (
    <>
      <Form
        className={"Guest-form"}
        children={
          <>
            <Input placeholder={"Username"} className={"input"} />
            <Input placeholder={"Language"} className={"input"} />
            <Input placeholder={"RoomID"} className={"input"} />
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
              />
            </div>
          </>
        }
      />
    </>
  );
}

export default Guest;
