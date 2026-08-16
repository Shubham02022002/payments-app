import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import api from "../api/axios";

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await api.get("/api/v1/user/me", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        setUserDetails(response.data);
      } catch (error) {
        console.error(error);
        setError("Unable to load your account.");
      }
    };

    getUserDetails();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f8ff]">
        <Appbar />

        <div className="flex items-center justify-center min-h-[80vh] px-4">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="min-h-screen bg-[#f5f8ff]">
        <Appbar />

        <div className="flex items-center justify-center min-h-[80vh]">
          <p className="text-sm text-slate-500">Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f8ff]">
      <Appbar username={userDetails.userName} />

      <main className="max-w-5xl mx-auto px-4 py-6">
        <Balance value={userDetails.balance} />

        <Users />
      </main>
    </div>
  );
};

export default Dashboard;
