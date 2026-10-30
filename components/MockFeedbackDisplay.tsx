"use client";

interface MockFeedbackDisplayProps {
  feedback: string;
}

export function MockFeedbackDisplay({ feedback }: MockFeedbackDisplayProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      <div className="flex items-start space-x-3">
        <div className="text-2xl">🤖</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            AI Feedback
          </h3>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            {feedback}
          </p>
        </div>
      </div>
    </div>
  );
}

