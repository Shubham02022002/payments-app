import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupCard = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#808080] flex items-center justify-center p-4 border border-gray-200 shadow-md">
      <div className="bg-white rounded-lg w-full max-w-80 p-4">
        <h1 className="text-2xl font-bold text-center mb-1">Sign Up</h1>

        <p className="text-gray-500 text-xs text-center leading-4">
          Enter your information to create an account
        </p>
        <div className="mt-5 flex flex-col">
          <label htmlFor="firstName" className="text-sm font-semibold mb-1">
            First Name
          </label>
          <input
            className="w-full h-9 border border-gray-300 rounded-md outline-none px-2 text-sm mb-3 placeholder:text-gray-400 focus:border-gray-500"
            id="firstName"
            type="text"
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label htmlFor="lastName" className="text-sm font-semibold mb-1">
            Last Name
          </label>
          <input
            className="w-full h-9 border border-gray-300 rounded-md outline-none px-2 text-sm mb-3 placeholder:text-gray-400 focus:border-gray-500"
            id="lastName"
            type="text"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label htmlFor="userName" className="text-sm font-semibold mb-1">
            Username
          </label>
          <input
            className="w-full h-9 border border-gray-300 rounded-md outline-none px-2 text-sm mb-3 placeholder:text-gray-400 focus:border-gray-500"
            id="userName"
            type="text"
            placeholder="johnDoe1"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <label htmlFor="email" className="text-sm font-semibold mb-1">
            Email
          </label>
          <input
            className="w-full h-9 border border-gray-300 rounded-md outline-none px-2 text-sm mb-3 placeholder:text-gray-400 focus:border-gray-500"
            id="email"
            type="email"
            placeholder="johndoe@gmai.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="text-sm font-semibold mb-1">
            Password
          </label>
          <input
            className="w-full h-9 border border-gray-300 rounded-md outline-none px-2 text-sm mb-3 placeholder:text-gray-400 focus:border-gray-500"
            id="password"
            type="password"
            placeholder="Your strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="w-full h-9 bg-[#18181b] text-white text-sm font-semibold rounded-md mt-1"
            onClick={async () => {
              const response = await api.post("/api/v1/user/signup", {
                firstName,
                lastName,
                userName,
                email,
                password,
              });
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
            }}
          >
            Sign Up
          </button>
          <p className="text-xs text-center mt-3 text-gray-700">
            Already have an account?{" "}
            <a href="/login" className="underline font-medium">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupCard;
