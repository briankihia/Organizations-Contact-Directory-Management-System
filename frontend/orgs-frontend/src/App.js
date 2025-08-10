import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import Organizations from "./pages/Organizations"; // import your Organisation page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/organizations" element={<Organizations />} />
      </Routes>
    </Router>
  );
}

export default App;
