// Dev: VITE_AUTH_API_URL=http://localhost:8000 (from local .env)
// Prod: VITE_AUTH_API_URL must NOT be set in Vercel env vars —
//       falls back to window.location.origin so all requests go
//       through the Vercel rewrite proxy with a first-party cookie.
export const BASE_URL =
  import.meta.env.VITE_AUTH_API_URL || window.location.origin;

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
}
