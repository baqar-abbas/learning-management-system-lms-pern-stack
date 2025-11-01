// app/courses/page.jsx
"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import Link from "next/link";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/courses");
        setCourses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!courses.length) return <div className="p-6">No courses found</div>;

  return (
    <div className="p-6 grid gap-4">
      <h1 className="text-2xl">Courses</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <div key={c.id} className="border p-4 rounded">
            <h2 className="font-semibold">{c.title}</h2>
            <p className="text-sm my-2">{c.description}</p>
            <div className="flex gap-2 mt-2">
              <Link href={`/courses/${c.id}`}>Open</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
