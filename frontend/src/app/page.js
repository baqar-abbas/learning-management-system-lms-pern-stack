"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gray-50 dark:bg-gray-900 text-center">
      <div className="max-w-4xl w-full">
        {/* Text Section */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
            Welcome to Your Learning Management System
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8">
            Discover, learn, and advance your skills with our curated courses
            and interactive lessons. Get started today!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/login">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition cursor-pointer">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-gray-800 transition cursor-pointer">
                Register
              </button>
            </Link>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <img
            src="/lms.jpg"
            alt="Learning together"
            className="w-full h-auto max-h-[480px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
