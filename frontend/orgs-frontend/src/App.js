import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import Organizations from "./pages/Organizations"; // import your Organisation page
import Layout from './components/Layout';
import Industries from "./pages/Industries";
import Contacts from "./pages/Contacts"; // import your Contacts page


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/organizations"
          element={<Layout><Organizations /></Layout>}
        />
        <Route
          path="/industries"
          element={<Layout><Industries /></Layout>}
        />

         <Route
          path="/contacts"
          element={<Layout><Contacts /></Layout>}
        />

      </Routes>
    </Router>
  );
}

export default App;
