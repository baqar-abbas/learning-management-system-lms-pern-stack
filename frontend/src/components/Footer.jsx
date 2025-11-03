"use client";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-200 border-t border-gray-300 dark:border-gray-800 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-2 text-blue-600 font-semibold text-lg">
          <GraduationCap size={22} />
          <span>Learning Management System</span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <Link
            href="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Home
          </Link>
          <Link
            href="/courses"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Courses
          </Link>
          <Link
            href="/login"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Register
          </Link>
        </nav>

        {/* Right: Copyright */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} LMS — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
