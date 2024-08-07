import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";

const Search = () => {
  const [search, setSearch] = useState("");
  const [conversation, setConversation] = useState([]);
  const [filteredConversation, setFilteredConversation] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search.length === 0) return;
    if (search.length < 3) {
      toast.error("Search term must be at least 3 characters long.");
      return;
    }

    try {
      let token = localStorage.getItem("chatapptcn");
      if (!token) return;

      const res = await fetch("http://localhost:8080/api/v1/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data?.status !== "success") {
        console.log(data?.message);
        return;
      }

      if (Array.isArray(data?.data?.users)) {
        setConversation(data.data.users);

        // Filter the conversations based on the search term
        const filtered = data.data.users.filter((user) =>
          user.name.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredConversation(filtered);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form className="flex items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full rounded-full max-w-xs"
        />
        <button className="ml-3 btn btn-circle bg-sky-500 text-white">
          <IoSearchSharp className="w-4 h-4 outline-none" />
        </button>
      </form>

      <div className="mt-4">
        {filteredConversation.length > 0 ? (
          filteredConversation.map((user) => (
            <div key={user._id} className="p-2 border-b">
              {user.name}
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Search;
