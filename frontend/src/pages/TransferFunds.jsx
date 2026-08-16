import React, { useState } from "react";
import { CheckCircle, Wallet } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axios";

const TransferFunds = () => {
  const [data] = useSearchParams();

  const receiverId = data.get("id");
  const name = data.get("name") || "User";

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleTransfer = async () => {
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.post(
        "/api/v1/account/transfer",
        {
          to: receiverId,
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );

      setMessage(
        `₹${Number(amount).toLocaleString("en-IN")} sent successfully to ${name}`,
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 1800);
    } catch (error) {
      console.error("Transfer failed:", error);

      setError(
        error.response?.data?.message || "Transfer failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f8ff] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
            <Wallet size={25} />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">Send Money</h1>

          <p className="text-sm text-slate-500 mt-1">
            Transfer money securely to another user
          </p>
        </div>

        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-5">
          <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg font-bold">
            {name[0].toUpperCase()}
          </div>

          <div>
            <p className="text-xs text-slate-400">Sending money to</p>

            <p className="font-semibold text-slate-900">{name}</p>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-semibold text-slate-800 mb-1"
          >
            Amount
          </label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              ₹
            </span>

            <input
              id="amount"
              type="number"
              min="1"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError("");
              }}
              className="
                w-full
                h-11
                border
                border-slate-200
                rounded-lg
                pl-8
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
        </div>

        {error && (
          <div className="mb-4 px-3 py-2 rounded-lg bg-red-50 border border-red-100 text-red-500 text-xs">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleTransfer}
          disabled={loading}
          className="
            w-full
            h-11
            bg-blue-600
            text-white
            rounded-lg
            text-sm
            font-semibold
            hover:bg-blue-700
            disabled:bg-blue-300
            disabled:cursor-not-allowed
            transition
          "
        >
          {loading ? "Processing..." : "Send Money"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          disabled={loading}
          className="w-full mt-3 text-sm text-slate-500 hover:text-slate-700"
        >
          Cancel
        </button>
      </div>

      {message && (
        <div className="fixed top-5 right-5 bg-white border border-green-100 shadow-lg rounded-xl px-4 py-3 flex items-center gap-3">
          <div className="text-green-500">
            <CheckCircle size={22} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Transfer successful
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferFunds;
