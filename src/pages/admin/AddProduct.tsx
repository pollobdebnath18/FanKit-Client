import { type FormEvent, useState } from "react";
import { FaSpinner, FaImage } from "react-icons/fa";
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
  imageUrl: string ;
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

const AddProduct = () => {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const toggleSize = (size: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: alreadySelected
          ? prev.sizes.filter((s) => s !== size)
          : [...prev.sizes, size],
      };
    });
    setErrors((prev) => ({ ...prev, sizes: undefined }));
  };

  const validate = () => {
    const nextErrors: ProductFormErrors = {};

    if (!formData.title.trim()) {
      nextErrors.title = "Title is required.";
    } else if (formData.title.trim().length < 3) {
      nextErrors.title = "Title must be at least 3 characters.";
    }

    if (!formData.team.trim()) {
      nextErrors.team = "Team / country is required.";
    }

    if (!formData.category) {
      nextErrors.category = "Please select a category.";
    }

    if (!formData.shortDescription.trim()) {
      nextErrors.shortDescription = "Short description is required.";
    } else if (formData.shortDescription.trim().length > 120) {
      nextErrors.shortDescription = "Keep it under 120 characters.";
    }

    if (!formData.fullDescription.trim()) {
      nextErrors.fullDescription = "Full description is required.";
    } else if (formData.fullDescription.trim().length < 20) {
      nextErrors.fullDescription = "Please write at least 20 characters.";
    }

    if (!formData.price) {
      nextErrors.price = "Price is required.";
    } else if (
      Number.isNaN(Number(formData.price)) ||
      Number(formData.price) <= 0
    ) {
      nextErrors.price = "Enter a valid price greater than 0.";
    }

    if (!formData.stock) {
      nextErrors.stock = "Stock quantity is required.";
    } else if (
      Number.isNaN(Number(formData.stock)) ||
      Number(formData.stock) < 0
    ) {
      nextErrors.stock = "Enter a valid stock quantity.";
    }

    if (formData.sizes.length === 0) {
      nextErrors.sizes = "Select at least one available size.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
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
       imageUrl: formData.imageUrl.trim() !== ""? formData.imageUrl.trim() :  undefined,
     });

     setSuccessMessage("Jersey added successfully!");
     setFormData(initialFormData);
   } catch (error) {
     setServerError(
       error instanceof Error
         ? error.message
         : "Something went wrong. Please try again.",
     );
   } finally {
     setIsSubmitting(false);
   }
 };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Add New Jersey</h1>
        <p className="mt-1 text-sm text-slate-500">
          Fill in the details below to list a new jersey in the store.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        {/* Title */}
        <label className="form-control w-full">
          <span className="label-text mb-2 font-medium text-slate-700">
            Title
          </span>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Argentina Home Jersey 2026"
            className={`input input-bordered w-full ${errors.title ? "input-error" : ""}`}
          />
          {errors.title && (
            <span className="mt-1 text-xs text-error">{errors.title}</span>
          )}
        </label>

        {/* Team + Category */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="form-control w-full">
            <span className="label-text mb-2 font-medium text-slate-700">
              Team / Country
            </span>
            <input
              name="team"
              type="text"
              value={formData.team}
              onChange={handleChange}
              placeholder="e.g. Argentina"
              className={`input input-bordered w-full ${errors.team ? "input-error" : ""}`}
            />
            {errors.team && (
              <span className="mt-1 text-xs text-error">{errors.team}</span>
            )}
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-2 font-medium text-slate-700">
              Category
            </span>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`select select-bordered w-full ${errors.category ? "select-error" : ""}`}
            >
              <option value="">Select category</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="mt-1 text-xs text-error">{errors.category}</span>
            )}
          </label>
        </div>

        {/* Short description */}
        <label className="form-control w-full">
          <span className="label-text mb-2 font-medium text-slate-700">
            Short Description
          </span>
          <input
            name="shortDescription"
            type="text"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="One-line summary shown on the product card"
            maxLength={120}
            className={`input input-bordered w-full ${errors.shortDescription ? "input-error" : ""}`}
          />
          <div className="mt-1 flex items-center justify-between">
            {errors.shortDescription ? (
              <span className="text-xs text-error">
                {errors.shortDescription}
              </span>
            ) : (
              <span />
            )}
            <span className="text-xs text-slate-400">
              {formData.shortDescription.length}/120
            </span>
          </div>
        </label>

        {/* Full description */}
        <label className="form-control w-full">
          <span className="label-text mb-2 font-medium text-slate-700">
            Full Description
          </span>
          <textarea
            name="fullDescription"
            value={formData.fullDescription}
            onChange={handleChange}
            placeholder="Material, fit, sponsor details, etc."
            rows={5}
            className={`textarea textarea-bordered w-full ${errors.fullDescription ? "textarea-error" : ""}`}
          />
          {errors.fullDescription && (
            <span className="mt-1 text-xs text-error">
              {errors.fullDescription}
            </span>
          )}
        </label>

        {/* Price + Stock */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="form-control w-full">
            <span className="label-text mb-2 font-medium text-slate-700">
              Price (USD)
            </span>
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 79.99"
              className={`input input-bordered w-full ${errors.price ? "input-error" : ""}`}
            />
            {errors.price && (
              <span className="mt-1 text-xs text-error">{errors.price}</span>
            )}
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-2 font-medium text-slate-700">
              Stock Quantity
            </span>
            <input
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              placeholder="e.g. 50"
              className={`input input-bordered w-full ${errors.stock ? "input-error" : ""}`}
            />
            {errors.stock && (
              <span className="mt-1 text-xs text-error">{errors.stock}</span>
            )}
          </label>
        </div>

        {/* Sizes */}
        <div>
          <span className="label-text mb-2 block font-medium text-slate-700">
            Available Sizes
          </span>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_SIZES.map((size) => {
              const isSelected = formData.sizes.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`h-10 w-14 rounded-lg border text-sm font-semibold transition-colors ${
                    isSelected
                      ? "border-[#0B1F3A] bg-[#0B1F3A] text-white"
                      : "border-slate-300 text-slate-600 hover:border-slate-400"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
          {errors.sizes && (
            <span className="mt-1 block text-xs text-error">
              {errors.sizes}
            </span>
          )}
        </div>

        {/* Image URL (optional) */}
        <label className="form-control w-full">
          <span className="label-text mb-2 font-medium text-slate-700">
            Image URL{" "}
            <span className="font-normal text-slate-400">(optional)</span>
          </span>
          <div className="relative">
            <FaImage className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              name="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/jersey.jpg"
              className="input input-bordered w-full pl-10"
            />
          </div>
          {formData.imageUrl && (
            <div className="mt-3 h-32 w-32 overflow-hidden rounded-lg border border-slate-200">
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
        </label>

        {/* Server feedback */}
        {serverError && (
          <div className="rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
            {serverError}
          </div>
        )}
        {successMessage && (
          <div className="rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-700">
            {successMessage}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full rounded-full sm:w-auto sm:px-10"
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin" />
              Adding...
            </>
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
