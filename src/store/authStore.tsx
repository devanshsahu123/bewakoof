"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface AuthContextValue extends AuthState {
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    if (typeof window === "undefined")
      return { user: null, token: null, isAuthenticated: false };
    const token = localStorage.getItem("bewakoof_token");
    return { user: null, token, isAuthenticated: !!token };
  });

  const setAuth = useCallback((user: User, token: string) => {
    localStorage.setItem("bewakoof_token", token);
    setState({ user, token, isAuthenticated: true });
  }, []);

  const clearAuth = useCallback(() => {
    localStorage.removeItem("bewakoof_token");
    setState({ user: null, token: null, isAuthenticated: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
