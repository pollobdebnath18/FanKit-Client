import { apiClient } from "./apiClient";
export interface User {
  _id: string;
  name: string;
  email: string;
  // role?: string;
  role: "user" | "admin";
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  phone?: string;
  image?: string;
  avatar?: string;
}

// interface UsersResponse {
//   success: boolean;
//   users: User[];
// }

interface MessageResponse {
  success: boolean;
  message: string;
}

export type UserRole = User["role"];

export const UserAPI = {
  getCurrentUser() {
    return apiClient<User>("/api/users/me");
  },

  getAllUsers() {
    return apiClient<User[]>("/api/users");
  },

  updateRole(id: string, role: UserRole) {
    return apiClient<MessageResponse>(`/api/users/${id}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    });
  },

  deleteUser(id: string) {
    return apiClient<MessageResponse>(`/api/users/${id}`, {
      method: "DELETE",
    });
  },
};
