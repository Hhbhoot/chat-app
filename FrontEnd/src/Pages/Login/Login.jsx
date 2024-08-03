import React, { useState } from "react";
import "./Login.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userName || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const res = await fetch("http://localhost:8080/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });

    const data = await res.json();

    if (data?.status !== "success") {
      toast.error(data?.message);
      return;
    }

    toast.success("Logged in successfully.");
    localStorage.setItem("token", data.data.token);
  };

  return (
    <div className="w-full h-screen background py-5 flex items-center justify-center ">
      <div className="flex items-center justify-center h-auto z-50  w-[80%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] rounded-2xl backdrop-blur-md bg-white/10 border border-white/10 shadow-lg">
        <form className="flex flex-col gap-4 w-full p-5" onSubmit={handleLogin}>
          <div className="mx-auto text-center text-3xl  font-bold text-white">
            <h1>Chat App Login</h1>
          </div>
          <label className="text-sm font-medium text-white">UserName</label>
          <input
            type="text"
            className="w-full px-4 py-2 text-sm text-white bg-white/10 border border-gray-300 rounded-md  focus:outline-none"
            placeholder="Enter UserName Here"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label className="text-sm font-medium text-white mt-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password Here"
              className="w-full px-4 py-2 text-sm text-white bg-white/10 border border-gray-300 rounded-md
            focus:outline-none
            "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-2 top-[25%] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <FiEye className="text-gray-100" />
              ) : (
                <FiEyeOff className="text-gray-100" />
              )}
            </span>
          </div>

          <button
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 mt-5"
            type="submit"
          >
            Login
          </button>
          <p className="text-sm text-white hover:underline hover:font-semibold cursor-pointer">
            Forgot Password?
          </p>
          <p className="text-sm text-white">
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="text-white font-bold mx-2 hover:underline cursor-pointer">
                Sign up
              </span>
            </Link>
          </p>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
