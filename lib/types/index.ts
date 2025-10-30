export interface Student {
  id: string;
  name: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Screenshot {
  id: string;
  url: string;
  file: File | null;
  uploadedAt: Date;
  reportId: string;
}

export interface ChessReport {
  id: string;
  studentId: string;
  screenshots: Screenshot[];
  findings: Finding[];
  createdAt: Date;
  updatedAt: Date;
}

export type SkillType =
  | 'tactics'
  | 'endgames'
  | 'openings'
  | 'calculation'
  | 'timeManagement';

export interface Skill {
  type: SkillType;
  name: string;
  description: string;
  icon?: string;
}

export interface Finding {
  id: string;
  reportId: string;
  screenshotId: string;
  description: string;
  skillTags: SkillType[];
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export interface Goal {
  id: string;
  studentId: string;
  skillType: SkillType;
  description: string;
  targetValue?: number;
  currentValue?: number;
  deadline?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeBudget {
  id: string;
  studentId: string;
  dailyMinutes: number;
  weeklyMinutes: number;
  skillDistribution: Record<SkillType, number>; // percentage
}

export interface TrainingTask {
  id: string;
  planId: string;
  title: string;
  description: string;
  skillType: SkillType;
  durationMinutes: number;
  scheduledDate: Date;
  completed: boolean;
  completedAt?: Date;
  difficulty?: 'easy' | 'medium' | 'hard';
  repetitionCount: number;
  nextRepetitionDate?: Date;
}

export interface TrainingPlan {
  id: string;
  studentId: string;
  reportId: string;
  startDate: Date;
  endDate: Date;
  tasks: TrainingTask[];
  goals: Goal[];
  timeBudget: TimeBudget;
  createdAt: Date;
  updatedAt: Date;
  templateId?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  defaultTimeBudget: Omit<TimeBudget, 'id' | 'studentId'>;
  defaultGoals: Omit<Goal, 'id' | 'studentId' | 'createdAt' | 'updatedAt'>[];
  skillFocus: SkillType[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProgressEntry {
  id: string;
  studentId: string;
  taskId: string;
  date: Date;
  score?: number;
  notes?: string;
  timeSpentMinutes: number;
}

export interface ChartData {
  date: string;
  [key: string]: string | number;
}
