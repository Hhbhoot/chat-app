import React, { useEffect, useState } from "react";
import { Message } from "../Message/Message";
import useConversation from "../../Zustand/userConversation";

export const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { selectedConversation } = useConversation();

  // const { _id } = selectedConversation;
  const _id = "66a50b78cf3c61a0a3742659";
  const fetchMessage = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/messages/get/${_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("chatapptcn")}`,
          },
        }
      );
      const data = await res.json();
      console.log(messages);

      if (data?.status !== "success") {
        console.error(data?.message);
        return;
      }
      setMessages(data?.data);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  useEffect(() => {
    fetchMessage();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex items-start">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
};
