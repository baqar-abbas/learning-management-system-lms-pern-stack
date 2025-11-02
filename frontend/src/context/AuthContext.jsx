"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("token");
    return null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // load user if token exists
    const init = async () => {
      if (token) {
        try {
          // set token in localStorage (already done on login)
          localStorage.setItem("token", token);
          // fetch /auth/me
          const response = await api.get("/auth/me");
          setUser(response.data);
        } catch (err) {
          console.error("Failed to fetch user:", err);
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    init();
  }, [token]);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    // backend returns token + user fields
    setToken(data.token);
    localStorage.setItem("token", data.token);
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    });
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    setToken(data.token);
    localStorage.setItem("token", data.token);
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    });
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
