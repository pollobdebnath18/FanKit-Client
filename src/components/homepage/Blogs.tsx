import { motion } from "framer-motion";
import { FaCalendar, FaArrowRight } from "react-icons/fa";

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
      excerpt: "Learn the key indicators of genuine vs counterfeit jerseys.",
      date: "Dec 15, 2024",
      category: "Guide",
      image:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=300&fit=crop",
      author: "John Doe",
    },
    {
      id: 2,
      title: "Limited Edition Messi Jersey Collection",
      excerpt: "Exclusive preview of Messi's newest collection drop.",
      date: "Dec 10, 2024",
      category: "News",
      image:
        "https://images.unsplash.com/photo-1599812675935-79ffe315eed0?w=500&h=300&fit=crop",
      author: "Sarah Smith",
    },
    {
      id: 3,
      title: "Behind the Design: Jersey Production",
      excerpt: "Meet the designers who create your favorite jerseys.",
      date: "Dec 5, 2024",
      category: "Interview",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop",
      author: "Mike Johnson",
    },
    {
      id: 4,
      title: "Sustainable Jersey Manufacturing",
      excerpt: "How brands are making eco-friendly football jerseys.",
      date: "Nov 30, 2024",
      category: "Sustainability",
      image:
        "https://images.unsplash.com/photo-1490481651213-60a4c9d59f7d?w=500&h=300&fit=crop",
      author: "Emma Davis",
    },
    {
      id: 5,
      title: "Collecting Vintage Football Jerseys",
      excerpt: "A collector's guide to rare and valuable jerseys.",
      date: "Nov 25, 2024",
      category: "Tips",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
      author: "Alex Turner",
    },
  ];

  // Duplicate the list so the CSS animation can loop seamlessly (0% -> -50%)
  const marqueeItems = [...blogPosts, ...blogPosts];

  const categoryColorMap: Record<string, string> = {
    Guide: "from-blue-500 to-cyan-500",
    News: "from-purple-500 to-pink-500",
    Interview: "from-orange-500 to-red-500",
    Sustainability: "from-green-500 to-teal-500",
    Tips: "from-indigo-500 to-blue-500",
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative py-16 md:py-24 bg-linear-to-b from-white to-slate-50 overflow-hidden"
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
            <span className="bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
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

        {/*
          Marquee Blog Cards — plain CSS marquee (right to left).

          `react-fast-marquee` throws "Element type is invalid: expected a
          string ... but got: object" on Vite/Next/Remix/Astro due to an
          unresolved CJS/ESM export bug in the package itself (see
          github.com/justin-chu/react-fast-marquee issues #85, #100, #140).
          This replaces it with a duplicated list + CSS keyframe animation —
          same seamless infinite-scroll effect, pause-on-hover included,
          no extra dependency.
        */}
        <div className="mb-12 md:mb-16 overflow-hidden relative group/marquee">
          {/* Left/right fade edges, same effect as the old `gradient` prop */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-linear-to-r from-slate-50 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-linear-to-l from-slate-50 to-transparent z-10" />

          <div className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused] py-4">
            {marqueeItems.map((post, index) => (
              <motion.div
                key={`${post.id}-${index}`}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)",
                }}
                transition={{ duration: 0.3 }}
                className="group mx-4 shrink-0 w-80"
              >
                <div className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 border border-slate-100 group-hover:border-blue-200 flex flex-col h-full">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden rounded-lg mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category Badge */}
                    <div
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-semibold bg-linear-to-r ${categoryColorMap[post.category]} shadow-lg`}
                    >
                      {post.category}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 grow">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 border-t border-slate-200 pt-4">
                    <div className="flex items-center gap-1">
                      <FaCalendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                    <span className="font-semibold text-slate-700">
                      {post.author}
                    </span>
                  </div>

                  {/* Read More Link */}
                  <a
                    href="#"
                    className="hidden group-hover:flex items-center gap-2 text-blue-600 font-semibold text-sm mt-4 hover:translate-x-1 transition-transform duration-200"
                  >
                    Read More
                    <FaArrowRight className="w-3 h-3" />
                  </a>
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
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 md:px-12 py-3 md:py-4 bg-linear-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            Read All Articles
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
          className="absolute top-1/2 -right-20 w-80 h-80 bg-blue-400 rounded-full blur-3xl"
        />
      </div>
    </motion.section>
  );
};

export default Blogs;
