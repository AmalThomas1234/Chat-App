import React, { useCallback } from "react";
import { IoMdSearch } from "react-icons/io";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import { useState } from "react";
import { debounce } from "lodash";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm.length < 3) {
        return toast.error("Search term must be at least 3 characters long");
      }

      const conversation = conversations.find((c) =>
        c.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (conversation) {
        setSelectedConversation(conversation);
        setSearch("");
      } else {
        toast.error("No such user found");
      }
    }, 300),
    [conversations, setSelectedConversation]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      return;
    }
    handleSearch(search);
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoMdSearch className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
