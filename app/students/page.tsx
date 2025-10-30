'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useStore } from '@/lib/store/useStore';

export default function StudentsPage() {
  const students = useStore((state) => state.students);
  const addStudent = useStore((state) => state.addStudent);
  const deleteStudent = useStore((state) => state.deleteStudent);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addStudent({ name: name.trim(), email: email.trim() || undefined });
      setName('');
      setEmail('');
      setShowForm(false);
    }
  };

  const handleDelete = (id: string, studentName: string) => {
    if (confirm(`Are you sure you want to delete ${studentName}?`)) {
      deleteStudent(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Students</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showForm ? 'Cancel' : '+ Add Student'}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter student name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Create Student
              </button>
            </form>
          </div>
        )}

        {students.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow-md text-center">
            <div className="text-6xl mb-4">👤</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No Students Yet
            </h2>
            <p className="text-gray-500 mb-6">
              Add your first student to start creating training plans
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add First Student
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-4xl">👤</div>
                  <button
                    onClick={() => handleDelete(student.id, student.name)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete student"
                  >
                    🗑️
                  </button>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {student.name}
                </h3>
                {student.email && (
                  <p className="text-sm text-gray-600 mb-4">{student.email}</p>
                )}
                <div className="space-y-2">
                  <Link
                    href={`/students/${student.id}`}
                    className="block text-center bg-blue-50 text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition-colors"
                  >
                    View Dashboard
                  </Link>
                  <Link
                    href={`/students/${student.id}/reports/new`}
                    className="block text-center bg-green-50 text-green-600 px-4 py-2 rounded hover:bg-green-100 transition-colors"
                  >
                    Upload Report
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
