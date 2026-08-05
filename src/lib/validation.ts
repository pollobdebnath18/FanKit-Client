export interface CheckoutCustomer {
  fullName: string;
  email: string;
  phone: string;
}

export interface CheckoutShipping {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface CheckoutForm {
  customer: CheckoutCustomer;
  shipping: CheckoutShipping;
}

export type CheckoutErrors = Partial<
  Record<keyof CheckoutCustomer | keyof CheckoutShipping, string>
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s0-9]{10,}$/;

const required = (value: string) => value.trim().length > 0;

export const validateCheckout = (form: CheckoutForm): CheckoutErrors => {
  const errors: CheckoutErrors = {};

  if (!required(form.customer.fullName)) {
    errors.fullName = "Full name is required.";
  }
  if (!required(form.customer.email)) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(form.customer.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!required(form.customer.phone)) {
    errors.phone = "Phone number is required.";
  } else if (!PHONE_RE.test(form.customer.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!required(form.shipping.address)) {
    errors.address = "Street address is required.";
  }
  if (!required(form.shipping.city)) {
    errors.city = "City is required.";
  }
  if (!required(form.shipping.postalCode)) {
    errors.postalCode = "Postal code is required.";
  }
  if (!required(form.shipping.country)) {
    errors.country = "Country is required.";
  }

  return errors;
};
