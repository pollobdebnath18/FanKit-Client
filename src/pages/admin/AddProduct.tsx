import { type FormEvent, useState } from "react";
import {
  FaSpinner,
  FaImage,
  FaCheckCircle,
  FaTshirt,
  FaDollarSign,
  FaBoxOpen,
  FaTags,
} from "react-icons/fa";
import { ProductAPI } from "../../api/product.api";

interface ProductFormData {
  title: string;
  team: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  stock: string;
  sizes: string[];
  imageUrl: string;
}

interface ProductFormErrors {
  title?: string;
  team?: string;
  category?: string;
  shortDescription?: string;
  fullDescription?: string;
  price?: string;
  stock?: string;
  sizes?: string;
}

const CATEGORIES = [
  "Home Kit",
  "Away Kit",
  "Third Kit",
  "Goalkeeper Kit",
  "Retro",
  "Player Edition",
];
const AVAILABLE_SIZES = ["S", "M", "L", "XL", "XXL"];

const initialFormData: ProductFormData = {
  title: "",
  team: "",
  category: "",
  shortDescription: "",
  fullDescription: "",
  price: "",
  stock: "",
  sizes: [],
  imageUrl: "",
};

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
    {children}
  </span>
);

const ErrorMsg = ({ msg }: { msg?: string }) =>
  msg ? <p className="mt-1 text-xs font-medium text-red-500">{msg}</p> : null;

const inputBase =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#F5A623] focus:bg-white focus:ring-1 focus:ring-[#F5A623]";
const inputError = "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-200";

