import { Link } from "react-router";
import { FaEye, FaTrash, FaPlus } from "react-icons/fa";
import { useProducts } from "../../hooks/useProducts";

const ManageProducts = () => {
  const { data: products = [], isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <span className="text-lg font-medium text-slate-600">
          Loading products...
        </span>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Manage Products
            </h1>

            <p className="text-slate-500 mt-2">
              Manage all football jerseys from one place.
            </p>
          </div>

          <Link
            to="/admin/add-product"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            <FaPlus />
            Add Product
          </Link>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-2xl shadow border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr className="text-left">
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Country</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-t hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                  </td>

                  <td className="px-6 py-4 font-semibold">{product.title}</td>

                  <td className="px-6 py-4">{product.team}</td>

                  <td className="px-6 py-4">{product.category}</td>

                  <td className="px-6 py-4 font-semibold text-blue-600">
                    ${product.price}
                  </td>

                  <td className="px-6 py-4">{product.stock}</td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/products/${product._id}`}
                        className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                      >
                        <FaEye />
                      </Link>

                      <button className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet Cards */}
        <div className="grid gap-5 lg:hidden">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow border border-slate-200 p-4"
            >
              <div className="flex gap-4">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-24 h-24 rounded-xl object-cover border"
                />

                <div className="flex-1">
                  <h2 className="font-bold text-lg">{product.title}</h2>

                  <p className="text-sm text-slate-500">{product.team}</p>

                  <p className="text-sm mt-1">{product.category}</p>

                  <p className="text-blue-600 font-bold mt-2">
                    ${product.price}
                  </p>

                  <p className="text-sm mt-1">Stock: {product.stock}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-5">
                <Link
                  to={`/products/${product._id}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  <FaEye />
                  View
                </Link>

                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <div className="text-center text-slate-500 py-10">
              No products found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ManageProducts;
