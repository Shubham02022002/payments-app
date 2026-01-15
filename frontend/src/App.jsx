import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Transfer from "./components/Transfer";
import Dashboard from "./components/Dashboard";
const App = () => {
  return (
    <div>
      <div>Payment App</div>
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
