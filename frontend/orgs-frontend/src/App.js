
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
// import RegistrationPage from "./components/RegistrationPage/RegistrationPage";



function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<LoginPage/>}/>
          {/* <Route path="/Register" element={<RegistrationPage/>}/> */}

          {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;