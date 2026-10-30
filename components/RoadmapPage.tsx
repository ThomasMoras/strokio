"use client";

import { exercises } from "@/data/exercises";
import { ExerciseCard } from "./ExerciseCard";
import { ProgressTracker } from "./ProgressTracker";
import Link from "next/link";

export function RoadmapPage() {
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

        <ProgressTracker />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </div>
    </div>
  );
}
