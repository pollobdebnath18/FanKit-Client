import { useState } from "react";
import { Link } from "react-router";
import { motion, type Variants } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaChevronRight,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { MessageAPI } from "../../api/message.api";
import { usePageMeta } from "../../hooks/usePageMeta";

/* ─── animation helpers ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const slideX = (dir: -1 | 1): Variants => ({
  hidden: { opacity: 0, x: dir * -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
});

/* ─── data ─── */
const contactInfo = [
  {
    icon: FaMapMarkerAlt,
    title: "Address",
    lines: ["Sylhet, Bangladesh"],
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: FaPhoneAlt,
    title: "Phone",
    lines: ["+880 1780589179"],
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: FaEnvelope,
    title: "Email",
    lines: ["support@fankit.com"],
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: FaClock,
    title: "Working Hours",
    lines: ["Sunday — Thursday", "9:00 AM – 8:00 PM"],
    color: "from-violet-500 to-purple-500",
  },
];

/* ─── component ─── */
const Contact = () => {
  usePageMeta({
    title: "FanKit - Contact Us",
    description:
      "Contact FanKit for support, orders, and partnerships. Reach our team by email, phone, or visit us at 32 Akhaliya, Sylhet, Bangladesh.",
    keywords: "Contact FanKit, customer support, sports merchandise help",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await MessageAPI.send(form);
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F5F7FA]">
      {/* ──────────────────────── HERO ──────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1F3A] via-[#1A3A5C] to-[#0D3060] text-white">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#F5A623]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* top bar */}
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
              <span className="font-medium text-white/90">Contact</span>
            </motion.nav>

            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-full border border-[#F5A623]/25 bg-[#F5A623]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#F5A623]"
            >
              We&apos;re Here to Help
            </motion.span>
          </div>

          {/* heading */}
          <div className="pb-12 text-center md:pb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl"
            >
              Get In{" "}
              <span className="bg-gradient-to-r from-[#F5A623] to-[#F5C542] bg-clip-text text-transparent">
                Touch
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mt-4 max-w-xl text-base text-blue-200/80 md:text-lg"
            >
              Have a question about our jerseys or your order? We&apos;d love
              to hear from you.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ──────────────────────── CONTACT INFO + FORM ──────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-stretch gap-10 lg:grid-cols-5 lg:gap-12">
            {/* ── left: info cards ── */}
            <motion.div
              variants={slideX(-1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col lg:col-span-2"
            >
              <h2 className="mb-2 text-2xl font-bold text-[#0B1F3A] md:text-3xl">
                Contact Information
              </h2>
              <p className="mb-8 text-sm text-slate-500">
                Reach out anytime — we respond within 24 hours.
              </p>

              <div className="flex flex-1 flex-col gap-5">
                {contactInfo.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <motion.div
                      key={c.title}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={i}
                      whileHover={{ x: 4 }}
                      className="group flex flex-1 items-start gap-5 rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
                    >
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} text-white shadow-md`}
                      >
                        <Icon className="text-base" />
                      </div>
                      <div>
                        <h3 className="mb-1 text-sm font-bold text-[#0B1F3A]">
                          {c.title}
                        </h3>
                        {c.lines.map((line) => (
                          <p key={line} className="text-sm text-slate-500">
                            {line}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* ── right: form ── */}
            <motion.div
              variants={slideX(1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-lg md:p-8">
                <h2 className="mb-1 text-2xl font-bold text-[#0B1F3A] md:text-3xl">
                  Send a Message
                </h2>
                <p className="mb-8 text-sm text-slate-500">
                  Fill out the form and we&apos;ll get back to you shortly.
                </p>

                {/* success message */}
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center rounded-2xl border border-emerald-100 bg-emerald-50 py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 12,
                        delay: 0.1,
                      }}
                      className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
                    >
                      <FaCheckCircle className="text-3xl" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-emerald-700">
                      Message Sent!
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-emerald-600/80">
                      Thank you for reaching out. Our team will review your
                      message and get back to you within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-6 rounded-full border border-emerald-200 bg-white px-6 py-2.5 text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-50"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5">
                    {/* name + email row */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#F5A623] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#F5A623] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* subject */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#F5A623] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]/20 transition-all"
                      />
                    </div>

                    {/* message — grows to fill remaining space */}
                    <div className="flex flex-1 flex-col">
                      <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                        Message
                      </label>
                      <textarea
                        name="message"
                        required
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us more..."
                        className="min-h-[100px] w-full flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#F5A623] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]/20 transition-all"
                      />
                    </div>

                    {/* error message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
                      >
                        <FaExclamationCircle className="shrink-0" />
                        {error}
                      </motion.div>
                    )}

                    {/* submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="group mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5C] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0B1F3A]/20 transition-all duration-300 hover:from-[#1A3A5C] hover:to-[#0D3060] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="text-xs transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────── MAP ──────────────────────── */}
      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg"
          >
            <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-4">
              <FaMapMarkerAlt className="text-[#F5A623]" />
              <h2 className="text-base font-bold text-[#0B1F3A]">
                Our Location — Sylhet, Bangladesh
              </h2>
            </div>
            <iframe
              title="FanKit Location — Sylhet, Bangladesh"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115983.84855255563!2d91.79902854638671!3d24.899796900000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3751ab0000000001%3A0x4b2d4b2d4b2d4b2d!2sSylhet%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1721480000000!5m2!1sen!2sbd"
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
