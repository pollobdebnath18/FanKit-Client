// Dev: VITE_AUTH_API_URL=http://localhost:8000 (from local .env)
// Prod: VITE_AUTH_API_URL must NOT be set in Vercel env vars —
//       falls back to window.location.origin so all requests go
//       through the Vercel rewrite proxy with a first-party cookie.
export const BASE_URL = import.meta.env.DEV ? '' : window.location.origin;

const authToken = async () => {
  const { firebaseAuthApi } = await import("../lib/firebase");
  return firebaseAuthApi.getIdToken();
};

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = await authToken();
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include",
    headers,
    ...options,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
}
