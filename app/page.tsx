'use client';

import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';

export default function Home() {
  const students = useStore((state) => state.students);
  const addStudent = useStore((state) => state.addStudent);

  const handleQuickStart = () => {
    if (students.length === 0) {
      const studentId = addStudent({ name: 'Demo Student', email: 'demo@example.com' });
      window.location.href = `/students/${studentId}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Chess Improvement Site
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform chess report screenshots into personalized training plans with
            spaced repetition, progress tracking, and smart scheduling.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📸</div>
            <h3 className="text-xl font-semibold mb-2">Upload Reports</h3>
            <p className="text-gray-600">
              Upload up to 14 screenshots of chess reports and tag findings to specific skills.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Set Goals</h3>
            <p className="text-gray-600">
              Define training goals, time budgets, and skill priorities for personalized plans.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">
              Monitor improvement with visual charts and spaced repetition scheduling.
            </p>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="space-x-4">
            <Link
              href="/students"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              View Students
            </Link>
            {students.length === 0 && (
              <button
                onClick={handleQuickStart}
                className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Quick Start Demo
              </button>
            )}
          </div>
          <p className="text-sm text-gray-500">
            {students.length} {students.length === 1 ? 'student' : 'students'} registered
          </p>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <h4 className="font-semibold">Smart Task Scheduling</h4>
                <p className="text-sm text-gray-600">
                  Automatically generates daily/weekly tasks for tactics, endgames, openings, calculation, and time management
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🔄</span>
              <div>
                <h4 className="font-semibold">Spaced Repetition</h4>
                <p className="text-sm text-gray-600">
                  Optimizes learning with scientifically-proven spaced repetition algorithm
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">📋</span>
              <div>
                <h4 className="font-semibold">Reusable Templates</h4>
                <p className="text-sm text-gray-600">
                  Create and apply training templates across multiple students
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">📄</span>
              <div>
                <h4 className="font-semibold">PDF Export</h4>
                <p className="text-sm text-gray-600">
                  Export training plans and progress reports to PDF for offline access
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">📱</span>
              <div>
                <h4 className="font-semibold">Mobile Responsive</h4>
                <p className="text-sm text-gray-600">
                  Access and manage training plans on any device, anywhere
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">👥</span>
              <div>
                <h4 className="font-semibold">Multi-Student Support</h4>
                <p className="text-sm text-gray-600">
                  Manage training plans for multiple students from one account
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
