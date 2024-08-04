import React from "react";
import Search from "../Search/Search";
import Conversation from "../Conversation/Conversation";
import { CiLogout } from "react-icons/ci";
import { useAuthContex } from "../../Contex/AuthContex";
import { useNavigate } from "react-router";

const Sidebar = () => {
  const { setAuth } = useAuthContex();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("chatapptcn");
    setAuth(false);
    navigate("/login");
    return;
  };

  return (
    <div>
      <Search />
      <div className="border-b border-gray-400 py-3 px-3 "></div>
      <div className="overflow-auto">
        <Conversation />
      </div>
      <div className="absolute bottom-5 cursor-pointer">
        <CiLogout className="text-white w-5 h-5" onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Sidebar;
