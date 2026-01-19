import React from "react";
import Appbar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";

const Dashboard = () => {
  return (
    <div>
      <Appbar />
      <Balance value={"10,00,000"} />
      <Users />
    </div>
  );
};

export default Dashboard;
