import { motion } from "framer-motion";
import { FaUsers, FaBox, FaTrophy, FaSmile } from "react-icons/fa";

const Statistics = () => {
  const stats = [
    {
      id: 1,
      icon: FaUsers,
      label: "Happy Customers",
      value: "50K+",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      icon: FaBox,
      label: "Products Sold",
      value: "250K+",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      icon: FaTrophy,
      label: "Awards Won",
      value: "15+",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 4,
      icon: FaSmile,
      label: "Customer Rating",
      value: "4.9★",
      color: "from-green-500 to-teal-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -5,
      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  const counterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
      className="py-16  bg-linear-to-b from-slate-50 to-white overflow-hidden"
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
            Our{" "}
            <span className="bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Impact
            </span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            See how FanKit has grown and thrived with our amazing community.
          </motion.p>
        </motion.div>

        {/* Key Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={cardVariants}
                whileHover="hover"
                className="group relative"
              >
                {/* Card Background Glow */}
                <motion.div
                  className={`absolute inset-0 bg-linear-to-br ${stat.color} rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.2 }}
                />

                {/* Card */}
                <div className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-slate-100 group-hover:border-blue-200 text-center">
                  {/* Icon */}
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-lg bg-linear-to-br ${stat.color} text-white mb-4 shadow-lg`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>

                  {/* Value */}
                  <motion.h3
                    className="text-3xl md:text-4xl font-bold text-slate-900 mb-2"
                    variants={counterVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {stat.value}
                  </motion.h3>

                  {/* Label */}
                  <p className="text-gray-600 font-medium">{stat.label}</p>

                  {/* Animated Line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.4 }}
                    className={`h-1 bg-linear-to-r ${stat.color} rounded-full mt-4 mx-auto`}
                  />
                </div>
              </motion.div>
            );
          })}
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
          className="absolute -bottom-20 left-20 w-80 h-80 bg-blue-400 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-20 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"
        />
      </div>
    </motion.section>
  );
};

export default Statistics;
