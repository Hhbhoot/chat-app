import React from "react";
import useConversation from "../../Zustand/userConversation";

export const Header = () => {
  const { selectedConversation } = useConversation();

  return (
    <div className="w-full py-2 bg-gray-900 text-white px-4 rounded-md">
      <p>To : {selectedConversation.name}</p>
    </div>
  );
};
