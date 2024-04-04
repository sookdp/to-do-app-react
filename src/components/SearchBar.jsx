import React, { useState } from "react";
export default function SearchBar({ onSearch }){
    const [searchText, setSearchText] = useState("");

    const handleChange = (event) => {
        setSearchText(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <>
        <h2 className="mb-1 mt-2 font-bold md:text-xl text-stone-700">Search Tasks</h2>
        <input
            type="text"
            placeholder="Search tasks..."
            value={searchText}
            onChange={handleChange}
            className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        />
        </>
    );
}