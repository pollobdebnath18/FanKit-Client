import { apiClient } from "./apiClient";

export interface MessagePayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const MessageAPI = {
  send(payload: MessagePayload) {
    return apiClient<{ success: boolean; message: string }>(
      "/api/messages",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
    );
  },
};
