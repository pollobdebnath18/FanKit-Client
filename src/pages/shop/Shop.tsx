import { useMemo, useState } from "react";
import { Link } from "react-router";
import { FaSearch, FaShoppingBag } from "react-icons/fa";
import { useProducts } from "../../hooks/useProducts";

const Shop = () => {
  const { data: products = [], isLoading } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [team, setTeam] = useState("All");

  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((product) => product.category))];
  }, [products]);

  const teams = useMemo(() => {
    return ["All", ...new Set(products.map((product) => product.team))];
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const matchSearch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(search.toLowerCase());

    const matchCategory = category === "All" || product.category === category;

    const matchTeam = team === "All" || product.team === team;

    return matchSearch && matchCategory && matchTeam;
  });

  return (
    <section className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900">Shop Jerseys</h1>

          <p className="text-gray-500 mt-3">
            Explore our latest football jersey collection.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search jerseys..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-lg py-2 pl-10 pr-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-lg p-2"
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            {/* Team */}
            <select
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="border rounded-lg p-2"
            >
              {teams.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            {/* Product Count */}
            <div className="flex items-center justify-center bg-blue-600 text-white rounded-lg font-semibold">
              {filteredProducts.length} Products
            </div>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-20 text-xl">Loading...</div>
        )}

        {/* Empty */}
        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">No Products Found</h2>

            <p className="text-gray-500 mt-2">
              Try changing the search or filters.
            </p>
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link key={product._id} to={`/products/${product._id}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition duration-300 h-full">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full aspect-square object-cover"
                  />

                  <div className="p-4 flex flex-col h-[180px]">
                    <span className="text-sm text-gray-500 uppercase">
                      {product.team}
                    </span>

                    <h2 className="font-semibold text-lg mt-1 line-clamp-2">
                      {product.title}
                    </h2>

                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                      {product.shortDescription}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xl font-bold text-blue-600">
                        ${product.price}
                      </span>

                      <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
                        <FaShoppingBag />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;
