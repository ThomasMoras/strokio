import { generateMockFeedback } from "@/domains/assessment";
import {
  exercises,
  getExerciseById,
  type Exercise,
} from "@/domains/practice";
import {
  getCompletedCount,
  getProgress,
  getStreak,
  isExerciseComplete,
  markExerciseComplete,
  updateStreak,
} from "@/domains/progress";

export interface RoadmapExerciseItem {
  exercise: Exercise;
  completed: boolean;
}

export interface RoadmapOverview {
  items: RoadmapExerciseItem[];
  streak: number;
  completedCount: number;
  totalExercises: number;
}

export function getRoadmapOverview(): RoadmapOverview {
  const progress = getProgress();
  const streakData = getStreak();
  const completedCount = getCompletedCount();

  return {
    items: exercises.map((exercise) => ({
      exercise,
      completed: progress[exercise.id]?.completed === true,
    })),
    streak: streakData.currentStreak,
    completedCount,
    totalExercises: exercises.length,
  };
}

export interface ExerciseSessionState {
  exercise: Exercise;
  completed: boolean;
}

export function getExerciseSession(
  exerciseId: string
): ExerciseSessionState | null {
  const exercise = getExerciseById(exerciseId);
  if (!exercise) return null;

  return {
    exercise,
    completed: isExerciseComplete(exerciseId),
  };
}

export interface ExerciseSubmissionResult {
  feedback: string;
  completed: boolean;
  streak: number;
}

export async function submitExerciseForMockFeedback(
  exerciseId: string
): Promise<ExerciseSubmissionResult> {
  // Simulate prototype submission latency
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const feedback = generateMockFeedback(exerciseId);
  markExerciseComplete(exerciseId);
  const streak = updateStreak();

  return {
    feedback,
    completed: true,
    streak,
  };
}
