import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="mb-0 flex justify-between items-center w-full">
      <input
        type="text"
        placeholder="Search by name or email..."
        className="w-full max-w-xs px-4 py-2 border-2 border-blue-200 dark:border-purple-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
