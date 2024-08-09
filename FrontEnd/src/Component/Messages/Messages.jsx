import React, { useEffect, useState } from "react";
import { Message } from "../Message/Message";
import useConversation from "../../Zustand/userConversation";
import { useSocketContex } from "../../Contex/SocketContex";

export const Messages = () => {
  const { selectedConversation, messages, setMessages, addMessage } =
    useConversation();
  const [loading, setLoading] = useState(false);
  const { socket } = useSocketContex();

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      setMessages({ ...messages, newMessage });
    });
    return () => socket.off("message");
  }, [socket, messages, addMessage]);

  const fetchMessage = async () => {
    setLoading(true);
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

      // Ensure data is an array before setting it
      if (Array.isArray(data?.data)) {
        setMessages(data?.data);
      } else {
        console.error("Fetched data is not an array", data?.data);
      }
    } catch (error) {
      console.error("Error fetching messages", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedConversation?._id) {
      fetchMessage();
    }
  }, [selectedConversation._id]);

  if (!Array.isArray(messages)) {
    console.error("Messages state is not an array", messages);
    return null; // or some fallback UI
  }

  return (
    <div className="flex flex-col overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div key={index}>
            <Message message={message} />
          </div>
        ))}
    </div>
  );
};
