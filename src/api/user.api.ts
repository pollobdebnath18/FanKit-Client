import { apiClient } from "./apiClient";
export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export const UserAPI = {
  getCurrentUser() {
    return apiClient<User>("/api/users/me");
  },

  getAllUsers() {
    return apiClient<User[]>("/api/users");
  },
};
