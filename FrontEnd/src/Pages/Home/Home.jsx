import React from "react";
import Sidebar from "../../Component/Sidebar/Sidebar";
import { MessageContainer } from "../../Component/MessageContainer/MessageContainer";

const Home = () => {
  return (
    <div className="w-full h-screen background py-5 flex items-center justify-center ">
      <div
        className="flex items-start justify-center p-5  z-50 h-[450px]  
       rounded-2xl backdrop-blur-md bg-white/10 border border-white/10 shadow-lg gap-5"
      >
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
