import React, { useEffect, useState } from "react";
import { Message } from "../Message/Message";
import useConversation from "../../Zustand/userConversation";

export const Messages = () => {
  const { selectedConversation, messages, addMessage } = useConversation();

  const fetchMessage = async () => {
    if (!selectedConversation?._id) {
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/messages/get/${selectedConversation._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("chatapptcn")}`,
          },
        }
      );
      const data = await res.json();

      if (data?.status !== "success") {
        console.error(data?.message);
        return;
      }

      // Ensure data is an array before adding it
      if (Array.isArray(data?.data)) {
        addMessage(data?.data);
      } else {
        console.error("Fetched data is not an array", data?.data);
      }
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  useEffect(() => {
    fetchMessage();
    // eslint-disable-next-line
  }, [selectedConversation._id]);

  if (!Array.isArray(messages)) {
    console.error("Messages state is not an array", messages);
    return null; // or some fallback UI
  }

  useEffect(() => {}, [messages, addMessage]);

  return (
    <div className="flex flex-col overflow-auto">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
};
