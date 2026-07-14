import { useQuery } from "@tanstack/react-query";
import { UserAPI } from "../api/user.api";

export const useCurrentUser = () => {
  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["current-user"],
    queryFn: UserAPI.getCurrentUser,
  });

  return {
    currentUser,
    isLoading,
    error,
  };
};
