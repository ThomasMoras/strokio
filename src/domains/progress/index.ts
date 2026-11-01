export {
  calculateProgressPercentage,
  type ProgressData,
  type StreakData,
} from "./model/progress";
export {
  getCompletedCount,
  getProgress,
  getStreak,
  isExerciseComplete,
  markExerciseComplete,
  saveProgress,
  updateStreak,
} from "./infrastructure/browser-storage";
export { ProgressTracker } from "./components/ProgressTracker";
