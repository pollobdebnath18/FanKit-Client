import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaShieldAlt,
  FaShippingFast,
  FaUndoAlt,
  FaStar,
  FaFire,
} from "react-icons/fa";
import { Link } from "react-router";

const features = [
  {
    icon: <FaShippingFast className="w-8 h-8" />,
    title: "Fast Delivery",
    desc: "Quick shipping with reliable packaging to keep your jersey safe.",
    color: "text-[#F5A623]",
    bg: "bg-[#F5A623]/10",
  },
  {
    icon: <FaShieldAlt className="w-8 h-8" />,
    title: "Premium Quality",
    desc: "Carefully selected fabrics with comfort and durability in mind.",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    icon: <FaUndoAlt className="w-8 h-8" />,
    title: "Easy Returns",
    desc: "Hassle-free return policy for a worry-free shopping experience.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

const stats = [
  { label: "Jerseys Available", value: "100+", color: "text-[#F5A623]", bg: "bg-[#F5A623]/10" },
  { label: "National Teams",    value: "50+",  color: "text-cyan-500",   bg: "bg-cyan-500/10"  },
  { label: "Customer Rating",   value: "5★",   color: "text-emerald-500",bg: "bg-emerald-500/10"},
  { label: "Customer Support",  value: "24/7", color: "text-purple-500", bg: "bg-purple-500/10" },
];

const Shop = () => {
  return (
    <section className="bg-[#F5F7FA] min-h-screen">
      {/* ─── Hero ─── */}
      <div className="relative bg-gradient-to-br from-[#0B1F3A] via-[#1A3A5C] to-[#0D3060] text-white overflow-hidden">
        {/* decorative glows */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.14, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F5A623] rounded-full blur-3xl -mr-40 -mt-40"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl -ml-32 -mb-32"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-4"
            >
              <FaFire className="text-[#F5A623] w-5 h-5" />
              <span className="uppercase tracking-[0.3em] text-sm text-[#F5A623] font-semibold">
                Official Football Jerseys
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              Wear Your Team.
              <br />
              <span className="text-[#F5A623]">Live The Game.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 text-lg text-blue-200"
            >
              Explore premium football jerseys inspired by the biggest clubs and
              national teams. Authentic style, premium quality and worldwide passion.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/collections"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-[#F5A623] text-[#0B1F3A] font-bold rounded-xl hover:bg-[#e09518] transition-all shadow-lg shadow-[#F5A623]/30"
                >
                  Browse Collection <FaArrowRight />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-7 py-3 border-2 border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── Features ─── */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl p-8 text-center border border-transparent hover:border-[#F5A623]/20 transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
                className={`w-16 h-16 mx-auto rounded-full ${feat.bg} flex items-center justify-center ${feat.color}`}
              >
                {feat.icon}
              </motion.div>
              <h3 className="mt-6 text-xl font-bold text-[#0B1F3A]">{feat.title}</h3>
              <p className="mt-3 text-gray-500">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── About / Stats ─── */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-sm p-10 lg:p-16 border border-slate-100"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#F5A623] font-semibold uppercase tracking-widest text-sm">More Than Just Jerseys</span>
              <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-5">
                Built for Football Lovers
              </h2>
              <p className="text-gray-600 leading-8">
                FanKit is built for football lovers who want to represent their
                favorite teams with confidence. Whether you're cheering from the
                stadium or watching from home, our collection helps you stay
                connected to the game.
              </p>
              <p className="mt-4 text-gray-600 leading-8">
                Browse hundreds of jerseys from international teams, club
                legends, and special edition collections.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.04 }}
                  className={`rounded-2xl ${stat.bg} p-8`}
                >
                  <h3 className={`text-4xl font-bold ${stat.color}`}>{stat.value}</h3>
                  <p className="mt-2 text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── CTA ─── */}
      <div className="relative bg-gradient-to-br from-[#0B1F3A] via-[#1A3A5C] to-[#0D3060] text-white overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute right-10 top-1/2 -translate-y-1/2 w-64 h-64 border-2 border-[#F5A623]/10 rounded-full"
        />
        <div className="max-w-7xl mx-auto px-6 py-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <FaStar className="text-[#F5A623] w-10 h-10 mx-auto mb-4" />
            <h2 className="text-4xl font-bold">Ready to Find Your Jersey?</h2>
            <p className="mt-4 text-blue-200 max-w-2xl mx-auto">
              Explore our complete collection and discover your favorite team's
              latest jerseys.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block mt-8">
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#F5A623] text-[#0B1F3A] font-bold rounded-xl hover:bg-[#e09518] transition-all shadow-lg shadow-[#F5A623]/20"
              >
                Explore Collection <FaArrowRight />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
