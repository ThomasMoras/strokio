"use client";

import { useEffect, useState } from "react";
import { getStreak, getCompletedCount } from "@/lib/storage";
import { exercises } from "@/data/exercises";

export function ProgressTracker() {
  const [streak, setStreak] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const streakData = getStreak();
    setStreak(streakData.currentStreak);
    setCompletedCount(getCompletedCount());
  }, []);

  const totalExercises = exercises.length;
  const progressPercentage = (completedCount / totalExercises) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {streak}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Day Streak
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {completedCount}/{totalExercises}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Completed
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {Math.round(progressPercentage)}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Progress
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

