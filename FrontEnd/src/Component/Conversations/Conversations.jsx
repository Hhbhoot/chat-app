import React from "react";
import useConversation from "../../Zustand/userConversation";
import { useSocketContex } from "../../Contex/SocketContex";

const Conversations = ({ user, lastIdx }) => {
  const { _id, name } = user;
  // console.log(user);

  const { onlineUser } = useSocketContex();

  const isOnline = onlineUser.includes(_id);

  console.log(isOnline);

  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user?._id;

  return (
    <>
      {" "}
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
        onClick={() => setSelectedConversation(user)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={user.profileImage} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{name}</p>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversations;
