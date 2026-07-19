import { type FormEvent, useState } from "react";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { authClient } from "../../lib/auth-client";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const nextErrors: SignUpErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Full name is required.";
    } else if (formData.name.trim().length < 2) {
      nextErrors.name = "Name must be at least 2 characters.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      nextErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    } else {
      const hasUppercase = /[A-Z]/.test(formData.password);
      const hasLowercase = /[a-z]/.test(formData.password);
      const hasNumber = /\d/.test(formData.password);

      if (!hasUppercase || !hasLowercase || !hasNumber) {
        nextErrors.password = "Use upper, lower and numeric characters.";
      }
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.confirmPassword !== formData.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
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
      const result = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      const { data, error } = result;

      if (error) {
        throw new Error(error.message || "Unable to create your account.");
      }

      if (data?.user) {
        // Set user role to 'user' in db
        await fetch(`${import.meta.env.VITE_AUTH_API_URL}/api/users/set-role`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.user.email,
          }),
        });

        alert("Account created successfully");
        navigate("/");
      } else {
        throw new Error("Registration completed, but no user was returned.");
      }
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Unable to create your account right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
      {/* Background Mesh Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40%] -right-[20%] h-[80%] w-[80%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute -bottom-[40%] -left-[20%] h-[80%] w-[80%] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-md sm:p-10"
      >
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-cyan-400">
            Get Started
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Provide your details to initiate registration.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
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
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                className={`w-full rounded-2xl border bg-white/[0.02] py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-hidden transition-all duration-200 focus:border-cyan-500 focus:bg-white/[0.04] focus:ring-4 focus:ring-cyan-500/15 ${
                  errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500/15" : "border-white/10"
                }`}
              />
            </div>
            {errors.name && (
              <span className="mt-1.5 text-xs font-medium text-red-400">
                {errors.name}
              </span>
            )}
          </div>

          {/* Email Address */}
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

          {/* Password */}
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

          {/* Confirm Password */}
          <div className="flex flex-col">
            <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Confirm Password
                </span>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-500">
                <FaLock className="h-4 w-4" />
              </span>
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••••••"
                className={`w-full rounded-2xl border bg-white/[0.02] py-3.5 pl-11 pr-12 text-sm text-white placeholder-slate-500 outline-hidden transition-all duration-200 focus:border-cyan-500 focus:bg-white/[0.04] focus:ring-4 focus:ring-cyan-500/15 ${
                  errors.confirmPassword ? "border-red-500 focus:border-red-500 focus:ring-red-500/15" : "border-white/10"
                }`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-white transition-colors"
                onClick={() => setShowConfirmPassword((value) => !value)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="mt-1.5 text-xs font-medium text-red-400">
                {errors.confirmPassword}
              </span>
            )}
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
              "Create Account"
            )}
          </motion.button>
        </form>

        <p className="mt-8 text-center text-xs sm:text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
