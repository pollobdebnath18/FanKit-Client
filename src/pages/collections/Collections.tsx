import { useSearchParams } from "react-router";
import JerseyCard from "../../components/products/JerseyCard";
import { useCollection } from "../../hooks/useCollection";

const Collections = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";
  const team = searchParams.get("team") || "All";
  const sort = searchParams.get("sort") || "newest";
  const maxPrice = Number(searchParams.get("maxPrice")) || 300;
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data, isLoading, isError } = useCollection({
    search,
    category,
    team,
    sort,
    page: currentPage,
    maxPrice,
  });

  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  // Temporary static options
  const categories = ["All", "Home Kit", "Away Kit", "Third Kit", "Goalkeeper"];

  const teams = [
    "All",
    "Argentina",
    "Brazil",
    "Germany",
    "France",
    "Spain",
    "Portugal",
    "England",
  ];

  const updateParams = (updates: Record<string, string>) => {
    setSearchParams({
      search,
      category,
      team,
      sort,
      page: String(currentPage),
      maxPrice: String(maxPrice),
      ...updates,
    });
  };

  if (isLoading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-red-500">
        Something went wrong.
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Filters */}
      <div className="grid md:grid-cols-5 gap-4 mb-10">
        {/* Search */}
        <input
          className="input input-bordered w-full"
          placeholder="Search jersey..."
          value={search}
          onChange={(e) =>
            updateParams({
              search: e.target.value,
              page: "1",
            })
          }
        />

        {/* Category */}
        <select
          className="select select-bordered"
          value={category}
          onChange={(e) =>
            updateParams({
              category: e.target.value,
              page: "1",
            })
          }
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        {/* Team */}
        <select
          className="select select-bordered"
          value={team}
          onChange={(e) =>
            updateParams({
              team: e.target.value,
              page: "1",
            })
          }
        >
          {teams.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          className="select select-bordered"
          value={sort}
          onChange={(e) =>
            updateParams({
              sort: e.target.value,
              page: "1",
            })
          }
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price Low → High</option>
          <option value="price-high">Price High → Low</option>
          <option value="name">Name (A-Z)</option>
        </select>

        {/* Price */}
        <div>
          <input
            type="range"
            min={0}
            max={300}
            value={maxPrice}
            className="range range-primary"
            onChange={(e) =>
              updateParams({
                maxPrice: e.target.value,
                page: "1",
              })
            }
          />

          <p className="text-sm mt-2">
            Max Price: <strong>${maxPrice}</strong>
          </p>
        </div>
      </div>

      {/* Count */}
      <div className="flex justify-between mb-8">
        <p>
          Showing <span className="font-semibold">{products.length}</span> of{" "}
          <span className="font-semibold">{total}</span> products
        </p>
      </div>

      {/* Products */}
      {products.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-semibold">No Products Found</h2>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <JerseyCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          <button
            className="btn"
            disabled={currentPage === 1}
            onClick={() =>
              updateParams({
                page: String(currentPage - 1),
              })
            }
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`btn ${
                currentPage === index + 1 ? "btn-primary" : ""
              }`}
              onClick={() =>
                updateParams({
                  page: String(index + 1),
                })
              }
            >
              {index + 1}
            </button>
          ))}

          <button
            className="btn"
            disabled={currentPage === totalPages}
            onClick={() =>
              updateParams({
                page: String(currentPage + 1),
              })
            }
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default Collections;
