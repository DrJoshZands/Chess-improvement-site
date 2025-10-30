import { TrainingTask, TimeBudget, Goal, Finding, SkillType } from '../types';
import { generateSpacedRepetitionSchedule } from './spacedRepetition';

/**
 * Generate training tasks based on findings, goals, and time budget
 */
export function generateTrainingTasks(
  planId: string,
  findings: Finding[],
  goals: Goal[],
  timeBudget: TimeBudget,
  startDate: Date,
  endDate: Date
): Omit<TrainingTask, 'id'>[] {
  const tasks: Omit<TrainingTask, 'id'>[] = [];
  const daysInPlan = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const dailyMinutes = timeBudget.dailyMinutes;

  // Group findings by skill type
  const findingsBySkill: Record<SkillType, Finding[]> = {
    tactics: [],
    endgames: [],
    openings: [],
    calculation: [],
    timeManagement: [],
  };

  findings.forEach(finding => {
    finding.skillTags.forEach(skillType => {
      findingsBySkill[skillType].push(finding);
    });
  });

  // Calculate tasks per skill based on distribution
  const skillTypes: SkillType[] = ['tactics', 'endgames', 'openings', 'calculation', 'timeManagement'];
  
  for (let day = 0; day < daysInPlan; day++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + day);

    let remainingMinutes = dailyMinutes;
    
    skillTypes.forEach(skillType => {
      const distribution = timeBudget.skillDistribution[skillType] || 0;
      const skillMinutes = Math.floor((dailyMinutes * distribution) / 100);
      
      if (skillMinutes > 0 && remainingMinutes > 0) {
        const skillFindings = findingsBySkill[skillType];
        const relevantGoals = goals.filter(g => g.skillType === skillType);
        
        // Create task based on findings
        if (skillFindings.length > 0 || relevantGoals.length > 0) {
          const finding = skillFindings[day % Math.max(skillFindings.length, 1)];
          const goal = relevantGoals[0];
          
          tasks.push({
            planId,
            title: `${skillType.charAt(0).toUpperCase() + skillType.slice(1)} Practice`,
            description: finding?.description || goal?.description || `Practice ${skillType}`,
            skillType,
            durationMinutes: Math.min(skillMinutes, remainingMinutes),
            scheduledDate: currentDate,
            completed: false,
            difficulty: finding?.priority === 'high' ? 'hard' : finding?.priority === 'medium' ? 'medium' : 'easy',
            repetitionCount: 0,
          });
          
          remainingMinutes -= skillMinutes;
        }
      }
    });
  }

  return tasks;
}

/**
 * Get skill priorities based on findings
 */
export function calculateSkillPriorities(findings: Finding[]): Record<SkillType, number> {
  const priorities: Record<SkillType, number> = {
    tactics: 0,
    endgames: 0,
    openings: 0,
    calculation: 0,
    timeManagement: 0,
  };

  const weights = { high: 3, medium: 2, low: 1 };

  findings.forEach(finding => {
    const weight = weights[finding.priority];
    finding.skillTags.forEach(skillType => {
      priorities[skillType] += weight;
    });
  });

  return priorities;
}

/**
 * Suggest time distribution based on skill priorities
 */
export function suggestTimeDistribution(
  findings: Finding[],
  goals: Goal[]
): Record<SkillType, number> {
  const priorities = calculateSkillPriorities(findings);
  
  // Add goal weights
  goals.forEach(goal => {
    priorities[goal.skillType] += 2;
  });

  // Normalize to percentages
  const total = Object.values(priorities).reduce((sum, val) => sum + val, 0);
  const distribution: Record<SkillType, number> = {
    tactics: 0,
    endgames: 0,
    openings: 0,
    calculation: 0,
    timeManagement: 0,
  };

  if (total > 0) {
    Object.keys(priorities).forEach(key => {
      const skillType = key as SkillType;
      distribution[skillType] = Math.round((priorities[skillType] / total) * 100);
    });
  } else {
    // Default distribution if no priorities
    distribution.tactics = 30;
    distribution.endgames = 20;
    distribution.openings = 20;
    distribution.calculation = 20;
    distribution.timeManagement = 10;
  }

  return distribution;
}
