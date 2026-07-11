import { type FormEvent, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link } from "react-router";

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.15),transparent_45%)] px-4">
      <div className="w-full max-w-md rounded-3xl border border-base-300 bg-base-100 p-8 shadow-2xl sm:p-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
            Sign in
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-base-content">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-base-content/70">
            Sign in to continue to your workspace.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="form-control w-full mb-10">
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

          <label className="form-control w-full ">
            <span className="label-text mb-2  font-medium">Password</span>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`input input-bordered w-full pr-12 ${errors.password ? "input-error" : ""}`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-base-content/70"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
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

          <div className="flex items-center justify-between text-sm">
            <label className="label cursor-pointer gap-2 p-0">
              <input type="checkbox" className="checkbox checkbox-sm" />
              <span className="label-text">Remember me</span>
            </label>
            <a href="#" className="font-medium text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="btn btn-primary w-full rounded-full">
            Sign In
          </button>
        </form>

        <div className="divider">or continue with</div>

        <button className="btn btn-outline w-full rounded-full">
          <FaGoogle className="mr-2" />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-base-content/70">
          New here?{" "}
          <Link
            to="/signup"
            className="font-semibold text-primary hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
