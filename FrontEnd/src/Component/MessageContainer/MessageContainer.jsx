import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { SendMessage } from "../SendMessage/SendMessage";
import { Messages } from "../Messages/Messages";
import { PiChatsCircle } from "react-icons/pi";
import useConversation from "../../Zustand/userConversation";

export const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => {
      // cleanup function here
      setSelectedConversation(null);
    };
  }, [setSelectedConversation._id]);

  return (
    <div className="md:min-w-[450px] px-4 border-l self-stretch flex items-center ">
      {selectedConversation ? (
        <>
          <div className=" flex flex-col justify-between w-full h-full  border-white">
            <Header />
            <Messages />
            <SendMessage />
          </div>
        </>
      ) : (
        <div className="flex items-center w-full justify-center">
          <NoChatSelected />
        </div>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center text-white w-full">
      <p>Welcome 👏 John Doe</p>
      <p>Select a chat to start Messaging</p>
      <span>
        <PiChatsCircle className="w-10 h-10" />
      </span>
    </div>
  );
};
