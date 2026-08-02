import { type FormEvent, useState } from "react";
import {
  FaEnvelope,
  FaPaperPlane,
  FaKey,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { emailOtp } from "../../lib/auth-client";

type Step = "email" | "reset";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      await emailOtp.requestPasswordReset({
        email: email.trim(),
      });
      setStep("reset");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send the code. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!otp.trim() || otp.trim().length !== 6) {
      setError("Please enter the 6-digit code.");
      return;
    }
    if (!password) {
      setError("New password is required.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error: resetError } = await emailOtp.resetPassword({
        email: email.trim(),
        otp: otp.trim(),
        password,
      });

      if (resetError) {
        throw new Error(
          resetError.message || "Unable to reset your password.",
        );
      }

      alert("Password reset successfully. Please sign in.");
      navigate("/signin", { replace: true });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to reset your password. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = `w-full rounded-2xl border bg-white/[0.02] py-3.5 pl-11 pr-12 text-sm text-white placeholder-slate-500 outline-hidden transition-all duration-200 focus:border-cyan-500 focus:bg-white/[0.04] focus:ring-4 focus:ring-cyan-500/15 ${
    error ? "border-red-500 focus:border-red-500 focus:ring-red-500/15" : "border-white/10"
  }`;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
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
            Account Recovery
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {step === "email" ? "Forgot Password" : "Reset Password"}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {step === "email"
              ? "Enter your email and we'll send you a 6-digit code."
              : "Enter the 6-digit code sent to your email."}
          </p>
        </div>

        {step === "email" ? (
          <form className="space-y-5" onSubmit={handleSendCode}>
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
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3.5 text-sm font-medium text-red-400"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="relative flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-500 hover:to-cyan-400 hover:shadow-cyan-500/25 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <FaPaperPlane className="h-4 w-4" />
                  Send Code
                </>
              )}
            </motion.button>
          </form>
        ) : (
          <form className="space-y-5" onSubmit={handleReset}>
            <button
              type="button"
              onClick={() => setStep("email")}
              className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors"
            >
              <FaArrowLeft className="h-3 w-3" />
              Change email
            </button>

            <div className="flex flex-col">
              <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Verification Code
              </span>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-slate-500">
                  <FaKey className="h-4 w-4" />
                </span>
                <input
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(event) =>
                    setOtp(event.target.value.replace(/\D/g, ""))
                  }
                  placeholder="123456"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                New Password
              </span>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-slate-500">
                  <FaLock className="h-4 w-4" />
                </span>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••••••"
                  className={inputClass}
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
            </div>

            <div className="flex flex-col">
              <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Confirm New Password
              </span>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-slate-500">
                  <FaLock className="h-4 w-4" />
                </span>
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="••••••••••••"
                  className={inputClass}
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
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3.5 text-sm font-medium text-red-400"
              >
                {error}
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
                "Reset Password"
              )}
            </motion.button>
          </form>
        )}

        <p className="mt-8 text-center text-xs sm:text-sm text-slate-400">
          Remembered your password?{" "}
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

export default ForgotPasswordPage;
