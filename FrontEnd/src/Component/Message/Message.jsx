import React, { useEffect } from "react";
import useConversation from "../../Zustand/userConversation";
import { useAuthContex } from "../../Contex/AuthContex";

export const Message = ({ message }) => {
  const { authenticatedUSer } = useAuthContex();

  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authenticatedUSer._id;

  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authenticatedUSer.profileImage
    : selectedConversation?.profileImage;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor}  pb-2`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center"></div>
    </div>
  );
};
