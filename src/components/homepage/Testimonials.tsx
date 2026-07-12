import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  verified: boolean;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Anderson",
      role: "Music Festival Fan",
      content:
        "FanKit has been a game-changer for me! The quality of merchandise is incredible, and I love the exclusive items that are hard to find elsewhere. Fast shipping too!",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=1",
      verified: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Collector",
      content:
        "As a serious collector, I appreciate the authenticity guarantees. Every item I ordered has been exactly as described. The customer service is outstanding!",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=2",
      verified: true,
    },
    {
      id: 3,
      name: "Emma Wilson",
      role: "Casual Fan",
      content:
        "Great selection and affordable prices! I found everything I was looking for for my favorite artist. Will definitely shop here again.",
      rating: 4,
      avatar: "https://i.pravatar.cc/150?img=3",
      verified: true,
    },
    {
      id: 4,
      name: "James Rodriguez",
      role: "Sports Enthusiast",
      content:
        "The limited edition items are amazing! I was able to grab exclusive merchandise that sold out everywhere else. Highly recommended!",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=4",
      verified: true,
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Gift Buyer",
      content:
        "Purchased items as gifts for friends and they loved them! The packaging is beautiful and the quality is premium. Will be ordering again.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=5",
      verified: true,
    },
    {
      id: 6,
      name: "David Park",
      role: "Regular Customer",
      content:
        "Best online shop for fan merchandise. The variety is impressive and prices are competitive. Customer support helped me with a quick exchange.",
      rating: 4,
      avatar: "https://i.pravatar.cc/150?img=6",
      verified: true,
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

  const avatarVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 },
    },
  };

  const quoteVariants = {
    initial: { opacity: 0.3, scale: 0.8 },
    hover: {
      opacity: 0.6,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
          viewport={{ once: true }}
        >
          <FaStar
            className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          />
        </motion.div>
      ))}
    </div>
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
      className="py-16 md:py-24 bg-linear-to-b from-slate-50 to-white overflow-hidden"
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
            Customer{" "}
            <span className="bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Testimonials
            </span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Hear from our satisfied customers who love their FanKit experience.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              whileHover="hover"
              className="group relative"
            >
              {/* Card Background Glow */}
              <motion.div
                className="absolute inset-0 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl blur-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
              />

              {/* Card Content */}
              <div className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 md:p-8 border border-slate-100 group-hover:border-blue-200 flex flex-col h-full">
                {/* Quote Icon */}
                <motion.div
                  variants={quoteVariants}
                  initial="initial"
                  whileHover="hover"
                  className="mb-4"
                >
                  <FaQuoteLeft className="w-8 h-8 text-blue-400" />
                </motion.div>

                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Testimonial Content */}
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 grow italic">
                  "{testimonial.content}"
                </p>

                {/* Divider */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                  className="h-1 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full mb-6"
                />

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <motion.div
                    variants={avatarVariants}
                    initial="initial"
                    whileHover="hover"
                    className="shrink-0"
                  >
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-blue-400"
                    />
                  </motion.div>

                  <div className="grow">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-slate-900">
                        {testimonial.name}
                      </h4>
                      {testimonial.verified && (
                        <motion.span
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          viewport={{ once: true }}
                          className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs"
                          title="Verified"
                        >
                          ✓
                        </motion.span>
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-gray-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-20 text-center"
        >
          <p className="text-gray-600 text-lg mb-6">
            Join thousands of satisfied customers
          </p>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 md:px-12 py-3 md:py-4 bg-linear-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            Shop Now
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
          className="absolute -top-20 left-10 w-80 h-80 bg-cyan-400 rounded-full blur-3xl"
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
          className="absolute -bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"
        />
      </div>
    </motion.section>
  );
};

export default Testimonials;
