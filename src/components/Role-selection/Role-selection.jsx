import "./Role-selection.css";

import Button from "../shared/Button";

import { useNavigate } from "react-router-dom";

function RoleSelection() {

  let navigate = useNavigate();

  function displayGuest() {
    navigate("/GuestForm");
  }
  function displayHost() {
    navigate("/HostForm");
  }

  return (
    <div className="Role-form">
      <Button
        className={"btn host"}
        type={"button"}
        children={<h1>Host</h1>}
        onClick={displayHost}
      />

      <Button
        className={"btn guest"}
        type={"button"}
        children={<h1>Guest</h1>}
        onClick={displayGuest}
      />
    </div>
  );
}

export default RoleSelection;
