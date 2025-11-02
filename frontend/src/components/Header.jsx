"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Learning Management System
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          {!user ? (
            <>
              <Link href="/login" className="hover:text-blue-600">
                Login
              </Link>
              <Link href="/register" className="hover:text-blue-600">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link href="/courses" className="hover:text-blue-600">
                Courses
              </Link>
              <button
                onClick={logout}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
