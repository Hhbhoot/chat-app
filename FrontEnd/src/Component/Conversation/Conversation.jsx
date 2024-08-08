import React, { useEffect, useState } from "react";
import Conversations from "../Conversations/Conversations";
import { useAuthContex } from "../../Contex/AuthContex";
import useConversation from "../../Zustand/userConversation";

const Conversation = () => {
  const [conversation, setConversation] = useState([]);
  const { setSelectedConversation, selectedConversation } = useConversation();

  const fetchConversation = async () => {
    try {
      let token = localStorage.getItem("chatapptcn");
      if (!token) return; // If no token, return without making a request.

      const res = await fetch("http://localhost:8080/api/v1/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data?.status !== "success") {
        return; // If status is not success, return without showing the conversations.
      }
      setConversation(data?.data?.users);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConversation();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col gap-y-3 mt-6 overflow-auto  h-60   ">
      {conversation.length === 0 ? (
        <div className="flex items-center justify-center text-white">
          No conversations yet.
        </div>
      ) : (
        conversation.map((user, index) => (
          <Conversations
            lastIdx={index === conversation.length - 1}
            key={user._id}
            user={user}
          />
        ))
      )}
    </div>
  );
};

export default Conversation;
