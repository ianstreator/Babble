import "./Role-selection.css"

import Form from "../shared/Form";
import Button from "../shared/Button";


function RoleSelection() {
  return (
    <Form
      className={"Role-form"}
      children={
        <>
          <Button className={"btn Host"} type={"button"} children={<h1>Host</h1>} />
          <Button className={"btn Guest"} type={"button"} children={<h1>Guest</h1>} />
        </>
      }
    />
  );
}
const styles = {
  formStyle: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: "10rem",
    width: "20rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
};

export default RoleSelection;
