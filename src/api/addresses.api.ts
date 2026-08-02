import { apiClient } from "./apiClient";

export interface Address {
  _id: string;
  userId: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state?: string;
  zip?: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
}

export interface AddressInput {
  name: string;
  phone: string;
  address: string;
  city: string;
  state?: string;
  zip?: string;
  country: string;
  isDefault?: boolean;
}

export interface AddressesResponse {
  success: boolean;
  addresses: Address[];
}

interface MessageResponse {
  success: boolean;
  message: string;
}

export const AddressesAPI = {
  getMine() {
    return apiClient<AddressesResponse>("/api/addresses");
  },

  add(payload: AddressInput) {
    return apiClient<MessageResponse>("/api/addresses", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  update(id: string, payload: Partial<AddressInput>) {
    return apiClient<MessageResponse>(`/api/addresses/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  remove(id: string) {
    return apiClient<MessageResponse>(`/api/addresses/${id}`, {
      method: "DELETE",
    });
  },
};
