import { useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role?: string;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthResult {
  success: boolean;
  error?: { message?: string } | null;
  data?: { user?: AuthUser | null } | null;
}

const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");

  // Load current session
  const getSession = async (): Promise<AuthUser | null> => {
    try {
      const { data, error } = await authClient.getSession();

      if (error) {
        setError(error.message || "");
        return null;
      }

      const sessionUser = (data?.user ?? null) as AuthUser | null;
      setUser(sessionUser);
      return sessionUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load session.");
      return null;
    } finally {
      setInitialLoading(false);
    }
  };

  // Register
  const register = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<AuthResult> => {
    setLoading(true);
    setError("");

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        setError(error.message || "");
        return { success: false, error };
      }

      setUser((data?.user ?? null) as AuthUser | null);

      return {
        success: true,
        data,
      };
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async ({
    email,
    password,
    rememberMe = true,
  }: {
    email: string;
    password: string;
    rememberMe?: boolean;
  }): Promise<AuthResult> => {
    setLoading(true);
    setError("");

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
      });

      if (error) {
        setError(error.message || "");
        return { success: false, error };
      }

      setUser((data?.user ?? null) as AuthUser | null);

      return {
        success: true,
        data,
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);

    try {
      await authClient.signOut();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Load session on app startup
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getSession();
  }, []);

  return {
    user,
    error,
    loading,
    initialLoading,
    login,
    register,
    logout,
    getSession,
  };
};

export default useAuth;
