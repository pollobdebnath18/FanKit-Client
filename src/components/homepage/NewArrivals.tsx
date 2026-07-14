import { motion } from "framer-motion";
import {  FaArrowRight, FaShoppingBag, FaHeart } from "react-icons/fa";
import { useProducts } from "../../hooks/useProducts";

// interface Products {
//   id: number;
//   name: string;
//   team: string;
//   price: number;
//   originalPrice?: number;
//   image: string;
//   isNew: boolean;
// }

const NewArrivals = () => {
  // now i get all products form the api
const { data: products = [], isLoading } = useProducts();

  if(isLoading) return <div>Loading...</div>;

  console.log(products, "from NewArrivals");
  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -5,
      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
      className="py-16 md:py-24 bg-linear-to-b from-white to-slate-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              New{" "}
              <span className="bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Arrivals
              </span>
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Fresh jersey collections just added
            </motion.p>
          </div>

          {/* View All Link */}
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300"
            whileHover={{ x: 10 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            View All
            <FaArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

        {/* Products Grid - 4 columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product._id}
              variants={itemVariants}
              whileHover="hover"
              className="group relative"
            >
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 group-hover:border-blue-200 flex flex-col h-full">
                {/* Image - Same Height and Width */}
                <div className="relative overflow-hidden bg-gray-100 aspect-square">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* New Badge */}
                  {/* {product.isNew && (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      viewport={{ once: true }}
                      className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-linear-to-r from-orange-500 to-red-500 text-white text-xs font-bold shadow-lg"
                    >
                      <FaFire className="w-3 h-3" />
                      New
                    </motion.div>
                  )} */}

                  {/* Discount Badge */}
                  {/* {product.price && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute top-2 left-2 px-2 py-1 rounded-full bg-green-500 text-white text-xs font-bold"
                    >
                      -
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100,
                      )}
                      %
                    </motion.div>
                  )} */}

                  {/* Heart Icon */}
                  <button className="absolute bottom-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors">
                    <FaHeart className="w-4 h-4" />
                  </button>
                </div>

                {/* Content - Same Layout */}
                <div className="p-4 flex flex-col grow">
                  <p className="text-gray-500 text-xs mb-2 uppercase tracking-wider">
                    {product.title}
                  </p>
                  <motion.h3
                    className="text-sm font-bold text-slate-900 line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors duration-300 h-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    {product.shortDescription}
                  </motion.h3>

                  {/* Price and Cart */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-lg md:text-xl font-bold text-slate-900">
                        ${product.price}
                      </span>
                      {product.price && (
                        <span className="text-xs md:text-sm text-gray-400 line-through">
                          ${product.price + 20}
                        </span>
                      )}
                    </div>
                    <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <FaShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-20 text-center"
        >
          <p className="text-gray-600 text-lg mb-6">
            Discover our newest jersey collection!
          </p>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 md:px-12 py-3 md:py-4 bg-linear-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            Shop All New Jerseys
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl -mr-48"
        />
      </div>
    </motion.section>
  );
};

export default NewArrivals;
