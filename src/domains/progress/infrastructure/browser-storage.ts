import type { ProgressData, StreakData } from "../model/progress";

const PROGRESS_KEY = "strokio-progress";
const STREAK_KEY = "strokio-streak";
const LEGACY_PROGRESS_KEY = "drawing-platform-progress";
const LEGACY_STREAK_KEY = "drawing-platform-streak";

function getStoredValue(key: string, legacyKey: string): string | null {
  const stored = localStorage.getItem(key);
  if (stored !== null) return stored;

  const legacyStored = localStorage.getItem(legacyKey);
  if (legacyStored === null) return null;

  try {
    localStorage.setItem(key, legacyStored);
  } catch {
    // Continue using the legacy value if copying it forward fails.
  }

  return legacyStored;
}

export function getProgress(): ProgressData {
  if (typeof window === "undefined") return {};

  try {
    const stored = getStoredValue(PROGRESS_KEY, LEGACY_PROGRESS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function saveProgress(progress: ProgressData): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Failed to save progress:", error);
  }
}

export function markExerciseComplete(exerciseId: string): void {
  const progress = getProgress();
  progress[exerciseId] = {
    completed: true,
    completedAt: new Date().toISOString(),
  };
  saveProgress(progress);
}

export function isExerciseComplete(exerciseId: string): boolean {
  const progress = getProgress();
  return progress[exerciseId]?.completed === true;
}

export function getStreak(): StreakData {
  if (typeof window === "undefined") {
    return { currentStreak: 0, lastActivityDate: "" };
  }

  try {
    const stored = getStoredValue(STREAK_KEY, LEGACY_STREAK_KEY);
    return stored
      ? JSON.parse(stored)
      : { currentStreak: 0, lastActivityDate: "" };
  } catch {
    return { currentStreak: 0, lastActivityDate: "" };
  }
}

export function updateStreak(): number {
  if (typeof window === "undefined") return 0;

  const today = new Date().toDateString();
  const streak = getStreak();

  if (!streak.lastActivityDate) {
    // First time
    const newStreak = { currentStreak: 1, lastActivityDate: today };
    localStorage.setItem(STREAK_KEY, JSON.stringify(newStreak));
    return 1;
  }

  const lastDate = new Date(streak.lastActivityDate).toDateString();
  const daysDiff = Math.floor(
    (new Date(today).getTime() - new Date(lastDate).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  let newStreak = streak.currentStreak;

  if (daysDiff === 0) {
    // Same day, maintain streak
    newStreak = streak.currentStreak;
  } else if (daysDiff === 1) {
    // Consecutive day, increment
    newStreak = streak.currentStreak + 1;
  } else {
    // Gap > 1 day, reset to 1
    newStreak = 1;
  }

  const updatedStreak = { currentStreak: newStreak, lastActivityDate: today };
  localStorage.setItem(STREAK_KEY, JSON.stringify(updatedStreak));

  return newStreak;
}

export function getCompletedCount(): number {
  const progress = getProgress();
  return Object.values(progress).filter((p) => p.completed).length;
}
