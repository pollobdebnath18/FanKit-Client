import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaFootballBall, FaGem, FaArrowRight } from "react-icons/fa";
import { MdSportsCricket } from "react-icons/md";

const categories = [
  {
    title: "Football",
    desc: "National teams, club sides & retro classics",
    href: "/shop/football",
    icon: FaFootballBall,
    image: "https://i.ibb.co.com/DPVbrGYR/br.webp",
    color: "from-emerald-500 to-green-600",
    count: "200+ Products",
  },
  {
    title: "Cricket",
    desc: "International & franchise jerseys",
    href: "/shop/cricket",
    icon: MdSportsCricket,
    image: "https://i.ibb.co.com/k4RZfhC8/cricket.webp",
    color: "from-sky-500 to-blue-600",
    count: "100+ Products",
  },
  {
    title: "Accessories",
    desc: "Caps, scarves, bags & more",
    href: "/shop/accessories",
    icon: FaGem,
    image: "https://i.ibb.co.com/z2rT7wT/cap.webp",
    color: "from-amber-500 to-orange-600",
    count: "50+ Products",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const ShopByCategory = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3">
            Shop By{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Find exactly what you&apos;re looking for
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div key={cat.title} variants={cardVariants}>
                <Link to={cat.href} className="group block">
                  <div className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Icon badge */}
                      <div
                        className={`absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-white shadow-lg`}
                      >
                        <Icon className="text-lg" />
                      </div>

                      {/* Count badge */}
                      <span className="absolute top-4 right-4 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                        {cat.count}
                      </span>

                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {cat.title}
                        </h3>
                        <p className="text-sm text-white/70 mb-3">
                          {cat.desc}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F5A623] transition-colors group-hover:text-[#F5C542]">
                          Explore
                          <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ShopByCategory;
