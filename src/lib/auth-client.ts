import { createAuthClient } from "better-auth/react";

const baseURL =
  import.meta.env.VITE_AUTH_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "";

export const authClient = createAuthClient({
  baseURL,
});

export const { signIn, signUp, useSession } = authClient;
