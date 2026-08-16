import React from "react";
import { LogOut, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Appbar = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
            <Wallet size={20} className="text-white" />
          </div>

          <h1 className="text-xl font-bold text-slate-900">
            Pay<span className="text-blue-600">Wallet</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-xs text-slate-400">Welcome back</p>

            <p className="text-sm font-semibold text-slate-800">
              {username || "User"}
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            {username ? username[0].toUpperCase() : "U"}
          </div>

          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-red-500 transition"
            title="Logout"
          >
            <LogOut size={19} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Appbar;
