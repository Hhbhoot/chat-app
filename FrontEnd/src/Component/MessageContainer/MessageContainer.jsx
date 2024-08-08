import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { SendMessage } from "../SendMessage/SendMessage";
import { Messages } from "../Messages/Messages";
import { PiChatsCircle } from "react-icons/pi";
import useConversation from "../../Zustand/userConversation";
import { useAuthContex } from "../../Contex/AuthContex";

export const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { authenticatedUSer } = useAuthContex();

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, []);

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
          <NoChatSelected authenticatedUSer={authenticatedUSer} />
        </div>
      )}
    </div>
  );
};

const NoChatSelected = ({ authenticatedUSer }) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center text-white w-full">
      <p>Welcome 👏 {authenticatedUSer.name}</p>
      <p>Select a chat to start Messaging</p>
      <span>
        <PiChatsCircle className="w-10 h-10" />
      </span>
    </div>
  );
};
