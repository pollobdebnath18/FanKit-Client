import { createAuthClient } from "better-auth/react";

const fallbackBaseURL = import.meta.env.DEV ? "http://localhost:8000" : "";

const baseURL =
  import.meta.env.VITE_AUTH_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  fallbackBaseURL;

export const authClient = createAuthClient({
  baseURL,
  fetchOptions: {
    credentials: "include", // Required for cross-origin cookie sending in production
  },
});

type BetterFetchResponse<TData = unknown> = {
  data: TData | null;
  error: { message?: string; code?: string } | null;
};

type EmailOtpClient = {
  requestPasswordReset: (input: {
    email: string;
  }) => Promise<BetterFetchResponse<{ success: boolean }>>;
  resetPassword: (input: {
    email: string;
    otp: string;
    password: string;
  }) => Promise<BetterFetchResponse<{ success: boolean }>>;
};

const authClientTyped = authClient as unknown as {
  emailOtp: EmailOtpClient;
};

export const { signIn, signUp, useSession, signOut } = authClient;
export const emailOtp = authClientTyped.emailOtp;
