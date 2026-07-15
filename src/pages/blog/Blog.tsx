import { Link } from "react-router";
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

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How to Authenticate Football Jerseys",
    excerpt:
      "Learn the key indicators of genuine vs counterfeit jerseys before you buy.",
    date: "Dec 15, 2025",
    category: "Guide",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop",
    author: "John Doe",
  },
  {
    id: 2,
    title: "Limited Edition Player Collections",
    excerpt:
      "An exclusive preview of the newest player edition jerseys for the 2026 season.",
    date: "Dec 10, 2025",
    category: "News",
    image:
      "https://images.unsplash.com/photo-1599812675935-79ffe315eed0?w=600&h=400&fit=crop",
    author: "Sarah Smith",
  },
  {
    id: 3,
    title: "Behind the Design: Jersey Production",
    excerpt: "Meet the designers and craftspeople behind your favorite kits.",
    date: "Dec 5, 2025",
    category: "Interview",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    author: "Mike Johnson",
  },
  {
    id: 4,
    title: "Sustainable Jersey Manufacturing",
    excerpt: "How leading brands are making eco-friendly football jerseys.",
    date: "Nov 30, 2025",
    category: "Sustainability",
    image:
      "https://images.unsplash.com/photo-1490481651213-60a4c9d59f7d?w=600&h=400&fit=crop",
    author: "Emma Davis",
  },
  {
    id: 5,
    title: "Collecting Vintage Football Jerseys",
    excerpt: "A collector's guide to spotting rare and valuable retro kits.",
    date: "Nov 25, 2025",
    category: "Tips",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    author: "Alex Turner",
  },
  {
    id: 6,
    title: "Choosing the Right Jersey Size",
    excerpt:
      "A quick guide to fit, sizing charts, and what to do if you're between sizes.",
    date: "Nov 18, 2025",
    category: "Guide",
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&h=400&fit=crop",
    author: "Priya Nair",
  },
];

const categoryColorMap: Record<string, string> = {
  Guide: "bg-blue-100 text-blue-700",
  News: "bg-purple-100 text-purple-700",
  Interview: "bg-orange-100 text-orange-700",
  Sustainability: "bg-green-100 text-green-700",
  Tips: "bg-[#E0A421]/15 text-[#B07E19]",
};

const Blog = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          FanKit <span className="text-[#0B1F3A]">Blog</span>
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500 sm:text-base">
          News, guides, and stories about football jerseys and the game.
        </p>
      </div>

      {/* Blog grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-lg"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span
                className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${categoryColorMap[post.category] ?? "bg-slate-100 text-slate-700"}`}
              >
                {post.category}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h2 className="line-clamp-2 text-lg font-bold text-slate-900 group-hover:text-[#0B1F3A]">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-2 flex-1 text-sm text-slate-500">
                {post.excerpt}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <FaCalendar className="text-[10px]" />
                  <span>{post.date}</span>
                </div>
                <span className="font-semibold text-slate-700">
                  {post.author}
                </span>
              </div>

              <Link
                to={`/blog/${post.id}`}
                className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#0B1F3A] hover:underline"
              >
                Read More <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
