import React, { useEffect, useState } from "react";
import { Search, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);

        const resp = await api.get("/api/v1/user/bulk", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          params: {
            filter,
          },
        });

        setUsers(resp.data.user || []);
        setError("");
      } catch (error) {
        console.error(error);
        setError("Unable to load users.");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [filter]);

  return (
    <section className="mt-7">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">Send Money</h2>

        <p className="text-sm text-slate-500 mt-1">
          Choose a user to transfer money
        </p>
      </div>

      <div className="relative mb-5">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search users..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="
            w-full
            h-11
            bg-white
            border
            border-slate-200
            rounded-lg
            pl-10
            pr-3
            text-sm
            outline-none
            placeholder:text-slate-400
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
          "
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-500 rounded-lg p-3 text-sm">
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-white rounded-xl p-6 text-center">
          <p className="text-sm text-slate-500">Loading users...</p>
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center">
          <p className="text-sm text-slate-500">No users found.</p>
        </div>
      )}

      {!loading && users.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
          {users.map((user) => (
            <User key={user._id} user={user} />
          ))}
        </div>
      )}
    </section>
  );
};

const User = ({ user }) => {
  console.log(user);
  const navigate = useNavigate();

  const firstLetter = user.firstName?.[0]?.toUpperCase() || "U";

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 last:border-b-0">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold shrink-0">
          {firstLetter}
        </div>

        <div className="min-w-0">
          <p className="font-semibold text-sm text-slate-900 truncate">
            {user.firstName} {user.lastName}
          </p>

          <p className="text-xs text-slate-400 truncate">@{user.username}</p>
        </div>
      </div>

      <button
        onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
        className="flex items-center gap-2 bg-blue-600 text-white px-3
          py-2
          rounded-lg
          text-xs
          font-semibold
          hover:bg-blue-700
          transition
          shrink-0
        "
      >
        <Send size={14} />

        <span className="hidden sm:inline">Send Money</span>
      </button>
    </div>
  );
};

export default Users;
