import React, { useEffect, useRef, useState } from "react";
import { Message } from "../Message/Message";
import useConversation from "../../Zustand/userConversation";
import { useSocketContex } from "../../Contex/SocketContex";
import Config from "../../Config/Config";

export const Messages = () => {
  const { selectedConversation, messages, setMessages } = useConversation();
  const [loading, setLoading] = useState(false);
  const { socket } = useSocketContex();

  const fetchMessage = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${Config.apiurl}/api/v1/messages/get/${selectedConversation._id}`,
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

      setMessages(data?.data);
    } catch (error) {
      console.error("Error fetching messages", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(messages.length);

  useEffect(() => {
    if (selectedConversation?._id) {
      fetchMessage();
    }
  }, [selectedConversation._id, setMessages]);

  if (!Array.isArray(messages)) {
    console.error("Messages state is not an array", messages);
    return null; // or some fallback UI
  }

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      console.log("newMessage", messages.length);

      setMessages([...messages, newMessage]);

      setTimeout(() => {
        console.log("all message length", messages.length);
      }, 5000);
    });
    return () => socket.off("newMessage");
  }, [socket, setMessages]);

  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [selectedConversation._id, messages]);

  return (
    <div className="flex flex-col overflow-auto ">
      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div key={index} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
    </div>
  );
};
