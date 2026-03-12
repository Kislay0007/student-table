import React, { useState, useMemo } from "react";
import useStudents from "../hooks/useStudents";
import StudentTable from "../components/StudentTable";
import StudentForm from "../components/StudentForm";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import ExcelDownload from "../components/ExcelDownload";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";

export default function Dashboard() {
  const {
    students,
    loading,
    addStudent,
    updateStudent,
    deleteStudent,
  } = useStudents();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  React.useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q)
    );
  }, [students, search]);

  const handleAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = (student) => {
    setEditData(student);
    setModalOpen(true);
  };

  const handleDelete = (student) => {
    setToDelete(student);
    setConfirmOpen(true);
  };

  const handleFormSubmit = (data) => {
    if (editData) {
      updateStudent(editData.id, data);
      setToast({ show: true, message: "Student updated successfully!" });
    } else {
      addStudent(data);
      setToast({ show: true, message: "Student added successfully!" });
    }
    setModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (toDelete) {
      deleteStudent(toDelete.id);
      setToast({ show: true, message: "Student deleted successfully!" });
    }
    setConfirmOpen(false);
    setToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-2 transition-colors duration-300">
      {/* Theme Toggle Button */}
      <button
        className="fixed top-6 right-6 z-50 bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg p-3 hover:scale-110 transition-all"
        onClick={() => setDark((d) => !d)}
        aria-label="Toggle theme"
      >
        {dark ? (
          <span className="text-yellow-300 text-2xl">🌞</span>
        ) : (
          <span className="text-gray-700 text-2xl">🌙</span>
        )}
      </button>
      <div className="max-w-5xl mx-auto bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-2xl p-8 backdrop-blur-md border border-gray-200 dark:border-gray-800">
        <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          Students Table
        </h1>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
          <ExcelDownload data={students} filteredData={filtered} />
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg shadow-lg font-semibold transition-all duration-200"
            onClick={handleAdd}
          >
            <span className="inline-block align-middle mr-2">➕</span> Add Student
          </button>
        </div>
        <div className="rounded-xl overflow-hidden shadow-xl bg-white/70 dark:bg-gray-800/70">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <StudentTable
              students={filtered}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
        <StudentForm
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleFormSubmit}
          initialData={editData}
        />
        <ConfirmDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          message={`Are you sure you want to delete ${toDelete?.name}?`}
        />
        <Toast
          message={toast.message}
          show={toast.show}
          onClose={() => setToast({ show: false, message: "" })}
        />
      </div>
    </div>
  );
}
