import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaCalendar, FaArrowRight, FaUser } from "react-icons/fa";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  author: string;
}

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
  {
    id: 6,
    title: "Harry Kane & England's Historic Campaign",
    excerpt:
      "How England's 2025 kit tells the story of their most ambitious World Cup campaign yet.",
    date: "Nov 18, 2025",
    category: "Guide",
    image: "https://i.ibb.co.com/n8NdgxBD/hery-cn.webp",
    author: "FanKit Team",
  },
];

const categoryConfig: Record<string, { bg: string; text: string }> = {
  Guide: { bg: "bg-blue-100", text: "text-blue-700" },
  News: { bg: "bg-[#F5A623]/15", text: "text-[#B07E19]" },
  Interview: { bg: "bg-purple-100", text: "text-purple-700" },
  Sustainability: { bg: "bg-green-100", text: "text-green-700" },
  Tips: { bg: "bg-cyan-100", text: "text-cyan-700" },
};

const Blog = () => {
  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0B1F3A] via-[#1A3A5C] to-[#0D3060] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F5A623]/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-5 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block uppercase tracking-widest text-sm text-[#F5A623] font-semibold mb-4"
          >
            Stories & Insights
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-5 leading-tight"
          >
            FanKit <span className="text-[#F5A623]">Blog</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-blue-200"
          >
            News, guides, and stories about football jerseys and the beautiful game.
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, idx) => {
              const cat = categoryConfig[post.category] ?? { bg: "bg-slate-100", text: "text-slate-700" };
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(11,31,58,0.14)" }}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md border border-slate-100 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Dark overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category Badge */}
                    <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${cat.bg} ${cat.text}`}>
                      {post.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="line-clamp-2 text-lg font-bold text-[#0B1F3A] group-hover:text-[#F5A623] transition-colors duration-300 mb-2">
                      {post.title}
                    </h2>
                    <p className="line-clamp-3 flex-1 text-sm text-slate-500 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <FaCalendar className="text-[#F5A623]" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FaUser className="text-[#F5A623]" />
                        <span className="font-semibold text-slate-700">{post.author}</span>
                      </div>
                    </div>

                    <Link
                      to={`/blog/${post.id}`}
                      className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#0B1F3A] group-hover:text-[#F5A623] transition-colors duration-300 hover:gap-3"
                    >
                      Read More <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
