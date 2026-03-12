import React, { useState, useEffect } from "react";
import { validateStudent } from "../utils/validation";

export default function StudentForm({ open, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        age: initialData.age?.toString() || "",
      });
    } else {
      setForm({ name: "", email: "", age: "" });
    }
    setErrors({});
  }, [open, initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateStudent(form);
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      onSubmit({ ...form, age: Number(form.age) });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <form
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          {initialData ? "Edit Student" : "Add Student"}
        </h2>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-200">Name</label>
          <input
            type="text"
            name="name"
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-200">Email</label>
          <input
            type="email"
            name="email"
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-200">Age</label>
          <input
            type="number"
            name="age"
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
              errors.age ? "border-red-500" : "border-gray-300"
            }`}
            value={form.age}
            onChange={handleChange}
          />
          {errors.age && <div className="text-red-500 text-sm mt-1">{errors.age}</div>}
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            {initialData ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
