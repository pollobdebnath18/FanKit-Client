import { type FormEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
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
      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        callbackURL: "/",
      });

      if (error) {
        throw new Error(error.message || "Unable to create your account.");
      }

      if (data?.user) {
        navigate("/signin");
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
    <div className="flex  items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_45%)] px-4">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-2xl">
        <div className="grid md:grid-cols-[1.05fr_0.95fr]">
          <div className="hidden bg-linear-to-br from-slate-950 via-sky-700 to-blue-500 p-10 text-white md:flex md:flex-col md:justify-between">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-sky-100">
                Join FanKit
              </p>
              <h1 className="text-4xl font-semibold leading-tight">
                Create a professional account and move faster.
              </h1>
              <p className="mt-4 max-w-md text-sm text-sky-100/90">
                Secure sign-up, polished onboarding, and a workspace built for
                modern teams.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-white/20 bg-white/10 p-5 text-sm backdrop-blur">
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-300" />
                <div>
                  <p className="font-semibold">Fast onboarding</p>
                  <p className="text-sky-100/80">
                    Set up your profile in minutes.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300" />
                <div>
                  <p className="font-semibold">Trusted security</p>
                  <p className="text-sky-100/80">
                    Protected logins and safe password handling.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10 lg:p-12">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                Create account
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-base-content">
                Let&apos;s get you started
              </h2>
              <p className="mt-2 text-sm text-base-content/70">
                Fill in your details to create a new account.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="form-control w-full">
                <span className="label-text mb-2 font-medium">Full Name</span>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
                />
                {errors.name ? (
                  <span className="label-text-alt mt-1 text-error">
                    {errors.name}
                  </span>
                ) : null}
              </label>

              <label className="form-control w-full">
                <span className="label-text mb-2 font-medium">Email</span>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                />
                {errors.email ? (
                  <span className="label-text-alt mt-1 text-error">
                    {errors.email}
                  </span>
                ) : null}
              </label>

              <label className="form-control w-full">
                <span className="label-text mb-2 font-medium">Password</span>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className={`input input-bordered w-full pr-12 ${errors.password ? "input-error" : ""}`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-base-content/70"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password ? (
                  <span className="label-text-alt mt-1 text-error">
                    {errors.password}
                  </span>
                ) : null}
              </label>

              <label className="form-control w-full">
                <span className="label-text mb-2 font-medium">
                  Confirm Password
                </span>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={`input input-bordered w-full pr-12 ${errors.confirmPassword ? "input-error" : ""}`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-base-content/70"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword ? (
                  <span className="label-text-alt mt-1 text-error">
                    {errors.confirmPassword}
                  </span>
                ) : null}
              </label>

              {serverError ? (
                <div className="rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
                  {serverError}
                </div>
              ) : null}

              <button
                type="submit"
                className="btn btn-primary w-full rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-base-content/70">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="font-semibold text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
