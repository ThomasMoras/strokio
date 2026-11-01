"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getRoadmapOverview, type RoadmapOverview } from "@/application";
import { ExerciseCard, exercises } from "@/domains/practice";
import { ProgressTracker } from "@/domains/progress";

const initialOverview: RoadmapOverview = {
  items: exercises.map((exercise) => ({ exercise, completed: false })),
  streak: 0,
  completedCount: 0,
  totalExercises: exercises.length,
};

export function RoadmapScreen() {
  const [overview, setOverview] = useState<RoadmapOverview>(initialOverview);

  useEffect(() => {
    setOverview(getRoadmapOverview());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Training Roadmap
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Complete exercises in order or jump to any exercise you&apos;re ready for.
          </p>
        </div>

        <ProgressTracker
          streak={overview.streak}
          completedCount={overview.completedCount}
          totalExercises={overview.totalExercises}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {overview.items.map(({ exercise, completed }) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              completed={completed}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
