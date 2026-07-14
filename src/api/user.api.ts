import { apiClient } from "./apiClient";

export const UserAPI = {
  getCurrentUser() {
    return apiClient("/api/users/me");
  },

  getAllUsers() {
    return apiClient("/api/users");
  },
};
