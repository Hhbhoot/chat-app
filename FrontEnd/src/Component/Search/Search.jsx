import React from "react";
import { IoSearchSharp } from "react-icons/io5";

const Search = () => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Seacrh..."
        className="input input-bordered w-full rounded-full max-w-xs"
      />

      <button className="ml-3 btn btn-circle bg-sky-500 text-white ">
        <IoSearchSharp className="w-4 h-4  outline-none" />
      </button>
    </div>
  );
};

export default Search;
