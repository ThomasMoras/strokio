export interface ProgressData {
  [exerciseId: string]: {
    completed: boolean;
    completedAt?: string;
  };
}

export interface StreakData {
  currentStreak: number;
  lastActivityDate: string;
}

export function calculateProgressPercentage(
  completedCount: number,
  totalCount: number
): number {
  if (totalCount <= 0) return 0;
  return (completedCount / totalCount) * 100;
}
