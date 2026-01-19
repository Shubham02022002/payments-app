import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Transfer from "./Pages/Transfer";
import Dashboard from "./Pages/Dashboard";
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
