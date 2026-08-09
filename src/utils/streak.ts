/**
 * Calculates the current continuous streak of completed days.
 * The streak is tied to the current day. If the most recent completed day
 * is older than yesterday, the streak is broken (0).
 */
export function calculateStreak(completedDays: number[], currentDay: number): number {
  if (!completedDays || !completedDays.length) return 0;
  
  // Deduplicate, filter out future days, and sort ascending
  const uniqueSorted = Array.from(new Set(completedDays))
    .filter(day => day <= currentDay)
    .sort((a, b) => a - b);
    
  if (!uniqueSorted.length) return 0;

  const lastCompleted = uniqueSorted[uniqueSorted.length - 1];
  
  // If the last completed day is older than yesterday, the streak is broken
  if (lastCompleted < currentDay - 1) {
    return 0;
  }

  let streak = 1;
  for (let i = uniqueSorted.length - 1; i > 0; i--) {
    if (uniqueSorted[i] - uniqueSorted[i - 1] === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

/**
 * Calculates best streak from current streak and previous best streak.
 */
export function calculateBestStreak(currentStreak: number, bestStreak: number): number {
  return Math.max(currentStreak, Math.max(0, bestStreak || 0));
}
