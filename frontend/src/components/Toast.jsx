import React from "react";

export default function Toast({ message, show, onClose }) {
  if (!show) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-green-500 text-white px-6 py-3 rounded shadow-lg flex items-center gap-2 animate-fade-in">
        <span>{message}</span>
        <button
          className="ml-2 text-white hover:text-gray-200"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
}
