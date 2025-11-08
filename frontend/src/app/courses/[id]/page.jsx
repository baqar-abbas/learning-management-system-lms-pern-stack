"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

export default function CourseDetailsPage() {
  const { id: courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        const [courseRes, lessonsRes, progressRes] = await Promise.all([
          api.get(`/courses/${courseId}`),
          api.get(`/courses/${courseId}/lessons`),
          api.get(`/progress/my`),
        ]);

        setCourse(courseRes.data);
        setLessons(lessonsRes.data);
        setProgress(progressRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load course data.");
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [courseId]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex justify-center items-center h-screen text-lg">
          Loading course...
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="p-6 text-red-500 text-center">{error}</div>
      </ProtectedRoute>
    );
  }

  // Determine completion per lesson
  const completedLessonIds = new Set(progress.map((p) => p.lessonId));
  const completedCount = lessons.filter((l) =>
    completedLessonIds.has(l.id)
  ).length;
  const progressPercent =
    lessons.length > 0
      ? Math.round((completedCount / lessons.length) * 100)
      : 0;

  return (
    <ProtectedRoute>
      <div className="min-h-screen px-6 py-8 max-w-4xl mx-auto">
        <Link
          href="/courses"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
        >
          ← Back to Courses
        </Link>
        {/* Course Header */}
        <h1 className="text-3xl font-bold">{course.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 mb-4">
          {course.description}
        </p>

        <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full mb-6">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-8">
          Progress: {progressPercent}% ({completedCount}/{lessons.length}{" "}
          Lessons Completed)
        </p>

        {/* Lessons List */}
        <h2 className="text-xl font-semibold mb-4">Lessons</h2>
        <div className="space-y-3">
          {lessons.map((lesson) => {
            const isCompleted = completedLessonIds.has(lesson.id);

            return (
              <Link
                key={lesson.id}
                href={`/courses/${courseId}/lessons/${lesson.id}`}
                className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div>
                  <p className="font-medium">{lesson.title}</p>
                  <p class="text-xs text-gray-500">
                    Lesson #{lesson.order + 1}
                  </p>
                </div>

                {isCompleted ? (
                  <span className="text-sm px-2 py-1 rounded bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300">
                    Completed
                  </span>
                ) : (
                  <span className="text-sm px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    Not Completed
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </ProtectedRoute>
  );
}
