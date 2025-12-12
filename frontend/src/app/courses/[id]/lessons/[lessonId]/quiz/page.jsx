"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function QuizPage() {
  const { id: courseId, lessonId } = useParams();
  const router = useRouter();

  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({}); // { quizId: optionId }
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await api.get(
          `/courses/${courseId}/lessons/${lessonId}/quizzes`
        );
        setQuizzes(res.data || []);
      } catch (err) {
        console.error("Quiz load error:", err);
      }
    };
    fetchQuizzes();
  }, [courseId, lessonId]);

  const handleSelect = (quizId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [quizId]: optionId,
    }));
  };

  const submitAll = async () => {
    // Check all questions are answered
    for (const quiz of quizzes) {
      if (!answers[quiz.id]) {
        alert("Please answer all questions before submitting.");
        return;
      }
    }

    try {
      setSubmitting(true);

      const results = [];

      for (const quiz of quizzes) {
        const res = await api.post(
          `/courses/${courseId}/lessons/${lessonId}/quizzes/${quiz.id}/submit`,
          {
            selectedOptionIds: [answers[quiz.id]],
          }
        );
        results.push(res.data);
      }

      setResult(results);
    } catch (err) {
      console.error("Quiz submission error:", err);
      alert("Something went wrong while submitting the quiz.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!quizzes.length)
    return (
      <ProtectedRoute>
        <div className="h-screen flex items-center justify-center">
          No quizzes found for this lesson.
        </div>
      </ProtectedRoute>
    );

  return (
    <ProtectedRoute>
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* BACK BUTTON */}
        <button
          onClick={() =>
            router.push(`/courses/${courseId}/lessons/${lessonId}`)
          }
          className="text-sm text-blue-600 hover:underline mb-6"
        >
          ← Back to Lesson
        </button>

        <h1 className="text-3xl font-bold mb-8">Lesson Quiz</h1>

        {/* QUIZZES */}
        <div className="space-y-10">
          {quizzes.map((quiz, index) => (
            <div key={quiz.id} className="p-6 border rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                {index + 1}. {quiz.question}
              </h2>

              <div className="space-y-3">
                {quiz.options.map((opt) => (
                  <label
                    key={opt.id}
                    className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-100"
                  >
                    <input
                      type="radio"
                      name={`quiz_${quiz.id}`}
                      value={opt.id}
                      checked={answers[quiz.id] === opt.id}
                      onChange={() => handleSelect(quiz.id, opt.id)}
                    />
                    <span>{opt.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* SUBMIT */}
        {!result ? (
          <button
            onClick={submitAll}
            disabled={submitting}
            className="mt-10 px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Quiz"}
          </button>
        ) : (
          <div className="mt-10 p-6 bg-green-100 border border-green-400 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Quiz Results</h2>

            {result.map((r, idx) => (
              <div key={idx} className="mb-2">
                <strong>Q{idx + 1}:</strong>{" "}
                {r.attempt.passed ? "✔ Correct" : "❌ Wrong"}
              </div>
            ))}

            <button
              onClick={() =>
                router.push(`/courses/${courseId}/lessons/${lessonId}`)
              }
              className="mt-6 px-6 py-3 rounded bg-purple-600 text-white hover:bg-purple-700"
            >
              Back to Lesson
            </button>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
