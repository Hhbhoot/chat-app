import React from "react";
import useConversation from "../../Zustand/userConversation";

const Conversations = ({ user, lastIdx }) => {
  const { _id, name } = user;
  // console.log(user);

  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user?._id;

  return (
    <>
      {" "}
      <div
        className={`flex items-center justify-normal gap-8 hover:bg-sky-500 p-2 cursor-pointer rounded-md 

          ${isSelected ? "bg-sky-500" : ""}  
            `}
        key={_id}
        onClick={() => setSelectedConversation(user)}
      >
        <img
          src="/images/image 48.png"
          className="w-8 h-8 rounded-full"
          alt=""
        />
        <p className="text-white">{name}</p>
      </div>
      {!lastIdx && <div className="border-b border-white"></div>}
    </>
  );
};

export default Conversations;
