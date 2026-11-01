export type DifficultyLevel = 1 | 2 | 3;

export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedTime: string;
}

export const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  1: "Beginner",
  2: "Intermediate",
  3: "Advanced",
};

export const DIFFICULTY_BADGE_CLASSES: Record<DifficultyLevel, string> = {
  1: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  2: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  3: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};
