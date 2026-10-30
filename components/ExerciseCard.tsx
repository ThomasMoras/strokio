"use client";

import Link from "next/link";
import { Exercise } from "@/data/exercises";
import { isExerciseComplete } from "@/lib/storage";
import { useEffect, useState } from "react";

interface ExerciseCardProps {
  exercise: Exercise;
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(isExerciseComplete(exercise.id));
  }, [exercise.id]);

  const difficultyColors = {
    1: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    2: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    3: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  const difficultyLabels = {
    1: "Beginner",
    2: "Intermediate",
    3: "Advanced",
  };

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
            className={`px-2 py-1 rounded text-xs font-medium ${difficultyColors[exercise.difficulty]}`}
          >
            {difficultyLabels[exercise.difficulty]}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {exercise.estimatedTime}
          </span>
        </div>
      </div>
    </Link>
  );
}

