import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import useConversation from "../../Zustand/userConversation";
import Toaster, { toast } from "react-hot-toast";

export const SendMessage = () => {
  const [text, setText] = useState("");
  const { selectedConversation, addMessage } = useConversation();
  const { _id: id } = selectedConversation;

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!text) {
      toast.error("Please enter a message.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/messages/send/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("chatapptcn")}`,
          },
          body: JSON.stringify({ message: text }),
        }
      );

      const data = await res.json();

      if (data?.status !== "success") {
        console.error(data?.message);
        return;
      }

      addMessage(data?.data?.newMessage);

      // Reset input field after sending message
      setText("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message");
    }
  };

  return (
    <div>
      <form className="flex items-center w-full ">
        <div className="relative w-full">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Send Message..."
            className="input input-bordered rounded-full w-full "
          />

          <IoIosSend
            className="w-6 h-6  right-4 bottom-3 absolute cursor-pointer"
            onClick={handleSendMessage}
          />
        </div>
      </form>
    </div>
  );
};