const AddProduct = () => {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const toggleSize = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
    setErrors((prev) => ({ ...prev, sizes: undefined }));
  };

  const validate = () => {
    const e: ProductFormErrors = {};
    if (!formData.title.trim()) e.title = "Title is required.";
    else if (formData.title.trim().length < 3) e.title = "At least 3 characters.";
    if (!formData.team.trim()) e.team = "Team / country is required.";
    if (!formData.category) e.category = "Please select a category.";
    if (!formData.shortDescription.trim()) e.shortDescription = "Short description is required.";
    else if (formData.shortDescription.trim().length > 120) e.shortDescription = "Max 120 characters.";
    if (!formData.fullDescription.trim()) e.fullDescription = "Full description is required.";
    else if (formData.fullDescription.trim().length < 20) e.fullDescription = "At least 20 characters.";
    if (!formData.price) e.price = "Price is required.";
    else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) e.price = "Enter a valid price.";
    if (!formData.stock) e.stock = "Stock quantity is required.";
    else if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) e.stock = "Enter a valid stock number.";
    if (formData.sizes.length === 0) e.sizes = "Select at least one size.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError("");
    setSuccessMessage("");
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await ProductAPI.create({
        title: formData.title.trim(),
        team: formData.team.trim(),
        category: formData.category,
        shortDescription: formData.shortDescription.trim(),
        fullDescription: formData.fullDescription.trim(),
        price: Number(formData.price),
        stock: Number(formData.stock),
        sizes: formData.sizes,
        imageUrl: formData.imageUrl.trim() || undefined,
      });
      setSuccessMessage("Jersey added to the store successfully!");
      setFormData(initialFormData);
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#0B1F3A] md:text-3xl">Add New Jersey</h2>
        <p className="mt-1 text-slate-500">Fill in the details below to list a new jersey in the store.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
        {/* Left: main fields */}
        <div className="space-y-5 lg:col-span-2">
          {/* Basic Info Card */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="mb-5 flex items-center gap-2 text-sm font-bold text-[#0B1F3A]">
              <FaTshirt className="text-[#F5A623]" /> Basic Information
            </h3>
            <div className="space-y-5">
              <div>
                <FieldLabel>Jersey Title *</FieldLabel>
                <input
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Argentina Home Jersey 2026"
                  className={`${inputBase} ${errors.title ? inputError : ""}`}
                />
                <ErrorMsg msg={errors.title} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel>Team / Country *</FieldLabel>
                  <input
                    name="team"
                    type="text"
                    value={formData.team}
                    onChange={handleChange}
                    placeholder="e.g. Argentina"
                    className={`${inputBase} ${errors.team ? inputError : ""}`}
                  />
                  <ErrorMsg msg={errors.team} />
                </div>
                <div>
                  <FieldLabel>Category *</FieldLabel>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`${inputBase} ${errors.category ? inputError : ""}`}
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ErrorMsg msg={errors.category} />
                </div>
              </div>
            </div>
          </div>

          {/* Descriptions Card */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="mb-5 flex items-center gap-2 text-sm font-bold text-[#0B1F3A]">
              <FaTags className="text-[#F5A623]" /> Descriptions
            </h3>
            <div className="space-y-5">
              <div>
                <FieldLabel>Short Description * <span className="ml-1 font-normal normal-case text-slate-400">(shown on product card)</span></FieldLabel>
                <input
                  name="shortDescription"
                  type="text"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="One-line summary..."
                  maxLength={120}
                  className={`${inputBase} ${errors.shortDescription ? inputError : ""}`}
                />
                <div className="mt-1 flex items-center justify-between">
                  <ErrorMsg msg={errors.shortDescription} />
                  <span className={`ml-auto text-xs ${formData.shortDescription.length > 100 ? "text-amber-500" : "text-slate-400"}`}>
                    {formData.shortDescription.length}/120
                  </span>
                </div>
              </div>
              <div>
                <FieldLabel>Full Description *</FieldLabel>
                <textarea
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleChange}
                  placeholder="Material, fit, sponsor details, wash instructions…"
                  rows={5}
                  className={`${inputBase} resize-none leading-relaxed ${errors.fullDescription ? inputError : ""}`}
                />
                <ErrorMsg msg={errors.fullDescription} />
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="mb-5 flex items-center gap-2 text-sm font-bold text-[#0B1F3A]">
              <FaDollarSign className="text-[#F5A623]" /> Pricing & Stock
            </h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <FieldLabel>Price (USD) *</FieldLabel>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">$</span>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="79.99"
                    className={`${inputBase} pl-8 ${errors.price ? inputError : ""}`}
                  />
                </div>
                <ErrorMsg msg={errors.price} />
              </div>
              <div>
                <FieldLabel>Stock Quantity *</FieldLabel>
                <div className="relative">
                  <FaBoxOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                  <input
                    name="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="50"
                    className={`${inputBase} pl-10 ${errors.stock ? inputError : ""}`}
                  />
                </div>
                <ErrorMsg msg={errors.stock} />
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-5">
              <FieldLabel>Available Sizes *</FieldLabel>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_SIZES.map((size) => {
                  const selected = formData.sizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`h-10 w-14 rounded-xl border text-sm font-bold transition-all ${
                        selected
                          ? "border-[#0B1F3A] bg-[#0B1F3A] text-white shadow-md"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-400"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              <ErrorMsg msg={errors.sizes} />
            </div>
          </div>
        </div>

        {/* Right: image + submit */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="mb-5 flex items-center gap-2 text-sm font-bold text-[#0B1F3A]">
              <FaImage className="text-[#F5A623]" /> Product Image
            </h3>
            <div>
              <FieldLabel>Image URL <span className="font-normal normal-case text-slate-400">(optional)</span></FieldLabel>
              <div className="relative">
                <FaImage className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  name="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  className={`${inputBase} pl-10`}
                />
              </div>

              {/* Image Preview */}
              <div className={`mt-4 overflow-hidden rounded-xl border border-slate-200 transition-all ${formData.imageUrl ? "h-52" : "h-28"}`}>
                {formData.imageUrl ? (
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = ""; }}
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 bg-slate-50 text-slate-300">
                    <FaImage className="text-3xl" />
                    <span className="text-xs font-medium">Image preview here</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Feedback */}
          {serverError && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {serverError}
            </div>
          )}
          {successMessage && (
            <div className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
              <FaCheckCircle className="mt-0.5 shrink-0 text-emerald-500" />
              {successMessage}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5C] py-3 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin" /> Adding Jersey...
              </>
            ) : (
              "Add Jersey to Store"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
