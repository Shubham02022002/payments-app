import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet, Send, ShieldCheck, Zap } from "lucide-react";
import Input from "./Input";
import Password from "./Password";
import Feature from "./Feature";
import api from "../api/axios";

const SigninCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const response = await api.post("/api/v1/user/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (error) {
      console.error("Signin failed:", error);
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
              Welcome <span className="text-blue-600">back.</span>
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Access your wallet and manage your money securely.
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
                  Welcome back
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Sign in to access your PayWallet account
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSignin();
                }}
                className="space-y-3"
              >
                <Input
                  label="Email"
                  type="email"
                  placeholder="john.doe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your strong password"
                />

                <div className="text-right">
                  <button
                    type="button"
                    className="text-xs text-blue-600 font-medium hover:text-blue-700"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full h-10 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition"
                >
                  Sign In
                </button>

                <div className="flex items-center gap-3">
                  <div className="h-px bg-slate-200 flex-1" />
                  <span className="text-xs text-slate-400">or</span>
                  <div className="h-px bg-slate-200 flex-1" />
                </div>

                <p className="text-xs text-center text-slate-500">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="text-blue-600 font-semibold"
                  >
                    Sign up
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

export default SigninCard;
