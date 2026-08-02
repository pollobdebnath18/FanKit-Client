import CheckoutField from "./CheckoutField";
import type {
  CheckoutErrors,
  CheckoutShipping,
} from "../../lib/validation";

interface ShippingFormProps {
  value: CheckoutShipping;
  errors: CheckoutErrors;
  onChange: (field: keyof CheckoutShipping, value: string) => void;
}

const ShippingForm = ({ value, errors, onChange }: ShippingFormProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <CheckoutField
          name="address"
          label="Street Address"
          placeholder="House 12, Road 5, Dhanmondi"
          value={value.address}
          error={errors.address}
          onChange={(e) => onChange("address", e.target.value)}
          autoComplete="street-address"
        />
      </div>
      <CheckoutField
        name="city"
        label="City"
        placeholder="Dhaka"
        value={value.city}
        error={errors.city}
        onChange={(e) => onChange("city", e.target.value)}
        autoComplete="address-level2"
      />
      <CheckoutField
        name="postalCode"
        label="Postal Code"
        placeholder="1209"
        value={value.postalCode}
        error={errors.postalCode}
        onChange={(e) => onChange("postalCode", e.target.value)}
        autoComplete="postal-code"
      />
      <div className="sm:col-span-2">
        <CheckoutField
          name="country"
          label="Country"
          placeholder="Bangladesh"
          value={value.country}
          error={errors.country}
          onChange={(e) => onChange("country", e.target.value)}
          autoComplete="country-name"
        />
      </div>
    </div>
  );
};

export default ShippingForm;
