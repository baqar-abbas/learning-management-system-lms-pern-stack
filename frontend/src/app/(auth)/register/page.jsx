"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await register(name, email, password);
      router.push("/courses");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>

      {error && (
        <div className="mb-4 text-red-600 bg-red-100 dark:bg-red-900/30 p-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700"
        />
        <button
          disabled={loading}
          className="mt-3 p-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Login here
        </a>
      </p>
    </div>
  );
}
