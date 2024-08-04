import React, { useState } from "react";
import "./SignUp.css";
import toast, { Toaster } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContex } from "../../Contex/AuthContex";

const SignUp = () => {
  const { setAuth } = useAuthContex();

  const [details, setDetails] = useState({
    name: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);

  const handleGenderClick = () => {
    setIsGenderDropdownOpen(!isGenderDropdownOpen);
  };

  const genders = [
    { id: 1, name: "Male", value: "male" },
    { id: 2, name: "Female", value: "female" },
    { id: 3, name: "Other", value: "other" },
  ];

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(details);

    try {
      if (
        details.name === "" ||
        details.userName === "" ||
        details.password === "" ||
        details.confirmPassword === "" ||
        details.gender === ""
      ) {
        toast.error("Please fill in all required fields ");
        return;
      }

      if (details.password !== details.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const res = await fetch("http://localhost:8080/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });

      const data = await res.json();
      console.log(data);

      if (data.status !== "success") {
        toast.error(data?.message);
        return;
      }
      toast.success("User signed up successfully");
      localStorage.setItem("chatapptcn", data?.data?.token);
      setTimeout(() => {
        setAuth(true);
      }, 1000);
    } catch (err) {
      toast.error("Failed to sign up user");
      console.error(err);
    }
  };

  return (
    <div className="w-full min-h-screen py-5 background flex items-center justify-center  ">
      <div className="flex items-center justify-center h-auto z-50  w-[80%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[40%] rounded-2xl backdrop-blur-md bg-white/10 border border-white/10 shadow-lg">
        <form
          className="flex flex-col gap-4 w-full p-5 ]"
          onSubmit={handleSignUp}
        >
          <div className="mx-auto text-center text-3xl  font-bold text-white">
            <h1>Sign Up</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              {" "}
              <label className="text-sm font-medium text-white">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 text-sm text-white bg-white/10 border border-gray-300 rounded-md  focus:outline-none"
                placeholder="Enter Full Name Here"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white">UserName</label>
              <input
                type="text"
                name="userName"
                className="w-full px-4 py-2 text-sm text-white bg-white/10 border border-gray-300 rounded-md  focus:outline-none"
                placeholder="Enter UserName Here"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="grid  grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              {" "}
              <label className="text-sm font-medium text-white mt-2">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  autoComplete="new-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password "
                  className="w-full px-4 py-2 text-sm text-white bg-white/10 border border-gray-300 rounded-md  focus:outline-none"
                  onChange={handleInputChange}
                />

                <span className="absolute right-2 top-[25%] cursor-pointer">
                  {showPassword ? (
                    <FiEyeOff
                      className="text-gray-100 "
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <FiEye
                      className="text-gray-100 "
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white mt-2">
                confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder="Enter Confirm Password "
                  className="w-full px-4 py-2 text-sm text-white bg-white/10 border border-gray-300 rounded-md
        focus:outline-none
        "
                  onChange={handleInputChange}
                />
                <span
                  className="absolute right-2 top-[25%] cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff
                      className="text-gray-100 "
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  ) : (
                    <FiEye
                      className="text-gray-100 "
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* <div className="grid grid-cols-1 ">
            <div className="flex flex-col gap-2">
              {" "}
              <label className="text-sm font-medium text-white mt-2">
                Gender
              </label>
              <div className="relative">
                <div
                  className="w-full px-4 py-2 text-sm text-white bg-white/10 border border-gray-300 rounded-md
        focus:outline-none cursor-pointer
        "
                  value={details.gender}
                  onClick={handleGenderClick}
                >
                  {details.gender === ""
                    ? "Select Gender"
                    : genders.find((gender) => gender.value === details.gender)
                        .name}
                  <span className="absolute right-4 top-3">
                    <FaChevronDown />
                  </span>
                  <div className="absolute mt-2 bg-[#0d172d] backdrop-blur-md  flex flex-col gap-y-2  w-full right-0 px-2 rounded-xl  ">
                    {isGenderDropdownOpen &&
                      genders.map((gender) => (
                        <option
                          key={gender.id}
                          className="py-1"
                          value={gender.value}
                          onClick={() => {
                            setDetails({ ...details, gender: gender.value });
                            setIsGenderDropdownOpen(false);
                          }}
                        >
                          {gender.name}
                        </option>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="grid grid-cols-1">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white mt-2">
                Gender
              </label>
              <div className="relative">
                <div
                  className="w-full px-4 py-2 text-sm text-white bg-white/10 border border-gray-300 rounded-md
        focus:outline-none cursor-pointer"
                  value={details.gender}
                  onClick={handleGenderClick}
                >
                  {details.gender === ""
                    ? "Select Gender"
                    : genders.find((gender) => gender.value === details.gender)
                        .name}
                  <span className="absolute right-4 top-3">
                    <FaChevronDown />
                  </span>
                  <div
                    className={`absolute mt-2 bg-blue-900/80 backdrop-blur-md flex flex-col gap-y-2 w-full right-0 px-2 rounded-xl ${
                      isGenderDropdownOpen ? "block" : "hidden"
                    }`}
                  >
                    {isGenderDropdownOpen &&
                      genders.map((gender) => (
                        <option
                          key={gender.id}
                          className="py-1 px-2 text-white hover:bg-blue-700 rounded"
                          value={gender.value}
                          onClick={() => {
                            setDetails({ ...details, gender: gender.value });
                            setIsGenderDropdownOpen(false);
                          }}
                        >
                          {gender.name}
                        </option>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 mt-5"
            type="submit"
          >
            Sign Up
          </button>
          <p className="text-sm text-white cursor-pointer">
            Already Have An Account ?
            <Link to="/login">
              <span className="mx-2 font-semibold hover:underline">
                {" "}
                Sign In{" "}
              </span>
            </Link>
          </p>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default SignUp;
