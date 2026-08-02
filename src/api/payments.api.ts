import { apiClient } from "./apiClient";
import type {
  CheckoutCustomer,
  CheckoutShipping,
} from "../lib/validation";

export interface CheckoutPayload {
  customer: CheckoutCustomer;
  shippingAddress: CheckoutShipping;
}

export interface StripeIntentResponse {
  success: boolean;
  clientSecret: string;
  orderId: string;
}

export const PaymentsAPI = {
  /** Create a Stripe payment intent (order snapshot created server-side). */
  createStripeIntent(payload: CheckoutPayload) {
    return apiClient<StripeIntentResponse>("/api/payments/stripe/intent", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /** Verify a succeeded PaymentIntent on the server and finalize the order. */
  confirmStripePayment(paymentIntentId: string) {
    return apiClient<{ success: boolean; orderId: string }>(
      "/api/payments/stripe/confirm",
      {
        method: "POST",
        body: JSON.stringify({ paymentIntentId }),
      },
    );
  },
};
