"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { Menu, X, GraduationCap } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-blue-600"
        >
          <GraduationCap size={24} />
          <span className="hidden sm:inline">LMS Platform</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {!user ? (
            <>
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
              >
                Home
              </Link>
              <Link
                href="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/courses"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
              >
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

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
          onClick={toggleMenu}
        >
          <Menu size={26} />
        </button>
      </div>

      {/* Backdrop (click to close) */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white/85 dark:bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 dark:text-gray-200"
          >
            <X size={26} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col items-center gap-6 mt-4 text-lg font-medium">
          {!user ? (
            <>
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
              >
                Home
              </Link>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/courses"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
              >
                Courses
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
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
