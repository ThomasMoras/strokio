import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Strokio
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Build a drawing practice with structured exercises, example
            feedback, and daily progress tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/roadmap"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg"
            >
              Start Learning
            </Link>
            <Link
              href="/roadmap"
              className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors border-2 border-gray-300 dark:border-gray-600"
            >
              View Roadmap
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                12 Structured Exercises
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Progress from basic shapes to advanced composition with
                carefully designed exercises.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Mock Feedback
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                See supportive example feedback after submitting a drawing.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="text-3xl mb-3">🔥</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Streak Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Build a daily practice habit with streak tracking and progress
                visualization.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
