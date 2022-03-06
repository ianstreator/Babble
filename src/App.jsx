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
              <h1>Chatter</h1>
              <RoleSelection />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
