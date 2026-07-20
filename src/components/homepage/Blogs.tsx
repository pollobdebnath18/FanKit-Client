import { motion } from "framer-motion";
import { FaCalendar, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  author: string;
}

const Blogs = () => {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "How to Authenticate Football Jerseys",
      excerpt:
        "Learn the key indicators of genuine vs counterfeit jerseys before you buy. Don't get fooled by fake kits.",
      date: "Dec 15, 2025",
      category: "Guide",
      image: "https://i.ibb.co.com/m5gXw8t1/ronldo.jpg",
      author: "FanKit Team",
    },
    {
      id: 2,
      title: "Limited Edition Player Collections 2026",
      excerpt:
        "An exclusive preview of the newest player edition jerseys for the 2026 season. Get yours before they sell out.",
      date: "Dec 10, 2025",
      category: "News",
      image: "https://i.ibb.co.com/S744xhp9/images-q-tbn-ANd9-Gc-Q1-1c-Gal-O-2-NS-ez-l-Ql-S2hy-NNfju740-YOYz0-Gd-Izt-Rp-BQwij-Z0c7-Sgd3-s-10.jpg",
      author: "FanKit Team",
    },
    {
      id: 3,
      title: "Mbappe's Paris Legacy — The Best Kits",
      excerpt:
        "A look at the most iconic Mbappe kits and what made each design stand out on the pitch.",
      date: "Dec 5, 2025",
      category: "Interview",
      image: "https://i.ibb.co.com/YSJPbYS/mbb.jpg",
      author: "FanKit Team",
    },
    {
      id: 4,
      title: "Lamine Yamal: Spain's Next Star Jersey",
      excerpt:
        "The rise of Spain's youngest superstar and how his jersey became the must-have kit of 2025.",
      date: "Nov 30, 2025",
      category: "News",
      image: "https://i.ibb.co.com/vNbZmfH/ymll.webp",
      author: "FanKit Team",
    },
    {
      id: 5,
      title: "Vinicius Jr — The Art of the Brazil Kit",
      excerpt:
        "How Brazil's iconic yellow-green has evolved and why Vinicius wears it like no one else.",
      date: "Nov 25, 2025",
      category: "Tips",
      image: "https://i.ibb.co.com/HDFNBBVT/vini.jpg",
      author: "FanKit Team",
    },
  ];

  // Duplicate the list so the CSS animation can loop seamlessly
  const marqueeItems = [...blogPosts, ...blogPosts];

  const categoryColorMap: Record<string, string> = {
    Guide: "from-[#0B1F3A] to-[#1A3A5C]",
    News: "from-[#F5A623] to-[#e09518]",
    Interview: "from-purple-600 to-indigo-600",
    Sustainability: "from-emerald-600 to-teal-600",
    Tips: "from-[#F5A623] to-[#0B1F3A]",
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden"
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
            Jersey{" "}
            <span className="bg-gradient-to-r from-[#0B1F3A] to-[#F5A623] bg-clip-text text-transparent">
              Insights
            </span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Latest news, tips, and stories about football jerseys.
          </motion.p>
        </motion.div>

        {/* Marquee Blog Cards */}
        <div className="mb-12 md:mb-16 overflow-hidden relative group/marquee">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-slate-50 to-transparent z-10" />

          <div className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused] py-4">
            {marqueeItems.map((post, index) => (
              <motion.div
                key={`${post.id}-${index}`}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 40px rgba(11, 31, 58, 0.15)",
                }}
                transition={{ duration: 0.3 }}
                className="group mx-4 shrink-0 w-80"
              >
                <div className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 border border-slate-100 group-hover:border-[#F5A623]/30 flex flex-col h-full">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden rounded-lg mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category Badge */}
                    <div
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-semibold bg-gradient-to-r ${categoryColorMap[post.category]} shadow-lg`}
                    >
                      {post.category}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-[#F5A623] transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 grow">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 border-t border-slate-200 pt-4">
                    <div className="flex items-center gap-1">
                      <FaCalendar className="w-3 h-3 text-[#F5A623]" />
                      <span>{post.date}</span>
                    </div>
                    <span className="font-semibold text-slate-700">
                      {post.author}
                    </span>
                  </div>

                  {/* Read More Link */}
                  <Link
                    to={`/blog/${post.id}`}
                    className="hidden group-hover:flex items-center gap-2 text-[#0B1F3A] hover:text-[#F5A623] font-semibold text-sm mt-4 hover:translate-x-1 transition-transform duration-200"
                  >
                    Read More
                    <FaArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/blog">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(11, 31, 58, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5C] text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              Read All Articles
            </motion.button>
          </Link>
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
          className="absolute top-1/2 -right-20 w-80 h-80 bg-blue-400 rounded-full blur-3xl"
        />
      </div>
    </motion.section>
  );
};

export default Blogs;
