import { useQuery } from "@tanstack/react-query";
import { UserAPI } from "../api/user.api";
import { authClient } from "../lib/auth-client";

export const useCurrentUser = () => {
  const { data: session, isPending: sessionPending } = authClient.useSession();

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["current-user", session?.user?.id ?? "guest"],
    queryFn: async () => {
      try {
        return await UserAPI.getCurrentUser();
      } catch (err) {
        const message = err instanceof Error ? err.message : "";
        if (/401|unauthorized/i.test(message)) {
          return null;
        }
        throw err;
      }
    },
    enabled: !sessionPending && !!session?.user,
    retry: false,
    staleTime: 0,
  });

  return {
    currentUser,
    isLoading: sessionPending || isLoading,
    error,
  };
};
