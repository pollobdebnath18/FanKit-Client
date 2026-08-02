import CheckoutField from "./CheckoutField";
import type {
  CheckoutCustomer,
  CheckoutErrors,
} from "../../lib/validation";

interface CustomerInfoFormProps {
  value: CheckoutCustomer;
  errors: CheckoutErrors;
  onChange: (field: keyof CheckoutCustomer, value: string) => void;
}

const CustomerInfoForm = ({
  value,
  errors,
  onChange,
}: CustomerInfoFormProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <CheckoutField
        name="fullName"
        label="Full Name"
        placeholder="John Doe"
        value={value.fullName}
        error={errors.fullName}
        onChange={(e) => onChange("fullName", e.target.value)}
        autoComplete="name"
      />
      <CheckoutField
        name="phone"
        label="Phone Number"
        placeholder="+880 1XXX-XXXXXX"
        value={value.phone}
        error={errors.phone}
        onChange={(e) => onChange("phone", e.target.value)}
        autoComplete="tel"
      />
      <div className="sm:col-span-2">
        <CheckoutField
          name="email"
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          value={value.email}
          error={errors.email}
          onChange={(e) => onChange("email", e.target.value)}
          autoComplete="email"
        />
      </div>
    </div>
  );
};

export default CustomerInfoForm;
