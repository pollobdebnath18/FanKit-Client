import { createAuthClient } from "better-auth/react";

// Dev: set VITE_AUTH_API_URL=http://localhost:8000 in your local .env
// Prod: do NOT set VITE_AUTH_API_URL in Vercel — it falls back to
//       window.location.origin so requests go through the Vercel rewrite
//       proxy and the session cookie stays first-party.
const baseURL =
  import.meta.env.VITE_AUTH_API_URL || window.location.origin;

export const authClient = createAuthClient({
  baseURL,
  fetchOptions: {
    credentials: "include",
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
