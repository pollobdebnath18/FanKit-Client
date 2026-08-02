import { Link } from "react-router";
import { motion, type Variants } from "framer-motion";
import {
  FaTshirt,
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaUndo,
  FaLock,
  FaChevronRight,
  FaStar,
  FaHeart,
  FaBolt,
  FaGlobeAsia,
  FaSearch,
  FaShoppingCart,
  FaCheckCircle,
  FaFootballBall,
  FaGem,
  FaFlag,
  FaAward,
  FaHandshake,
} from "react-icons/fa";
import { MdSportsCricket } from "react-icons/md";

/* ─── animation helpers ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const slideX = (dir: -1 | 1): Variants => ({
  hidden: { opacity: 0, x: dir * -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
});

/* ─── data ─── */
const values = [
  {
    icon: FaHeart,
    title: "Fan First",
    desc: "Every decision starts with the fans. We build for the people who live and breathe the game.",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: FaAward,
    title: "Authenticity",
    desc: "Only genuine, officially licensed products make it to our shelves. No shortcuts, no compromises.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: FaBolt,
    title: "Innovation",
    desc: "We constantly push boundaries in product design, fabric tech, and the shopping experience.",
    color: "from-yellow-500 to-lime-500",
  },
  {
    icon: FaHandshake,
    title: "Community",
    desc: "FanKit is more than a store — it's a gathering place for supporters, collectors, and dreamers.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: FaGlobeAsia,
    title: "Inclusivity",
    desc: "From Dhaka to Dubai, Lagos to London — every fan deserves access to their team's colors.",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: FaShieldAlt,
    title: "Trust",
    desc: "Transparent pricing, secure payments, and a hassle-free return policy you can count on.",
    color: "from-violet-500 to-purple-500",
  },
];

const offerings = [
  {
    icon: FaFootballBall,
    title: "Football",
    desc: "From Premier League giants to World Cup heroes — national teams, club sides, retro classics, and training kits in every size.",
    stats: ["200+ Clubs", "50+ National Teams", "Men / Women / Kids"],
    color: "from-emerald-500 to-green-600",
    href: "/shop/football",
  },
  {
    icon: MdSportsCricket,
    title: "Cricket",
    desc: "Rep your country or franchise with premium cricket jerseys. International series, IPL, BPL, and more.",
    stats: ["12+ Countries", "Franchise Kits", "All Formats"],
    color: "from-sky-500 to-blue-600",
    href: "/shop/cricket",
  },
  {
    icon: FaGem,
    title: "Accessories",
    desc: "Caps, scarves, wristbands, gym bags, and more. Complete your match-day look from head to toe.",
    stats: ["10+ Categories", "Team Logos", "Daily Essentials"],
    color: "from-amber-500 to-yellow-600",
    href: "/shop/accessories",
  },
];

const steps = [
  {
    num: "01",
    icon: FaSearch,
    title: "Browse & Discover",
    desc: "Explore hundreds of jerseys, kits, and accessories. Filter by sport, team, or category to find exactly what you want.",
  },
  {
    num: "02",
    icon: FaTshirt,
    title: "Pick Your Size",
    desc: "Choose your preferred size and color. Every product page has a detailed size guide for the perfect fit.",
  },
  {
    num: "03",
    icon: FaShoppingCart,
    title: "Add to Cart",
    desc: "Found your pick? Add it to your cart. You can keep browsing or head straight to checkout.",
  },
  {
    num: "04",
    icon: FaCheckCircle,
    title: "Fast Delivery",
    desc: "Sit back while we pack and ship your order. Track it in real-time until it arrives at your doorstep.",
  },
];

const whyChoose = [
  { icon: FaTshirt, title: "Premium Materials", desc: "Breathable, durable fabrics built for comfort on and off the pitch." },
  { icon: FaTruck, title: "Nationwide Delivery", desc: "Fast, reliable shipping with real-time tracking across the country." },
  { icon: FaLock, title: "Secure Payments", desc: "Industry-leading encryption keeps every transaction safe and private." },
  { icon: FaUndo, title: "30-Day Returns", desc: "Not the right fit? Send it back within 30 days, no questions asked." },
  { icon: FaHeadset, title: "24/7 Support", desc: "Our team is always online — chat, email, or call anytime you need us." },
  { icon: FaStar, title: "Loyalty Rewards", desc: "Earn points on every purchase and unlock exclusive member perks." },
];

