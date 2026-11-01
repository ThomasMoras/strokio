"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getExerciseSession,
  submitExerciseForMockFeedback,
} from "@/application";
import { ImageUploader, MockFeedbackDisplay } from "@/domains/assessment";
import {
  DIFFICULTY_BADGE_CLASSES,
  DIFFICULTY_LABELS,
  type Exercise,
} from "@/domains/practice";

export function ExerciseDetailScreen() {
  const params = useParams();
  const router = useRouter();
  const exerciseId = params.id as string;
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const session = getExerciseSession(exerciseId);
    if (!session) {
      router.push("/roadmap");
      return;
    }
    setExercise(session.exercise);
    setCompleted(session.completed);
  }, [exerciseId, router]);

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    setFeedback(null);
  };

  const handleSubmit = async () => {
    if (!selectedFile || !exercise) return;

    setIsSubmitting(true);

    const result = await submitExerciseForMockFeedback(exerciseId);
    setFeedback(result.feedback);
    setCompleted(result.completed);

    setIsSubmitting(false);
  };

  if (!exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/roadmap"
          className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
        >
          ← Back to Roadmap
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {exercise.title}
              </h1>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded text-sm font-medium ${DIFFICULTY_BADGE_CLASSES[exercise.difficulty]}`}
                >
                  {DIFFICULTY_LABELS[exercise.difficulty]}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {exercise.estimatedTime}
                </span>
                {completed && (
                  <span className="text-green-500 text-sm font-medium">
                    ✓ Completed
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {exercise.description}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Upload Your Drawing
          </h2>
          <ImageUploader
            onImageSelect={handleImageSelect}
            disabled={isSubmitting}
          />
        </div>

        {selectedFile && !feedback && (
          <div className="mb-6">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
                isSubmitting
                  ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit for Feedback"}
            </button>
          </div>
        )}

        {feedback && (
          <div className="mb-6">
            <MockFeedbackDisplay feedback={feedback} />
            <div className="mt-4 flex gap-4">
              <Link
                href="/roadmap"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
              >
                Back to Roadmap
              </Link>
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setFeedback(null);
                }}
                className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Try Another Drawing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
