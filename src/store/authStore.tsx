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
  setAuth: (token: string, user?: User) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    if (typeof window === "undefined")
      return { user: null, token: null, isAuthenticated: false };
    // Support both token key names
    const token =
      localStorage.getItem("web_token") || localStorage.getItem("auth_token");
    return { user: null, token, isAuthenticated: !!token };
  });

  const setAuth = useCallback((token: string, user?: User) => {
    localStorage.setItem("web_token", token);
    localStorage.removeItem("auth_token"); // unify to web_token
    setState({ user: user ?? null, token, isAuthenticated: true });
  }, []);

  const clearAuth = useCallback(() => {
    localStorage.removeItem("web_token");
    localStorage.removeItem("auth_token");
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