/* ─── component ─── */
const About = () => {
  return (
    <div className="bg-[#F5F7FA]">
      {/* ──────────────────────── 1. HERO ──────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1F3A] via-[#1A3A5C] to-[#0D3060] text-white">
        {/* decorative blurs */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#F5A623]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* top bar: breadcrumb + badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 pt-8 md:pt-10">
            <motion.nav
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-sm text-blue-200/70"
            >
              <Link to="/" className="transition hover:text-white">
                Home
              </Link>
              <FaChevronRight className="text-[10px]" />
              <span className="font-medium text-white/90">About</span>
            </motion.nav>

            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-full border border-[#F5A623]/25 bg-[#F5A623]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#F5A623]"
            >
              Est. 2024
            </motion.span>
          </div>

          {/* main hero content */}
          <div className="grid items-center gap-12 pb-12 md:grid-cols-2 lg:gap-16">
            {/* left: text */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-blue-200"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#F5A623] animate-pulse" />
                More Than a Store — It&apos;s a Movement
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-4xl font-black leading-[1.1] md:text-5xl lg:text-6xl"
              >
                We Are{" "}
                <span className="bg-gradient-to-r from-[#F5A623] to-[#F5C542] bg-clip-text text-transparent">
                  FanKit
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-5 max-w-lg text-base leading-relaxed text-blue-200/80 md:text-lg"
              >
                Born from a love of the beautiful game. We connect fans to
                their teams with premium jerseys, kits, and accessories —
                delivered with passion and care.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#F5A623] px-7 py-3 text-sm font-bold text-[#0B1F3A] shadow-lg shadow-[#F5A623]/25 transition-all duration-300 hover:bg-[#F5C542] hover:shadow-[#F5A623]/40"
                >
                  Shop Now
                  <FaChevronRight className="text-xs transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </div>

            {/* right: image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden md:block"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#F5A623]/15 to-blue-500/15 blur-2xl" />
              <img
                src="https://i.ibb.co.com/9kkBKPmw/image-1920-unique-0eb2843.webp"
                alt="FanKit fans celebrating"
                className="relative w-full rounded-3xl object-top shadow-2xl shadow-black/30"
                style={{ aspectRatio: "4/3" }}
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* animated stat bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-10 grid grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm md:gap-0 md:divide-x md:divide-white/10"
          >
            {[
              { num: "01", value: "5K+", label: "Happy Fans", color: "text-[#F5A623]" },
              { num: "02", value: "200+", label: "Clubs & Teams", color: "text-blue-300" },
              { num: "03", value: "10K+", label: "Orders Delivered", color: "text-emerald-300" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                className="relative flex items-center gap-4 px-5 py-4 md:justify-center md:px-8 md:py-5"
              >
                <span className={`text-xs font-bold ${s.color} opacity-60`}>
                  {s.num}
                </span>
                <div>
                  <p className={`text-xl font-black ${s.color} md:text-2xl`}>
                    {s.value}
                  </p>
                  <p className="text-[11px] font-medium text-blue-200/60 md:text-xs">
                    {s.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────── 2. OUR STORY ──────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* section header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-[#F5A623]">
              Who We Are
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] md:text-4xl">
              The Story Behind{" "}
              <span className="text-[#F5A623]">FanKit</span>
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-[#F5A623] to-[#F5C542]" />
          </motion.div>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* image side */}
            <motion.div
              variants={slideX(-1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#F5A623]/10 to-blue-500/10 blur-xl" />
              <img
                src="https://i.ibb.co.com/RkFdbZsw/Virat-Kohli.webp"
                alt="FanKit team"
                className="relative w-full rounded-2xl object-cover shadow-xl"
                style={{ aspectRatio: "4/3" }}
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
              {/* floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-5 -right-5 rounded-2xl border border-slate-100 bg-white px-6 py-4 shadow-xl md:-bottom-6 md:-right-6"
              >
                <p className="text-2xl font-black text-[#0B1F3A]">5K+</p>
                <p className="text-xs font-medium text-slate-500">
                  Happy Fans
                </p>
              </motion.div>
            </motion.div>

            {/* text side with numbered story points */}
            <motion.div
              variants={slideX(1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="space-y-6">
                {[
                  {
                    num: "01",
                    color: "text-[#F5A623] border-[#F5A623]/20 bg-[#F5A623]/5",
                    title: "The Beginning",
                    text: "FanKit was born from a simple observation: fans everywhere deserved better. Better jerseys, better choices, better service. We started as a small team of football fanatics who were tired of settling for low-quality replicas and limited options.",
                  },
                  {
                    num: "02",
                    color: "text-blue-500 border-blue-500/20 bg-blue-50",
                    title: "Growing Together",
                    text: "Today, we serve thousands of fans across the country — from Sunday league supporters to die-hard international followers. Our catalog spans 200+ football clubs, 12+ cricket nations, and a growing range of accessories.",
                  },
                  {
                    num: "03",
                    color: "text-emerald-500 border-emerald-500/20 bg-emerald-50",
                    title: "Same Mission",
                    text: "But our mission remains the same: bring fans closer to the game they love. Every stitch, every jersey, every order is a step toward making fan culture accessible to everyone.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.num}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + i * 0.15,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="flex gap-5"
                  >
                    {/* numbered badge */}
                    <div className="shrink-0 pt-1">
                      <span
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-bold ${item.color}`}
                      >
                        {item.num}
                      </span>
                    </div>
                    {/* content */}
                    <div>
                      <h3 className="mb-1.5 text-base font-bold text-[#0B1F3A]">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-500">
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* mini stat row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8 grid grid-cols-3 gap-3"
              >
                {[
                  { val: "200+", lbl: "Clubs", accent: "border-t-[#F5A623]" },
                  { val: "12+", lbl: "Nations", accent: "border-t-blue-500" },
                  { val: "10K+", lbl: "Orders", accent: "border-t-emerald-500" },
                ].map((s) => (
                  <div
                    key={s.lbl}
                    className={`rounded-xl border border-slate-100 border-t-2 ${s.accent} bg-white p-4 text-center shadow-sm`}
                  >
                    <p className="text-lg font-bold text-[#0B1F3A]">
                      {s.val}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-slate-500">
                      {s.lbl}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────── 3. MISSION & VISION ──────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-[#F5A623]">
              What Drives Us
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] md:text-4xl">
              Mission <span className="text-[#F5A623]">&</span> Vision
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Mission */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-[#0B1F3A] to-[#1A3A5C] p-8 text-white shadow-lg transition-shadow duration-300 hover:shadow-2xl md:p-10"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#F5A623]/10 transition-all duration-500 group-hover:scale-150" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-blue-400/10 transition-all duration-500 group-hover:scale-150" />
              <div className="relative z-10">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#F5A623]/15 text-[#F5A623]">
                  <FaFlag className="text-xl" />
                </div>
                <h3 className="mb-3 text-xl font-bold">Our Mission</h3>
                <p className="leading-relaxed text-blue-200/90">
                  Make premium football and cricket jerseys accessible to every
                  fan. We believe the beautiful game deserves beautiful gear —
                  and that every supporter, regardless of budget or location,
                  should wear their team&apos;s colors with pride.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl md:p-10"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-500/5 transition-all duration-500 group-hover:scale-150" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-[#F5A623]/5 transition-all duration-500 group-hover:scale-150" />
              <div className="relative z-10">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FaGlobeAsia className="text-xl" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#0B1F3A]">
                  Our Vision
                </h3>
                <p className="leading-relaxed text-slate-600">
                  Become the most trusted fan merchandise platform in South Asia
                  and beyond — known for quality, authenticity, and a
                  community-first approach. We envision a world where every fan
                  has a one-stop destination for all their team&apos;s gear.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────── 4. OUR VALUES ──────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-[#F5A623]">
              The FanKit Way
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] md:text-4xl">
              Our Core Values
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              Six principles that guide everything we do — from product
              selection to customer support.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-xl"
                >
                  {/* glow */}
                  <div
                    className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${v.color} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-15`}
                  />
                  <div className="relative z-10">
                    <div
                      className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${v.color} text-white shadow-md`}
                    >
                      <Icon className="text-lg" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-[#0B1F3A]">
                      {v.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-500">
                      {v.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────── 5. WHAT WE OFFER ──────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-[#F5A623]">
              Our Catalog
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] md:text-4xl">
              What We Offer
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              From pitch to podium — everything a true fan needs.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {offerings.map((o, i) => {
              const Icon = o.icon;
              return (
                <motion.div
                  key={o.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-[#F5F7FA] p-8 shadow-sm transition-all duration-300 hover:border-slate-200 hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative z-10">
                    <div
                      className={`mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${o.color} text-white text-2xl shadow-lg`}
                    >
                      <Icon />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-[#0B1F3A]">
                      {o.title}
                    </h3>
                    <p className="mb-5 text-sm leading-relaxed text-slate-500">
                      {o.desc}
                    </p>
                    <ul className="mb-6 flex flex-wrap gap-2">
                      {o.stats.map((s) => (
                        <li
                          key={s}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={o.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D4ED8] transition-colors hover:text-[#0B1F3A]"
                    >
                      Explore Collection
                      <FaChevronRight className="text-[10px] transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────── 6. WHY CHOOSE FANKIT ──────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-[#F5A623]">
              The FanKit Difference
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] md:text-4xl">
              Why Fans Trust Us
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              We don&apos;t just sell jerseys — we deliver confidence.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((w, i) => {
              const Icon = w.icon;
              return (
                <motion.div
                  key={w.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  whileHover={{ y: -6 }}
                  className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0B1F3A] text-white shadow-md">
                    <Icon className="text-lg" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-base font-bold text-[#0B1F3A]">
                      {w.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-500">
                      {w.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────── 7. HOW IT WORKS ──────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-[#F5A623]">
              Simple & Fast
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A] md:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              From browsing to unboxing in four easy steps.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.num}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="relative text-center"
                >
                  {/* connector line (hidden on mobile & last item) */}
                  {i < steps.length - 1 && (
                    <div className="absolute left-[calc(50%+28px)] top-8 hidden h-[2px] w-[calc(100%-56px)] bg-gradient-to-r from-slate-200 to-transparent lg:block" />
                  )}

                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0B1F3A] to-[#1A3A5C] text-white shadow-lg shadow-[#0B1F3A]/20"
                  >
                    <Icon className="text-xl" />
                  </motion.div>

                  <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-[#F5A623]">
                    Step {s.num}
                  </span>
                  <h3 className="mb-2 text-base font-bold text-[#0B1F3A]">
                    {s.title}
                  </h3>
                  <p className="mx-auto max-w-[220px] text-sm leading-relaxed text-slate-500">
                    {s.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────── 8. FINAL CTA ──────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A] via-[#1A3A5C] to-[#0D3060]" />
        {/* decorative blurs */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#F5A623]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="mb-4 inline-block rounded-full border border-[#F5A623]/30 bg-[#F5A623]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#F5A623]">
              Ready to Rep Your Team?
            </span>
            <h2 className="mt-4 text-3xl font-black text-white md:text-5xl">
              Your Jersey{" "}
              <span className="bg-gradient-to-r from-[#F5A623] to-[#F5C542] bg-clip-text text-transparent">
                Awaits
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base text-blue-200/80 md:text-lg">
              Join thousands of fans who already wear their colors with pride.
              Browse our full collection and find your perfect kit.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/shop/football"
                className="inline-flex items-center gap-2 rounded-full bg-[#F5A623] px-8 py-3.5 text-sm font-bold text-[#0B1F3A] shadow-lg shadow-[#F5A623]/25 transition-all duration-300 hover:bg-[#F5C542] hover:shadow-[#F5A623]/40"
              >
                <FaFootballBall />
                Shop Football
              </Link>
              <Link
                to="/shop/cricket"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
              >
                <MdSportsCricket />
                Shop Cricket
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
