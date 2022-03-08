import "./App.css";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import RoleSelection from "./components/Role-selection/Role-selection";
import Guest from "./components/Guest/Guest";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route
          path="/*"
          element={
            <>
              <img src="../src/images/Chatter-Logo.svg" width={250} />
            </>
          }
        /> */}
        <Route
          path="/"
          element={
            <div className="Home-form">
              <img src="../src/images/Chatter-Logo.svg" width={250} />
              <RoleSelection />
            </div>
          }
        />
        <Route path="/Host" element={<div></div>} />
        <Route
          path="/Guest"
          element={
            <div className="Home-form">
              <img src="../src/images/Chatter-Logo.svg" width={250} />
              <Guest />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
