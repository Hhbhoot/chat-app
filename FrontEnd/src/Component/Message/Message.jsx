import React, { useEffect } from "react";
import useConversation from "../../Zustand/userConversation";

export const Message = ({ message }) => {
  const { selectedConversation } = useConversation();
  console.log(selectedConversation._id);
  console.log(message.receiverId);

  Object.keys(message).forEach((key) => {
    console.log(key, message[key]);
  });

  useEffect(() => {}, []);

  return (
    <div className="flx flex-col  w-full">
      <div
        className={`chat ${
          selectedConversation._id === message.receiverId
            ? "chat-end"
            : "chat-start"
        }   `}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble">{message.message}</div>
        {/* <div className="chat-footer opacity-50">Delivered</div> */}
      </div>
    </div>
  );
};
