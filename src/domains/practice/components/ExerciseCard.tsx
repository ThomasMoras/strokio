import Link from "next/link";
import {
  DIFFICULTY_BADGE_CLASSES,
  DIFFICULTY_LABELS,
  type Exercise,
} from "../model/exercise";

interface ExerciseCardProps {
  exercise: Exercise;
  completed?: boolean;
}

export function ExerciseCard({
  exercise,
  completed = false,
}: ExerciseCardProps) {
  return (
    <Link href={`/exercise/${exercise.id}`}>
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 ${
          completed
            ? "border-green-500 dark:border-green-400"
            : "border-transparent hover:border-blue-300 dark:hover:border-blue-600"
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {exercise.title}
          </h3>
          {completed && (
            <span className="text-green-500 text-2xl" title="Completed">
              ✓
            </span>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
          {exercise.description}
        </p>
        <div className="flex items-center justify-between">
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${DIFFICULTY_BADGE_CLASSES[exercise.difficulty]}`}
          >
            {DIFFICULTY_LABELS[exercise.difficulty]}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {exercise.estimatedTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
