import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const FAQ = () => {
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const faqItems: FAQItem[] = [
    {
      id: 1,
      category: "shipping",
      question: "How long does shipping usually take?",
      answer:
        "Standard shipping takes 5-7 business days, while express shipping takes 2-3 business days. International orders may take 10-14 business days depending on the destination country. You will receive a tracking number with your order.",
    },
    {
      id: 2,
      category: "returns",
      question: "What is your return policy?",
      answer:
        "We offer a 30-day hassle-free return policy. If you are not completely satisfied with your purchase, you can return it within 30 days of delivery for a full refund. Items must be in original condition with all packaging included.",
    },
    {
      id: 3,
      category: "payment",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers for certain regions. All transactions are encrypted and secure with SSL protection.",
    },
    {
      id: 4,
      category: "products",
      question: "Are all items officially licensed?",
      answer:
        "Yes, 100% of our merchandise is officially licensed and authentic. We partner directly with artists, franchises, and brands to ensure authenticity. Each product comes with quality assurance verification.",
    },
    {
      id: 5,
      category: "shipping",
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to over 150 countries worldwide. International shipping costs and delivery times vary by location. Customers are responsible for any applicable customs duties and import taxes.",
    },
    {
      id: 6,
      category: "account",
      question: "How do I create an account?",
      answer:
        'Creating an account is simple! Click the "Sign Up" button and enter your email address and password. You can also sign up using your Google, Facebook, or other social media accounts for faster registration.',
    },
    {
      id: 7,
      category: "products",
      question: "Can I pre-order limited edition items?",
      answer:
        "Yes! We offer pre-order options for upcoming limited edition merchandise. Pre-ordered items are reserved for you and shipped as soon as they become available. You will receive a confirmation email with the expected release date.",
    },
    {
      id: 8,
      category: "account",
      question: "How can I track my order?",
      answer:
        "Once your order ships, you will receive a tracking number via email. You can use this number to track your package in real-time on our website or the carrier's website. Updates are sent automatically at each delivery stage.",
    },
  ];

  const categories = [
    "all",
    "shipping",
    "returns",
    "payment",
    "products",
    "account",
  ];

  const filteredFaqs =
    selectedCategory === "all"
      ? faqItems
      : faqItems.filter((item) => item.category === selectedCategory);

  // Ensure expandedId is always valid for the current filtered list
  const validExpandedId = filteredFaqs.some((item) => item.id === expandedId)
    ? expandedId
    : (filteredFaqs[0]?.id ?? null);

  // Helper function to get first item ID for a category
  const getFirstIdForCategory = (category: string) => {
    const filtered =
      category === "all"
        ? faqItems
        : faqItems.filter((item) => item.category === category);
    return filtered.length > 0 ? filtered[0].id : null;
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const contentVariants = {
    collapsed: { opacity: 0, height: 0 },
    expanded: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 },
    },
  };

  const categoryVariants = {
    initial: { scale: 1, backgroundColor: "transparent" },
    hover: { scale: 1.05 },
    active: {
      backgroundColor: "#0B1F3A",
      color: "white",
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative py-16 md:py-24 bg-linear-to-b from-white to-slate-50 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <FaQuestionCircle className="w-8 h-8 text-[#F5A623]" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-[#0B1F3A] to-[#F5A623] bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </motion.div>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Find answers to common questions about our products, shipping, and
            policies.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              variants={categoryVariants}
              initial="initial"
              whileHover="hover"
              animate={selectedCategory === category ? "active" : "initial"}
              onClick={() => {
                setSelectedCategory(category);
                const firstId = getFirstIdForCategory(category);
                if (firstId) setExpandedId(firstId);
              }}
              className="px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold text-sm md:text-base border-2 border-[#0B1F3A] text-[#0B1F3A] transition-all duration-300 capitalize"
            >
              {category === "all" ? "All Questions" : category}
            </motion.button>
          ))}
        </motion.div>

       
        <div className="space-y-4 md:space-y-6">
          {filteredFaqs.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="group"
            >
              <motion.button
                onClick={() =>
                  setExpandedId(expandedId === item.id ? null : item.id)
                }
                className="w-full text-left bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 md:p-8 border border-slate-100 group-hover:border-blue-200"
                whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.02)" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="grow">
                    <motion.h3
                      className="text-lg md:text-xl font-semibold text-slate-900 text-left"
                      animate={{
                          color:
                          validExpandedId === item.id ? "#F5A623" : "#1e293b",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.question}
                    </motion.h3>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: validExpandedId === item.id ? "100%" : 0,
                      }}
                      transition={{ duration: 0.4 }}
                      className="h-1 bg-gradient-to-r from-[#0B1F3A] to-[#F5A623] rounded-full mt-2"
                    />
                  </div>

                  <motion.div
                    animate={{ rotate: validExpandedId === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-[#F5A623]/15 text-[#0B1F3A]"
                  >
                    <FaChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.button>

              {/* Expandable Content */}
              <AnimatePresence>
                {validExpandedId === item.id && (
                  <motion.div
                    variants={contentVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="exit"
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      className="px-6 md:px-8 py-6 md:py-8 bg-gradient-to-br from-[#0B1F3A]/5 to-[#F5A623]/5 border-l-4 border-[#F5A623] rounded-b-xl"
                    >
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-20 text-center bg-gradient-to-br from-[#0B1F3A] via-[#1A3A5C] to-[#0D3060] rounded-2xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* subtle glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#F5A623]/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
            Still Have Questions?
          </h3>
          <p className="text-blue-200 text-lg mb-6 max-w-xl mx-auto relative z-10">
            Can't find the answer you're looking for? Our customer support team
            is here to help.
          </p>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(245,166,35,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 md:px-12 py-3 md:py-4 bg-[#F5A623] text-[#0B1F3A] font-bold rounded-xl shadow-lg hover:bg-[#e09518] transition-all duration-300 relative z-10"
          >
            Contact Support
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
          className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 -right-20 w-72 h-72 bg-cyan-400 rounded-full blur-3xl"
        />
      </div>
    </motion.section>
  );
};

export default FAQ;
