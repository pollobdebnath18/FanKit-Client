import { motion } from "framer-motion";
import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";
import { useState } from "react";

interface PlayerJersey {
  id: number;
  playerName: string;
  team: string;
  jerseyNumber: number;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  colors: string[];
  badge?: string;
  sizes: string[];
}

const PopularJerseys = () => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  const playerJerseys: PlayerJersey[] = [
    {
      id: 1,
      playerName: "Lionel Messi",
      team: "Argentina",
      jerseyNumber: 10,
      price: 119.99,
      originalPrice: 149.99,
      rating: 4.9,
      reviews: 542,
      image:
        "https://images.unsplash.com/photo-1599812675935-79ffe315eed0?w=400&h=500&fit=crop",
      colors: ["#87CEEB", "#FFFFFF"],
      badge: "GOAT",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    {
      id: 2,
      playerName: "Cristiano Ronaldo",
      team: "Portugal",
      jerseyNumber: 7,
      price: 129.99,
      originalPrice: 159.99,
      rating: 4.9,
      reviews: 638,
      image:
        "https://images.unsplash.com/photo-1577990452668-6c14dd0ebd43?w=400&h=500&fit=crop",
      colors: ["#DC143C", "#FFFFFF"],
      badge: "Legend",
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: 3,
      playerName: "Neymar Jr",
      team: "Brazil",
      jerseyNumber: 10,
      price: 99.99,
      originalPrice: 129.99,
      rating: 4.8,
      reviews: 421,
      image:
        "https://images.unsplash.com/photo-1589818752350-672d889aeb92?w=400&h=500&fit=crop",
      colors: ["#00A651", "#FFCC00"],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: 4,
      playerName: "Kylian Mbappé",
      team: "France",
      jerseyNumber: 10,
      price: 109.99,
      originalPrice: 139.99,
      rating: 4.9,
      reviews: 528,
      image:
        "https://images.unsplash.com/photo-1589818634629-81fceb6088de?w=400&h=500&fit=crop",
      colors: ["#002395", "#FFFFFF"],
      badge: "Rising Star",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    {
      id: 5,
      playerName: "Luis Suárez",
      team: "Uruguay",
      jerseyNumber: 9,
      price: 89.99,
      rating: 4.7,
      reviews: 312,
      image:
        "https://images.unsplash.com/photo-1588868882357-e17ef2d3cbd4?w=400&h=500&fit=crop",
      colors: ["#FFFFFF", "#0066CC"],
      sizes: ["M", "L", "XL"],
    },
    {
      id: 6,
      playerName: "Vinicius Jr",
      team: "Brazil",
      jerseyNumber: 7,
      price: 99.99,
      originalPrice: 129.99,
      rating: 4.8,
      reviews: 389,
      image:
        "https://images.unsplash.com/photo-1591090529796-7137dd9c7679?w=400&h=500&fit=crop",
      colors: ["#00A651", "#FFCC00"],
      badge: "Hot",
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: 7,
      playerName: "Harry Kane",
      team: "England",
      jerseyNumber: 9,
      price: 104.99,
      originalPrice: 129.99,
      rating: 4.7,
      reviews: 298,
      image:
        "https://images.unsplash.com/photo-1566186286323-a42f4d6a1d88?w=400&h=500&fit=crop",
      colors: ["#FFFFFF", "#1E90FF"],
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: 8,
      playerName: "Gianluigi Donnarumma",
      team: "Italy",
      jerseyNumber: 1,
      price: 89.99,
      rating: 4.6,
      reviews: 245,
      image:
        "https://images.unsplash.com/photo-1461895511934-ffe936ba3208?w=400&h=500&fit=crop",
      colors: ["#0066CC", "#FFFFFF"],
      sizes: ["M", "L", "XL"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: {
      y: -10,
      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  const toggleFavorite = (id: number) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id],
    );
  };

  const handleAddToCart = (id: number) => {
    setLoadingIds((prev) => [...prev, id]);
    setTimeout(() => {
      setLoadingIds((prev) => prev.filter((fId) => fId !== id));
    }, 1000);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
      className="py-16 md:py-24 bg-linear-to-b from-slate-50 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Popular Player{" "}
            <span className="bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Jerseys
            </span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Own the jerseys of your favorite legendary players.
          </motion.p>
        </motion.div>

        {/* Jersey Grid - 4 columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {playerJerseys.map((jersey) => (
            <motion.div
              key={jersey.id}
              variants={cardVariants}
              whileHover="hover"
              className="group relative"
            >
              {/* Card - Same height and width */}
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 group-hover:border-blue-200 flex flex-col h-full">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={jersey.image}
                    alt={`${jersey.playerName} ${jersey.team}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Badge */}
                  {jersey.badge && (
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      viewport={{ once: true }}
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-bold bg-linear-to-r from-orange-500 to-red-500 shadow-lg"
                    >
                      {jersey.badge}
                    </motion.div>
                  )}

                  {/* Favorite Button */}
                  <motion.button
                    onClick={() => toggleFavorite(jersey.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-blue-50"
                  >
                    <FaHeart
                      className={`w-5 h-5 transition-all duration-300 ${
                        favoriteIds.includes(jersey.id)
                          ? "text-red-500 fill-current"
                          : "text-gray-400"
                      }`}
                    />
                  </motion.button>

                  {/* Overlay with CTA */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300"
                  >
                    <motion.button
                      onClick={() => handleAddToCart(jersey.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300"
                    >
                      <FaShoppingCart className="w-5 h-5" />
                      {loadingIds.includes(jersey.id) ? "Adding..." : "View"}
                    </motion.button>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col grow">
                  {/* Player Info */}
                  <div className="mb-3">
                    <motion.h3
                      className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      {jersey.playerName}
                    </motion.h3>
                    <p className="text-sm text-gray-600">
                      {jersey.team} #{jersey.jerseyNumber}
                    </p>
                  </div>

                  {/* Color Options */}
                  <div className="flex gap-2 mb-3">
                    {jersey.colors.map((color, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.2 }}
                        className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-blue-600 transition-colors duration-300"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(jersey.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      {jersey.rating}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({jersey.reviews})
                    </span>
                  </div>

                  {/* Size Options */}
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-gray-600 mb-1">
                      Sizes:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {jersey.sizes.slice(0, 3).map((size) => (
                        <button
                          key={size}
                          className="px-2 py-1 text-xs border border-gray-300 rounded hover:border-blue-600 hover:text-blue-600 transition-colors"
                        >
                          {size}
                        </button>
                      ))}
                      {jersey.sizes.length > 3 && (
                        <button className="px-2 py-1 text-xs text-gray-600">
                          +{jersey.sizes.length - 3}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <motion.div
                    className="flex items-center gap-2 mt-auto pt-3 border-t border-slate-200"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-2xl font-bold text-slate-900">
                      ${jersey.price}
                    </span>
                    {jersey.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${jersey.originalPrice}
                      </span>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-16"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 md:px-12 py-3 md:py-4 bg-linear-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            Shop All Player Jerseys
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PopularJerseys;
