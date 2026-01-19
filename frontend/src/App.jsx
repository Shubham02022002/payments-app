import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Transfer from "./pages/Transfer";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<Transfer />} />
      </Routes>
    </div>
  );
};

export default App;
