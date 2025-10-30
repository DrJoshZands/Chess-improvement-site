import { TrainingTask } from '../types';

/**
 * Calculate next repetition date based on spaced repetition algorithm
 * Uses a simplified SM-2 algorithm
 */
export function calculateNextRepetition(
  task: TrainingTask,
  quality: number // 0-5 rating of how well the task was performed
): Date {
  const now = new Date();
  let interval = 1;

  if (task.repetitionCount === 0) {
    interval = 1;
  } else if (task.repetitionCount === 1) {
    interval = 6;
  } else {
    // Simplified calculation
    const previousInterval = task.nextRepetitionDate
      ? Math.max(1, Math.floor((task.nextRepetitionDate.getTime() - task.scheduledDate.getTime()) / (1000 * 60 * 60 * 24)))
      : 6;
    
    const easinessFactor = Math.max(1.3, 2.5 + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
    interval = Math.round(previousInterval * easinessFactor);
  }

  const nextDate = new Date(now);
  nextDate.setDate(nextDate.getDate() + interval);
  return nextDate;
}

/**
 * Generate tasks with spaced repetition schedule
 */
export function generateSpacedRepetitionSchedule(
  baseTask: Omit<TrainingTask, 'id' | 'repetitionCount' | 'nextRepetitionDate'>,
  startDate: Date,
  repetitions: number
): Omit<TrainingTask, 'id'>[] {
  const tasks: Omit<TrainingTask, 'id'>[] = [];
  let currentDate = new Date(startDate);

  for (let i = 0; i < repetitions; i++) {
    tasks.push({
      ...baseTask,
      scheduledDate: new Date(currentDate),
      repetitionCount: i,
      nextRepetitionDate: i < repetitions - 1 ? undefined : undefined,
    });

    // Calculate next interval (1, 3, 7, 14, 30 days pattern)
    const intervals = [1, 3, 7, 14, 30];
    const interval = intervals[Math.min(i, intervals.length - 1)];
    currentDate.setDate(currentDate.getDate() + interval);
  }

  return tasks;
}
