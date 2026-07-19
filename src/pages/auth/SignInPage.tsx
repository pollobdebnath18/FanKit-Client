import { type FormEvent, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { authClient } from "../../lib/auth-client";

interface SignInFormData {
  email: string;
  password: string;
}

interface SignInErrors {
  email?: string;
  password?: string;
}

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<SignInErrors>({});
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const nextErrors: SignInErrors = {};

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      nextErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setServerError("");

    try {
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      type AuthUser = {
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        role?: string;
      };

      if (error) {
        throw new Error(error.message || "Invalid email or password.");
      }

      const user = data?.user as AuthUser;

      if (user.role === "admin") {
        navigate("/admin/dashboard");
        return;
      }
      navigate("/", {
        replace: true,
      });
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Welcome Back
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Access FanKit
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Enter your details below to resume your experience.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email input */}
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
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full rounded-2xl border bg-white/[0.02] py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-hidden transition-all duration-200 focus:border-cyan-500 focus:bg-white/[0.04] focus:ring-4 focus:ring-cyan-500/15 ${
                  errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/15" : "border-white/10"
                }`}
              />
            </div>
            {errors.email && (
              <span className="mt-1.5 text-xs font-medium text-red-400">
                {errors.email}
              </span>
            )}
          </div>

          {/* Password input */}
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
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                className={`w-full rounded-2xl border bg-white/[0.02] py-3.5 pl-11 pr-12 text-sm text-white placeholder-slate-500 outline-hidden transition-all duration-200 focus:border-cyan-500 focus:bg-white/[0.04] focus:ring-4 focus:ring-cyan-500/15 ${
                  errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/15" : "border-white/10"
                }`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-white transition-colors"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <span className="mt-1.5 text-xs font-medium text-red-400">
                {errors.password}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <label className="flex cursor-pointer items-center gap-2 select-none text-slate-400 hover:text-white transition-colors">
              <input
                type="checkbox"
                className="h-4 w-4 rounded-md border-white/10 bg-white/[0.02] text-cyan-500 accent-cyan-500 focus:ring-0"
              />
              <span>Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3.5 text-sm font-medium text-red-400"
            >
              {serverError}
            </motion.div>
          )}

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="relative flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-500 hover:to-cyan-400 hover:shadow-cyan-500/25 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>

        <div className="my-6 flex items-center justify-between gap-4">
          <div className="h-[1px] flex-1 bg-white/10" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            or continue with
          </span>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.05]"
        >
          <FaGoogle className="h-4 w-4 text-red-400" />
          <span>Google Account</span>
        </motion.button>

        <p className="mt-8 text-center text-xs sm:text-sm text-slate-400">
          New to FanKit?{" "}
          <Link
            to="/signup"
            className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignInPage;
