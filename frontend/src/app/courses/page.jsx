"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import Link from "next/link";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        setError(null);

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

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;

  if (error)
    return (
      <div className="p-6 text-red-600">
        <p className="font-semibold">Error:</p>
        <p>{error}</p>
      </div>
    );

  if (!courses.length)
    return <div className="p-6 text-gray-600">No courses found.</div>;

  return (
    <div className="p-6 grid gap-4">
      <h1 className="text-2xl font-semibold">Courses</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <div
            key={c.id}
            className="border p-4 rounded shadow-sm hover:shadow-md transition"
          >
            <h2 className="font-semibold">{c.title}</h2>
            <p className="text-sm my-2 text-gray-700">{c.description}</p>
            <div className="flex gap-2 mt-2">
              <Link
                href={`/courses/${c.id}`}
                className="text-blue-600 hover:underline"
              >
                Open
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
