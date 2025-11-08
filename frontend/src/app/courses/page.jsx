"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const { data } = await api.get("/courses");
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load courses. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen px-6 py-8">
        <h1 className="text-3xl font-semibold mb-6">Browse Courses</h1>

        {loading && <p className="text-gray-500 text-lg">Loading courses...</p>}

        {error && <p className="text-red-600 font-medium">{error}</p>}

        {!loading && !error && courses.length === 0 && (
          <p className="text-gray-600">No courses available.</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition transform hover:-translate-y-1 p-5 border dark:border-gray-700"
            >
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
                {course.description}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                  Published
                </span>

                <Link
                  href={`/courses/${course.id}`}
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded transition"
                >
                  View Course
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
