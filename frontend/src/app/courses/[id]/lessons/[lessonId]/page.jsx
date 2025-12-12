"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function LessonPage() {
  const { id: courseId, lessonId } = useParams();
  const router = useRouter();

  const [lesson, setLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    if (!courseId || !lessonId) return;

    const loadLesson = async () => {
      try {
        const [lessonRes, lessonsRes, progressRes] = await Promise.all([
          api.get(`/courses/${courseId}/lessons/${lessonId}`),
          api.get(`/courses/${courseId}/lessons`),
          api.get(`/progress/my`),
        ]);
        setLesson(lessonRes.data);
        // console.log("Lesson data:", lessonRes.data);
        setLessons(lessonsRes.data);
        console.log("All lessons:", lessonsRes.data);
        setCompletedLessons(new Set(progressRes.data.map((p) => p.lessonId)));
        // console.log("Completed lessons:", progressRes.data);
      } catch (err) {
        console.error("Error loading lesson:", err);
        setError(
          error.response?.data?.message ||
            "Failed to load lesson. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };
    loadLesson();
  }, [courseId, lessonId]);

  const isCompleted = completedLessons.has(Number(lessonId));

  const currentIndex = lessons.findIndex((l) => l.id === Number(lessonId));

  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;

  const nextLesson =
    currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  const markCompleted = async () => {
    try {
      setMarking(true);
      await api.post(`/progress/${lessonId}`);
      setCompletedLessons((prev) => new Set([...prev, Number(lessonId)]));
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Failed to mark lesson as completed."
      );
    } finally {
      setMarking(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="h-screen flex items-center justify-center">
          Loading lesson...
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="p-6 text-center text-red-500">{error}</div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen px-6 py-8 max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push(`/courses/${courseId}`)}
          className="text-sm text-blue-600 hover:underline mb-4 cursor-pointer"
        >
          ← Back to Course
        </button>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>

        {/* Content */}
        <div className="prose dark:prose-invert max-w-none mb-8">
          {lesson.content}
        </div>

        {/* Completion */}
        {isCompleted ? (
          <span className="inline-block px-4 py-2 rounded bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200">
            ✅ Lesson Completed
          </span>
        ) : (
          <button
            onClick={markCompleted}
            disabled={marking}
            className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
          >
            {marking ? "Marking..." : "Mark as Completed"}
          </button>
        )}

        {/* Quiz Button */}
        <div className="mt-6">
          <button
            onClick={() =>
              router.push(`/courses/${courseId}/lessons/${lessonId}/quiz`)
            }
            className="px-6 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Take Quiz
          </button>
        </div>

        {/* Lesson Navigation */}
        <div className="mt-10 flex justify-between items-center">
          {/* Previous */}
          {prevLesson ? (
            <button
              onClick={() =>
                router.push(`/courses/${courseId}/lessons/${prevLesson.id}`)
              }
              className="text-blue-600 hover:underline"
            >
              ← {prevLesson.title}
            </button>
          ) : (
            <span className="text-gray-400">← Previous</span>
          )}

          {/* Next */}
          {nextLesson ? (
            <button
              onClick={() =>
                router.push(`/courses/${courseId}/lessons/${nextLesson.id}`)
              }
              className="text-blue-600 hover:underline"
            >
              {nextLesson.title} →
            </button>
          ) : (
            <span className="text-gray-400">Next →</span>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
