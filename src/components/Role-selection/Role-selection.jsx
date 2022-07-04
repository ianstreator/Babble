import "./Role-selection.css";

import Button from "../shared/Button";

import { useNavigate } from "react-router-dom";

function RoleSelection() {
  let navigate = useNavigate();

  function displayGuestForm() {
    navigate("/GuestForm");
  }
  function displayHostForm() {
    navigate("/HostForm");
  }

  return (
    <div className="Role-form">
      <Button
        className={"btn host"}
        type={"button"}
        children={<h1>Host</h1>}
        onClick={displayHostForm}
      />

      <Button
        className={"btn guest"}
        type={"button"}
        children={<h1>Guest</h1>}
        onClick={displayGuestForm}
      />
    </div>
  );
}

export default RoleSelection;
