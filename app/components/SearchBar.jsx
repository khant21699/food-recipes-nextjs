"use client";
import React from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.dishname.value;
    router.push(`/result?category=Search&param=${name}`);
    e.target.dishname.value = "";
  };
  return (
    <div className="w-full">
      <form
        className="w-full px-[10%] py-5 max-md:px-0 flex "
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="dishname"
          className="h-[50px] p-2 outline-none focus:border-green-500 w-4/5 border-[2px] text-black border-black"
        />
        <button className="bg-green-500 w-1/5 h-[50px]" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
