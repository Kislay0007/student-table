import React from "react";

export default function StudentTable({ students, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-2xl bg-white/80 dark:bg-gray-900/80">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Name</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Email</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Age</th>
            <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-8 text-gray-400">No students found.</td>
            </tr>
          ) : (
            students.map((student, idx) => (
              <tr
                key={student.id}
                className={
                  `transition-all ${idx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-blue-50 dark:bg-gray-800'} hover:bg-blue-100 dark:hover:bg-gray-700`
                }
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100 font-medium">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{student.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{student.age}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center flex gap-2 justify-center">
                  <button
                    className="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold shadow hover:from-blue-500 hover:to-purple-600 transition-all"
                    onClick={() => onEdit(student)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="px-3 py-1 rounded-lg bg-gradient-to-r from-red-400 to-pink-500 text-white font-semibold shadow hover:from-red-500 hover:to-pink-600 transition-all"
                    onClick={() => onDelete(student)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
