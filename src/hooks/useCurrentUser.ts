import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/api/users/me", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch current user");
      }
  

      return response.json();
    },
  });

  return {
    currentUser: data,
    isLoading,
    error,
  };
};

