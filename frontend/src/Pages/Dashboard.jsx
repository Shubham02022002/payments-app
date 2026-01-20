import React, { useEffect, useState } from "react";
import Appbar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const resp = await axios.get("http://localhost:3000/api/v1/user/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });
        if (!resp.data) {
          throw new Error("Internal server error");
        }
        setUserDetails(resp.data);
      } catch (error) {
        setError(error.message);
      }
    };
    getUserDetails();
  }, []);

  return (
    <div>
      <Appbar username={userDetails.username || ""} />
      <Balance value={userDetails.balance} />
      <Users />
    </div>
  );
};

export default Dashboard;
