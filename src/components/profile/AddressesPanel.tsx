import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FaMapMarkerAlt,
  FaPlus,
  FaTrash,
  FaSpinner,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { useAddresses } from "../../hooks/useAddresses";
import { AddressesAPI, type Address } from "../../api/addresses.api";

const inputClasses =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

const AddressesPanel = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useAddresses();
  const addresses = data?.addresses ?? [];

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    isDefault: false,
  });
  const [error, setError] = useState("");

  const addMutation = useMutation({
    mutationFn: () => AddressesAPI.add(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      setShowForm(false);
      setForm({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        isDefault: false,
      });
      setError("");
    },
    onError: (err: Error) => {
      setError(err.message || "Failed to add address.");
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id: string) => AddressesAPI.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });

  const updateField = (key: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    addMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-2xl border border-slate-100 bg-white"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white py-16 text-center">
        <p className="text-sm font-semibold text-red-500">
          We couldn&apos;t load your addresses.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Saved Addresses</h3>
          <p className="text-sm text-slate-500">
            {addresses.length}{" "}
            {addresses.length === 1 ? "address" : "addresses"} on file
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((open) => !open)}
          className="inline-flex items-center gap-2 rounded-full bg-[#0B1F3A] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#132C52]"
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? "Cancel" : "Add Address"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
                Full Name *
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Jane Doe"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
                Phone *
              </label>
              <input
                required
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="+880 1XXX-XXXXXX"
                className={inputClasses}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
                Address *
              </label>
              <input
                required
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="House, Road, Area"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
                City *
              </label>
              <input
                required
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
                placeholder="Sylhet"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
                Country *
              </label>
              <input
                required
                value={form.country}
                onChange={(e) => updateField("country", e.target.value)}
                placeholder="Bangladesh"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
                State / Division
              </label>
              <input
                value={form.state}
                onChange={(e) => updateField("state", e.target.value)}
                placeholder="Optional"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
                ZIP / Postal Code
              </label>
              <input
                value={form.zip}
                onChange={(e) => updateField("zip", e.target.value)}
                placeholder="Optional"
                className={inputClasses}
              />
            </div>
          </div>

          <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) => updateField("isDefault", e.target.checked)}
              className="h-4 w-4 rounded accent-[#0B1F3A]"
            />
            Set as default address
          </label>

          {error && (
            <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={addMutation.isPending}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0B1F3A] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#132C52] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {addMutation.isPending ? (
              <FaSpinner className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <FaCheck className="h-3.5 w-3.5" />
            )}
            Save Address
          </button>
        </form>
      )}

      {addresses.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-200 py-20 text-center">
          <FaMapMarkerAlt className="mb-4 text-5xl text-slate-300" />
          <h3 className="text-lg font-bold text-slate-700">
            No saved addresses
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Add a shipping address to make checkout faster.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((address: Address) => (
            <div
              key={address._id}
              className="relative rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              {address.isDefault && (
                <span className="absolute right-4 top-4 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-600">
                  Default
                </span>
              )}
              <p className="pr-20 text-sm font-bold text-slate-900">
                {address.name}
              </p>
              <p className="mt-1 text-xs text-slate-500">{address.phone}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {address.address}
                <br />
                {address.city}
                {address.state ? `, ${address.state}` : ""}
                {address.zip ? `, ${address.zip}` : ""}
                <br />
                {address.country}
              </p>
              <button
                type="button"
                onClick={() => removeMutation.mutate(address._id)}
                disabled={removeMutation.isPending}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {removeMutation.isPending ? (
                  <FaSpinner className="h-3 w-3 animate-spin" />
                ) : (
                  <FaTrash className="h-3 w-3" />
                )}
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressesPanel;
