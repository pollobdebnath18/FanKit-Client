import { useQuery } from "@tanstack/react-query";
import { UserAPI, type User } from "../api/user.api";

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: UserAPI.getAllUsers,
  });
};
