import { type FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { authClient } from "../../lib/auth-client";
// import { API_BASE_URL } from "../../api/apiClient";
import { BASE_URL } from "../../api/apiClient";

type Mode = "login" | "register";

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    />
    <path
      fill="#FF3D00"
      d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
    />
  </svg>
);

const authApiBaseUrl = BASE_URL;

const AuthPage = () => {
  const {
    user,
    login,
    register,
    loading,
    initialLoading,
    error: authError,
  } = useAuth();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [mode, setMode] = useState<Mode>("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const isLogin = mode === "login";

  useEffect(() => {
    if (user) {
      const redirectTo = user.role === "admin" ? "/admin/dashboard" : "/";
      navigate(redirectTo, { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let result;

    if (isLogin) {
      result = await login({
        email: form.email,
        password: form.password,
        rememberMe,
      });
    } else {
      result = await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });
    }

    if (!result.success) return;

    await queryClient.invalidateQueries({ queryKey: ["current-user"] });

    if (!isLogin && result.data?.user?.email) {
      try {
        await fetch(`${authApiBaseUrl}/api/users/set-role`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: result.data.user.email }),
        });
      } catch {
        // best-effort role assignment
      }
    }
  };

  const handleToggle = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
    setForm({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleSubmitting(true);

    try {
      const redirectTo = `${window.location.origin}/`;
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      });

      if (error) {
        console.error("Google sign in failed:", error);
      }
    } catch (err) {
      console.error("Google sign in failed:", err);
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <p className="text-lg font-medium text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
      {/* Dynamic Background Mesh Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40%] -left-[20%] h-[80%] w-[80%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute -bottom-[40%] -right-[20%] h-[80%] w-[80%] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-md sm:p-10"
      >
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-cyan-400">
            {isLogin ? "Welcome Back" : "Get Started"}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {isLogin ? "Access FanKit" : "Create Account"}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {isLogin
              ? "Enter your details below to resume your experience."
              : "Provide your details to initiate registration."}
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isGoogleSubmitting}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.05] focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
        >
          <GoogleIcon />
          {isGoogleSubmitting ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <span>
              {isLogin ? "Sign in with Google" : "Sign up with Google"}
            </span>
          )}
        </motion.button>

        <div className="my-6 flex items-center justify-between gap-4">
          <div className="h-[1px] flex-1 bg-white/10" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            or
          </span>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="flex flex-col">
              <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Full Name
              </span>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-slate-500">
                  <FaUser className="h-4 w-4" />
                </span>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-hidden transition-all duration-200 focus:border-cyan-500 focus:bg-white/[0.04] focus:ring-4 focus:ring-cyan-500/15"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col">
            <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Email Address
            </span>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-500">
                <FaEnvelope className="h-4 w-4" />
              </span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-hidden transition-all duration-200 focus:border-cyan-500 focus:bg-white/[0.04] focus:ring-4 focus:ring-cyan-500/15"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Password
            </span>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-500">
                <FaLock className="h-4 w-4" />
              </span>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-3.5 pl-11 pr-12 text-sm text-white placeholder-slate-500 outline-hidden transition-all duration-200 focus:border-cyan-500 focus:bg-white/[0.04] focus:ring-4 focus:ring-cyan-500/15"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-white transition-colors"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-4 w-4" />
                ) : (
                  <FaEye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label className="flex cursor-pointer items-center gap-2 select-none text-slate-400 hover:text-white transition-colors">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="h-4 w-4 rounded-md border-white/10 bg-white/[0.02] text-cyan-500 accent-cyan-500 focus:ring-0"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>
          )}

          {authError && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3.5 text-sm font-medium text-red-400"
            >
              {authError}
            </motion.div>
          )}

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="relative flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-500 hover:to-cyan-400 hover:shadow-cyan-500/25 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </motion.button>
        </form>

        <p className="mt-8 text-center text-xs sm:text-sm text-slate-400">
          {isLogin ? "New to FanKit?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={handleToggle}
            className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            {isLogin ? "Create an account" : "Sign In"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthPage;
