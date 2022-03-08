import "./Role-selection.css";

import Button from "../shared/Button";
import { useNavigate } from "react-router-dom";

function RoleSelection() {
  let navigate = useNavigate();

  function displayGuest() {
    navigate("/Guest");
  }
  function displayHost() {
    navigate("/Host");
  }

  return (
    <div className="Role-form">
      <Button
        className={"btn Host"}
        type={"button"}
        children={<h1>Host</h1>}
        onClick={displayHost}
      />

      <Button
        className={"btn Guest"}
        type={"button"}
        children={<h1>Guest</h1>}
        onClick={displayGuest}
      />
    </div>
  );
}

export default RoleSelection;
