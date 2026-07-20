import { useState } from "react";
import { Link } from "react-router";
import { FaEye, FaTrash, FaPlus, FaSearch, FaTshirt } from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductAPI, type Product } from "../../api/product.api";
import DeleteModal from "../../components/admin/DeleteModal";

const ManageProducts = () => {
  const queryClient = useQueryClient();
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: ProductAPI.getAll,
  });

  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.team.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await ProductAPI.delete(deleteTarget._id);
      queryClient.setQueryData<Product[]>(["products"], (old = []) =>
        old.filter((p) => p._id !== deleteTarget._id)
      );
      setDeleteTarget(null);
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="h-8 w-8 animate-spin text-[#0B1F3A]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <p className="text-sm font-semibold text-slate-500">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F3A] md:text-3xl">Manage Products</h2>
          <p className="mt-1 text-slate-500">
            {products.length} jersey{products.length !== 1 ? "s" : ""} in the store
          </p>
        </div>
        <Link
          to="/admin/add-product"
          className="inline-flex items-center gap-2 self-start rounded-xl bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5C] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:shadow-lg"
        >
          <FaPlus /> Add New Jersey
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
        <input
          type="text"
          placeholder="Search by title or team..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none shadow-sm focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm lg:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Team / Country</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((product) => (
              <tr
                key={product._id}
                className="group transition hover:bg-slate-50/70"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="h-14 w-14 rounded-xl border border-slate-100 object-cover shadow-sm"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-300">
                        <FaTshirt className="text-2xl" />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-slate-900 line-clamp-1 max-w-[200px]">
                        {product.title}
                      </p>
                      <p className="text-xs text-slate-400">{product.sizes?.join(", ")}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-700">{product.team}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-[#0B1F3A]">${product.price}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      product.stock > 10
                        ? "bg-emerald-100 text-emerald-700"
                        : product.stock > 0
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock > 0 ? `${product.stock} left` : "Out of stock"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      to={`/products/${product._id}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B1F3A]/10 text-[#0B1F3A] transition hover:bg-[#0B1F3A] hover:text-white"
                      title="View product"
                    >
                      <FaEye className="text-sm" />
                    </Link>
                    <button
                      onClick={() => setDeleteTarget(product)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 transition hover:bg-red-600 hover:text-white"
                      title="Delete product"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile / Tablet Cards */}
      <div className="grid gap-4 lg:hidden">
        {filtered.map((product) => (
          <div
            key={product._id}
            className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <div className="flex gap-4">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="h-20 w-20 rounded-xl border border-slate-100 object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-300 shrink-0">
                  <FaTshirt className="text-3xl" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-slate-900 line-clamp-2">{product.title}</h2>
                <p className="mt-1 text-xs text-slate-500">{product.team} · {product.category}</p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="font-bold text-[#0B1F3A]">${product.price}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    product.stock > 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                  }`}>
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Link
                to={`/products/${product._id}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#0B1F3A] py-2 text-xs font-bold text-[#0B1F3A] transition hover:bg-[#0B1F3A] hover:text-white"
              >
                <FaEye /> View
              </Link>
              <button
                onClick={() => setDeleteTarget(product)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-2 text-xs font-bold text-white transition hover:bg-red-700"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-slate-100 bg-white py-12 text-center text-slate-400 font-medium">
            No products found.
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={!!deleteTarget}
        onClose={() => !isDeleting && setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
        title="Delete Jersey?"
        description="This will permanently remove the jersey from the store and cannot be undone."
        itemName={deleteTarget?.title}
      />
    </div>
  );
};

export default ManageProducts;
