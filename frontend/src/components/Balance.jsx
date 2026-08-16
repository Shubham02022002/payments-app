import React from "react";
import { Wallet } from "lucide-react";

const Balance = ({ value }) => {
  const balance = Number(value || 0);

  return (
    <div className="bg-blue-600 rounded-2xl p-5 sm:p-6 text-white shadow-lg shadow-blue-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-blue-100">Available Balance</p>

          <h2 className="text-3xl sm:text-4xl font-bold mt-2">
            ₹ {balance.toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
          <Wallet size={25} />
        </div>
      </div>

      <p className="text-xs text-blue-100 mt-4">Available for transfers</p>
    </div>
  );
};

export default Balance;
