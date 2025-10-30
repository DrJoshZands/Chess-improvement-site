import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Student,
  ChessReport,
  Screenshot,
  Finding,
  Goal,
  TimeBudget,
  TrainingPlan,
  Template,
  ProgressEntry,
  SkillType,
} from '../types';

interface AppState {
  students: Student[];
  reports: ChessReport[];
  findings: Finding[];
  goals: Goal[];
  timeBudgets: TimeBudget[];
  plans: TrainingPlan[];
  templates: Template[];
  progress: ProgressEntry[];
  currentStudent: Student | null;
  currentReport: ChessReport | null;

  // Student actions
  addStudent: (student: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateStudent: (id: string, data: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  setCurrentStudent: (student: Student | null) => void;

  // Report actions
  addReport: (report: Omit<ChessReport, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateReport: (id: string, data: Partial<ChessReport>) => void;
  deleteReport: (id: string) => void;
  setCurrentReport: (report: ChessReport | null) => void;
  addScreenshot: (reportId: string, screenshot: Omit<Screenshot, 'id' | 'uploadedAt' | 'reportId'>) => void;

  // Finding actions
  addFinding: (finding: Omit<Finding, 'id' | 'createdAt'>) => string;
  updateFinding: (id: string, data: Partial<Finding>) => void;
  deleteFinding: (id: string) => void;

  // Goal actions
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateGoal: (id: string, data: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;

  // Time budget actions
  setTimeBudget: (timeBudget: Omit<TimeBudget, 'id'>) => void;
  getTimeBudget: (studentId: string) => TimeBudget | undefined;

  // Plan actions
  addPlan: (plan: Omit<TrainingPlan, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updatePlan: (id: string, data: Partial<TrainingPlan>) => void;
  deletePlan: (id: string) => void;
  completeTask: (planId: string, taskId: string) => void;

  // Template actions
  addTemplate: (template: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateTemplate: (id: string, data: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;

  // Progress actions
  addProgress: (progress: Omit<ProgressEntry, 'id'>) => void;
  getProgressByStudent: (studentId: string) => ProgressEntry[];
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      students: [],
      reports: [],
      findings: [],
      goals: [],
      timeBudgets: [],
      plans: [],
      templates: [],
      progress: [],
      currentStudent: null,
      currentReport: null,

      // Student actions
      addStudent: (student) => {
        const id = generateId();
        const newStudent: Student = {
          ...student,
          id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({ students: [...state.students, newStudent] }));
        return id;
      },

      updateStudent: (id, data) => {
        set((state) => ({
          students: state.students.map((s) =>
            s.id === id ? { ...s, ...data, updatedAt: new Date() } : s
          ),
        }));
      },

      deleteStudent: (id) => {
        set((state) => ({
          students: state.students.filter((s) => s.id !== id),
          currentStudent: state.currentStudent?.id === id ? null : state.currentStudent,
        }));
      },

      setCurrentStudent: (student) => {
        set({ currentStudent: student });
      },

      // Report actions
      addReport: (report) => {
        const id = generateId();
        const newReport: ChessReport = {
          ...report,
          id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({ reports: [...state.reports, newReport] }));
        return id;
      },

      updateReport: (id, data) => {
        set((state) => ({
          reports: state.reports.map((r) =>
            r.id === id ? { ...r, ...data, updatedAt: new Date() } : r
          ),
        }));
      },

      deleteReport: (id) => {
        set((state) => ({
          reports: state.reports.filter((r) => r.id !== id),
          currentReport: state.currentReport?.id === id ? null : state.currentReport,
        }));
      },

      setCurrentReport: (report) => {
        set({ currentReport: report });
      },

      addScreenshot: (reportId, screenshot) => {
        set((state) => ({
          reports: state.reports.map((r) =>
            r.id === reportId
              ? {
                  ...r,
                  screenshots: [
                    ...r.screenshots,
                    {
                      ...screenshot,
                      id: generateId(),
                      uploadedAt: new Date(),
                      reportId,
                    },
                  ],
                  updatedAt: new Date(),
                }
              : r
          ),
        }));
      },

      // Finding actions
      addFinding: (finding) => {
        const id = generateId();
        const newFinding: Finding = {
          ...finding,
          id,
          createdAt: new Date(),
        };
        set((state) => ({ findings: [...state.findings, newFinding] }));
        return id;
      },

      updateFinding: (id, data) => {
        set((state) => ({
          findings: state.findings.map((f) => (f.id === id ? { ...f, ...data } : f)),
        }));
      },

      deleteFinding: (id) => {
        set((state) => ({
          findings: state.findings.filter((f) => f.id !== id),
        }));
      },

      // Goal actions
      addGoal: (goal) => {
        const id = generateId();
        const newGoal: Goal = {
          ...goal,
          id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({ goals: [...state.goals, newGoal] }));
        return id;
      },

      updateGoal: (id, data) => {
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id ? { ...g, ...data, updatedAt: new Date() } : g
          ),
        }));
      },

      deleteGoal: (id) => {
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== id),
        }));
      },

      // Time budget actions
      setTimeBudget: (timeBudget) => {
        const id = generateId();
        const newBudget: TimeBudget = { ...timeBudget, id };
        set((state) => ({
          timeBudgets: [
            ...state.timeBudgets.filter((tb) => tb.studentId !== timeBudget.studentId),
            newBudget,
          ],
        }));
      },

      getTimeBudget: (studentId) => {
        return get().timeBudgets.find((tb) => tb.studentId === studentId);
      },

      // Plan actions
      addPlan: (plan) => {
        const id = generateId();
        const newPlan: TrainingPlan = {
          ...plan,
          id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({ plans: [...state.plans, newPlan] }));
        return id;
      },

      updatePlan: (id, data) => {
        set((state) => ({
          plans: state.plans.map((p) =>
            p.id === id ? { ...p, ...data, updatedAt: new Date() } : p
          ),
        }));
      },

      deletePlan: (id) => {
        set((state) => ({
          plans: state.plans.filter((p) => p.id !== id),
        }));
      },

      completeTask: (planId, taskId) => {
        set((state) => ({
          plans: state.plans.map((p) =>
            p.id === planId
              ? {
                  ...p,
                  tasks: p.tasks.map((t) =>
                    t.id === taskId
                      ? { ...t, completed: true, completedAt: new Date() }
                      : t
                  ),
                  updatedAt: new Date(),
                }
              : p
          ),
        }));
      },

      // Template actions
      addTemplate: (template) => {
        const id = generateId();
        const newTemplate: Template = {
          ...template,
          id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({ templates: [...state.templates, newTemplate] }));
        return id;
      },

      updateTemplate: (id, data) => {
        set((state) => ({
          templates: state.templates.map((t) =>
            t.id === id ? { ...t, ...data, updatedAt: new Date() } : t
          ),
        }));
      },

      deleteTemplate: (id) => {
        set((state) => ({
          templates: state.templates.filter((t) => t.id !== id),
        }));
      },

      // Progress actions
      addProgress: (progress) => {
        const newProgress: ProgressEntry = {
          ...progress,
          id: generateId(),
        };
        set((state) => ({ progress: [...state.progress, newProgress] }));
      },

      getProgressByStudent: (studentId) => {
        return get().progress.filter((p) => p.studentId === studentId);
      },
    }),
    {
      name: 'chess-improvement-storage',
    }
  )
);
