import { motion } from "framer-motion";

const stats = [
  { value: "5K+", label: "Happy Customers" },
  { value: "200+", label: "Football Clubs" },
  { value: "10K+", label: "Orders Delivered" },
  { value: "99%", label: "Customer Satisfaction" },
];

const features = [
  { icon: "⚽", title: "Premium Quality", desc: "High-quality materials with comfortable fitting and durable printing." },
  { icon: "🚚", title: "Fast Delivery", desc: "Nationwide shipping with quick and secure delivery service." },
  { icon: "💳", title: "Secure Payment", desc: "Safe and trusted payment methods with complete data protection." },
  { icon: "❤️", title: "Customer Support", desc: "Friendly support team available whenever you need assistance." },
];

const About = () => {
  return (
    <div className="bg-[#F5F7FA]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0B1F3A] via-[#1A3A5C] to-[#0D3060] text-white py-24 relative overflow-hidden">
        {/* decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F5A623]/10 rounded-full blur-3xl -ml-20 -mb-20" />

        <div className="max-w-7xl mx-auto px-5 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block uppercase tracking-widest text-sm text-[#F5A623] font-semibold mb-4"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-5 leading-tight"
          >
            About{" "}
            <span className="text-[#F5A623]">FanKit</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto text-lg text-blue-200"
          >
            We are passionate about bringing football fans closer to their
            favorite clubs by providing premium-quality jerseys from teams all
            around the world.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <img
              src="https://i.ibb.co.com/PvH7YPQw/hollnd.webp"
              alt="Our Story"
              className="rounded-2xl shadow-xl w-full h-[420px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="text-[#F5A623] font-semibold uppercase tracking-widest text-sm">Who We Are</span>
            <h2 className="text-4xl font-bold text-[#0B1F3A] mt-2 mb-6">Our Story</h2>
            <p className="text-gray-600 leading-8 mb-5">
              FanKit started with one mission — to provide authentic, stylish,
              and affordable football jerseys for passionate fans. Whether you're
              supporting your local club or your favorite international team, we've
              got you covered.
            </p>
            <p className="text-gray-600 leading-8">
              Today we proudly serve thousands of football lovers with premium
              jerseys, fast delivery, and outstanding customer support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="text-[#F5A623] font-semibold uppercase tracking-widest text-sm">Advantages</span>
            <h2 className="text-4xl font-bold text-[#0B1F3A] mt-2">Why Choose Us</h2>
            <p className="text-gray-500 mt-3">Trusted by football fans across the country.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, idx) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-[#F5F7FA] p-8 rounded-2xl shadow-sm hover:shadow-lg border border-transparent hover:border-[#F5A623]/30 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{feat.icon}</div>
                <h3 className="text-xl font-semibold text-[#0B1F3A] mb-3">{feat.title}</h3>
                <p className="text-gray-500">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 relative overflow-hidden">
        {/* Rich sports gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A] via-[#1A3A5C] to-[#0D3060]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#F5A623] rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-400 rounded-full blur-3xl -ml-20 -mb-20" />
        </div>

        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl font-bold text-[#F5A623]">{stat.value}</h2>
                <p className="mt-3 text-blue-200 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-5 text-center">
          <span className="text-[#F5A623] font-semibold uppercase tracking-widest text-sm">What Drives Us</span>
          <h2 className="text-4xl font-bold text-[#0B1F3A] mt-2 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-8">
            Our mission is simple: make premium football jerseys accessible to
            every fan. We believe football is more than a game — it is passion,
            unity, and identity. That's why we are committed to offering the
            best quality products, excellent service, and an unforgettable
            shopping experience.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
