import { motion } from "framer-motion";
import { useState } from "react";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email) {
        setSubscribed(true);
        setEmail("");
        setIsLoading(false);
        setTimeout(() => setSubscribed(false), 2000);
      } else {
        setIsLoading(false);
      }
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, delay: 0.2 },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
      className="py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative bg-gradient-to-br from-[#0B1F3A] via-[#1A3A5C] to-[#0D3060] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -ml-48 -mb-48" />
          </div>

          {/* Content */}
          <div className="relative z-10 px-6 md:px-12 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Section */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div
                  className="flex items-center gap-3 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <FaEnvelope className="w-8 h-8 text-white" />
                  <span className="text-white font-semibold text-lg">
                    Newsletter
                  </span>
                </motion.div>

                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Stay Updated with{" "}
                  <span className="text-blue-100">Exclusive Offers</span>
                </motion.h2>

                <motion.p
                  className="text-blue-100 text-lg mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Get early access to new collections, exclusive discounts, and
                  insider updates delivered to your inbox weekly.
                </motion.p>

                <motion.ul
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {[
                    "✓ Early access to new drops",
                    "✓ Exclusive member-only discounts",
                    "✓ Unsubscribe anytime",
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="text-white text-sm md:text-base flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-blue-200">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              {/* Right Section - Form */}
              <motion.form
                onSubmit={handleSubscribe}
                className="space-y-4"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <motion.div className="relative" whileFocus={{ scale: 1.02 }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-5 md:px-6 py-3 md:py-4 rounded-lg bg-white text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F5A623] transition-all duration-300"
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isLoading || subscribed}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 md:py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${subscribed
                      ? "bg-green-500 text-white"
                      : "bg-[#F5A623] text-[#0B1F3A] hover:bg-[#e09518]"
                    }`}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                    />
                  ) : subscribed ? (
                    <>
                      <FaCheckCircle className="w-5 h-5" />
                      Subscribed!
                    </>
                  ) : (
                    "Subscribe Now"
                  )}
                </motion.button>

                {subscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-200 text-sm text-center"
                  >
                    Thank you for subscribing! Check your email for
                    confirmation.
                  </motion.p>
                )}

                <p className="text-blue-100 text-xs text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </motion.form>
            </div>
          </div>

          {/* Decorative Float Elements */}
          <motion.div
            animate={{
              y: [0, 20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute top-1/4 right-1/4 w-20 h-20 bg-white/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Newsletter;
