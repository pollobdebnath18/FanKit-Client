import { motion } from "framer-motion";
import {
  FaTruck,
  FaShieldAlt,
  FaStar,
  FaHeadset,
  FaUndo,
  FaLock,
} from "react-icons/fa";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const Service = () => {
  const services: Service[] = [
    {
      id: 1,
      title: "Fast Shipping",
      description:
        "Get your favorite items delivered quickly with our express shipping options worldwide.",
      icon: <FaTruck className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Premium Quality",
      description:
        "All products are officially licensed and crafted with premium materials for durability.",
      icon: <FaStar className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "Exclusive Items",
      description:
        "Access limited edition merchandise available only on our platform with unique collections.",
      icon: <FaShieldAlt className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
    },
    {
      id: 4,
      title: "24/7 Support",
      description:
        "Our dedicated customer support team is always ready to help you anytime, anywhere.",
      icon: <FaHeadset className="w-8 h-8" />,
      color: "from-green-500 to-teal-500",
    },
    {
      id: 5,
      title: "Easy Returns",
      description:
        "30-day hassle-free return policy ensures your complete satisfaction with every purchase.",
      icon: <FaUndo className="w-8 h-8" />,
      color: "from-indigo-500 to-blue-500",
    },
    {
      id: 6,
      title: "Secure Payment",
      description:
        "Your transactions are protected with industry-leading encryption and secure payment methods.",
      icon: <FaLock className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 },
    },
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.15,
      rotate: 10,
      transition: { duration: 0.3 },
    },
  };

  const titleVariants = {
    initial: { opacity: 0.9 },
    hover: {
      opacity: 1,
      color: "#3b82f6",
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
        {/* Header Section */}
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
            Why Choose
            <span className="bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              FanKit
            </span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Experience the ultimate fan merchandise platform with services
            designed for your satisfaction.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover="hover"
              className="group relative"
            >
              {/* Card Background Glow */}
              <motion.div
                className={`absolute inset-0 bg-linear-to-br ${service.color} rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.2 }}
              />

              {/* Card Content */}
              <div className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 md:p-8 border border-slate-100 group-hover:border-blue-200">
                {/* Icon Container */}
                <motion.div
                  variants={iconVariants}
                  initial="initial"
                  whileHover="hover"
                  className={`inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-lg bg-linear-to-br ${service.color} text-white mb-6 shadow-lg`}
                >
                  {service.icon}
                </motion.div>

                {/* Title */}
                <motion.h3
                  variants={titleVariants}
                  initial="initial"
                  whileHover="hover"
                  className="text-xl md:text-2xl font-bold text-slate-900 mb-3"
                >
                  {service.title}
                </motion.h3>

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Animated Bottom Line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                  className={`h-1 bg-linear-to-r ${service.color} rounded-full`}
                />

                {/* Learn More Link */}
                <motion.a
                  href="#"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ x: 5 }}
                >
                  Learn More
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-20 text-center"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 md:px-12 py-3 md:py-4 bg-linear-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            Start Shopping Now
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
          className="absolute -top-20 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"
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
          className="absolute -bottom-20 left-0 w-80 h-80 bg-cyan-400 rounded-full blur-3xl"
        />
      </div>
    </motion.section>
  );
};

export default Service;
