import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer theme="dark" limit={4}/>
    </div>
  );
}

export default App;
