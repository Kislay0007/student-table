import { useState, useEffect } from "react";
import studentsData from "../data/students.json";

export default function useStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setStudents(studentsData);
      setLoading(false);
    }, 1200);
  }, []);

  const addStudent = (student) => {
    setStudents((prev) => [
      { ...student, id: Date.now().toString() },
      ...prev,
    ]);
  };

  const updateStudent = (id, updated) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
    );
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return {
    students,
    loading,
    addStudent,
    updateStudent,
    deleteStudent,
    setStudents,
  };
}
