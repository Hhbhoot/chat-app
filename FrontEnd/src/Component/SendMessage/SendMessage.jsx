import React from "react";

export const SendMessage = () => {
  return (
    <div className="flex items-center w-full ">
      <input
        type="text"
        placeholder="Send Message..."
        className="input input-bordered rounded-full w-full "
      />
    </div>
  );
};
