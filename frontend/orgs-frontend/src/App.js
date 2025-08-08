import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import ProtectedRoute from './auth/ProtectedRoute';
// import Organizations from './pages/Organizations';
// import Contacts from './pages/Contacts';
// import Industries from './pages/Industries';
// import Layout from './components/Layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
         {/* <Route
          path="/organizations"
          element={<ProtectedRoute><Layout><Organizations /></Layout></ProtectedRoute>}
        /> */}
       
        {/* <Route
          path="/contacts"
          element={<ProtectedRoute><Layout><Contacts /></Layout></ProtectedRoute>}
        />
        <Route
          path="/industries"
          element={<ProtectedRoute><Layout><Industries /></Layout></ProtectedRoute>}
        />  */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
