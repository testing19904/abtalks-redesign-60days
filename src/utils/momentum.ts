import { StudentProfile } from "../data/mockData";

export interface MomentumMetrics {
  currentStreak: number;
  bestStreak: number;
  completionRate: number; // 0-100
  daysRemaining: number;
  nextMilestone: number;
  recentConsistency: number; // e.g. out of the last 7 days
  recoveryState: {
    isRecovering: boolean;
    missedDayNum?: number;
  };
  isTodayCompleted: boolean;
}

export function calculateMomentum(profile: StudentProfile): MomentumMetrics {
  const { currentStreak, bestStreak, completedDays, missedDays, currentDay } = profile;

  // Completion rate
  const completionRate = Math.round((completedDays.length / 60) * 100);

  // Days remaining (out of 60)
  const daysRemaining = Math.max(0, 60 - currentDay);

  // Next milestone (next multiple of 10, or end of challenge)
  const nextMilestone = Math.min(60, Math.ceil(currentDay / 10) * 10 || 10);

  // Recent consistency (how many of the last 7 days were completed)
  let recentCompleted = 0;
  for (let i = Math.max(1, currentDay - 6); i <= currentDay; i++) {
    if (completedDays.includes(i)) {
      recentCompleted++;
    }
  }

  // Recovery state
  const isRecovering = missedDays.length > 0;
  const missedDayNum = isRecovering ? missedDays[0] : undefined;

  const isTodayCompleted = completedDays.includes(currentDay);

  return {
    currentStreak,
    bestStreak,
    completionRate,
    daysRemaining,
    nextMilestone,
    recentConsistency: recentCompleted,
    recoveryState: {
      isRecovering,
      missedDayNum,
    },
    isTodayCompleted,
  };
}

