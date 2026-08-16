import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ value, onChange, placeholder = "Your password" }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="block text-xs font-semibold mb-1">Password</label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full h-10 border border-slate-200 rounded-lg px-3 pr-10 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
