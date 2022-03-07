import "./App.css";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import RoleSelection from "./components/Role-selection/Role-selection";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <div className="Role-select">
              <img src="../src/images/Chatter-Logo.svg" width={250}/>
              <RoleSelection />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
