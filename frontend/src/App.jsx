import React, { useState, useEffect } from 'react';

export default function StudentTable() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newStudent, setNewStudent] = useState({ name: "", email: "", age: "" });

  // 1. INITIALIZE FROM LOCALSTORAGE
  // This checks if we have saved data; if not, it uses the default 3 students.
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('studentData');
    return savedStudents ? JSON.parse(savedStudents) : [
      { name: "Alice Johnson", email: "alice.johnson@example.com", age: 21 },
      { name: "Bob Smith", email: "bob.smith@example.com", age: 22 },
      { name: "Charlie Brown", email: "charlie.brown@example.com", age: 20 },
    ];
  });

  // 2. SAVE TO LOCALSTORAGE AUTOMATICALLY
  // Every time the 'students' array changes, this runs and saves the new list.
  useEffect(() => {
    localStorage.setItem('studentData', JSON.stringify(students));
  }, [students]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.email) return;

    if (editingIndex !== null) {
      const updatedStudents = [...students];
      updatedStudents[editingIndex] = newStudent;
      setStudents(updatedStudents);
      setEditingIndex(null);
    } else {
      setStudents([...students, newStudent]);
    }
    setNewStudent({ name: "", email: "", age: "" });
    setShowModal(false);
  };

  const handleDelete = (indexToDelete) => {
    if (window.confirm("Are you sure you want to remove this student?")) {
      const filtered = students.filter((_, index) => index !== indexToDelete);
      setStudents(filtered);
    }
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setNewStudent(students[index]);
    setShowModal(true);
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} min-h-screen transition-colors duration-300 p-4 md:p-10 font-sans`}>
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className={`text-3xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>Student Directory</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button 
              onClick={() => { setEditingIndex(null); setNewStudent({name:"", email:"", age:""}); setShowModal(true); }} 
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg"
            >
              + Add Student
            </button>
          </div>
        </header>

        {/* MODAL (Keep your existing Modal code here) */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className={`${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'} p-8 rounded-3xl shadow-2xl border w-full max-w-md`}>
              <h2 className="text-2xl font-bold mb-6">{editingIndex !== null ? 'Edit Student' : 'Add New Student'}</h2>
              <form onSubmit={handleSave} className="space-y-4">
                <input required className={`w-full p-3 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50'}`} placeholder="Full Name" value={newStudent.name} onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} />
                <input required className={`w-full p-3 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50'}`} placeholder="Email" value={newStudent.email} onChange={(e) => setNewStudent({...newStudent, email: e.target.value})} />
                <input className={`w-full p-3 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50'}`} placeholder="Age" type="number" value={newStudent.age} onChange={(e) => setNewStudent({...newStudent, age: e.target.value})} />
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 text-slate-500">Cancel</button>
                  <button type="submit" className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold">
                    {editingIndex !== null ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* SEARCH BAR (Added back!) */}
        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-4 rounded-2xl shadow-sm border`}>
          <input 
            type="text" 
            placeholder="Search students..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full px-4 py-2.5 rounded-xl border outline-none ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
          />
        </div>

        {/* DATA TABLE */}
        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl shadow-xl border overflow-hidden`}>
          <table className="w-full text-left">
            <thead>
              <tr className={`${darkMode ? 'bg-slate-900/50 text-slate-400' : 'bg-slate-50 text-slate-500'} border-b ${darkMode ? 'border-slate-700' : 'border-slate-100'}`}>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center">Age</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-slate-700' : 'divide-slate-100'}`}>
              {filteredStudents.map((student, idx) => (
                <tr key={idx} className="hover:bg-indigo-500/5 transition-colors">
                  <td className="px-6 py-4 font-semibold">{student.name}</td>
                  <td className="px-6 py-4 opacity-70">{student.email}</td>
                  <td className="px-6 py-4 text-center">{student.age}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => startEdit(idx)} className="text-indigo-500 hover:text-indigo-400 mr-4 font-medium">Edit</button>
                    <button onClick={() => handleDelete(idx)} className="text-red-500 hover:text-red-400 font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredStudents.length === 0 && (
            <div className="p-10 text-center text-slate-500">No students found.</div>
          )}
        </div>

      </div>
    </div>
  );
}