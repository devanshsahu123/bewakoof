"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  setAuth: (token: string, user?: User) => void;
  clearAuth: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    if (typeof window === "undefined")
      return { user: null, token: null, isAuthenticated: false, isLoading: true };
    const token = localStorage.getItem("web_token");
    const savedUser = localStorage.getItem("web_user");
    return { 
      user: savedUser ? JSON.parse(savedUser) : null, 
      token, 
      isAuthenticated: !!token, 
      isLoading: !token 
    };
  });

  const setAuth = useCallback((token: string, user?: User) => {
    localStorage.setItem("web_token", token);
    if (user) localStorage.setItem("web_user", JSON.stringify(user));
    setState(prev => ({ ...prev, user: user ?? prev.user, token, isAuthenticated: true, isLoading: false }));
  }, []);

  const clearAuth = useCallback(() => {
    localStorage.removeItem("web_token");
    localStorage.removeItem("web_user");
    setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
  }, []);

  const checkAuth = useCallback(async () => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("web_token");
    if (!token) {
      setState(prev => ({ ...prev, isLoading: false }));
      return;
    }
    // Since we don't have /me, we rely on the saved user in localStorage
    const savedUser = localStorage.getItem("web_user");
    if (savedUser) {
      setState(prev => ({ ...prev, user: JSON.parse(savedUser), isAuthenticated: true, isLoading: false }));
    } else {
      // If token exists but no user, we might need a /me call here if it existed
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ ...state, setAuth, clearAuth, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
