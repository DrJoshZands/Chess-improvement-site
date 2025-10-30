'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useStore } from '@/lib/store/useStore';
import { format } from 'date-fns';

export default function StudentDashboard() {
  const params = useParams();
  const studentId = params.id as string;

  const students = useStore((state) => state.students);
  const reports = useStore((state) => state.reports);
  const plans = useStore((state) => state.plans);
  const goals = useStore((state) => state.goals);

  const student = students.find((s) => s.id === studentId);
  const studentReports = reports.filter((r) => r.studentId === studentId);
  const studentPlans = plans.filter((p) => p.studentId === studentId);
  const studentGoals = goals.filter((g) => g.studentId === studentId);

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Student Not Found</h1>
          <Link href="/students" className="text-blue-600 hover:underline">
            Go to Students List
          </Link>
        </div>
      </div>
    );
  }

  const activePlans = studentPlans.filter(
    (p) => new Date(p.endDate) >= new Date()
  );
  const completedTasks = studentPlans.reduce(
    (count, plan) => count + plan.tasks.filter((t) => t.completed).length,
    0
  );
  const totalTasks = studentPlans.reduce(
    (count, plan) => count + plan.tasks.length,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/students"
            className="text-blue-600 hover:text-blue-700 mb-4 inline-block"
          >
            ← Back to Students
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {student.name}
              </h1>
              {student.email && (
                <p className="text-gray-600">{student.email}</p>
              )}
            </div>
            <div className="text-6xl">👤</div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-bold text-gray-900">{studentReports.length}</div>
            <div className="text-sm text-gray-600">Reports</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-2">📋</div>
            <div className="text-2xl font-bold text-gray-900">{activePlans.length}</div>
            <div className="text-sm text-gray-600">Active Plans</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-gray-900">{studentGoals.length}</div>
            <div className="text-sm text-gray-600">Goals</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-2xl font-bold text-gray-900">
              {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
            </div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href={`/students/${studentId}/reports/new`}
                className="block bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                📸 Upload New Report
              </Link>
              <Link
                href={`/students/${studentId}/goals`}
                className="block bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors text-center"
              >
                🎯 Manage Goals
              </Link>
              <Link
                href={`/students/${studentId}/plans`}
                className="block bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors text-center"
              >
                📋 View Training Plans
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
            {studentReports.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No reports uploaded yet
              </p>
            ) : (
              <div className="space-y-3">
                {studentReports.slice(0, 3).map((report) => (
                  <Link
                    key={report.id}
                    href={`/students/${studentId}/reports/${report.id}`}
                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">
                          {report.screenshots.length} Screenshots
                        </div>
                        <div className="text-sm text-gray-600">
                          {format(new Date(report.createdAt), 'MMM d, yyyy')}
                        </div>
                      </div>
                      <span className="text-gray-400">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {activePlans.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Active Training Plans</h2>
            <div className="space-y-4">
              {activePlans.map((plan) => {
                const planCompleted = plan.tasks.filter((t) => t.completed).length;
                const planTotal = plan.tasks.length;
                const progress = planTotal > 0 ? (planCompleted / planTotal) * 100 : 0;

                return (
                  <div key={plan.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">Training Plan</h3>
                        <p className="text-sm text-gray-600">
                          {format(new Date(plan.startDate), 'MMM d')} -{' '}
                          {format(new Date(plan.endDate), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <Link
                        href={`/students/${studentId}/plans/${plan.id}`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        View →
                      </Link>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      {planCompleted} / {planTotal} tasks completed
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
