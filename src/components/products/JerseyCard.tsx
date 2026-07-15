import { FaHeart, FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router";
import type { Product } from "../../api/product.api";

interface JerseyCardProps {
  product: Product;
}

const JerseyCard = ({ product }: JerseyCardProps) => {
  return (
    <Link to={`/products/${product._id}`}>
      <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 h-full">
        {/* Image */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <img
            src={
              product.imageUrl || "https://placehold.co/600x600?text=No+Image"
            }
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />

          <button
            onClick={(e) => e.preventDefault()}
            className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow hover:text-red-500 transition"
          >
            <FaHeart />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col h-[160px]">
          <p className="text-xs uppercase text-gray-500 mb-2">{product.team}</p>

          <h3 className="font-bold text-slate-900 line-clamp-2 mb-2">
            {product.title}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-2 mb-4">
            {product.shortDescription}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-slate-900">
                ${product.price}
              </p>

              <p className="text-sm text-gray-400 line-through">
                ${product.price + 20}
              </p>
            </div>

            <button
              onClick={(e) => e.preventDefault()}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition"
            >
              <FaShoppingBag />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JerseyCard;
