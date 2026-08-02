import { apiClient } from "./apiClient";

export interface UpdateProfilePayload {
  name?: string;
  phone?: string;
  avatar?: string;
}

interface MessageResponse {
  success: boolean;
  message: string;
}

export const ProfileAPI = {
  update(payload: UpdateProfilePayload) {
    return apiClient<MessageResponse>("/api/users/me", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  changePassword(currentPassword: string, newPassword: string) {
    return apiClient<MessageResponse>("/api/users/me/password", {
      method: "PATCH",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },
};
