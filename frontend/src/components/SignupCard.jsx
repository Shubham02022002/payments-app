import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet, Send, ShieldCheck, Zap, Eye, EyeOff } from "lucide-react";
import Feature from "../components/Feature";
import api from "../api/axios";
import Input from "./Input";

const SignupCard = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await api.post("/api/v1/user/signup", {
        firstName,
        lastName,
        userName,
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-[#f5f8ff] px-4 py-4">
      <div className="max-w-6xl mx-auto h-full flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <Wallet size={22} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">
                Pay<span className="text-blue-600">Wallet</span>
              </h1>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-slate-900">
              Your money.
              <br />
              <span className="text-blue-600">Your way.</span>
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Send money instantly
              <br />
              to anyone, anywhere.
            </p>

            <div className="grid grid-cols-3 gap-3 mt-6 max-w-lg">
              <Feature
                icon={<Send size={22} />}
                title="Instant Transfers"
                description="Send money in seconds"
              />

              <Feature
                icon={<ShieldCheck size={22} />}
                title="Bank Level Security"
                description="Your data is safe"
              />

              <Feature
                icon={<Zap size={22} />}
                title="Lightning Fast"
                description="Quick and reliable"
              />
            </div>

            <p className="mt-6 text-xl font-bold text-slate-900">
              Simple. <span className="text-blue-600">Secure.</span> Fast.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-5 sm:p-6">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  Create account
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Enter your details to get started
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSignup();
                }}
                className="space-y-3"
              >
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="First Name"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                  <Input
                    label="Last Name"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <Input
                  label="Username"
                  placeholder="johnDoe1"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="john.doe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Your strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                <button
                  type="submit"
                  className="w-full h-10 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition"
                >
                  Create Account
                </button>

                <div className="flex items-center gap-3">
                  <div className="h-px bg-slate-200 flex-1" />

                  <span className="text-xs text-slate-400">or</span>

                  <div className="h-px bg-slate-200 flex-1" />
                </div>

                <p className="text-xs text-center text-slate-500">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/signin")}
                    className="text-blue-600 font-semibold"
                  >
                    Sign in
                  </button>
                </p>

                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                  <ShieldCheck size={13} />

                  <span>
                    Your information is encrypted and securely stored.
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupCard;
